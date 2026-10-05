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

const verses = units.map((unit, i) => ({id: `lilliput.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

// The whole retelling in 11 parts. A teacher reads the three parts marked
// `inClass` with the children (课堂共读); each of their intros says what came
// before, so a class can start there. The other parts are 选读.
const sections = [
  {id: '1-5', range: [1, 5],
    title: {zh: '船沉了', en: 'The shipwreck'},
    intro: {zh: '格列佛是船上的医生。一场风暴打坏了他的船。', en: 'Gulliver is a ship’s doctor. A storm wrecks his ship.'}},
  {id: '6-12', range: [6, 12], inClass: true,
    title: {zh: '被绑着醒来', en: 'Waking up tied down'},
    intro: {zh: '格列佛的船沉了，他游到一片海滩，累得睡着了。', en: 'Gulliver’s ship has sunk. He swims to a beach and falls asleep, worn out.'}},
  {id: '13-19', range: [13, 19],
    title: {zh: '一千五百匹马', en: 'Fifteen hundred horses'},
    intro: {zh: '格列佛饿了，小人们给他送来吃的。', en: 'Gulliver is hungry, and the tiny people bring him food.'}},
  {id: '20-26', range: [20, 26], inClass: true,
    title: {zh: '搜口袋', en: 'Searching my pockets'},
    intro: {zh: '格列佛来到了小人国。小人们把他拉进城，用铁链锁在一座神庙里。', en: 'Gulliver has come to the land of tiny people. They pull him into their city and chain him inside a temple.'}},
  {id: '27-31', range: [27, 31],
    title: {zh: '我得到了自由', en: 'I am set free'},
    intro: {zh: '格列佛慢慢和小人们熟悉起来。', en: 'Gulliver slowly gets to know the tiny people.'}},
  {id: '32-38', range: [32, 38], inClass: true,
    title: {zh: '鸡蛋大战', en: 'The egg war'},
    intro: {zh: '格列佛在小人国得到了自由，还在王宫里交到了一位朋友。', en: 'Gulliver is free now in the land of tiny people, and he has made a friend at the palace.'}},
  {id: '39-45', range: [39, 45],
    title: {zh: '拖走五十艘战舰', en: 'Fifty warships'},
    intro: {zh: '布莱夫斯库要来攻打小人国了。', en: 'Blefuscu is about to attack Lilliput.'}},
  {id: '46-51', range: [46, 51],
    title: {zh: '我不再打仗', en: 'I will not fight any more'},
    intro: {zh: '打了胜仗，皇帝还想要更多。', en: 'After the victory, the emperor wants even more.'}},
  {id: '52-56', range: [52, 56],
    title: {zh: '半夜的警告', en: 'A warning at night'},
    intro: {zh: '格列佛有了敌人，一位朋友半夜来找他。', en: 'Gulliver now has enemies, and a friend comes to him at night.'}},
  {id: '57-61', range: [57, 61],
    title: {zh: '一条真正的船', en: 'A real boat'},
    intro: {zh: '格列佛逃到了布莱夫斯库。', en: 'Gulliver escapes to Blefuscu.'}},
  {id: '62-67', range: [62, 67],
    title: {zh: '回家', en: 'Home again'},
    intro: {zh: '格列佛有了船，准备回家。', en: 'Gulliver has a boat and gets ready to go home.'}},
];

// A story, not a passage: its English is our own retelling of a public-domain
// book and travels with the lesson (verse.en), so nothing is fetched.
export default {
  id: 'lilliput',
  kind: 'story',
  title: {zh: '格列佛游记 · 小人国', en: 'Gulliver in Lilliput'},
  reference: {zh: '东西方的奇幻之旅 · 斯威夫特', en: 'Fantastic Journeys East and West · Jonathan Swift'},
  sources: {
    note: {
      zh: '中文和英文：Lucas Academy 根据乔纳森·斯威夫特《格列佛游记》第一卷（1726，公有领域，依据古登堡计划电子书 #829）为孩子改写，有删减。',
      en: 'Chinese and English: retold for children by Lucas Academy from Jonathan Swift, Gulliver’s Travels, Part I (1726), public domain, checked against Project Gutenberg eBook #829, with parts left out.',
    },
    links: [{label: {zh: '英文原著（古登堡计划）', en: 'The original book (Project Gutenberg)'}, href: 'https://www.gutenberg.org/ebooks/829'}],
  },
  sections,
  verses,
  study,
  dict,
  aliases,
  suggested: ['小人', '皇帝', '口袋', '鸡蛋', '战舰', '自由'],
  audio: 'audio/lilliput/manifest.json',
};
