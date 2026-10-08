# 语言的桥 · Language Bridge

你教我，我教你 · You teach me, I teach you。Lucas Academy Lang：孩子和家长、同伴一起读中文和英文。每一节先完整读一种语言，紧接着读同一节的另一种语言；「逐句学」用大字一句一句地读，也可以按意思拆成短句，每个整句和短句都有自己的一道生活小问题。

界面跟着「先读的语言」走：页面最上方的按钮写着先读的语言（「中文在前 ⇅」/「English first ⇅」），点一下交换顺序，所有按钮、标签和提示也一起换成那种语言。产品名 2026-09-30 由「互惠的门」改为「语言的桥」；`CC-HANDOFF.md`、`design-qa.md` 和 `preview/` 保留旧名作为当时的设计记录。

- 正式网站：<https://lang.lucasacademy.org/>
- 代码：<https://github.com/yancyqin/lucas-academy-lang>
- 首篇《爱的篇章》：哥林多前书 13 章，13 节分 1–4 / 5–8 / 9–13 三段，可拆成 43 个中英对应短句。
- 参考课文《种子与好土》：马可福音 4:1–9，按整句学习（还没有校对过的短句对应）。
- 故事《快乐王子》：王尔德童话（1888，公有领域），全文 132 句分 24 小段，按整句学习。全文不适合一节课读完，所以结尾三小段（第 112–115、116–121、127–132 句）标为「课堂共读」，老师上课带着读；其他小段是选读。英文随课文提供，中文为本项目翻译（初稿，待审定后配音）。见下方「故事课文」。
- 系列「东西方的奇幻之旅」：两本写奇异国度的经典放在一起读，都按 7–10 岁孩子重写成短句（中英文都是本项目改写，不是逐字翻译），全文可选，各标三小段「课堂共读」。
  - 《格列佛游记 · 小人国》：斯威夫特（1726）第一卷，格列佛自己讲，67 句分 11 小段；课堂共读第 6–12、20–26、32–38 句（被绑着醒来、搜口袋、鸡蛋大战）。
  - 《镜花缘 · 君子国和小人国》：李汝珍（清）第八、十至十二、十九回，64 句分 11 小段；课堂共读第 17–23、30–36、55–61 句（要加价的买家、多出来的银子、小人国）。
- 「成语 · 第一辑」：十个成语（井底之蛙、守株待兔、愚公移山、亡羊补牢、拔苗助长、自相矛盾、塞翁失马、掩耳盗铃、一诺千金、盲人摸象），一个成语一小段：成语本身、两三句小故事、再配一两节经文，经文单元标出相似、相反或相关的视角。故事的中英文都是本项目为孩子改写的；经文中文为公版和合本，英文 NIV 经 API 显示。做法见 [docs/idioms.md](docs/idioms.md)。只给 10 个成语本身配音（中文 fangfang、英文 Louise），小故事和经文暂不配音。
- 「成语 · 第二辑」：口蜜腹剑、对牛弹琴、以德报怨、近朱者赤、投桃报李、滴水穿石、知足常乐、杯弓蛇影、入乡随俗、刻舟求剑。10 小段、55 单元；古籍故事、诗句或比喻的小场景、项目原创生活故事都在导语注明。中英短句、逐句问题与词典齐备，配 15 节经文（中文公版和合本、英文运行时取 NIV）。第二辑是待评审的文字稿，还没有配音。
- 系列「看得见的诗」：给三年级左右的孩子上一小时的课。每期三件作品画的是同一个画面：一首古诗、一首斯蒂文森的英文童诗（1885，公有领域）、一段经文，整期都在课上读。每件作品有一幅 art-lab 的「活画」：古诗是淡彩水墨，英文诗是油画，经文是水彩，孩子在画上用会动的画笔画。
  - 第一期《爬高一点，看远一点》：《登鹳雀楼》、Foreign Lands（第 1、4 节）、诗篇 121:1–2。
  - 第二期《小船去远方》：《早发白帝城》、Where Go the Boats?、以赛亚书 40:31。

课文分四类：成语、诗词、小说、圣经。侧栏先选分类（默认「全部」，按分类分组列出所有课文），再选课文；分类定义在 `public/lessons/index.js`，每篇课文在 registry 里标 `category`，有课文的分类才出现在菜单里。成语课文（`kind: 'idioms'`）的做法见 [docs/idioms.md](docs/idioms.md)：一辑一篇课文，一个成语一小段，每个成语配一点圣经，经文单元用 `angle` 标出相似、相反或相关的视角。

设计依据见 [CC-HANDOFF.md](CC-HANDOFF.md)、[design-qa.md](design-qa.md) 和 `preview/`（用户确认过的交互预览，保留作对照，不部署）。

## 运行

需要 Node 22（`nvm use`，见 `.nvmrc`）。

```bash
npm install
cp .dev.vars.example .dev.vars   # 填入 YVP_APP_KEY（只在本机，已被 .gitignore 排除）
npm run dev                      # http://127.0.0.1:8197 ，含 /api/passage
```

没有 `.dev.vars` 或没有网络时，中文、配音和所有工具照常可用，英文处显示原因和「重试英文」。

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | Wrangler 本地运行 Worker + `public/` |
| `npm run validate` | 离线校验：13 节 / 4·4·5 分段 / 43 短句拼回原文、每个单元的双语问题、词典与拼音全覆盖、配音 manifest（文件真实存在、时长、声音、中文 hash）、配图 manifest、`public/` 里没有密钥或不该发布的文件；故事课文另查英文排版与文字来源，并报告多少英文词能查到中文 |
| `npm run check:english` | 连接英文接口（默认本地 dev；`LANG_API_URL=https://lang.lucasacademy.org` 查线上）：短句按当天英文精确拼回、改动/缺失时回退整句、英文配音 hash 与当天英文一致、仓库任何文件里都没有英文经文（故事课文的英文是公有领域，随课文提供，不请求） |
| `npm run deploy` | 先 validate，再 `wrangler deploy` |
| `npm run images:list` | 从词条刷新配图清单 `docs/word-images.md` 与 `public/images/words/manifest.json` |

预览对照（原 Codex 预览，端口 8095，读取 `../lucas-academy-chinese/.dev.vars`）：

```bash
python3 preview/server.py
node scripts/check-study-alignment.mjs
```

## 结构

```text
public/                     # 唯一的网站静态资源目录
  index.html  404.html  _headers  icon.svg
  class.html                # 课程表 /class：年级 → 周，每周的课文链接和作业
  styles/                   # app.css（原阅读页）、study.css（Design 1 逐句弹窗）、class.css（课程表）
  js/
    main.js                 # 状态与连接：课文、段落、语言顺序、进度、生词本、录音；网址参数与地址栏同步
    class.js                # 课程表页：年级、本周、每周的课文链接和作业
    strings.js              # 界面文字（中 / 英），跟着先读的语言切换
    reader.js  wordpanel.js # 阅读页与词语面板 / 生词本
    study.js                # 逐句学弹窗（原生 dialog）
    audio.js                # 唯一的声音控制器：配音、系统声音、逐词慢读、自己的录音
    narration.js            # 配音 manifest 查找；文字 hash 不符就不播
    english.js              # /api/passage，按段请求，只放在内存
    units.js                # 整句 / 短句切分与 fingerprint（页面和脚本共用）
    dictionary.js tokens.js storage.js recording.js
  lessons/
    index.js                # 课文 registry（下拉菜单顺序）和分类
    schedule.js             # 课程表：年级，每周的课文（整篇或几小段）和作业
    passages.js             # Worker 允许的经文范围，与课文共用
    english-basic.js        # 常用英文小词的中文解释
    love/ seed/             # text.js（和合本、分段、用简单的话理解）、study.js（对应与问题）、words.js（词典）
    happy-prince/           # 《快乐王子》：text.js（132 个编号单元，英文原文 + 中文译文）、study.js（每个单元的问题）、
                            # words.js（词典与英文对应）、index.js（24 小段，标出课堂共读）
    lilliput/ gentlemen/    # 东西方的奇幻之旅：格列佛的小人国、镜花缘的君子国和小人国（同样的四个文件，各 11 小段）
    climb-higher/ little-boats/  # 看得见的诗：第一期、第二期（kind: 'poems'，每件作品一小段）
    idioms-1/               # 成语 · 第一辑（kind: 'idioms'，一个成语一小段；契约见 docs/idioms.md）
  audio/<lesson>/{zh,en}/*.mp3 + manifest.json
  images/words/manifest.json  # 词语配图（24 个概念，WebP 与双语 alt 已齐全）
worker/index.js             # GET /api/passage；其余请求交给静态资源
scripts/                    # validate、check-english、narration-scripts、publish-audio、word-images
docs/                       # word-images.md（配图清单）、release.md（部署与验收记录）
preview/  design/           # 本轮确认依据，不部署
```

### 数据与 ID

- 经节 ID 用 `1CO.13.4` 这种稳定写法，故事的句子 ID 为 `happy-prince.12`（课文 ID + 序号）；段落 ID 如 `1-4`，短句 ID 为 `c1`、`c2`……，整句为 `whole`。问题、笔记、配音、词语图片都绑定 ID，不用屏幕位置。
- `lessons/love/study.js` 只记录对应关系的**数量**：每个短句占几个中文标点分句（`zh`）、几个英文词（`en`），以及校对时英文整节的 fingerprint（`hash`）。英文不进仓库；当天英文的 hash 不同，就只开放整句。
- 本地存储前缀 `lucas-lang.`，与中文阅读器分开：`first`、`pinyin`、`speed`、`lesson`、`marks`、`done`（键为 `课文/段落`）、`note.<课文>.<经节>.<单元>`、`my-recording`。没有账户、登录或云同步。

## 课程表与链接

- 阅读页认网址参数：`/?lesson=happy-prince` 打开一篇课文，`&part=21` 打开第 21 小段，`&parts=21-23`（或 `1,3,21`）把这几小段标为这一次的「课堂共读」（珊瑚色圈和列表上方的说明，和课文自己的 `inClass` 标记一样）并从其中第一段开始。课文 id 不存在就当没有参数。切换课文或小段时地址栏跟着变（`replaceState`），随时可以复制当前位置作链接；换一篇课文，链接带来的标记就不再生效。
- `/class` 是课程表：先选年级，再选一周。`/class?g=3&w=1` 固定指向三年级第 1 周，上课前发群里、上完课发作业都用它。每周的数据在 `public/lessons/schedule.js`：年级、周号、标题、`readings`（整篇，或 `parts: [21, 22, 23]`；可以几篇混排）、`homework`，以及可选的 `date`（上课那天）。有日期时 `/class` 打开今天或之后最近的一周，没有就打开最后一周；年级记在 `lucas-lang.grade`，下次直接看自己年级。`validate` 检查年级、周号、课文 id、小段范围和双语文字，所以排错的课表不会部署出去。每周只改这一个文件。
- 课文单元可以带 `angle: 'similar' | 'opposite' | 'related'`：阅读页和逐句学里显示一个「相似的视角 / 相反的视角 / 相关的视角」小标签，用于成语配的经文；没有这个字段的单元不显示任何东西。

## 英文（NIV）

英文经文有版权：Worker 用 `YVP_APP_KEY` 逐节向 YouVersion 请求（区间请求会返回无编号的整块，不能可靠拆开），每次最多 7 节，且只允许 `passages.js` 里登记的课文范围。服务端 edge cache 保存 30 天；返回给浏览器时 `Cache-Control: no-store`，页面只放在内存。版权信息集中显示在页尾「文字来源」，学习区不显示版本标签。

生产密钥只放在 Worker secret：

```bash
npx wrangler secret put YVP_APP_KEY
```

## 故事课文

课文的 `kind: 'story'` 表示公有领域的故事，而不是经文：

- 英文写在每一句的 `en` 里，随课文提供，不经过 `/api/passage`；`passage` 不填，`passages.js` 也不登记。
- 页尾「文字来源」显示课文自己的 `sources`（说明 + 链接），不显示 YouVersion 和中文经文来源。
- 界面把「节 / verse」说成「句 / sentence」（`strings.js` 的 `storyZh` / `storyEn` 只覆盖这些字眼）；小段超过 4 个时，左侧小段列表在桌面上可以滚动，在手机上变成可以横向滑动的一行。
- 问题、配音、笔记、生词本与经文课文完全一样。还没有写短句对应的故事按整句学习。
- 小段可以标 `inClass: true`，表示老师上课带着读（课堂共读）：左侧小段列表上有珊瑚色的「课堂共读」，列表上方有一句说明，课文标题上方写「课堂共读」或「选读」。没有标记的课文（两篇经文）显示不变。《快乐王子》标了结尾三小段；它们的导语交代了前面的情节，老师可以直接从第 21 小段开始读。

《快乐王子》的准备方法：

- 英文依据 [Project Gutenberg #902](https://www.gutenberg.org/ebooks/902)（1910 年第七次印刷本），对照 Wikisource 上的 1888 年初版改正三处排印错误（“chose”、“Egypt”!”、“said the Mayor in fact”）；把 to-night、to-morrow、good-bye、some one、every one 改成现代写法；为孩子略去一句（He passed over the Ghetto…，一句关于犹太人和钱的刻板描写）。长段落在句末拆开，接着说话的句子以 “ 开头。
- 中文为本项目翻译（2026-10 由 Claude 起草，待审定）。词条拼音按课本写法：标出轻声，词内的「一」「不」变调，单独的「一」「不」用原调；只有一种读法的多音字才单独成词（得 = de、地 = de、只 = zhǐ）。
- 英文每个词都能点出中文：故事词条的英文对应 + `english-basic.js` 里新加的一些常用词。
- 配音等译文审定后再做（见下）。在这之前用设备的系统声音，并标为「系统试听」。

「东西方的奇幻之旅」两篇的准备方法：

- 中英文都是本项目为孩子改写的短句，一句对一句。格列佛依据 [Project Gutenberg #829](https://www.gutenberg.org/ebooks/829) 第一卷，略去政治讽刺的长段和用小便救火的一节，敌人想弄瞎他改为「残酷的办法」；镜花缘依据[维基文库](https://zh.wikisource.org/wiki/%E9%8F%A1%E8%8A%B1%E7%B7%A3)第八、十至十二、十九回，宰相兄弟议论风俗只留一例，删去「下辈子变驴变马还债」和说乞丐「上辈子占人便宜」的话；小人国「甜不甜？」「苦死了！」是按多九公那句话补的小场景。
- 分词、拼音规则同《快乐王子》；为了避开多音字，改写时不用「得 děi」「只 zhī」单独成词，「长」只读 cháng。英文每个词都能点出中文。
- 还没有配音，先用设备的系统声音。

课文的 `kind: 'poems'` 是「看得见的诗」：

- 每个小段是一件作品。诗的英文写在 `en` 里，随课文提供；经文的单元不写英文，只写 `ref`（如 `PSA.121.1`），英文 NIV 由 Worker 按段去取，不进仓库。经文范围要登记在 `passages.js`（现在有 `PSA.121` 1–2、`ISA.40` 31），一个小段里的经文必须是同一章连着的几节。
- 诗按行显示：中文里 `\n` 单独算一个词，英文里直接写 `\n`，页面上就是换行。
- 小段可以有 `painting: {id, style}`：工具栏上出现「活画 · 淡彩水墨 ↗」，新窗口打开 `https://art-lab.lucasacademy.org/living?w=<id>&lang=<界面语言>`，孩子在那幅画上用会动的画笔画。没有 `painting` 的小段不显示这个按钮。
- 页尾「文字来源」显示课文自己的来源，经文部分另外显示 NIV 版权、YouVersion 和中文经文来源。
- 配音脚本 `narration-scripts.mjs` 按 `ref` 逐节去取经文英文（要开 dev）。诗的换行读成停顿：行尾没有标点的补一个逗号，只改朗读的文字，`hash` 仍是屏幕上的原文。

## 配音

中文 `fangfang/zh`、英文 `louise/en`，由 `../lucas-academy-media` 的 CosyVoice 工作流生成（`--speed 0.75` 儿童慢速；「朗读速度」默认就是 0.75，这时按 1× 播放，其他档只按 clip 自己的 `speed` 相对调整，不会重复减速）。爱的篇章和种子与好土是更早按 0.85 录的，默认 0.75 下会放慢到 0.88 倍播放（保持音高）。每节整句和每个短句都有独立的中英文 clip；manifest 记录 `{lessonId, verseId, unitId, language, voice, src, duration, textHash, speed}`。clip 的 textHash 与屏幕上的文字不符、文件缺失或加载失败时，改用设备的系统声音，并明确标为「系统试听」；词语发音始终是系统声音。

重新生成（英文脚本只写到 media 仓库被 gitignore 的目录，不进本仓库）：

```bash
npm run dev    # 另开一个终端
npm run narration:scripts
cd ../lucas-academy-media
.conda/bin/lucas-narrate data/processed/lucas-lang/love-zh.json --profile fangfang/zh --language zh --speed 0.75 --output-dir outputs/fangfang/zh/lang-love
.conda/bin/lucas-narrate data/processed/lucas-lang/love-en.json --profile louise/en --language en --speed 0.75 --output-dir outputs/louise/en/lang-love
.conda/bin/python scripts/check_narration.py data/processed/lucas-lang/love-en.json outputs/louise/en/lang-love --language en --fix --profile louise/en --speed 0.75
cd ../lucas-academy-lang
npm run audio:publish -- love ../lucas-academy-media/data/processed/lucas-lang \
  zh=../lucas-academy-media/outputs/fangfang/zh/lang-love en=../lucas-academy-media/outputs/louise/en/lang-love
npm run validate && npm run check:english
```

故事课文的英文就在课文里，生成脚本不用开 dev：

```bash
node scripts/narration-scripts.mjs happy-prince ../lucas-academy-media/data/processed/lucas-lang
# 然后同上：lucas-narrate（输出目录 lang-happy-prince）、check_narration.py，再
npm run audio:publish -- happy-prince ../lucas-academy-media/data/processed/lucas-lang \
  zh=../lucas-academy-media/outputs/fangfang/zh/lang-happy-prince en=../lucas-academy-media/outputs/louise/en/lang-happy-prince
```

成语 · 第一辑按主人在 2026-10-07 确认的范围，只录每小段的第一句（成语本身），中英各 10 条；小故事和经文保留系统试听。生成脚本时必须用：

```bash
node scripts/narration-scripts.mjs idioms-1 ../lucas-academy-media/data/processed/lucas-lang --idioms-only
```

`--omit-scripture` 可用于需要故事配音而不录经文的其他任务；第一辑的本次发布使用 `--idioms-only`。英文配音的文字 hash 也会在故事、诗词和成语这几类混合课文中检查。

`audio:publish` 去掉合成留下的首尾静音（保留 0.15 s 起音和 0.25 s 尾音），编码为单声道 32 kHz 48 kbps MP3（MPEG-1 Layer III，Safari / iPad 都能播放），并统计实际文件大小与时长；任何一条缺失或为空都会中止。

Whisper 听不出同音字（锣/罗、钹/伯、嫉妒/极度），所以中文要按无声调拼音比对，再人工抽听仍被标记的条目。

## 词语图片

词条可以带一个概念 ID；中文词和它的英文对应词共用一张图（如「忍耐」与 patient、perseveres）。`public/images/words/manifest.json` 里填好 `src` 和 `alt` 后，词义面板（阅读页和弹窗）才显示图片；没有图时不显示空白画框。清单见 [docs/word-images.md](docs/word-images.md)。

24 张词语图已完成并接入词语面板，统一为 800×600 WebP，总计约 2.27 MiB。使用内置 `image_gen` 生成；完整提示词、源文件记录和验收结果见 [docs/image-generation/README.md](docs/image-generation/README.md)，部署状态见 [docs/release.md](docs/release.md)。

## 部署

```bash
npm run deploy
```

Worker `lucas-academy-lang`，自定义域名 `lang.lucasacademy.org`，静态资源目录只有 `./public`，`assets.run_worker_first: ["/api/*"]`。回退：`npx wrangler deployments list` 找到上一个版本，再 `npx wrangler rollback <version-id>`。部署记录与验收结果见 [docs/release.md](docs/release.md)。

## 内容来源

中文为公版和合本，按 [iBible 哥林多前书 13](https://b.ibible.hk/bible/9/1co/13) 核对；《种子与好土》中文与词典来自 `lucas-academy-chinese`。中文分词、儿童释义、短句对应和全部讨论问题为本项目整理。《快乐王子》的英文为公有领域（见「故事课文」），中文译文、分词、释义和问题为本项目整理。「东西方的奇幻之旅」的两部原著都是公有领域，中英文改写、分词、释义和问题都由本项目完成，没有用现成的译本或少儿版。「看得见的诗」的古诗和斯蒂文森的诗都是公有领域，互译、分词、释义和问题为本项目整理；经文中文为公版和合本（以赛亚书 40:31 用 1919 年的「从新得力」），英文 NIV 经 API 显示。暂按 7–10 岁、亲子或同伴共读设计。

《小王子》（Le Petit Prince，1943）在美国 2039 年 1 月 1 日才进入公有领域，所有英文和中文译本也都还有版权，节选也一样，所以现在不收录；已向 Gallimard 写信申请授权。
