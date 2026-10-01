// 马可福音 4:1–9 · 和合本 (CUV, public domain), the text of the existing
// Lucas Academy Chinese reader (lessons/mark-4.js). English is requested at
// read time. This lesson has no short-clause alignment yet: study stays
// whole-verse until one is written and checked.
const lines = [
  "耶稣/又/在/海边/教训/人/。/有/许多/人/到/他/那里/聚集/，/他/只得/上船/坐下/。/船/在/海里/，/众人/都/靠近/海/，/站在/岸上/。",
  "耶稣/就/用/比喻/教训/他们/许多/道理/。/在/教训/之间/，/对/他们/说/：",
  "「/你们/听/啊/！/有/一个/撒种/的/出去/撒种/。",
  "撒/的/时候/，/有/落在/路旁/的/，/飞鸟/来/吃尽/了/；",
  "有/落在/土浅/石头地/上/的/，/土/既/不/深/，/发苗/最快/，",
  "日头/出来/一晒/，/因为/没有/根/，/就/枯干/了/；",
  "有/落在/荆棘/里/的/，/荆棘/长起来/，/把/它/挤住/了/，/就/不/结实/；",
  "又/有/落在/好土/里/的/，/就/发生/长大/，/结实/有/三十倍/的/，/有/六十倍/的/，/有/一百倍/的/」/；",
  "又/说/：/「/有/耳/可听/的/，/就/应当/听/！/」",
];

// 用简单的话理解 (zh), and the reader's own English note for each verse (en).
const explanations = [
  ["人太多了，耶稣坐在船上，大家站在岸边听他讲。", "Jesus teaches by the lake again. The crowd is so big that he sits in a boat on the water while the people stand on the shore."],
  ["耶稣用小故事，讲很重要的道理。", "He teaches with 比喻 — parables: everyday stories that carry a much bigger meaning."],
  ["耶稣请大家认真听：有人出去撒种子。", "The story starts. A farmer goes out to scatter seed; 撒种 means to sow."],
  ["有些种子掉在路边，被鸟吃光了。", "Some seed lands on the hard path, and birds come and eat it all."],
  ["有些种子掉在土很薄的石头地上，很快就发芽了。", "Some lands on thin soil over rock, where it sprouts faster than anywhere else."],
  ["太阳一晒，小苗没有根，就干死了。", "But with no root, one hot day of sun dries it up."],
  ["有些种子掉在荆棘里，被挤住了，结不出果子。", "Some falls among thorns, which grow up and crowd it out, so it makes no grain. 结实 = to bear fruit."],
  ["掉在好土里的种子长大了，结出很多很多果子。", "Some falls on good soil and grows into a harvest — thirty, sixty, even a hundred times what was sown."],
  ["耶稣说：有耳朵的人，要好好听。", "「有耳可听的，就应当听！」 The story is a test of listening, not a lesson in farming."],
];

export const verses = lines.map((line, i) => ({
  id: `MRK.4.${i + 1}`,
  n: i + 1,
  tokens: line.split('/'),
  explain: {zh: explanations[i][0], en: explanations[i][1]},
}));

export const sections = [
  {id: '1-4', range: [1, 4],
    title: {zh: '听一个撒种的故事', en: 'A story about sowing seed'},
    intro: {zh: '一起来听，再把故事讲给对方。', en: 'Listen together, then tell the story to each other.'}},
  {id: '5-9', range: [5, 9],
    title: {zh: '不同地方的种子', en: 'Seed in different places'},
    intro: {zh: '同样的种子，在不同的地方会怎么样？', en: 'What happens to the same seed in different places?'}},
];
