// 看得见的诗 · 第四期《谁看见过风？》· Poems You Can See, No. 4.
// Three works with the same wind blowing over the grass:
//   《赋得古原草送别》唐 · 白居易 — public domain; English by Lucas Academy.
//   Robert Louis Stevenson, “The Wind” (A Child’s Garden of Verses, 1885) —
//   public domain, as in Project Gutenberg eBook #136; Chinese by Lucas Academy.
//   约翰福音 3:8 — 和合本 (public domain; it writes 那里 for 哪里). Its English
//   (NIV) is licensed: the unit names its verse (ref) and the Worker fetches
//   the text, so it is never in this repository.
// A poem keeps its lines: "\n" is a token of its own in the Chinese and a line
// break in the English. Words are pre-segmented; punctuation is its own token.
// The Wind's refrain is sung three times, so units 6, 8 and 10 are the same.
//
// Each unit: [English (or {ref}), 中文, 用简单的话理解, In simple words]
const REFRAIN = "O wind, a-blowing all day long,\nO wind, that sings so loud a song!";
const REFRAIN_ZH = "风/啊/，/你/整天/吹/个/不停/，/\n/风/啊/，/你/唱/的/歌/那么/响亮/！";
const lines = [
  // 《赋得古原草送别》
  ["Thick and long, the grass on the plain\nwithers and grows green once every year.", // 1
   "离离/原/上/草/，/\n/一岁/一/枯/荣/。",
   "原野上的草长得又密又长，每年枯黄一次，又变绿一次。", "The grass on the open plain grows thick and long; every year it dries up, and every year it turns green again."],
  ["Wildfire burns it, but cannot burn it all;\nthe spring wind blows, and it grows again.", // 2
   "野火/烧/不尽/，/\n/春风/吹/又/生/。",
   "野火把草烧光了，可是烧不掉它的根；春风一吹，草又长出来了。", "A wildfire burns the grass away, but not its roots; when the spring wind blows, it grows back."],
  ["Its fragrance spreads far over the old road;\nits sunlit green runs up to the ruined town.", // 3
   "远/芳/侵/古道/，/\n/晴/翠/接/荒城/。",
   "青草一直长到很远的古路上，太阳下绿油油的草，连着荒凉的旧城。", "The grass spreads far over the old road, and its green, bright in the sun, reaches the empty old town."],
  ["Once more I see a friend off on his way;\nthe thick green grass is full of goodbye.", // 4
   "又/送/王孙/去/，/\n/萋萋/满/别情/。",
   "我又在这里送朋友走了，满地茂盛的草，好像也装满了离别的心情。", "Here I say goodbye to a friend again; the thick grass everywhere seems full of the sadness of parting."],
  // “The Wind”: each stanza's four lines, then its refrain
  ["I saw you toss the kites on high\nAnd blow the birds about the sky;\nAnd all around I heard you pass,\nLike ladies’ skirts across the grass—", // 5
   "我/看见/你/把/风筝/抛/上/高空/，/\n/把/小鸟/吹/得/满天/飞/；/\n/我/听见/你/从/四周/走过/，/\n/像/女士/们/的/裙子/拂过/草地/——",
   "风把风筝送上高高的天空，把小鸟吹得到处飞；风从身边走过，沙沙地响，像长裙子轻轻擦过草地。", "The wind throws kites up high and blows the birds all over the sky; it rustles all around, like long skirts brushing over the grass."],
  [REFRAIN, REFRAIN_ZH, // 6
   "诗人叫风：风啊，你一整天都在吹，还唱着很响的歌！", "The poet calls to the wind: you blow all day long, and you sing such a loud song!"],
  ["I saw the different things you did,\nBut always you yourself you hid.\nI felt you push, I heard you call,\nI could not see yourself at all—", // 7
   "我/看见/你/做/的/各种/事/，/\n/可是/你/自己/总是/藏/起来/。/\n/我/感觉到/你/在/推/，/我/听见/你/在/喊/，/\n/可/我/一点/也/看不见/你/——",
   "风做的事都看得见：它推我，它叫我；可是风自己总是藏起来，我一点也看不见它。", "You can see everything the wind does — it pushes and it calls — but the wind itself always hides, and I cannot see it at all."],
  [REFRAIN, REFRAIN_ZH, // 8
   "诗人又叫了一次：风啊，你一整天都在吹，还唱着很响的歌！", "The poet calls again: you blow all day long, and you sing such a loud song!"],
  ["O you that are so strong and cold,\nO blower, are you young or old?\nAre you a beast of field and tree,\nOr just a stronger child than me?", // 9
   "你/啊/，/这么/有力/，/又/这么/冷/，/\n/吹风/的/你/啊/，/你/是/年轻/还是/年老/？/\n/你/是/田野/和/树林/里/的/野兽/吗/？/\n/还是/一个/比/我/力气/大/的/孩子/？",
   "风又大又冷。诗人问风：你是年轻的还是年老的？你是田野和树林里的野兽，还是一个比我力气大的孩子？", "The wind is strong and cold. The poet asks it: are you young or old? Are you a wild animal of the fields and woods, or just a child who is stronger than me?"],
  [REFRAIN, REFRAIN_ZH, // 10
   "诗人最后一次叫风：风啊，你一整天都在吹，还唱着很响的歌！", "The poet calls one last time: you blow all day long, and you sing such a loud song!"],
  // 约翰福音 3:8
  [{ref: 'JHN.3.8'}, // 11
   "风/随着/意思/吹/，/你/听见/风/的/响声/，/却/不/晓得/从/那里/来/，/往/那里/去/；/凡/从/圣灵/生/的/，/也/是/如此/。",
   "风想往哪里吹，就往哪里吹；你听得见风声，却不知道它从哪里来，到哪里去。被圣灵带来新生命的人，也是这样。", "The wind blows wherever it wants; you hear it, but you can’t tell where it comes from or where it goes. It is the same with everyone the Holy Spirit gives new life."],
];

// Unit n is units[n - 1]: its English ({en}) or the verse to fetch ({ref}).
export const units = lines.map(([english, zh, explainZh, explainEn]) => ({
  ...(typeof english === 'string' ? {en: english} : english),
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
}));
