// The reading page's word panel (a side panel on wide screens, a bottom sheet
// on phones) and the wordbook. The study dialog shows words inside itself.
import {el, button} from './tokens.js';
import * as dictionary from './dictionary.js';
import {t} from './strings.js';

const $ = id => document.getElementById(id);

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
    $('panel-label').textContent = t('learnWord');
    const body = $('panel-body');
    body.replaceChildren();
    const title = el('h2', 'word-title', word);
    title.lang = lang === 'zh' ? 'zh-CN' : 'en';
    body.append(title, el('p', 'pronunciation', info.pronunciation || t(lang)));
    if (info.meaning) body.append(el('p', 'word-meaning', info.meaning));
    body.append(el('p', 'word-usage', info.explain || t('wordFallback')));
    const actions = el('div', 'panel-actions');
    actions.append(button(t('hearWord'), () => app.readWord(word, lang)));
    actions.append(button(t('slower'), () => app.readWord(word, lang, true)));
    actions.append(button(t(app.isMarked(word, lang) ? 'removeWord' : 'addWord'), () => {
      app.toggleMark(word, lang);
      render();
    }));
    body.append(actions);
    const figure = picture(info);
    if (figure) body.append(figure);
    if (verse) {
      const context = el('div', 'panel-sentence');
      context.append(el('span', 'overline', t('verseSimple', {n: verse.n})), ...app.explanation(verse));
      context.append(button(t('hearVerse'), () => app.readVerse(verse, lang)));
      body.append(context);
    }
  }

  function openWordbook() {
    selected = null;
    show();
    $('panel-label').textContent = t('myWordbook', {count: state.marks.length});
    const body = $('panel-body');
    body.replaceChildren();
    if (!state.marks.length) body.append(el('p', 'wordbook-empty', t('wordbookEmpty')));
    for (const item of state.marks) {
      const info = dictionary.info(item.word, item.lang, app.lesson());
      const row = button('', () => {
        selected = {word: item.word, lang: item.lang, verse: null};
        render();
      }, 'wordbook-row');
      row.append(document.createTextNode(item.word), el('span', '', `${t(item.lang)} · ${info.meaning || t('wordbookReview')}`));
      body.append(row);
    }
    body.append(el('p', 'overline', t('suggestedWords')));
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
