# 语言的桥 · Language Bridge

你教我，我教你 · You teach me, I teach you。Lucas Academy Lang：孩子和家长、同伴一起读中文和英文。每一节先完整读一种语言，紧接着读同一节的另一种语言；「逐句学」用大字一句一句地读，也可以按意思拆成短句，每个整句和短句都有自己的一道生活小问题。

界面跟着「先读的语言」走：页面最上方的按钮写着先读的语言（「中文在前 ⇅」/「English first ⇅」），点一下交换顺序，所有按钮、标签和提示也一起换成那种语言。产品名 2026-09-30 由「互惠的门」改为「语言的桥」；`CC-HANDOFF.md`、`design-qa.md` 和 `preview/` 保留旧名作为当时的设计记录。

- 正式网站：<https://lang.lucasacademy.org/>
- 代码：<https://github.com/yancyqin/lucas-academy-lang>
- 首篇《爱的篇章》：哥林多前书 13 章，13 节分 1–4 / 5–8 / 9–13 三段，可拆成 43 个中英对应短句。
- 参考课文《种子与好土》：马可福音 4:1–9，按整句学习（还没有校对过的短句对应）。

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
| `npm run validate` | 离线校验：13 节 / 4·4·5 分段 / 43 短句拼回原文、每个单元的双语问题、词典与拼音全覆盖、配音 manifest（文件真实存在、时长、声音、中文 hash）、配图 manifest、`public/` 里没有密钥或不该发布的文件 |
| `npm run check:english` | 连接英文接口（默认本地 dev；`LANG_API_URL=https://lang.lucasacademy.org` 查线上）：短句按当天英文精确拼回、改动/缺失时回退整句、英文配音 hash 与当天英文一致、仓库任何文件里都没有英文经文 |
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
  styles/                   # app.css（原阅读页）、study.css（Design 1 逐句弹窗）
  js/
    main.js                 # 状态与连接：课文、段落、语言顺序、进度、生词本、录音
    strings.js              # 界面文字（中 / 英），跟着先读的语言切换
    reader.js  wordpanel.js # 阅读页与词语面板 / 生词本
    study.js                # 逐句学弹窗（原生 dialog）
    audio.js                # 唯一的声音控制器：配音、系统声音、逐词慢读、自己的录音
    narration.js            # 配音 manifest 查找；文字 hash 不符就不播
    english.js              # /api/passage，按段请求，只放在内存
    units.js                # 整句 / 短句切分与 fingerprint（页面和脚本共用）
    dictionary.js tokens.js storage.js recording.js
  lessons/
    index.js                # 课文 registry（下拉菜单顺序）
    passages.js             # Worker 允许的经文范围，与课文共用
    english-basic.js        # 常用英文小词的中文解释
    love/ seed/             # text.js（和合本、分段、用简单的话理解）、study.js（对应与问题）、words.js（词典）
  audio/<lesson>/{zh,en}/*.mp3 + manifest.json
  images/words/manifest.json  # 词语配图（24 个概念，WebP 与双语 alt 已齐全）
worker/index.js             # GET /api/passage；其余请求交给静态资源
scripts/                    # validate、check-english、narration-scripts、publish-audio、word-images
docs/                       # word-images.md（配图清单）、release.md（部署与验收记录）
preview/  design/           # 本轮确认依据，不部署
```

### 数据与 ID

- 经节 ID 用 `1CO.13.4` 这种稳定写法，段落 ID 如 `1-4`，短句 ID 为 `c1`、`c2`……，整句为 `whole`。问题、笔记、配音、词语图片都绑定 ID，不用屏幕位置。
- `lessons/love/study.js` 只记录对应关系的**数量**：每个短句占几个中文标点分句（`zh`）、几个英文词（`en`），以及校对时英文整节的 fingerprint（`hash`）。英文不进仓库；当天英文的 hash 不同，就只开放整句。
- 本地存储前缀 `lucas-lang.`，与中文阅读器分开：`first`、`pinyin`、`speed`、`lesson`、`marks`、`done`（键为 `课文/段落`）、`note.<课文>.<经节>.<单元>`、`my-recording`。没有账户、登录或云同步。

## 英文（NIV）

英文经文有版权：Worker 用 `YVP_APP_KEY` 逐节向 YouVersion 请求（区间请求会返回无编号的整块，不能可靠拆开），每次最多 7 节，且只允许 `passages.js` 里登记的课文范围。服务端 edge cache 保存 30 天；返回给浏览器时 `Cache-Control: no-store`，页面只放在内存。版权信息集中显示在页尾「文字来源」，学习区不显示版本标签。

生产密钥只放在 Worker secret：

```bash
npx wrangler secret put YVP_APP_KEY
```

## 配音

中文 `fangfang/zh`、英文 `louise/en`，由 `../lucas-academy-media` 的 CosyVoice 工作流生成（`--speed 0.85` 儿童慢速；网页按 1× 播放，「朗读速度」只按这个基准相对调整，不会重复减速）。每节整句和每个短句都有独立的中英文 clip；manifest 记录 `{lessonId, verseId, unitId, language, voice, src, duration, textHash, speed}`。clip 的 textHash 与屏幕上的文字不符、文件缺失或加载失败时，改用设备的系统声音，并明确标为「系统试听」；词语发音始终是系统声音。

重新生成（英文脚本只写到 media 仓库被 gitignore 的目录，不进本仓库）：

```bash
npm run dev    # 另开一个终端
npm run narration:scripts
cd ../lucas-academy-media
.conda/bin/lucas-narrate data/processed/lucas-lang/love-zh.json --profile fangfang/zh --language zh --speed 0.85 --output-dir outputs/fangfang/zh/lang-love
.conda/bin/lucas-narrate data/processed/lucas-lang/love-en.json --profile louise/en --language en --speed 0.85 --output-dir outputs/louise/en/lang-love
.conda/bin/python scripts/check_narration.py data/processed/lucas-lang/love-en.json outputs/louise/en/lang-love --language en --fix --profile louise/en
cd ../lucas-academy-lang
npm run audio:publish -- love ../lucas-academy-media/data/processed/lucas-lang \
  zh=../lucas-academy-media/outputs/fangfang/zh/lang-love en=../lucas-academy-media/outputs/louise/en/lang-love
npm run validate && npm run check:english
```

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

中文为公版和合本，按 [iBible 哥林多前书 13](https://b.ibible.hk/bible/9/1co/13) 核对；《种子与好土》中文与词典来自 `lucas-academy-chinese`。中文分词、儿童释义、短句对应和全部讨论问题为本项目整理。暂按 7–10 岁、亲子或同伴共读设计。
