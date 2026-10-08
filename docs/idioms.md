# 成语课文的契约 · Idiom lessons

一「辑」成语是一篇课文（`kind: 'idioms'`），一个成语是一小段，每个成语配一点圣经：相似、相反或相关的视角。两辑由不同的作者按同一份契约做：`idioms-1`（成语 · 第一辑）和 `idioms-2`（成语 · 第二辑），都放在「成语」分类里。做完 `npm run validate` 必须 PASS，`npm run check:english` 必须通过（要开 `npm run dev`）。

读者是三年级左右的孩子，中英文都是本项目写的短句，一句对一句。

## 文件

```text
public/lessons/idioms-1/
  index.js   # 课文对象：sections（每个成语一小段）、verses、study、dict、aliases
  text.js    # 单元：成语、小故事、经文
  study.js   # 每个单元一道双语问题
  words.js   # 词典：课文里每一个中文词，以及英文词的对应
```

另外改三处：

1. `public/lessons/index.js` 的 registry 加一行，`category: 'idiom'`：
   `{id: 'idioms-1', category: 'idiom', title: {zh: '成语 · 第一辑', en: 'Idioms · Set 1'}, load: () => import('./idioms-1/index.js')}`
2. `public/lessons/passages.js` 登记用到的每一处经文（`'ISA.55': [9, 9]` 这样）。不连续的节用多段范围，如 `'MAT.5': [[34, 34], [37, 37], [44, 45]]`，不扩大范围来包含未选的节。Worker 只提供登记过的经文。
3. README 的课文列表加一段说明（成语来源、经文版本）。

不要动别的课文；不要把 NIV 英文写进仓库（经文单元只写 `ref`）。文字稿默认不配音，没有录音的句子自动用设备声音，标「系统试听」。主人在 2026-10-07 指定第一辑只给成语名称配音：中文 fangfang、英文 Louise，中英各 10 条；小故事和圣经经文暂不配音。第二辑先评阅文字稿。

## 每个成语的单元（一小段最多 7 个单元）

| 单元 | 内容 | 英文 |
| --- | --- | --- |
| 1 | 成语本身。`tokens` 按词典分词（如 `井底/之/蛙`），`en` 是自然的英文（不是逐字），`explain` 一句话说现在用它是什么意思 | 课文自带（`en`） |
| 2–4 | 小故事或出处，2 到 3 句，每句一个单元。孩子能读的中文，英文为本项目改写 | 课文自带（`en`） |
| 故事之后 | 经文 1 到 3 节，每节一个单元：`{ref: 'ISA.55.9'}`，`tokens` 是和合本分词，`angle` 是视角，`explain` 说明这节经文怎么看这个成语 | Worker 取 NIV，不进仓库 |

- `angle` 取 `'similar'`（相似）、`'opposite'`（相反）或 `'related'`（相关）之一；页面上显示成一个小标签。经文解释要照顾上下文，把联系落在人的内心、与神的关系和回应上。
- 一小段可以选不同章节或不连续的节；同章相邻的节合成一次请求，其余分别请求，全部成功才显示该段的英文经文。一诺千金用申命记 31:8 看神可靠的应许，用马太福音 5:34、37 看人的诚实，形成两个辅助阅读视角。
- 单元的 `id` 和小段的 `id` 保持稳定，`n` 和 `range` 表示当前顺序。调整经文数量后，已保存的笔记、学习进度和已有配音仍指向原来的内容。
- 中文经文用 1919 年公版和合本，按 <https://b.ibible.hk/> 核对字句（不能用新标点和合本的改动，如「从新得力」不是「重新」）。
- 分词、拼音照课本写法：标轻声，词内的「一」「不」变调，单独的「一」「不」用原调；只有一种读法的多音字才单独成词。改写时避开「得 děi」「只 zhī」单独成词。对话用 “”。

## 数据形状

`text.js`（照 `climb-higher/text.js` 的写法，一行一个单元）：

```js
// [English or {ref}, 中文, 用简单的话理解, In simple words, angle?]
const lines = [
  // 井底之蛙
  ["A frog at the bottom of a well", // 1
   "井底/之/蛙",
   "住在井底的青蛙，以为天只有井口那么大。现在说一个人见得少，就以为世界很小。",
   "A frog living at the bottom of a well thinks the sky is as big as the well's mouth. We say it of someone who has seen little and thinks the world is small."],
  ["A little frog lived at the bottom of a well.", // 2
   "一只/小/青蛙/住/在/井底/。",
   "青蛙的家在井里。", "The frog's home is in the well."],
  // …故事 2–3 句…
  [{ref: 'ISA.55.9'}, // 5
   "天/怎样/高过/地/，/照样/，/我/的/道路/高过/你们/的/道路/；/我/的/意念/高过/你们/的/意念/。",
   "井口外面的天那么大；神的想法，比我们能想到的高得多。",
   "The sky outside the well is so big; God's thoughts are far higher than ours.",
   'related'],
];

export const units = lines.map(([english, zh, explainZh, explainEn, angle]) => ({
  ...(typeof english === 'string' ? {en: english} : english),
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
  ...(angle ? {angle} : {}),
}));
```

`index.js` 的 sections：每个成语一小段，`range` 连续覆盖所有单元，`title` 是成语和它的英文，`intro` 一句话说出处：

```js
{id: '1-5', range: [1, 5], title: {zh: '井底之蛙', en: 'The frog in the well'},
 intro: {zh: '出自《庄子》。一只青蛙住在井里，以为天只有井口那么大。', en: 'From the Zhuangzi: a frog in a well thinks the sky is as big as the well's mouth.'}},
```

课文对象照 `climb-higher/index.js`：`kind: 'idioms'`，`title`、`reference`（`{zh: '成语 · 第一辑', en: 'Idioms · Set 1'}`）、`chineseSource: 'https://b.ibible.hk/'`、`sources`（说明两种语言 + 链接：成语出处如维基文库、经文版本）、`sections`、`verses`、`study`、`dict`、`aliases`、`suggested`（6 个值得一起学的词）、`audio: 'audio/idioms-1/manifest.json'`（文件可以先不存在）。

`study.js`：每个单元一道问题 `{zh, en}`，和这句有关的生活小事；成语那一句问「你见过这样的事吗」一类，经文那一句把成语和经文连起来问。

`words.js`：课文里每一个中文词一条 `[词, pinyin, English gloss, 用简单的话解释, 图片概念或 null, [指向这个词的英文词]]`。`validate` 会报告有多少英文词能点出中文，目标是 100%：故事和经文的每个英文词，要么在 `aliases` 里，要么在 `english-basic.js` 里（常用小词可以加进去）。经文的英文是取回来的，先用 NIV 的字句写 aliases，再用 `check:english` 核对。

## 检查

```bash
npm run validate                                   # 离线：形状、分词、拼音、经文登记、小段范围
npm run check:scripture                            # 跨章节加载、失败重试、请求边界
npm run dev                                        # 另开终端
LANG_API_URL=http://127.0.0.1:8197 npm run check:english
```

浏览器里看：分类选「成语」，每个成语一小段，经文单元上有视角标签，英文每个词能点开。

## 两辑的成语（草稿，经文都是和合本公版；可以调整）

| 辑 | 成语 | 经文 | 视角 |
| --- | --- | --- | --- |
| 一 | 井底之蛙 | 以赛亚书 55:9 | 相关 |
| 一 | 守株待兔 | 箴言 6:6–8 | 相反 |
| 一 | 愚公移山 | 马太福音 17:20 | 相似 |
| 一 | 亡羊补牢 | 马太福音 4:17 | 悔改、转向神 |
| 一 | 拔苗助长 | 雅各书 5:7 | 相似 |
| 一 | 自相矛盾 | 约翰一书 1:6 | 与神相交与生活一致 |
| 一 | 塞翁失马 | 罗马书 8:28 | 相似 |
| 一 | 掩耳盗铃 | 约翰一书 1:8–9 | 面对罪、承认与赦免 |
| 一 | 一诺千金 | 申命记 31:8；马太福音 5:34、37 | 神的应许 / 人的诚实 |
| 一 | 盲人摸象 | 哥林多前书 13:12 | 相似 |
| 二 | 口蜜腹剑 | 马太福音 15:8 | 嘴唇尊敬，心却远离 |
| 二 | 对牛弹琴 | 马太福音 13:9 | 敞开心听神的话 |
| 二 | 以德报怨 | 马太福音 5:44–45 | 爱仇敌、效法天父 |
| 二 | 近朱者赤 | 哥林多后书 3:18 | 亲近主、被主改变 |
| 二 | 投桃报李 | 约翰一书 4:19 | 回应神先给的爱 |
| 二 | 滴水穿石 | 路加福音 18:1 | 常常祷告、不灰心 |
| 二 | 知足常乐 | 希伯来书 12:2 | 仰望耶稣、喜乐与盼望 |
| 二 | 杯弓蛇影 | 提摩太后书 1:7 | 刚强、仁爱、谨守 |
| 二 | 入乡随俗 | 哥林多前书 9:22–23 | 相关 |
| 二 | 刻舟求剑 | 以赛亚书 43:18–19 | 相关 |

## 第二辑文字稿（2026-10-07）

10 小段、53 单元，其中 40 个成语与故事单元、13 个经文单元，每个单元一道双语问题。口蜜腹剑、对牛弹琴、杯弓蛇影和刻舟求剑是古籍故事的儿童改写；投桃报李和滴水穿石展开原作的诗句或比喻；以德报怨、近朱者赤、知足常乐和入乡随俗使用项目原创生活小故事，导语明确说明。

按主人选定的对应修改两辑的双语解释与问题。联系从共有的画面深入到与神的关系：回应神先给的爱，亲近主而被改变，常常祷告而不灰心。知足常乐配希伯来书 12:2，以耶稣因前面的喜乐忍受十字架，引导孩子思想喜乐的根基。第一辑仍为 54 单元；未列入此次选择的八个成语保留原对应。经文中文与已有 CUV 公版语料核对，英文只由 Worker 取回。第二辑等待内容评审，暂不配音。
