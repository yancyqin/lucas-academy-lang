// One owner for every sound the app makes: narration clips, the system voice,
// word-by-word reading, and the reader's own recording. Starting anything stops
// everything else, and a generation counter drops the callbacks of a read that
// has been replaced — an old queue can never start the next line after a close,
// a flip, or a change of verse.
//
// iOS only lets sound start inside a user gesture, so play() starts its first
// item synchronously: callers resolve narration clips beforehand (the manifest
// is loaded with the lesson) and never await before calling in.
import * as recording from './recording.js';
import {t} from './strings.js';

const GAP_MS = 420;
const SLOW_GAP_MS = 360;
const SLOW_RATE = 0.62;


let generation = 0;
let queue = [];
let index = 0;
let active = false;
let paused = false;
let held = null; // the next step, waiting while paused in the gap between items
let gapTimer = null;
let inGap = false; // between two lines: nothing is sounding, the next is scheduled
let current = null; // 'clip' | 'speech' | 'recording'
let speed = 0.75;
let element = null;
let hooks = {state() {}, status() {}, line() {}};

export function configure(options) {
  hooks = {...hooks, ...options};
}

export function setSpeed(value) {
  speed = Number(value) || 0.75;
}

export const isActive = () => active;
export const isPaused = () => paused;
export const speechAvailable = () => 'speechSynthesis' in window;

function audioElement() {
  if (!element) {
    element = new Audio();
    element.preload = 'auto';
    // A narration clip is already read slowly; the speed setting only changes
    // it relative to that pace, and the voice keeps its pitch.
    element.preservesPitch = true;
    element.webkitPreservesPitch = true;
  }
  return element;
}

function emit() {
  hooks.state(active, paused);
}

// Ends whatever is sounding. `quiet` keeps the status line (a finished read
// leaves its closing message in place).
export function stop(quiet = false) {
  generation += 1;
  active = false;
  paused = false;
  held = null;
  queue = [];
  inGap = false;
  clearTimeout(gapTimer);
  if (element) {
    element.onended = element.onerror = null;
    element.pause();
    element.removeAttribute('src');
    element.load();
  }
  if (speechAvailable()) {
    // Cancelling a paused queue wedges it in some browsers: resume first.
    speechSynthesis.resume();
    speechSynthesis.cancel();
  }
  recording.stopPlaying();
  current = null;
  hooks.line(null);
  emit();
  if (!quiet) hooks.status('');
}

function pickVoice(lang) {
  const target = lang === 'zh' ? 'zh-CN' : 'en-US';
  const voices = speechSynthesis.getVoices();
  return voices.find(v => v.lang === target) ||
    voices.find(v => v.lang.replace('_', '-').startsWith(lang)) || null;
}

// Plays a list of {text, lang, clip?, where?, slow?, n?}. A clip is
// {src, speed}; without one (or if it fails to load) the system voice reads
// the text, and the status line says so.
export function play(items, {done = t('readDone')} = {}) {
  stop();
  queue = items.filter(item => item.text);
  if (!queue.length) {
    hooks.status(t('englishStillLoading'));
    return;
  }
  if (!speechAvailable() && queue.some(item => !item.clip)) {
    queue = queue.filter(item => item.clip);
    if (!queue.length) {
      hooks.status(t('noVoice'));
      return;
    }
  }
  const mine = generation;
  active = true;
  index = 0;
  emit();

  const advance = item => {
    if (mine !== generation) return;
    index += 1;
    inGap = true;
    gapTimer = setTimeout(step, item.slow ? SLOW_GAP_MS : GAP_MS);
  };

  const label = (item, recorded) =>
    `${t(recorded ? 'narration' : 'deviceVoice')} · ${t(item.lang)}${item.where ? ' · ' + item.where : ''}`;

  const speak = item => {
    if (!speechAvailable()) {
      advance(item);
      return;
    }
    current = 'speech';
    hooks.status(label(item, false));
    const utterance = new SpeechSynthesisUtterance(item.text);
    utterance.lang = item.lang === 'zh' ? 'zh-CN' : 'en-US';
    const voice = pickVoice(item.lang);
    if (voice) utterance.voice = voice;
    utterance.rate = item.slow ? SLOW_RATE : speed;
    utterance.onend = () => advance(item);
    utterance.onerror = () => {
      if (mine !== generation) return;
      stop(true);
      hooks.status(t('voiceError'));
    };
    speechSynthesis.speak(utterance);
  };

  const playClip = item => {
    const audio = audioElement();
    current = 'clip';
    hooks.status(label(item, true));
    audio.onended = () => advance(item);
    audio.onerror = () => {
      if (mine !== generation) return;
      audio.onended = audio.onerror = null;
      speak(item); // the file did not load: the system voice reads it instead
    };
    audio.src = item.clip.src;
    audio.playbackRate = Math.min(2, Math.max(0.5, speed / (item.clip.speed || speed)));
    const started = audio.play();
    if (started?.catch) {
      started.catch(error => {
        if (mine !== generation || error?.name === 'AbortError') return;
        audio.onended = audio.onerror = null;
        speak(item);
      });
    }
  };

  function step() {
    if (mine !== generation) return;
    inGap = false;
    if (paused) {
      held = step;
      return;
    }
    if (index >= queue.length) {
      stop(true);
      hooks.status(done);
      return;
    }
    const item = queue[index];
    hooks.line(item);
    if (item.clip) playClip(item);
    else speak(item);
  }

  step();
}

export function togglePause() {
  if (!active) return;
  if (paused) {
    paused = false;
    if (current === 'recording') recording.resumePlaying();
    else if (held) {
      // Paused in the gap after a line: carry on with the next one.
      const next = held;
      held = null;
      emit();
      hooks.status(t('resumed'));
      next();
      return;
    } else if (!inGap) {
      if (current === 'clip') element?.play().catch(() => {});
      else if (current === 'speech') speechSynthesis.resume();
    }
  } else {
    paused = true;
    if (current === 'recording') recording.pausePlaying();
    else if (!inGap && current === 'clip') element?.pause();
    else if (!inGap && current === 'speech') speechSynthesis.pause();
  }
  emit();
  hooks.status(t(paused ? 'paused' : 'resumed'));
}

// The reader's own take, through the same stop/pause switch.
export function playRecording({onEnded, onError} = {}) {
  stop();
  const mine = generation;
  active = true;
  current = 'recording';
  emit();
  hooks.status(t('playingRecording'));
  const started = recording.playClip({
    onEnded: () => {
      if (mine !== generation) return;
      stop(true);
      hooks.status(t('recordingEnded'));
      onEnded?.();
    },
    onError: () => {
      if (mine !== generation) return;
      stop(true);
      hooks.status(t('recordingError'));
      onError?.();
    },
  });
  if (!started) stop(true);
}
