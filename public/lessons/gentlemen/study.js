// One question per unit of the whole story (numbered as in text.js), for
// children, in both languages: about the story or a small everyday moment.
// No short-clause alignment has been written for this story, so it is studied
// sentence by sentence.
const lines = [
  ["你想去一个什么样的奇怪国家？说说那里的样子。", "What strange country would you like to visit? Describe it."], // 1
  ["心情不好的时候，你会做什么让自己好起来？", "What do you do to feel better when you are down?"], // 2
  ["你家里有人做买卖吗？做买卖要注意什么？", "Does anyone in your family buy and sell things? What matters in trade?"], // 3
  ["你求过别人带你一起去做什么事吗？", "Have you ever asked someone to take you along?"], // 4
  ["你认识见过很多世面的老人吗？他讲过什么故事？", "Do you know an old person who has seen a lot of the world? What stories have they told?"], // 5
  ["你有外号吗？你喜欢它吗？", "Do you have a nickname? Do you like it?"], // 6
  ["出远门之前，你最期待什么？", "Before a long trip, what are you most excited about?"], // 7
  ["如果真有一个君子国，你觉得那里的人会是什么样？", "If there really were a Land of Gentlemen, what would its people be like?"], // 8
  ["你身边有喜欢让着别人的人吗？", "Do you know someone who loves to let others go first?"], // 9
  ["到了一个新地方，你最想先看什么？", "In a new place, what would you want to see first?"], // 10
  ["你觉得什么才是真正的宝贝？", "What do you think is a real treasure?"], // 11
  ["你喜欢热闹的地方，还是安静的地方？", "Do you like busy places or quiet places?"], // 12
  ["你给别人让过路吗？那时候你心里怎么想？", "Have you ever stepped aside for someone? What did you think?"], // 13
  ["对每个人都有礼貌，难不难？", "Is it hard to be polite to everyone?"], // 14
  ["别人问你一个你听不懂的问题，你会怎么回答？", "What do you say when someone asks a question you don’t understand?"], // 15
  ["真正的好人会觉得自己很特别吗？为什么？", "Do truly good people think they are special? Why?"], // 16
  ["和家人去集市或者超市的时候，你最喜欢看什么？", "When you go to a market or a shop with your family, what do you like to look at?"], // 17
  ["如果东西太便宜，你会主动多给钱吗？", "If something were too cheap, would you offer to pay more?"], // 18
  ["你见过“反过来”的事情吗？说一件。", "Have you seen something happen “the other way round”? Tell about it."], // 19
  ["别人对你特别好的时候，你会不好意思吗？", "Do you feel shy when someone is extra kind to you?"], // 20
  ["两个人都想让着对方，结果会怎么样？", "What happens when two people both try to give way?"], // 21
  ["你觉得一笔买卖怎样才算公平？", "What makes a trade fair?"], // 22
  ["两个人争不出结果时，第三个人可以怎样帮忙？", "How can a third person help when two people can’t agree?"], // 23
  ["你自己买过东西吗？你是怎么付钱的？", "Have you bought something by yourself? How did you pay?"], // 24
  ["卖东西的人说自己的东西不好，你会相信吗？", "Would you believe a seller who says his goods are poor?"], // 25
  ["占别人的便宜和自己吃亏，你更不愿意哪一个？", "Which would you rather avoid: taking advantage of someone, or losing out yourself?"], // 26
  ["一样好的和一样差的，你会把哪个留给别人？", "If there were a good one and a poor one, which would you leave for someone else?"], // 27
  ["你有没有把好东西留给别人过？", "Have you ever saved the better thing for someone else?"], // 28
  ["大家都说你不对的时候，你会怎么办？", "What do you do when everyone says you are wrong?"], // 29
  ["你有没有被找错过零钱？后来怎么样了？", "Have you ever been given the wrong change? What happened?"], // 30
  ["别人多给了你东西，你会还回去吗？", "If someone gave you too much, would you give it back?"], // 31
  ["说好“下次再说”的事，你会记得吗？", "Do you remember the things you said you would sort out “next time”?"], // 32
  ["欠了别人东西，你心里是什么感觉？", "How do you feel when you owe someone something?"], // 33
  ["两个人都想吃亏，怎样才能解决？", "When both people want to lose out, how can it be settled?"], // 34
  ["多出来的东西，你会怎样处理？", "What do you do with things you have too much of?"], // 35
  ["你觉得君子国的人为什么这样做买卖？", "Why do you think people in the Land of Gentlemen trade this way?"], // 36
  ["你见过很有学问的人吗？他是什么样子？", "Have you met someone very learned? What were they like?"], // 37
  ["你和兄弟姐妹或者好朋友一起做过什么事？", "What have you done together with a brother, a sister or a close friend?"], // 38
  ["有客人来你家，你会怎样招待他们？", "How do you welcome guests to your home?"], // 39
  ["你喜欢什么样的家？简单的，还是漂亮的？", "What kind of home do you like: simple or fancy?"], // 40
  ["看一个人的家，能看出他是什么样的人吗？", "Can you tell what someone is like from their home?"], // 41
  ["为了面子乱花钱，你觉得好不好？", "Is it good to waste money just to look important?"], // 42
  ["家里要来一位重要的客人，你会怎样准备？", "How would you get ready if an important visitor were coming?"], // 43
  ["你有没有想让客人早点走的时候？你会怎么说？", "Have you ever wanted guests to leave? What would you say?"], // 44
  ["你有没有误会过别人？后来是怎么知道的？", "Have you ever misjudged someone? How did you find out?"], // 45
  ["发现自己想错了，你会怎么做？", "What do you do when you find out you were wrong?"], // 46
  ["一个人当了大官，还能过简单的生活吗？", "Can someone in a high position still live simply?"], // 47
  ["谦虚的人和爱摆架子的人，你更喜欢哪一种？", "Whom do you like better: humble people or proud ones?"], // 48
  ["你收到过让你很意外的礼物吗？", "Have you ever received a gift that surprised you?"], // 49
  ["你吃过最奇怪的一道菜是什么？", "What is the strangest dish you have ever eaten?"], // 50
  ["第一次吃一样东西，你会怎样说它的味道？", "How would you describe something you taste for the first time?"], // 51
  ["你最喜欢吃什么？最不喜欢吃什么？", "What do you like to eat most, and least?"], // 52
  ["林之洋这样买燕窝，算不算君子？为什么？", "Was Lin Zhiyang acting like a gentleman when he bought the bird’s nest that way? Why?"], // 53
  ["换成君子国的卖货人，他会怎么做？", "What would a seller from the Land of Gentlemen have done?"], // 54
  ["如果真有一个小人国，你想去看看吗？", "If there really were a Land of Little People, would you like to visit it?"], // 55
  ["君子国的人“反着说”，小人国的人也“反着说”。有什么不一样？", "People in both lands say things the other way round. What is the difference?"], // 56
  ["如果你只有一尺高，你会怎样过一天？", "If you were only a foot tall, how would you spend a day?"], // 57
  ["格列佛的小人不到六英寸，唐敖的小人不到一尺。两个小人国，哪里一样，哪里不一样？", "Gulliver’s tiny people were under six inches; Tang Ao’s were under a foot. How are the two lands alike, and how are they different?"], // 58
  ["和朋友一起出门的时候，你们会互相照顾吗？", "Do you look after each other when you go out with friends?"], // 59
  ["有人说的话和心里想的不一样，你看得出来吗？", "Can you tell when someone says something they don’t mean?"], // 60
  ["“心眼小”的人会怎么做事？你想做什么样的人？", "How does a small-minded person behave? What kind of person do you want to be?"], // 61
  ["在外面玩了一天，回到家是什么感觉？", "How do you feel when you come home after a long day out?"], // 62
  ["你喜欢出发，还是喜欢到达？", "Do you like setting off, or arriving?"], // 63
  ["你还想去哪些奇怪的国家？给它起个名字吧。", "What other strange country would you like to visit? Give it a name."], // 64
];

// The question for unit n is questions[n - 1].
export const questions = lines.map(([zh, en]) => ({zh, en}));
