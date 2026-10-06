// One question per unit (numbered as in text.js), for children, in both
// languages: about the picture in the poem, or a small everyday moment.
// No short-clause alignment is written for poems, so they are studied whole.
const lines = [
  ["你看过太阳落山吗？那时候天空是什么颜色的？", "Have you ever watched the sun go down? What colour was the sky?"], // 1
  ["你爬到过最高的地方是哪里？在那里看到了什么？", "What is the highest place you have ever climbed? What did you see from there?"], // 2
  ["你爬过树吗？爬上去的时候，心里是什么感觉？", "Have you ever climbed a tree? How did you feel up there?"], // 3
  ["如果你站在很高的地方，最想看到哪里？", "If you stood somewhere very high, what would you most like to see?"], // 4
  ["古诗说「更上一层楼」，英文诗说 a higher tree。它们哪里一样？", "The Chinese poem says “one floor higher”, and the English poem says “a higher tree”. How are they alike?"], // 5
  ["两首诗里的河，最后都流到了哪里？画给对方看。", "Where do the rivers in both poems end up? Draw it for your partner."], // 6
  ["遇到难事的时候，你会向谁求帮助？", "When something is hard, whom do you ask for help?"], // 7
  ["看着高山和天空，你会想：是谁造了它们？", "When you look at the mountains and the sky, do you wonder who made them?"], // 8
];

// The question for unit n is questions[n - 1].
export const questions = lines.map(([zh, en]) => ({zh, en}));
