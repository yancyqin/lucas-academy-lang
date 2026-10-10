// 课程表 · /class: pick a week for the current class. The week's readings link into
// the reader (/?lesson=…&parts=…), and its homework is shown underneath.
// Data lives in lessons/schedule.js; only the lessons a week names are loaded.
import {lessons as registry} from '../lessons/index.js';
import {grades, weeks} from '../lessons/schedule.js';
import * as storage from './storage.js';
import {t, pick, setReadingLanguage, applyPage, uiLanguage} from './strings.js';

const $ = id => document.getElementById(id);
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const params = new URLSearchParams(location.search);
const weeksOf = grade => weeks.filter(w => w.grade === grade.id).sort((a, b) => a.n - b.n);

// Today as YYYY-MM-DD in this device's own time zone, to compare with a week's date.
const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
// This week: the next class on or after today; without dates, the latest week.
const currentOf = list => list.find(w => w.date && w.date >= today) || list.at(-1) || null;

let first = storage.load('first', 'zh') === 'en' ? 'en' : 'zh';
// One class for now. Keep the existing schedule schema; old grade preferences
// and g= links no longer select a different class.
const grade = grades[0];
let week = null;
let missingWeek = false;

function chooseWeek(asked) {
  const list = weeksOf(grade);
  week = list.find(w => String(w.n) === asked) || null;
  missingWeek = Boolean(asked) && !week;
  if (!week) week = currentOf(list);
}

const loaded = new Map();
async function lesson(id) {
  if (!loaded.has(id)) {
    const entry = registry.find(e => e.id === id);
    loaded.set(id, entry ? (await entry.load()).default : null);
  }
  return loaded.get(id);
}

function formatDate(date) {
  const value = new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat(uiLanguage() === 'zh' ? 'zh-CN' : 'en-US', {month: 'short', day: 'numeric'}).format(value);
}

function syncUrl() {
  const url = new URL(location.href);
  url.search = '';
  if (week) url.searchParams.set('w', String(week.n));
  history.replaceState(null, '', url);
}

const partsText = parts => parts.join(uiLanguage() === 'zh' ? '、' : ', ');
// 21-23 when the parts run on, 1,3,5 when they do not: readable in a link (the reader accepts both).
function partsParam(list) {
  const parts = [...list].sort((a, b) => a - b);
  const contiguous = parts.every((n, i) => i === 0 || n === parts[i - 1] + 1);
  return contiguous && parts.length > 1 ? `${parts[0]}-${parts.at(-1)}` : parts.join(',');
}

function readingLink(data, reading) {
  const link = el('a', 'reading-link');
  link.href = `./?lesson=${reading.lesson}` + (reading.parts ? `&parts=${partsParam(reading.parts)}` : '');
  const copy = el('span');
  copy.append(el('strong', '', pick(data.title)));
  const detail = reading.parts
    ? `${t('partsList', {list: partsText(reading.parts)})} · ${reading.parts.map(n => pick(data.sections[n - 1].title)).join(' · ')}`
    : t('wholeLesson');
  copy.append(el('small', '', detail));
  link.append(copy, el('span', 'go', t('startLesson')));
  return link;
}

let weekRender = 0;
async function renderWeek() {
  const version = ++weekRender;
  const selected = week;
  const box = $('week');
  box.replaceChildren();
  const list = weeksOf(grade);
  $('week-note').hidden = !missingWeek;
  $('week-note').textContent = missingWeek ? t('noSuchWeek') : '';
  renderWeeks(list);
  if (!selected) {
    box.append(el('p', 'class-empty', t('noWeeks')));
    return;
  }
  const kicker = [t('weekN', {n: selected.n})];
  if (selected.date) kicker.push(formatDate(selected.date));
  if (selected === currentOf(list)) kicker.push(t('thisWeek'));
  box.append(el('p', 'overline week-kicker', kicker.join(' · ')));
  box.append(el('h1', '', pick(selected.title)));
  const readings = el('div', 'readings');
  for (const reading of selected.readings) {
    const data = await lesson(reading.lesson);
    if (version !== weekRender) return;
    if (data) readings.append(readingLink(data, reading));
  }
  box.append(readings);
  if (selected.homework) {
    const homework = el('div', 'homework');
    homework.append(el('p', 'overline', t('homework')), el('p', '', pick(selected.homework)));
    box.append(homework);
  }
}

// One pill per week of the class, always shown — even a single week is a
// choice, and the next one appears beside it. The pill carries 本周.
function renderWeeks(list) {
  const nav = $('weeks');
  nav.replaceChildren();
  const current = currentOf(list);
  for (const w of list) {
    const pill = el('button', '', t('weekN', {n: w.n}));
    pill.type = 'button';
    pill.setAttribute('aria-pressed', String(w === week));
    if (w === current) pill.append(el('small', 'tag', t('thisWeek')));
    pill.title = pick(w.title);
    pill.onclick = () => {
      if (w === week) return;
      week = w;
      missingWeek = false;
      syncUrl();
      renderWeek();
    };
    nav.append(pill);
  }
}

function render() {
  setReadingLanguage(first);
  applyPage();
  document.title = `${t('classTitle')} · ${t('name')}`;
  $('language').textContent = t('otherLanguage');
  renderWeek();
}

$('language').onclick = () => {
  first = first === 'zh' ? 'en' : 'zh';
  storage.save('first', first);
  render();
};

chooseWeek(params.get('w'));
syncUrl();
render();

// Weekly waits for the app, because an iframe load event also fires when framing is blocked.
// This readiness message contains no learner data; the parent checks our origin and window.
if (window.parent !== window) window.parent.postMessage({type: 'language-bridge-class-ready'}, '*');
