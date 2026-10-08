# 发布与验收记录

## 2026-10-07 · 年级与周选择、成语第一辑上线

| 项目 | 记录 |
| --- | --- |
| 网站 | <https://lang.lucasacademy.org/> |
| 部署的 commit | `cde035a` Merge pull request #11，包含 #9 的课堂选择行与第一辑十个成语；已在 `origin/main` |
| 部署版本 | `2fc902c4-0180-4042-b6ec-4c9ffe0880ca`（本机 `npm run deploy`） |
| 发布内容 | `/class` 常驻年级与周选择行，选择周后显示课程卡片；成语第一辑共 10 小段、54 个双语阅读单元及讨论问题。共 19 个新增或变更的静态资源 |
| 可回退版本 | `20b6f34e-6efc-49a2-b767-d65284e151c1` |

部署后验证：`/class` 显示三年级与第 1 周，课程链接正常；第一辑的 10 小段都可打开，无浏览器错误。部署前 `npm run validate`、部署后 `LANG_API_URL=https://lang.lucasacademy.org npm run check:english` 均通过。配音在后续发布中只添加成语名称，中英各 10 条，小故事和圣经经文暂不配音。

## 2026-10-07 · 所有课都有配音，读得慢一点

| 项目 | 记录 |
| --- | --- |
| 网站 | <https://lang.lucasacademy.org/> |
| 部署的 commit | `9f642f4` Merge pull request #7（`24c58eb` Read a little slower: 0.75 by default, and narrate poem lessons；`ecb22d5` Narrate the stories and poems: Fangfang and Louise at 0.75；`9cc3721` Record the Fantastic Journeys release）；已在 `origin/main` |
| 部署版本 | `20b6f34e-6efc-49a2-b767-d65284e151c1`（2026-10-07，100% 流量；本机 `npm run deploy`） |
| 发布内容 | 《快乐王子》《格列佛游记 · 小人国》《镜花缘 · 君子国和小人国》《爬高一点，看远一点》《小船去远方》每一句都有中文 Fangfang、英文 Louise 配音（556 个 clip，37 MB，`--speed 0.75`）；「朗读速度」默认改为 0.75（很慢 0.6、自然 1），爱的篇章、种子与好土的 0.85 录音在默认档按 0.88 倍播放。共 565 个新增或变更的静态资源 |
| 可回退版本 | `5ee87a42-7b9d-405f-87e0-b8e31daf1ce0`；命令：`npx wrangler rollback 5ee87a42-7b9d-405f-87e0-b8e31daf1ce0` |

部署后验证：

- 新课的 manifest 都是全覆盖（climb-higher 16、little-boats 14、happy-prince 264、lilliput 134、gentlemen 128 个 clip，speed 0.75；love 112、seed 18 个仍是 0.85）；抽查的 MP3 都返回 200 `audio/mpeg`，线上 `gentlemen/zh/v16-whole.mp3` 与仓库里的重录版完全一致。部署后头几秒新文件还是 404、manifest 是旧的空清单，随后全部正常。
- 根页面的「朗读速度」选项是 0.75 / 0.6 / 1；`/api/passage?translation=NIV&ref=PSA.121.1` 返回 200。
- 线上浏览器：快乐王子、君子国逐句播放录音，1× 播放；小船去远方的经文句（NIV）也播录音；爱的篇章 0.882×；没有一句退回系统声音。
- 部署前 `npm run validate` 通过；部署后 `LANG_API_URL=https://lang.lucasacademy.org npm run check:english` 通过（仓库里没有经文英文）。
- 配音质检见 PR #7：英文 Whisper 逐句核对并自动重录；中文按无声调拼音比对后重录约 40 句。仍待人耳确认：爬高一点第 1 句「尽」，快乐王子第 20「嚷」、54「星星」、111「纯金」、118「你」句，小人国第 1 句「莱缪尔」，君子国第 41 句「心想」。

## 2026-10-06 · 看得见的诗：爬高一点，看远一点；小船去远方

| 项目 | 记录 |
| --- | --- |
| 部署的 commit | `5b487cd` Merge pull request #6（`bf1e9ef` Add Poems You Can See: two poem lessons with living paintings） |
| 部署版本 | `5ee87a42-7b9d-405f-87e0-b8e31daf1ce0`（2026-10-06 04:33 UTC，由 owner 在 poems 工作区部署） |
| 可回退版本 | `1fb11f7d-35c8-494a-b238-a238930d67da` |

当时没有写验收记录；部署后线上 `lessons/climb-higher` 是 `kind: 'poems'`。

## 2026-10-05 · 东西方的奇幻之旅：格列佛的小人国、镜花缘的君子国

| 项目 | 记录 |
| --- | --- |
| 网站 | <https://lang.lucasacademy.org/> |
| 部署的 commit | `bb24a3e` Merge pull request #5（`52e7235` Add the Fantastic Journeys stories: Lilliput and the Land of Gentlemen），前面是 `9dc4092` Merge pull request #4（`78cf6ed` Hover in a see-through yellow；`e92a3f5` Record the hide-second-language release）；已在 `origin/main` |
| 部署版本 | `1fb11f7d-35c8-494a-b238-a238930d67da`（2026-10-05，100% 流量；本机 `npm run deploy`） |
| 发布内容 | 新系列「东西方的奇幻之旅」：《格列佛游记 · 小人国》67 句 11 小段、《镜花缘 · 君子国和小人国》64 句 11 小段，各标三小段课堂共读；`english-basic.js` 补了 34 个常用词；鼠标悬停的词改为半透明黄色。共 14 个新增或变更的静态资源 |
| 可回退版本 | `59f4f9a8-a400-49bb-a5a2-762c40a1b763`；命令：`npx wrangler rollback 59f4f9a8-a400-49bb-a5a2-762c40a1b763` |

部署后验证：

- 根页面，两课的 `index.js`、`text.js`、`words.js`，两课的 `audio/*/manifest.json` 都返回 200；线上 `lessons/gentlemen/text.js` 与 main 完全一致；`app.css` 有 `--hover:rgba(255,212,0,.25)`。部署后第一次请求 `audio/gentlemen/manifest.json` 返回过一次 404，之后连续三次都是 200。
- `/api/passage?translation=NIV&ref=1CO.13.4` 返回 200。
- 线上浏览器：下拉菜单有两篇新课；两课各 11 小段，课堂共读标在「被绑着醒来、搜口袋、鸡蛋大战」和「要加价的买家、多出来的银子、小人国」；默认遮住英文；所有请求都是 200。
- 部署前 `npm run validate` 通过（英文词 446 / 446、468 / 468 都有中文意思）；部署后 `LANG_API_URL=https://lang.lucasacademy.org npm run check:english` 通过。
- 还没有配音：两篇用设备的系统声音，标为「系统试听」。

## 2026-10-04 · 遮住英文、橙色高亮

| 项目 | 记录 |
| --- | --- |
| 网站 | <https://lang.lucasacademy.org/> |
| 部署的 commit | `f32d84f` Merge pull request #3（`d0df66c` Cover the second language until it is tapped；`af38019` Highlight in orange；`eea776c` Record the Happy Prince release）；已在 `origin/main` |
| 部署版本 | `59f4f9a8-a400-49bb-a5a2-762c40a1b763`（2026-10-04，100% 流量；本机 `npm run deploy`） |
| 发布内容 | 「遮住英文 / Hide Chinese」开关（顶部和逐句学弹窗里各一个，默认打开，第二种语言点一下才显示）；点开的词和正在朗读的一节改用橙色高亮。共 7 个变更的静态资源 |
| 可回退版本 | `b7b15055-2d4e-45a0-833a-6b7ceb0723e8`；命令：`npx wrangler rollback b7b15055-2d4e-45a0-833a-6b7ceb0723e8` |

部署后验证：

- 线上 `index.html` 有新开关，`app.css` 有橙色变量，`main.js`、`study.js` 是新版本；静态资源 `Cache-Control: public, max-age=0, must-revalidate`，旧设备下次打开就会取到新文件。
- `/api/passage?translation=NIV&ref=1CO.13.1-4` 返回 200。
- 线上浏览器：默认打开「遮住英文」，第一小段 4 句英文都盖着；没有失败请求。
- 部署前 `npm run validate` 通过；本地 `npm run check:english` 通过。

## 2026-10-03 · 故事《快乐王子》上线

| 项目 | 记录 |
| --- | --- |
| 网站 | <https://lang.lucasacademy.org/> |
| 部署的 commit | `652f1ea` Merge pull request #1（`bde9a8f` Support public-domain story lessons and class reading marks；`0c1850c` Add The Happy Prince, with three parts marked for class）；已在 `origin/main` |
| 部署版本 | `b7b15055-2d4e-45a0-833a-6b7ceb0723e8`（2026-10-03T15:39:19Z，100% 流量；本机 `npm run deploy`） |
| 发布内容 | 故事课文类型：英文随课文提供、界面用「句」、小段列表可滚动、课堂共读标记。《快乐王子》全文 132 句 24 小段，结尾三小段（第 112–115、116–121、127–132 句）为课堂共读，其余为选读。共 14 个新增或变更的静态资源 |
| 可回退版本 | `7a6175a3-1fd7-4c4b-ac99-ae32f4a55c05`；命令：`npx wrangler rollback 7a6175a3-1fd7-4c4b-ac99-ae32f4a55c05` |

部署后验证：

- 根页面、`/lessons/happy-prince/index.js`、`/lessons/happy-prince/text.js`、`/audio/happy-prince/manifest.json` 返回 200。
- `/api/passage?translation=NIV&ref=1CO.13.1-4` 返回 200：4 节英文，带版权说明，英文经文不受影响。
- 部署前 `npm run validate` 通过（《快乐王子》883 / 883 个英文词能查到中文）；`npm run check:english` 在本地 dev 通过。
- 线上浏览器：下拉菜单有「快乐王子」，第 21 小段标题上方显示「课堂共读」，三段标记正确，没有失败请求。
- 还没有配音：故事课文用设备的系统声音，标为「系统试听」。自动部署（Workers Builds）没有开，部署仍在本机手动执行。

## 2026-09-30 · 24 张词语图片上线

| 项目 | 记录 |
| --- | --- |
| 网站 | <https://lang.lucasacademy.org/> |
| 部署的 commit | `3c5dd2e` Add 24 bilingual vocabulary illustrations；已推送到 `origin/main` |
| 部署版本 | `7a6175a3-1fd7-4c4b-ac99-ae32f4a55c05`（2026-10-01T05:33:40Z，100% 流量） |
| 发布内容 | 24 张 800×600 WebP 和配图 manifest，共 25 个新增或变更的静态资源；词语面板与逐句弹窗共用 |
| 可回退版本 | `a894ba9c-412e-415f-b824-686451f920a3`；命令：`npx wrangler rollback a894ba9c-412e-415f-b824-686451f920a3` |

部署后验证：

- 根页面返回 200；线上配图 manifest 与提交版本完全一致。
- 24 张图片全部返回 200 / `image/webp`；逐个比对响应字节，与仓库 WebP 完全一致。
- `npm run validate` 通过，配图覆盖为 24/24。
- `LANG_API_URL=https://lang.lucasacademy.org npm run check:english` 通过：43 个短句准确拼回，65 条英文配音的文字 hash 与线上英文一致。
- 部署前已在浏览器验证中英词语共图、阅读页、逐句弹窗及 390 px 手机显示，记录见 [image-generation/README.md](image-generation/README.md)。

## 2026-09-30 · 首次发布

| 项目 | 记录 |
| --- | --- |
| 网站 | <https://lang.lucasacademy.org/> |
| Worker | `lucas-academy-lang`；静态资源只来自 `./public`，`run_worker_first: ["/api/*"]` |
| 代码 | <https://github.com/yancyqin/lucas-academy-lang>（沿用已存在的公开仓库，未改可见性），分支 `main` |
| 部署的 commit | `f96b103` Add fangfang and louise narration for both lessons |
| 部署版本 | `a894ba9c-412e-415f-b824-686451f920a3`（2026-10-01T04:13:58Z，100% 流量） |
| 可回退版本 | 这是这个 Worker 的第一个版本，没有更早的版本可回退。紧急时可以在 Cloudflare 移除 `lang.lucasacademy.org` 自定义域名或执行 `npx wrangler delete lucas-academy-lang`。以后每次部署前，先用 `npx wrangler deployments list` 记下当前版本，回退用 `npx wrangler rollback <version-id>`。 |
| 密钥 | `YVP_APP_KEY` 以 `secret_text` 随首个版本上传（`--secrets-file .dev.vars`）；Git 历史和所有对外文件中都没有它 |

### 部署后验证（线上）

- 根页面 200，带 CSP、`X-Content-Type-Options`、`Permissions-Policy: microphone=(self)` 等安全头。
- `/api/passage`：1–4、5–8、9–13 三段都是 200 JSON，`Cache-Control: no-store`；非课文经文、超过 7 节、超出范围、其他译本都返回 400。
- `README.md`、`wrangler.jsonc`、`worker/`、`preview/`、`.dev.vars`、`package.json`、`scripts/`、`design/`、`CC-HANDOFF.md`、`_headers` 均为 404。
- 配音 manifest 与 MP3 为 200 / `audio/mpeg`；未知路径显示 404 页面。
- `LANG_API_URL=https://lang.lucasacademy.org npm run check:english` 通过：43 个短句按线上英文精确拼回，65 条英文配音的文字 hash 与线上英文一致，仓库内没有英文经文。
- 线上所有 JS / HTML / CSS / JSON 中都没有密钥或 YouVersion 服务端细节。
- 浏览器实测：中英文正常显示，页尾有 NIV 版权说明；整句和短句播放 fangfang 配音；关闭弹窗即停止声音；切换到 English first 后界面全部变成英文；390 px 手机无横向溢出；控制台无错误，无失败请求。

## 验收清单

| 项目 | 结果 |
| --- | --- |
| 整段无讨论区，无版本徽标；课文通过 dropdown 切换 | ✓ |
| 13 节完整，分段 4/4/5；flip 后仍是同一节双语相邻 | ✓ |
| 13 个整句、43 个短句都能学习；断句原样拼接还原文本 | ✓（`validate` 离线、`check:english` 对线上英文） |
| 每个学习单元都有相关的儿童双语问题；笔记不串到其他句子 | ✓（第 13 节整句问题改为独立的一道） |
| 词语点开、释义、发音、收藏和刷新恢复；图片缺失也正常 | ✓（用临时图片验证过有图时的显示，现已还原为无图） |
| 拼音、默写、慢读、暂停/继续、停止、录音回放和删除 | ✓（录音用注入的测试音频验证；真实麦克风需真机） |
| 中文 fangfang、英文 louise 可听；短句没有用整句冒充 | ✓ 130 条各自独立的文件；听感需人工抽听（见下） |
| 关闭或切换后没有旧声音；Tab / Shift+Tab 不跑到背景 | ✓ |
| 320 / 390 px、桌面无横向溢出，导航始终可用 | ✓；iPad 尺寸（768 × 1024）模拟通过，**真机未测** |
| API 未加载/失败时不假装显示英文；文字变化时不展示未核对的短句 | ✓（模拟断网、上游改字） |
| 无浏览器错误，秘密不在客户端和 Git，正式资源只来自 public | ✓ |
| 真机检查麦克风、系统语音、指定配音与 Safari 自动播放 | **未做**：需要 iPad / iPhone 实机 |

验收中修好的问题：暂停后不能继续；弹窗关闭时系统语音可能继续；320 px 打开「更多工具」横向溢出（预览里就有）；英文界面里弯引号被中文字体排成全角导致断行。

## 配音质检

- 《爱的篇章》：中文 56 条（fangfang）、英文 56 条（louise），9 分 2 秒，3.17 MB；《种子与好土》：中英各 9 条，2 分 28 秒。
- 生成：`lucas-narrate --speed 0.85`。网页按 1× 播放，「朗读速度」只在这个基准上相对调整。
- 检查：媒体仓库的 `check_narration.py`（Whisper 转写、无词声音、停顿和语速）；中文另按无声调拼音比对，因为 Whisper 分不清锣/罗、钹/伯、嫉妒/极度这类同音字。发布后又对全部 MP3 重新转写一遍，确认去掉首尾静音没有切掉字。
- 重录或剪掉行尾杂音：英文 12 条（如 fathom/faith、tongues、angered；v04-c4 行尾多出的 I'll 直接剪掉），中文 3 条（却、忍耐、信），种子课文英文第 2 节、中文第 4 节（旧录音把「撒」读成「阿」）。原始录音都保留在媒体仓库的 `retakes/` 里。
- 仍被 Whisper 标记、判断为同音字或识别偏差的：中文 v01-c3（鸣/明、锣/罗）、v04-c5（张狂→猖狂）、v10-whole（的→地）；种子课文中文第 4 节（吃尽→吃劲）、英文第 8 节（数字写成 30/60/100）。

## 未解决 / 需要真机或人工确认

1. **人工抽听**：`love/zh/v13-c1`（如今常存的有信…：Whisper 有时听成「有幸」，并在「有」后断开）、`love/en/v07-c4`（always perseveres：句末的 s 偏弱）、`love/en/v02-whole`（换成了 fathom 和 faith 都读对的一条，语速在其他整节范围内但偏快）。
2. **真机**：iPad / iPhone 上的 Safari 自动播放、系统语音、麦克风录音与回放、指定配音的音量与听感。
3. **词语图片已完成**：24 个概念的 WebP、`src` 与双语 `alt` 已齐全，本地页面与逐句弹窗验证通过，清单见 [word-images.md](word-images.md)。
4. **授权**：英文配音是 NIV 文字的音频，和 QA 截图一起放在公开仓库里。Biblica 的 NIV 授权允许以包括音频在内的任何形式引用至多 500 节并附版权说明（页尾已显示）；YouVersion API 条款对把取到的文字做成长期保存的派生内容是否另有限制，建议确认。
5. **中文阅读器**：`lucas-academy-chinese` 线上的马可福音 4:4 中文录音（`assets/audio/mark-4/verse-04.mp3`）同样把「撒」读成「阿」，本次没有改动那个项目。
6. **英文产品名**：中文名「语言的桥」，英文暂用 Language Bridge（与「语言的桥」直接对应）；如果想用选项里的 Word Bridge，只需改 `public/js/strings.js` 一处。
