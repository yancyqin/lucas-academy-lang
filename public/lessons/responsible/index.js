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

const verses = units.map((unit, i) => ({id: `responsible.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

export default {
  id: 'responsible',
  kind: 'story',
  title: {zh: '你是一个有责任感的人', en: 'You Are a Responsible Person'},
  reference: {zh: '自创 · 生活中的小事', en: 'Original Writing · Everyday Actions'},
  sources: {
    note: {
      zh: 'Lucas Academy 自创双语课文。从生活中的小事，认识有责任感的自己。',
      en: 'An original bilingual lesson by Lucas Academy. Everyday actions help you see yourself as a responsible person.',
    },
    links: [],
  },
  // Three action-and-affirmation pairs per part; no pair crosses a boundary.
  sections: [
    {id: '1-6', range: [1, 6],
      title: {zh: '准备、爱惜、守信', en: 'Be Ready, Take Care, Keep Promises'},
      intro: {zh: '准备自己的东西，爱惜借来的书，把答应的事放在心上。', en: 'Get your things ready, take care of borrowed books, and keep your promises.'}},
    {id: '7-12', range: [7, 12],
      title: {zh: '出力、诚实、求助', en: 'Do Your Part, Tell the Truth, Ask for Help'},
      intro: {zh: '做好自己的那一份，说实话，遇到不会的事也可以请人帮忙。', en: 'Do your part, tell the truth, and ask for help when you need it.'}},
    {id: '13-18', range: [13, 18],
      title: {zh: '合作、补上、慢慢学', en: 'Work Together, Follow Through, Keep Learning'},
      intro: {zh: '愿意出力，补上忘记的事，慢慢学会更多。小小的你，也能负责。', en: 'Help out, finish what you forgot, and keep learning. You can be responsible even while you are little.'}},
  ],
  verses,
  study,
  dict,
  aliases,
  suggested: ['责任感', '准备', '保管', '答应', '实话', '帮忙', '办法', '愿意'],
  audio: 'audio/responsible/manifest.json',
};
