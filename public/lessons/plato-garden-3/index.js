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
  id: 'plato-garden-3',
  kind: 'story',
  layout: 'plain',
  title: {zh: '柏拉图学园 · 第 3 周', en: "Plato's Garden · Week 3"},
  reference: {zh: 'Bella 想先学做一样', en: 'Bella Wants to Learn One Thing First'},
  sources: {
    note: {
      zh: '根据课堂中 Bella 的分享整理成中英对照短文。',
      en: 'A bilingual passage based on Bella’s sharing in class.',
    },
    links: [],
  },
  sections: [{
    id: '1-1', range: [1, 1],
    title: {zh: 'Bella 想先学做一样', en: 'Bella Wants to Learn One Thing First'},
    intro: {zh: '读一读 Bella 想先学的一件事，再说说你喜欢做什么。', en: 'Read about what Bella wants to learn, then share something you enjoy doing.'},
    questions: [
      {zh: 'Bella 想把什么写在纸上？', en: 'What does Bella want to write down on paper?'},
      {zh: '你最近做过哪件小事，做完还想再做一次？', en: 'What small thing have you done recently that you wanted to do again?'},
      {zh: '如果你喜欢做这件事，第一次却没做好，你会对自己说什么？',
        en: 'If you enjoy doing something but don’t do it well the first time, what would you say to yourself?'},
    ],
  }],
  verses: units.map((unit, i) => ({id: 'plato-garden-3.' + (i + 1), n: i + 1, ...unit})),
  study: {},
  dict,
  aliases,
  suggested: ['梦想', '烘焙店', '教程', '配方', '满足感'],
  audio: 'audio/plato-garden-3/manifest.json',
};
