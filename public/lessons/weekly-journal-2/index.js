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

const verses = units.map((unit, i) => ({id: `weekly-journal-2.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

export default {
  id: 'weekly-journal-2',
  kind: 'story',
  title: {zh: '周记 · 第 2 期', en: 'Weekly Journal · No. 2'},
  reference: {zh: '课堂分享 · 第 4 周共读', en: 'Classroom Sharing · Reading for Week 4'},
  sources: {
    note: {
      zh: '根据已去除人名的课堂分享整理，经审定后保留第一人称，并配成中英对照。',
      en: 'Based on classroom updates with names removed. Approved first-person wording is presented in Chinese and English.',
    },
    links: [],
  },
  sections: [
    {id: '1-11', range: [1, 11],
      title: {zh: '本周分享', en: 'This Week’s Sharing'},
      intro: {zh: '读读这十一则分享，也说说你自己的故事。', en: 'Read these eleven updates and share a story of your own.'}},
  ],
  verses,
  study,
  dict,
  aliases,
  suggested: ['长大', '魔方', '玩家', '艺术家', '烘焙师', '咖啡师', '照顾', '聚会', '洗衣机', '祷告'],
  audio: 'audio/weekly-journal-2/manifest.json',
};
