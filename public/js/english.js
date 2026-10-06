// The English parallel (NIV). It is licensed, so it is requested from the
// Worker one section at a time and kept in memory for this visit only — never
// written to storage. The Chinese never depends on it.
//
// A 404 (no Worker behind a plain static server) or 503 (the server has no
// key) means no English this visit: say so once instead of asking again for
// every section. A 502 or a dropped connection stays retryable.
//
// A public-domain story carries its own English (verse.en): it is registered
// once and never fetched. A lesson of poems carries its poems' English the
// same way; only its scripture units (verse.ref, like 'PSA.121.1') are fetched.
import {t} from './strings.js';

const texts = new Map(); // verse id -> text
const inFlight = new Map(); // section key -> promise
const failed = new Map(); // section key -> 'offline' | 'retry'
let latched = null; // 'no-server' | 'not-configured'
let attribution = null;

const key = (lesson, section) => `${lesson.id}/${section.id}`;

export const text = verseId => texts.get(verseId);
export const credit = () => attribution;

export function register(lesson) {
  for (const verse of lesson.verses) if (typeof verse.en === 'string' && verse.en) texts.set(verse.id, verse.en);
}

// null while loading or loaded; otherwise why the English is missing.
export function problem(lesson, section) {
  if (loaded(lesson, section)) return null;
  return latched || failed.get(key(lesson, section)) || null;
}

export function loaded(lesson, section) {
  return section.verseIds.every(id => texts.has(id));
}

export function retry(lesson, section) {
  failed.delete(key(lesson, section));
  latched = null;
  return ensure(lesson, section);
}

// What a section asks the Worker for: a passage lesson's verses of its
// chapter, or a poem lesson's scripture units (consecutive verses of one
// chapter). Null when nothing in the section is fetched.
function wanted(lesson, section) {
  if (lesson.passage) {
    return {
      ref: `${lesson.passage.book}.${lesson.passage.chapter}.${section.range[0]}-${section.range[1]}`,
      ids: section.verseIds,
      numbers: section.verseIds.map(id => Number(id.split('.').pop())),
    };
  }
  const verses = lesson.verses.filter(v => v.ref && section.verseIds.includes(v.id));
  if (!verses.length) return null;
  const [book, chapter] = verses[0].ref.split('.');
  const numbers = verses.map(v => Number(v.ref.split('.')[2]));
  const range = numbers.length > 1 ? `${numbers[0]}-${numbers[numbers.length - 1]}` : String(numbers[0]);
  return {ref: `${book}.${chapter}.${range}`, ids: verses.map(v => v.id), numbers};
}

export function ensure(lesson, section) {
  const k = key(lesson, section);
  if (loaded(lesson, section)) return Promise.resolve(true);
  const want = wanted(lesson, section);
  if (!want || latched || failed.has(k)) return Promise.resolve(false);
  if (inFlight.has(k)) return inFlight.get(k);
  const request = (async () => {
    try {
      const response = await fetch('/api/passage?' + new URLSearchParams({translation: 'NIV', ref: want.ref}));
      if (response.status === 404) latched = 'no-server';
      else if (response.status === 503) latched = 'not-configured';
      if (!response.ok) throw new Error(String(response.status));
      const data = await response.json();
      const verses = Array.isArray(data.verses) ? data.verses : [];
      // All or nothing: a section never shows half its English.
      const byNumber = new Map(verses.filter(v => v && typeof v.text === 'string' && v.text.trim()).map(v => [v.n, v.text.trim()]));
      if (want.numbers.some(n => !byNumber.has(n))) throw new Error('incomplete');
      want.ids.forEach((id, i) => texts.set(id, byNumber.get(want.numbers[i])));
      if (data.translation) attribution = data.translation;
      failed.delete(k);
      return true;
    } catch {
      if (!latched) failed.set(k, navigator.onLine === false ? 'offline' : 'retry');
      return false;
    } finally {
      inFlight.delete(k);
    }
  })();
  inFlight.set(k, request);
  return request;
}

export function describe(reason) {
  if (reason === 'offline') return t('englishOffline');
  if (reason === 'not-configured') return t('englishNotConfigured');
  if (reason === 'no-server') return t('englishNoServer');
  return t('englishRetry');
}
