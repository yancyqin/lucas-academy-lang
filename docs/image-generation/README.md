# 词语配图生成记录

2026-09-30，按 `docs/word-images.md` 的 24 个去重概念完成图片，使用内置 `image_gen`，每个概念单独生成。图片已经接入词语面板；提交与部署状态见 [发布记录](../release.md)。

- 成品：`public/images/words/*.webp`，24 张，均为 800×600，合计 2,381,152 字节（约 2.27 MiB）。
- 清单：`public/images/words/manifest.json`，24 个 `src` 和中英双语 `alt` 均已填写。
- 完整提示词：[word-image-prompts.json](word-image-prompts.json)。
- 源 PNG 路径、成品路径、大小和 SHA-256：[generated-sources.json](generated-sources.json)。源 PNG 保留于生成工具的本机目录；网站仅依赖仓库内的 WebP。

统一使用暖色纸张、水粉与彩铅风格，沿用 Design 1 的纸白、深绿、鼠尾草绿和珊瑚色。图片中没有文字；「方言」用画着同一朵花的气泡表达共同意思。「嫉妒」「自夸」「张狂」按原有画面要求呈现友善回应，并补充双语图注帮助理解。

原图为 1448×1086，使用 Sharp 等比例缩小并编码为 WebP（quality 88、effort 6），未裁切画面。

验收结果：

- `npm run validate` 通过，配图覆盖为 24/24。
- 24 个本地图片 URL 均返回 HTTP 200、`image/webp`，响应内容与文件完全一致。
- 浏览器点击「忍耐」和 patient，均加载 `patience.webp`，实际图片尺寸为 800×600。
- 逐句学习弹窗中的词语卡正常显示同一图片。
- 390×844 手机宽度下，图片显示为 310×232.5，页面无横向溢出。
- 浏览器控制台没有警告或错误。

桌面和手机验收截图留在本机预览目录，避免把页面中的英文经文保存进仓库：`/Users/yqin/.codex/visualizations/2026/09/30/01a0f0e4-6a22-7351-b134-bc3862dbcbd1/word-images-qa/`。
