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

const verses = units.map((unit, i) => ({id: `happy-prince.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

// The whole story in 24 parts, at most seven sentences each. The story is too
// long for class, so a teacher reads the three parts marked `inClass` with the
// children (课堂共读): the end of the story, which each part's intro sets up.
// The other parts are 选读, read at home or by choice.
const sections = [
  {id: '1-4', range: [1, 4],
    title: {zh: '城市上空的雕像', en: 'The statue above the city'},
    intro: {zh: '快乐王子站在高高的柱子上，人人都夸他。', en: 'The Happy Prince stands high above the city, and everyone admires him.'}},
  {id: '5-9', range: [5, 9],
    title: {zh: '大家怎么说', en: 'What people say'},
    intro: {zh: '不同的人看着雕像，说了不同的话。', en: 'Different people look at the statue and say different things.'}},
  {id: '10-15', range: [10, 15],
    title: {zh: '燕子和芦苇', en: 'The Swallow and the Reed'},
    intro: {zh: '一只小燕子爱上了一根芦苇。', en: 'A little swallow falls in love with a reed.'}},
  {id: '16-20', range: [16, 20],
    title: {zh: '我要去埃及', en: 'Off to Egypt'},
    intro: {zh: '秋天到了，燕子想去远方。', en: 'Autumn comes, and the swallow wants to travel.'}},
  {id: '21-26', range: [21, 26],
    title: {zh: '金色的卧室', en: 'A golden bedroom'},
    intro: {zh: '燕子在雕像脚下过夜，却被一滴水打湿了。', en: 'The swallow sleeps at the statue’s feet, and a drop of water falls on him.'}},
  {id: '27-33', range: [27, 33],
    title: {zh: '王子在哭', en: 'The Prince is crying'},
    intro: {zh: '水滴是从哪里来的？燕子抬头一看。', en: 'Where is the water coming from? The swallow looks up.'}},
  {id: '34-39', range: [34, 39],
    title: {zh: '无忧宫里的王子', en: 'The prince of the Palace of No Worries'},
    intro: {zh: '王子讲起他活着时候的故事。', en: 'The Prince tells the story of his life.'}},
  {id: '40-44', range: [40, 44],
    title: {zh: '穷苦的女裁缝', en: 'The poor seamstress'},
    intro: {zh: '王子看见一个生病的孩子和他疲惫的妈妈。', en: 'The Prince sees a sick boy and his tired mother.'}},
  {id: '45-51', range: [45, 51],
    title: {zh: '留下来一晚', en: 'Stay for one night'},
    intro: {zh: '燕子想去埃及，王子请他留下来帮忙。', en: 'The swallow wants to go to Egypt; the Prince asks him to stay and help.'}},
  {id: '52-58', range: [52, 58],
    title: {zh: '送去红宝石', en: 'Taking the ruby'},
    intro: {zh: '燕子叼着红宝石，飞过城市。', en: 'The swallow carries the ruby across the city.'}},
  {id: '59-64', range: [59, 64],
    title: {zh: '心里暖暖的', en: 'Warm inside'},
    intro: {zh: '做了好事，燕子觉得很暖和。', en: 'After a good deed, the swallow feels warm.'}},
  {id: '65-69', range: [65, 69],
    title: {zh: '埃及在等我', en: 'Egypt is waiting'},
    intro: {zh: '燕子讲起埃及的奇妙景色。', en: 'The swallow talks about the wonders of Egypt.'}},
  {id: '70-73', range: [70, 73],
    title: {zh: '阁楼上的年轻人', en: 'The young man in the attic'},
    intro: {zh: '一个年轻人又冷又饿，写不下去了。', en: 'A young man is too cold and hungry to write.'}},
  {id: '74-80', range: [74, 80],
    title: {zh: '蓝宝石眼睛', en: 'The sapphire eyes'},
    intro: {zh: '王子把自己的一只眼睛送了出去。', en: 'The Prince gives away one of his eyes.'}},
  {id: '81-84', range: [81, 84],
    title: {zh: '来说再见', en: 'Coming to say goodbye'},
    intro: {zh: '燕子在港口玩了一天，回来说再见。', en: 'The swallow spends a day at the harbour and comes back to say goodbye.'}},
  {id: '85-88', range: [85, 88],
    title: {zh: '明年春天的礼物', en: 'A gift for next spring'},
    intro: {zh: '燕子答应王子，春天带宝石回来。', en: 'The swallow promises to bring jewels back in spring.'}},
  {id: '89-95', range: [89, 95],
    title: {zh: '卖火柴的小女孩', en: 'The little match girl'},
    intro: {zh: '王子把另一只眼睛也送了出去。', en: 'The Prince gives away his other eye.'}},
  {id: '96-102', range: [96, 102],
    title: {zh: '我要永远陪着你', en: 'I will stay with you always'},
    intro: {zh: '王子看不见了，燕子决定留下来。', en: 'The Prince is blind now, so the swallow decides to stay.'}},
  {id: '103-108', range: [103, 108],
    title: {zh: '城里的苦难', en: 'Hard times in the city'},
    intro: {zh: '燕子飞遍全城，看见了富人，也看见了穷人。', en: 'The swallow flies over the city and sees the rich and the poor.'}},
  {id: '109-111', range: [109, 111],
    title: {zh: '一片片金叶子', en: 'Leaf by leaf'},
    intro: {zh: '王子把身上的金子都送给了穷人。', en: 'The Prince gives all his gold to the poor.'}},
  {id: '112-115', range: [112, 115], inClass: true,
    title: {zh: '冬天来了', en: 'Winter comes'},
    intro: {zh: '快乐王子是一座雕像。小燕子留下来，帮他把宝石和金叶子都送给了穷人。现在，冬天来了。', en: 'The Happy Prince is a statue. A little swallow stayed to help him give all his jewels and gold to the poor. Now winter has come.'}},
  {id: '116-121', range: [116, 121], inClass: true,
    title: {zh: '再见，亲爱的王子', en: 'Goodbye, dear Prince'},
    intro: {zh: '燕子和王子最后一次说话。', en: 'The swallow and the Prince speak for the last time.'}},
  {id: '122-126', range: [122, 126],
    title: {zh: '市长和议员们', en: 'The Mayor and the Councillors'},
    intro: {zh: '大人们只看见雕像变丑了。', en: 'The grown-ups only see that the statue has become shabby.'}},
  {id: '127-132', range: [127, 132], inClass: true,
    title: {zh: '最宝贵的两样东西', en: 'The two most precious things'},
    intro: {zh: '市长和议员们都说，雕像变得又破又旧，跟乞丐差不多了。', en: 'The Mayor and the Councillors say the statue looks shabby, little better than a beggar.'}},
];

// A story, not a passage: its English is public domain and travels with the
// lesson (verse.en), so nothing is fetched; 文字来源 names its own sources.
export default {
  id: 'happy-prince',
  kind: 'story',
  title: {zh: '快乐王子', en: 'The Happy Prince'},
  reference: {zh: '王尔德童话', en: 'A tale by Oscar Wilde'},
  sources: {
    note: {
      zh: '英文：奥斯卡·王尔德《快乐王子》（1888），公有领域，依据古登堡计划电子书 #902 校订，为孩子略去一句。\n中文：Lucas Academy 翻译。',
      en: 'English: Oscar Wilde, “The Happy Prince” (1888), public domain, checked against Project Gutenberg eBook #902, with one sentence left out for children.\nChinese: translated by Lucas Academy.',
    },
    links: [{label: {zh: '英文原文（古登堡计划）', en: 'English text (Project Gutenberg)'}, href: 'https://www.gutenberg.org/ebooks/902'}],
  },
  sections,
  verses,
  study,
  dict,
  aliases,
  suggested: ['燕子', '同情', '冬天', '再见', '宝贵', '天堂'],
  audio: 'audio/happy-prince/manifest.json',
};
