// The English parallel (NIV). It is licensed, so it is requested from the
// Worker one section at a time and kept in memory for this visit only — never
// written to storage. The Chinese never depends on it.
//
// A 404 (no Worker behind a plain static server) or 503 (the server has no
// key) means no English this visit: say so once instead of asking again for
// every section. A 502 or a dropped connection stays retryable.
const texts = new Map(); // verse id -> text
const inFlight = new Map(); // section key -> promise
const failed = new Map(); // section key -> 'offline' | 'retry'
let latched = null; // 'no-server' | 'not-configured'
let attribution = null;

const key = (lesson, section) => `${lesson.id}/${section.id}`;

export const text = verseId => texts.get(verseId);
export const credit = () => attribution;

// null while loading or loaded; otherwise why the English is missing.
export function problem(lesson, section) {
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

export function ensure(lesson, section) {
  const k = key(lesson, section);
  if (loaded(lesson, section)) return Promise.resolve(true);
  if (latched || failed.has(k)) return Promise.resolve(false);
  if (inFlight.has(k)) return inFlight.get(k);
  const ref = `${lesson.passage.book}.${lesson.passage.chapter}.${section.range[0]}-${section.range[1]}`;
  const request = (async () => {
    try {
      const response = await fetch('/api/passage?' + new URLSearchParams({translation: 'NIV', ref}));
      if (response.status === 404) latched = 'no-server';
      else if (response.status === 503) latched = 'not-configured';
      if (!response.ok) throw new Error(String(response.status));
      const data = await response.json();
      const verses = Array.isArray(data.verses) ? data.verses : [];
      // All or nothing: a section never shows half its English.
      const byNumber = new Map(verses.filter(v => v && typeof v.text === 'string' && v.text.trim()).map(v => [v.n, v.text.trim()]));
      const numbers = section.verseIds.map(id => Number(id.split('.').pop()));
      if (numbers.some(n => !byNumber.has(n))) throw new Error('incomplete');
      section.verseIds.forEach((id, i) => texts.set(id, byNumber.get(numbers[i])));
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
  if (reason === 'offline') return '现在没有网络，英文暂时看不到。中文仍然可以学习。';
  if (reason === 'not-configured') return '这个网站的英文服务还没有设置好。中文仍然可以学习。';
  if (reason === 'no-server') return '这里没有连接英文服务，只能先读中文。';
  return '英文暂时没有连接上，中文仍然可以学习。';
}
