// One question per unit (numbered as in text.js), for children, in both
// languages: about the picture in the poem, or a small everyday moment.
// No short-clause alignment is written for poems, so they are studied whole.
const lines = [
  ["你见过草从绿变黄，又从黄变绿吗？是在什么季节？", "Have you seen grass turn from green to yellow, and back to green? In which seasons?"], // 1
  ["草被火烧了，为什么春天还能长出来？", "Why can grass grow back in spring after a fire has burned it?"], // 2
  ["你走过长满青草的小路吗？闻起来是什么味道？", "Have you walked along a path covered with grass? What did it smell like?"], // 3
  ["你送别过一个好朋友吗？那时候你心里是什么感觉？", "Have you ever said goodbye to a good friend? How did you feel?"], // 4
  ["你放过风筝吗？风吹过草地的时候，你听到过什么声音？", "Have you ever flown a kite? When the wind blows across the grass, what have you heard?"], // 5
  ["如果风会唱歌，它的歌是什么样子的？", "If the wind could sing, what would its song be like?"], // 6
  ["风做了很多事，自己却藏起来。还有什么东西看不见，却能看见它做的事？", "The wind does many things but hides itself. What else can’t you see, though you can see what it does?"], // 7
  ["诗里第二次叫「风啊」。风做的事里，你最喜欢哪一件？", "The poem calls “O wind” a second time. Of all the things the wind does, which do you like best?"], // 8
  ["你觉得风是年轻的，还是年老的？如果风是一个孩子，你想和它玩什么？", "Do you think the wind is young or old? If the wind were a child, what would you play together?"], // 9
  ["读完这首诗，你觉得风是什么样的？", "Now that you have read the whole poem, what do you think the wind is like?"], // 10
  ["耶稣说，从圣灵生的人像风一样。你觉得这是什么意思？", "Jesus says everyone born of the Spirit is like the wind. What do you think that means?"], // 11
];

// The question for unit n is questions[n - 1].
export const questions = lines.map(([zh, en]) => ({zh, en}));
