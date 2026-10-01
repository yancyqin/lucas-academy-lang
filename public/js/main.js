// 互惠的门 · 你教我，我教你 — page entry. Holds the reading state and wires
// the reader, the word panel, the study dialog and the one audio controller.
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

const $ = id => document.getElementById(id);
const other = lang => (lang === 'zh' ? 'en' : 'zh');

const lessons = (await Promise.all(registry.map(entry => entry.load()))).map(module => module.default);
for (const lesson of lessons) {
  for (const section of lesson.sections) {
    section.verseIds = lesson.verses.filter(v => v.n >= section.range[0] && v.n <= section.range[1]).map(v => v.id);
  }
}
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

// Created below, once `app` exists; declared here so early callbacks never
// meet them uninitialised.
let reader = null;
let panel = null;
let study = null;

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
    $('pause').textContent = paused ? '继续' : '暂停';
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
    notify('这句英文还未加载好，请稍后再点。');
    return;
  }
  const where = `第 ${verse.n} 节`;
  // Word by word is always the system voice: a recording cannot be split into words.
  if (slow) {
    audio.play(spokenWords(lang, text, verse.tokens).map(word => ({text: word, lang, slow: true, verseId: verse.id, where})));
    return;
  }
  audio.play([{text, lang, verseId: verse.id, where, clip: app.clipFor(verse.id, 'whole', lang, text)}]);
};
app.readWord = (word, lang, slow = false) => audio.play([{text: word, lang, slow, where: '词语'}], {done: ''});

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
  const credit = english.credit();
  if (credit) {
    $('copyright').textContent = credit.copyright || '';
    if (credit.youVersionDeepLink?.startsWith('https://')) $('youversion-link').href = credit.youVersionDeepLink;
  }
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
  if (zh) parts.push(`中文 ${zh.split('/')[0]}`);
  if (en) parts.push(`English ${en.split('/')[0]}`);
  $('voice-credit').textContent = parts.length
    ? `配音：${parts.join('，')}（CosyVoice 合成的朗读声音）。没有配音的地方使用这台设备的系统声音，并标为「系统试听」。`
    : '这篇课文暂时使用这台设备的系统声音朗读，并标为「系统试听」。';
}

function render() {
  const lesson = state.lesson;
  reader.renderNav();
  $('lesson-title').textContent = lesson.title;
  $('section-kicker').textContent = `${lesson.reference} · 第 ${state.section + 1} 小段`;
  $('section-intro').textContent = app.section().intro;
  $('chinese-source').href = lesson.chineseSource;
  // The button names the language read first; flipping (here or in 逐句学) relabels it.
  $('flip-label').textContent = state.first === 'zh' ? '中文在前' : 'English first';
  $('flip').lang = state.first === 'zh' ? 'zh-CN' : 'en';
  $('complete-next').dataset.review = 'false';
  $('pinyin').checked = state.pinyin;
  $('dictation').checked = state.dictation;
  document.body.classList.toggle('show-pinyin', state.pinyin);
  $('section-counter').textContent = `${state.section + 1} / ${lesson.sections.length}`;
  $('previous').disabled = state.section === 0;
  $('complete-next').textContent = state.section === lesson.sections.length - 1 ? '这一篇学完了' : '这段学完了，下一段';
  $('word-count').textContent = state.marks.length;
  reader.renderVerses();
  renderVoiceCredit();
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
  notify(last ? '最后一小段也学完了！可以再读一次，也可以换一篇。' : '这一小段学完了！可以再读一次，也可以换下一段。');
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
study = createStudy(app);
app.study = study;

// Reading-page controls.
$('lesson-select').replaceChildren(...lessons.map(l => new Option(l.title, l.id)));
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
  notify('这一篇学完了！可以再读一次，也可以换一篇。');
  $('complete-next').textContent = '已学完 · 再读一次';
  $('complete-next').dataset.review = 'true';
};
$('play-section').onclick = () => {
  const verses = app.verses();
  if (verses.some(v => !english.text(v.id))) {
    notify('英文还没加载完整；你可以先点中文旁边的播放按钮。');
    return;
  }
  audio.play(verses.flatMap(verse => [state.first, other(state.first)].map(lang => {
    const text = lang === 'zh' ? verse.tokens.join('') : english.text(verse.id);
    return {text, lang, verseId: verse.id, where: `第 ${verse.n} 节`, clip: app.clipFor(verse.id, 'whole', lang, text)};
  })));
};
$('pause').onclick = () => audio.togglePause();
$('stop').onclick = () => audio.stop();
$('open-study').onclick = event => study.open(app.verses()[0].id, event.currentTarget);

// The reader's own recording: one take, kept on this device, never uploaded.
let recordTimer = null;
let deleteArmed = false;
function renderRecording() {
  $('record').disabled = !recording.isSupported();
  $('record').textContent = recording.recordingNow() ? '停止录音' : '录下我的朗读';
  $('play-recording').hidden = !recording.hasClip();
  $('delete-recording').hidden = !recording.hasClip();
  if (recording.hasClip() && !recording.recordingNow()) {
    $('record-note').textContent = `已有 ${recording.clipSeconds()} 秒录音。${recording.clipStored() ? '保存在这台设备。' : '这次访问可以播放；录音太长，未保存。'}`;
  }
}
if (!recording.isSupported()) $('record-note').textContent = '这个浏览器暂时不能录音。请在 Safari 或 Chrome 打开正式网址（https）。';
$('record').onclick = () => {
  if (recording.recordingNow()) {
    recording.stopRecording();
    return;
  }
  audio.stop();
  $('record').disabled = true;
  $('record-note').textContent = '请允许浏览器使用麦克风。';
  recording.startRecording({
    onDone() {
      clearInterval(recordTimer);
      renderRecording();
      notify('朗读已保存，可以听听自己的声音。');
    },
    onError() {
      clearInterval(recordTimer);
      renderRecording();
      $('record-note').textContent = '暂时无法使用麦克风。请检查浏览器的麦克风权限，再试一次。';
    },
  }).then(() => {
    renderRecording();
    if (!recording.recordingNow()) return;
    recordTimer = setInterval(() => {
      $('record-note').textContent = `正在录音 ${recording.recordingSeconds()} 秒 / 最长 ${recording.maxSeconds} 秒`;
      $('record').textContent = '停止录音';
    }, 500);
  });
};
$('play-recording').onclick = () => audio.playRecording();
$('delete-recording').onclick = () => {
  if (!deleteArmed) {
    deleteArmed = true;
    $('delete-recording').textContent = '再点一次，确认删除';
    return;
  }
  audio.stop();
  recording.discard();
  deleteArmed = false;
  $('delete-recording').textContent = '删除录音';
  $('record-note').textContent = '录音已删除。';
  renderRecording();
};

renderRecording();
render();
narration.load(state.lesson).then(renderVoiceCredit);
