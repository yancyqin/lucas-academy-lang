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

const verses = units.map((unit, i) => ({id: `shuidiaogetou.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

export default {
  id: 'shuidiaogetou',
  kind: 'poems',
  title: {zh: '水调歌头·明月几时有', en: 'Prelude to Water Melody · When Did the Bright Moon Appear?'},
  reference: {zh: '宋 · 苏轼（1076）', en: 'Su Shi · Song Dynasty (1076)'},
  sources: {
    note: {
      zh: '苏轼《水调歌头·明月几时有》并序，公有领域。正文对照香港教育局参考文本，转为简体字；英文翻译、简单释义与逐句问题由 Lucas Academy 编写。本篇不制作配音。',
      en: 'Su Shi’s “Prelude to Water Melody”, including its preface, is in the public domain. The Chinese follows the Hong Kong Education Bureau’s reference text, in simplified characters. English translation, simple explanations, and questions by Lucas Academy. No recorded narration is provided for this lesson.',
    },
    links: [{
      label: {zh: '原文参考（香港教育局）', en: 'Chinese reference text (Hong Kong Education Bureau)'},
      href: 'https://www.edb.gov.hk/attachment/tc/curriculum-development/kla/chi-edu/recommended-passages/ks3_17_text.pdf',
    }],
  },
  sections: [
    {id: '1', range: [1, 1],
      title: {zh: '小序 · 中秋怀人', en: 'Preface · Missing Someone at Mid-Autumn'},
      intro: {zh: '中秋夜，苏轼写下这首词，思念弟弟苏辙。子由是苏辙的字。', en: 'On Mid-Autumn night, Su Shi writes this poem and thinks of his younger brother Su Zhe, also called Ziyou.'}},
    {id: '2-5', range: [2, 5],
      title: {zh: '上阕 · 问月与想象', en: 'First Stanza · Questions for the Moon'},
      intro: {zh: '抬头望月，诗人想象天上的宫殿，又想起人间的美好。', en: 'Looking up at the moon, the poet imagines palaces in heaven and finds joy in life here among people.'}},
    {id: '6-9', range: [6, 9],
      title: {zh: '下阕 · 思念与祝愿', en: 'Second Stanza · Longing and Good Wishes'},
      intro: {zh: '月光照着未眠的人。即使亲人相隔很远，也可以共赏一轮明月。', en: 'Moonlight falls on someone who cannot sleep. Even when loved ones are far apart, they can share the same moon.'}},
  ],
  verses,
  study,
  dict,
  aliases,
  suggested: ['明月', '把酒', '宫阙', '不胜', '悲欢离合', '阴晴圆缺', '但愿', '婵娟'],
  // An empty manifest declares that this lesson has no recorded narration.
  audio: 'audio/shuidiaogetou/manifest.json',
};
