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

const verses = units.map((unit, i) => ({id: `gentlemen.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

// The whole retelling in 11 parts. A teacher reads the three parts marked
// `inClass` with the children (课堂共读); each of their intros says what came
// before, so a class can start there. The other parts are 选读.
const sections = [
  {id: '1-7', range: [1, 7],
    title: {zh: '出海', en: 'Setting sail'},
    intro: {zh: '读书人唐敖想出海去看看。', en: 'Tang Ao, a scholar, wants to see the world across the sea.'}},
  {id: '8-12', range: [8, 12],
    title: {zh: '惟善为宝', en: 'Goodness is the only treasure'},
    intro: {zh: '船到了一个叫“君子国”的地方。', en: 'The ship comes to a place called the Land of Gentlemen.'}},
  {id: '13-16', range: [13, 16],
    title: {zh: '名字是邻国起的', en: 'A name from the neighbours'},
    intro: {zh: '唐敖和多九公在君子国一边走，一边看。', en: 'Tang Ao and Duo Jiugong look around as they walk.'}},
  {id: '17-23', range: [17, 23], inClass: true,
    title: {zh: '要加价的买家', en: 'The buyer who wanted to pay more'},
    intro: {zh: '读书人唐敖跟着商船出海，来到了君子国。他和船上的老舵工多九公走进了热闹的集市。', en: 'The scholar Tang Ao has sailed overseas on a merchant ship and come to the Land of Gentlemen. He and the ship’s old helmsman, Duo Jiugong, walk into the busy market.'}},
  {id: '24-29', range: [24, 29],
    title: {zh: '专挑次货的小兵', en: 'The soldier who chose the worse goods'},
    intro: {zh: '集市上，又有人在买东西。', en: 'In the market, someone else is shopping.'}},
  {id: '30-36', range: [30, 36], inClass: true,
    title: {zh: '多出来的银子', en: 'The extra silver'},
    intro: {zh: '在君子国的集市上，买的和卖的都抢着吃亏。这一次，是银子给多了。', en: 'In the market of the Land of Gentlemen, buyers and sellers both try to get the worse deal. This time, someone has paid too much silver.'}},
  {id: '37-42', range: [37, 42],
    title: {zh: '两位白发老人', en: 'Two white-haired old men'},
    intro: {zh: '唐敖和多九公在路上遇见两位老人。', en: 'Tang Ao and Duo Jiugong meet two old men.'}},
  {id: '43-48', range: [43, 48],
    title: {zh: '原来是宰相', en: 'The two prime ministers'},
    intro: {zh: '正聊得高兴，一个仆人跑了进来。', en: 'In the middle of a happy talk, a servant runs in.'}},
  {id: '49-54', range: [49, 54],
    title: {zh: '南瓜燕窝汤', en: 'Pumpkin and bird’s-nest soup'},
    intro: {zh: '宰相给船上送来了礼物。', en: 'The prime ministers send gifts to the ship.'}},
  {id: '55-61', range: [55, 61], inClass: true,
    title: {zh: '小人国', en: 'The Land of Little People'},
    intro: {zh: '唐敖、林之洋和多九公离开君子国，船又走了许多天，到过好几个奇怪的国家。', en: 'Tang Ao, Lin Zhiyang and Duo Jiugong leave the Land of Gentlemen. Their ship sails on for many days and visits several strange countries.'}},
  {id: '62-64', range: [62, 64],
    title: {zh: '船又出发了', en: 'Sailing on'},
    intro: {zh: '看完小人国，他们该回船了。', en: 'After seeing the Land of Little People, it is time to go back to the ship.'}},
];

// A story, not a passage: its Chinese and English are our own retelling of a
// public-domain novel and travel with the lesson (verse.en), so nothing is fetched.
export default {
  id: 'gentlemen',
  kind: 'story',
  title: {zh: '镜花缘 · 君子国和小人国', en: 'The Land of Gentlemen'},
  reference: {zh: '东西方的奇幻之旅 · 李汝珍', en: 'Fantastic Journeys East and West · Li Ruzhen'},
  sources: {
    note: {
      zh: '中文和英文：Lucas Academy 根据李汝珍《镜花缘》（清代，公有领域）第八、十至十二、十九回为孩子改写，有删减，依据维基文库。',
      en: 'Chinese and English: retold for children by Lucas Academy from Li Ruzhen, Flowers in the Mirror (Qing dynasty), chapters 8, 10–12 and 19, public domain, checked against Wikisource, with parts left out.',
    },
    links: [{label: {zh: '中文原著（维基文库）', en: 'The original novel (Wikisource)'}, href: 'https://zh.wikisource.org/wiki/%E9%8F%A1%E8%8A%B1%E7%B7%A3'}],
  },
  sections,
  verses,
  study,
  dict,
  aliases,
  suggested: ['君子国', '善良', '银子', '宰相', '谦虚', '反着'],
  audio: 'audio/gentlemen/manifest.json',
};
