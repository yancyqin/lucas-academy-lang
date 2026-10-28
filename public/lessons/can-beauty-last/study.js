// One question per unit (numbered as in text.js), for children, in both
// languages: about the picture in the poem, or a small everyday moment.
// No short-clause alignment is written for poems, so they are studied whole.
const lines = [
  ["你喜欢下雨吗？春天的雨和夏天的雨有什么不一样？", "Do you like rain? How is spring rain different from summer rain?"], // 1
  ["夜里下雨的时候，你听到过雨声吗？什么样的雨是没有声音的？", "Have you ever heard rain at night? What kind of rain makes no sound?"], // 2
  ["在很黑的夜里，你看到过一点亮光吗？那是什么？", "On a very dark night, have you ever seen one small light? What was it?"], // 3
  ["下过雨的早上，花和草看起来有什么不同？", "On a morning after rain, how do the flowers and grass look different?"], // 4
  ["如果把你喜欢的一个人比作一种天气，你会选什么？为什么？", "If you compared someone you love to a kind of weather, which would you choose? Why?"], // 5
  ["你最喜欢一年里的哪个季节？为什么它总是过得太快？", "Which season of the year do you like best? Why does it always seem to end too soon?"], // 6
  ["太阳有时候太热，有时候躲起来。你还见过天气的哪些变化？", "Sometimes the sun is too hot, and sometimes it hides. What other changes in the weather have you seen?"], // 7
  ["你有没有一样心爱的东西，后来变旧了？你现在怎么看它？", "Do you have something you loved that has grown old? How do you feel about it now?"], // 8
  ["诗人说你的夏天永远不会褪色。你觉得什么东西可以一直美好？", "The poet says your summer will never fade. What do you think can stay beautiful forever?"], // 9
  ["把一个人写进诗里，为什么能让他「一直活着」？", "Why can writing about someone in a poem keep them “alive”?"], // 10
  ["《春夜喜雨》写的是雨，十四行诗写的是一个人。两首诗都在说什么美好？", "“Happy Rain on a Spring Night” is about rain, and the sonnet is about a person. What beautiful things are both poems talking about?"], // 11
  ["这节经文说，神让万物「各按其时成为美好」。你等待过一个美好的时候吗？", "This verse says God makes everything beautiful in its time. Have you ever waited for a beautiful moment?"], // 12
];

// The question for unit n is questions[n - 1].
export const questions = lines.map(([zh, en]) => ({zh, en}));
