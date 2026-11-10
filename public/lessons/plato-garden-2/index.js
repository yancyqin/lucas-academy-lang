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
  reference: {zh: '香蕉掉下来以后', en: 'When the Banana Fell'},
  sources: {
    note: {
      zh: '根据课堂分享创作的双语故事。人物使用园中名字，园中发生的事和对话为续写。',
      en: 'A bilingual story inspired by a class discussion, with garden names and an imagined next scene.',
    },
    links: [],
  },
  sections: [{
    id: '1-1', range: [1, 1],
    title: {zh: '香蕉掉下来以后', en: 'When the Banana Fell'},
    intro: {zh: '读一读，看看今天谁教了谁一小步。', en: 'Read the story and see how the friends teach each other.'},
    questions: [
      {zh: '方桥第一次折得太快，后来做了什么？你怎么知道蕉点学会了？',
        en: 'Bridge folded the paper too fast at first. What did he do next? How could you tell if Peel had learned to do it?'},
      {zh: '回声等小芽把歌唱回来。要是小芽还是跟不上，你会怎么教？',
        en: 'Echo waited for Sprout to sing the line back. If Sprout still couldn’t follow, how would you help her learn it?'},
      {zh: '如果小芽以后改了主意，你会用她今天做的哪件事来介绍她？',
        en: 'If Sprout changes her mind about what she wants to be, what could you tell someone about her from what she did today?'},
      {zh: '今天你能教同学哪一小步？你想跟谁学什么？',
        en: 'What’s one small thing you could teach a classmate today? Who would you like to learn from, and what would you ask them to teach you?'},
      {zh: '两个人同时想用一卷胶带，你会怎么分？如果你得等一等，你还觉得这个办法公平吗？',
        en: 'Two people want the same roll of tape at the same time. How would you share it? Would that still feel fair if you had to wait?'},
    ],
  }],
  verses: units.map((unit, i) => ({id: `plato-garden-2.${i + 1}`, n: i + 1, ...unit})),
  study: {},
  dict,
  aliases,
  suggested: ['工程师', '对折', '化妆', '歌手', '起点', '同时'],
  audio: 'audio/plato-garden-2/manifest.json',
};
