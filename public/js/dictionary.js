// Word lookups for both languages. A Chinese word is found in its lesson's
// dictionary; an English word points to the Chinese word it translates in that
// lesson (so 忍耐 and "patient" share one entry, and one picture), or else to
// the everyday list. Pictures are optional: a word always teaches by text.
import {englishBasic} from '../lessons/english-basic.js';

let lessons = [];
let pictures = {};

export function setLessons(list) {
  lessons = list;
}

// images/words/manifest.json: concepts[] with {id, src, alt, caption}. Only a
// concept with a real `src` gets a picture; the rest show no frame at all.
export async function loadPictures() {
  try {
    const response = await fetch('images/words/manifest.json');
    if (!response.ok) return;
    const data = await response.json();
    pictures = Object.fromEntries((data.concepts || [])
      .filter(c => c && c.id && typeof c.src === 'string' && c.src)
      .map(c => [c.id, {src: c.src, alt: c.alt || '', caption: c.caption || ''}]));
  } catch {
    pictures = {};
  }
}

const isWord = token => /[\p{L}\p{N}]/u.test(token);
export {isWord};

// Current lesson first, so a word reads in the sense of the passage in hand.
function ordered(lesson) {
  return lesson ? [lesson, ...lessons.filter(l => l !== lesson)] : lessons;
}

export function chinese(word, lesson) {
  for (const l of ordered(lesson)) if (l.dict[word]) return {entry: l.dict[word], lesson: l};
  return null;
}

export function english(word, lesson) {
  const lower = word.toLowerCase();
  for (const l of ordered(lesson)) {
    const zh = l.aliases?.[lower];
    if (zh && l.dict[zh]) return {zh, entry: l.dict[zh], lesson: l};
  }
  return null;
}

export const pinyin = (word, lesson) => chinese(word, lesson)?.entry.pinyin || '';

// Words worth an underline: pictured concepts in Chinese, and English words
// that point at one of the lesson's content words (not its small connectors).
export function isKey(word, lang, lesson) {
  if (lang === 'zh') return Boolean(chinese(word, lesson)?.entry.concept);
  const found = english(word, lesson);
  return Boolean(found && !found.entry.small);
}

export function info(word, lang, lesson) {
  if (lang === 'zh') {
    const found = chinese(word, lesson);
    const entry = found?.entry || {};
    return {
      word, lang,
      pronunciation: entry.pinyin || '',
      meaning: entry.meaning || '',
      explain: entry.meaningZh || entry.usage || '',
      picture: entry.concept ? pictures[entry.concept] || null : null,
    };
  }
  const found = english(word, lesson);
  if (found) {
    return {
      word, lang,
      pronunciation: `${found.zh} · ${found.entry.pinyin}`,
      meaning: found.zh,
      explain: found.entry.meaningZh || '',
      picture: found.entry.concept ? pictures[found.entry.concept] || null : null,
    };
  }
  const basic = englishBasic[word.toLowerCase()];
  return {word, lang, pronunciation: '', meaning: basic?.[0] || '', explain: basic?.[1] || '', picture: null};
}
