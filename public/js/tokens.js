// Turns a verse (or one clause of it) into tappable words, for the reading page
// and the study dialog alike. Chinese arrives pre-segmented; English is split
// on word boundaries, keeping apostrophes and hyphens inside a word.
import * as dictionary from './dictionary.js';

const OPENERS = /^[（「『《“]$/;
const ENGLISH_WORDS = /([\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*)/u;

export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function button(text, onClick, className = '') {
  const node = el('button', className, text);
  node.type = 'button';
  node.addEventListener('click', onClick);
  return node;
}

// ctx: {lesson, isMarked(word, lang), selected: {word, lang} | null}
function wordButton(word, lang, ctx, onWord) {
  const node = button('', () => onWord(word, lang, node), 'word');
  if (lang === 'zh') {
    const ruby = el('ruby', '', word);
    const pinyin = dictionary.pinyin(word, ctx.lesson);
    if (pinyin) ruby.append(el('rt', '', pinyin));
    node.append(ruby);
    node.setAttribute('aria-label', `${word}${pinyin ? '，' + pinyin : ''}`);
  } else {
    node.textContent = word;
  }
  if (dictionary.isKey(word, lang, ctx.lesson)) node.classList.add('key-word');
  node.classList.toggle('marked', ctx.isMarked(word, lang));
  if (ctx.selected?.word === word && ctx.selected.lang === lang) node.classList.add('selected');
  return node;
}

// Chinese punctuation stays glued to the word before it (and an opening
// bracket to the word after), so a line never starts with ，or ends with （.
// A poem keeps its lines: a "\n" (a token of its own in Chinese, inside the
// text in English) starts a new line.
export function fill(container, {lang, text, tokens}, ctx, onWord) {
  if (lang === 'zh') {
    let prefix = '';
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];
      if (token === '\n') {
        container.append(el('br'));
        continue;
      }
      if (OPENERS.test(token)) {
        prefix += token;
        continue;
      }
      if (!dictionary.isWord(token)) {
        container.append(document.createTextNode(prefix + token));
        prefix = '';
        continue;
      }
      const group = el('span', 'lexeme');
      if (prefix) {
        group.append(document.createTextNode(prefix));
        prefix = '';
      }
      group.append(wordButton(token, lang, ctx, onWord));
      while (i + 1 < tokens.length && tokens[i + 1] !== '\n' && !dictionary.isWord(tokens[i + 1]) && !OPENERS.test(tokens[i + 1])) {
        group.append(document.createTextNode(tokens[++i]));
      }
      container.append(group);
    }
    return;
  }
  for (const part of text.split(ENGLISH_WORDS)) {
    if (dictionary.isWord(part)) {
      container.append(wordButton(part, lang, ctx, onWord));
      continue;
    }
    part.split('\n').forEach((piece, i) => {
      if (i) container.append(el('br'));
      if (piece) container.append(document.createTextNode(piece));
    });
  }
}

// Words of a line for word-by-word slow reading.
export function spokenWords(lang, text, tokens) {
  const parts = lang === 'zh' ? tokens : text.match(/[\p{L}\p{N}’'-]+/gu) || [];
  return parts.filter(part => dictionary.isWord(part));
}
