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
  id: 'autumn',
  kind: 'story',
  layout: 'plain',
  title: {zh: '秋天', en: 'Autumn'},
  reference: {zh: '自创 · 秋天的观察', en: 'Original Writing · Autumn Observations'},
  sources: {
    note: {
      zh: '中文为作者提供的原创文章，保留原文；英文及词语解释由 Lucas Academy 整理。讨论问题由作者提供，并配成中英对照。',
      en: 'An original article supplied by the author, with the Chinese wording preserved. English and word explanations prepared by Lucas Academy. Discussion questions supplied by the author and presented in both languages.',
    },
    links: [],
  },
  sections: [{
    id: '1-1', range: [1, 1],
    title: {zh: '秋天', en: 'Autumn'},
    intro: {zh: '读一读秋天里的变化，再说说你的感受。', en: 'Read about the changes in autumn, then share how you feel.'},
    questions: [
      {zh: '你喜欢天黑得早吗？为什么？', en: 'Do you like it when it gets dark early? Why?'},
      {zh: '你喜欢秋天吗？为什么？', en: 'Do you like autumn? Why?'},
    ],
  }],
  verses: units.map((unit, i) => ({id: `autumn.${i + 1}`, n: i + 1, ...unit})),
  study: {},
  dict,
  aliases,
  suggested: ['加拿大雁', '过冬', '树叶', '天黑', '路灯', '秋天'],
  audio: 'audio/autumn/manifest.json',
};
