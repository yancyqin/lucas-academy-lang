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

const verses = units.map((unit, i) => ({id: `count-the-stars.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

// Three works, one part each, all read in class (about an hour). Each work has
// a living painting in art-lab, where children paint living brushes onto it:
// ink and wash for the Chinese poem, oils for the English poem, watercolour
// for scripture.
const INK = {zh: '淡彩水墨', en: 'ink and wash'};
const OIL = {zh: '油画', en: 'oil painting'};
const WATERCOLOUR = {zh: '水彩', en: 'watercolour'};
const sections = [
  {id: '1-2', range: [1, 2], painting: {id: 'ye-su-shan-si', style: INK},
    title: {zh: '夜宿山寺', en: 'A Night at the Mountain Temple'},
    intro: {zh: '唐朝诗人李白夜里住在山上的寺庙，楼高得好像伸手就能摘到星星。', en: 'The Tang poet Li Bai spends the night at a temple on a mountain, in a tower so high he could almost pick the stars.'}},
  {id: '3-7', range: [3, 7], painting: {id: 'the-star', style: OIL},
    title: {zh: '小星星', en: 'The Star'},
    intro: {zh: '英国作家简·泰勒写给孩子的诗，后来配上一首法国老曲子，成了大家都会唱的《小星星》。', en: 'An English poem for children by Jane Taylor; set to an old French tune, it became the song everyone knows, “Twinkle, Twinkle, Little Star.”'}},
  {id: '8-9', range: [8, 9], painting: {id: 'genesis-15-5', style: WATERCOLOUR},
    title: {zh: '创世记 15:5–6', en: 'Genesis 15:5–6'},
    intro: {zh: '神带亚伯兰（后来叫亚伯拉罕）到外面看星星，应许他的子孙会像星星一样多。', en: 'God takes Abram (later called Abraham) outside to look at the stars, and promises him a family as many as the stars.'}},
];

export default {
  id: 'count-the-stars',
  kind: 'poems',
  title: {zh: '星星数得完吗？', en: 'Can You Count the Stars?'},
  reference: {zh: '看得见的诗 · 第五期', en: 'Poems You Can See · No. 5'},
  chineseSource: 'https://b.ibible.hk/bible/9/gen/15',
  sources: {
    note: {
      zh: '《夜宿山寺》（唐 · 李白）和简·泰勒的 “The Star”（1806，《儿歌集》，按 1831 年版）都是公有领域，互译由 Lucas Academy 完成。创世记 15:5–6 的中文是公版和合本，英文是 NIV。配音：中文 Sunny，英文 Matthew（用他们自己的录音，由 AI 合成）。',
      en: '“A Night at the Mountain Temple” (Li Bai, Tang dynasty) and Jane Taylor’s “The Star” (1806, Rhymes for the Nursery; as in the 1831 edition) are in the public domain; the translations are by Lucas Academy. Genesis 15:5–6: Chinese Union Version; English NIV. Voices: Sunny (Chinese) and Matthew (English), made with AI from their own recordings.',
    },
    links: [{label: {zh: '泰勒姐妹的《儿歌集》（古登堡计划）', en: 'Ann and Jane Taylor’s Rhymes for the Nursery (Project Gutenberg)'}, href: 'https://www.gutenberg.org/ebooks/77549'}],
  },
  sections,
  verses,
  study,
  dict,
  aliases,
  suggested: ['星辰', '摘', '一闪一闪', '钻石', '数算', '后裔'],
  audio: 'audio/count-the-stars/manifest.json',
};
