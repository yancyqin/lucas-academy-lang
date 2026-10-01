// The reading page's word panel (a side panel on wide screens, a bottom sheet
// on phones) and the wordbook. The study dialog shows words inside itself.
import {el, button} from './tokens.js';
import * as dictionary from './dictionary.js';

const $ = id => document.getElementById(id);
const languageName = lang => (lang === 'zh' ? '中文' : 'English');

// A word's picture, when one exists. No picture: nothing at all, not an empty frame.
export function picture(info) {
  if (!info.picture) return null;
  const figure = el('figure', 'word-picture');
  const img = el('img');
  img.src = info.picture.src;
  img.alt = info.picture.alt;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.addEventListener('error', () => figure.remove());
  figure.append(img);
  if (info.picture.caption) figure.append(el('figcaption', '', info.picture.caption));
  return figure;
}

export function createWordPanel(app) {
  const {state} = app;
  let selected = null; // {word, lang, verse}
  let restoreFocus = null;

  function show() {
    $('word-panel').hidden = false;
    $('workspace').classList.add('word-open');
  }

  function close() {
    selected = null;
    $('word-panel').hidden = true;
    $('workspace').classList.remove('word-open');
    document.querySelectorAll('#verses .word.selected').forEach(n => n.classList.remove('selected'));
    if (restoreFocus?.isConnected) restoreFocus.focus({preventScroll: true});
    restoreFocus = null;
  }

  function open(word, lang, verse, source) {
    if (state.dictation && lang === state.first) return; // it would spell out the answer
    restoreFocus = source;
    selected = {word, lang, verse};
    render();
    document.querySelectorAll('#verses .word.selected').forEach(n => n.classList.remove('selected'));
    source?.classList.add('selected');
  }

  function render() {
    if (!selected) return;
    show();
    const {word, lang, verse} = selected;
    const info = dictionary.info(word, lang, app.lesson());
    $('panel-label').textContent = '一起认识这个词';
    const body = $('panel-body');
    body.replaceChildren();
    const title = el('h2', 'word-title', word);
    title.lang = lang === 'zh' ? 'zh-CN' : 'en';
    body.append(title, el('p', 'pronunciation', info.pronunciation || languageName(lang)));
    if (info.meaning) body.append(el('p', 'word-meaning', info.meaning));
    body.append(el('p', 'word-usage', info.explain || '先听发音，再和对方一起看看这句话的意思。'));
    const actions = el('div', 'panel-actions');
    actions.append(button('听这个词', () => app.readWord(word, lang)));
    actions.append(button('慢一点', () => app.readWord(word, lang, true)));
    actions.append(button(app.isMarked(word, lang) ? '移出生词本' : '加入生词本', () => {
      app.toggleMark(word, lang);
      render();
    }));
    body.append(actions);
    const figure = picture(info);
    if (figure) body.append(figure);
    if (verse) {
      const context = el('div', 'panel-sentence');
      const en = el('p', '', verse.explain.en);
      en.lang = 'en';
      context.append(el('span', 'overline', `第 ${verse.n} 节 · 用简单的话理解`), el('p', '', verse.explain.zh), en);
      context.append(button('听这一整句', () => app.readVerse(verse, lang)));
      body.append(context);
    }
  }

  function openWordbook() {
    selected = null;
    show();
    $('panel-label').textContent = `我的生词本 · ${state.marks.length}`;
    const body = $('panel-body');
    body.replaceChildren();
    if (!state.marks.length) body.append(el('p', 'wordbook-empty', '点开一个词，把它加入生词本。下次来，还能在这里找到它。'));
    for (const item of state.marks) {
      const info = dictionary.info(item.word, item.lang, app.lesson());
      const row = button('', () => {
        selected = {word: item.word, lang: item.lang, verse: null};
        render();
      }, 'wordbook-row');
      row.append(document.createTextNode(item.word), el('span', '', `${languageName(item.lang)} · ${info.meaning || '听发音，复习这个词'}`));
      body.append(row);
    }
    body.append(el('p', 'overline', '这篇可以一起学的词'));
    for (const word of app.lesson().suggested || []) {
      body.append(button(word, () => {
        selected = {word, lang: 'zh', verse: null};
        render();
      }, 'wordbook-row'));
    }
    $('close-panel').focus({preventScroll: true});
  }

  $('close-panel').onclick = close;
  $('open-wordbook').onclick = () => {
    restoreFocus = $('open-wordbook');
    openWordbook();
  };
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !app.study?.isOpen && !$('word-panel').hidden) close();
  });

  return {open, close, refresh: render, get selected() { return selected; }};
}
