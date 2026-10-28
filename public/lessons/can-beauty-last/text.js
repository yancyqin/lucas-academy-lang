// 看得见的诗 · 第三期《美好能否留存？》· Poems You Can See, No. 3.
// Three works that ask whether something beautiful can last:
//   《春夜喜雨》唐 · 杜甫 — public domain; English by Lucas Academy.
//   William Shakespeare, Sonnet 18 (1609) — public domain, as the Folger
//   Shakespeare Library prints it; Chinese and the modern English by Lucas Academy.
//   传道书 3:11 — 和合本 (public domain). Its English (NIV) is licensed: the
//   unit names its verse (ref) and the Worker fetches the text, so it is
//   never in this repository.
// A poem keeps its lines: "\n" is a token of its own in the Chinese and a line
// break in the English. Words are pre-segmented; punctuation is its own token.
// For the sonnet, "In simple words" is the poem in modern English.
//
// Each unit: [English (or {ref}), 中文, 用简单的话理解, In simple words]
const lines = [
  // 《春夜喜雨》
  ["The good rain knows its season:\nwhen spring comes, it begins to fall.", // 1
   "好雨/知/时节/，/\n/当/春/乃/发生/。",
   "好雨好像知道季节，春天一到，它就下起来了。", "The good rain seems to know when to come: as soon as spring arrives, it starts to fall."],
  ["It slips in with the wind by night,\nand soaks all things, fine and silent.", // 2
   "随/风/潜入/夜/，/\n/润/物/细/无声/。",
   "雨跟着风，悄悄在夜里来了，细细地滋润万物，一点声音也没有。", "The rain follows the wind into the night and quietly waters everything without a sound."],
  ["The country paths and the clouds are all dark;\nonly a boat’s lamp on the river glows.", // 3
   "野径/云/俱/黑/，/\n/江船/火/独/明/。",
   "田野的小路和天上的云都是黑的，只有江上船里的灯火亮着。", "The paths in the fields and the clouds are all dark; only the light on a riverboat shines."],
  ["At dawn, look where it is red and wet:\nthe flowers hang heavy over Brocade City.", // 4
   "晓/看/红/湿/处/，/\n/花/重/锦官城/。",
   "天亮了，去看那些又红又湿的地方：满城的花沾着雨水，沉甸甸的。", "In the morning, look at the wet red places: the flowers all over Chengdu are heavy with rain."],
  // Sonnet 18
  ["Shall I compare thee to a summer’s day?\nThou art more lovely and more temperate.", // 5
   "我/能/把/你/比作/夏天/的/一日/吗/？/\n/你/比/它/更/可爱/，/也/更/温和/。",
   "诗人想把一个人比作夏天，可是这个人比夏天还可爱，还温和。", "Shall I compare you to a summer’s day? You are lovelier, and milder too."],
  ["Rough winds do shake the darling buds of May,\nAnd summer’s lease hath all too short a date.", // 6
   "粗野/的/风/，/摇晃/着/五月/心爱/的/花苞/，/\n/夏天/借来/的/日子/，/太快/就/到/了/期限/。",
   "夏天有大风，会吹坏花苞；夏天像借来的，很快就要还回去。", "Rough winds shake the darling buds of May, and summer’s time is only borrowed — it ends too soon."],
  ["Sometime too hot the eye of heaven shines,\nAnd often is his gold complexion dimmed;", // 7
   "有时候/，/天空/的/眼睛/照/得/太/热/，/\n/它/金色/的/脸/，/也/常常/躲进/云/里/；",
   "天空的眼睛就是太阳。太阳有时太热，有时又被云挡住。", "Sometimes the sun, the eye of heaven, shines too hot, and often its golden face is dimmed by clouds;"],
  ["And every fair from fair sometime declines,\nBy chance or nature’s changing course untrimmed.", // 8
   "每/一样/美好/的/事物/，/总/有一天/会/失去/美好/，/\n/被/意外/，/或/被/自然/的/变化/，/剥去/光彩/。",
   "世上美好的东西，迟早会变旧、变老，不再那么美。", "and every beautiful thing loses its beauty in time, stripped bare by chance or by nature’s changing course."],
  ["But thy eternal summer shall not fade\nNor lose possession of that fair thou ow’st;", // 9
   "可是/你/永远/的/夏天/，/不会/褪色/，/\n/你/拥有/的/美/，/也/不会/被/夺走/；",
   "可是你的美，像一个永远不会结束的夏天。", "But your eternal summer will not fade, nor will you lose the beauty that you own;"],
  ["Nor shall Death brag thou wand’rest in his shade,\nWhen in eternal lines to time thou grow’st.", // 10
   "死亡/也/不能/夸口/，/说/你/在/他/的/阴影/里/徘徊/，/\n/因为/你/住进/了/永远/的/诗行/，/和/时间/一起/生长/。",
   "死亡不能把你带走，因为你被写进了诗里，一直活下去。", "nor will Death boast that you wander in his shadow, because in these lines that last forever, you grow on through time."],
  ["So long as men can breathe or eyes can see,\nSo long lives this, and this gives life to thee.", // 11
   "只要/世上/还/有/人/呼吸/，/还/有/眼睛/在/看/，/\n/这/首/诗/就/活/着/，/也/让/你/一直/活/着/。",
   "只要还有人读这首诗，这首诗就活着，诗里的人也活着。", "As long as people can breathe, or eyes can see, this poem lives, and it gives life to you."],
  // 传道书 3:11
  [{ref: 'ECC.3.11'}, // 12
   "神/造/万物/，/各/按/其/时/成为/美好/，/又/将/永生/安置/在/世人/心/里/。/然而/神/从/始/至/终/的/作为/，/人/不能/参透/。",
   "神让每样东西在合适的时候变得美好，还把「永远」放在人的心里。可是神做的事，人不能全部明白。", "God makes everything beautiful at the right time, and puts a longing for forever in people’s hearts. But we cannot understand all that God does."],
];

// Unit n is units[n - 1]: its English ({en}) or the verse to fetch ({ref}).
export const units = lines.map(([english, zh, explainZh, explainEn]) => ({
  ...(typeof english === 'string' ? {en: english} : english),
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
}));
