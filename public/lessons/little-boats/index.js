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

const verses = units.map((unit, i) => ({id: `little-boats.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

// Three works, one part each, all read in class (about an hour). Each work has
// a living painting in art-lab, where children paint living brushes onto it:
// ink and wash for the Chinese poem, oils for the English poem, watercolour
// for scripture.
const INK = {zh: '淡彩水墨', en: 'ink and wash'};
const OIL = {zh: '油画', en: 'oil painting'};
const WATERCOLOUR = {zh: '水彩', en: 'watercolour'};
const sections = [
  {id: '1-2', range: [1, 2], painting: {id: 'zao-fa-baidi', style: INK},
    title: {zh: '早发白帝城', en: 'Leaving Baidi at Dawn'},
    intro: {zh: '唐朝诗人李白坐着小船，从白帝城顺着长江往下走。', en: 'The Tang poet Li Bai takes a little boat from Baidi down the Yangtze River.'}},
  {id: '3-6', range: [3, 6], painting: {id: 'where-go-the-boats', style: OIL},
    title: {zh: '小船漂到哪里去？', en: 'Where Go the Boats?'},
    intro: {zh: '斯蒂文森把小船放进河里，想知道它们会漂到哪里。', en: 'Stevenson puts his little boats on the river and wonders where they will go.'}},
  {id: '7-7', range: [7, 7], painting: {id: 'isaiah-40-31', style: WATERCOLOUR},
    title: {zh: '以赛亚书 40:31', en: 'Isaiah 40:31'},
    intro: {zh: '走远路会累。这节经文说，等候耶和华的人会得到新的力气。', en: 'A long journey makes us tired. This verse says those who wait for the LORD get new strength.'}},
];

export default {
  id: 'little-boats',
  kind: 'poems',
  title: {zh: '小船去远方', en: 'Little Boats, Far Away'},
  reference: {zh: '看得见的诗 · 第二期', en: 'Poems You Can See · No. 2'},
  chineseSource: 'https://b.ibible.hk/bible/9/isa/40',
  sources: {
    note: {
      zh: '《早发白帝城》（唐 · 李白）和斯蒂文森的 “Where Go the Boats?”（1885，《一个孩子的诗园》）都是公有领域，互译由 Lucas Academy 完成。以赛亚书 40:31 的中文是公版和合本，英文是 NIV。',
      en: '“Leaving Baidi at Dawn” (Li Bai, Tang dynasty) and Robert Louis Stevenson’s “Where Go the Boats?” (1885, A Child’s Garden of Verses) are in the public domain; the translations are by Lucas Academy. Isaiah 40:31: Chinese Union Version; English NIV.',
    },
    links: [{label: {zh: '斯蒂文森的诗集（古登堡计划）', en: 'Stevenson’s poems (Project Gutenberg)'}, href: 'https://www.gutenberg.org/ebooks/136'}],
  },
  sections,
  verses,
  study,
  dict,
  aliases,
  suggested: ['彩云', '轻舟', '永远', '小船', '鹰', '得力'],
  audio: 'audio/little-boats/manifest.json',
};
