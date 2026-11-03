import {el} from './tokens.js';
import {t, uiLanguage} from './strings.js';

export const SENTENCE_GAME_PAGE = 'https://bible.lucasacademy.org/sentence.html';

// Shared with Sentence Playground: text, lang, ui, title and optional mode
// (sequence | characters | words). The fragment preserves punctuation and
// keeps the sentence out of the destination server's HTTP request.
export function sentenceGameUrl({text, lang, ui = 'zh', title = '', mode = 'sequence'}, base = SENTENCE_GAME_PAGE) {
  const url = new URL(base);
  url.search = '';
  url.hash = new URLSearchParams({text, lang, ui, title, mode}).toString();
  return url.href;
}

export function sentenceGames({zh, en, title, first = 'zh', onOpen}) {
  const group = el('div', 'sentence-games');
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', t('sentenceGames'));
  group.append(el('span', 'sentence-games-label', t('sentenceGames')));
  const texts = {zh, en};
  for (const lang of [first, first === 'zh' ? 'en' : 'zh']) {
    if (!texts[lang]) continue;
    const link = el('a', 'sentence-game-link', t('sentenceGame_' + lang) + ' ↗');
    link.href = sentenceGameUrl({text: texts[lang], lang, ui: uiLanguage(), title});
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', t('sentenceGameLabel', {language: t(lang)}));
    if (onOpen) link.addEventListener('click', onOpen);
    group.append(link);
  }
  return group;
}
