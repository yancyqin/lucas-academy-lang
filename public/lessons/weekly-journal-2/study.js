const lines = [
  ['你喜欢拼魔方吗？你想学会什么本领？', 'Do you like solving Rubik’s Cubes? What skill would you like to learn?'],
  ['如果你是一名艺术家，你想创作什么？', 'If you were an artist, what would you like to create?'],
  ['如果你是一名烘焙师，你最想做什么食物？', 'If you were a baker, what food would you most like to make?'],
  ['你见过咖啡师工作吗？你想了解他们的什么工作？', 'Have you seen a barista at work? What would you like to learn about their work?'],
  ['你最近吃过什么让你开心的食物？', 'What food have you eaten recently that made you happy?'],
  ['你可以怎样照顾弟弟、妹妹或比你小的孩子？', 'How could you care for a younger brother, sister or child?'],
  ['你喜欢家人做的哪一道食物？', 'What food do you enjoy when your family makes it?'],
  ['你想怎样为别人庆祝生日？', 'How would you like to celebrate someone else’s birthday?'],
  ['去朋友家玩时，你喜欢和朋友一起做什么？', 'What do you like to do with a friend when you visit their home?'],
  ['家里有东西坏了，你愿意怎样帮忙或为这件事祷告？', 'When something at home breaks, how could you help or pray about it?'],
  ['如果有人攻击你，你可以向哪位大人求助？', 'If someone attacks you, which adult could you ask for help?'],
];

export const questions = lines.map(([zh, en]) => ({zh, en}));
