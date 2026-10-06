// 看得见的诗 · 第一期《爬高一点，看远一点》· Poems You Can See, No. 1.
// Three works that see the same picture: climbing higher to look farther.
//   《登鹳雀楼》唐 · 王之涣 — public domain; English by Lucas Academy.
//   Robert Louis Stevenson, “Foreign Lands” (A Child’s Garden of Verses, 1885),
//   stanzas 1 and 4 — public domain, as in Project Gutenberg eBook #136
//   (“looked abroad in foreign lands”); Chinese by Lucas Academy.
//   诗篇 121:1–2 — 和合本 (public domain). Its English (NIV) is licensed: the
//   units name their verse (ref) and the Worker fetches the text, so it is
//   never in this repository.
// A poem keeps its lines: "\n" is a token of its own in the Chinese and a line
// break in the English. Words are pre-segmented; punctuation is its own token.
//
// Each unit: [English (or {ref}), 中文, 用简单的话理解, In simple words]
const lines = [
  // 《登鹳雀楼》
  ["The white sun sinks behind the hills,\nThe Yellow River flows into the sea.", // 1
   "白日/依/山/尽/，/\n/黄河/入/海/流/。",
   "太阳靠着山慢慢落下去，黄河一直流进大海。", "The sun goes down behind the mountains, and the Yellow River runs all the way to the sea."],
  ["If you want to see a thousand miles away,\nClimb up one floor higher.", // 2
   "欲/穷/千里/目/，/\n/更/上/一层/楼/。",
   "想看到更远的地方，就再往上爬一层楼。", "To see even farther, climb one floor higher."],
  // “Foreign Lands”, stanzas 1 and 4
  ["Up into the cherry tree\nWho should climb but little me?", // 3
   "是/谁/爬上/了/樱桃树/？/\n/就是/小小的/我/！",
   "一个小孩子爬到了樱桃树上。", "A small child climbs up into a cherry tree."],
  ["I held the trunk with both my hands\nAnd looked abroad in foreign lands.", // 4
   "我/用/两只/手/抱紧/树干/，/\n/远远/地/望着/外面/的/世界/。",
   "小孩子抱紧树干，往很远的地方看。", "The child holds on tight and looks far away."],
  ["If I could find a higher tree\nFarther and farther I should see,", // 5
   "要是/能/找到/更/高/的/树/，/\n/我/就/能/看得/更/远/，/更/远/，",
   "树越高，看得就越远。", "The higher the tree, the farther you can see."],
  ["To where the grown-up river slips\nInto the sea among the ships.", // 6
   "一直/看到/那条/长大/了/的/河/，/\n/悄悄/流进/大海/，/流到/大船/中间/。",
   "再高一点，就能看见大河流进大海，流到大船中间。", "A little higher, and you could see the big river slip into the sea among the ships."],
  // 诗篇 121:1–2
  [{ref: 'PSA.121.1'}, // 7
   "我/要/向/山/举目/；/我/的/帮助/从何而来/？",
   "抬头看着高山，心里问：谁能帮助我？", "Looking up at the mountains, I ask: who will help me?"],
  [{ref: 'PSA.121.2'}, // 8
   "我/的/帮助/从/造/天地/的/耶和华/而来/。",
   "帮助我的，是造天造地的耶和华。", "My help comes from the LORD, who made heaven and earth."],
];

// Unit n is units[n - 1]: its English ({en}) or the verse to fetch ({ref}).
export const units = lines.map(([english, zh, explainZh, explainEn]) => ({
  ...(typeof english === 'string' ? {en: english} : english),
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
}));
