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

const verses = units.map((unit, i) => ({id: `can-beauty-last.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

// Three works, one part each, all read in class (about an hour). The living
// paintings of the first two issues are made in art-lab; this issue's are not
// made yet, so its parts name no painting.
const sections = [
  {id: '1-4', range: [1, 4],
    title: {zh: '春夜喜雨', en: 'Happy Rain on a Spring Night'},
    intro: {zh: '唐朝诗人杜甫住在成都，夜里听到春雨，心里很高兴。', en: 'The Tang poet Du Fu, living in Chengdu, hears the spring rain at night and is glad.'}},
  {id: '5-11', range: [5, 11],
    title: {zh: '第十八首十四行诗', en: 'Sonnet 18'},
    intro: {zh: '英国作家莎士比亚问：美好的东西，能不能一直留下来？', en: 'The English writer William Shakespeare asks: can something beautiful last forever?'}},
  {id: '12-12', range: [12, 12],
    title: {zh: '传道书 3:11', en: 'Ecclesiastes 3:11'},
    intro: {zh: '一切都会过去，可是神让万物在合适的时候成为美好。', en: 'Everything passes, but God makes everything beautiful in its time.'}},
];

export default {
  id: 'can-beauty-last',
  kind: 'poems',
  title: {zh: '美好能否留存？', en: 'Can Beauty Last?'},
  reference: {zh: '看得见的诗 · 第三期', en: 'Poems You Can See · No. 3'},
  chineseSource: 'https://b.ibible.hk/bible/9/ecc/3',
  sources: {
    note: {
      zh: '《春夜喜雨》（唐 · 杜甫）和莎士比亚《第十八首十四行诗》（1609）都是公有领域，互译和十四行诗的现代英语由 Lucas Academy 完成。传道书 3:11 的中文是公版和合本，英文是 NIV。配音：中文 Sunny，英文 Matthew（用他们自己的录音，由 AI 合成）。',
      en: '“Happy Rain on a Spring Night” (Du Fu, Tang dynasty) and William Shakespeare’s Sonnet 18 (1609) are in the public domain; the translations and the sonnet’s modern English are by Lucas Academy. Ecclesiastes 3:11: Chinese Union Version; English NIV. Voices: Sunny (Chinese) and Matthew (English), made with AI from their own recordings.',
    },
    links: [{label: {zh: '莎士比亚的十四行诗（古登堡计划）', en: 'Shakespeare’s sonnets (Project Gutenberg)'}, href: 'https://www.gutenberg.org/ebooks/1041'}],
  },
  sections,
  verses,
  study,
  dict,
  aliases,
  suggested: ['好雨', '润', '无声', '夏天', '永远', '美好'],
  audio: 'audio/can-beauty-last/manifest.json',
};
