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

const verses = units.map((unit, i) => ({id: `weekly-journal-3.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

export default {
  id: 'weekly-journal-3',
  kind: 'story',
  title: {zh: '周记 · 第 3 期', en: 'Weekly Journal · No. 3'},
  reference: {zh: '课堂分享 · 第 5 周共读', en: 'Classroom Sharing · Reading for Week 5'},
  sources: {
    note: {
      zh: '根据已去除人名的课堂分享与祷告整理，保留原意和第一人称，稍作润色，并配成中英对照。',
      en: 'Based on classroom sharing and prayers with names removed. Lightly edited in the first person, preserving the original meaning, and presented in Chinese and English.',
    },
    links: [],
  },
  sections: [
    {id: '1-6', range: [1, 6],
      title: {zh: '本周分享与祷告', en: 'This Week’s Sharing and Prayers'},
      intro: {zh: '一起读读这些生活分享与祷告，也说说你这一周的故事。', en: 'Read these updates and prayers together, and share a story from your own week.'}},
  ],
  verses,
  study,
  dict,
  aliases,
  suggested: ['入职', '仪式', '无聊', '祷告', '钱包', '电影院', '布置', '代表', '发型', '有特点'],
  audio: 'audio/weekly-journal-3/manifest.json',
};
