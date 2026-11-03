// Plato’s Garden, week 1: the owner’s opening, polished and approved.
// Each unit: [English, segmented Chinese]
const lines = [
  ['We’re now at a virtual school.',
    '我们/现在/来到/一所/虚拟/学院/。'],
  ['There are lots of fun places here, just like a garden.',
    '这里/有/很多/好玩/的/地方/，/就像/一个/花园/。'],
  ['Now, let’s each choose a garden name.',
    '现在/，/请/每个人/给/自己/起/一个/园中/名字/。'],
  ['Today, let’s talk: What do I want to do when I grow up?',
    '今天/聊聊/：/我/以后/想/做/什么/？'],
  ['Who am I?',
    '我/是/谁/？'],
];

export const units = lines.map(([en, zh]) => ({en, tokens: zh.split('/')}));
