// 苏轼《水调歌头·明月几时有》并序，公有领域。
// Text checked against the Hong Kong Education Bureau's reference text:
// https://www.edb.gov.hk/attachment/tc/curriculum-development/kla/chi-edu/recommended-passages/ks3_17_text.pdf
// Simplified characters; English translation and explanations by Lucas Academy.
// Each unit: [English, segmented Chinese, simple Chinese, simple English].
const lines = [
  [
    'On the Mid-Autumn night of the bingchen year, I drank happily until dawn. Very drunk, I wrote this poem, also thinking of my younger brother Ziyou.',
    '丙辰/中秋/，/欢饮/达旦/，/大醉/，/作/此篇/，/兼/怀/子由/。',
    '丙辰年，也就是公元 1076 年，中秋节的夜里，苏轼喝酒到天亮。他写下这首词，也在思念弟弟子由。',
    'On Mid-Autumn night in 1076, Su Shi drank until morning and wrote this poem. He was also thinking of his younger brother, Ziyou.',
  ],
  [
    'When did the bright moon first appear?\nI raise my cup and ask the blue sky.',
    '明月/几时/有/？/\n/把酒/问/青天/。',
    '明亮的月亮是什么时候有的呢？我举起酒杯，问一问蓝天。',
    'When did the moon first appear? I lift my cup and ask the sky.',
  ],
  [
    'In the palaces high in heaven,\nWhat year is it tonight?',
    '不知/天上/宫阙/，/\n/今夕/是/何年/。',
    '我不知道，天上的宫殿里，今天晚上是哪一年。',
    'I wonder what year it is tonight in the palaces of heaven.',
  ],
  [
    'I wish to ride the wind back there,\nYet fear those towers and halls of jade:\nSo high above, I could not bear the cold.',
    '我/欲/乘风/归去/，/\n/又/恐/琼楼玉宇/，/\n/高处/不胜/寒/。',
    '我想乘着风飞回天上去，却又担心，那些美玉般的楼宇太高了，会冷得受不了。',
    'I imagine riding the wind to heaven. But those beautiful halls are so high that I fear I could not bear the cold.',
  ],
  [
    'I rise to dance and play with my clear shadow.\nHow could life up there compare with life here among people!',
    '起舞/弄/清影/，/\n/何似/在/人间/！',
    '我站起来，在月光下和自己的影子一起跳舞。天上哪里比得上在人间这样好呢！',
    'I dance with my shadow in the moonlight. Life here among people is better than life far away in heaven.',
  ],
  [
    'Moonlight turns past the red tower,\nSlips low by carved windows,\nAnd shines on one who cannot sleep.',
    '转/朱阁/，/\n/低/绮户/，/\n/照/无眠/。',
    '月光移过红色的楼阁，低低地照进雕花的窗户，照着还没有睡着的人。',
    'The moonlight moves past a red tower and through carved windows. It shines on someone who cannot sleep.',
  ],
  [
    'Surely you bear no anger.\nWhy are you always full when loved ones are apart?',
    '不/应/有/恨/，/\n/何事/长/向/别时/圆/？',
    '月亮应该不会怨恨谁吧，可为什么总在人们分别的时候，变得圆圆的呢？',
    'The moon cannot be angry with anyone. So why does it seem to be full whenever loved ones are apart?',
  ],
  [
    'People have sorrow and joy, parting and meeting;\nThe moon has dim and clear nights, grows round and fades.\nSuch things have never all been perfect.',
    '人/有/悲欢离合/，/\n/月/有/阴晴圆缺/，/\n/此事/古/难/全/。',
    '人有难过和高兴，也有分开和团聚；月亮有时被云遮住，有时明亮，有时圆，有时缺。这些事从古到今都很难样样圆满。',
    'People feel sad and happy, part and meet again. The moon is hidden or bright, full or partly dark. Life has never been perfect in every way.',
  ],
  [
    'May those we love live long and well;\nThough a thousand li apart, may we share this lovely moon.',
    '但愿/人/长久/，/\n/千里/共/婵娟/。',
    '只愿亲人平安长久，即使相隔很远，也能一起欣赏这轮美好的月亮。',
    'I hope the people I love stay safe and well for a long time. Even far apart, we can enjoy the same beautiful moon.',
  ],
];

export const units = lines.map(([en, zh, explainZh, explainEn]) => ({
  en,
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
}));
