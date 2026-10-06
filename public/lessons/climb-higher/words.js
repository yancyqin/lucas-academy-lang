// Every word in 看得见的诗 · 第一期, explained for these poems, in reading order.
// [词, pinyin, English gloss, 用简单的话解释, picture concept or null, English words that point here]
// Pinyin follows the textbooks: 轻声 is marked, 一 and 不 change tone inside a
// word, and a single 一 or 不 keeps its dictionary tone. The psalm's English
// is fetched, so its words point here too (lift, mountains, maker …).
export const words = [
  ["白日", "bái rì", "the bright sun", "白天的太阳；诗里说太阳亮得发白。", null, ["sun", "white"]],
  ["依", "yī", "lean on; go along", "靠着。「依山」就是挨着山。", null, ["behind"]],
  ["山", "shān", "mountain; hill", "地面上高高隆起的地方。", null, ["hills", "mountains"]],
  ["尽", "jìn", "come to an end; disappear", "完了，没有了；这里说太阳落到山后面去了。", null, ["sinks"]],
  ["黄河", "huáng hé", "the Yellow River", "中国第二长的河。河水带着很多黄土，所以是黄色的。", null, ["yellow"]],
  ["入", "rù", "enter; flow into", "进入，进去。", null, ["into"]],
  ["海", "hǎi", "sea", "很大很大的一片咸水。", null, ["sea"]],
  ["流", "liú", "flow", "水往前移动。", null, ["flows"]],
  ["欲", "yù", "want to", "想要。古诗里常用这个字。", null, ["want"]],
  ["穷", "qióng", "go to the very end of", "这里不是「没有钱」，是「一直看到最远的地方」。", null, []],
  ["千里", "qiān lǐ", "a thousand li; very far", "一千里，形容非常远。一里是五百米。", null, ["thousand", "miles"]],
  ["目", "mù", "eye; what the eye can see", "眼睛；这里指眼睛能看到的地方。", null, []],
  ["一层", "yì céng", "one floor; one storey", "楼房的一层。", null, ["one", "floor"]],
  ["楼", "lóu", "tower; building of several floors", "有好几层的房子，这里指鹳雀楼。", null, []],
  ["爬上", "pá shàng", "climb up", "用手和脚往上爬。", null, ["climb"]],
  ["樱桃树", "yīng táo shù", "cherry tree", "结樱桃的树，春天开白色或者粉色的花。", null, ["cherry"]],
  ["小小的", "xiǎo xiǎo de", "little; tiny", "很小很小的。", null, ["little"]],
  ["手", "shǒu", "hand", "用来拿东西的身体部分。", null, ["hands"]],
  ["抱紧", "bào jǐn", "hold tight", "用手臂紧紧地抱住。", null, ["held"]],
  ["树干", "shù gàn", "tree trunk", "树又粗又直的主干，树枝从它上面长出来。", null, ["trunk"]],
  ["远远", "yuǎn yuǎn", "far away", "很远很远。", null, ["abroad"]],
  ["望着", "wàng zhe", "look out at", "朝远处看着。", null, ["looked"]],
  ["外面", "wài mian", "outside", "在外边。", null, []],
  ["世界", "shì jiè", "the world", "地球上所有的地方。", null, ["foreign", "lands"]],
  ["找到", "zhǎo dào", "find", "找了以后得到。", null, ["find"]],
  ["高", "gāo", "high; tall", "从下到上距离大。", null, []],
  ["树", "shù", "tree", "有树干、树枝和树叶的植物。", null, ["tree"]],
  ["看得", "kàn de", "be able to see (so far)", "「看得远」就是能看到很远的地方。", null, ["see"]],
  ["远", "yuǎn", "far", "距离大，不近。", null, ["farther"]],
  ["看到", "kàn dào", "see", "用眼睛看见。", null, []],
  ["长大", "zhǎng dà", "grow up", "慢慢变大；这里说小河越流越大，像长大了一样。", null, ["grown-up"]],
  ["河", "hé", "river", "一大股流动的水。", null, ["river"]],
  ["悄悄", "qiāo qiāo", "quietly", "没有声音地，不让人发觉。", null, ["slips"]],
  ["流进", "liú jìn", "flow into", "流到里面去。", null, []],
  ["大海", "dà hǎi", "the sea", "很大很大的海。", null, []],
  ["流到", "liú dào", "flow to", "流到某个地方。", null, []],
  ["大船", "dà chuán", "large ship", "很大的船。", null, ["ships"]],
  ["中间", "zhōng jiān", "among; in the middle", "两样东西的当中，或者一群东西的当中。", null, ["among"]],
  ["举目", "jǔ mù", "lift up one’s eyes", "抬起眼睛往上看。", null, ["lift", "eyes"]],
  ["帮助", "bāng zhù", "help", "帮别人做事，让他轻松一点。", null, ["help"]],
  ["从何而来", "cóng hé ér lái", "where … comes from", "从哪里来。", null, ["come"]],
  ["造", "zào", "make; create", "把东西做出来；这里说上帝创造。", null, ["maker", "made"]],
  ["天地", "tiān dì", "heaven and earth", "天和地，整个世界。", null, ["heaven", "earth"]],
  ["耶和华", "yē hé huá", "the LORD", "圣经里上帝的名字。", null, ["lord"]],
  ["而来", "ér lái", "comes (from)", "「从……而来」就是从……来。", null, ["comes"]],
];

// Small words that hold the lines together.
export const connectors = [
  ["更", "gèng", "even more (higher, farther)", "比原来还要……，像「更高」「更远」。", null, ["higher"]],
  ["上", "shàng", "go up; on", "往上走；也指在上面。", null, ["up"]],
  ["是", "shì", "is; am; are", "说明是什么、怎么样。", null, []],
  ["谁", "shéi", "who", "问是哪个人。", null, ["who"]],
  ["了", "le", "(it has happened)", "放在后面，表示事情已经发生，或者有了变化。", null, []],
  ["就是", "jiù shì", "it is just; it is exactly", "正是。", null, []],
  ["我", "wǒ", "I; me", "说话的人自己。", null, []],
  ["用", "yòng", "use; with", "使用；也表示「拿……来」。", null, []],
  ["两只", "liǎng zhī", "two (hands, eyes, birds …)", "两个，用来数手、眼睛、鸟等。", null, ["both"]],
  ["地", "de", "(-ly)", "放在形容的词后面，说明怎样做，像「远远地望着」。", null, []],
  ["的", "de", "of; ’s", "把两个词连起来，像「我的帮助」。", null, []],
  ["要是", "yào shi", "if", "如果。", null, ["if"]],
  ["能", "néng", "can", "有本事做到。", null, ["could"]],
  ["就", "jiù", "then; just", "表示马上，或者正是。", null, []],
  ["一直", "yì zhí", "all the way", "从这里一直到那里，不停下来。", null, []],
  ["那条", "nà tiáo", "that (river, road)", "指那一条，像「那条河」。", null, []],
  ["要", "yào", "want; will", "想得到；也表示将要。", null, []],
  ["向", "xiàng", "toward", "朝着。", null, []],
  ["从", "cóng", "from", "表示从哪里开始。", null, ["from"]],
];

// Words a child may tap that are not in the text itself.
export const extra = [
];
