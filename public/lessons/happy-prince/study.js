// One question per unit of the whole story (numbered as in text.js), for
// children, in both languages: one sentence, about the story or a small
// everyday moment. No short-clause alignment has been written for this story,
// so it is studied sentence by sentence.
const lines = [
  ["如果你站在很高的地方，你最想看看城里的什么？", "If you stood somewhere very high, what would you most like to see in your town?"], // 1
  ["你最喜欢的一样东西是什么颜色的？说说它为什么特别。", "What color is your favorite thing? Tell why it is special."], // 2
  ["有人夸奖你的时候，你心里是什么感觉？", "How do you feel inside when someone praises you?"], // 3
  ["一样东西漂亮，和它有用，哪一个对你更重要？", "Which matters more to you: that a thing is beautiful, or that it is useful?"], // 4
  ["想要一样得不到的东西时，你可以怎样让自己平静下来？", "When you want something you cannot have, how can you calm yourself down?"], // 5
  ["你不开心的时候，看到什么会让你好受一点？", "When you feel sad, what helps you feel a little better?"], // 6
  ["你觉得天使会是什么样子？画给对方看，或者说一说。", "What do you think an angel looks like? Draw it or describe it for your partner."], // 7
  ["有没有一样东西，你没亲眼见过，却相信它是真的？", "Is there something you have never seen but still believe is real?"], // 8
  ["你做过最美的梦是什么？讲给对方听。", "What is the most beautiful dream you have had? Tell your partner."], // 9
  ["如果你能像小鸟一样飞，你想先飞到哪里？", "If you could fly like a bird, where would you fly first?"], // 10
  ["朋友们都去做一件事，你却想留下来，你会怎么选？", "If all your friends went off to do something and you wanted to stay, what would you choose?"], // 11
  ["你是怎么认识你的好朋友的？说说那一天。", "How did you meet a good friend? Tell about that day."], // 12
  ["你想交一个新朋友时，第一句话会说什么？", "When you want to make a new friend, what is the first thing you say?"], // 13
  ["你会用什么方法告诉家人你爱他们？", "How do you show your family that you love them?"], // 14
  ["别人笑你喜欢的东西时，你会怎么想、怎么做？", "When others laugh at something you like, what do you think and do?"], // 15
  ["朋友都不在身边时，你会做什么让自己不孤单？", "When your friends are not around, what do you do so you don’t feel lonely?"], // 16
  ["你有没有因为心情不好，就挑别人的毛病？后来怎么样了？", "Have you ever found fault with someone just because you were in a bad mood? What happened?"], // 17
  ["你喜欢的事，好朋友不一定喜欢。这时候你们可以怎么做？", "Your best friend may not like what you like. What can you do then?"], // 18
  ["你家里有什么让你舍不得离开的东西？", "What is something at home you would never want to leave behind?"], // 19
  ["生气的时候马上走开，好不好？你会怎么做？", "Is it good to walk away right when you are angry? What would you do?"], // 20
  ["出门在外时，你最想在一个什么样的地方睡觉？", "When you are away from home, what kind of place would you like to sleep in?"], // 21
  ["你第一次走进一个新地方时，最先注意到什么？", "When you go somewhere new, what is the first thing you notice?"], // 22
  ["你喜欢待在家里的哪个角落？为什么？", "What spot at home do you like to stay in? Why?"], // 23
  ["你睡觉前最喜欢做哪件小事？", "What small thing do you like to do before you fall asleep?"], // 24
  ["你遇到过什么奇怪的事，后来才知道原因？", "Have you ever seen something strange and only later found out why it happened?"], // 25
  ["下雨天，你喜欢做什么？", "What do you like to do on a rainy day?"], // 26
  ["一件奇怪的事又发生了一次，你会去找原因吗？怎么找？", "If a strange thing happens again, would you look for the reason? How?"], // 27
  ["事情不顺利时，你会马上换个办法，还是再看看？", "When things go wrong, do you try something else at once, or look a bit more first?"], // 28
  ["猜一猜，燕子抬头看见了什么？", "Guess: what did the swallow see when he looked up?"], // 29
  ["看见别人哭的时候，你会怎么做？", "What do you do when you see someone crying?"], // 30
  ["遇到新朋友，你会怎么介绍自己？", "How do you introduce yourself to someone new?"], // 31
  ["如果你能给自己起一个名字，你会叫什么？为什么？", "If you could give yourself a name, what would it be? Why?"], // 32
  ["一个看起来快乐的人，心里也可能难过吗？", "Can someone who looks happy still feel sad inside?"], // 33
  ["一个永远不许难过的地方，你觉得好不好？为什么？", "Would a place where no one is ever allowed to be sad be good? Why?"], // 34
  ["你最喜欢和朋友一起玩什么游戏？", "What is your favorite game to play with friends?"], // 35
  ["你家附近有没有你从来没去看过的地方？你想知道那里有什么吗？", "Is there a place near your home you have never visited? Would you like to know what is there?"], // 36
  ["玩得开心，和心里真正快乐，有什么不一样？", "How is having fun different from being truly happy?"], // 37
  ["你有没有看见过别人过得很辛苦？你心里有什么感觉？", "Have you ever seen someone having a very hard time? How did it make you feel?"], // 38
  ["心里想到别人的事，哪些话最好不要大声说出来？", "What kinds of thoughts about other people are better not said out loud?"], // 39
  ["你觉得王子为什么能看见那么远的地方？", "Why do you think the Prince can see so far away?"], // 40
  ["家里谁为你做过辛苦的事？你可以怎样谢谢他？", "Who in your family works hard for you? How could you thank them?"], // 41
  ["你穿的衣服是谁做出来的？想一想，说一说。", "Who made the clothes you are wearing? Think about it and talk about it."], // 42
  ["你生病的时候，最想要谁陪在身边？", "When you are sick, who do you most want with you?"], // 43
  ["你想帮助别人、自己却做不到的时候，可以请谁帮忙？", "When you want to help someone but can’t do it yourself, who could you ask for help?"], // 44
  ["有人在等你的时候，你会着急吗？你会怎么做？", "When someone is waiting for you, do you feel in a hurry? What do you do?"], // 45
  ["你知道埃及有哪些有名的东西？说一样给对方听。", "What famous things do you know about Egypt? Tell your partner one."], // 46
  ["有人请你帮一个小忙，你通常会怎么回答？", "When someone asks you for a small favor, what do you usually say?"], // 47
  ["有人对你不友好以后，你还愿意帮助像他那样的人吗？", "After someone was unkind to you, would you still help someone like them?"], // 48
  ["别人没有伤到你，却对你不尊重，你会有什么感觉？", "How do you feel when someone doesn’t hurt you but still treats you with disrespect?"], // 49
  ["你有没有因为心疼别人，改变了自己的计划？", "Have you ever changed your plans because you felt sorry for someone?"], // 50
  ["今天你想对谁说一声「谢谢」？为什么？", "Who would you like to say thank you to today? Why?"], // 51
  ["如果你要送一件礼物给需要的人，你会怎么送？", "If you were taking a gift to someone in need, how would you bring it?"], // 52
  ["从你家到学校，路上会经过哪些地方？", "What places do you pass on your way from home to school?"], // 53
  ["你觉得「爱的力量」能做到什么？举一个例子。", "What do you think “the power of love” can do? Give an example."], // 54
  ["这位姑娘不知道女裁缝有多辛苦。你想对她说什么？", "The girl doesn’t know how hard the seamstress works. What would you say to her?"], // 55
  ["你找一个地方找了很久，终于找到时，是什么心情？", "How do you feel when you finally find a place you were looking for?"], // 56
  ["悄悄帮助别人、不让他知道，你觉得怎么样？", "What do you think about helping someone quietly, without them knowing?"], // 57
  ["家人生病时，你可以为他做哪件小事？", "When someone in your family is sick, what small thing could you do for them?"], // 58
  ["帮助别人以后，你心里是什么感觉？", "How do you feel inside after you help someone?"], // 59
  ["你今天可以做哪一件小小的好事？", "What is one small good deed you could do today?"], // 60
  ["你见过什么让你觉得很稀奇的东西？", "What have you seen that seemed really unusual to you?"], // 61
  ["给别人讲一件事时，用简单的话好，还是用难的词好？为什么？", "When you explain something, is it better to use simple words or hard words? Why?"], // 62
  ["要去一个期待已久的地方之前，你会做什么？", "What do you do before you go somewhere you have been looking forward to?"], // 63
  ["有新同学来到你们班，你会怎样欢迎他？", "When a new classmate arrives, how would you welcome them?"], // 64
  ["出远门以前，你会跟谁说再见？", "Before you go on a trip, who do you say goodbye to?"], // 65
  ["朋友请你再多玩一会儿，你会怎么回答？", "If a friend asks you to stay and play a little longer, what do you say?"], // 66
  ["你最想亲眼看看哪一种大动物？", "Which big animal would you most like to see with your own eyes?"], // 67
  ["你看过日出或者早上的星星吗？那时你有什么感觉？", "Have you ever watched the sunrise or the morning star? How did it feel?"], // 68
  ["你能学一学狮子吼吗？再学一种你喜欢的动物的叫声。", "Can you roar like a lion? Now make the sound of an animal you like."], // 69
  ["你觉得王子这次要请燕子做什么？", "What do you think the Prince will ask the swallow to do this time?"], // 70
  ["你长大以后，有什么梦想？", "What is a dream you have for when you grow up?"], // 71
  ["你又累又饿的时候，还能好好做功课吗？那时你需要什么？", "Can you do your homework well when you are tired and hungry? What do you need then?"], // 72
  ["你觉得一个「好心肠」的人会做哪些事？", "What kinds of things does a person with “a good heart” do?"], // 73
  ["你有没有一样很珍贵、舍不得送人的东西？", "Do you have something so precious that you would not want to give it away?"], // 74
  ["为了帮助别人，王子愿意送出自己的眼睛。你怎么看？", "The Prince will give his own eye to help someone. What do you think about that?"], // 75
  ["有没有一件事，你很不想做，因为怕伤害别人？", "Was there ever something you really didn’t want to do because it might hurt someone?"], // 76
  ["爸爸妈妈说「照我说的做」时，你会怎么做？", "When a parent says “do as I tell you,” what do you do?"], // 77
  ["如果你家屋顶有个洞，下雨天会怎么样？", "If your roof had a hole in it, what would happen on a rainy day?"], // 78
  ["你收到过意想不到的礼物吗？那时你有什么感觉？", "Have you ever received a surprise gift? How did you feel?"], // 79
  ["年轻人不知道宝石是谁送的。你觉得他应该知道吗？为什么？", "The young man doesn’t know who sent the jewel. Should he know? Why?"], // 80
  ["大家一起出力干活的时候，为什么常常一起喊「嘿哟」？", "When people work hard together, why do they often shout “heave-ho”?"], // 81
  ["你很兴奋地说一件事，别人却没注意，你会怎么做？", "When you share exciting news and nobody notices, what do you do?"], // 82
  ["跟好朋友说再见的时候，你会说什么？", "What do you say when you say goodbye to a good friend?"], // 83
  ["王子又请燕子留下来。你觉得燕子这次会答应吗？", "The Prince asks again. Do you think the swallow will say yes this time?"], // 84
  ["天气很冷的时候，你最想去一个什么样的地方？", "When it’s very cold, what kind of place do you most want to be?"], // 85
  ["如果你要给自己搭一个小窝，你会用什么材料？", "If you built yourself a little nest, what would you make it from?"], // 86
  ["你答应过别人什么事？你做到了吗？", "What is something you promised someone? Did you keep the promise?"], // 87
  ["用「比……还……」说一句话，形容你喜欢的东西。", "Describe something you like with “…er than,” like “redder than a rose.”"], // 88
  ["你不小心弄坏了重要的东西时，会怎么做？", "What do you do when you accidentally ruin something important?"], // 89
  ["一个孩子又冷又害怕，大人可以怎样帮助她？", "When a child is cold and afraid, how can grown-ups help her?"], // 90
  ["王子把最后一只眼睛也送出去，你觉得他在想什么？", "The Prince gives away his last eye. What do you think he is thinking?"], // 91
  ["闭上眼睛一分钟，说说你听到了什么、想到了什么。", "Close your eyes for one minute. What did you hear and think about?"], // 92
  ["王子又说「照我说的去做吧」。如果你是燕子，你会怎么选？", "The Prince says “do as I command you” again. If you were the swallow, what would you choose?"], // 93
  ["你觉得小女孩拿到宝石时，会想到什么？", "What do you think the girl thought when she got the jewel?"], // 94
  ["你最近一次开怀大笑，是因为什么？", "What made you laugh out loud recently?"], // 95
  ["朋友需要你的时候，你会怎样陪着他？", "When a friend needs you, how do you stay by their side?"], // 96
  ["王子为什么叫燕子走？你觉得他心里想不想燕子留下来？", "Why does the Prince tell the swallow to go? Do you think he wants him to stay?"], // 97
  ["「永远陪着你」是一个很大的承诺。你会对谁说这句话？", "“I will stay with you always” is a big promise. Who would you say it to?"], // 98
  ["如果你要给看不见的人讲一个地方，你会怎么讲？", "If you described a place to someone who cannot see, what would you tell them?"], // 99
  ["如果你能问狮身人面像一个问题，你会问什么？", "If you could ask the Sphinx one question, what would you ask?"], // 100
  ["你见过骆驼吗？你觉得骑骆驼会是什么感觉？", "Have you ever seen a camel? What do you think riding one would feel like?"], // 101
  ["请你也编一个奇妙的小故事，讲给对方听。", "Make up a short, wonderful story of your own and tell it to your partner."], // 102
  ["为什么王子觉得人们的痛苦，比远方的奇事更重要？", "Why does the Prince think people’s suffering matters more than faraway wonders?"], // 103
  ["你住的地方，有没有需要帮助的人？我们可以怎样知道？", "Are there people who need help where you live? How could we find out?"], // 104
  ["如果你家门口坐着一个饿肚子的人，你会怎么做？", "If a hungry person sat outside your door, what would you do?"], // 105
  ["你饿肚子的时候是什么感觉？想一想，有的孩子每天都这样。", "How do you feel when you are hungry? Think about children who feel this way every day."], // 106
  ["巡夜人把孩子们赶走了。如果你是巡夜人，你会怎么做？", "The watchman sent the boys away. If you were the watchman, what would you do?"], // 107
  ["看到让你难过的事，你会告诉谁？", "When you see something that makes you sad, who do you tell?"], // 108
  ["王子说，人们以为金子能让人快乐。你觉得什么能让人快乐？", "People think gold makes them happy, says the Prince. What do you think makes people happy?"], // 109
  ["王子变得不好看了，可是他做的事很美。你怎么看？", "The Prince no longer looks beautiful, but what he did is beautiful. What do you think?"], // 110
  ["和别人分享以后，看到对方开心，你自己是什么感觉？", "When you share and see someone happy, how do you feel?"], // 111
  ["你见过雪吗？用三个词形容一下雪。", "Have you ever seen snow? Describe it with three words."], // 112
  ["冬天你最喜欢做什么？", "What do you like to do most in winter?"], // 113
  ["为了你爱的人，你愿意忍受什么辛苦？", "What hard thing would you put up with for someone you love?"], // 114
  ["天冷的时候，你会做什么让身体暖和起来？", "What do you do to warm up when it’s cold?"], // 115
  ["读到这里，你心里有什么感觉？说给对方听。", "How do you feel as you read this? Tell your partner."], // 116
  ["跟你爱的人告别时，你会怎样表达你的爱？", "How do you show your love when you say goodbye to someone dear?"], // 117
  ["你上一次对别人说「我爱你」是什么时候？", "When did you last tell someone “I love you”?"], // 118
  ["说到死亡，你会想到什么？可以和家人一起聊一聊。", "What do you think about when you hear about death? You can talk about it with your family."], // 119
  ["燕子为王子付出了一切。你觉得他后悔吗？", "The swallow gave everything for the Prince. Do you think he regretted it?"], // 120
  ["为什么王子的心会裂开？你觉得只是因为天冷吗？", "Why did the Prince’s heart break? Do you think it was only the cold?"], // 121
  ["只看外表去评价一个人或一样东西，会错过什么？", "What do we miss when we judge someone or something only by how it looks?"], // 122
  ["别人都说一样的话时，你敢说出自己不同的想法吗？", "When everyone says the same thing, do you dare to say what you really think?"], // 123
  ["王子的宝石和金子去哪里了？市长知道吗？", "Where did the Prince’s jewels and gold go? Does the Mayor know?"], // 124
  ["跟着别人说一样的话很容易。说出自己的想法为什么更难？", "Repeating others is easy. Why is saying your own thoughts harder?"], // 125
  ["市长的公告有道理吗？为什么这话听起来很好笑？", "Does the Mayor’s rule make sense? Why does it sound funny?"], // 126
  ["「不美就没有用」，你同意这句话吗？为什么？", "“Not beautiful means not useful.” Do you agree? Why?"], // 127
  ["市长想立自己的雕像。你觉得什么样的人值得被人记住？", "The Mayor wants a statue of himself. What kind of person deserves to be remembered?"], // 128
  ["大家都想要同一样东西时，怎样才能不吵架？", "When everyone wants the same thing, how can you avoid a quarrel?"], // 129
  ["铅心为什么熔化不了？说说你的想法。", "Why do you think the lead heart would not melt?"], // 130
  ["为什么天使选了铅心和死去的燕子，而不是金子和宝石？", "Why did the angel choose the lead heart and the dead bird, not gold or jewels?"], // 131
  ["在你眼里，什么是最宝贵的？为什么？", "What is most precious to you? Why?"], // 132
];

// The question for unit n is questions[n - 1].
export const questions = lines.map(([zh, en]) => ({zh, en}));
