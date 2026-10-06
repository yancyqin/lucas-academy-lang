// One question per unit (numbered as in text.js), for children, in both
// languages: about the picture in the poem, or a small everyday moment.
// No short-clause alignment is written for poems, so they are studied whole.
const lines = [
  ["你起得最早的一次是去哪里？早上的天空是什么样子的？", "When did you get up earliest to go somewhere? What did the morning sky look like?"], // 1
  ["坐船、坐车、坐飞机，哪一种最快？你最喜欢哪一种？", "A boat, a car or a plane: which is fastest? Which do you like best?"], // 2
  ["用三种颜色，说一说你见过的一条河。", "Describe a river you have seen, using three colours."], // 3
  ["如果你把一只小船放进河里，它会漂到哪里去？", "If you put a little boat on a river, where would it float to?"], // 4
  ["河水为什么总是往低的地方流？", "Why does a river always flow downhill?"], // 5
  ["别的小朋友捡到你的小船，你想在船上写一句什么话？", "If another child found your little boat, what would you like to write on it?"], // 6
  ["你什么时候觉得很累？什么能让你重新有力气？", "When do you feel very tired? What gives you new strength?"], // 7
];

// The question for unit n is questions[n - 1].
export const questions = lines.map(([zh, en]) => ({zh, en}));
