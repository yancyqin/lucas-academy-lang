# 互惠的门：你教我，我教你 — CC 执行说明

更新时间：2026-09-30。工作目录：`/Users/yqin/repo/playground/lucas-academy-lang`。

## 直接交给 CC 的任务

请在这个仓库实现「互惠的门：你教我，我教你」正式产品。先阅读本文件、README 和现有 `preview/`。保留用户喜欢的主阅读页，用已选定的 Design 1 做大字逐句学习弹窗。以可运行的预览为交互依据，不要重新设计整个页面。先完成产品与配音接入，再按本文验收；产品执行完成后，词语图片交回 Codex 制作。

目标 GitHub：`https://github.com/yancyqin/lucas-academy-lang`。
目标网站：`https://lang.lucasacademy.org/`。

本轮 Codex 已完成预览和本交接文档；尚未创建远端、提交、推送或部署正式网站。

## 已确定的产品设计

1. 名称为「互惠的门」，副标题「你教我，我教你」。对象是孩子、家长和一起学习的同伴；问题尽量一句话，使用孩子熟悉的小事。
2. 保留现有功能预览的主阅读页、左侧分段、课文下拉菜单、双语阅读和原阅读器工具。Design 1 的暖白纸面、深绿文字、浅绿讨论区、珊瑚色选词用于逐句弹窗。
3. 一节经文是一句：先完整显示一种语言，再紧接同一节的另一种语言。初始中文在前、英文在后。Flip 只交换顺序，不交换经文对应关系。
4. 首篇《爱的篇章》是哥林多前书 13 章，中文和合本、英文 NIV。不要在标题、语言选择、句子或弹窗里放版本标签；来源信息集中到页尾来源入口。
5. 13 节分为三段：1–4、5–8、9–13，共 4 / 4 / 5 句。任何新段落不超过 7 句。
6. 整段页面负责阅读。**整段后面不再放讨论题、应用问题或整段笔记。**
7. 工具栏「逐句学」打开当前小段的第一句；每节「学这一句」直接打开该句。
8. 弹窗一次显示一节，可切换「读整句 / 拆成短句」。短句按意思人工对应，不能按两个语言的逗号位置机械配对。
9. **讨论与应用问题跟着当前整句或短句变化。** 双语问题、简短提示、轮流教词和想法笔记都在弹窗内。
10. 中文正式配音 `fangfang/zh`，英文 `louise/en`。预览现在只有明确标注的浏览器「系统试听」。

## 预览已有、可直接复用的内容

| 文件 | 内容 |
| --- | --- |
| `preview/index.html`, `style.css` | 用户已认可的阅读页面、原工具、下拉课文选择 |
| `preview/app.js` | 双语阅读、点词、拼音、默写、生词本、进度、共享播放控制 |
| `preview/study.js`, `study.css` | 逐句弹窗及 Design 1 大字样式 |
| `preview/study-content.js` | 13 节的 43 个短句对应关系，以及整句/短句的原创双语问题 |
| `preview/lesson.js` | 完整中文经文、中文分词、儿童释义、4/4/5 分段 |
| `preview/record.js` | 从原阅读器沿用的单条本地录音和音量处理 |
| `preview/seed-reference.json` | 来自原项目的词典及《种子与好土》参考内容 |
| `preview/server.py` | 仅供本地预览的静态服务器和英文 API 代理 |
| `design/concepts/option-1.png` | 用户选定的视觉方向；不是要把整张图贴进产品 |
| `design/tokens.json` | 已记录 selectedOption=1 和弹窗字号/配色 |
| `design-qa.md`, `design/qa/` | 本轮验收及浏览器截图 |

《种子与好土》是切换课文的参考示例：已支持整句学习和每节问题，尚未编写中英短句对应关系。不要把未经校对的自动断句开放给孩子。

## 正式实现方案

### 1. 沿用简单的静态前端 + Worker

参考 `/Users/yqin/repo/playground/lucas-academy-chinese` 的 vanilla JS ES modules + Cloudflare Worker 架构，无需重写成大型框架。拆出内容、播放器、词典、存储与弹窗模块，保留预览确认过的行为。

建议目录：

```text
public/
  index.html
  styles/
  js/                     # app, reader, study, audio, recording, dictionary, storage
  lessons/                # lesson registry, Chinese text, editorial alignment/questions
  audio/love/{zh,en}/      # 面向浏览器的成品音频及 manifest
  images/words/           # 词语图片后续接入；此阶段允许没有图片
worker/index.js           # /api/passage; other requests → ASSETS
wrangler.jsonc
package.json              # dev, validate, deploy 等可重复命令
preview/                  # 保留本次确认依据
design/                   # 设计稿和 tokens
```

静态资源目录必须限定为 `public/`，不要把仓库根、文档、本地服务器或私密配置作为正式站点资源。生产 Worker 名称为 `lucas-academy-lang`，自定义域名为 `lang.lucasacademy.org`；保留 `assets.run_worker_first: ["/api/*"]`。

### 2. 课文、语言与问题模型

- 课文通过 registry 和 dropdown 选择，语言数据与显示顺序独立。
- 首批开放有完整内容的 `zh` 和 `en`；结构允许新增语言。不要显示不能实际阅读的空语言选项。
- 使用稳定的 lesson / section / verse / unit ID。序号、问题、词典、音频和图片都绑定 ID，不用屏幕上的位置当数据主键。
- `study-content.js` 的中文分组、英文单词边界与 fingerprint 是当前文本的校对结果。拆分后拼接必须严格还原整节，不丢字、不改字、不重复。
- 上游英文改变或尚未加载时，回退整句模式。保留中文阅读和重试入口；不要显示错配的短句。
- 每个完整 verse 和每个 unit 都有独立的双语问题。释义明确标为「用简单的话理解」，不要混入原文。
- 本地笔记按 `lesson + verse + whole/unitId` 区分；翻转顺序不改变笔记归属。
- 首版无需账户、登录、在线分享或云端同步。学习进度、生词本、偏好、录音和想法保存在当前设备；命名空间与原中文阅读器分开。

### 3. 逐句弹窗的完整行为

- 桌面暖白 modal；手机为全屏学习页。正文桌面 38–42 px，手机 30 px；英文使用 Georgia 类衬线字体，中文与英文都清楚可读。
- 固定头部和底部导航，正文内部滚动。短屏减少工具区高度，优先看见课文与问题。
- 顶部只列当前小段的 4–5 节，允许跳到某句；支持上一句/下一句及上一小句/下一小句。
- 读完当前节的最后一个短句后，进入下一节的第一小句；当前小段末尾变为「这段学完了」。点击后标记当前段完成并回到该段概览，由用户再决定是否换段。
- 弹窗内可以翻转语言、显示拼音、听单种语言、双语连读、点词、听词、收藏词和轮流教词。
- 词义在弹窗内部展开，不能依赖被 modal 遮住、不可操作的页面侧栏。
- 关闭、换句、换段、换课文、翻转顺序都会结束旧播放。一个音频控制器负责所有声音，避免两路同时播放及旧回调启动下一句。
- 原生 dialog 或等价可访问实现：键盘焦点留在弹窗内，Esc 关闭，关闭后返回触发按钮，背景不能滚动。异步重绘导致原按钮消失时，焦点回到「逐句学」。
- 现有默写仍在主阅读页使用，逐句弹窗用于看原文学习；原录音、速度、暂停/继续和生词本功能继续保留。

### 4. 英文 API 与配置

复用原项目 `worker/index.js` 的 YouVersion 请求模式：逐节请求，返回带 verse number 的列表，避免把整段无编号英文猜着拆开。

- `GET /api/passage?translation=NIV&ref=1CO.13.1-4` 等，单次最多 7 节，并检查是否属于已注册课文。
- 生产密钥 `YVP_APP_KEY` 只配置到 Worker secret。本地预览目前读取原项目 `.dev.vars`，正式代码不能依赖用户机器上的绝对路径。
- 英文正文按需加载，不写进 Git、构建产物、静态 fixture 或客户端持久存储；词边界、hash 和原创问题可以提交。
- 保留服务返回的来源/版权信息并集中呈现，不在学习区重复版本标签。
- 网络失败、服务端缺配置、英文尚未加载都必须有可理解的状态；中文和已有工具继续工作。

### 5. 正式配音

工作流位于 `/Users/yqin/repo/playground/lucas-academy-media/README.md` 的 Lesson narration：`lucas-narrate`、`check_narration.py`、`publish_narration.sh`。使用已存在的 `profiles/fangfang/zh/` 和 `profiles/louise/en/`，不要重新训练或复制私人参考录音。

- 每节整句音频，以及 43 个短句各自的中英音频，都需要独立可寻址的 clip 或经过校对的时间范围；不要用同一段整句音频冒充短句播放。
- 推荐一个 manifest，按 `{lessonId, verseId, unitId, language, voice, src, duration, textHash}` 查找声音。整句 `unitId=whole`。
- 中文和英文对应各自原文；不读节号，不把解释或讨论题混进经文。生成脚本中的运行时英文留在 media 私有工作目录，不提交到 lang 仓库。
- 先生成各语言一条整句和一条短句，检查声音、读音与速度，再批量生成。默认儿童慢速，已做慢速的录音正常播放，避免重复减速。
- 使用媒体仓库现有校对脚本检查漏字、重复、错读；逐条抽听，尤其检查专名和短句开头/末尾是否截断。统计实际非空文件和时长，不能仅看命令退出码。
- 导出通用 MP3。录音缺失时可以提供明确标注的系统试听；不能把浏览器声音标为 fangfang 或 louise。
- 首版词语发音可沿用系统语音，整句与短句优先播放指定配音。用户录音仍只在本机保存。

### 6. 词语图片留好接口，产品实现后交回 Codex

为词条增加可选 `image: {src, alt, caption}`，文字释义始终可用。有图时在词义面板展示；无图不放空白画框，不影响点击学习。

中英文同义词共享概念 ID 和图片。抽象词用孩子能懂的小场景，例如「忍耐」是等待朋友说完。CC 输出去重后的词语清单和图片 manifest，再由 Codex 配图。此阶段不生成产品图片，也不把本次三张设计稿当词语配图使用。

## 执行顺序与验收

1. 整理 `public/` 与模块，保留 `/preview/` 作为对照。先完成《爱的篇章》的全部交互。
2. 配置独立 Worker 和服务器英文接口；补全中文及英文重要词条、数据校验和异常状态。
3. 接入实际指定配音与完整 manifest，保留原阅读器工具，检查移动设备和键盘操作。
4. 按下面清单验收，更新 README 和运行命令。
5. 检查 GitHub 目标是否存在；存在则使用既有 repo，否则新建 `yancyqin/lucas-academy-lang`。新建时默认 private，不改变已有仓库可见性。提交审查过的产品文件与文档，不提交配置、私人录音、模型或运行时文本。
6. 完成用户交给 CC 的正式部署步骤，使用独立 Worker 和目标自定义域名。部署后验证根页面、英文 API、两种语言配音、手机阅读以及资源 URL；记录 commit、部署版本和可回退版本。
7. 把实施结果、词语图片 manifest 和未解决问题交给用户，随后由 Codex 制作词语图片。

验收清单：

- [ ] 整段无讨论区，无版本徽标；课文通过 dropdown 切换。
- [ ] 13 节完整，分段 4/4/5；flip 后仍是同一节双语相邻。
- [ ] 13 个整句、43 个短句都能学习；断句原样拼接还原文本。
- [ ] 每个学习单元都有相关的儿童双语问题；笔记不串到其他句子。
- [ ] 词语点开、释义、发音、收藏和刷新恢复正常；图片缺失也正常。
- [ ] 拼音、默写、慢读、暂停/继续、停止、录音回放和删除保留。
- [ ] 中文 fangfang、英文 louise 可听；短句播放内容准确，没有整句冒充短句。
- [ ] 关闭或切换后没有旧声音继续；键盘 Tab / Shift+Tab 不跑到背景。
- [ ] 320 px、390 px、桌面以及真实 iPad 上无横向溢出，导航始终可用。
- [ ] API 未加载/失败时不会假装显示英文；文字变化时不展示未经核对的短句。
- [ ] 无浏览器错误，秘密不出现在客户端和 Git，正式静态资源只来自 public。
- [ ] 真机检查麦克风、系统语音、指定配音与 Safari 自动播放限制。

## 当前预览复查命令

```bash
python3 /Users/yqin/.codex/skills/start-preview-server/scripts/start_preview_server.py \
  /Users/yqin/repo/playground/lucas-academy-lang --path /preview/ \
  --command python3 preview/server.py
node scripts/check-study-alignment.mjs
```

预览地址：`http://127.0.0.1:8095/preview/`。设计图：`http://127.0.0.1:8095/design/`。
