// 镜花缘 · 君子国和小人国 · The Land of Gentlemen — retold for children from
// 李汝珍《镜花缘》 (Qing dynasty), chapters 8, 10–12 and 19, public domain,
// checked against Wikisource. Both the Chinese and the English are Lucas
// Academy’s own retelling in short sentences, told in the third person as the
// novel is. Left out for children: the two ministers’ long talk on customs
// (one example is kept), the seller’s joke about repaying debts as a donkey in
// the next life, and his remark that the beggar was a cheat in a past life.
// Added: the little man’s “Is it sweet?” “Terribly bitter!” (unit 60) acts out
// what Duo Jiugong says about the Little People, and unit 61 spells out the
// novel’s pun on 小人 (little people / small-minded people).
// 中文：Lucas Academy 改写。Words are pre-segmented; punctuation is its own token.
//
// The units are numbered; index.js reads them in 11 parts and marks the three
// a teacher reads with the class (课堂共读). The other parts are 选读.
//
// Each unit: [English, 中文, 用简单的话理解, In simple words]
const lines = [
  ["Long ago in China, there lived a scholar named Tang Ao.", // 1
   "很久/以前/，/中国/有/一个/读书人/，/名叫/唐敖/。",
   "唐敖是一个读书人，故事从他讲起。", "Tang Ao is a scholar, and the story begins with him."],
  ["He was unhappy, and he wanted to sail across the sea to see faraway islands and strange countries.", // 2
   "他/心里/很/闷/，/想/坐/船/出海/，/去/看看/海外/的/山水/和/奇怪/的/国家/。",
   "唐敖心情不好，想出门看看外面的世界。", "Tang Ao feels low and wants to see the world."],
  ["Just then, his wife’s brother, Lin Zhiyang, was setting off overseas on a big ship to buy and sell goods.", // 3
   "正好/，/他/妻子/的/哥哥/林之洋/要/坐/大船/去/海外/做/买卖/。",
   "林之洋是商人，要坐船去别的国家卖东西。", "Lin Zhiyang is a merchant who sails to other countries to trade."],
  ["Tang Ao begged Lin Zhiyang to take him along, and Lin Zhiyang agreed.", // 4
   "唐敖/求/林之洋/带上/他/，/林之洋/答应/了/。",
   "唐敖跟着林之洋的船一起出海。", "Tang Ao joins Lin Zhiyang’s voyage."],
  ["The ship’s old helmsman was called Duo Jiugong. He had studied books when he was young, and later he spent most of his life sailing ships.", // 5
   "船/上/有/一位/老/舵工/，/名叫/多九公/。/他/年轻/时/也/读/过/书/，/后来/大半辈子/都/在/海/上/开船/。",
   "多九公是船上掌舵的老人，年轻时也是读书人。", "Duo Jiugong is the old helmsman, who studied in his youth."],
  ["He knew everything about the lands across the sea, so the sailors teased him with a nickname that meant the opposite: “Duo Knows-Nothing.”", // 6
   "海外/的/事/，/他/什么/都/知道/。/水手们/跟/他/开玩笑/，/反着/给/他/起/了/个/外号/，/叫/“/多不识/”/。",
   "多九公知道很多事，水手们开玩笑，偏叫他“多不识”。", "He knows so much that the sailors jokingly call him “Knows-Nothing.”"],
  ["They raised the sails and set off with the wind behind them.", // 7
   "大家/扬起/帆/，/顺着/风/出发/了/。",
   "他们的船出发了。", "Their ship sets off."],
  ["Before long, the ship came to the Land of Gentlemen.", // 8
   "不久/，/船/到/了/君子国/。",
   "他们来到了君子国。", "They arrive at the Land of Gentlemen."],
  ["Tang Ao had heard that the people there loved to let others go first and never fought over anything.", // 9
   "唐敖/早就/听说/，/这里/的/人/喜欢/让/着/别人/，/从来/不/争抢/。",
   "唐敖听说，君子国的人很谦让。", "Tang Ao has heard the people there always give way."],
  ["Lin Zhiyang went ashore to sell his goods, and Tang Ao asked Duo Jiugong to visit the city with him.", // 10
   "林之洋/上岸/去/卖货/，/唐敖/就/约/多九公/一起/进城/看看/。",
   "林之洋去卖货，唐敖和多九公去城里看看。", "Lin goes to sell goods; Tang Ao and Duo go to see the city."],
  ["Over the city gate were four large characters: “Goodness is the only treasure.”", // 11
   "城门/上/写/着/四个/大字/：/“/惟善为宝/”/——/只有/善良/，/才/是/真正/的/宝贝/。",
   "城门上的话是说：善良比金银财宝更宝贵。", "The words on the gate say goodness is worth more than riches."],
  ["Inside, the city was busy, full of people buying and selling.", // 12
   "城/里/很/热闹/，/买/东西/的/、/卖/东西/的/，/来来往往/。",
   "城里人很多，买卖很热闹。", "The city is crowded and full of trade."],
  ["Along the way they saw farmers leaving the edges of their fields to their neighbours, and people on the road stepping aside for one another.", // 13
   "一路/上/，/他们/看见/种田/的/人/把/田边/让给/邻居/，/走路/的/人/互相/让路/。",
   "君子国的人做事，都先想着别人。", "People in the Land of Gentlemen think of others first."],
  ["Rich or poor, everyone spoke and behaved politely.", // 14
   "不管/有钱/没钱/，/人人/说话/做事/都/很/有/礼貌/。",
   "在君子国，不管穷人富人都有礼貌。", "Rich and poor alike are polite there."],
  ["Tang Ao asked an old man, “Why do you all love to give way to others so much?” But the old man did not understand the question.", // 15
   "唐敖/问/一位/老人/：/“/你们/为什么/这么/爱/让/着/别人/？/”/老人/却/听不懂/他/在/问/什么/。",
   "唐敖想知道他们为什么这样，老人却听不懂这个问题。", "Tang Ao asks why they act this way, but the old man doesn’t understand."],
  ["Duo Jiugong said, “Their neighbours gave them the name ‘Land of Gentlemen.’ They don’t think they are anything special.”", // 16
   "多九公/说/：/“/‘/君子国/’/这个/名字/，/是/邻国/替/他们/起/的/。/他们/自己/并不/觉得/有/什么/特别/。/”",
   "他们觉得让着别人是平常的事，没什么特别。", "To them, giving way is ordinary, not special."],
  ["In the market, they saw a man buying something.", // 17
   "在/集市/上/，/他们/看见/一个/人/正在/买/东西/。",
   "唐敖和多九公在集市上看人买东西。", "Tang Ao and Duo watch people shopping in the market."],
  ["Holding up the goods, he said, “Such fine goods at such a low price! How can I feel right about it? Please charge me more!”", // 18
   "他/拿/着/货物/说/：/“/这么/好/的/东西/，/价钱/却/这么/便宜/，/我/怎么/能/安心/呢/？/请/您/加/点/价/吧/！/”",
   "买东西的人嫌价钱太便宜，要多给钱。", "The buyer thinks the price is too low and wants to pay more."],
  ["Tang Ao whispered, “Usually the seller asks for a high price and the buyer offers a low one. Why is it the other way round here?”", // 19
   "唐敖/小声/说/：/“/买/东西/，/一般/是/卖/的/人/要/高价/，/买/的/人/要/低价/。/这里/怎么/反过来/了/？/”",
   "平常是卖的人想多要钱，这里却是买的人想多给钱。", "Usually sellers want more money; here the buyer wants to give more."],
  ["The seller said, “My price was already too high, and I feel bad about it. If you want to pay even more, please go and buy somewhere else!”", // 20
   "卖/东西/的/人/说/：/“/我/要/的/价/已经/太/高/了/，/正/不好意思/呢/。/您/还要/加价/，/那/就/请/到/别家/去/买/吧/！/”",
   "卖东西的人觉得自己要价太高了，不肯再多收。", "The seller thinks his price is already too high."],
  ["The two of them argued for a long time, but what they argued about was who should get the worse deal.", // 21
   "两个/人/争/了/半天/，/争/的/却/是/谁/多/吃/一点/亏/。",
   "两个人都想让对方得好处，自己吃亏。", "Each wants the other to have the better deal."],
  ["At last the buyer paid the full price, took only half the goods, and started to walk away. The seller hurried to stop him. “Too much money and too few goods! That won’t do!”", // 22
   "最后/，/买/的/人/照/原价/付/了/钱/，/却/只/拿/了/一半/的/货/就/走/。/卖/东西/的/人/赶紧/拦住/他/：/“/钱/多/货/少/，/这/可/不行/！/”",
   "买的人想多给钱、少拿货，卖的人不答应。", "The buyer tries to pay more and take less, and the seller won’t allow it."],
  ["Two old men passing by settled it: he would pay the full price and take eight-tenths of the goods. Only then did the two part happily.", // 23
   "两位/过路/的/老人/来/评理/：/钱/照/原价/付/，/货/拿走/八成/。/两个/人/这才/高高兴兴/地/分手/。",
   "旁边的人帮他们想了个公平的办法。", "Passers-by help them find a fair answer."],
  ["A few steps further on, they saw a young soldier buying something.", // 24
   "没/走/几步/，/他们/又/看见/一个/小兵/在/买/东西/。",
   "他们又看见一个小兵在买东西。", "They see a young soldier buying something."],
  ["The seller said, “My goods are not fresh, and they’re very ordinary. You’ve given me far too much. Half would be enough.”", // 25
   "卖/东西/的/人/说/：/“/我/的/货/不/新鲜/，/也/很/普通/。/您/给/的/钱/太/多/了/，/一半/就/够/了/。/”",
   "这个卖东西的人说自己的货不好，只肯收一半的钱。", "This seller says his goods are poor and asks for only half."],
  ["The soldier said, “I can tell good goods when I see them. Paying half for good goods would be cheating you!”", // 26
   "小兵/说/：/“/东西/好不好/，/我/看得出来/。/好/东西/只/给/一半/的/钱/，/那/不是/欺负/人/吗/？/”",
   "小兵觉得货很好，少给钱就是欺负人。", "The soldier thinks the goods are good, and paying less would be unfair."],
  ["But the seller would not take a penny more. So the soldier paid half and picked out some of the poorer goods.", // 27
   "可是/卖/东西/的/人/怎么/也/不肯/多/收/。/小兵/只好/付/了/一半/的/钱/，/挑/了/些/差/一点/的/货/。",
   "小兵只好少付钱，就故意挑差一点的货。", "So the soldier pays less and picks the poorer goods on purpose."],
  ["The seller stopped him again. “Why are you choosing only the poor ones? Are you leaving the good ones for me?”", // 28
   "卖/东西/的/人/又/拦住/他/：/“/您/怎么/专/挑/差/的/？/难道/把/好/的/留给/我/自己/用/吗/？/”",
   "卖的人不愿意小兵吃亏，又拦住了他。", "The seller won’t let the soldier lose out."],
  ["The people passing by all said the soldier was being unfair. In the end, he took half good goods and half poor ones.", // 29
   "过路/的/人/都/说/小兵/不公平/。/最后/，/小兵/只好/把/好货/和/差货/各/拿/一半/。",
   "最后，好的和差的各拿一半，大家才满意。", "In the end he takes half good, half poor, and everyone is satisfied."],
  ["Next they saw a farmer who had finished buying. He paid in silver, picked up his goods and turned to go.", // 30
   "接着/，/他们/看见/一个/农民/买/好/了/东西/，/付/了/银子/，/提/着/货/要/走/。",
   "一个农民买完东西，要走了。", "A farmer finishes buying and is about to leave."],
  ["The seller weighed the silver and hurried after him. “Please wait! You’ve given me too much silver.”", // 31
   "卖/东西/的/人/称了称/银子/，/连忙/追/上去/：/“/请/等一等/！/您/的/银子/给/多/了/。/”",
   "卖东西的人发现银子给多了，赶紧追上去。", "The seller finds he was paid too much and runs after him."],
  ["The farmer said, “A little extra doesn’t matter. Next time I come to buy something, you can take it off then.”", // 32
   "农民/说/：/“/多/一点/没关系/。/下次/我/再/来/买/东西/，/再/扣掉/就是了/。/”",
   "农民说，下次买东西时再扣掉多给的钱。", "The farmer says to take it off next time."],
  ["The seller said, “Oh no, I can’t do that! Last year a man said the same thing, and he never came back. I’ve looked for him everywhere, and I still can’t give his money back. If I owe you as well, what will I do?”", // 33
   "卖/东西/的/人/说/：/“/那/可/不行/！/去年/有/个/人/也/这么/说/，/可/他/再也/没/来/过/。/我/到处/找/他/，/到/现在/也/没法/把/钱/退给/他/。/要是/再/欠/您/一份/，/那/可/怎么办/！/”",
   "卖东西的人怕欠别人的钱，心里很不安。", "The seller hates owing anyone money."],
  ["They went back and forth, until at last the farmer took two more things to make up for the extra silver.", // 34
   "两个/人/推来推去/，/最后/农民/只好/多/拿/了/两样/货/，/抵/那些/多出来/的/银子/。",
   "最后农民多拿了两样东西，就算扯平了。", "The farmer takes two more things to make it even."],
  ["Even after the farmer had gone, the seller still felt he had too much. When a beggar came by, he weighed out the extra silver and gave it all to him.", // 35
   "农民/走远/了/，/卖/东西/的/人/还是/觉得/银子/多/了/。/这时/一个/乞丐/走过来/，/他/就/把/多出来/的/银子/称/出来/，/全都/给/了/乞丐/。",
   "卖东西的人还是觉得多了，就把多出来的银子送给了乞丐。", "The seller still feels he has too much, so he gives the extra to a beggar."],
  ["Tang Ao smiled. “We don’t need to ask why this is called the Land of Gentlemen. These deals are the answer.”", // 36
   "唐敖/笑/着/说/：/“/为什么/叫/君子国/？/不用/再/问/了/，/这/几笔/买卖/就是/回答/。/”",
   "看了这几笔买卖，唐敖明白了为什么叫君子国。", "These deals show Tang Ao why it is called the Land of Gentlemen."],
  ["As they walked on, they met two old men with snow-white hair and rosy cheeks. They looked very wise.", // 37
   "他们/正/走/着/，/遇见/两位/老人/，/头发/雪白/，/脸色/红润/，/一看/就/很/有/学问/。",
   "他们遇见两位看起来很有学问的老人。", "They meet two wise-looking old men."],
  ["They were brothers, named Wu Zhihe and Wu Zhixiang.", // 38
   "他们/是/一对/兄弟/，/一个/叫/吴之和/，/一个/叫/吴之祥/。",
   "两位老人是亲兄弟。", "The two old men are brothers."],
  ["The two old men invited Tang Ao and Duo Jiugong home for tea.", // 39
   "两位/老人/请/唐敖/和/多九公/到/家/里/喝茶/。",
   "两位老人很热情，请客人去家里坐坐。", "The old men kindly invite the visitors home."],
  ["Their home was simple: a fence, a little wooden gate, a lotus pond in front, and green bamboo all around.", // 40
   "他们/的/家/很/朴素/：/篱笆墙/，/小/木门/，/门前/一个/荷花池/，/屋子/四周/都/是/绿竹/。",
   "两位老人的家很简单，却很美。", "Their home is simple but beautiful."],
  ["In the hall hung a sign written by the king himself. Duo Jiugong wondered, “They are only ordinary scholars. Why would the king write a sign for them?”", // 41
   "厅/里/挂/着/一块/国王/题字/的/匾/。/多九公/心想/：/“/他们/只是/普通/的/读书人/，/国王/为什么/给/他们/题字/呢/？/”",
   "多九公觉得奇怪：国王为什么给普通人题字？", "Duo wonders why the king would write a sign for ordinary men."],
  ["The old men asked about many customs in Tang Ao’s homeland, such as people wasting money just to show off. Every word they said made sense, and Tang Ao and Duo Jiugong kept nodding.", // 42
   "两位/老人/问起/唐敖/家乡/的/许多/风俗/，/比如/有人/为了/面子/乱/花钱/。/他们/说/得/句句/在理/，/唐敖/和/多九公/听/得/连连/点头/。",
   "两位老人说的道理很对，唐敖和多九公都很佩服。", "The old men’s ideas are wise, and the visitors admire them."],
  ["Just as the talk was going well, an old servant rushed in. “Prime Ministers! The king will be here any moment. He has important business to discuss with you!”", // 43
   "正/说/得/高兴/，/一个/老/仆人/慌慌张张/地/跑进来/：/“/两位/宰相/大人/，/国王/马上/就/到/，/有/大事/要/和/你们/商量/！/”",
   "仆人说国王要来了，有大事要商量。", "A servant says the king is coming on important business."],
  ["Duo Jiugong laughed to himself. “We have the same trick back home. When a guest stays too long, the host has a servant say that an important visitor is coming, so the guest will leave.”", // 44
   "多九公/心里/暗笑/：/“/我们/家乡/也/有/这/一招/：/客人/坐/得/太/久/，/主人/就/让/仆人/说/有/大官/要/来/，/好/让/客人/快/走/。/”",
   "多九公以为，主人在用老办法赶客人走。", "Duo thinks the hosts are using an old trick to make guests leave."],
  ["“I didn’t expect the same trick here — and they even use ‘prime minister’ to scare us away!”", // 45
   "“/没想到/这里/也/一样/，/还/拿/宰相/来/吓人/！/”",
   "多九公觉得“宰相”这话是在吓唬他们。", "Duo thinks the word “prime minister” is meant to scare them."],
  ["They quickly said goodbye. Outside, the street had been swept clean, and everyone had stepped far back out of the way.", // 46
   "他们/赶紧/告别/。/走出/大门/一看/，/街道/扫/得/干干净净/，/路/上/的/人/都/远远/地/让开/了/。",
   "街道扫干净了，大家都让开了：真的有大人物要来。", "The swept street and the crowd stepping aside show the king really is coming."],
  ["It was true! The two plain old men were the prime ministers of the Land of Gentlemen.", // 47
   "原来/是/真/的/！/这/两位/朴素/的/老人/，/就是/君子国/的/宰相/。",
   "原来，两位朴素的老人是国家最大的官。", "The two plain old men are the highest officials in the land."],
  ["Duo Jiugong said, “Such high officials, and still so humble and kind! Proud officials who saw them ought to blush.”", // 48
   "多九公/说/：/“/当/了/这么/大/的/官/，/还/这样/谦虚/和气/。/那些/爱/摆架子/的/官员/看见/了/，/真/该/脸红/！/”",
   "官很大，人却很谦虚，多九公很佩服。", "They are great officials, yet humble, and Duo admires them."],
  ["Back at the ship, the prime ministers sent cakes and fruit, and they gave the sailors ten loads of pumpkins and ten loads of bird’s nest.", // 49
   "回到/船/上/，/宰相/派/人/送来/点心/和/水果/，/还/送给/水手们/十担/南瓜/、/十担/燕窝/。",
   "宰相送来很多吃的，还送给水手们南瓜和燕窝。", "The ministers send food, including pumpkins and bird’s nest for the sailors."],
  ["That evening, the sailors cooked a big pot of pumpkin and bird’s-nest soup.", // 50
   "晚上/，/水手们/煮/了/一大锅/南瓜/燕窝汤/。",
   "水手们把南瓜和燕窝一起煮了。", "The sailors cook the pumpkins and bird’s nest together."],
  ["They had heard that bird’s nest was very expensive, but when they tasted it, they all frowned. “It has no taste! It’s only noodles! We’ve been tricked!”", // 51
   "他们/早就/听说/燕窝/很/贵/，/可是/一尝/，/都/皱起/了/眉头/：/“/怎么/没/味道/？/这/明明/是/粉条/嘛/！/我们/被/骗/了/！/”",
   "水手们没吃过燕窝，以为它是不值钱的粉条。", "The sailors had never had bird’s nest and thought it was cheap noodles."],
  ["They ate every bit of the pumpkin but left a big pile of bird’s nest.", // 52
   "南瓜/被/吃/得/干干净净/，/燕窝/却/剩下/一大堆/。",
   "水手们爱吃南瓜，不要燕窝。", "The sailors eat the pumpkin and leave the bird’s nest."],
  ["When Lin Zhiyang heard about it, he was secretly delighted. He bought all the bird’s nest from them at the price of noodles.", // 53
   "林之洋/听说/了/，/心里/偷偷/高兴/，/按/粉条/的/价钱/把/燕窝/全/买/了/下来/。",
   "林之洋知道燕窝很值钱，就便宜地买了下来。", "Lin knows bird’s nest is valuable, so he buys it cheaply."],
  ["He said, “No wonder the magpies kept singing at me these past few days. I’m going to be rich!”", // 54
   "他/说/：/“/怪不得/这/几天/喜鹊/总/对着/我/叫/，/原来/我/要/发财/了/！/”",
   "林之洋觉得自己发了一笔财，很得意。", "Lin is pleased with his lucky bargain."],
  ["One day, the ship came to Jingren, the Land of Little People.", // 55
   "这/一天/，/船/到/了/靖人国/，/也就是/小人国/。",
   "他们来到了小人国。", "They arrive at the Land of Little People."],
  ["Duo Jiugong said, “The people here are cold-hearted, and they always say the opposite of what they mean. If something is sweet, they say it’s bitter. If it’s salty, they say it has no taste. You can never tell what they really mean.”", // 56
   "多九公/说/：/“/这里/的/人/心肠/冷/，/说话/总是/反着/说/。/明明/是/甜/的/，/他/偏/说/苦/；/明明/是/咸/的/，/他/偏/说/淡/。/叫/你/怎么/猜/也/猜不透/。/”",
   "小人国的人说的话，和心里想的正好相反。", "In the Land of Little People, people say the opposite of what they mean."],
  ["The city gate was so low that they had to bend down to go through, and the streets were so narrow that two people could not walk side by side.", // 57
   "城门/很/矮/，/他们/弯/着/腰/才/进得去/。/街道/很/窄/，/两个/人/都/没法/并排/走/。",
   "小人国的城门和街道都很小。", "The gate and streets are tiny."],
  ["The people were less than a foot tall, and the children were only four inches long.", // 58
   "这里/的/人/还/不到/一尺/高/，/小孩子/只有/四寸/长/。",
   "小人国的人只有一尺高，大约三十厘米。", "The Little People are about a foot tall, roughly thirty centimetres."],
  ["They always went out in groups of three to five, holding weapons, because they were afraid big birds would carry them off.", // 59
   "他们/出门/总是/三五成群/，/手/里/拿/着/武器/，/因为/怕/被/大鸟/叼走/。",
   "小人们怕被大鸟抓走，出门要结伴。", "The Little People go out in groups so big birds won’t snatch them."],
  ["Tang Ao saw one of the little people eating a piece of fruit and asked, “Is it sweet?” The little man kept on eating and said, “Terribly bitter!”", // 60
   "唐敖/看见/一个/小人国/的/人/在/吃/果子/，/就/问/他/：/“/甜不甜/？/”/那/人/一边/吃/，/一边/说/：/“/苦死了/！/”",
   "小人国的人明明觉得甜，嘴上却说苦。", "The little man finds the fruit sweet but says it is bitter."],
  ["Tang Ao laughed. “Small in size and small in mind! I have never seen such ‘little people’ before.”", // 61
   "唐敖/笑道/：/“/个子/小/，/心眼/也/小/。/世上/竟/有/这样/的/‘/小人/’/，/真是/少见/！/”",
   "“小人”有两个意思：个子小的人；也指心胸窄、爱骗人的人。", "Xiaoren means both “little people” and “small-minded people.”"],
  ["Then they met Lin Zhiyang on his way back from selling his goods, and they all returned to the ship.", // 62
   "他们/遇到/卖货/回来/的/林之洋/，/一起/回到/了/船/上/。",
   "他们和林之洋一起回到船上。", "They return to the ship with Lin Zhiyang."],
  ["The ship raised its sails again.", // 63
   "船/又/扬起/了/帆/。",
   "他们又出发了。", "They set off again."],
  ["Ahead lay the Land of Two Faces, the Land of Women and many more strange countries, all waiting for them.", // 64
   "前面/还有/两面国/、/女儿国/……/许多/更/奇怪/的/国家/，/正/等/着/他们/呢/。",
   "后面还有更多奇怪的国家，以后再读。", "More strange countries are waiting, for another day."],
];

// Unit n is units[n - 1].
export const units = lines.map(([en, zh, explainZh, explainEn]) => ({
  en,
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
}));
