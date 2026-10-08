// 课程表 · /class: pick a grade, then a week. The week's readings link into
// the reader (/?lesson=…&parts=…), and its homework is shown underneath.
// Data lives in lessons/schedule.js; only the lessons a week names are loaded.
import {lessons as registry} from '../lessons/index.js';
import {grades, weeks} from '../lessons/schedule.js';
import * as storage from './storage.js';
import {t, pick, setLanguage, applyPage, uiLanguage} from './strings.js';

const $ = id => document.getElementById(id);
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const params = new URLSearchParams(location.search);
const gradeOf = id => grades.find(g => String(g.id) === String(id)) || null;
const weeksOf = grade => weeks.filter(w => w.grade === grade.id).sort((a, b) => a.n - b.n);

// Today as YYYY-MM-DD in this device's own time zone, to compare with a week's date.
const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
// This week: the next class on or after today; without dates, the latest week.
const currentOf = list => list.find(w => w.date && w.date >= today) || list.at(-1) || null;

let language = storage.load('first', 'zh') === 'en' ? 'en' : 'zh';
let grade = gradeOf(params.get('g')) || gradeOf(storage.load('grade')) || grades[0];
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
  url.searchParams.set('g', String(grade.id));
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

async function renderWeek() {
  const box = $('week');
  box.replaceChildren();
  const list = weeksOf(grade);
  $('week-note').hidden = !missingWeek;
  $('week-note').textContent = missingWeek ? t('noSuchWeek') : '';
  if (!week) {
    box.append(el('p', 'class-empty', t('noWeeks')));
    renderWeeks(list);
    return;
  }
  const kicker = [pick(grade.title), t('weekN', {n: week.n})];
  if (week.date) kicker.push(formatDate(week.date));
  if (week === currentOf(list)) kicker.push(t('thisWeek'));
  box.append(el('p', 'overline week-kicker', kicker.join(' · ')));
  box.append(el('h1', '', pick(week.title)));
  const readings = el('div', 'readings');
  for (const reading of week.readings) {
    const data = await lesson(reading.lesson);
    if (data) readings.append(readingLink(data, reading));
  }
  box.append(readings);
  if (week.homework) {
    const homework = el('div', 'homework');
    homework.append(el('p', 'overline', t('homework')), el('p', '', pick(week.homework)));
    box.append(homework);
  }
  renderWeeks(list);
}

function renderWeeks(list) {
  const box = $('weeks');
  box.replaceChildren();
  if (list.length < 2) return;
  box.append(el('p', 'overline', t('allWeeks')));
  const items = el('ul', 'weeks-list');
  const current = currentOf(list);
  for (const w of list) {
    const link = el('a');
    link.href = `?${new URLSearchParams({g: String(grade.id), w: String(w.n)})}`;
    if (w === week) link.setAttribute('aria-current', 'page');
    link.append(el('span', 'n', t('weekN', {n: w.n})), el('span', '', pick(w.title)));
    if (w.date) link.append(el('span', 'date', formatDate(w.date)));
    if (w === current) link.append(el('span', 'tag', t('thisWeek')));
    const item = el('li');
    item.append(link);
    items.append(item);
  }
  box.append(items);
}

function renderGrades() {
  const nav = $('grades');
  nav.replaceChildren();
  for (const g of grades) {
    const pill = el('button', '', pick(g.title));
    pill.type = 'button';
    pill.setAttribute('aria-pressed', String(g === grade));
    pill.onclick = () => {
      if (g === grade) return;
      grade = g;
      storage.save('grade', g.id);
      chooseWeek(null);
      syncUrl();
      render();
    };
    nav.append(pill);
  }
}

function render() {
  setLanguage(language);
  applyPage();
  document.title = `${t('classTitle')} · ${t('name')}`;
  $('language').textContent = t('otherLanguage');
  renderGrades();
  renderWeek();
}

$('language').onclick = () => {
  language = language === 'zh' ? 'en' : 'zh';
  storage.save('first', language);
  render();
};

chooseWeek(params.get('w'));
if (grade) storage.save('grade', grade.id);
render();
