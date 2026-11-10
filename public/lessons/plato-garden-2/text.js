// Read the story in full in each language. The line breaks separate scenes.
const paragraphs = [
  ['Last time, everyone talked about what they wanted to do when they grew up. Ethan wanted to be an engineer. Eliana wanted to be a makeup artist. Jennifer wanted to be an artist and a mom. Hosana wanted to be a singer. Matthew wanted to design games. He also wanted to stay single and spend his money on vacations and a heated toilet seat. Lucas wanted to tape a banana to the wall and sell it to make a lot of money.',
    '上次/，/大家/说/了/长大/以后/的/愿望/。/Ethan/ /想/当/工程师/，/Eliana/ /想/当/化妆师/，/圆圆/想/当/艺术家/，/也/想/当/妈妈/。/Hosana/ /想/当/歌手/。/Matthew/ /想/设计/游戏/，/也/想/单身/，/把/钱/花/在/度假/和/加热/马桶圈/上/。/Lucas/ /想/把/香蕉/贴/在/墙/上/卖/，/赚/很多/钱/。'],
  ['This time, the teacher asked everyone to say a little more about their dreams. She started with Ethan. “If you were an engineer, what would you most like to build?”',
    '这次/，/老师/请/大家/把/自己/的/愿望/说/得/具体/一点/。/她/先/问/ /Ethan/：/“/如果/你/当/了/工程师/，/最/想/造/什么/？/”'],
  ['“I want to build a bridge over the river. The school is on the other side. With a bridge, the children would have a shorter walk to school.”',
    '“/我/想/在/河/上/造/一/座/桥/。/学校/就/在/对岸/，/有/了/桥/，/孩子们/上学/就/能/少/绕/一/段/路/。/”'],
  ['Ethan remembered how he learned to solve a Rubik’s Cube. Someone showed him how to turn it at first, and then he practiced many times on his own. Someday he wants to learn from people who know how to build bridges and work with them to build one.',
    'Ethan/ /想起/自己/学/拼/魔方/的/时候/。/刚开始/，/有人/教/他/怎么/转/，/后来/他/自己/练/了/好多/次/。/将来/学/造/桥/，/他/也/想/先/跟/懂/的/人/学/，/再/和/别人/一起/把/桥/建/起来/。'],
];

export const units = [{
  en: paragraphs.map(([en]) => en).join('\n'),
  tokens: paragraphs.map(([, zh]) => zh).join('/\n/').split('/'),
}];
