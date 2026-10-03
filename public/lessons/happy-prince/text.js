// 王尔德《快乐王子》全文 · Oscar Wilde, “The Happy Prince” (1888), public domain.
// English: Project Gutenberg eBook #902 (the 1910 impression), checked against
// the 1888 first edition on Wikisource: three misprints corrected (“chose”,
// “Egypt”!”, “said the Mayor in fact”), old hyphenation modernised (to-night,
// to-morrow, good-bye, some one, every one), and one sentence left out for
// children (“He passed over the Ghetto …”, a stereotype about Jews and money).
// Long paragraphs are cut into units at sentence ends; a unit that carries on
// a quotation opens with “ as continued speech does.
// 中文：Lucas Academy 翻译。Words are pre-segmented; punctuation is its own token.
//
// The units are numbered; index.js reads them in 24 parts and marks the three
// a teacher reads with the class (课堂共读). The other parts are 选读.
//
// Each unit: [English, 中文, 用简单的话理解, In simple words]
const lines = [
  ["High above the city, on a tall column, stood the statue of the Happy Prince.", // 1
   "在/城市/的/高处/，/一根/高高的/柱子/上/，/立/着/快乐王子/的/雕像/。",
   "快乐王子是一座雕像，站在城里一根很高的柱子上。", "The Happy Prince is a statue on a tall column high above the city."],
  ["He was gilded all over with thin leaves of fine gold, for eyes he had two bright sapphires, and a large red ruby glowed on his sword-hilt.", // 2
   "他/全身/贴/满/了/薄薄的/纯金/叶子/，/两只/眼睛/是/明亮/的/蓝宝石/，/剑柄/上/还有/一颗/大大的/红宝石/，/闪闪发光/。",
   "雕像身上贴着金叶子，眼睛是蓝宝石，剑上有红宝石。", "He is covered in gold, his eyes are sapphires, and a ruby shines on his sword."],
  ["He was very much admired indeed.", // 3
   "大家/都/非常/赞美/他/。",
   "城里的人都很喜欢、很称赞这座雕像。", "Everyone in the city admired the statue."],
  ["“He is as beautiful as a weathercock,” remarked one of the Town Councillors who wished to gain a reputation for having artistic tastes; “only not quite so useful,” he added, fearing lest people should think him unpractical, which he really was not.", // 4
   "“/他/像/风向标/一样/漂亮/。/”/一位/市议员/说/，/他/很/想/让/大家/觉得/他/懂/艺术/。/“/只是/没有/风向标/那么/有用/。/”/他/又/补/了/一句/，/怕/别人/以为/他/不/讲实际/——/其实/他/是/个/很/讲实际/的/人/。",
   "这位议员想显得自己懂艺术，又怕别人说他不实际。", "The councillor wants to sound artistic, but sensible too."],
  ["“Why can’t you be like the Happy Prince?” asked a sensible mother of her little boy who was crying for the moon. “The Happy Prince never dreams of crying for anything.”", // 5
   "“/你/为什么/不能/像/快乐王子/那样/呢/？/”/一位/很/懂/道理/的/妈妈/问/她/的/小儿子/，/他/正/哭/着/要/天上/的/月亮/。/“/快乐王子/从来/不会/为了/什么/东西/哭闹/。/”",
   "妈妈希望哭闹的孩子学学雕像，不要再哭了。", "A mother tells her crying boy to be like the statue."],
  ["“I am glad there is someone in the world who is quite happy,” muttered a disappointed man as he gazed at the wonderful statue.", // 6
   "“/真/高兴/世界/上/还有/一个/人/是/完全/快乐/的/。/”/一个/失意/的/人/望/着/这/座/美丽/的/雕像/，/小声/地/说/。",
   "一个不开心的人看见雕像，觉得至少还有人是快乐的。", "An unhappy man is glad that at least someone seems happy."],
  ["“He looks just like an angel,” said the Charity Children as they came out of the cathedral in their bright scarlet cloaks and their clean white pinafores.", // 7
   "“/他/看起来/就/像/一位/天使/。/”/慈善学校/的/孩子们/说/。/他们/刚/从/大教堂/里/出来/，/披/着/鲜红/的/斗篷/，/系/着/干净/的/白/围裙/。",
   "穿着红斗篷的孩子们觉得，雕像像天使一样美。", "The children think the statue looks like an angel."],
  ["“How do you know?” said the Mathematical Master, “you have never seen one.”", // 8
   "“/你们/怎么/知道/？/”/数学老师/说/，/“/你们/又/没/见/过/天使/。/”",
   "数学老师说，没见过的东西，怎么能知道它的样子？", "The math teacher says they have never seen an angel."],
  ["“Ah! but we have, in our dreams,” answered the children; and the Mathematical Master frowned and looked very severe, for he did not approve of children dreaming.", // 9
   "“/啊/！/可是/我们/见/过/，/在/梦/里/见/过/。/”/孩子们/回答/。/数学老师/皱起/眉头/，/脸色/很/严厉/，/因为/他/不/赞成/孩子们/做梦/。",
   "孩子们在梦里见过天使，可是老师不喜欢孩子做梦。", "The children saw angels in dreams, but the teacher does not like children to dream."],
  ["One night there flew over the city a little Swallow.", // 10
   "一天/晚上/，/一只/小燕子/飞过/这/座/城市/。",
   "有一天夜里，一只小燕子飞来了。", "One night, a little swallow flies over the city."],
  ["His friends had gone away to Egypt six weeks before, but he had stayed behind, for he was in love with the most beautiful Reed.", // 11
   "他/的/朋友们/六个/星期/以前/就/飞/到/埃及/去/了/，/可是/他/留/了/下来/，/因为/他/爱上/了/一根/最/美丽/的/芦苇/。",
   "别的燕子都去埃及过冬了，这只燕子因为喜欢芦苇留了下来。", "The other swallows went to Egypt, but he stayed because he loved a reed."],
  ["He had met her early in the spring as he was flying down the river after a big yellow moth, and had been so attracted by her slender waist that he had stopped to talk to her.", // 12
   "早春/的/时候/，/他/沿着/河边/追/一只/黄色/的/大/飞蛾/，/遇见/了/她/。/她/细细的/腰身/那么/好看/，/他/就/停下来/，/跟/她/说话/。",
   "春天，燕子在河边看见了芦苇，觉得她很美，就停下来和她说话。", "In spring he saw the reed by the river and stopped to talk to her."],
  ["“Shall I love you?” said the Swallow, who liked to come to the point at once, and the Reed made him a low bow.", // 13
   "“/我/可以/爱/你/吗/？/”/燕子/问/。/他/喜欢/有话直说/。/芦苇/向/他/深深地/鞠了一躬/。",
   "燕子直接问芦苇，芦苇弯下腰，好像在点头。", "The swallow asks straight away, and the reed bows as if to say yes."],
  ["So he flew round and round her, touching the water with his wings, and making silver ripples. This was his courtship, and it lasted all through the summer.", // 14
   "于是/他/绕/着/她/飞/呀/飞/，/翅膀/轻轻/点着/水面/，/荡起/一圈圈/银色/的/波纹/。/这/就是/他/在/追求/她/，/整整/一个/夏天/都/是/这样/。",
   "燕子整个夏天都围着芦苇飞，表示喜欢她。", "All summer he flies around her to show he likes her."],
  ["“It is a ridiculous attachment,” twittered the other Swallows; “she has no money, and far too many relations”; and indeed the river was quite full of Reeds. Then, when the autumn came they all flew away.", // 15
   "“/这种/爱/真/可笑/。/”/别的/燕子/叽叽喳喳/地/说/，/“/她/没有/钱/，/亲戚/又/多/得/不得了/。/”/河边/确实/长满/了/芦苇/。/后来/，/秋天/到/了/，/燕子们/全都/飞走/了/。",
   "别的燕子笑他，说芦苇又穷、亲戚又多；秋天它们都飞走了。", "The other swallows laugh at him, then fly away in autumn."],
  ["After they had gone he felt lonely, and began to tire of his lady-love.", // 16
   "他们/走/了/以后/，/燕子/觉得/很/孤单/，/也/开始/对/他/的/心上人/感到/厌倦/了/。",
   "朋友都走了，燕子觉得孤单，也不那么喜欢芦苇了。", "With his friends gone, he feels lonely and tired of the reed."],
  ["“She has no conversation,” he said, “and I am afraid that she is a coquette, for she is always flirting with the wind.” And certainly, whenever the wind blew, the Reed made the most graceful curtseys.", // 17
   "“/她/不会/聊天/，/”/他/说/，/“/而且/我/看/她/有点/三心二意/，/因为/她/总是/跟/风/眉来眼去/。/”/的确/，/每次/风/吹过来/，/芦苇/就/优雅/地/弯腰/行礼/。",
   "燕子开始挑芦苇的毛病，说她只会对着风弯腰。", "The swallow starts finding fault with the reed."],
  ["“I admit that she is domestic,” he continued, “but I love travelling, and my wife, consequently, should love travelling also.”", // 18
   "“/我/承认/她/很/恋家/，/”/他/接着/说/，/“/可是/我/喜欢/旅行/，/所以/，/我/的/妻子/也/应该/喜欢/旅行/。/”",
   "燕子喜欢旅行，所以他觉得芦苇也应该喜欢旅行。", "He loves to travel, so he thinks his wife should love it too."],
  ["“Will you come away with me?” he said finally to her; but the Reed shook her head, she was so attached to her home.", // 19
   "“/你/愿意/跟/我/一起/走/吗/？/”/最后/他/问/她/。/可是/芦苇/摇/了/摇/头/，/她/太/舍不得/自己/的/家/了/。",
   "芦苇不愿意离开家，所以没有跟燕子走。", "The reed loves her home too much to leave."],
  ["“You have been trifling with me,” he cried. “I am off to the Pyramids. Goodbye!” and he flew away.", // 20
   "“/你/一直/在/拿/我/开玩笑/！/”/他/嚷道/，/“/我/要/去/金字塔/了/。/再见/！/”/说完/他/就/飞走/了/。",
   "燕子生气了，说要去埃及看金字塔，就飞走了。", "The swallow gets cross and flies off toward the Pyramids."],
  ["All day long he flew, and at night-time he arrived at the city. “Where shall I put up?” he said; “I hope the town has made preparations.”", // 21
   "他/飞/了/一整天/，/晚上/才/到/了/这/座/城市/。/“/我/住/在/哪里/好/呢/？/”/他/说/，/“/希望/这/座/城/已经/为/我/准备/好/了/。/”",
   "燕子飞了一整天，到了城里，想找地方过夜。", "He flies all day and looks for a place to stay in the city."],
  ["Then he saw the statue on the tall column.", // 22
   "这时/，/他/看见/了/高高的/柱子/上/的/那/座/雕像/。",
   "燕子看到了快乐王子的雕像。", "He sees the statue on the tall column."],
  ["“I will put up there,” he cried; “it is a fine position, with plenty of fresh air.” So he alighted just between the feet of the Happy Prince.", // 23
   "“/我/就/住/在/那儿/吧/，/”/他/叫道/，/“/那个/位置/真/好/，/空气/又/新鲜/。/”/于是/，/他/落/在/快乐王子/的/两只/脚/中间/。",
   "燕子决定在雕像的脚边过夜。", "He lands between the statue’s feet to spend the night."],
  ["“I have a golden bedroom,” he said softly to himself as he looked round, and he prepared to go to sleep; but just as he was putting his head under his wing a large drop of water fell on him.", // 24
   "“/我/有/一间/金色/的/卧室/了/。/”/他/看看/四周/，/轻声/对/自己/说/，/然后/准备/睡觉/。/可是/，/他/刚/把/头/埋/到/翅膀/底下/，/一滴/大大的/水珠/就/落/在/了/他/身上/。",
   "燕子觉得睡在金色的雕像旁边真好，可这时一滴水落了下来。", "He is about to sleep in his “golden bedroom” when a big drop falls on him."],
  ["“What a curious thing!” he cried; “there is not a single cloud in the sky, the stars are quite clear and bright, and yet it is raining.", // 25
   "“/真/奇怪/！/”/他/叫道/，/“/天上/一片/云/也/没有/，/星星/又/清楚/又/明亮/，/可是/竟然/在/下雨/。",
   "天上没有云，怎么会下雨呢？燕子觉得很奇怪。", "There are no clouds, so why is it raining? He is puzzled."],
  ["“The climate in the north of Europe is really dreadful. The Reed used to like the rain, but that was merely her selfishness.”", // 26
   "“/北欧/的/天气/真是/糟透了/。/芦苇/以前/倒是/喜欢/下雨/，/不过/那/只是/她/自私/罢了/。/”",
   "燕子抱怨天气不好，还顺便说芦苇的坏话。", "He grumbles about the weather and says something unkind about the reed."],
  ["Then another drop fell.", // 27
   "接着/，/又/落下/了/一滴/。",
   "又有一滴水落下来了。", "Another drop falls."],
  ["“What is the use of a statue if it cannot keep the rain off?” he said; “I must look for a good chimney-pot,” and he determined to fly away.", // 28
   "“/连/雨/都/挡不住/，/要/雕像/有/什么/用/？/”/他/说/，/“/我/要/去/找/一个/好/烟囱/。/”/他/决定/飞走/。",
   "燕子觉得雕像挡不了雨，想换个地方睡。", "The statue can’t keep off the rain, so he decides to leave."],
  ["But before he had opened his wings, a third drop fell, and he looked up, and saw—Ah! what did he see?", // 29
   "可是/，/他/还/没/张开/翅膀/，/第三/滴/水/又/落/了/下来/。/他/抬起/头/，/看见/了/——/啊/！/他/看见/了/什么/？",
   "第三滴水落下来，燕子抬头一看——", "A third drop falls. He looks up and sees—what?"],
  ["The eyes of the Happy Prince were filled with tears, and tears were running down his golden cheeks. His face was so beautiful in the moonlight that the little Swallow was filled with pity.", // 30
   "快乐王子/的/眼睛/里/满/是/泪水/，/泪珠/顺着/他/金色/的/脸颊/流下来/。/月光/下/，/他/的/脸/是/那么/美/，/小燕子/心里/充满/了/同情/。",
   "原来是王子在哭！燕子看了很心疼。", "The Prince is crying, and the swallow feels sorry for him."],
  ["“Who are you?” he said.", // 31
   "“/你/是/谁/？/”/他/问/。",
   "燕子问雕像是谁。", "The swallow asks who he is."],
  ["“I am the Happy Prince.”", // 32
   "“/我/是/快乐王子/。/”",
   "雕像说，他就是快乐王子。", "The statue says he is the Happy Prince."],
  ["“Why are you weeping then?” asked the Swallow; “you have quite drenched me.”", // 33
   "“/那/你/为什么/哭/呢/？/”/燕子/问/，/“/你/把/我/全身/都/淋湿/了/。/”",
   "燕子不明白：快乐王子怎么会哭呢？", "Why would a Happy Prince cry? The swallow wonders."],
  ["“When I was alive and had a human heart,” answered the statue, “I did not know what tears were, for I lived in the Palace of Sans-Souci, where sorrow is not allowed to enter.", // 34
   "“/我/活着/、/还有/一颗/人心/的/时候/，/”/雕像/回答/，/“/我/不/知道/眼泪/是/什么/，/因为/我/住/在/无忧宫/里/，/那里/不许/忧愁/进来/。",
   "王子活着的时候住在无忧宫，从来没有哭过。", "When he was alive, he lived in a palace where no one was allowed to be sad."],
  ["“In the daytime I played with my companions in the garden, and in the evening I led the dance in the Great Hall.", // 35
   "“/白天/，/我/和/同伴们/在/花园/里/玩/；/晚上/，/我/在/大厅/里/领头/跳舞/。",
   "他每天只是玩和跳舞，过得很开心。", "He played all day and danced every evening."],
  ["“Round the garden ran a very lofty wall, but I never cared to ask what lay beyond it, everything about me was so beautiful.", // 36
   "“/花园/四周/围/着/一道/很/高/很/高/的/墙/，/可是/我/从来/没/想/过/要/问/墙/外面/有/什么/，/因为/我/身边/的/一切/都/那么/美/。",
   "他从来没想过要问高墙外面有什么。", "He never wondered what was outside the high wall."],
  ["“My courtiers called me the Happy Prince, and happy indeed I was, if pleasure be happiness. So I lived, and so I died.", // 37
   "“/大臣们/都/叫/我/快乐王子/，/我/也/确实/很/快乐/——/如果/玩乐/就是/快乐/的话/。/我/就/这样/活着/，/也/就/这样/死去/了/。",
   "他以前只是玩得开心，那不一定是真正的快乐。", "He was cheerful, but having fun is not the same as true happiness."],
  ["“And now that I am dead they have set me up here so high that I can see all the ugliness and all the misery of my city, and though my heart is made of lead yet I cannot choose but weep.”", // 38
   "“/现在/我/死/了/，/他们/把/我/立/在/这么/高/的/地方/，/让/我/看得见/我/城里/所有/的/丑恶/和/所有/的/苦难/。/虽然/我/的/心/是/铅/做/的/，/我/还是/忍不住/要/哭/。/”",
   "站得高了，王子看见了城里的苦难，忍不住哭了。", "From up high he sees all the suffering in his city, and he cannot stop crying."],
  ["“What! is he not solid gold?” said the Swallow to himself. He was too polite to make any personal remarks out loud.", // 39
   "“/什么/！/他/不是/纯金/做/的/？/”/燕子/心里/想/。/他/很/有/礼貌/，/不会/把/议论/别人/的/话/大声/说/出来/。",
   "燕子发现王子不是纯金的，可他很有礼貌，没有说出口。", "The swallow is surprised, but too polite to say it out loud."],
  ["“Far away,” continued the statue in a low musical voice, “far away in a little street there is a poor house. One of the windows is open, and through it I can see a woman seated at a table.", // 40
   "“/在/很/远/的/地方/，/”/雕像/用/低沉/好听/的/声音/接着/说/，/“/在/很/远/的/一条/小街/上/，/有/一户/穷人家/。/这/户/人家/有/一扇/窗/开/着/，/我/从/窗口/能/看见/一个/女人/坐在/桌子/旁边/。",
   "王子看见远处一户穷人家里，有个女人坐在桌边。", "Far away, the Prince sees a woman sitting at a table in a poor house."],
  ["“Her face is thin and worn, and she has coarse, red hands, all pricked by the needle, for she is a seamstress.", // 41
   "“/她/的/脸/又/瘦/又/憔悴/，/双手/又/粗/又/红/，/被/针/扎/得/满/是/小孔/，/因为/她/是/个/女裁缝/。",
   "她是个女裁缝，每天缝衣服，手被针扎得很疼。", "She sews for a living, and the needle has pricked her hands."],
  ["“She is embroidering passion-flowers on a satin gown for the loveliest of the Queen’s maids-of-honour to wear at the next Court-ball.", // 42
   "“/她/正在/一件/缎子/长裙/上/绣/西番莲/，/这件/裙子/是/给/王后/身边/最/漂亮/的/女官/在/下一次/宫廷舞会/上/穿/的/。",
   "她辛苦地绣花，裙子却是给宫里的贵族小姐穿去跳舞的。", "She embroiders a fancy dress for a rich lady to wear to a ball."],
  ["“In a bed in the corner of the room her little boy is lying ill. He has a fever, and is asking for oranges. His mother has nothing to give him but river water, so he is crying.", // 43
   "“/屋子/角落/的/床上/，/躺/着/她/生病/的/小儿子/。/他/发/着/烧/，/想/吃/橘子/。/可是/妈妈/除了/河水/，/什么/也/给/不了/他/，/所以/他/在/哭/。",
   "她的小儿子生病发烧，想吃橘子，可妈妈只能给他喝河水。", "Her son is sick and wants oranges, but they have only river water."],
  ["“Swallow, Swallow, little Swallow, will you not bring her the ruby out of my sword-hilt? My feet are fastened to this pedestal and I cannot move.”", // 44
   "“/燕子/，/燕子/，/小燕子/，/你/愿意/把/我/剑柄/上/的/红宝石/给/她/送/去/吗/？/我/的/脚/被/固定/在/这个/底座/上/，/动/不了/。/”",
   "王子自己不能动，请燕子把红宝石送给那位妈妈。", "The Prince can’t move, so he asks the swallow to take her the ruby."],
  ["“I am waited for in Egypt,” said the Swallow. “My friends are flying up and down the Nile, and talking to the large lotus-flowers. Soon they will go to sleep in the tomb of the great King.", // 45
   "“/埃及/有人/在/等/我/呢/，/”/燕子/说/，/“/我/的/朋友们/正在/尼罗河/上/飞来飞去/，/和/大朵/的/莲花/说话/。/他们/很快/就要/到/伟大/国王/的/陵墓/里/睡觉/了/。",
   "燕子说朋友们在埃及等他，他想快点去。", "The swallow says his friends are waiting for him in Egypt."],
  ["“The King is there himself in his painted coffin. He is wrapped in yellow linen, and embalmed with spices. Round his neck is a chain of pale green jade, and his hands are like withered leaves.”", // 46
   "“/国王/本人/就/躺/在/他/那/画/满/图画/的/棺材/里/。/他/全身/裹/着/黄色/的/亚麻布/，/身上/涂/满/了/香料/。/他/的/脖子/上/戴/着/一串/淡绿色/的/玉/，/双手/像/枯叶/一样/。/”",
   "燕子讲埃及古代的国王，他已经变成了很老很老的木乃伊。", "He describes an ancient Egyptian king, wrapped up as a mummy."],
  ["“Swallow, Swallow, little Swallow,” said the Prince, “will you not stay with me for one night, and be my messenger? The boy is so thirsty, and the mother so sad.”", // 47
   "“/燕子/，/燕子/，/小燕子/，/”/王子/说/，/“/你/愿意/陪/我/一个/晚上/，/做/我/的/小信使/吗/？/那/孩子/渴/得/厉害/，/那位/妈妈/又/那么/难过/。/”",
   "王子请燕子只留一个晚上，帮他送东西。", "The Prince asks him to stay just one night and help."],
  ["“I don’t think I like boys,” answered the Swallow. “Last summer, when I was staying on the river, there were two rude boys, the miller’s sons, who were always throwing stones at me.", // 48
   "“/我/可/不/怎么/喜欢/男孩子/，/”/燕子/回答/，/“/去年/夏天/我/住/在/河边/，/磨坊主/的/两个/儿子/很/没/礼貌/，/总是/拿/石头/扔/我/。",
   "燕子以前被两个男孩扔石头，所以不喜欢男孩。", "Two boys once threw stones at him, so he doesn’t like boys."],
  ["“They never hit me, of course; we swallows fly far too well for that, and besides, I come of a family famous for its agility; but still, it was a mark of disrespect.”", // 49
   "“/当然/，/他们/一次/也/没/打中/我/；/我们/燕子/飞/得/太好了/，/再说/，/我们/家族/是/出了名/的/灵巧/。/不过/，/那/毕竟/是/对/我/不/尊重/。/”",
   "石头没打中他，可他还是觉得被人看不起。", "The stones never hit him, but he still felt disrespected."],
  ["But the Happy Prince looked so sad that the little Swallow was sorry. “It is very cold here,” he said; “but I will stay with you for one night, and be your messenger.”", // 50
   "可是/快乐王子/看起来/那么/伤心/，/小燕子/心里/也/难过/起来/。/“/这儿/真/冷/，/”/他/说/，/“/不过/我/愿意/陪/你/一个/晚上/，/做/你/的/小信使/。/”",
   "燕子看见王子那么伤心，就答应留下来一晚。", "Seeing the Prince so sad, the swallow agrees to stay one night."],
  ["“Thank you, little Swallow,” said the Prince.", // 51
   "“/谢谢/你/，/小燕子/。/”/王子/说/。",
   "王子谢谢燕子。", "The Prince thanks the swallow."],
  ["So the Swallow picked out the great ruby from the Prince’s sword, and flew away with it in his beak over the roofs of the town.", // 52
   "于是/，/燕子/从/王子/的/剑/上/啄/下/那/颗/大红宝石/，/用/嘴/叼/着/它/，/飞过/城里/的/一个个/屋顶/。",
   "燕子叼着红宝石，飞过城市的屋顶。", "The swallow takes the ruby in his beak and flies over the rooftops."],
  ["He passed by the cathedral tower, where the white marble angels were sculptured. He passed by the palace and heard the sound of dancing.", // 53
   "他/飞过/大教堂/的/塔楼/，/那里/雕/着/白色/大理石/的/天使/。/他/飞过/王宫/，/听见/了/跳舞/的/声音/。",
   "燕子经过教堂和王宫，王宫里有人在跳舞。", "He flies past the cathedral and the palace, where people are dancing."],
  ["A beautiful girl came out on the balcony with her lover. “How wonderful the stars are,” he said to her, “and how wonderful is the power of love!”", // 54
   "一位/美丽/的/姑娘/和/她/的/恋人/走/到/阳台/上/。/“/星星/多/美/啊/，/”/他/对/她/说/，/“/爱/的/力量/多/奇妙/啊/！/”",
   "阳台上，一个年轻人说星星很美，爱的力量很奇妙。", "On a balcony, a young man talks about the stars and the power of love."],
  ["“I hope my dress will be ready in time for the State-ball,” she answered; “I have ordered passion-flowers to be embroidered on it; but the seamstresses are so lazy.”", // 55
   "“/希望/我/的/裙子/能/赶/在/宫廷舞会/之前/做好/，/”/她/回答/，/“/我/让/人/在/上面/绣/西番莲/。/可是/那些/女裁缝/太/懒/了/。/”",
   "姑娘只关心自己的裙子，还说辛苦的女裁缝懒。", "The girl only cares about her dress and calls the seamstresses lazy."],
  ["He passed over the river, and saw the lanterns hanging to the masts of the ships. At last he came to the poor house and looked in.", // 56
   "他/飞过/河面/，/看见/船/的/桅杆/上/挂/着/一盏盏/灯笼/。/最后/，/他/来到/那/户/穷人家/，/往/里面/看/了/看/。",
   "燕子飞过河，终于找到了那户穷人家。", "He flies over the river and finds the poor house at last."],
  ["The boy was tossing feverishly on his bed, and the mother had fallen asleep, she was so tired. In he hopped, and laid the great ruby on the table beside the woman’s thimble.", // 57
   "男孩/发/着/烧/，/在/床上/翻来覆去/；/妈妈/太/累/了/，/已经/睡着/了/。/燕子/跳进/屋里/，/把/大红宝石/放在/桌上/，/就/在/女人/的/顶针/旁边/。",
   "燕子悄悄把红宝石放在妈妈的桌子上。", "He quietly puts the ruby on the table next to the mother’s thimble."],
  ["Then he flew gently round the bed, fanning the boy’s forehead with his wings. “How cool I feel,” said the boy, “I must be getting better”; and he sank into a delicious slumber.", // 58
   "然后/，/他/绕/着/床/轻轻地/飞/，/用/翅膀/给/男孩/的/额头/扇风/。/“/好/凉快/啊/，/”/男孩/说/，/“/我/一定/是/快/好/了/。/”/说完/，/他/就/甜甜地/睡着/了/。",
   "燕子用翅膀给生病的孩子扇风，孩子舒服地睡着了。", "The swallow fans the sick boy, who feels cooler and falls asleep."],
  ["Then the Swallow flew back to the Happy Prince, and told him what he had done. “It is curious,” he remarked, “but I feel quite warm now, although it is so cold.”", // 59
   "燕子/飞/回/快乐王子/身边/，/把/自己/做/的/事/告诉/了/他/。/“/真/奇怪/，/”/他/说/，/“/天/这么/冷/，/我/现在/却/觉得/很/暖和/。/”",
   "帮助了别人，燕子觉得身上暖暖的。", "After helping, the swallow feels warm even though it is cold."],
  ["“That is because you have done a good action,” said the Prince. And the little Swallow began to think, and then he fell asleep. Thinking always made him sleepy.", // 60
   "“/那/是/因为/你/做/了/一件/好事/。/”/王子/说/。/小燕子/开始/想/这件/事/，/想着/想着/就/睡着/了/。/他/只要/想/事情/，/就/会/犯困/。",
   "王子说，做了好事心里会暖和。燕子想着想着就睡着了。", "The Prince says good deeds warm the heart. The swallow thinks, then falls asleep."],
  ["When day broke he flew down to the river and had a bath. “What a remarkable phenomenon,” said the Professor of Ornithology as he was passing over the bridge. “A swallow in winter!”", // 61
   "天亮/了/，/燕子/飞/到/河里/洗/了/个/澡/。/“/这/可/真是/罕见/的/现象/，/”/鸟类学/教授/从/桥/上/经过/时/说/，/“/冬天/居然/有/燕子/！/”",
   "有个教授看见冬天还有燕子，觉得很稀奇。", "A bird professor is amazed to see a swallow in winter."],
  ["And he wrote a long letter about it to the local newspaper. Everyone quoted it, it was full of so many words that they could not understand.", // 62
   "他/还/为/这件/事/给/本地/的/报纸/写/了/一封/长信/。/人人/都/引用/这/封/信/，/因为/信/里/有/好多/他们/看不懂/的/词/。",
   "信里全是大家看不懂的难词，所以人人都爱引用它。", "Everyone quoted the letter because it was full of big words no one understood."],
  ["“Tonight I go to Egypt,” said the Swallow, and he was in high spirits at the prospect. He visited all the public monuments, and sat a long time on top of the church steeple.", // 63
   "“/今天/晚上/我/就/去/埃及/。/”/燕子/说/。/想到/要/出发/，/他/就/兴高采烈/。/他/参观/了/所有/的/纪念碑/，/还/在/教堂/的/尖顶/上/坐/了/好久/。",
   "燕子很开心，准备晚上去埃及，白天在城里到处逛。", "Happy about leaving for Egypt tonight, he tours the city all day."],
  ["Wherever he went the Sparrows chirruped, and said to each other, “What a distinguished stranger!” so he enjoyed himself very much.", // 64
   "不管/他/飞/到/哪里/，/麻雀们/都/叽叽喳喳/地/互相/说/：/“/好/一位/了不起/的/外地/客人/！/”/所以/他/玩/得/非常/开心/。",
   "麻雀们都夸燕子了不起，燕子很得意。", "The sparrows call him a distinguished stranger, and he loves it."],
  ["When the moon rose he flew back to the Happy Prince. “Have you any commissions for Egypt?” he cried; “I am just starting.”", // 65
   "月亮/升/起来/的/时候/，/他/飞/回/快乐王子/身边/。/“/你/在/埃及/有/什么/事/要/我/去/办/吗/？/”/他/叫道/，/“/我/这/就/出发/了/。/”",
   "晚上燕子回来，问王子有没有东西要带去埃及。", "At moonrise he comes back to ask if the Prince needs anything taken to Egypt."],
  ["“Swallow, Swallow, little Swallow,” said the Prince, “will you not stay with me one night longer?”", // 66
   "“/燕子/，/燕子/，/小燕子/，/”/王子/说/，/“/你/愿意/再/陪/我/一个/晚上/吗/？/”",
   "王子请燕子再多留一晚。", "The Prince asks him to stay one more night."],
  ["“I am waited for in Egypt,” answered the Swallow. “Tomorrow my friends will fly up to the Second Cataract. The river-horse couches there among the bulrushes, and on a great granite throne sits the God Memnon.", // 67
   "“/埃及/有人/在/等/我/呢/，/”/燕子/回答/，/“/明天/，/我/的/朋友们/要/飞/到/尼罗河/的/第二瀑布/去/。/那里/，/河马/躺/在/蒲草丛/里/，/门农神/坐在/一个/巨大/的/花岗岩/宝座/上/。",
   "燕子说起埃及：有河马，还有坐在石头宝座上的神像。", "He describes Egypt: hippos in the reeds and a giant stone god on a throne."],
  ["“All night long he watches the stars, and when the morning star shines he utters one cry of joy, and then he is silent.", // 68
   "“/他/整夜/望/着/星星/，/当/晨星/亮/起来/的/时候/，/他/会/欢呼/一声/，/然后/就/不再/出声/了/。",
   "神像整夜看星星，早上的星星出来时，他会高兴地叫一声。", "The stone god watches the stars all night and cries out once at dawn."],
  ["“At noon the yellow lions come down to the water’s edge to drink. They have eyes like green beryls, and their roar is louder than the roar of the cataract.”", // 69
   "“/中午/，/黄色/的/狮子/会/到/水边/来/喝水/。/它们/的/眼睛/像/绿宝石/，/吼声/比/瀑布/的/轰鸣/还要/响/。/”",
   "中午，狮子来河边喝水，吼声很大。", "At noon, lions come to drink, roaring louder than the waterfall."],
  ["“Swallow, Swallow, little Swallow,” said the Prince, “far away across the city I see a young man in a garret.", // 70
   "“/燕子/，/燕子/，/小燕子/，/”/王子/说/，/“/在/城市/的/另一边/，/很/远/的/地方/，/我/看见/阁楼/上/有/一个/年轻人/。",
   "王子又看见了一个需要帮助的年轻人。", "The Prince sees a young man in an attic far across the city."],
  ["“He is leaning over a desk covered with papers, and in a tumbler by his side there is a bunch of withered violets. His hair is brown and crisp, and his lips are red as a pomegranate, and he has large and dreamy eyes.", // 71
   "“/他/趴在/堆满/稿纸/的/书桌/上/，/身边/的/玻璃杯/里/插/着/一束/枯萎/的/紫罗兰/。/他/的/头发/是/棕色/的/，/卷卷的/，/嘴唇/红/得/像/石榴/，/还有/一双/大大的/、/充满/梦想/的/眼睛/。",
   "王子描述这个年轻人：他在桌前写东西，有一双爱做梦的眼睛。", "The Prince describes the young man at his desk, with big dreamy eyes."],
  ["“He is trying to finish a play for the Director of the Theatre, but he is too cold to write any more. There is no fire in the grate, and hunger has made him faint.”", // 72
   "“/他/想/给/剧院经理/写/完/一个/剧本/，/可是/他/太/冷/了/，/再也/写/不/下去/了/。/壁炉/里/没有/火/，/他/饿/得/头/都/发晕/了/。/”",
   "年轻人又冷又饿，写不完他的剧本。", "He is too cold and hungry to finish his play."],
  ["“I will wait with you one night longer,” said the Swallow, who really had a good heart. “Shall I take him another ruby?”", // 73
   "“/我/再/陪/你/一个/晚上/。/”/燕子/说/，/他/真是/一只/好心肠/的/燕子/。/“/要/我/再/给/他/送/一颗/红宝石/吗/？/”",
   "好心的燕子答应再留一晚。", "Kind-hearted, the swallow agrees to stay one more night."],
  ["“Alas! I have no ruby now,” said the Prince; “my eyes are all that I have left. They are made of rare sapphires, which were brought out of India a thousand years ago.", // 74
   "“/唉/！/我/已经/没有/红宝石/了/，/”/王子/说/，/“/我/只/剩下/这/双/眼睛/了/。/它们/是/用/珍贵/的/蓝宝石/做/的/，/是/一千年/前/从/印度/带来/的/。",
   "王子身上只剩下蓝宝石做的眼睛了。", "The Prince has only his sapphire eyes left."],
  ["“Pluck out one of them and take it to him. He will sell it to the jeweller, and buy food and firewood, and finish his play.”", // 75
   "“/把/其中/一只/啄/下来/，/给/他/送/去/吧/。/他/可以/把/它/卖/给/珠宝商/，/买/吃/的/和/柴火/，/写/完/他/的/剧本/。/”",
   "王子要把自己的一只眼睛送给年轻人。", "The Prince wants to give one of his eyes to the young man."],
  ["“Dear Prince,” said the Swallow, “I cannot do that”; and he began to weep.", // 76
   "“/亲爱的/王子/，/”/燕子/说/，/“/我/不能/这么/做/。/”/说/着/，/他/哭/了/起来/。",
   "燕子不忍心啄王子的眼睛，哭了。", "The swallow can’t bear to do it and starts to cry."],
  ["“Swallow, Swallow, little Swallow,” said the Prince, “do as I command you.”", // 77
   "“/燕子/，/燕子/，/小燕子/，/”/王子/说/，/“/照/我/说/的/去/做/吧/。/”",
   "王子请燕子一定要照他的话去做。", "The Prince tells him to do as he asks."],
  ["So the Swallow plucked out the Prince’s eye, and flew away to the student’s garret. It was easy enough to get in, as there was a hole in the roof. Through this he darted, and came into the room.", // 78
   "于是/燕子/啄/下/王子/的/一只/眼睛/，/飞/到/那个/年轻人/的/阁楼/去/。/进去/很/容易/，/因为/屋顶/上/有/个/洞/。/他/从/洞/里/一下子/钻/了/进去/，/飞/进/了/屋子/。",
   "燕子带着蓝宝石，从屋顶的洞飞进了阁楼。", "He takes the sapphire and flies into the attic through a hole in the roof."],
  ["The young man had his head buried in his hands, so he did not hear the flutter of the bird’s wings, and when he looked up he found the beautiful sapphire lying on the withered violets.", // 79
   "年轻人/双手/捧/着/头/，/没有/听见/鸟儿/扑/翅膀/的/声音/。/等/他/抬起/头/，/就/发现/那/颗/美丽/的/蓝宝石/躺/在/枯萎/的/紫罗兰/上/。",
   "年轻人抬起头，看见花上多了一颗蓝宝石。", "When he looks up, he finds the sapphire on the dried violets."],
  ["“I am beginning to be appreciated,” he cried; “this is from some great admirer. Now I can finish my play,” and he looked quite happy.", // 80
   "“/终于/有人/赏识/我/了/！/”/他/叫道/，/“/这/一定/是/哪位/很/崇拜/我/的/人/送/的/。/现在/我/可以/写/完/我/的/剧本/了/。/”/他/看起来/非常/高兴/。",
   "年轻人以为是喜欢他的人送的礼物，很开心。", "He thinks an admirer sent it, and he is very happy."],
  ["The next day the Swallow flew down to the harbour. He sat on the mast of a large vessel and watched the sailors hauling big chests out of the hold with ropes. “Heave a-hoy!” they shouted as each chest came up.", // 81
   "第二天/，/燕子/飞/到/港口/。/他/坐在/一艘/大船/的/桅杆/上/，/看/水手们/用/绳子/把/一个个/大箱子/从/船舱/里/拉/上来/。/每/拉上来/一个/箱子/，/他们/就/喊/：/“/嘿/——/哟/！/”",
   "燕子在港口看水手们拉大箱子。", "At the harbour, he watches sailors haul up big chests."],
  ["“I am going to Egypt!” cried the Swallow, but nobody minded, and when the moon rose he flew back to the Happy Prince.", // 82
   "“/我/要/去/埃及/了/！/”/燕子/叫道/，/可是/没有/人/理/他/。/月亮/升/起来/的/时候/，/他/飞/回/了/快乐王子/身边/。",
   "燕子大声说要去埃及，没人理他，晚上他又回到王子那里。", "No one cares that he’s going to Egypt, and at night he returns to the Prince."],
  ["“I am come to bid you goodbye,” he cried.", // 83
   "“/我/来/跟/你/说/再见/了/。/”/他/叫道/。",
   "燕子来向王子告别。", "He has come to say goodbye."],
  ["“Swallow, Swallow, little Swallow,” said the Prince, “will you not stay with me one night longer?”", // 84
   "“/燕子/，/燕子/，/小燕子/，/”/王子/说/，/“/你/愿意/再/陪/我/一个/晚上/吗/？/”",
   "王子又一次请燕子多留一晚。", "Once again, the Prince asks him to stay one more night."],
  ["“It is winter,” answered the Swallow, “and the chill snow will soon be here. In Egypt the sun is warm on the green palm-trees, and the crocodiles lie in the mud and look lazily about them.", // 85
   "“/冬天/到/了/，/”/燕子/回答/，/“/寒冷/的/雪/很快/就要/来/了/。/在/埃及/，/暖暖的/太阳/照/在/绿色/的/棕榈树/上/，/鳄鱼/躺/在/泥/里/，/懒洋洋/地/四处张望/。",
   "冬天到了，燕子想去温暖的埃及。", "It is winter now, and he longs for warm Egypt."],
  ["“My companions are building a nest in the Temple of Baalbec, and the pink and white doves are watching them, and cooing to each other.", // 86
   "“/我/的/同伴们/正在/巴尔贝克神庙/里/筑巢/，/粉色/和/白色/的/鸽子/在/旁边/看着/他们/，/咕咕/地/互相/说话/。",
   "燕子的朋友们在一座古老的神庙里筑巢。", "His friends are building a nest in an old temple."],
  ["“Dear Prince, I must leave you, but I will never forget you, and next spring I will bring you back two beautiful jewels in place of those you have given away.", // 87
   "“/亲爱的/王子/，/我/必须/离开/你/了/，/可是/我/永远/不会/忘记/你/。/明年/春天/，/我/会/给/你/带回/两颗/美丽/的/宝石/，/补/上/你/送出去/的/那/两颗/。",
   "燕子说他会记得王子，明年春天带宝石回来。", "He promises to remember the Prince and bring jewels next spring."],
  ["“The ruby shall be redder than a red rose, and the sapphire shall be as blue as the great sea.”", // 88
   "“/红宝石/会/比/红玫瑰/还要/红/，/蓝宝石/会/像/大海/一样/蓝/。/”",
   "燕子要带回最红的红宝石和最蓝的蓝宝石。", "The new ruby will be redder than a rose, the sapphire as blue as the sea."],
  ["“In the square below,” said the Happy Prince, “there stands a little match-girl. She has let her matches fall in the gutter, and they are all spoiled.", // 89
   "“/在/下面/的/广场/上/，/”/快乐王子/说/，/“/站/着/一个/卖火柴/的/小女孩/。/她/的/火柴/掉/进/了/水沟/里/，/全都/湿/坏/了/。",
   "广场上有个卖火柴的小女孩，她的火柴掉进水沟里坏了。", "A little match girl’s matches have fallen in the gutter and are ruined."],
  ["“Her father will beat her if she does not bring home some money, and she is crying. She has no shoes or stockings, and her little head is bare.", // 90
   "“/要是/她/不/带/钱/回家/，/她/爸爸/会/打/她/，/所以/她/在/哭/。/她/没有/鞋/，/也/没有/袜子/，/小小的/脑袋/上/什么/也/没/戴/。",
   "小女孩没钱回家会挨打，她又冷又害怕。", "She is afraid she’ll be beaten, and she has no shoes or hat in the cold."],
  ["“Pluck out my other eye, and give it to her, and her father will not beat her.”", // 91
   "“/把/我/的/另一只/眼睛/啄/下来/，/送给/她/吧/，/这样/她/爸爸/就/不会/打/她/了/。/”",
   "王子要把最后一只眼睛也送给小女孩。", "The Prince wants to give his last eye to the girl."],
  ["“I will stay with you one night longer,” said the Swallow, “but I cannot pluck out your eye. You would be quite blind then.”", // 92
   "“/我/可以/再/陪/你/一个/晚上/，/”/燕子/说/，/“/可是/我/不能/啄/下/你/的/眼睛/。/那样/你/就/什么/都/看不见/了/。/”",
   "燕子不愿意，因为王子会什么都看不见。", "The swallow refuses because the Prince would be blind."],
  ["“Swallow, Swallow, little Swallow,” said the Prince, “do as I command you.”", // 93
   "“/燕子/，/燕子/，/小燕子/，/”/王子/说/，/“/照/我/说/的/去/做/吧/。/”",
   "王子再一次请燕子照他的话去做。", "Again, the Prince tells him to do as he asks."],
  ["So he plucked out the Prince’s other eye, and darted down with it. He swooped past the match-girl, and slipped the jewel into the palm of her hand.", // 94
   "于是/燕子/啄/下/王子/的/另一只/眼睛/，/带/着/它/飞/了/下去/。/他/从/卖火柴/的/小女孩/身边/掠过/，/把/宝石/轻轻/放进/她/的/手心/里/。",
   "燕子把蓝宝石放进了小女孩的手心。", "He drops the sapphire into the girl’s hand."],
  ["“What a lovely bit of glass,” cried the little girl; and she ran home, laughing.", // 95
   "“/多/好看/的/一块/玻璃/呀/！/”/小女孩/叫道/，/然后/笑/着/跑/回家/了/。",
   "小女孩以为那是一块玻璃，开心地跑回家。", "She thinks it’s pretty glass and runs home laughing."],
  ["Then the Swallow came back to the Prince. “You are blind now,” he said, “so I will stay with you always.”", // 96
   "然后/，/燕子/回到/王子/身边/。/“/现在/你/看不见/了/，/”/他/说/，/“/所以/我/要/永远/陪/着/你/。/”",
   "王子看不见了，燕子决定一直陪着他。", "The Prince is blind now, so the swallow will stay with him always."],
  ["“No, little Swallow,” said the poor Prince, “you must go away to Egypt.”", // 97
   "“/不/，/小燕子/，/”/可怜/的/王子/说/，/“/你/应该/去/埃及/。/”",
   "王子不想耽误燕子，叫他快去埃及。", "The Prince doesn’t want to hold him back and tells him to go."],
  ["“I will stay with you always,” said the Swallow, and he slept at the Prince’s feet.", // 98
   "“/我/要/永远/陪/着/你/。/”/燕子/说/。/他/就/在/王子/的/脚边/睡着/了/。",
   "燕子坚持留下来，睡在王子的脚边。", "The swallow insists on staying and sleeps at the Prince’s feet."],
  ["All the next day he sat on the Prince’s shoulder, and told him stories of what he had seen in strange lands.", // 99
   "第二天/，/他/整天/坐在/王子/的/肩膀/上/，/给/他/讲/自己/在/遥远/国度/见/过/的/事情/。",
   "燕子坐在王子肩上，给看不见的王子讲远方的故事。", "He sits on the Prince’s shoulder and tells him stories of faraway lands."],
  ["He told him of the red ibises, who stand in long rows on the banks of the Nile, and catch gold-fish in their beaks; of the Sphinx, who is as old as the world itself, and lives in the desert, and knows everything;", // 100
   "他/讲/红色/的/朱鹭/，/它们/在/尼罗河/岸上/站/成/长长的/一排/，/用/嘴/捉/金鱼/；/他/讲/狮身人面像/，/它/和/世界/一样/古老/，/住/在/沙漠/里/，/什么/都/知道/；",
   "燕子讲尼罗河边的红色鸟儿，还有什么都知道的狮身人面像。", "He tells of red birds on the Nile and the all-knowing Sphinx."],
  ["of the merchants, who walk slowly by the side of their camels, and carry amber beads in their hands; of the King of the Mountains of the Moon, who is as black as ebony, and worships a large crystal;", // 101
   "他/讲/那些/商人/，/他们/牵/着/骆驼/慢慢/地/走/，/手里/拿/着/琥珀/珠子/；/他/讲/月亮山/的/国王/，/他/的/皮肤/像/乌木/一样/黑/，/敬拜/一块/大/水晶/；",
   "燕子讲牵着骆驼的商人，还有月亮山上的国王。", "He tells of merchants with camels and the King of the Mountains of the Moon."],
  ["of the great green snake that sleeps in a palm-tree, and has twenty priests to feed it with honey-cakes; and of the pygmies who sail over a big lake on large flat leaves, and are always at war with the butterflies.", // 102
   "他/讲/睡/在/棕榈树/上/的/大/绿/蛇/，/有/二十个/祭司/用/蜂蜜饼/喂/它/；/他/还/讲/那些/小矮人/，/他们/坐/着/又/大/又/平/的/叶子/渡过/大湖/，/总是/跟/蝴蝶/打仗/。",
   "燕子讲了好多奇妙的故事：大绿蛇，还有跟蝴蝶打仗的小矮人。", "He tells of a great green snake and tiny people who fight butterflies."],
  ["“Dear little Swallow,” said the Prince, “you tell me of marvellous things, but more marvellous than anything is the suffering of men and of women. There is no Mystery so great as Misery.", // 103
   "“/亲爱的/小燕子/，/”/王子/说/，/“/你/给/我/讲/了/许多/奇妙/的/事情/，/可是/比/什么/都/更/让/人/惊奇/的/，/是/世上/的/男男女女/所/受/的/苦/。/没有/什么/奥秘/，/比/苦难/更/深/。",
   "王子说，人们受的苦，比远方的奇事更值得关心。", "The Prince says people’s suffering matters more than faraway wonders."],
  ["“Fly over my city, little Swallow, and tell me what you see there.”", // 104
   "“/小燕子/，/飞/到/我/的/城市/上空/去/看看/，/再/告诉/我/你/看见/了/什么/。/”",
   "王子请燕子去看看城里的人过得怎么样。", "The Prince asks him to fly over the city and say what he sees."],
  ["So the Swallow flew over the great city, and saw the rich making merry in their beautiful houses, while the beggars were sitting at the gates.", // 105
   "于是/燕子/飞过/这/座/大城市/。/他/看见/富人/在/漂亮/的/房子/里/吃喝玩乐/，/乞丐们/却/坐在/大门口/。",
   "富人在屋里享乐，穷人坐在门外。", "The rich enjoy themselves inside while beggars sit at their gates."],
  ["He flew into dark lanes, and saw the white faces of starving children looking out listlessly at the black streets.", // 106
   "他/飞/进/黑暗/的/小巷/，/看见/饿坏/了/的/孩子们/脸色苍白/，/无精打采/地/望/着/漆黑/的/街道/。",
   "小巷里的孩子饿得没有力气，脸色发白。", "In dark lanes, hungry children stare out with pale faces."],
  ["Under the archway of a bridge two little boys were lying in one another’s arms to try and keep themselves warm. “How hungry we are!” they said. “You must not lie here,” shouted the Watchman, and they wandered out into the rain.", // 107
   "在/一座/桥/的/桥洞/下/，/两个/小男孩/紧紧/抱/在/一起/，/想/让/彼此/暖和/一点/。/“/我们/好/饿/啊/！/”/他们/说/。/“/你们/不许/躺/在/这儿/！/”/巡夜人/喊道/。/他们/只好/走进/雨/里/，/四处/流浪/。",
   "两个男孩在桥下取暖，却被巡夜人赶走了。", "Two cold boys under a bridge are chased out into the rain."],
  ["Then he flew back and told the Prince what he had seen.", // 108
   "然后/，/燕子/飞回来/，/把/他/看见/的/一切/告诉/了/王子/。",
   "燕子回来，把看到的事都告诉王子。", "He flies back and tells the Prince everything."],
  ["“I am covered with fine gold,” said the Prince, “you must take it off, leaf by leaf, and give it to my poor; the living always think that gold can make them happy.”", // 109
   "“/我/身上/贴/满/了/纯金/叶子/，/”/王子/说/，/“/你/把/它们/一片/一片/地/揭/下来/，/送给/我/城里/的/穷人/吧/。/活着/的/人/总/以为/金子/能/让/他们/快乐/。/”",
   "王子要把身上的金叶子都送给穷人。", "The Prince asks him to give his gold, leaf by leaf, to the poor."],
  ["Leaf after leaf of the fine gold the Swallow picked off, till the Happy Prince looked quite dull and grey.", // 110
   "燕子/把/纯金/叶子/一片/接/一片/地/揭/下来/，/直到/快乐王子/变得/黯淡无光/，/灰扑扑/的/。",
   "金子都揭下来了，王子变得灰灰的，不再好看。", "As the gold comes off, the Prince turns dull and grey."],
  ["Leaf after leaf of the fine gold he brought to the poor, and the children’s faces grew rosier, and they laughed and played games in the street. “We have bread now!” they cried.", // 111
   "燕子/把/纯金/叶子/一片/接/一片/地/送给/穷人/。/孩子们/的/脸蛋/变得/红润/起来/，/他们/在/街上/又/笑/又/玩/。/“/我们/有/面包/吃/了/！/”/他们/叫/着/。",
   "穷孩子们有了面包，脸色红润，开心地玩。", "The poor children have bread now, and they laugh and play."],
  ["Then the snow came, and after the snow came the frost.", // 112
   "后来/下雪/了/，/下/完/雪/，/又/结/了/霜/。",
   "冬天真的来了，又下雪又结冰。", "Snow comes, and then the frost."],
  ["The streets looked as if they were made of silver, they were so bright and glistening; long icicles like crystal daggers hung down from the eaves of the houses, everybody went about in furs, and the little boys wore scarlet caps and skated on the ice.", // 113
   "街道/又/亮/又/闪/，/好像/是/银子/铺/成/的/；/长长的/冰柱/像/水晶/做/的/小刀/，/从/屋檐/上/垂下来/。/人人/都/穿着/毛皮大衣/出门/，/小男孩们/戴/着/鲜红/的/帽子/，/在/冰上/滑来滑去/。",
   "城里到处是冰雪，人们穿着厚衣服，孩子们在溜冰。", "The city is icy and sparkling; people wear furs and boys go skating."],
  ["The poor little Swallow grew colder and colder, but he would not leave the Prince, he loved him too well.", // 114
   "可怜/的/小燕子/越来越/冷/，/可是/他/不/愿意/离开/王子/，/他/太/爱/王子/了/。",
   "燕子冻得发抖，可是因为爱王子，还是不肯走。", "The swallow gets colder and colder, but he loves the Prince too much to leave."],
  ["He picked up crumbs outside the baker’s door when the baker was not looking and tried to keep himself warm by flapping his wings.", // 115
   "他/趁/面包师/不/注意/，/在/面包店/门口/捡/些/面包屑/吃/，/还/不停/地/拍打/翅膀/，/想/让/自己/暖和/一点/。",
   "燕子捡面包屑吃，拍拍翅膀取暖。", "He eats crumbs by the bakery and flaps his wings to keep warm."],
  ["But at last he knew that he was going to die. He had just strength to fly up to the Prince’s shoulder once more.", // 116
   "可是/最后/，/他/知道/自己/快要/死/了/。/他/只/剩下/一点/力气/，/最后/一次/飞/上/了/王子/的/肩膀/。",
   "燕子知道自己快死了，用最后的力气飞到王子肩上。", "He knows he is dying and flies to the Prince’s shoulder one last time."],
  ["“Goodbye, dear Prince!” he murmured, “will you let me kiss your hand?”", // 117
   "“/再见/了/，/亲爱的/王子/！/”/他/轻声/说/，/“/你/愿意/让/我/亲亲/你/的/手/吗/？/”",
   "燕子跟王子说再见，想亲一亲王子的手。", "He says goodbye and asks to kiss the Prince’s hand."],
  ["“I am glad that you are going to Egypt at last, little Swallow,” said the Prince, “you have stayed too long here; but you must kiss me on the lips, for I love you.”", // 118
   "“/我/真/高兴/你/终于/要/去/埃及/了/，/小燕子/，/”/王子/说/，/“/你/在/这里/待/得/太久/了/。/可是/你/要/亲亲/我/的/嘴唇/，/因为/我/爱/你/。/”",
   "王子以为燕子要去埃及，对他说「我爱你」。", "The Prince thinks he is leaving for Egypt and tells him, “I love you.”"],
  ["“It is not to Egypt that I am going,” said the Swallow. “I am going to the House of Death. Death is the brother of Sleep, is he not?”", // 119
   "“/我/要/去/的/不是/埃及/，/”/燕子/说/，/“/我/要/去/死亡之家/。/死亡/是/睡眠/的/兄弟/，/对不对/？/”",
   "燕子说他不是去埃及，而是快要死了。", "He is not going to Egypt; he is dying."],
  ["And he kissed the Happy Prince on the lips, and fell down dead at his feet.", // 120
   "他/亲/了/亲/快乐王子/的/嘴唇/，/就/掉/在/王子/脚下/，/死/了/。",
   "燕子亲了王子，然后死在王子的脚下。", "He kisses the Prince and falls dead at his feet."],
  ["At that moment a curious crack sounded inside the statue, as if something had broken. The fact is that the leaden heart had snapped right in two. It certainly was a dreadfully hard frost.", // 121
   "就/在/这时/，/雕像/里面/发出/一声/奇怪/的/响声/，/好像/有/什么/东西/碎/了/。/原来/，/王子/那/颗/铅/做/的/心/裂/成/了/两半/。/那天/的/霜冻/确实/冷/得/可怕/。",
   "燕子死了，王子的铅心也裂成了两半。", "When the swallow dies, the Prince’s lead heart breaks in two."],
  ["Early the next morning the Mayor was walking in the square below in company with the Town Councillors. As they passed the column he looked up at the statue: “Dear me! how shabby the Happy Prince looks!” he said.", // 122
   "第二天/一大早/，/市长/和/市议员们/一起/在/下面/的/广场/上/散步/。/走过/柱子/时/，/市长/抬头/看/了/看/雕像/：/“/哎呀/！/快乐王子/怎么/变得/这么/寒酸/！/”/他/说/。",
   "市长看见雕像，说它变得又破又旧。", "The Mayor sees the statue and says it looks shabby."],
  ["“How shabby indeed!” cried the Town Councillors, who always agreed with the Mayor; and they went up to look at it.", // 123
   "“/真是/太/寒酸/了/！/”/市议员们/嚷道/，/他们/总是/附和/市长/。/然后/，/他们/走上/前去/看/雕像/。",
   "议员们总是跟着市长说一样的话。", "The councillors always agree with whatever the Mayor says."],
  ["“The ruby has fallen out of his sword, his eyes are gone, and he is golden no longer,” said the Mayor; “in fact, he is little better than a beggar!”", // 124
   "“/他/剑/上/的/红宝石/掉/了/，/眼睛/也/没/了/，/身上/也/不再/是/金色/的/了/，/”/市长/说/，/“/说实话/，/他/跟/乞丐/也/差不多/了/！/”",
   "市长说，雕像没有宝石和金子，就像乞丐一样。", "Without jewels and gold, says the Mayor, he looks like a beggar."],
  ["“Little better than a beggar,” said the Town Councillors.", // 125
   "“/跟/乞丐/差不多/了/。/”/市议员们/也/跟着/说/。",
   "议员们又重复市长的话。", "The councillors repeat the Mayor’s words."],
  ["“And here is actually a dead bird at his feet!” continued the Mayor. “We must really issue a proclamation that birds are not to be allowed to die here.” And the Town Clerk made a note of the suggestion.", // 126
   "“/他/脚下/居然/还有/一只/死鸟/！/”/市长/接着/说/，/“/我们/真/应该/发/个/公告/，/不许/鸟/死/在/这里/。/”/市政书记员/把/这个/建议/记/了/下来/。",
   "市长看见死去的燕子，竟然说要发公告不许鸟死在这里。", "The Mayor sees the dead bird and wants a rule against birds dying there."],
  ["So they pulled down the statue of the Happy Prince. “As he is no longer beautiful he is no longer useful,” said the Art Professor at the University.", // 127
   "于是/，/他们/把/快乐王子/的/雕像/拆/了/下来/。/“/他/既然/不再/美丽/，/也/就/不再/有用/了/。/”/大学/里/的/美术/教授/说/。",
   "雕像被拆了，教授说不美的东西就没有用。", "They pull down the statue; a professor says it is useless now that it isn’t beautiful."],
  ["Then they melted the statue in a furnace, and the Mayor held a meeting of the Corporation to decide what was to be done with the metal. “We must have another statue, of course,” he said, “and it shall be a statue of myself.”", // 128
   "他们/把/雕像/放进/熔炉/里/熔化/了/。/市长/召开/市政会议/，/商量/怎么/处理/这些/金属/。/“/当然/，/我们/要/再/立/一座/雕像/，/”/他/说/，/“/就/立/我/自己/的/雕像/吧/。/”",
   "雕像被熔化了，市长想给自己做一座雕像。", "They melt the statue, and the Mayor wants a new statue of himself."],
  ["“Of myself,” said each of the Town Councillors, and they quarrelled. When I last heard of them they were quarrelling still.", // 129
   "“/立/我/的/雕像/！/”/每个/市议员/都/这么/说/，/于是/他们/吵/了/起来/。/我/最后/一次/听到/他们/的/消息/时/，/他们/还/在/吵/呢/。",
   "每个议员都想要自己的雕像，吵个不停。", "Every councillor wants his own statue, and they are still arguing."],
  ["“What a strange thing!” said the overseer of the workmen at the foundry. “This broken lead heart will not melt in the furnace. We must throw it away.” So they threw it on a dust-heap where the dead Swallow was also lying.", // 130
   "“/真/奇怪/！/”/铸造厂/的/工头/说/，/“/这/颗/破裂/的/铅心/在/熔炉/里/怎么/也/熔化/不了/。/我们/只好/把/它/扔掉/。/”/于是/，/他们/把/它/扔/在/垃圾堆/上/，/死去/的/燕子/也/躺/在/那里/。",
   "王子的铅心熔化不了，被扔到垃圾堆上，和燕子在一起。", "The lead heart won’t melt, so it is thrown on the rubbish heap beside the swallow."],
  ["“Bring me the two most precious things in the city,” said God to one of His Angels; and the Angel brought Him the leaden heart and the dead bird.", // 131
   "“/把/城里/最/宝贵/的/两样/东西/带来/给/我/。/”/上帝/对/祂/的/一位/天使/说/。/天使/就/把/那/颗/铅心/和/那只/死去/的/鸟/带到/了/上帝/面前/。",
   "上帝要城里最宝贵的东西，天使带来了铅心和燕子。", "God asks for the two most precious things, and the angel brings the heart and the bird."],
  ["“You have rightly chosen,” said God, “for in my garden of Paradise this little bird shall sing for evermore, and in my city of gold the Happy Prince shall praise me.”", // 132
   "“/你/选/对/了/，/”/上帝/说/，/“/因为/在/我/天堂/的/花园/里/，/这只/小鸟/将/永远/歌唱/；/在/我/的/黄金之城/里/，/快乐王子/将/赞美/我/。/”",
   "上帝说，小鸟会在天堂的花园里永远歌唱，快乐王子会在黄金之城里赞美祂。", "God says the little bird will sing in Paradise forever, and the Prince will praise Him in the city of gold."],
];

// Unit n is units[n - 1].
export const units = lines.map(([en, zh, explainZh, explainEn]) => ({
  en,
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
}));
