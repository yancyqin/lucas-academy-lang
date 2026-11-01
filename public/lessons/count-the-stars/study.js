// One question per unit (numbered as in text.js), for children, in both
// languages: about the picture in the poem, or a small everyday moment.
// No short-clause alignment is written for poems, so they are studied whole.
const lines = [
  ["你爬到过很高的地方吗？在那里看天空是什么感觉？", "Have you ever climbed somewhere very high? What was it like to look at the sky from there?"], // 1
  ["诗人为什么不敢大声说话？你在什么地方会小声说话？", "Why doesn’t the poet dare to speak loudly? Where do you speak softly?"], // 2
  ["你看着星星的时候，想过它是什么吗？星星和钻石有什么像的地方？", "When you look at a star, have you ever wondered what it is? How is a star like a diamond?"], // 3
  ["太阳下山以后，天空会有什么变化？你见过满天星星的夜晚吗？", "What happens to the sky after the sun goes down? Have you ever seen a night full of stars?"], // 4
  ["在黑夜里走路，你会靠什么照亮？很久以前，人们怎么靠星星认路？", "When you walk in the dark, what lights your way? Long ago, how did people find their way by the stars?"], // 5
  ["星星整夜不闭眼睛。晚上还有谁在守着我们？", "The star never shuts its eye all night. Who else watches over us at night?"], // 6
  ["小小的光也能帮助人吗？你帮过一个「在黑夜里赶路」的人吗？", "Can a tiny light help someone? Have you ever helped someone who was “in the dark”?"], // 7
  ["你试过数天上的星星吗？能数完吗？", "Have you ever tried to count the stars? Could you count them all?"], // 8
  ["亚伯兰数不完星星，可是他相信神。你相信过一件还没看见的事吗？", "Abram could not count the stars, but he believed God. Have you ever believed something you had not yet seen?"], // 9
];

// The question for unit n is questions[n - 1].
export const questions = lines.map(([zh, en]) => ({zh, en}));
