# Worktree 清理记录 · 2026-10-13

按所有者要求检查本项目的全部 Git worktree，先保存未提交代码，再移除额外工作目录。最终仅保留主目录 `/Users/yqin/repo/playground/lucas-academy-lang`，使用 `main` 分支。

| 已删除的工作目录 | 处理结果 |
| --- | --- |
| `lucas-academy-lang-family-year` | 原有 16 句旧草稿先提交并推送。所有者随后取消《我家的一年》，该目录及 `codex/my-family-year-starter` 本地、远程分支均已删除 |
| `lucas-academy-lang-idioms2` | `55e4624` 已包含在主分支，确认目录干净后删除 |
| `lucas-academy-lang-scripture-audio` | `c19a886` 已通过 #18 合并并部署，确认目录干净后删除 |
| `lucas-academy-lang-weekly-embed` | detached HEAD `e95b632` 已包含在主分支，确认目录干净后删除 |

删除前逐一确认没有未提交的 tracked 或 untracked 文件。137 个被 Git 忽略的配置、缓存文件已保存在私有本地压缩包中，目录权限为 0700、压缩包权限为 0600；配置内容没有进入 Git。备份与逐项审计记录位于 `/Users/yqin/Downloads/lucas-lang-pr18-release-ui67dhgi/worktree-cleanup/`。

本地预览原先运行于已删除的配音 worktree，现已迁至主目录，并核验监听进程的工作目录及课文文件内容。继续使用：

- 本机：<http://127.0.0.1:8095/class?w=3>
- 局域网：<http://192.168.0.138:8095/class?w=3>
