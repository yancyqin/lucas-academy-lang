// Exercise the reader's passage loading and failures without licensed text.
import assert from 'node:assert/strict';
import * as english from '../public/js/english.js';
import {parseRef, verseText} from '../worker/index.js';
import idioms from '../public/lessons/idioms-1/index.js';
import love from '../public/lessons/love/index.js';
import idioms2 from '../public/lessons/idioms-2/index.js';
import {scriptureRequests} from '../public/js/scripture.js';
import {WEB_ENGLISH, WEB_TRANSLATION} from '../public/lessons/scripture-web.js';

// Retain NIV passage behavior independently of the two bundled WEB lessons.
const runtimeIdioms = {...idioms, id: 'runtime-idioms', scriptureTranslation: undefined,
  verses: idioms.verses.map(({en, ...verse}) => ({...verse, id: `runtime-${verse.id}`, ...(verse.ref ? {} : {en})})),
  sections: idioms.sections.map(section => ({...section})),
};

for (const lesson of [idioms, idioms2, runtimeIdioms, love]) {
  for (const section of lesson.sections) {
    section.verseIds = lesson.verses.filter(v => v.n >= section.range[0] && v.n <= section.range[1]).map(v => v.id);
  }
}
const promise = runtimeIdioms.sections.find(s => s.title.zh === '一诺千金');
const scriptureIds = runtimeIdioms.verses.filter(v => promise.verseIds.includes(v.id) && v.ref).map(v => v.id);
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
  // WEB text and attribution are available even without any Worker or key.
  for (const lesson of [idioms, idioms2]) {
    english.register(lesson);
    assert.equal(english.credit(lesson), WEB_TRANSLATION);
    for (const section of lesson.sections) {
      assert.equal(await english.ensure(lesson, section), true);
      assert.deepEqual(scriptureRequests(lesson, section), []);
      assert.equal(english.loaded(lesson, section), true);
      for (const id of section.verseIds) {
        const verse = lesson.verses.find(v => v.id === id);
        if (verse.ref) assert.equal(english.text(id), WEB_ENGLISH[verse.ref]);
      }
    }
  }
  assert.equal(requested.length, 0, 'bundled WEB scripture never calls the NIV API');
  english.register(runtimeIdioms);
  const pending = english.ensure(runtimeIdioms, promise);
  assert.equal(english.ensure(runtimeIdioms, promise), pending, 'concurrent callers share one request');
  assert.equal(await pending, false);
  assert.deepEqual(requested, ['DEU.31.8', 'MAT.5.34', 'MAT.5.37']);
  assert.ok(scriptureIds.every(id => english.text(id) === undefined), 'failed section exposes no partial scripture English');
  assert.equal(english.problem(runtimeIdioms, promise), 'retry');
  assert.equal(await english.ensure(runtimeIdioms, promise), false);
  assert.equal(requested.length, 3, 'failure waits for an explicit retry');

  fail = false;
  assert.equal(await english.retry(runtimeIdioms, promise), true);
  assert.equal(english.loaded(runtimeIdioms, promise), true);
  for (const id of scriptureIds) {
    const {ref} = runtimeIdioms.verses.find(v => v.id === id);
    assert.equal(english.text(id), `Test text for ${ref} verse ${ref.split('.').at(-1)}`, 'chapter and verse are mapped to the correct unit');
  }
  assert.equal(english.problem(runtimeIdioms, promise), null);
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
  console.log('PASS: bundled WEB loads without API requests; runtime NIV selected passages, atomic loading, concurrent requests, retry, chapter reading and passage bounds');
} finally {
  globalThis.fetch = originalFetch;
}
