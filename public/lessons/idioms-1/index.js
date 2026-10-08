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

const verses = units.map((unit, i) => ({id: `idioms-1.${i + 1}`, n: i + 1, ...unit}));
const study = Object.fromEntries(verses.map((verse, i) => [verse.id, {question: questions[i]}]));

// One idiom per part: the idiom, its story, then the scripture that looks at
// the same thing (angle on the unit). A class reads two or three parts.
const sections = [
  {id: '1-5', range: [1, 5], title: {zh: '井底之蛙', en: 'The frog in the well'},
    intro: {zh: '出自《庄子》。一只青蛙住在井里，以为天只有井口那么大。', en: 'From the Zhuangzi: a frog in a well thinks the sky is as big as the well’s mouth.'}},
  {id: '6-12', range: [6, 12], title: {zh: '守株待兔', en: 'Waiting by the stump'},
    intro: {zh: '出自《韩非子》。农夫捡到一只撞死的兔子，从此天天守着树桩。', en: 'From the Han Feizi: a farmer finds a rabbit that ran into a stump, and waits there ever after.'}},
  {id: '13-17', range: [13, 17], title: {zh: '愚公移山', en: 'Yugong moves the mountains'},
    intro: {zh: '出自《列子》。一位老人要把门前的两座大山挖走。', en: 'From the Liezi: an old man sets out to dig away the two mountains in front of his door.'}},
  {id: '18-24', range: [18, 24], title: {zh: '亡羊补牢', en: 'Mending the pen'},
    intro: {zh: '出自《战国策》。丢了羊，马上修好羊圈。', en: 'From the Strategies of the Warring States: a sheep is lost, and the pen is mended at once.'}},
  {id: '25-29', range: [25, 29], title: {zh: '拔苗助长', en: 'Pulling up the seedlings'},
    intro: {zh: '出自《孟子》。农夫嫌禾苗长得慢，把它们往上拔。', en: 'From the Mencius: a farmer thinks his seedlings grow too slowly and pulls them up.'}},
  {id: '30-35', range: [30, 35], title: {zh: '自相矛盾', en: 'Spear and shield'},
    intro: {zh: '出自《韩非子》。卖矛又卖盾的人，把两样都夸到了天上。', en: 'From the Han Feizi: a man selling both spears and shields praises each to the skies.'}},
  {id: '36-40', range: [36, 40], title: {zh: '塞翁失马', en: 'The old man loses his horse'},
    intro: {zh: '出自《淮南子》。边塞的老人丢了马，却说这不一定是坏事。', en: 'From the Huainanzi: an old man near the frontier loses his horse and says it may not be bad luck.'}},
  {id: '41-45', range: [41, 45], title: {zh: '掩耳盗铃', en: 'Covering his ears to steal a bell'},
    intro: {zh: '出自《吕氏春秋》。小偷捂住自己的耳朵去偷铃铛。', en: 'From the Lüshi Chunqiu: a thief covers his own ears to steal a bell.'}},
  {id: '46-49', range: [46, 49], title: {zh: '一诺千金', en: 'A promise worth gold'},
    intro: {zh: '出自《史记》。季布答应的事，一定做到。', en: 'From the Records of the Grand Historian: whatever Ji Bu promised, he did.'}},
  {id: '50-54', range: [50, 54], title: {zh: '盲人摸象', en: 'The blind men and the elephant'},
    intro: {zh: '出自佛经。几个盲人各摸到大象的一部分。', en: 'From a Buddhist sutra: blind men each touch one part of an elephant.'}},
];

export default {
  id: 'idioms-1',
  kind: 'idioms',
  title: {zh: '成语 · 第一辑', en: 'Idioms · Set 1'},
  reference: {zh: '十个成语，各配一点圣经', en: 'Ten idioms, each with a little scripture'},
  chineseSource: 'https://b.ibible.hk/',
  sources: {
    note: {
      zh: '十个成语都出自公有领域的古书（《庄子》《韩非子》《列子》《战国策》《孟子》《淮南子》《吕氏春秋》《史记》和佛经），小故事的中英文都是 Lucas Academy 为孩子改写的。经文的中文是公版和合本（1919），英文是 NIV。',
      en: 'The ten idioms come from public-domain classics (the Zhuangzi, Han Feizi, Liezi, Strategies of the Warring States, Mencius, Huainanzi, Lüshi Chunqiu, Records of the Grand Historian and a Buddhist sutra); the little stories are retold for children by Lucas Academy in both languages. Scripture: Chinese Union Version (1919); English NIV.',
    },
    links: [
      {label: {zh: '成语的出处（维基文库）', en: 'The classics (Chinese Wikisource)'}, href: 'https://zh.wikisource.org/'},
      {label: {zh: '成语词典（汉典）', en: 'Idiom dictionary (zdic.net)'}, href: 'https://www.zdic.net/'},
    ],
  },
  sections,
  verses,
  study,
  dict,
  aliases,
  suggested: ['青蛙', '树桩', '信心', '羊圈', '禾苗', '矛盾'],
  audio: 'audio/idioms-1/manifest.json',
};
