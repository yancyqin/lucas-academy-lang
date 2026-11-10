import {units} from './text.js';
import {words, connectors, extra} from './words.js';

const dict = {};
const aliases = {};
for (const [list, small] of [[words, false], [connectors, true], [extra, false]]) {
  for (const [word, pinyin, meaning, meaningZh, concept, english] of list) {
    dict[word] = {pinyin, meaning, meaningZh, concept, small};
    for (const alias of english) aliases[alias] = word;
  }
}

export default {
  id: 'plato-garden-2',
  kind: 'story',
  layout: 'plain',
  title: {zh: '柏拉图学园 · 第 2 周', en: "Plato's Garden · Week 2"},
  reference: {zh: 'Ethan 想造一座桥', en: 'Ethan Wants to Build a Bridge'},
  sources: {
    note: {
      zh: '根据课堂分享创作的双语故事。人物使用课堂称呼，园中发生的事和对话为续写。',
      en: 'A bilingual story inspired by a class discussion. It uses the names from class and imagines what happens next in the garden.',
    },
    links: [],
  },
  sections: [{
    id: '1-1', range: [1, 1],
    title: {zh: 'Ethan 想造一座桥', en: 'Ethan Wants to Build a Bridge'},
    intro: {zh: '读一读 Ethan 的愿望，再想想你已经会做的一件小事。', en: 'Read about Ethan’s dream, then think of one small thing you already know how to do.'},
    questions: [
      {zh: '你现在会做哪一件小事？', en: 'What’s one small thing you can do now?'},
      {zh: '你还记得自己是怎么学会的吗？', en: 'Do you remember how you learned to do it?'},
      {zh: '为了你想做的那件事，你还会做哪些努力吗？',
        en: 'What else will you do to work toward your goal?'},
    ],
  }],
  verses: units.map((unit, i) => ({id: `plato-garden-2.${i + 1}`, n: i + 1, ...unit})),
  study: {},
  dict,
  aliases,
  suggested: ['愿望', '工程师', '桥', '对岸', '魔方', '练'],
  audio: 'audio/plato-garden-2/manifest.json',
};
