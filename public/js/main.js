// 语言的桥 · Language Bridge — page entry. Holds the reading state and wires
// the reader, the word panel, the study dialog and the one audio controller.
// The interface speaks the language read first (strings.js).
import {lessons as registry} from '../lessons/index.js';
import * as storage from './storage.js';
import * as audio from './audio.js';
import * as english from './english.js';
import * as narration from './narration.js';
import * as dictionary from './dictionary.js';
import * as recording from './recording.js';
import {spokenWords} from './tokens.js';
import {createReader} from './reader.js';
import {createWordPanel} from './wordpanel.js';
import {createStudy} from './study.js';
import {t, pick, setLanguage, setKind, applyPage, uiLanguage} from './strings.js';

const $ = id => document.getElementById(id);
const other = lang => (lang === 'zh' ? 'en' : 'zh');

const lessons = (await Promise.all(registry.map(entry => entry.load()))).map(module => module.default);
for (const lesson of lessons) {
  for (const section of lesson.sections) {
    section.verseIds = lesson.verses.filter(v => v.n >= section.range[0] && v.n <= section.range[1]).map(v => v.id);
  }
}
for (const lesson of lessons) english.register(lesson);
dictionary.setLessons(lessons);
dictionary.loadPictures();

const savedLesson = storage.load('lesson', 'love');
const state = {
  lesson: lessons.find(l => l.id === savedLesson) || lessons[0],
  section: 0,
  first: storage.load('first', 'zh') === 'en' ? 'en' : 'zh',
  pinyin: storage.load('pinyin', false) === true,
  // 默写 always starts off: a page that opens with its text hidden reads as
  // broken to whoever picks the iPad up next.
  dictation: false,
  revealed: new Set(),
  marks: [],
  done: {},
};
const marks = storage.load('marks', []);
state.marks = Array.isArray(marks) ? marks.filter(m => m && typeof m.word === 'string' && (m.lang === 'zh' || m.lang === 'en')) : [];
const done = storage.load('done', {});
state.done = done && typeof done === 'object' && !Array.isArray(done) ? done : {};
const savedSpeed = String(storage.load('speed', '0.85'));
if ([...$('speed').options].some(o => o.value === savedSpeed)) $('speed').value = savedSpeed;
audio.setSpeed($('speed').value);
setLanguage(state.first);

// Created below, once `app` exists; declared here so early callbacks never
// meet them uninitialised.
let reader = null;
let panel = null;
let study = null;
let recordTimer = null;
let deleteArmed = false;

const app = {
  state,
  audio,
  load: storage.load,
  save: storage.save,
  other,
  lesson: () => state.lesson,
  section: () => state.lesson.sections[state.section],
  verses: () => state.lesson.verses.filter(v => app.section().verseIds.includes(v.id)),
  isDone: section => Boolean(state.done[`${state.lesson.id}/${section.id}`]),
  // A lesson may mark the parts read with the teacher in class; then the rest are 选读.
  marksClass: () => state.lesson.sections.some(s => s.inClass),
  isMarked: (word, lang) => state.marks.some(m => m.word === word && m.lang === lang),
  tokenContext: () => ({lesson: state.lesson, isMarked: app.isMarked, selected: panel?.selected || null}),
  clipFor: (verseId, unitId, lang, text) => narration.clip(state.lesson, verseId, unitId, lang, text),
  playingVerse: null,
};

function notify(text) {
  $('audio-status').textContent = text;
  study?.notify(text);
}

audio.configure({
  state(active, paused) {
    $('pause').hidden = !active;
    $('stop').hidden = !active;
    $('pause').textContent = t(paused ? 'resume' : 'pause');
    study?.controls(active, paused);
  },
  status: notify,
  line(item) {
    app.playingVerse = item?.verseId || null;
    reader?.markPlaying(app.playingVerse);
  },
});

app.readVerse = (verse, lang, slow = false) => {
  const text = lang === 'zh' ? verse.tokens.join('') : english.text(verse.id);
  if (!text) {
    notify(t('englishNotLoadedVerse'));
    return;
  }
  const where = t('whereVerse', {n: verse.n});
  // Word by word is always the system voice: a recording cannot be split into words.
  if (slow) {
    audio.play(spokenWords(lang, text, verse.tokens).map(word => ({text: word, lang, slow: true, verseId: verse.id, where})));
    return;
  }
  audio.play([{text, lang, verseId: verse.id, where, clip: app.clipFor(verse.id, 'whole', lang, text)}]);
};
app.readWord = (word, lang, slow = false) => audio.play([{text: word, lang, slow, where: t('whereWord')}], {done: ''});

app.toggleMark = (word, lang) => {
  if (app.isMarked(word, lang)) state.marks = state.marks.filter(m => !(m.word === word && m.lang === lang));
  else state.marks.push({word, lang});
  storage.save('marks', state.marks);
  $('word-count').textContent = state.marks.length;
  reader.renderVerses();
};

app.setPinyin = value => {
  state.pinyin = value;
  storage.save('pinyin', value);
  $('pinyin').checked = value;
  document.body.classList.toggle('show-pinyin', value);
};

app.retryEnglish = () => {
  english.retry(state.lesson, app.section()).then(afterEnglish);
  reader.renderVerses();
  study?.refresh();
};

function afterEnglish() {
  reader.renderVerses();
  study?.refresh();
  renderSources();
}

// 文字来源: a passage credits the licensed English and the Chinese Bible text;
// a public-domain story names its own sources.
function renderSources() {
  const lesson = state.lesson;
  $('scripture-links').hidden = Boolean(lesson.sources);
  $('story-links').hidden = !lesson.sources;
  if (lesson.sources) {
    $('copyright').textContent = pick(lesson.sources.note);
    $('story-links').replaceChildren(...lesson.sources.links.flatMap((link, i) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = pick(link.label);
      return i ? [document.createTextNode(' · '), a] : [a];
    }));
    return;
  }
  const credit = english.credit();
  $('copyright').textContent = credit?.copyright || '';
  if (credit?.youVersionDeepLink?.startsWith('https://')) $('youversion-link').href = credit.youVersionDeepLink;
  $('chinese-source').href = lesson.chineseSource;
}

function loadEnglish() {
  const lesson = state.lesson;
  const section = app.section();
  english.ensure(lesson, section).then(() => {
    if (state.lesson === lesson && app.section() === section) afterEnglish();
  });
}

function renderVoiceCredit() {
  const voices = narration.voices(state.lesson);
  const zh = voices.find(v => v.startsWith('zh:'))?.split(':')[1];
  const en = voices.find(v => v.startsWith('en:'))?.split(':')[1];
  const parts = [];
  if (zh) parts.push(`${t('zh')} ${zh.split('/')[0]}`);
  if (en) parts.push(`${t('en')} ${en.split('/')[0]}`);
  $('voice-credit').textContent = parts.length ? t('voiceCredit', {voices: parts.join(uiLanguage() === 'zh' ? '，' : ', ')}) : t('voiceCreditNone');
}

function render() {
  const lesson = state.lesson;
  setLanguage(state.first);
  setKind(lesson.kind);
  applyPage();
  for (const option of $('lesson-select').options) option.textContent = pick(lessons.find(l => l.id === option.value).title);
  reader.renderNav();
  $('lesson-title').textContent = pick(lesson.title);
  const mark = app.marksClass() ? ` · ${t(app.section().inClass ? 'inClass' : 'optional')}` : '';
  $('section-kicker').textContent = t('kicker', {reference: pick(lesson.reference), n: state.section + 1}) + mark;
  $('reading-note').hidden = !app.marksClass();
  $('section-intro').textContent = pick(app.section().intro);
  renderSources();
  // The button names the language read first; flipping (here or in 逐句学) relabels it.
  $('flip-label').textContent = state.first === 'zh' ? '中文在前' : 'English first';
  $('flip').lang = state.first === 'zh' ? 'zh-CN' : 'en';
  $('complete-next').dataset.review = 'false';
  $('pinyin').checked = state.pinyin;
  $('dictation').checked = state.dictation;
  document.body.classList.toggle('show-pinyin', state.pinyin);
  $('section-counter').textContent = t('counter', {n: state.section + 1, total: lesson.sections.length});
  $('previous').disabled = state.section === 0;
  $('complete-next').textContent = t(state.section === lesson.sections.length - 1 ? 'finishLesson' : 'nextPart');
  $('pause').textContent = t(audio.isPaused() ? 'resume' : 'pause');
  $('word-count').textContent = state.marks.length;
  reader.renderVerses();
  renderVoiceCredit();
  renderRecording();
  loadEnglish();
}

app.changeSection = index => {
  audio.stop();
  panel.close();
  state.section = index;
  state.revealed.clear();
  render();
  $('reading').scrollIntoView({block: 'start'});
};

app.changeOrder = lang => {
  audio.stop();
  state.first = lang;
  storage.save('first', lang);
  state.revealed.clear();
  if (state.dictation) panel.close();
  render();
};

app.completeSection = () => {
  state.done[`${state.lesson.id}/${app.section().id}`] = true;
  storage.save('done', state.done);
  reader.renderNav();
  const last = state.section === state.lesson.sections.length - 1;
  notify(t(last ? 'lastPartDone' : 'partDone'));
};

app.prepareStudy = () => {
  audio.stop();
  panel.close();
  if (recording.recordingNow()) recording.stopRecording();
};

async function changeLesson(id) {
  audio.stop();
  panel.close();
  state.lesson = lessons.find(l => l.id === id) || lessons[0];
  state.section = 0;
  state.revealed.clear();
  storage.save('lesson', state.lesson.id);
  render();
  await narration.load(state.lesson);
  renderVoiceCredit();
}

reader = createReader(app);
panel = createWordPanel(app);
app.openWord = panel.open;
app.explanation = reader.explanation;
study = createStudy(app);
app.study = study;

// Reading-page controls.
$('lesson-select').replaceChildren(...lessons.map(l => new Option(pick(l.title), l.id)));
$('lesson-select').onchange = event => changeLesson(event.target.value);
$('flip').onclick = () => app.changeOrder(other(state.first));
$('pinyin').onchange = event => app.setPinyin(event.target.checked);
$('dictation').onchange = event => {
  audio.stop();
  state.dictation = event.target.checked;
  state.revealed.clear();
  panel.close();
  reader.renderVerses();
};
$('speed').onchange = event => {
  audio.setSpeed(event.target.value);
  storage.save('speed', event.target.value);
};
$('previous').onclick = () => app.changeSection(Math.max(0, state.section - 1));
$('restart-lesson').onclick = () => {
  state.lesson.sections.forEach(s => delete state.done[`${state.lesson.id}/${s.id}`]);
  storage.save('done', state.done);
  app.changeSection(0);
  document.querySelector('.tools').open = false;
};
$('complete-next').onclick = () => {
  if ($('complete-next').dataset.review === 'true') {
    $('complete-next').dataset.review = 'false';
    app.changeSection(0);
    return;
  }
  state.done[`${state.lesson.id}/${app.section().id}`] = true;
  storage.save('done', state.done);
  if (state.section < state.lesson.sections.length - 1) {
    app.changeSection(state.section + 1);
    return;
  }
  reader.renderNav();
  notify(t('lessonDone'));
  $('complete-next').textContent = t('readAgain');
  $('complete-next').dataset.review = 'true';
};
$('play-section').onclick = () => {
  const verses = app.verses();
  if (verses.some(v => !english.text(v.id))) {
    notify(t('englishNotLoadedSection'));
    return;
  }
  audio.play(verses.flatMap(verse => [state.first, other(state.first)].map(lang => {
    const text = lang === 'zh' ? verse.tokens.join('') : english.text(verse.id);
    return {text, lang, verseId: verse.id, where: t('whereVerse', {n: verse.n}), clip: app.clipFor(verse.id, 'whole', lang, text)};
  })));
};
$('pause').onclick = () => audio.togglePause();
$('stop').onclick = () => audio.stop();
$('open-study').onclick = event => study.open(app.verses()[0].id, event.currentTarget);

// The reader's own recording: one take, kept on this device, never uploaded.
function renderRecording() {
  $('record').disabled = !recording.isSupported();
  $('record').textContent = t(recording.recordingNow() ? 'recordStop' : 'record');
  $('play-recording').hidden = !recording.hasClip();
  $('delete-recording').hidden = !recording.hasClip();
  $('delete-recording').textContent = t(deleteArmed ? 'deleteConfirm' : 'deleteRecording');
  if (recording.recordingNow()) return;
  if (recording.hasClip()) {
    $('record-note').textContent = t(recording.clipStored() ? 'recordSaved' : 'recordNotSaved', {seconds: recording.clipSeconds()});
  } else {
    $('record-note').textContent = t(recording.isSupported() ? 'recordNote' : 'recordUnsupported');
  }
}
$('record').onclick = () => {
  if (recording.recordingNow()) {
    recording.stopRecording();
    return;
  }
  audio.stop();
  $('record').disabled = true;
  $('record-note').textContent = t('recordAllow');
  recording.startRecording({
    onDone() {
      clearInterval(recordTimer);
      renderRecording();
      notify(t('recordDone'));
    },
    onError() {
      clearInterval(recordTimer);
      renderRecording();
      $('record-note').textContent = t('recordFailed');
    },
  }).then(() => {
    renderRecording();
    if (!recording.recordingNow()) return;
    recordTimer = setInterval(() => {
      $('record-note').textContent = t('recording', {seconds: recording.recordingSeconds(), max: recording.maxSeconds});
      $('record').textContent = t('recordStop');
    }, 500);
  });
};
$('play-recording').onclick = () => audio.playRecording();
$('delete-recording').onclick = () => {
  if (!deleteArmed) {
    deleteArmed = true;
    $('delete-recording').textContent = t('deleteConfirm');
    return;
  }
  audio.stop();
  recording.discard();
  deleteArmed = false;
  renderRecording();
  $('record-note').textContent = t('recordDeleted');
};

render();
narration.load(state.lesson).then(renderVoiceCredit);
