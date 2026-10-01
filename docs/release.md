# 发布与验收记录

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
3. **词语图片**：24 个概念等待 Codex 制作，清单见 [word-images.md](word-images.md)。
4. **授权**：英文配音是 NIV 文字的音频，和 QA 截图一起放在公开仓库里。Biblica 的 NIV 授权允许以包括音频在内的任何形式引用至多 500 节并附版权说明（页尾已显示）；YouVersion API 条款对把取到的文字做成长期保存的派生内容是否另有限制，建议确认。
5. **中文阅读器**：`lucas-academy-chinese` 线上的马可福音 4:4 中文录音（`assets/audio/mark-4/verse-04.mp3`）同样把「撒」读成「阿」，本次没有改动那个项目。
6. **英文产品名**：中文名「语言的桥」，英文暂用 Language Bridge（与「语言的桥」直接对应）；如果想用选项里的 Word Bridge，只需改 `public/js/strings.js` 一处。
