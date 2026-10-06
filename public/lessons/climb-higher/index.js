import {units} from './text.js';
import {questions} from './study.js';
import {words, connectors, extra} from './words.js';

const dict = {};
const aliases = {};
for (const [list, small] of [[words, false], [connectors, true], [extra, false]]) {
  for (const [word, pinyin, meaning, meaningZh, concept, english] of list) {
    dict[word] = {pinyin, meaning, meaningZh, concept, small};
    for (const alias of english) aliases[alias] = word;
  }
}

const verses = units.map((unit, i) => ({id: `climb-higher.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

// Three works, one part each, all read in class (about an hour). Each work has
// a living painting in art-lab, where children paint living brushes onto it:
// ink and wash for the Chinese poem, oils for the English poem, watercolour
// for scripture.
const INK = {zh: '淡彩水墨', en: 'ink and wash'};
const OIL = {zh: '油画', en: 'oil painting'};
const WATERCOLOUR = {zh: '水彩', en: 'watercolour'};
const sections = [
  {id: '1-2', range: [1, 2], painting: {id: 'deng-guanque-lou', style: INK},
    title: {zh: '登鹳雀楼', en: 'On the Stork Tower'},
    intro: {zh: '唐朝诗人王之涣登上鹳雀楼，看见了太阳和黄河。', en: 'The Tang poet Wang Zhihuan climbs the Stork Tower and looks at the sun and the Yellow River.'}},
  {id: '3-6', range: [3, 6], painting: {id: 'foreign-lands', style: OIL},
    title: {zh: '外面的世界', en: 'Foreign Lands'},
    intro: {zh: '苏格兰作家斯蒂文森写他小时候爬上樱桃树，往远处看。', en: 'The Scottish writer Robert Louis Stevenson remembers climbing a cherry tree as a boy and looking far away.'}},
  {id: '7-8', range: [7, 8], painting: {id: 'psalm-121', style: WATERCOLOUR},
    title: {zh: '诗篇 121:1–2', en: 'Psalm 121:1–2'},
    intro: {zh: '写诗的人抬头望着高山。', en: 'The psalm writer looks up at the mountains.'}},
];

export default {
  id: 'climb-higher',
  kind: 'poems',
  title: {zh: '爬高一点，看远一点', en: 'Climb Higher, See Farther'},
  reference: {zh: '看得见的诗 · 第一期', en: 'Poems You Can See · No. 1'},
  chineseSource: 'https://b.ibible.hk/bible/9/psa/121',
  sources: {
    note: {
      zh: '《登鹳雀楼》（唐 · 王之涣）和斯蒂文森的 “Foreign Lands”（1885，《一个孩子的诗园》，选第 1、4 节）都是公有领域，互译由 Lucas Academy 完成。诗篇 121:1–2 的中文是公版和合本，英文是 NIV。',
      en: '“On the Stork Tower” (Wang Zhihuan, Tang dynasty) and Robert Louis Stevenson’s “Foreign Lands” (1885, A Child’s Garden of Verses; stanzas 1 and 4) are in the public domain; the translations are by Lucas Academy. Psalm 121:1–2: Chinese Union Version; English NIV.',
    },
    links: [{label: {zh: '斯蒂文森的诗集（古登堡计划）', en: 'Stevenson’s poems (Project Gutenberg)'}, href: 'https://www.gutenberg.org/ebooks/136'}],
  },
  sections,
  verses,
  study,
  dict,
  aliases,
  suggested: ['白日', '黄河', '千里', '樱桃树', '世界', '帮助'],
  audio: 'audio/climb-higher/manifest.json',
};
