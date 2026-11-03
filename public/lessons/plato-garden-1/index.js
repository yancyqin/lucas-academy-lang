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

const verses = units.map((unit, i) => ({id: `plato-garden-1.${i + 1}`, n: i + 1, ...unit}));

export default {
  id: 'plato-garden-1',
  kind: 'story',
  title: {zh: '柏拉图学园 · 第 1 周', en: "Plato's Garden · Week 1"},
  reference: {zh: '走进虚拟学院', en: 'Into a Virtual School'},
  sources: {
    note: {
      zh: '本栏目的原创文案，经审定后配成中英对照。',
      en: 'Original writing for this series, approved and presented in Chinese and English.',
    },
    links: [],
  },
  sections: [
    {id: '1-5', range: [1, 5],
      title: {zh: '走进学园', en: 'Into the Garden'},
      intro: {zh: '读一读，再给自己起一个园中名字。', en: 'Read along, then choose your garden name.'}},
  ],
  verses,
  // One bilingual passage, both languages shown: no 逐句学, simple words or questions.
  layout: 'plain',
  study: {},
  dict,
  aliases,
  suggested: ['虚拟', '学院', '花园', '园中', '名字', '以后'],
  audio: 'audio/plato-garden-1/manifest.json',
};
