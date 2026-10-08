// 成语 · 第一辑 · Idioms, Set 1. Ten idioms for children of about eight: the
// idiom itself, its little story in two or three sentences, and a verse or
// two of scripture that looks at the same thing (angle: similar, opposite,
// related). Chinese and English are both written by Lucas Academy, one short
// sentence for one. The scripture is 和合本 (1919, public domain, checked
// against b.ibible.hk); its English (NIV) is licensed, so those units name
// their verse (ref) and the Worker fetches the text.
// Words are pre-segmented; punctuation is its own token. Polyphones keep one
// reading in this lesson: 只 zhī (measure word; 只有 is a word), 得 dé (obtain;
// 觉得/得到 are words), 长 zhǎng (grow; 助长/长高/官长), 地 dì (ground), 着 zhe
// (particle; 找着 is a word), 塞 sài.
//
// Each unit: [English (or {ref}), 中文, 用简单的话理解, In simple words, angle?]
const lines = [
  // 1 · 井底之蛙
  ["A frog at the bottom of a well", // 1
   "井底/之/蛙",
   "住在井底的青蛙，以为天只有井口那么大。现在说一个人见得少，就以为世界很小。",
   "A frog at the bottom of a well thinks the sky is as big as the well’s mouth. We say it of someone who has seen little and thinks the world is small."],
  ["A frog lived in a well.", // 2
   "一只/青蛙/住/在/一口/井/里/。",
   "青蛙的家在井里。", "The frog’s home is in the well."],
  ["When it looked up, the sky was only as big as the mouth of the well.", // 3
   "它/抬头/看/，/天/只有/井口/那么/大/。",
   "从井里往上看，只能看见一小块天。", "From inside a well you can see only a small piece of sky."],
  ["A sea turtle told it, “Out there is the sea, so big that you cannot see its edge.”", // 4
   "一只/海龟/告诉/它/：/“/外面/有/大海/，/一眼/看不到/边/。/”",
   "海龟见过很大很大的海。", "The turtle has seen the huge sea."],
  [{ref: 'ISA.55.9'}, // 5
   "天/怎样/高过/地/，/照样/，/我/的/道路/高过/你们/的/道路/；/我/的/意念/高过/你们/的/意念/。",
   "井口外面的天那么大；神的想法，比我们想的高很多。",
   "The sky outside the well is so big, and God’s thoughts are far higher than ours.",
   'related'],

  // 2 · 守株待兔
  ["Waiting by the stump for a rabbit", // 6
   "守/株/待/兔",
   "农夫捡到一只撞死在树桩上的兔子，就天天守着树桩等。现在说不努力，只想等运气。",
   "A farmer found a rabbit that had run into a tree stump, then waited by the stump every day for another. We say it of someone who stops working and just waits for luck."],
  ["A farmer was working in his field.", // 7
   "一个/农夫/在/田/里/干活/。",
   "他每天种地。", "He farmed every day."],
  ["A rabbit came running, hit a tree stump, and died.", // 8
   "一只/兔子/跑/过来/，/撞/在/树桩/上/，/死/了/。",
   "兔子撞到了树桩。", "The rabbit ran into the stump."],
  ["The farmer was delighted. From then on he sat by the stump every day and stopped farming.", // 9
   "农夫/很/高兴/，/从此/天天/守/着/树桩/，/不/再/种地/了/。",
   "他想白捡兔子，不想干活了。", "He wanted free rabbits and no more work."],
  [{ref: 'PRO.6.6'}, // 10
   "懒惰人/哪/，/你/去/察看/蚂蚁/的/动作/就/可/得/智慧/。",
   "蚂蚁不等运气，自己去找食物。", "Ants don’t wait for luck; they go and find food.",
   'opposite'],
  [{ref: 'PRO.6.7'}, // 11
   "蚂蚁/没有/元帅/，/没有/官长/，/没有/君王/，",
   "没有人管它们，它们自己知道要做事。", "No one tells them what to do; they know to work."],
  [{ref: 'PRO.6.8'}, // 12
   "尚且/在/夏天/预备/食物/，/在/收割/时/聚敛/粮食/。",
   "夏天就把冬天的粮食预备好。", "In summer they store up food for the winter."],

  // 3 · 愚公移山
  ["The old man who moved the mountains", // 13
   "愚公/移/山",
   "愚公年纪很大了，还要把门前的大山挖走。现在说只要坚持，再难的事也能做成。",
   "Old Yugong set out to dig away the mountains in front of his door. We say it when keeping at something makes even the hardest thing possible."],
  ["Two big mountains stood in front of Yugong’s house, and going out was hard.", // 14
   "愚公/家/门前/有/两座/大山/，/出门/很/不/方便/。",
   "大山挡住了路。", "The mountains blocked the way."],
  ["He and his whole family dug away the mountains, basket by basket.", // 15
   "他/带/着/全家/，/一筐/一筐/把/山/挖/走/。",
   "他们一点一点地挖。", "They dug a little at a time."],
  ["Someone laughed at him. He said, “When I die, my sons will go on, and after them my grandsons. But the mountains will not grow any higher.”", // 16
   "有人/笑/他/，/他/说/：/“/我/死/了/还有/儿子/，/儿子/还有/孙子/，/山/却/不会/再/长高/。/”",
   "一代一代挖下去，总有一天挖完。", "Generation after generation, one day the digging will be done."],
  [{ref: 'MAT.17.20'}, // 17
   "耶稣/说/：/“/是/因/你们/的/信心/小/。/我/实在/告诉/你们/，/你们/若/有/信心/，/像/一粒/芥菜种/，/就是/对/这/座/山/说/：/‘/你/从/这边/挪/到/那边/。/’/他/也/必/挪/去/；/并且/你们/没有/一件/不能/做/的/事/了/。",
   "愚公靠坚持；耶稣说的是信心。小小的信心，也能让山挪开。",
   "Yugong kept at it; Jesus speaks of faith. Even a tiny faith can move a mountain.",
   'similar'],

  // 4 · 亡羊补牢
  ["Mending the pen after a sheep is lost", // 18
   "亡/羊/补/牢",
   "羊丢了，赶快把羊圈修好，别的羊就不会再丢。现在说出了错，马上改正还不晚。",
   "A sheep got out, so the pen was mended at once and no more were lost. We say it when a mistake is put right in time."],
  ["A man kept a flock of sheep, and there was a hole in the pen.", // 19
   "一个/人/养/了/一群/羊/，/羊圈/破/了/一个/洞/。",
   "羊圈坏了。", "The pen was broken."],
  ["One night a wolf came in through the hole and carried off a sheep.", // 20
   "一天/夜里/，/狼/从/洞/里/钻/进来/，/叼/走/了/一只/羊/。",
   "丢了一只羊。", "One sheep was lost."],
  ["He mended the hole at once, and never lost another sheep.", // 21
   "他/马上/把/洞/补/好/，/从此/再/也/没/丢/过/羊/。",
   "修好了，别的羊就安全了。", "Once it was mended, the other sheep were safe."],
  [{ref: 'LUK.15.4'}, // 22
   "“/你们/中间/谁/有/一百/只/羊/失去/一只/，/不/把/这/九十九/只/撇/在/旷野/、/去/找/那/失去/的/羊/，/直到/找着/呢/？",
   "丢了一只羊，牧人不只是修栏，他去把它找回来。", "When a sheep is lost, the shepherd doesn’t just mend the pen; he goes to find it.",
   'related'],
  [{ref: 'LUK.15.5'}, // 23
   "找着/了/，/就/欢欢喜喜/的/扛/在/肩上/，/回到/家里/，",
   "找到了，他高高兴兴地扛回家。", "When he finds it, he carries it home gladly."],
  [{ref: 'LUK.15.6'}, // 24
   "就/请/朋友/邻舍/来/，/对/他们/说/：/‘/我/失去/的/羊/已经/找着/了/，/你们/和/我/一同/欢喜/吧/！/’",
   "他请朋友来，一起为找回的羊高兴。", "He invites his friends to be glad with him."],

  // 5 · 拔苗助长
  ["Pulling up the seedlings to help them grow", // 25
   "拔/苗/助长",
   "农夫嫌禾苗长得慢，把它们一棵棵往上拔，结果苗全枯死了。现在说太着急，反而把事情弄坏。",
   "A farmer thought his seedlings grew too slowly and pulled each one up a little; they all withered. We say it when hurrying something spoils it."],
  ["A farmer planted seedlings. He went to look every day, but they stayed just as short.", // 26
   "一个/农夫/种/了/禾苗/。/他/天天/去/看/，/可是/禾苗/总是/那么/矮/。",
   "他等不及了。", "He couldn’t wait."],
  ["He pulled every seedling up a little, and was tired out by the end of the day.", // 27
   "他/把/每/一棵/苗/都/往上/拔/了/一点/，/累/了/一天/。",
   "他以为这样苗就高了。", "He thought this made them taller."],
  ["The next day, all the seedlings had withered.", // 28
   "第二天/，/禾苗/全/都/枯/了/。",
   "苗离开了土，就死了。", "Pulled from the soil, the seedlings died."],
  [{ref: 'JAS.5.7'}, // 29
   "弟兄们/哪/，/你们/要/忍耐/，/直到/主/来/。/看/哪/，/农夫/忍耐/等候/地/里/宝贵/的/出产/，/直到/得/了/秋雨/春雨/。",
   "农夫耐心等雨、等收成；禾苗要自己慢慢长。", "The farmer waits patiently for the rain and the harvest; seedlings grow in their own time.",
   'opposite'],

  // 6 · 自相矛盾
  ["A spear against one’s own shield", // 30
   "自相/矛盾",
   "一个人说他的矛什么都能刺穿，又说他的盾什么都能挡住。现在说一个人的话前后对不上。",
   "A man said his spear could pierce anything and his shield could stop anything. We say it when someone’s words don’t agree with each other."],
  ["A man was selling spears and shields in the street.", // 31
   "一个/人/在/街上/卖/矛/和/盾/。",
   "矛是刺人的，盾是挡矛的。", "A spear is for stabbing; a shield blocks it."],
  ["He said, “My spear can pierce anything, and my shield can stop anything.”", // 32
   "他/说/：/“/我/的/矛/什么/都/能/刺穿/，/我/的/盾/什么/都/能/挡住/。/”",
   "他把两样东西都夸到了天上。", "He praised both to the skies."],
  ["Someone asked, “What if your spear strikes your shield?” He had no answer.", // 33
   "有人/问/：/“/用/你/的/矛/刺/你/的/盾/，/会/怎样/？/”/他/答/不/出来/。",
   "两句话不能都是真的。", "Both things can’t be true."],
  [{ref: 'JAS.3.10'}, // 34
   "颂赞/和/咒诅/从/一个/口/里/出来/！/我/的/弟兄们/，/这/是/不/应当/的/！",
   "同一张嘴，不该一会儿说好话，一会儿咒骂。", "The same mouth shouldn’t bless and curse by turns.",
   'similar'],
  [{ref: 'JAS.3.11'}, // 35
   "泉源/从/一个/眼/里/能/发出/甜/苦/两样/的/水/吗/？",
   "一个泉眼不会同时冒出甜水和苦水。", "One spring doesn’t give sweet water and bitter water at once."],

  // 7 · 塞翁失马
  ["The old man who lost his horse", // 36
   "塞翁/失/马",
   "老人丢了马，大家来安慰他，他却说这不一定是坏事；后来马果然带回来一匹好马。现在说坏事也可能变成好事。",
   "An old man lost his horse and said it might not be bad luck; later the horse came back with another fine horse. We say it when something bad may turn out well."],
  ["An old man lived near the frontier, and his horse ran away.", // 37
   "边塞/有/一位/老人/，/他/的/马/跑/丢/了/。",
   "马不见了。", "The horse was gone."],
  ["The neighbors came to comfort him. He said, “Who knows? This may be a good thing.”", // 38
   "邻居/来/安慰/他/，/他/说/：/“/这/怎么/知道/不是/好事/呢/？/”",
   "他不着急。", "He wasn’t upset."],
  ["Months later the horse came back, and brought a fine horse with it.", // 39
   "几个月/后/，/那/匹/马/回来/了/，/还/带回/一匹/好马/。",
   "坏事变成了好事。", "The bad thing turned out well."],
  [{ref: 'ROM.8.28'}, // 40
   "我们/晓得/万事/都/互相/效力/，/叫/爱/神/的/人/得/益处/，/就是/按/他/旨意/被/召/的/人/。",
   "老人说坏事也许是好事；圣经说，爱神的人，万事都会一起变成好事。",
   "The old man said bad luck might be good; the Bible says that for those who love God, all things work together for good.",
   'similar'],

  // 8 · 掩耳盗铃
  ["Covering one’s ears to steal a bell", // 41
   "掩/耳/盗/铃",
   "小偷怕铃响，就捂住自己的耳朵去偷铃。现在说自己骗自己。",
   "A thief covered his own ears so that he would not hear the bell he was stealing. We say it of someone fooling only himself."],
  ["A thief wanted to steal a bell.", // 42
   "一个/小偷/想/偷/一个/铃铛/。",
   "他想把铃铛拿走。", "He wanted to take the bell."],
  ["The bell rang at a touch, and he was afraid someone would hear.", // 43
   "铃铛/一/碰/就/响/，/他/怕/别人/听见/。",
   "铃声会把人引来。", "The ringing would bring people."],
  ["So he covered his own ears and took it. The bell rang, and everyone heard.", // 44
   "他/捂住/自己/的/耳朵/去/偷/，/铃声/一/响/，/大家/都/听见/了/。",
   "他只是让自己听不见。", "He only stopped himself from hearing."],
  [{ref: 'PRO.15.3'}, // 45
   "耶和华/的/眼目/无处不在/；/恶人/善人/，/他/都/鉴察/。",
   "捂住耳朵也瞒不过人，更瞒不过神：神什么都看见。", "Covering your ears fools no one, least of all God: his eyes see everything.",
   'opposite'],

  // 9 · 一诺千金
  ["A promise worth a thousand pieces of gold", // 46
   "一/诺/千金",
   "答应的事一定做到，一句话比一千两金子还值钱。现在说说话算数。",
   "A promise kept is worth more than a thousand pieces of gold. We say it of someone whose word can be trusted."],
  ["Long ago there was a man named Ji Bu. Whatever he promised, he did.", // 47
   "从前/有/个/人/叫/季布/，/他/答应/的/事/，/一定/做到/。",
   "他说话算数。", "He kept his word."],
  ["People said, “A word from Ji Bu is better than a thousand pieces of gold.”", // 48
   "大家/都/说/：/“/得到/季布/的/一句话/，/比/得到/一千两/金子/还/好/。/”",
   "他的话比金子还可靠。", "His word was more reliable than gold."],
  [{ref: 'MAT.5.37'}, // 49
   "你们/的/话/，/是/，/就/说/是/；/不是/，/就/说/不是/；/若/再/多/说/，/就是/出于/那/恶者/（/或/作/就是/从/恶/里/出来/的/）/。/”",
   "是就说是，不是就说不是；说了，就要做到。", "Say yes when you mean yes and no when you mean no; and do what you said.",
   'similar'],

  // 10 · 盲人摸象
  ["Blind men feeling an elephant", // 50
   "盲人/摸/象",
   "几个盲人各摸到大象的一部分，就说大象像扇子、像柱子。现在说只知道一部分，就以为知道了全部。",
   "Blind men each touched one part of an elephant and said it was like a fan, like a pillar. We say it of someone who knows a part and thinks it is the whole."],
  ["Some blind men wanted to know what an elephant was like.", // 51
   "几个/盲人/想/知道/大象/是/什么样/的/。",
   "他们看不见，就用手摸。", "They couldn’t see, so they felt with their hands."],
  ["The one who felt the ear said “a fan”; the one who felt the leg said “a pillar”; the one who felt the tail said “a rope”.", // 52
   "摸到/耳朵/的/说/像/扇子/，/摸到/腿/的/说/像/柱子/，/摸到/尾巴/的/说/像/绳子/。",
   "每个人只摸到一部分。", "Each one touched only a part."],
  ["None of them would give in, and they began to argue.", // 53
   "他们/谁/也/不/服/谁/，/吵/了/起来/。",
   "大家都以为自己是对的。", "Everyone thought he was right."],
  [{ref: '1CO.13.12'}, // 54
   "我们/如今/仿佛/对着/镜子/观看/，/模糊不清/（/原文/作/如同/猜谜/）/；/到/那时/就要/面对面/了/。/我/如今/所/知道/的/有限/，/到/那时/就/全/知道/，/如同/主/知道/我/一样/。",
   "我们现在知道的，也只是一部分；到那时，才会全知道。", "What we know now is only a part; one day we will know fully.",
   'similar'],
];

// Unit n is units[n - 1]: its English ({en}) or the verse to fetch ({ref}).
export const units = lines.map(([english, zh, explainZh, explainEn, angle]) => ({
  ...(typeof english === 'string' ? {en: english} : english),
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
  ...(angle ? {angle} : {}),
}));
