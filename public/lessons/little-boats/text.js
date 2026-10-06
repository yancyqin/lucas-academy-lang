// 看得见的诗 · 第二期《小船去远方》· Poems You Can See, No. 2.
// Three works that see the same picture: going far, and strength for the way.
//   《早发白帝城》唐 · 李白 — public domain; English by Lucas Academy.
//   Robert Louis Stevenson, “Where Go the Boats?” (A Child’s Garden of
//   Verses, 1885) — public domain, as in Project Gutenberg eBook #136; Chinese
//   by Lucas Academy.
//   以赛亚书 40:31 — 和合本 (public domain; 1919 text 「从新得力」). Its English
//   (NIV) is licensed: the unit names its verse (ref) and the Worker fetches
//   the text, so it is never in this repository.
// A poem keeps its lines: "\n" is a token of its own in the Chinese and a line
// break in the English. Words are pre-segmented; punctuation is its own token.
// 还 here is huán (return), so the Chinese avoids 还 hái anywhere else.
//
// Each unit: [English (or {ref}), 中文, 用简单的话理解, In simple words]
const lines = [
  // 《早发白帝城》
  ["At dawn I leave Baidi among the coloured clouds,\nAnd reach Jiangling, a thousand miles away, in a single day.", // 1
   "朝/辞/白帝/彩云/间/，/\n/千里/江陵/一日/还/。",
   "清早，李白离开高高的白帝城，一天就坐船到了很远的江陵。", "At dawn Li Bai leaves Baidi high in the clouds and reaches faraway Jiangling by boat in one day."],
  ["On both banks the monkeys call and never stop,\nAnd my light boat has passed ten thousand mountains.", // 2
   "两岸/猿声/啼不住/，/\n/轻舟/已过/万重山/。",
   "两岸的猴子叫个不停，小船飞快地穿过了一座又一座大山。", "Monkeys call from both banks as the little boat speeds past mountain after mountain."],
  // “Where Go the Boats?”
  ["Dark brown is the river,\nGolden is the sand.\nIt flows along for ever,\nWith trees on either hand.", // 3
   "河水/是/深深的/棕色/，/\n/沙滩/是/亮亮的/金色/。/\n/河水/流/啊/流/，/永远/不停/，/\n/两岸/都/是/大树/。",
   "棕色的河，金色的沙滩，两岸都是树。", "A brown river, golden sand, and trees on both banks."],
  ["Green leaves a-floating,\nCastles of the foam,\nBoats of mine a-boating—\nWhere will all come home?", // 4
   "绿叶/在/水/上/漂/，/\n/泡沫/堆成/了/城堡/，/\n/我/的/小船/也/在/漂/——/\n/它们/最后/会/漂/到/哪里/？",
   "绿叶、泡沫和我的小船，都在河上漂。它们会漂到哪里去呢？", "Leaves, foam and my little boats all float down the river. Where will they end up?"],
  ["On goes the river\nAnd out past the mill,\nAway down the valley,\nAway down the hill.", // 5
   "河水/一直/往前/流/，/\n/流过/了/磨坊/，/\n/流下/了/山谷/，/\n/流下/了/山坡/。",
   "河水不停地往前流，流过磨坊，流下山谷和山坡。", "The river keeps going: past the mill, down the valley and down the hill."],
  ["Away down the river,\nA hundred miles or more,\nOther little children\nShall bring my boats ashore.", // 6
   "顺着/河水/漂/下去/，/\n/漂出/一百多/英里/，/\n/别的/小朋友/\n/会/把/我/的/小船/捞/上岸/。",
   "小船漂到很远很远的地方，别的孩子会把它捞起来。", "Far, far away, other children will pull my boats out of the water."],
  // 以赛亚书 40:31
  [{ref: 'ISA.40.31'}, // 7
   "但/那/等候/耶和华/的/必/从新/得力/。/他们/必/如/鹰/展翅/上腾/；/他们/奔跑/却/不困倦/，/行走/却/不疲乏/。",
   "等候耶和华的人会得到新的力气：像老鹰一样飞上高空，跑也不累，走也不倦。", "Those who wait for the LORD get new strength: they rise like eagles, run without getting tired, and walk without growing weak."],
];

// Unit n is units[n - 1]: its English ({en}) or the verse to fetch ({ref}).
export const units = lines.map(([english, zh, explainZh, explainEn]) => ({
  ...(typeof english === 'string' ? {en: english} : english),
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
}));
