// 语言的桥 · Language Bridge — page entry. Holds the reading state and wires
// the reader, the word panel, the study dialog and the one audio controller.
// The interface speaks the language read first (strings.js).
import {lessons as registry, categories} from '../lessons/index.js';
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

const lessons = await Promise.all(registry.map(async entry => Object.assign((await entry.load()).default, {category: entry.category})));
// 分类: the categories that have a lesson, in their own order; 全部 shows every lesson grouped by them.
const usedCategories = categories.filter(c => lessons.some(l => l.category === c.id));
const inCategory = id => lessons.filter(l => l.category === id);
for (const lesson of lessons) {
  for (const section of lesson.sections) {
    section.verseIds = lesson.verses.filter(v => v.n >= section.range[0] && v.n <= section.range[1]).map(v => v.id);
  }
}
for (const lesson of lessons) english.register(lesson);
dictionary.setLessons(lessons);
dictionary.loadPictures();

// A link can open a lesson at a part: /?lesson=happy-prince&part=21. With
// &parts=21-23 (or 21,22,23) those parts are this visit's 课堂共读 — marked in
// the parts list like a lesson's own inClass parts — and reading starts at the
// first of them. The link beats the lesson saved on this device; an unknown
// lesson id is ignored. The address bar follows every change of lesson or part,
// so whatever is on screen can be copied as a link (see syncUrl).
const params = new URLSearchParams(location.search);
const linkedLesson = lessons.find(l => l.id === params.get('lesson')) || null;
function parseParts(text, count) {
  const parts = new Set();
  for (const piece of String(text || '').split(',')) {
    const m = /^(\d+)(?:-(\d+))?$/.exec(piece.trim());
    if (!m) continue;
    const first = Number(m[1]);
    const last = Number(m[2] ?? m[1]);
    for (let n = first; n <= last; n += 1) if (n >= 1 && n <= count) parts.add(n);
  }
  return parts;
}
const savedLesson = storage.load('lesson', 'love');
const savedCategory = storage.load('category', 'all');
const state = {
  lesson: linkedLesson || lessons.find(l => l.id === savedLesson) || lessons[0],
  section: 0,
  // 'all', or a category id: which lessons the lesson menu lists.
  category: usedCategories.some(c => c.id === savedCategory) ? savedCategory : 'all',
  // Part numbers (1-based) the link marked 课堂共读, or null when the lesson's own marks apply.
  classParts: null,
  first: storage.load('first', 'zh') === 'en' ? 'en' : 'zh',
  pinyin: storage.load('pinyin', false) === true,
  // 默写 always starts off: a page that opens with its text hidden reads as
  // broken to whoever picks the iPad up next.
  dictation: false,
  // 遮住: the second language waits under a card until it is tapped. On
  // unless the reader has turned it off.
  hideSecond: storage.load('hideSecond', true) !== false,
  revealed: new Set(),
  marks: [],
  done: {},
};
const marks = storage.load('marks', []);
state.marks = Array.isArray(marks) ? marks.filter(m => m && typeof m.word === 'string' && (m.lang === 'zh' || m.lang === 'en')) : [];
const done = storage.load('done', {});
state.done = done && typeof done === 'object' && !Array.isArray(done) ? done : {};
if (linkedLesson) {
  const parts = parseParts(params.get('parts'), linkedLesson.sections.length);
  if (parts.size) state.classParts = parts;
  const part = Number(params.get('part'));
  if (Number.isInteger(part) && part >= 1 && part <= linkedLesson.sections.length) state.section = part - 1;
  else if (parts.size) state.section = Math.min(...parts) - 1;
  storage.save('lesson', linkedLesson.id);
}
const savedSpeed = String(storage.load('speed', '0.75'));
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
  // A link's &parts= marks replace the lesson's own for this visit.
  marksClass: () => Boolean(state.classParts) || state.lesson.sections.some(s => s.inClass),
  isInClass: section => (state.classParts ? state.classParts.has(state.lesson.sections.indexOf(section) + 1) : Boolean(section.inClass)),
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

// Changing 遮住 covers every line again.
app.setHideSecond = value => {
  state.hideSecond = value;
  storage.save('hideSecond', value);
  state.revealed.clear();
  renderHide();
  reader.renderVerses();
  study?.refresh();
};

function renderHide() {
  for (const id of ['hide-second', 'study-hide']) $(id).setAttribute('aria-pressed', String(state.hideSecond));
}

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
// a public-domain story names its own sources; a lesson of poems names its
// sources and, for its scripture, credits the Bible texts too.
function renderSources() {
  const lesson = state.lesson;
  const scripture = !lesson.sources || lesson.verses.some(v => v.ref);
  const credit = scripture ? english.credit(lesson) : null;
  $('scripture-links').hidden = !scripture;
  $('story-links').hidden = !lesson.sources;
  if (lesson.sources) {
    $('copyright').textContent = [pick(lesson.sources.note), credit?.copyright].filter(Boolean).join('\n');
    $('story-links').replaceChildren(...lesson.sources.links.flatMap((link, i) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = pick(link.label);
      return i ? [document.createTextNode(' · '), a] : [a];
    }));
  } else {
    $('copyright').textContent = credit?.copyright || '';
  }
  if (!scripture) return;
  const englishSource = $('youversion-link');
  englishSource.textContent = credit?.id === 'WEB' ? 'WEB Classic' : 'YouVersion';
  englishSource.href = credit?.id === 'WEB' ? credit.source
    : credit?.youVersionDeepLink?.startsWith('https://') ? credit.youVersionDeepLink : 'https://www.bible.com/versions/111';
  $('chinese-source').href = lesson.chineseSource;
}

// A work in a lesson of poems can have a living painting in art-lab, where a
// child paints living brushes onto the picture.
const ART_LAB = 'https://art-lab.lucasacademy.org/living';
function renderPainting() {
  const section = app.section();
  const link = $('section-painting');
  link.hidden = !section.painting;
  if (!section.painting) return;
  link.href = `${ART_LAB}?${new URLSearchParams({w: section.painting.id, lang: uiLanguage()})}`;
  link.textContent = t('paintingLink', {style: pick(section.painting.style)});
  link.setAttribute('aria-label', t('paintingLabel', {title: pick(section.title)}));
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

// The two menus: a category, then the lessons in it (全部 lists every lesson,
// grouped by category). Labels follow the interface language, so both are
// rebuilt on every render. A lesson opened from a link or the 全部 list pulls
// the category menu along, so the lesson menu always contains the lesson.
function renderMenus() {
  if (state.category !== 'all' && state.lesson.category !== state.category) state.category = state.lesson.category;
  const category = $('category-select');
  category.replaceChildren(new Option(t('allLessons'), 'all'), ...usedCategories.map(c => new Option(pick(c.title), c.id)));
  category.value = state.category;
  const select = $('lesson-select');
  select.replaceChildren();
  if (state.category === 'all') {
    for (const c of usedCategories) {
      const group = document.createElement('optgroup');
      group.label = pick(c.title);
      group.append(...inCategory(c.id).map(l => new Option(pick(l.title), l.id)));
      select.append(group);
    }
  } else {
    select.append(...inCategory(state.category).map(l => new Option(pick(l.title), l.id)));
  }
  select.value = state.lesson.id;
}

function render() {
  const lesson = state.lesson;
  setLanguage(state.first);
  setKind(lesson.kind);
  applyPage();
  renderMenus();
  reader.renderNav();
  $('lesson-title').textContent = pick(lesson.title);
  const mark = app.marksClass() ? ` · ${t(app.isInClass(app.section()) ? 'inClass' : 'optional')}` : '';
  $('section-kicker').textContent = t('kicker', {reference: pick(lesson.reference), n: state.section + 1}) + mark;
  $('reading-note').hidden = !app.marksClass();
  $('section-intro').textContent = pick(app.section().intro);
  renderSources();
  renderPainting();
  // The button names the language read first; flipping (here or in 逐句学) relabels it.
  $('flip-label').textContent = state.first === 'zh' ? '中文在前' : 'English first';
  $('flip').lang = state.first === 'zh' ? 'zh-CN' : 'en';
  renderHide();
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

// The address bar names the lesson and part on screen, so it can be copied as
// a link at any moment. Replace, never push: the back button stays the way out.
function syncUrl() {
  let query = `?lesson=${state.lesson.id}&part=${state.section + 1}`;
  if (state.classParts) query += `&parts=${partsParam([...state.classParts])}`;
  history.replaceState(null, '', location.pathname + query);
}
// 21-23 when the parts run on, 1,3,5 when they do not: readable in a link.
function partsParam(list) {
  const parts = [...list].sort((a, b) => a - b);
  const contiguous = parts.every((n, i) => i === 0 || n === parts[i - 1] + 1);
  return contiguous && parts.length > 1 ? `${parts[0]}-${parts.at(-1)}` : parts.join(',');
}

app.changeSection = index => {
  audio.stop();
  panel.close();
  state.section = index;
  state.revealed.clear();
  render();
  syncUrl();
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
  const lesson = lessons.find(l => l.id === id) || lessons[0];
  if (lesson !== state.lesson) state.classParts = null; // the link's marks belonged to its lesson
  state.lesson = lesson;
  state.section = 0;
  state.revealed.clear();
  storage.save('lesson', state.lesson.id);
  render();
  syncUrl();
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
$('lesson-select').onchange = event => changeLesson(event.target.value);
$('category-select').onchange = event => {
  state.category = event.target.value;
  storage.save('category', state.category);
  // A category that does not hold the current lesson opens its first lesson.
  if (state.category !== 'all' && state.lesson.category !== state.category) changeLesson(inCategory(state.category)[0].id);
  else render();
};
$('flip').onclick = () => app.changeOrder(other(state.first));
$('hide-second').onclick = () => app.setHideSecond(!state.hideSecond);
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
if (linkedLesson) syncUrl();
narration.load(state.lesson).then(renderVoiceCredit);
