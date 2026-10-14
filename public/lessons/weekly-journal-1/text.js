// Six separate, anonymised updates shared by the owner, lightly edited.
// Retain their first-person voices, times, colours and feelings.
// Each unit: [English, segmented Chinese, 用简单的话理解, In simple words]
const lines = [
  ['I saw a live frog at a swimming pool in the mountains. It was brown and orange.',
    '我/在/山/上/的/游泳池/看见/了/一只/活/青蛙/，/它/的/身上/有/棕色/和/橘色/。',
    '在山上的游泳池，看到了一只身上有棕色和橘色的活青蛙。', 'The frog at the pool was alive, and its colours were brown and orange.'],
  ['On Saturday, I played at my friend’s house from ten in the morning to six in the evening.',
    '星期六/，/我/从/上午/十/点/到/下午/六/点/都/在/朋友/家/玩/。',
    '星期六从上午十点到下午六点，一直在朋友家玩。', 'The visit to a friend’s house lasted from ten in the morning until six in the evening.'],
  ['I’m happy because I finished reading my chapter book.',
    '我/很/开心/，/因为/我/读完/了/一本/章节书/。',
    '把一本章节书读完了，心里很开心。', 'Finishing the chapter book made the reader happy.'],
  ['I’m happy because I found a song I really like.',
    '我/很/高兴/，/因为/找到/了/一首/自己/很/喜欢/的/歌/。',
    '找到了一首自己爱听的歌，觉得很高兴。', 'The writer feels happy after finding a song they really like.'],
  ['I learned a new algorithm for solving a Rubik’s Cube.',
    '我/学/了/一种/拼/魔方/的/新/算法/。',
    '算法是一组按顺序操作的步骤。这里说的是拼魔方时，按顺序转动魔方的步骤。', 'An algorithm is a set of steps to follow in order. Here, it means a sequence of turns for solving a Rubik’s Cube.'],
  ['Last week, I had four days off school, and I felt so happy.',
    '上个/星期/，/我/放/了/四/天/假/，/不用/上学/，/觉得/很/幸福/。',
    '上个星期有四天不用上学，很享受这段假期。', 'Having four days off school last week felt wonderful.'],
];

export const units = lines.map(([en, zh, explainZh, explainEn]) => ({
  en,
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
}));
