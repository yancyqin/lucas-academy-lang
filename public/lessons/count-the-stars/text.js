// 看得见的诗 · 第五期《星星数得完吗？》· Poems You Can See, No. 5.
// Three works under the same night full of stars:
//   《夜宿山寺》唐 · 李白 — public domain; English by Lucas Academy.
//   Jane Taylor, “The Star” (Rhymes for the Nursery, 1806) — public domain, as
//   the 1831 edition prints it in Project Gutenberg eBook #77549 (“trav’ller”,
//   “As your bright and tiny spark”); Chinese by Lucas Academy.
//   创世记 15:5–6 — 和合本 (public domain). Its English (NIV) is licensed: the
//   units name their verse (ref) and the Worker fetches the text, so it is
//   never in this repository.
// A poem keeps its lines: "\n" is a token of its own in the Chinese and a line
// break in the English. Words are pre-segmented; punctuation is its own token.
//
// Each unit: [English (or {ref}), 中文, 用简单的话理解, In simple words]
const lines = [
  // 《夜宿山寺》
  ["The tower on the mountain is a hundred feet high;\nfrom here my hand could pick the stars.", // 1
   "危楼/高/百尺/，/\n/手/可/摘/星辰/。",
   "山上的楼非常高，好像一伸手就能摘到天上的星星。", "The tower on the mountain is so tall that it seems you could reach out and pick the stars."],
  ["I dare not speak in a loud voice,\nfor fear of startling the people in the sky.", // 2
   "不敢/高声/语/，/\n/恐/惊/天上/人/。",
   "我不敢大声说话，怕吵到住在天上的人。", "I don’t dare to talk loudly, in case I disturb the people who live in the sky."],
  // “The Star”: one stanza a unit
  ["Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.", // 3
   "一闪一闪/，/小/星星/，/\n/我/真/想/知道/你/是/什么/！/\n/高高/挂/在/世界/上空/，/\n/像/天上/的/一颗/钻石/。",
   "小星星一闪一闪的，挂在很高很高的天上，像一颗钻石。我真想知道它是什么。", "The little star twinkles high above the world like a diamond, and I really want to know what it is."],
  ["When the blazing sun is gone,\nWhen he nothing shines upon,\nThen you show your little light,\nTwinkle, twinkle, all the night.", // 4
   "火热/的/太阳/落下去/，/\n/什么/也/不再/照亮/的/时候/，/\n/你/就/亮出/你/小小/的/光/，/\n/一闪一闪/，/亮/一整夜/。",
   "火热的太阳下山了，星星就亮出小小的光，一闪一闪，亮一整夜。", "When the hot sun has gone down, the star shows its little light and twinkles all night long."],
  ["Then the trav’ller in the dark,\nThanks you for your tiny spark:\nHe could not see which way to go,\nIf you did not twinkle so.", // 5
   "黑夜/里/赶路/的/人/，/\n/谢谢/你/这/一点/小小/的/亮光/：/\n/他/会/看不清/往/哪里/走/，/\n/要是/你/不/这样/一闪一闪/。",
   "黑夜里走路的人谢谢星星：要是星星不亮，他就不知道该往哪里走。", "Someone walking at night thanks the star: without its light, he would not know which way to go."],
  ["In the dark blue sky you keep,\nAnd often through my curtains peep,\nFor you never shut your eye\nTill the sun is in the sky.", // 6
   "你/守/在/深蓝/的/夜空/，/\n/常常/隔着/我/的/窗帘/偷偷/看/，/\n/因为/你/从来/不/闭上/眼睛/，/\n/直到/太阳/升上/天空/。",
   "星星一直待在深蓝的夜空里，常常隔着窗帘偷偷看我；它整夜不闭眼睛，一直到太阳出来。", "The star stays in the dark blue sky and often peeks at me through my curtains; it never closes its eye until the sun comes up."],
  ["As your bright and tiny spark\nLights the trav’ller in the dark,\nThough I know not what you are,\nTwinkle, twinkle, little star.", // 7
   "你/明亮/又/小小/的/光/，/\n/照着/黑夜/里/赶路/的/人/，/\n/虽然/我/不/知道/你/是/什么/，/\n/一闪一闪/，/小/星星/。",
   "星星小小的光照着黑夜里走路的人。我还是不知道星星是什么，可是它一直一闪一闪地亮着。", "The star’s small bright light shines on people walking in the dark. I still don’t know what it is, but it keeps on twinkling."],
  // 创世记 15:5–6
  [{ref: 'GEN.15.5'}, // 8
   "于是/领/他/走到/外边/，/说/：/「/你/向/天/观看/，/数算/众/星/，/能/数/得/过来/吗/？/」/又/对/他/说/：/「/你/的/后裔/将要/如此/。/」",
   "神带亚伯兰到外面，叫他抬头数天上的星星：数得完吗？神说：你的子孙也会这么多。", "God took Abram outside and told him to look up and count the stars — could he count them all? God said: your family will be that many."],
  [{ref: 'GEN.15.6'}, // 9
   "亚伯兰/信/耶和华/，/耶和华/就/以/此/为/他/的/义/。",
   "亚伯兰相信神的应许，神就看他是对的。", "Abram believed God’s promise, and God counted him as right."],
];

// Unit n is units[n - 1]: its English ({en}) or the verse to fetch ({ref}).
export const units = lines.map(([english, zh, explainZh, explainEn]) => ({
  ...(typeof english === 'string' ? {en: english} : english),
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
}));
