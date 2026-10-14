const lines = [
  ['你见过青蛙吗？它是什么颜色的？', 'Have you seen a frog? What colour was it?'],
  ['和朋友一起玩时，你最喜欢做什么？', 'What do you most enjoy doing when you play with a friend?'],
  ['你最近读了什么书？最记得哪一部分？', 'What have you read recently? Which part do you remember best?'],
  ['你喜欢的一首歌是什么？可以哼一小段给大家听吗？', 'What is a song you like? Would you like to hum a little of it?'],
  ['你愿意演示一下这个魔方算法吗？', 'Would you like to show us how this Rubik’s Cube algorithm works?'],
  ['如果有四天不用上学，你想怎样度过？', 'If you had four days off school, how would you like to spend them?'],
];

export const questions = lines.map(([zh, en]) => ({zh, en}));
