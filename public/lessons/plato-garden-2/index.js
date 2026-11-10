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
      zh: '根据课堂分享创作的双语故事。人物使用课堂称呼，园中发生的事和对话为续写。',
      en: 'A bilingual story inspired by a class discussion. It uses the names from class and imagines what happens next in the garden.',
    },
    links: [],
  },
  sections: [{
    id: '1-1', range: [1, 1],
    title: {zh: '香蕉掉下来以后', en: 'When the Banana Fell'},
    intro: {zh: '读一读，看看今天谁教了谁一小步。', en: 'Read the story and see how the friends teach each other.'},
    questions: [
      {zh: 'Ethan 第一次折得太快，后来做了什么？你怎么知道 Lucas 学会了？',
        en: 'Ethan folded the paper too fast at first. What did he do next? How could you tell if Lucas had learned to do it?'},
      {zh: 'Hosana 等圆圆把歌唱回来。要是圆圆还是跟不上，你会怎么教？',
        en: 'Hosana waited for Jennifer to sing the line back. If Jennifer still couldn’t follow, how would you help her learn it?'},
      {zh: '如果圆圆以后改了主意，你会用她今天做的哪件事来介绍她？',
        en: 'If Jennifer changes her mind about what she wants to be, what could you tell someone about her from what she did today?'},
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
