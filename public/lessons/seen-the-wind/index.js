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

const verses = units.map((unit, i) => ({id: `seen-the-wind.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

// Three works, one part each, all read in class (about an hour). Each work has
// a living painting in art-lab, where children paint living brushes onto it:
// ink and wash for the Chinese poem, oils for the English poem, watercolour
// for scripture.
const INK = {zh: '淡彩水墨', en: 'ink and wash'};
const OIL = {zh: '油画', en: 'oil painting'};
const WATERCOLOUR = {zh: '水彩', en: 'watercolour'};
const sections = [
  {id: '1-4', range: [1, 4], painting: {id: 'fu-de-gu-yuan-cao', style: INK},
    title: {zh: '赋得古原草送别', en: 'Grass on the Old Plain: A Farewell'},
    intro: {zh: '唐朝诗人白居易写原野上的草：野火烧不完，春风一吹，又长出来了。', en: 'The Tang poet Bai Juyi writes about the grass on an open plain: wildfire cannot burn it all, and the spring wind brings it back.'}},
  {id: '5-10', range: [5, 10], painting: {id: 'the-wind', style: OIL},
    title: {zh: '风', en: 'The Wind'},
    intro: {zh: '苏格兰作家斯蒂文森问风：我看得见你做的事，可是你自己在哪里？', en: 'The Scottish writer Robert Louis Stevenson asks the wind: I can see what you do, but where are you?'}},
  {id: '11-11', range: [11, 11], painting: {id: 'john-3-8', style: WATERCOLOUR},
    title: {zh: '约翰福音 3:8', en: 'John 3:8'},
    intro: {zh: '耶稣对尼哥底母说：风看不见，却听得见；从圣灵生的人也是这样。', en: 'Jesus tells Nicodemus: you cannot see the wind, but you can hear it; it is the same with everyone born of the Spirit.'}},
];

export default {
  id: 'seen-the-wind',
  kind: 'poems',
  title: {zh: '谁看见过风？', en: 'Has Anyone Seen the Wind?'},
  reference: {zh: '看得见的诗 · 第四期', en: 'Poems You Can See · No. 4'},
  chineseSource: 'https://b.ibible.hk/bible/9/jhn/3',
  sources: {
    note: {
      zh: '《赋得古原草送别》（唐 · 白居易）和斯蒂文森的 “The Wind”（1885，《一个孩子的诗园》）都是公有领域，互译由 Lucas Academy 完成。约翰福音 3:8 的中文是公版和合本，英文是 NIV。配音：中文 Sunny，英文 Matthew（用他们自己的录音，由 AI 合成）。',
      en: '“Grass on the Old Plain: A Farewell” (Bai Juyi, Tang dynasty) and Robert Louis Stevenson’s “The Wind” (1885, A Child’s Garden of Verses) are in the public domain; the translations are by Lucas Academy. John 3:8: Chinese Union Version; English NIV. Voices: Sunny (Chinese) and Matthew (English), made with AI from their own recordings.',
    },
    links: [{label: {zh: '斯蒂文森的诗集（古登堡计划）', en: 'Stevenson’s poems (Project Gutenberg)'}, href: 'https://www.gutenberg.org/ebooks/136'}],
  },
  sections,
  verses,
  study,
  dict,
  aliases,
  suggested: ['野火', '春风', '风筝', '藏', '看不见', '圣灵'],
  audio: 'audio/seen-the-wind/manifest.json',
};
