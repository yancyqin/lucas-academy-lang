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

const verses = units.map((unit, i) => ({id: `weekly-journal-1.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

export default {
  id: 'weekly-journal-1',
  kind: 'story',
  title: {zh: '周记 · 第 1 期', en: 'Weekly Journal · No. 1'},
  reference: {zh: '回顾上一周 · 第 3 周共读', en: 'Looking Back at Last Week · Reading for Week 3'},
  sources: {
    note: {
      zh: '根据已去除个人信息的生活分享整理，保留原意，稍作润色，并配成中英对照。',
      en: 'Based on life updates shared without personal details. Lightly edited to keep the original meaning, with Chinese and English versions.',
    },
    links: [],
  },
  sections: [
    {id: '1-6', range: [1, 6],
      title: {zh: '上周的小事', en: 'Little Moments from Last Week'},
      intro: {zh: '上周有什么值得记下来？读读这六则分享，也说说你自己的故事。', en: 'What would you like to remember from last week? Read these six little updates and share one of your own.'}},
  ],
  verses,
  study,
  dict,
  aliases,
  suggested: ['青蛙', '棕色', '橘色', '朋友', '章节书', '魔方', '算法', '放假', '幸福'],
  audio: 'audio/weekly-journal-1/manifest.json',
};
