// One question per unit of the whole story (numbered as in text.js), for
// children, in both languages: about the story or a small everyday moment.
// No short-clause alignment has been written for this story, so it is studied
// sentence by sentence.
const lines = [
  ["如果你写一本书讲自己的故事，第一句话会写什么？", "If you wrote a book about your own life, what would the first sentence be?"], // 1
  ["你见过的最大的风或者雨，是什么样子的？", "What was the biggest storm you have ever seen like?"], // 2
  ["遇到很难的事，你会怎样给自己加油？", "When something is very hard, how do you keep yourself going?"], // 3
  ["来到一个陌生的地方，你最先会做什么？", "When you arrive somewhere new, what is the first thing you do?"], // 4
  ["你特别累的时候，最想在哪里睡一觉？", "When you are very tired, where would you most like to sleep?"], // 5
  ["如果你醒来发现自己动不了，你会怎么想？", "If you woke up and found you couldn’t move, what would you think?"], // 6
  ["很多根细绳能绑住一个巨人。这让你想到什么？", "Many thin strings could hold down a giant. What does that make you think of?"], // 7
  ["有小虫子在你身上爬的时候，你是什么感觉？", "How does it feel when a little bug crawls on you?"], // 8
  ["你觉得小人看见格列佛的时候，心里会怎么想？", "What do you think the tiny man thought when he saw Gulliver?"], // 9
  ["你和朋友们要一起做一件很难的事，你们会怎么分工？", "If you and your friends had to do something hard together, how would you share the work?"], // 10
  ["你被别人吓到过吗？你吓到过别人吗？", "Have you ever been frightened by someone, or frightened someone?"], // 11
  ["格列佛被箭射了，却没有伤害小人们。你觉得他为什么不还手？", "Gulliver was shot with arrows but did not hurt the tiny people. Why do you think he didn’t fight back?"], // 12
  ["不会说对方的语言时，你可以怎样告诉别人你的意思？", "When you can’t speak someone’s language, how can you show what you mean?"], // 13
  ["如果你突然变得很大很大，吃饭会遇到什么麻烦？", "If you suddenly became huge, what problems would you have at mealtime?"], // 14
  ["你上一次为别人欢呼，是什么时候？", "When did you last cheer for someone?"], // 15
  ["小人们偷偷在酒里放药。你觉得他们做得对吗？", "The tiny people secretly put medicine in the wine. Was that right?"], // 16
  ["五百个木匠一起造车，要怎样才能合作好？", "How can five hundred carpenters work well together on one cart?"], // 17
  ["一千五百匹小马才拉得动格列佛。说一个“人多力量大”的例子。", "It took fifteen hundred tiny horses to pull Gulliver. Give an example of many hands making light work."], // 18
  ["你觉得一个家最重要的是什么？是房子大，还是别的？", "What matters most about a home? Is it the size, or something else?"], // 19
  ["如果你能给自己起一个外号，你会叫什么？", "If you could give yourself a nickname, what would it be?"], // 20
  ["皇帝为什么要先知道格列佛的口袋里有什么？", "Why did the emperor want to know what was in Gulliver’s pockets?"], // 21
  ["选一样小东西，想一想：在小人眼里，它是什么样子？", "Pick a small thing. What would it look like to a tiny person?"], // 22
  ["你第一次见到一样东西时，有没有猜错过它的用处？", "Have you ever guessed wrong about what something was for?"], // 23
  ["不说出名字，只说一样东西的样子，让对方来猜。", "Describe something without saying its name, and let your partner guess."], // 24
  ["你每天最常看的东西是什么？它对你有多重要？", "What do you look at most every day? How important is it to you?"], // 25
  ["别人对你的东西很好奇时，你愿意给他看吗？", "When someone is curious about your things, do you let them look?"], // 26
  ["学一种新的语言，你觉得最难的是什么？", "What do you think is hardest about learning a new language?"], // 27
  ["你答应过别人什么事？你做到了吗？", "What have you promised someone? Did you keep your promise?"], // 28
  ["个子很大的人要怎样做，才能让小小的人觉得安全？", "What should a big person do so that small people feel safe?"], // 29
  ["你一顿饭能吃多少？和家里人比一比。", "How much do you eat at one meal? Compare with your family."], // 30
  ["12 × 12 × 12 是多少？你能自己算一算吗？", "What is 12 × 12 × 12? Can you work it out yourself?"], // 31
  ["你听说过有人为了很小的事吵起来吗？", "Have you ever heard of people quarrelling over something very small?"], // 32
  ["你吃煮鸡蛋的时候，从哪一头敲开？", "When you eat a boiled egg, which end do you crack?"], // 33
  ["一个人受了伤，就要所有人都改变做法，你觉得公平吗？", "One person got hurt, so everyone had to change. Is that fair?"], // 34
  ["一条规定好不好，你会怎么判断？", "How can you tell whether a rule is a good one?"], // 35
  ["遇到你不同意的规定，你会怎么做？", "What do you do when you disagree with a rule?"], // 36
  ["为了从哪头敲鸡蛋就打仗，你觉得值得吗？为什么？", "Is it worth fighting a war over which end of an egg to break? Why?"], // 37
  ["有些事可以让每个人自己决定。举一个例子。", "Some things each person can decide for themselves. Give an example."], // 38
  ["有人要来欺负你的时候，你会怎么办？", "What would you do if someone came to pick on you?"], // 39
  ["做一件大事之前，你会先准备什么？", "Before you do something big, what do you get ready first?"], // 40
  ["对格列佛很浅的海，对小人却很深。你还能想到这样的例子吗？", "The sea was shallow for Gulliver but deep for the tiny people. Can you think of another example like that?"], // 41
  ["如果你看见一个巨人朝你走过来，你会怎么做？", "What would you do if you saw a giant walking toward you?"], // 42
  ["你用绳子做过什么有用的事吗？", "Have you ever used a rope for something useful?"], // 43
  ["做事遇到困难，你会停下来，还是想办法继续？", "When something gets hard, do you stop, or find a way to keep going?"], // 44
  ["你帮别人做过一件很大的事吗？", "Have you ever helped someone with something big?"], // 45
  ["得到奖励的时候，你心里是什么感觉？", "How do you feel when you get a reward?"], // 46
  ["已经赢了，还想要更多，这样好不好？", "Is it good to want more when you have already won?"], // 47
  ["有人要你做不对的事，你敢说“不”吗？", "If someone asked you to do something wrong, would you dare to say no?"], // 48
  ["做对的事，有时会让别人不高兴。你还会坚持吗？", "Doing what is right sometimes upsets people. Would you still do it?"], // 49
  ["两个吵过架的人，怎样才能和好？", "How can two people who quarrelled make peace?"], // 50
  ["有人在背后说你的坏话，你会怎么做？", "What would you do if someone said bad things about you behind your back?"], // 51
  ["你的朋友有危险时，你会怎样帮他？", "How would you help a friend who was in danger?"], // 52
  ["被人冤枉是什么感觉？", "How does it feel to be blamed for something you didn’t do?"], // 53
  ["遇到危险的时候，你会先告诉谁？", "If you were in danger, who would you tell first?"], // 54
  ["冒着危险帮助别人，你觉得这算勇敢吗？", "Is it brave to help someone when it puts you in danger?"], // 55
  ["如果要马上离开一个地方，你会带什么？", "If you had to leave somewhere right away, what would you take?"], // 56
  ["你出过远门吗？那次带了哪些东西？", "Have you ever gone on a long trip? What did you take?"], // 57
  ["有人热情地欢迎你，你是什么感觉？", "How do you feel when someone welcomes you warmly?"], // 58
  ["你在路上发现过什么有意思的东西吗？", "Have you ever found something interesting along the way?"], // 59
  ["碰到好运气的时候，你会怎么想？", "What do you think when a bit of good luck comes your way?"], // 60
  ["一件事要很多人帮忙，你会怎样请大家来帮忙？", "When you need many people’s help, how do you ask for it?"], // 61
  ["如果你是布莱夫斯库的皇帝，你会把格列佛交出去吗？", "If you were the emperor of Blefuscu, would you hand Gulliver over?"], // 62
  ["保护一个被人追赶的人，需要什么样的勇气？", "What kind of courage does it take to protect someone who is being chased?"], // 63
  ["如果你去旅行，会带什么纪念品回家？", "If you went on a trip, what souvenir would you bring home?"], // 64
  ["你需要帮助的时候，有人帮过你吗？", "Has anyone helped you when you needed it?"], // 65
  ["别人不相信你说的话时，你会怎样证明？", "When people don’t believe you, how do you show you are telling the truth?"], // 66
  ["如果你是格列佛，你还想再去冒险吗？", "If you were Gulliver, would you go on another adventure?"], // 67
];

// The question for unit n is questions[n - 1].
export const questions = lines.map(([zh, en]) => ({zh, en}));
