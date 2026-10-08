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
const verses = units.map((unit, i) => ({id: `idioms-2.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

// [length, Chinese title, English title, Chinese source intro, English source intro]
const parts = [
  [5, '口蜜腹剑', 'Honeyed words, a hidden sword',
    '出自《资治通鉴》卷二百十五。李林甫说着好话，暗地里却想害人。',
    'From the Zizhi Tongjian, volume 215: Li Linfu speaks kindly while secretly trying to harm people.'],
  [5, '对牛弹琴', 'Playing music to a cow',
    '出自《牟子理惑论》。牛听不懂琴曲，弹琴的人后来换了一种声音。',
    'From the Mouzi Lihuolun: a cow cannot follow a tune, so the musician changes the sound.'],
  [6, '以德报怨', 'Answering hurt with kindness',
    '《老子》第六十三章说“报怨以德”。这里是我们写的生活小故事：帮忙，也说出自己的感受。',
    'Laozi, chapter 63, speaks of answering resentment with virtue. Our everyday story shows a child helping and also speaking up.'],
  [5, '近朱者赤', 'Good company can shape us',
    '语出傅玄《太子少傅箴》，用颜料比喻环境的影响。这里是我们写的读书小故事。',
    'Fu Xuan’s Admonition to the Junior Tutor uses color to picture influence. This reading story is our everyday example.'],
  [5, '投桃报李', 'Returning a kindness',
    '语出《诗经·大雅·抑》。我们把桃子和李子的画面写成小场景，一起想想怎样回应善意。',
    'From Yi in the Shijing: we retell the peaches and plums as a little scene about kindness returned.'],
  [5, '滴水穿石', 'Drops of water wear through stone',
    '《鹤林玉露》有“水滴石穿”的比喻。这里用水滴和石头的画面，想想每天一点的坚持。',
    'The Helin Yulu uses the image of water wearing through stone. Our scene explores what a little effort each day can do.'],
  [5, '知足常乐', 'Finding joy in enough',
    '《老子》第四十六章谈知足。这里是我们写的生活小故事：旧积木也能搭出新的小桥。',
    'Laozi, chapter 46, speaks of contentment. Our everyday story finds a new bridge in old building blocks.'],
  [5, '杯弓蛇影', 'A bow’s reflection mistaken for a snake',
    '出自《风俗通义·怪神》的杜宣故事。酒杯里的“蛇”，原来是墙上弓的倒影。',
    'From Du Xuan’s story in the Fengsu Tongyi: the snake in the wine cup turns out to be a bow’s reflection.'],
  [6, '入乡随俗', 'Learning the customs of a new place',
    '《庄子·山木》有顺应当地习俗的说法。这里是我们写的做客小故事：先看一看，再礼貌地问。',
    'The Zhuangzi, Shanmu, speaks of following local customs. Our visiting story shows a child watching and asking politely.'],
  [6, '刻舟求剑', 'Marking a boat to find a lost sword',
    '出自《吕氏春秋·察今》。船向前走了，落在河里的剑却没有跟着走。',
    'From Chajin in the Lüshi Chunqiu: the boat moves on, but the sword in the river does not move with it.'],
];
// Keep section identities when new scripture changes the display ranges.
const sectionIds = ["1-5","6-10","11-15","16-20","21-26","27-32","33-38","39-43","44-49","50-55"];
let next = 1;
const sections = parts.map(([length, zh, en, introZh, introEn], i) => {
  const range = [next, next + length - 1];
  next += length;
  return {id: sectionIds[i], range, title: {zh, en}, intro: {zh: introZh, en: introEn}};
});

export default {
  id: 'idioms-2', kind: 'idioms',
  title: {zh:'成语 · 第二辑', en:'Idioms · Set 2'},
  reference: {zh:'十个成语：说话、待人和看事情', en:'Ten idioms about words, kindness and perspective'},
  chineseSource: 'https://b.ibible.hk/',
  sources: {
    note: {
      zh:'成语出处见下方古籍与词典链接。口蜜腹剑、对牛弹琴、杯弓蛇影、刻舟求剑改写古书里的故事；投桃报李和滴水穿石写诗句或比喻的画面；其余四篇是本项目写的生活小故事，不是古籍中的人物故事。中英文均由 Lucas Academy 为孩子重写。经文中文为公版和合本，英文 NIV 在阅读时请求。',
      en:'Sources are linked below. Four tales retell ancient accounts: honeyed words, music for a cow, the snake reflection, and the lost sword. Peaches and plums and drops on stone illustrate a poetic image or comparison. The other four scenes are original everyday stories, not ancient accounts. Both languages are written for children by Lucas Academy. Scripture uses public-domain Chinese Union Version; English NIV is requested when reading.',
    },
    links: [
      {label:{zh:'口蜜腹剑：《资治通鉴》卷215',en:'Hidden sword: Zizhi Tongjian 215'},href:'https://zh.wikisource.org/wiki/資治通鑑/卷215'},
      {label:{zh:'对牛弹琴：《牟子理惑论》',en:'Music for a cow: Mouzi Lihuolun'},href:'https://www.shidianguji.com/book/FZZ1096/chapter/1ku3gsne50mqw'},
      {label:{zh:'以德报怨、知足：《老子》',en:'Kindness and contentment: Laozi'},href:'https://zh.wikisource.org/wiki/道德經_(王弼本)'},
      {label:{zh:'近朱者赤：出处与字义',en:'Red pigment: source and meaning'},href:'https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=78395&la=0&q=1&webMd=2'},
      {label:{zh:'投桃报李：《诗经·抑》',en:'Peaches and plums: Shijing, Yi'},href:'https://zh.wikisource.org/wiki/詩經/抑'},
      {label:{zh:'滴水穿石：出处与字义',en:'Water and stone: source and meaning'},href:'https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=1740&la=0&webMd=2'},
      {label:{zh:'杯弓蛇影：出处与字义',en:'Snake reflection: source and meaning'},href:'https://dict.idioms.moe.edu.tw/idiomView.jsp?ID=-49&la=0&webMd=2'},
      {label:{zh:'入乡随俗：《庄子·山木》',en:'Local customs: Zhuangzi, Shanmu'},href:'https://zh.wikisource.org/wiki/莊子/山木'},
      {label:{zh:'刻舟求剑：《吕氏春秋·察今》',en:'Lost sword: Lüshi Chunqiu, Chajin'},href:'https://zh.wikisource.org/wiki/呂氏春秋/卷十五'},
    ],
  },
  sections, verses, study, dict, aliases,
  suggested:['真心','祷告','知足','影子','习惯','记号'],
  audio:'audio/idioms-2/manifest.json',
};
