# 周记与责任感课文配音

2026-10-13：按所有者要求，为「周记 · 第 1 期」及自创《你是一个有责任感的人》补上中文 Fangfang、英文 Louise 整句配音，生成语速均为 0.75。

| 课文 | 正文单元 | 中文录音 | 英文录音 |
| --- | ---: | ---: | ---: |
| `weekly-journal-1` | 6 | 6 | 6 |
| `responsible` | 18 | 18 | 18 |

配音从当前课文直接生成脚本，按稳定的句子 ID 和屏幕文字 hash 绑定。周记第 5 句读「我学了一种拼魔方的新算法。」及 “I learned a new algorithm for solving a Rubik’s Cube.”。

责任感第 5 句英文顺为 “You remember what you promised your friends and do it with care.”，并为词典补上 `promised` 过去式说明；中文 18 句保留。按更新后的英文重新生成录音并检查。

责任感课文的 8 句身份肯定文字相同，每种语言使用同一条录音，分别绑定各句 ID；最后一句「小小的你，也是一个有责任感的人。」单独录制。合计 34 条不同的原始录音，生成网页的 48 个 MP3。

48 个 MP3 合计 250.48 秒、1,529,712 字节；周记 81.54 秒，责任感课文 168.94 秒。

## 生成与检查

- 使用 `lucas-academy-media` 现有 CosyVoice 工作流，明确指定 `fangfang/zh`、`louise/en` 及 `--speed 0.75`；原始 WAV、声音参考和完整识别记录保留在媒体工作区。
- Whisper small 对照每条录音与脚本；英文忽略标点、大小写、撇号及数字转写的排版差异，按词核对；中文按无声调拼音核对，同音字的识别差异保留实际原始分数。
- 转码后的 34 条不同 MP3 再做全文识别。小模型对周记英文第 1、2 句有分歧，使用 Whisper medium 独立复核通过；检查记录保留两次识别的实际分数和模型名称。
- 同时检查异常停顿、语速和没有对应词语的声音；打包前再次核验已检查 WAV 的 SHA-256 和文字 hash。
- 按现有脚本保留短暂起音与尾音，编码为单声道 32 kHz、48 kbps MP3。每句独立保存，阅读页及逐句学习使用同一份清单；默认速度下按 1× 播放。
- 逐条机器检查的分数、录音时长、文件大小与 SHA-256 见 [检查记录](journal-responsibility-audio-qa.json)。记录明确标记为机器核对，不记作所有者人工试听。

脚本位于媒体工作区的 `data/processed/lucas-lang/`，本批去重脚本与句子绑定关系位于其 `journal-responsible-20261013/` 子目录，录音与识别记录位于 `outputs/{fangfang/zh,louise/en}/lang-journal-responsible-20261013/`。

## 网页核验

`npm run validate`、`LANG_API_URL=https://lang.lucasacademy.org npm run check:english`、`git diff --check` 通过。两篇课文的中英文配音分别覆盖 6/6 与 18/18，正文英文词义仍分别覆盖 55/55 与 68/68。

Chromium 和 WebKit 各通过应用播放器加载并播放全部 48 条配音，默认播放倍率为 1×；逐句弹窗的双语连读、停止和关闭后停止均正常。系统语音回退、页面错误、缺失资源和经文 API 请求均为 0。WebKit 报告的 MP3 时长比清单约多 40–70 毫秒，时长比较采用 0.15 秒容差。
