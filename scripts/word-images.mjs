// Refresh the word-picture list from the lessons: npm run images:list
//
// Every concept a lesson word points at must have an entry in
// public/images/words/manifest.json (and every entry must still be used).
// Each entry's `words` (Chinese words and the English words that point at
// them) is rewritten from the lessons; scene, file, src, alt and caption are
// kept as they are. Also writes docs/word-images.md, the deduplicated list
// the illustrator works from.
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {lessons} from '../public/lessons/index.js';

const manifestUrl = new URL('../public/images/words/manifest.json', import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, 'utf8'));
const used = new Map(); // concept -> {zh:Set, en:Set, lessons:Set}

for (const entry of lessons) {
  const lesson = (await entry.load()).default;
  const english = {};
  for (const [alias, zh] of Object.entries(lesson.aliases || {})) (english[zh] ||= []).push(alias);
  for (const [word, info] of Object.entries(lesson.dict)) {
    if (!info.concept) continue;
    const slot = used.get(info.concept) || {zh: new Set(), en: new Set(), lessons: new Set()};
    slot.zh.add(word);
    for (const alias of english[word] || []) slot.en.add(alias);
    slot.lessons.add(lesson.title.zh);
    used.set(info.concept, slot);
  }
}

const problems = [];
for (const id of used.keys()) if (!manifest.concepts.some(c => c.id === id)) problems.push(`no manifest entry for concept "${id}"`);
for (const c of manifest.concepts) if (!used.has(c.id)) problems.push(`manifest concept "${c.id}" is not used by any word`);
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

for (const c of manifest.concepts) {
  const slot = used.get(c.id);
  c.words = {zh: [...slot.zh], en: [...slot.en]};
}
await writeFile(manifestUrl, JSON.stringify(manifest, null, 2) + '\n');

const done = manifest.concepts.filter(c => c.src).length;
const rows = manifest.concepts.map((c, i) =>
  `| ${i + 1} | \`${c.id}\` | ${c.words.zh.join('、')} | ${c.words.en.join(', ') || '—'} | ${c.scene.zh}<br>${c.scene.en} | \`public/${c.file}\` | ${c.src ? '✓' : ''} |`);
const doc = `# 词语配图清单

由 \`npm run images:list\` 根据课文词条生成；去重后共 ${manifest.concepts.length} 个概念，已完成 ${done} 个。中文词与它的英文对应词共用一张图。

配图要求：${manifest.style}

完成一张图后：把文件放到「目标文件」位置，在 \`public/images/words/manifest.json\` 中为该概念填写 \`src\`（相对网站根目录，如 \`images/words/patience.webp\`）、\`alt\`（一句话描述画面）和可选的 \`caption\`，再运行 \`npm run validate\`。没有 \`src\` 的词照常用文字学习，页面不显示空白画框。

| # | 概念 | 中文 | English | 画面 | 目标文件 | 完成 |
| --- | --- | --- | --- | --- | --- | --- |
${rows.join('\n')}
`;
await mkdir(new URL('../docs/', import.meta.url), {recursive: true});
await writeFile(new URL('../docs/word-images.md', import.meta.url), doc);
console.log(`${manifest.concepts.length} concepts (${done} with pictures) -> docs/word-images.md`);
