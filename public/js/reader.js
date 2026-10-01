// The reading page: the lesson rail, and the section's verses — each verse
// whole in the first language, then the same verse in the second.
import {el, button, fill} from './tokens.js';
import * as english from './english.js';

const $ = id => document.getElementById(id);
const languageName = lang => (lang === 'zh' ? '中文' : 'English');

export function createReader(app) {
  const {state} = app;

  function renderNav() {
    const lesson = app.lesson();
    $('lesson-select').value = lesson.id;
    $('lesson-reference').textContent = lesson.reference;
    const nav = $('section-nav');
    nav.replaceChildren();
    lesson.sections.forEach((section, i) => {
      const done = app.isDone(section);
      const item = button('', () => app.changeSection(i), 'section-button');
      if (i === state.section) item.setAttribute('aria-current', 'step');
      const copy = el('span');
      const count = section.verseIds.length;
      copy.append(el('strong', '', section.title), el('small', '', `${section.range[0]}–${section.range[1]} 节 · ${count} 句`));
      item.append(el('span', 'section-number', done ? '✓' : String(i + 1)), copy);
      if (done) item.setAttribute('aria-label', `${section.title}，已学完`);
      nav.append(item);
    });
    const finished = lesson.sections.filter(app.isDone).length;
    $('progress-text').textContent = `已学 ${finished} / ${lesson.sections.length} 小段`;
    $('lesson-progress').max = lesson.sections.length;
    $('lesson-progress').value = finished;
  }

  function line(verse, lang) {
    const row = el('div', 'language-line');
    row.dataset.language = lang;
    const tools = el('div', 'line-controls');
    tools.append(el('span', 'lang-code', lang === 'zh' ? '中' : 'EN'));
    const play = button('▶', () => app.readVerse(verse, lang), 'line-play');
    play.setAttribute('aria-label', `读第${verse.n}节${languageName(lang)}`);
    tools.append(play);
    if (state.dictation) {
      const slow = button('慢读', () => app.readVerse(verse, lang, true), 'slow-verse');
      slow.setAttribute('aria-label', `逐词慢读第${verse.n}节${languageName(lang)}`);
      tools.append(slow);
    }
    row.append(tools);

    const hidden = state.dictation && lang === state.first && !state.revealed.has(verse.id + lang);
    if (hidden) {
      const reveal = button('先听一听，写好后点这里看原文', () => {
        state.revealed.add(verse.id + lang);
        renderVerses();
      }, 'blank-line');
      reveal.setAttribute('aria-label', `显示第${verse.n}节${languageName(lang)}原文`);
      row.append(reveal);
      return row;
    }
    const text = el('p', 'verse-text ' + lang);
    text.lang = lang === 'zh' ? 'zh-CN' : 'en';
    const words = lang === 'zh' ? verse.tokens.join('') : english.text(verse.id);
    if (!words) {
      const reason = english.problem(app.lesson(), app.section());
      text.append(el('span', 'en-pending', reason ? '英文暂时看不到，请看下方的说明。' : '正在加载这一节英文…'));
    } else {
      fill(text, {lang, text: words, tokens: verse.tokens}, app.tokenContext(),
        (word, language, source) => app.openWord(word, language, verse, source));
    }
    row.append(text);
    return row;
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
        const en = el('p', '', verse.explain.en);
        en.lang = 'en';
        detail.append(el('summary', '', '用简单的话理解'), el('p', '', verse.explain.zh), en);
        const learn = button('学这一句', () => app.study.open(verse.id, learn), 'verse-study');
        learn.setAttribute('aria-label', `学第${verse.n}节这一句`);
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
      status.append(document.createTextNode(english.describe(reason)), button('重试英文', app.retryEnglish));
    }
  }

  function markPlaying(verseId) {
    document.querySelectorAll('.verse-group').forEach(node => node.classList.toggle('playing', node.dataset.verse === verseId));
  }

  return {renderNav, renderVerses, markPlaying};
}
