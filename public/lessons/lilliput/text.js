// 格列佛的小人国 · Gulliver in Lilliput — retold for children from Jonathan
// Swift, Gulliver’s Travels, Part I (1726), public domain; Project Gutenberg
// eBook #829. Both the English and the Chinese are Lucas Academy’s own retelling
// in short sentences: Gulliver still tells the story himself. Left out for
// children: the long political satire, and how he put out the palace fire;
// the plan to blind him is only “a cruel punishment” here.
// 中文：Lucas Academy 改写。Words are pre-segmented; punctuation is its own token.
//
// The units are numbered; index.js reads them in 11 parts and marks the three
// a teacher reads with the class (课堂共读). The other parts are 选读.
//
// Each unit: [English, 中文, 用简单的话理解, In simple words]
const lines = [
  ["My name is Lemuel Gulliver, and I was a doctor on a ship.", // 1
   "我/叫/莱缪尔·格列佛/，/是/一艘/船/上/的/医生/。",
   "格列佛是船上的医生，这个故事是他自己讲的。", "Gulliver, a ship’s doctor, tells his own story."],
  ["In the year 1699, a terrible storm threw our ship onto a rock.", // 2
   "1699年/，/一场/可怕/的/风暴/把/我们/的/船/摔/到/了/礁石/上/。",
   "1699年，一场大风暴把船撞坏了。", "In 1699 a storm wrecked his ship."],
  ["I jumped into the sea and swam and swam, pushed along by the wind and the waves.", // 3
   "我/跳进/海/里/，/拼命/地/游/，/风/和/浪/推/着/我/往前/走/。",
   "船坏了，格列佛只能自己游水逃命。", "With the ship lost, Gulliver had to swim for his life."],
  ["At last my feet touched the bottom, and I walked out of the water onto a quiet shore.", // 4
   "终于/，/我/的/脚/踩/到/了/海底/。/我/走出/海水/，/来到/一片/安静/的/海滩/。",
   "他终于来到了一片陌生的海滩。", "At last he reached a strange, quiet beach."],
  ["I was so tired that I lay down on the short, soft grass and fell fast asleep.", // 5
   "我/累/极了/，/躺/在/又/短/又/软/的/草地/上/，/很快/就/睡着/了/。",
   "他太累了，倒在草地上就睡着了。", "He was so tired that he fell asleep on the grass."],
  ["When I woke up, the sun was shining, but I could not move at all.", // 6
   "我/醒来/的/时候/，/太阳/已经/出来/了/，/可是/我/一点/也/动不了/。",
   "醒来以后，他发现自己动不了。", "When he woke, he found he could not move."],
  ["My arms, my legs and even my long hair were tied to the ground with hundreds of thin strings.", // 7
   "我/的/手臂/、/双腿/，/连/长长的/头发/，/都/被/几百根/细绳/绑/在/了/地上/。",
   "有人趁他睡觉，用很多细绳把他绑住了。", "While he slept, someone tied him down with many thin strings."],
  ["Then I felt something walk up my leg and across my chest, almost to my chin.", // 8
   "接着/，/我/觉得/有/东西/顺着/我/的/腿/往上/走/，/走过/我/的/胸口/，/差点/走/到/我/的/下巴/。",
   "有个很轻的东西在他身上走。", "Something very light was walking on his body."],
  ["I looked down and saw a tiny man, not even six inches tall, with a bow and arrow in his hands!", // 9
   "我/往下/一看/，/是/一个/小人/，/还/不到/六/英寸/高/，/手/里/拿/着/弓/和/箭/！",
   "原来是一个只有铅笔那么高的小人，还拿着武器。", "It was a tiny man no taller than a pencil, and he was armed."],
  ["About forty more tiny people were climbing up behind him.", // 10
   "他/后面/还有/四十来个/小人/，/正/往/我/身上/爬/。",
   "还有很多小人也爬到了他身上。", "Many more tiny people climbed onto him."],
  ["I shouted so loudly that they all ran away, and some fell off me in fright.", // 11
   "我/大叫/一声/，/他们/吓得/四处/逃跑/，/有/几个/还/从/我/身上/摔/了/下去/。",
   "格列佛的声音太大，把小人们吓坏了。", "Gulliver’s voice was so loud that it frightened the tiny people."],
  ["When I pulled my left arm free, they shot a hundred arrows into my hand, and they stung like needles.", // 12
   "我/挣开/左手/，/他们/就/朝/我/的/手/射/了/一百支/箭/，/扎/得/像/针/一样/疼/。",
   "小人们用箭射他。箭虽然很小，扎在手上也很疼。", "The tiny people shot arrows at him; they were small, but they hurt."],
  ["So I lay still and showed them I was hungry, and they carried baskets of food up ladders to my mouth.", // 13
   "我/只好/躺/着/不动/，/比划/着/说/我/饿/了/。/他们/就/沿着/梯子/，/把/一篮篮/食物/送/到/我/嘴边/。",
   "格列佛不再挣扎，用手势告诉小人们他饿了。", "Gulliver stopped struggling and used signs to show he was hungry."],
  ["Their legs of lamb were smaller than a bird’s wing, so I ate two or three at a time.", // 14
   "他们/的/羊腿/比/小鸟/的/翅膀/还/小/，/我/一口/就/吃/两三只/。",
   "小人国的食物都很小，格列佛要吃很多才饱。", "Everything the tiny people ate was tiny, so Gulliver needed a lot."],
  ["I drank their biggest barrel of wine in one gulp, and they cheered and danced on my chest.", // 15
   "他们/最/大/的/一桶/酒/，/我/一口/就/喝光/了/。/小人们/高兴/得/在/我/胸口/上/欢呼/跳舞/。",
   "一桶酒对格列佛来说只是一口，小人们看了很高兴。", "A whole barrel was only one gulp for Gulliver, and the tiny people cheered."],
  ["But they had put sleeping medicine in the wine, and soon I was fast asleep again.", // 16
   "可是/他们/在/酒/里/放/了/安眠药/，/我/很快/又/睡着/了/。",
   "小人们偷偷在酒里放了药，让他睡着。", "The tiny people secretly put medicine in the wine to make him sleep."],
  ["While I slept, five hundred carpenters built a huge wooden cart on wheels.", // 17
   "我/睡着/的/时候/，/五百个/木匠/造/了/一辆/带/轮子/的/大/木车/。",
   "小人们趁他睡着，造了一辆很大的车来运他。", "While he slept, they built a huge cart to move him."],
  ["Fifteen hundred of the emperor’s biggest horses, each only about four inches tall, pulled me to their capital city.", // 18
   "皇帝/最/大/的/一千五百匹/马/——/每匹/只有/十/厘米/多/高/——/把/我/拉/到/了/他们/的/首都/。",
   "要很多很多匹小马一起拉，才拉得动格列佛。", "It took many tiny horses to pull Gulliver to the capital."],
  ["They locked my left leg with ninety-one tiny chains inside an old temple, the biggest building in the land, and that became my home.", // 19
   "他们/用/九十一条/小/铁链/锁住/我/的/左腿/，/把/我/关进/一座/古老/的/神庙/。/那/是/全国/最/大/的/房子/，/从此/成/了/我/的/家/。",
   "他被锁在一座大神庙里，那里成了他住的地方。", "He was chained in a big temple, which became his home."],
  ["The tiny people called me Quinbus Flestrin, which means “the Man-Mountain.”", // 20
   "小人们/叫/我/“/昆巴斯·弗莱斯特林/”/，/意思/是/“/人山/”/。",
   "小人们给格列佛起了个名字，叫“人山”。", "The tiny people named Gulliver “the Man-Mountain.”"],
  ["Before the emperor would set me free, two officers had to search my pockets and write down everything they found.", // 21
   "皇帝/说/，/要/放/我/自由/，/必须/先/让/两个/官员/搜/我/的/口袋/，/把/找到/的/东西/都/记/下来/。",
   "皇帝想先知道格列佛身上带着什么东西。", "The emperor wanted to know everything Gulliver carried."],
  ["In one pocket they found “a great piece of rough cloth, big enough to cover the floor of the emperor’s best room.” It was my handkerchief.", // 22
   "他们/在/一个/口袋/里/找到/“/一大块/粗布/，/大/得/可以/铺满/皇帝/最/好/的/大厅/”/。/那/是/我/的/手帕/。",
   "在小人眼里，一块手帕就像一大块地毯。", "To the tiny people, a handkerchief looked like a huge carpet."],
  ["They also found “a tool with twenty long poles, like the fence around the palace. We think the Man-Mountain combs his hair with it.”", // 23
   "他们/还/找到/“/一件/东西/，/上面/竖/着/二十根/长杆/，/像/王宫/外面/的/栅栏/。/我们/猜/，/人山/用/它/梳头/”/。",
   "小人们没见过这么大的梳子，觉得它像一排栅栏。", "A comb that big looked like a fence to them."],
  ["Then they found “a wonderful machine on a silver chain. It makes a noise all the time, like a water mill.”", // 24
   "接着/，/他们/找到/“/一个/挂/在/银/链子/上/的/奇妙/机器/，/它/一直/发出/声音/，/像/水车/在/转/”/。",
   "小人们没见过怀表，听见它滴答滴答响，觉得很奇怪。", "They had never seen a watch, and its ticking puzzled them."],
  ["“We think it is either a strange animal or the god he worships, because he says he hardly does anything without looking at it.”", // 25
   "“/我们/猜/它/不是/一种/奇怪/的/动物/，/就是/他/拜/的/神/，/因为/他/说/，/他/做/什么/事/几乎/都/要/先/看看/它/。/”",
   "格列佛常常看表，小人们就猜表是他拜的神。", "Gulliver looked at his watch so often that they guessed it was his god."],
  ["Of course, it was only my watch!", // 26
   "当然/，/那/只是/我/的/怀表/！",
   "小人们写下的“怪东西”，其实都是平常的东西。", "The “strange things” they listed were ordinary things."],
  ["Little by little I learned their language, and children even played hide-and-seek in my hair.", // 27
   "我/一点一点/学会/了/他们/的/话/，/孩子们/甚至/在/我/的/头发/里/玩/捉迷藏/。",
   "格列佛慢慢学会了小人国的话，和小人们熟悉起来。", "Gulliver slowly learned their language and got to know them."],
  ["At last the emperor agreed to set me free, but first I had to make some promises.", // 28
   "后来/，/皇帝/终于/答应/放/我/自由/，/不过/我/要/先/做/几个/保证/。",
   "要得到自由，格列佛先要答应几件事。", "To be free, Gulliver first had to make some promises."],
  ["I promised to walk only on the big roads, never to step on anyone, and to help them against their enemies on the island of Blefuscu.", // 29
   "我/保证/只/走/大路/，/绝不/踩/到/人/，/还要/帮/他们/对付/布莱夫斯库/岛/上/的/敌人/。",
   "他答应走路小心、不伤害人，还要帮小人国对付敌人。", "He promised to walk carefully, hurt no one, and help against their enemies."],
  ["In return, they gave me as much food every day as 1,728 of their people would eat.", // 30
   "作为/回报/，/他们/每天/给/我/的/食物/，/够/他们/1728/个/人/吃/。",
   "格列佛很大，一天吃的东西够很多小人吃。", "Gulliver was so big that he ate as much as a crowd of tiny people."],
  ["Their mathematicians had worked out that I was twelve times as tall as they were, so my body was as big as 1,728 of theirs.", // 31
   "他们/的/数学家/算出/，/我/的/身高/是/他们/的/十二倍/，/所以/我/的/身体/有/他们/1728/个/人/那么/大/。",
   "格列佛比小人高十二倍，也宽十二倍、厚十二倍：12×12×12=1728。", "He was twelve times taller, wider and thicker: 12 × 12 × 12 = 1,728."],
  ["One day my friend at the palace told me why Lilliput and Blefuscu were at war.", // 32
   "有一天/，/我/在/王宫/里/的/朋友/告诉/我/，/小人国/为什么/和/布莱夫斯库/打仗/。",
   "格列佛听说了小人国为什么要打仗。", "Gulliver learns why the two countries are at war."],
  ["Long ago, everyone broke their boiled eggs at the big end before eating them.", // 33
   "很久/以前/，/大家/吃/煮/鸡蛋/，/都/从/大/的/那/一头/敲开/。",
   "以前，大家都从大头敲开鸡蛋。", "Long ago, everyone opened eggs at the big end."],
  ["But when the emperor’s grandfather was a boy, he cut his finger breaking an egg that way.", // 34
   "可是/，/现在/这位/皇帝/的/爷爷/小时候/，/这样/敲/鸡蛋/时/划破/了/手指/。",
   "皇帝的爷爷小时候敲鸡蛋，弄伤了手指。", "The emperor’s grandfather hurt his finger opening an egg."],
  ["So his father made a law: everyone must break their eggs at the small end.", // 35
   "于是/他/的/父亲/下/了/一道/命令/：/所有/人/都/必须/从/小/的/那/一头/敲/鸡蛋/。",
   "于是国王规定，大家只能从小头敲鸡蛋。", "So the king made a rule: open eggs only at the small end."],
  ["Many people were so angry that they fought against the law, and some ran away to Blefuscu.", // 36
   "很多/人/为/这件/事/非常/生气/，/起来/反抗/，/还有/人/逃/到/了/布莱夫斯库/。",
   "很多人不愿意，有人反抗，有人逃走。", "Many people disliked the rule; some fought it, and some ran away."],
  ["Ever since, the Big-Endians and the Little-Endians have been fighting, and thousands of people have lost their lives.", // 37
   "从/那/以后/，/“/大端派/”/和/“/小端派/”/一直/打来打去/，/已经/有/好几千/人/为此/丢/了/性命/。",
   "为了从哪头敲鸡蛋，两派人打了很多年的仗。", "For years, two groups fought over which end of an egg to break."],
  ["Their old book of rules only says, “Break your eggs at the convenient end.” Which end is convenient, I think, each person can decide.", // 38
   "他们/的/古书/上/只/写/着/：/“/从/方便/的/那/一头/敲开/鸡蛋/。/”/哪/一头/才/方便/，/我/想/，/应该/让/每个/人/自己/决定/。",
   "古书上的话其实很简单：从方便的那头敲就行。", "The old book simply says to use the convenient end."],
  ["Now Blefuscu had fifty warships ready to attack Lilliput.", // 39
   "这时/，/布莱夫斯库/准备/好/了/五十艘/战舰/，/要/来/攻打/小人国/。",
   "敌国准备了五十艘战舰，要来打小人国。", "The enemy got fifty warships ready to attack."],
  ["I asked for their strongest rope and iron bars, and I made fifty hooks.", // 40
   "我/要来/他们/最/结实/的/绳子/和/铁条/，/做/了/五十个/铁钩/。",
   "格列佛做了很多铁钩，准备去拉敌人的船。", "Gulliver made iron hooks to pull away the enemy ships."],
  ["Then I waded across the sea to Blefuscu. The water was not very deep, and I only had to swim a little in the middle.", // 41
   "然后/我/走进/海/里/，/朝/布莱夫斯库/走去/。/海水/不太/深/，/只有/中间/一小段/要/游/过去/。",
   "对格列佛来说，大海很浅，他差不多可以走过去。", "For Gulliver, the sea was shallow enough to wade across."],
  ["When the enemy saw me coming, thirty thousand sailors were so scared that they jumped out of their ships and swam to shore.", // 42
   "敌人/看见/我/走过来/，/三万个/水兵/吓得/跳下/船/，/游回/了/岸上/。",
   "敌人被巨大的格列佛吓跑了。", "The enemy sailors were terrified of the giant Gulliver."],
  ["I fixed a hook to the front of every ship and tied all the ropes together.", // 43
   "我/在/每艘/船头/挂上/一个/铁钩/，/再/把/所有/的/绳子/绑/在/一起/。",
   "他用铁钩钩住每一艘船，再把绳子连起来。", "He hooked every ship and tied the ropes together."],
  ["Thousands of arrows flew at me, so I put on my glasses to protect my eyes and kept working.", // 44
   "成千上万/支/箭/朝/我/飞来/，/我/戴上/眼镜/保护/眼睛/，/继续/干活/。",
   "眼镜帮他挡住了射向眼睛的箭。", "His glasses protected his eyes from the arrows."],
  ["Then I cut the anchor ropes with my knife and pulled all fifty warships home behind me.", // 45
   "接着/，/我/用/小刀/割断/锚绳/，/拖/着/五十艘/战舰/回到/了/小人国/。",
   "格列佛一个人就把敌人的战舰全拉走了。", "Gulliver pulled away the whole enemy fleet by himself."],
  ["The emperor was so happy that he gave me the highest title in the land.", // 46
   "皇帝/高兴/极了/，/给/了/我/全国/最/高/的/爵位/。",
   "皇帝很高兴，给了格列佛最高的荣誉。", "The emperor rewarded Gulliver with the highest honour."],
  ["But then he wanted me to bring back all their other ships too, so that Blefuscu would belong to him.", // 47
   "可是/他/又/要/我/把/布莱夫斯库/剩下/的/船/也/都/拖/回来/，/让/那个/国家/归/他/管/。",
   "皇帝变贪心了，还想占领别的国家。", "The emperor got greedy and wanted to rule the other country too."],
  ["I said no: “I will never help to make a free and brave people into slaves.”", // 48
   "我/拒绝/了/：/“/我/绝不/帮/着/让/一个/自由/勇敢/的/民族/变成/奴隶/。/”",
   "格列佛不愿意帮皇帝去欺负别的国家。", "Gulliver would not help make another people into slaves."],
  ["The emperor never forgave me, and some of his ministers became my enemies.", // 49
   "皇帝/从此/记恨/我/，/他/的/几个/大臣/也/成/了/我/的/敌人/。",
   "因为格列佛说了“不”，皇帝和一些大臣就恨上了他。", "Because Gulliver said no, the emperor and some ministers turned against him."],
  ["Soon Blefuscu sent people to make peace, and they invited me to visit their island.", // 50
   "不久/，/布莱夫斯库/派/人/来/讲和/，/还/邀请/我/去/他们/的/岛/上/做客/。",
   "两国讲和了，布莱夫斯库还请格列佛去做客。", "The two countries made peace, and Blefuscu invited Gulliver."],
  ["My enemies told the emperor that I was too friendly with Blefuscu, and that my food cost far too much.", // 51
   "我/的/敌人/对/皇帝/说/，/我/和/布莱夫斯库/太/友好/了/，/而且/我/吃/的/东西/太/花钱/。",
   "格列佛的敌人在皇帝面前说他的坏话。", "Gulliver’s enemies spoke against him to the emperor."],
  ["One night a friend from the palace came secretly to my house in a closed little carriage.", // 52
   "一天/夜里/，/王宫/里/的/一位/朋友/坐/着/一辆/遮/得/严严实实/的/小/马车/，/偷偷/来到/我/家/。",
   "一位朋友冒着危险，半夜来给格列佛报信。", "A friend risked danger to warn Gulliver at night."],
  ["He told me that my enemies had called me a traitor in front of the emperor.", // 53
   "他/告诉/我/，/我/的/敌人/在/皇帝/面前/告/我/是/叛徒/。",
   "敌人冤枉格列佛，说他背叛了国家。", "His enemies falsely called him a traitor."],
  ["They had planned a cruel punishment for me, and it would happen in three days.", // 54
   "他们/想出/了/一个/残酷/的/办法/惩罚/我/，/三天/以后/就要/动手/。",
   "他们要狠狠地惩罚格列佛，时间很紧。", "They planned a cruel punishment, and time was short."],
  ["“Find a way to save yourself,” he said, and he slipped away into the dark.", // 55
   "“/快/想/办法/救救/自己/吧/。/”/他/说完/，/就/悄悄/消失/在/夜色/里/。",
   "朋友提醒他快逃，说完就走了。", "The friend told him to save himself, then slipped away."],
  ["I decided to leave Lilliput at once and go to Blefuscu, where I had been invited.", // 56
   "我/决定/马上/离开/小人国/，/到/邀请/过/我/的/布莱夫斯库/去/。",
   "格列佛决定去友好的布莱夫斯库。", "Gulliver decided to go to friendly Blefuscu."],
  ["I put my clothes in a big warship and pulled it behind me as I waded and swam across.", // 57
   "我/把/衣服/放进/一艘/大/战舰/，/拉/着/它/，/一路/走/一路/游/到/了/对岸/。",
   "他拉着一艘战舰过了海，战舰里装着他的衣服。", "He crossed the sea, pulling a warship with his clothes in it."],
  ["The emperor of Blefuscu and his family came out to meet me and treated me kindly.", // 58
   "布莱夫斯库/的/皇帝/和/他/的/家人/出来/迎接/我/，/对/我/很/友好/。",
   "布莱夫斯库的皇帝热情地欢迎他。", "The emperor of Blefuscu welcomed him warmly."],
  ["A few days later, I saw something floating far out at sea. It looked like an upside-down boat.", // 59
   "几天/以后/，/我/看见/远处/的/海/上/漂/着/一件/东西/，/像/一条/翻过来/的/小船/。",
   "他在海上看见一个像小船的东西。", "He spotted something like a boat far out at sea."],
  ["It was a real boat, just the right size for me! A storm had probably washed it away from some ship.", // 60
   "那/是/一条/真正/的/船/，/大小/正/合/我/用/！/大概/是/哪艘/大船/在/风暴/里/弄丢/的/。",
   "那是一条正常大小的船，正好能载格列佛回家。", "It was a full-size boat that could carry Gulliver home."],
  ["With the help of twenty ships and three thousand sailors, I brought it to shore.", // 61
   "在/二十艘/船/和/三千个/水手/的/帮助/下/，/我/把/它/拖/到/了/岸边/。",
   "很多小人一起帮忙，才把船拖上岸。", "Many tiny people helped him bring the boat ashore."],
  ["The emperor of Lilliput demanded that I be sent back with my hands and feet tied.", // 62
   "小人国/的/皇帝/要求/把/我/绑起/手脚/送回去/。",
   "小人国的皇帝还想把格列佛抓回去受罚。", "The emperor of Lilliput still wanted Gulliver brought back for punishment."],
  ["But the emperor of Blefuscu politely said no, and he helped me get my boat ready.", // 63
   "可是/布莱夫斯库/的/皇帝/客气/地/拒绝/了/，/还/帮/我/把/船/准备/好/。",
   "布莱夫斯库的皇帝保护了格列佛。", "The emperor of Blefuscu protected Gulliver."],
  ["I took food, water, six tiny cows, two tiny bulls and some tiny sheep with me.", // 64
   "我/带上/食物/和/水/，/还有/六头/小/母牛/、/两头/小/公牛/和/几只/小/绵羊/。",
   "他带上小小的牛和羊，准备回家给大家看。", "He took tiny cows and sheep to show people at home."],
  ["After two days at sea, an English ship saw me and took me on board.", // 65
   "在/海/上/漂/了/两天/，/一艘/英国/船/看见/了/我/，/把/我/救/了/上去/。",
   "格列佛在海上被一艘英国船救了。", "An English ship rescued Gulliver at sea."],
  ["When I told the captain where I had been, he thought I was dreaming, until I took the tiny cows out of my pocket.", // 66
   "我/告诉/船长/我/去/过/哪里/，/他/以为/我/在/说梦话/——/直到/我/从/口袋/里/掏出/那些/小牛/。",
   "船长本来不信，看见小牛才相信了。", "The captain didn’t believe him until he saw the tiny cows."],
  ["At last I came home to my family in England. But I did not stay home for long.", // 67
   "我/终于/回到/了/英国/的/家/。/可是/，/我/没/在/家/待/多久/。",
   "格列佛回家了，可是很快又要出发去冒险。", "Gulliver got home, but soon he would set off on another adventure."],
];

// Unit n is units[n - 1].
export const units = lines.map(([en, zh, explainZh, explainEn]) => ({
  en,
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
}));
