// Exercise the reader's passage loading and failures without licensed text.
import assert from 'node:assert/strict';
import * as english from '../public/js/english.js';
import {parseRef, verseText} from '../worker/index.js';
import idioms from '../public/lessons/idioms-1/index.js';
import love from '../public/lessons/love/index.js';

for (const lesson of [idioms, love]) {
  for (const section of lesson.sections) {
    section.verseIds = lesson.verses.filter(v => v.n >= section.range[0] && v.n <= section.range[1]).map(v => v.id);
  }
}
const promise = idioms.sections.find(s => s.title.zh === '一诺千金');
const scriptureIds = idioms.verses.filter(v => promise.verseIds.includes(v.id) && v.ref).map(v => v.id);
const requested = [];
let fail = true;
const originalFetch = globalThis.fetch;
globalThis.fetch = async url => {
  const ref = new URL(url, 'https://example.test').searchParams.get('ref');
  requested.push(ref);
  if (fail && ref === 'MAT.5.37') return new Response('{}', {status: 502});
  const {first, last} = parseRef(ref);
  return Response.json({
    verses: Array.from({length: last - first + 1}, (_, i) => ({n: first + i, text: `Test text for ${ref} verse ${first + i}`})),
    translation: {copyright: 'Test data'},
  });
};

try {
  english.register(idioms);
  const pending = english.ensure(idioms, promise);
  assert.equal(english.ensure(idioms, promise), pending, 'concurrent callers share one request');
  assert.equal(await pending, false);
  assert.deepEqual(requested, ['DEU.31.8', 'MAT.5.34', 'MAT.5.37']);
  assert.ok(scriptureIds.every(id => english.text(id) === undefined), 'failed section exposes no partial scripture English');
  assert.equal(english.problem(idioms, promise), 'retry');
  assert.equal(await english.ensure(idioms, promise), false);
  assert.equal(requested.length, 3, 'failure waits for an explicit retry');

  fail = false;
  assert.equal(await english.retry(idioms, promise), true);
  assert.equal(english.loaded(idioms, promise), true);
  for (const id of scriptureIds) {
    const {ref} = idioms.verses.find(v => v.id === id);
    assert.equal(english.text(id), `Test text for ${ref} verse ${ref.split('.').at(-1)}`, 'chapter and verse are mapped to the correct unit');
  }
  assert.equal(english.problem(idioms, promise), null);
  assert.equal(requested.length, 6);

  const before = requested.length;
  assert.equal(await english.ensure(love, love.sections[0]), true);
  assert.equal(requested[before], '1CO.13.1-4', 'ordinary chapter sections still use one request');
  assert.equal(english.loaded(love, love.sections[0]), true);

  for (const ref of ['MAT.5.34-37', 'MAT.5.35', 'MAT.5.36', '1JN.1.7']) {
    assert.throws(() => parseRef(ref), error => error.status === 400, `${ref} must not expose unselected verses`);
  }
  assert.deepEqual(parseRef('MAT.5.44-45'), {book: 'MAT', chapter: 5, first: 44, last: 45});
  assert.equal(verseText('  contemplatethe  ', '2CO', 3, 18), 'contemplate the');
  assert.equal(verseText('contemplatethe', 'MAT', 5, 37), 'contemplatethe');
  console.log('PASS: selected passages, atomic loading, concurrent requests, retry, chapter reading and passage bounds');
} finally {
  globalThis.fetch = originalFetch;
}
