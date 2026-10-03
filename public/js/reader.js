// The reading page: the lesson rail, and the section's verses — each verse
// whole in the first language, then the same verse in the second.
import {el, button, fill} from './tokens.js';
import {t, pick} from './strings.js';
import * as english from './english.js';

const $ = id => document.getElementById(id);

export function createReader(app) {
  const {state} = app;

  function renderNav() {
    const lesson = app.lesson();
    $('lesson-select').value = lesson.id;
    $('lesson-reference').textContent = pick(lesson.reference);
    const nav = $('section-nav');
    nav.replaceChildren();
    lesson.sections.forEach((section, i) => {
      const done = app.isDone(section);
      const item = button('', () => app.changeSection(i), 'section-button');
      if (i === state.section) item.setAttribute('aria-current', 'step');
      const copy = el('span');
      const meta = t('sectionMeta', {first: section.range[0], last: section.range[1], count: section.verseIds.length});
      copy.append(el('strong', '', pick(section.title)), el('small', '', meta));
      // 课堂共读: a part the teacher reads with the class.
      if (section.inClass) {
        item.classList.add('in-class');
        copy.append(el('span', 'reading-mark', t('inClass')));
      }
      item.append(el('span', 'section-number', done ? '✓' : String(i + 1)), copy);
      if (done) item.setAttribute('aria-label', t('sectionDone', {title: pick(section.title)}));
      nav.append(item);
    });
    // A story has many parts: the list scrolls, and keeps the current part in view.
    nav.classList.toggle('many', lesson.sections.length > 4);
    const current = nav.querySelector('[aria-current="step"]');
    if (current && nav.classList.contains('many')) {
      nav.scrollTop = current.offsetTop - (nav.clientHeight - current.offsetHeight) / 2;
      nav.scrollLeft = current.offsetLeft - (nav.clientWidth - current.offsetWidth) / 2;
    }
    const finished = lesson.sections.filter(app.isDone).length;
    $('progress-text').textContent = t('progress', {done: finished, total: lesson.sections.length});
    $('lesson-progress').max = lesson.sections.length;
    $('lesson-progress').value = finished;
  }

  function line(verse, lang) {
    const row = el('div', 'language-line');
    row.dataset.language = lang;
    const tools = el('div', 'line-controls');
    tools.append(el('span', 'lang-code', lang === 'zh' ? '中' : 'EN'));
    const play = button('▶', () => app.readVerse(verse, lang), 'line-play');
    play.setAttribute('aria-label', t('readVerse', {n: verse.n, language: t(lang)}));
    tools.append(play);
    if (state.dictation) {
      const slow = button(t('slow'), () => app.readVerse(verse, lang, true), 'slow-verse');
      slow.setAttribute('aria-label', t('slowVerse', {n: verse.n, language: t(lang)}));
      tools.append(slow);
    }
    row.append(tools);

    const hidden = state.dictation && lang === state.first && !state.revealed.has(verse.id + lang);
    if (hidden) {
      const reveal = button(t('reveal'), () => {
        state.revealed.add(verse.id + lang);
        renderVerses();
      }, 'blank-line');
      reveal.setAttribute('aria-label', t('revealLabel', {n: verse.n, language: t(lang)}));
      row.append(reveal);
      return row;
    }
    const text = el('p', 'verse-text ' + lang);
    text.lang = lang === 'zh' ? 'zh-CN' : 'en';
    const words = lang === 'zh' ? verse.tokens.join('') : english.text(verse.id);
    if (!words) {
      const reason = english.problem(app.lesson(), app.section());
      text.append(el('span', 'en-pending', t(reason ? 'englishSeeBelow' : 'loadingEnglish')));
    } else {
      fill(text, {lang, text: words, tokens: verse.tokens}, app.tokenContext(),
        (word, language, source) => app.openWord(word, language, verse, source));
    }
    row.append(text);
    return row;
  }

  // 用简单的话理解, in the reading order: the first language's line on top.
  function explanation(verse) {
    return [state.first, app.other(state.first)].map(lang => {
      const p = el('p', '', verse.explain[lang]);
      p.lang = lang === 'zh' ? 'zh-CN' : 'en';
      return p;
    });
  }

  function renderVerses() {
    const container = $('verses');
    container.replaceChildren();
    for (const verse of app.verses()) {
      const row = el('article', 'verse-group');
      row.dataset.verse = verse.id;
      row.append(el('span', 'verse-number', String(verse.n).padStart(2, '0')));
      const content = el('div', 'verse-content');
      for (const lang of [state.first, app.other(state.first)]) content.append(line(verse, lang));
      if (!state.dictation) {
        const actions = el('div', 'verse-actions');
        const detail = el('details', 'sentence-explain');
        detail.append(el('summary', '', t('simpleWords')), ...explanation(verse));
        const learn = button(t('studyThis'), () => app.study.open(verse.id, learn), 'verse-study');
        learn.setAttribute('aria-label', t('studyThisLabel', {n: verse.n}));
        actions.append(detail, learn);
        content.append(actions);
      }
      row.append(content);
      container.append(row);
    }
    if (app.playingVerse) markPlaying(app.playingVerse);

    const status = $('english-state');
    status.replaceChildren();
    const reason = english.problem(app.lesson(), app.section());
    if (reason) {
      status.append(document.createTextNode(english.describe(reason)), button(t('retryEnglish'), app.retryEnglish));
    }
  }

  function markPlaying(verseId) {
    document.querySelectorAll('.verse-group').forEach(node => node.classList.toggle('playing', node.dataset.verse === verseId));
  }

  return {renderNav, renderVerses, markPlaying, explanation};
}
