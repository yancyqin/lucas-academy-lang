// Checks against the live English: npm run check:english
//   LANG_API_URL=https://lang.lucasacademy.org npm run check:english
// (default http://127.0.0.1:8197, i.e. npm run dev)
//
// - every section's English loads, verse by verse;
// - every aligned verse splits into its clauses and rebuilds both languages
//   exactly; changed or missing English falls back to the whole verse;
// - every English narration clip was recorded from today's English;
// - no file in this repository contains licensed NIV text (file names only are
//   printed — the text itself stays in memory).
import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join, relative, extname} from 'node:path';
import {lessons as registry} from '../public/lessons/index.js';
import {studyUnits, fingerprint, englishWords} from '../public/js/units.js';
import {scriptureRequests} from '../public/js/scripture.js';
import {englishBasic} from '../public/lessons/english-basic.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const api = process.env.LANG_API_URL || 'http://127.0.0.1:8197';
const lines = [];
const sentences = new Set();

for (const entry of registry) {
  const lesson = (await entry.load()).default;
  if (!lesson.passage) {
    const english = new Map(lesson.verses.filter(v => v.en).map(v => [v.id, v.en]));
    // A story's English is public domain and ships with the lesson: nothing to
    // fetch or keep out. A lesson of poems fetches only its scripture units.
    const scripture = lesson.sections.flatMap(section => scriptureRequests(lesson, section));
    for (const {ref, ids, numbers} of scripture) {
      const response = await fetch(`${api}/api/passage?${new URLSearchParams({translation: 'NIV', ref})}`);
      assert.equal(response.ok, true, `${ref}: /api/passage returned ${response.status}`);
      assert.match(response.headers.get('cache-control') || '', /no-store/, `${ref}: English must not be cached by the browser`);
      const data = await response.json();
      assert.ok(data.translation?.copyright, `${ref}: the copyright notice must come with the text`);
      const byNumber = new Map(data.verses.map(v => [v.n, v.text]));
      for (const [i, id] of ids.entries()) {
        const text = byNumber.get(numbers[i]);
        assert.ok(text, `${id} (${ref}): no English`);
        english.set(id, text);
        sentences.add(text.replace(/\s+/g, ' ').trim().toLowerCase());
      }
    }
    const fetched = scripture.reduce((sum, request) => sum + request.ids.length, 0);
    if (lesson.kind === 'idioms') {
      const words = new Set([...english.values()].flatMap(text => (text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || []).map(word => word.toLowerCase())));
      const missing = [...words].filter(word => !lesson.aliases[word] && !englishBasic[word]);
      assert.deepEqual(missing, [], `${lesson.id}: English words need Chinese meanings`);
    }
    let checkedClips = 0;
    const manifestPath = join(root, 'public', lesson.audio);
    if (existsSync(manifestPath)) {
      const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
      for (const clip of manifest.clips.filter(c => c.language === 'en')) {
        const verse = lesson.verses.find(v => v.id === clip.verseId);
        assert.ok(verse, `${clip.verseId}: unknown verse`);
        const units = studyUnits(lesson, verse, english.get(verse.id));
        const unit = clip.unitId === 'whole' ? units.whole : units.parts.find(p => p.id === clip.unitId);
        assert.ok(unit, `${clip.verseId}/${clip.unitId}: no such unit today`);
        assert.equal(fingerprint(unit.en), clip.textHash, `${clip.verseId}/${clip.unitId}: English clip was recorded from different text`);
        checkedClips += 1;
      }
    }
    lines.push(`${lesson.title.zh}: public-domain English in the lesson` +
      (lesson.scriptureTranslation?.id === 'WEB' ? `; ${lesson.verses.filter(v => v.ref).length} WEB Classic verses bundled` : fetched ? `; ${fetched} NIV scripture verses fetched` : ', not fetched') +
      `; ${checkedClips} English clips match the text`);
    continue;
  }
  const english = new Map();
  for (const section of lesson.sections) {
    const ref = `${lesson.passage.book}.${lesson.passage.chapter}.${section.range[0]}-${section.range[1]}`;
    const response = await fetch(`${api}/api/passage?${new URLSearchParams({translation: 'NIV', ref})}`);
    assert.equal(response.ok, true, `${ref}: /api/passage returned ${response.status}`);
    assert.match(response.headers.get('cache-control') || '', /no-store/, `${ref}: English must not be cached by the browser`);
    const data = await response.json();
    assert.ok(data.translation?.copyright, `${ref}: the copyright notice must come with the text`);
    for (const verse of data.verses) english.set(verse.n, verse.text);
  }

  let clauses = 0;
  let wholeOnly = 0;
  for (const verse of lesson.verses) {
    const text = english.get(verse.n);
    assert.ok(text, `${verse.id}: no English`);
    sentences.add(text.replace(/\s+/g, ' ').trim().toLowerCase());
    const units = studyUnits(lesson, verse, text);
    assert.equal(units.whole.zh, verse.tokens.join(''));
    assert.ok(units.whole.question?.zh && units.whole.question?.en, `${verse.id}: question`);
    if (!lesson.study[verse.id]?.units) {
      assert.equal(units.parts.length, 0);
      wholeOnly += 1;
      continue;
    }
    assert.equal(units.reason, null, `${verse.id}: alignment is "${units.reason}" for today's English`);
    assert.equal(units.parts.map(u => u.zh).join(''), verse.tokens.join(''), `${verse.id}: Chinese rebuild`);
    assert.equal(units.parts.map(u => u.en).join(''), text, `${verse.id}: English rebuild`);
    for (const part of units.parts) {
      assert.equal(part.tokens.join(''), part.zh, `${verse.id}/${part.id}: tokens`);
      if (englishWords(part.en).length >= 4) sentences.add(part.en.replace(/\s+/g, ' ').trim().toLowerCase());
    }
    assert.equal(studyUnits(lesson, verse, text + ' changed').parts.length, 0, `${verse.id}: changed text must fall back`);
    assert.equal(studyUnits(lesson, verse, '').parts.length, 0, `${verse.id}: missing text must fall back`);
    clauses += units.parts.length;
  }

  // English narration must be of today's English.
  let checkedClips = 0;
  const manifestPath = join(root, 'public', lesson.audio);
  if (existsSync(manifestPath)) {
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    for (const clip of manifest.clips.filter(c => c.language === 'en')) {
      const verse = lesson.verses.find(v => v.id === clip.verseId);
      const units = studyUnits(lesson, verse, english.get(verse.n));
      const unit = clip.unitId === 'whole' ? units.whole : units.parts.find(p => p.id === clip.unitId);
      assert.ok(unit, `${clip.verseId}/${clip.unitId}: no such unit today`);
      assert.equal(fingerprint(unit.en), clip.textHash, `${clip.verseId}/${clip.unitId}: English clip was recorded from different text`);
      checkedClips += 1;
    }
  }
  lines.push(`${lesson.title.zh}: ${lesson.verses.length} verses, ${clauses} aligned clauses rebuilt exactly, ` +
    `${wholeOnly} whole-verse only, ${checkedClips} English clips match the text`);
}

// The licensed text must not be in any file of the repository.
async function walk(dir) {
  const out = [];
  for (const item of await readdir(dir, {withFileTypes: true})) {
    if (['.git', 'node_modules', '.wrangler'].includes(item.name)) continue;
    const path = join(dir, item.name);
    if (item.isDirectory()) out.push(...await walk(path));
    else if (/^\.(js|mjs|json|md|html|css|txt|py|jsonc|svg)$/.test(extname(item.name)) || !extname(item.name)) out.push(path);
  }
  return out;
}
const leaks = [];
for (const file of await walk(root)) {
  const text = (await readFile(file, 'utf8').catch(() => '')).replace(/\s+/g, ' ').toLowerCase();
  if ([...sentences].some(sentence => text.includes(sentence))) leaks.push(relative(root, file));
}
assert.deepEqual(leaks, [], `English text found in: ${leaks.join(', ')}`);
console.log('PASS\n' + lines.map(l => '- ' + l).join('\n') + `\n- No licensed NIV sentence found in the repository (${sentences.size} sentences and clauses checked)`);
