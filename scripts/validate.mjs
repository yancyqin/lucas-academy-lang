// Offline content and release checks: npm run validate
// (The English itself is checked by npm run check:english, against the API.)
import assert from 'node:assert/strict';
import {readFile, readdir, stat} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join, relative, extname} from 'node:path';
import {lessons as registry} from '../public/lessons/index.js';
import {PASSAGES, MAX_VERSES} from '../public/lessons/passages.js';
import {englishBasic} from '../public/lessons/english-basic.js';
import {chineseClauses, chineseUnits, fingerprint} from '../public/js/units.js';

const ENGLISH_WORDS = /[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu;

const root = fileURLToPath(new URL('..', import.meta.url));
const pub = join(root, 'public');
const failures = [];
const check = (ok, message) => {
  if (!ok) failures.push(message);
};
const isWord = token => /[\p{L}\p{N}]/u.test(token);
const summary = [];

const lessons = [];
for (const entry of registry) {
  const lesson = (await entry.load()).default;
  check(lesson.id === entry.id, `registry id ${entry.id} != lesson id ${lesson.id}`);
  lessons.push(lesson);
}
check(new Set(lessons.map(l => l.id)).size === lessons.length, 'duplicate lesson ids');

for (const lesson of lessons) {
  const tag = lesson.id;
  check(lesson.title?.zh && lesson.title?.en && lesson.reference?.zh && lesson.reference?.en, `${tag}: title and reference need both languages`);
  check(registry.find(e => e.id === tag)?.title?.en === lesson.title.en, `${tag}: registry title differs from the lesson`);
  // Verses: stable ids, numbered in order, text intact.
  const ids = lesson.verses.map(v => v.id);
  check(new Set(ids).size === ids.length, `${tag}: duplicate verse ids`);
  lesson.verses.forEach((v, i) => {
    check(v.n === i + 1, `${tag}: verse ${v.id} out of order`);
    const id = lesson.passage ? `${lesson.passage.book}.${lesson.passage.chapter}.${v.n}` : `${lesson.id}.${v.n}`;
    check(v.id === id, `${tag}: verse id ${v.id} should be ${id}`);
    check(v.tokens.length && v.tokens.every(t => t.length), `${tag}: ${v.id} has an empty token`);
    check(v.explain?.zh && v.explain?.en, `${tag}: ${v.id} needs both 用简单的话理解 lines`);
  });

  if (lesson.passage) {
    // The English endpoint must serve exactly this passage.
    const allowed = PASSAGES[`${lesson.passage.book}.${lesson.passage.chapter}`];
    check(allowed && allowed[0] === 1 && allowed[1] === lesson.verses.length, `${tag}: passages.js does not list verses 1–${lesson.verses.length}`);
  } else {
    // A story carries its own public-domain English, typeset, and names its sources.
    check(lesson.kind === 'story', `${tag}: a lesson without a passage must be a story`);
    const {note, links} = lesson.sources || {};
    check(note?.zh && note?.en && links?.length && links.every(l => l.href?.startsWith('https://') && l.label?.zh && l.label?.en),
      `${tag}: a story names its sources, in both languages`);
    for (const v of lesson.verses) {
      check(typeof v.en === 'string' && v.en.length > 1 && v.en === v.en.trim() && !/\s{2}|"/.test(v.en), `${tag}: ${v.id} needs its English (curly quotes, single spaces)`);
    }
  }

  // Sections: ≤ 7 verses, contiguous, covering every verse once.
  let next = 1;
  for (const s of lesson.sections) {
    check(s.range[0] === next, `${tag}: section ${s.id} should start at verse ${next}`);
    const size = s.range[1] - s.range[0] + 1;
    check(size >= 1 && size <= MAX_VERSES, `${tag}: section ${s.id} has ${size} verses (max ${MAX_VERSES})`);
    check(s.title?.zh && s.title?.en && s.intro?.zh && s.intro?.en, `${tag}: section ${s.id} needs a title and intro in both languages`);
    check(s.inClass === undefined || s.inClass === true, `${tag}: section ${s.id} marks inClass with true or not at all`);
    next = s.range[1] + 1;
  }
  check(next === lesson.verses.length + 1, `${tag}: sections do not cover every verse`);
  check(new Set(lesson.sections.map(s => s.id)).size === lesson.sections.length, `${tag}: duplicate section ids`);

  // Questions for every whole verse and every unit, independent of each other.
  let clauseCount = 0;
  for (const v of lesson.verses) {
    const data = lesson.study[v.id];
    check(data?.question?.zh?.length > 5 && data?.question?.en?.length > 5, `${tag}: ${v.id} needs a bilingual question`);
    if (!data?.units) continue;
    check(/^[0-9a-f]{1,8}$/.test(data.hash || ''), `${tag}: ${v.id} needs the English fingerprint its alignment was checked on`);
    const zh = v.tokens.join('');
    check(data.units.reduce((a, u) => a + u.zh, 0) === chineseClauses(zh).length, `${tag}: ${v.id} clause counts do not add up`);
    check(data.units.every(u => u.en > 0 && u.zh > 0), `${tag}: ${v.id} has an empty unit`);
    check(new Set(data.units.map(u => u.id)).size === data.units.length && data.units.every(u => /^c\d+$/.test(u.id)), `${tag}: ${v.id} unit ids must be unique c1, c2, …`);
    const parts = chineseUnits(lesson, v);
    check(parts.map(p => p.zh).join('') === zh, `${tag}: ${v.id} clauses do not rebuild the verse exactly`);
    const questions = [data.question.zh, ...data.units.map(u => u.question?.zh)];
    check(new Set(questions).size === questions.length, `${tag}: ${v.id} repeats a question between the verse and its clauses`);
    for (const u of data.units) check(u.question?.zh?.length > 5 && u.question?.en?.length > 5, `${tag}: ${v.id}/${u.id} needs a bilingual question`);
    clauseCount += data.units.length;
  }

  // Every word in the text can be looked up, with pinyin.
  const missing = new Set();
  for (const v of lesson.verses) for (const t of v.tokens) if (isWord(t) && !lesson.dict[t]?.pinyin) missing.add(t);
  check(!missing.size, `${tag}: no dictionary entry or pinyin for ${[...missing].join(' ')}`);
  for (const [alias, zh] of Object.entries(lesson.aliases)) {
    check(lesson.dict[zh], `${tag}: English "${alias}" points at missing word ${zh}`);
    check(alias === alias.toLowerCase(), `${tag}: English alias "${alias}" must be lower case`);
  }
  for (const word of lesson.suggested || []) check(lesson.dict[word], `${tag}: suggested word ${word} is not in the dictionary`);

  // Narration: every clip listed is real, matches today's Chinese text, and is
  // read by the assigned voice. English hashes are checked against the API by
  // check:english.
  const manifestPath = join(pub, lesson.audio);
  let clips = [];
  if (existsSync(manifestPath)) {
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    clips = manifest.clips || [];
    const seen = new Set();
    for (const c of clips) {
      const key = `${c.verseId}#${c.unitId}#${c.language}`;
      check(!seen.has(key), `${tag}: duplicate clip ${key}`);
      seen.add(key);
      check(c.lessonId === lesson.id, `${tag}: clip ${key} belongs to ${c.lessonId}`);
      const verse = lesson.verses.find(v => v.id === c.verseId);
      check(verse, `${tag}: clip for unknown verse ${c.verseId}`);
      check(c.voice === (c.language === 'zh' ? 'fangfang/zh' : 'louise/en'), `${tag}: clip ${key} has voice ${c.voice}`);
      check(c.duration > 0.3, `${tag}: clip ${key} has no real duration`);
      const file = join(pub, lesson.audio, '..', c.src);
      const info = existsSync(file) ? await stat(file) : null;
      check(info && info.size > 2000, `${tag}: clip file ${c.src} is missing or empty`);
      if (verse && c.language === 'zh') {
        const text = c.unitId === 'whole' ? verse.tokens.join('') : chineseUnits(lesson, verse).find(u => u.id === c.unitId)?.zh;
        check(text && fingerprint(text) === c.textHash, `${tag}: clip ${key} was recorded from different Chinese text`);
      }
      if (verse && c.unitId !== 'whole') check(lesson.study[verse.id]?.units?.some(u => u.id === c.unitId), `${tag}: clip ${key} names an unknown unit`);
    }
  }
  const expected = lesson.verses.length + clauseCount;
  const zhClips = clips.filter(c => c.language === 'zh').length;
  const enClips = clips.filter(c => c.language === 'en').length;
  summary.push(`${lesson.title.zh}: ${lesson.verses.length} verses in ${lesson.sections.map(s => s.range[1] - s.range[0] + 1).join('/')}, ` +
    `${clauseCount} aligned clauses, ${Object.keys(lesson.dict).length} words; narration zh ${zhClips}/${expected}, en ${enClips}/${expected}`);
  // How much of a story's English a child can tap for a Chinese meaning.
  if (!lesson.passage) {
    const english = new Set(lesson.verses.flatMap(v => (v.en.match(ENGLISH_WORDS) || []).map(w => w.toLowerCase())));
    const glossed = [...english].filter(w => lesson.aliases[w] || englishBasic[w]).length;
    summary.push(`${lesson.title.zh}: ${glossed} of ${english.size} distinct English words have a Chinese meaning`);
  }
  if (lesson.id === 'love') {
    check(lesson.verses.length === 13, 'love: 13 verses');
    check(lesson.sections.map(s => s.range[1] - s.range[0] + 1).join('/') === '4/4/5', 'love: sections 4/4/5');
    check(clauseCount === 43, `love: 43 aligned clauses (has ${clauseCount})`);
    check(zhClips === expected && enClips === expected, `love: narration incomplete (zh ${zhClips}, en ${enClips} of ${expected})`);
  }
}

// The interface speaks both languages: every string exists in each.
const {strings, storyStrings} = await import('../public/js/strings.js');
const zhKeys = Object.keys(strings.zh).sort().join();
const enKeys = Object.keys(strings.en).sort().join();
for (const [lang, override] of Object.entries(storyStrings)) {
  for (const [key, value] of Object.entries(override)) {
    check(key in strings[lang] && typeof value === typeof strings[lang][key], `strings: story ${lang}.${key} does not replace a ${lang} string of the same kind`);
  }
}
check(zhKeys === enKeys, `strings: zh and en keys differ (${Object.keys(strings.zh).filter(k => !(k in strings.en)).concat(Object.keys(strings.en).filter(k => !(k in strings.zh))).join(', ')})`);
const indexHtml = await readFile(join(pub, 'index.html'), 'utf8');
for (const [, key] of indexHtml.matchAll(/data-i18n(?:-[a-z-]+)?="([^"]+)"/g)) check(key in strings.zh, `index.html: unknown string ${key}`);

// English everyday words are lower case and complete.
for (const [word, value] of Object.entries(englishBasic)) {
  check(word === word.toLowerCase() && Array.isArray(value) && value.length === 2 && value.every(Boolean), `english-basic: ${word}`);
}

// Pictures: optional, but a picture that is named must exist and be described.
const pictures = JSON.parse(await readFile(join(pub, 'images/words/manifest.json'), 'utf8'));
const conceptIds = new Set(pictures.concepts.map(c => c.id));
check(conceptIds.size === pictures.concepts.length, 'images: duplicate concept ids');
for (const lesson of lessons) {
  for (const [word, info] of Object.entries(lesson.dict)) {
    if (info.concept) check(conceptIds.has(info.concept), `images: ${lesson.id} word ${word} has unknown concept ${info.concept}`);
  }
}
let pictured = 0;
for (const c of pictures.concepts) {
  if (!c.src) continue;
  pictured += 1;
  check(existsSync(join(pub, c.src)), `images: ${c.id} file ${c.src} is missing`);
  check(c.alt && c.alt.length > 4, `images: ${c.id} needs alt text`);
}
summary.push(`Word pictures: ${pictured} of ${pictures.concepts.length} concepts`);

// The site is ./public and nothing else: no secrets, scripts or notes in it.
async function walk(dir) {
  const out = [];
  for (const item of await readdir(dir, {withFileTypes: true})) {
    const path = join(dir, item.name);
    if (item.isDirectory()) out.push(...await walk(path));
    else out.push(path);
  }
  return out;
}
const allowedTypes = new Set(['.html', '.css', '.js', '.json', '.svg', '.mp3', '.webp', '.png', '.jpg', '.avif', '']);
const files = await walk(pub);
for (const file of files) {
  const rel = relative(pub, file);
  const ext = extname(file);
  if (rel === '.DS_Store' || rel.endsWith('/.DS_Store')) continue;
  check(allowedTypes.has(ext) && (ext || rel === '_headers' || rel === '.assetsignore'), `public/${rel}: unexpected file type for the site`);
  check(!/(^|\/)\.(dev\.vars|env)/.test(rel), `public/${rel}: local configuration must not be published`);
  if (/^\.(html|css|js|json|svg)$/.test(ext) || rel === '_headers') {
    const text = await readFile(file, 'utf8');
    check(!/YVP_APP_KEY\s*=|X-YVP-App-Key|api\.youversion\.com/.test(text), `public/${rel}: server-only YouVersion details in a public file`);
  }
}
const dotfiles = files.map(f => relative(pub, f)).filter(rel => rel.split('/').some(p => p.startsWith('.')) && !rel.endsWith('.DS_Store'));
check(dotfiles.every(rel => rel === '.assetsignore'), `public: unexpected dotfiles ${dotfiles.join(', ')}`);

if (failures.length) {
  console.error(`FAIL (${failures.length})\n- ` + failures.join('\n- '));
  process.exit(1);
}
console.log('PASS\n' + summary.map(s => '- ' + s).join('\n'));
