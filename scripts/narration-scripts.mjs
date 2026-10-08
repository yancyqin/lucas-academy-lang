// Build lucas-narrate scripts (lucas-academy-media) for one lesson: every whole
// verse and every aligned clause, in Chinese and in English.
//
//   node scripts/narration-scripts.mjs love ../lucas-academy-media/data/processed/lucas-lang
//
// Writes <lesson>-zh.json and <lesson>-en.json: {"lines": [{id, verseId, unitId, text}]}.
// The Chinese comes from the lesson. A passage's English is licensed: it is
// fetched from /api/passage (LANG_API_URL, default http://127.0.0.1:8197 —
// `npm run dev`) and written only to the output directory, which must be
// outside this repository so it can never be committed here. A story's
// English is public domain and comes from the lesson itself.
import {mkdir, writeFile} from 'node:fs/promises';
import {resolve, relative, isAbsolute} from 'node:path';
import {fileURLToPath} from 'node:url';
import {lessons} from '../public/lessons/index.js';
import {studyUnits, chineseUnits, fingerprint} from '../public/js/units.js';

const [lessonId, outDir, ...options] = process.argv.slice(2);
const omitScripture = options.includes('--omit-scripture');
const idiomsOnly = options.includes('--idioms-only');
if (options.some(option => !['--omit-scripture', '--idioms-only'].includes(option))) throw new Error('Unknown narration option');
if (!lessonId || !outDir) {
  console.error('usage: node scripts/narration-scripts.mjs <lesson> <output-dir outside this repo> [--omit-scripture | --idioms-only]');
  process.exit(2);
}
const repo = fileURLToPath(new URL('..', import.meta.url));
const target = resolve(outDir);
const inside = relative(repo, target);
if (!inside.startsWith('..') && !isAbsolute(inside)) {
  console.error('Refusing to write runtime English inside the lang repository.');
  process.exit(2);
}

const entry = lessons.find(l => l.id === lessonId);
if (!entry) throw new Error(`Unknown lesson: ${lessonId}`);
const lesson = (await entry.load()).default;
if (idiomsOnly && lesson.kind !== 'idioms') throw new Error('--idioms-only requires an idiom lesson');
const titleNumbers = new Set(lesson.sections.map(section => section.range[0]));
const verses = idiomsOnly ? lesson.verses.filter(v => titleNumbers.has(v.n))
  : omitScripture ? lesson.verses.filter(v => !lesson.passage && !v.ref) : lesson.verses;
const api = process.env.LANG_API_URL || 'http://127.0.0.1:8197';

const english = new Map();
for (const section of lesson.passage && !omitScripture && !idiomsOnly ? lesson.sections : []) {
  const ref = `${lesson.passage.book}.${lesson.passage.chapter}.${section.range[0]}-${section.range[1]}`;
  const response = await fetch(`${api}/api/passage?${new URLSearchParams({translation: 'NIV', ref})}`);
  if (!response.ok) throw new Error(`/api/passage ${ref} returned ${response.status}`);
  for (const verse of (await response.json()).verses) english.set(verse.n, verse.text);
}
// A poem lesson's scripture units name their verse instead (ref, 'PSA.121.1').
for (const verse of lesson.passage ? [] : verses.filter(v => v.ref)) {
  const response = await fetch(`${api}/api/passage?${new URLSearchParams({translation: 'NIV', ref: verse.ref})}`);
  if (!response.ok) throw new Error(`/api/passage ${verse.ref} returned ${response.status}`);
  const found = (await response.json()).verses?.[0]?.text?.trim();
  if (found) english.set(verse.ref, found);
}

// What the voice reads: a poem's line breaks become pauses, so a line that
// ends without a mark gets a comma. The hash stays that of the text on screen.
const spoken = (text, language) => text.trim()
  .replace(/([^\s\p{P}])[ \t]*\n\s*/gu, language === 'zh' ? '$1，' : '$1, ')
  .replace(/\s*\n\s*/g, language === 'zh' ? '' : ' ');

const pad = n => String(n).padStart(2, '0');
const zh = [];
const en = [];
for (const verse of verses) {
  const text = verse.en ?? english.get(verse.ref ?? verse.n);
  if (!text) throw new Error(`No English for ${verse.id}`);
  const units = studyUnits(lesson, verse, text);
  if (lesson.study?.[verse.id]?.units && units.reason) {
    throw new Error(`${verse.id}: alignment ${units.reason}; fix it before narrating clauses`);
  }
  const line = (list, unitId, words) => list.push({
    id: `v${pad(verse.n)}-${unitId}`, verseId: verse.id, unitId,
    text: spoken(words, list === zh ? 'zh' : 'en'), hash: fingerprint(words),
  });
  line(zh, 'whole', verse.tokens.join(''));
  line(en, 'whole', text);
  const zhParts = chineseUnits(lesson, verse);
  units.parts.forEach((part, i) => {
    if (part.zh !== zhParts[i].zh) throw new Error(`${verse.id}/${part.id}: Chinese clause mismatch`);
    line(zh, part.id, part.zh);
    line(en, part.id, part.en);
  });
}

await mkdir(target, {recursive: true});
for (const [language, lines] of [['zh', zh], ['en', en]]) {
  const file = resolve(target, `${lesson.id}-${language}.json`);
  await writeFile(file, JSON.stringify({lesson: lesson.id, language, lines}, null, 2) + '\n');
  console.log(`${lines.length} ${language} lines -> ${file}`);
}
