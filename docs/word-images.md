# 词语配图清单

由 `npm run images:list` 根据课文词条生成；去重后共 24 个概念，已完成 24 个。中文词与它的英文对应词共用一张图。

配图要求：Warm, simple illustration for children aged 7–10; Design 1 palette (paper #F8F5ED, ink #293D36, sage #DDE6DB, coral #CB765D); no text in the image; 4:3, about 800×600, WebP.

完成一张图后：把文件放到「目标文件」位置，在 `public/images/words/manifest.json` 中为该概念填写 `src`（相对网站根目录，如 `images/words/patience.webp`）、`alt`（一句话描述画面）和可选的 `caption`，再运行 `npm run validate`。没有 `src` 的词照常用文字学习，页面不显示空白画框。

| # | 概念 | 中文 | English | 画面 | 目标文件 | 完成 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `love` | 爱 | love | 一个孩子留出身边的位置，邀请另一个孩子坐下。<br>A child makes room on a bench and invites another child to sit down. | `public/images/words/love.webp` | ✓ |
| 2 | `patience` | 忍耐 | patient, patience, perseveres | 一个孩子等朋友把话讲完，再开口。<br>A child waits, listening, until a friend has finished speaking. | `public/images/words/patience.webp` | ✓ |
| 3 | `kindness` | 恩慈 | kind, kindness | 一个孩子弯下身，帮朋友捡起散落的蜡笔。<br>A child bends down to help a friend pick up spilled crayons. | `public/images/words/kindness.webp` | ✓ |
| 4 | `envy` | 嫉妒 | envy, envies | 朋友得到新画笔，另一个孩子先看看自己的笔，再和他一起画。<br>A friend has new paintbrushes; the other child looks at their own brush, then paints alongside. | `public/images/words/envy.webp` | ✓ |
| 5 | `boasting` | 自夸 | boast, boasts | 孩子展示自己的积木，也给朋友留下展示的位置。<br>A child shows their block tower and leaves space for a friend to show theirs. | `public/images/words/boasting.webp` | ✓ |
| 6 | `pride` | 张狂 | proud | 两个孩子把自己的作品放在同样高的桌面上。<br>Two children set their artwork side by side on a table of the same height. | `public/images/words/pride.webp` | ✓ |
| 7 | `lasting` | 恒久 | — | 同一对朋友在不同日子里互相等候。<br>The same two friends waiting for each other on different days (small panels: sun, rain, autumn). | `public/images/words/lasting.webp` | ✓ |
| 8 | `languages` | 方言 | tongues, languages | 两个孩子用不同语言谈论同一张画。<br>Two children talk about the same flower drawing; picture-only speech bubbles show the shared meaning without written words. | `public/images/words/languages.webp` | ✓ |
| 9 | `gong` | 锣 | gong | 一面圆锣和一根敲锣的小槌。<br>A round gong and its small mallet. | `public/images/words/gong.webp` | ✓ |
| 10 | `cymbal` | 钹 | cymbal, clanging | 两片圆形铜钹，旁边有弯曲的声音线。<br>A pair of round brass cymbals with curved sound lines. | `public/images/words/cymbal.webp` | ✓ |
| 11 | `understanding` | 明白 | understand, fathom | 一个孩子指着画解释，朋友点头。<br>A child points at a drawing to explain; the friend nods, understanding. | `public/images/words/understanding.webp` | ✓ |
| 12 | `knowledge` | 知识 | knowledge | 打开的书、尺子和孩子观察的叶子。<br>An open book, a ruler, and a leaf a child is studying. | `public/images/words/knowledge.webp` | ✓ |
| 13 | `faith` | 信 | faith, trusts | 一个孩子牵着信任的大人的手，走在小路上。<br>A child holds the hand of a trusted grown-up on a path. | `public/images/words/faith.webp` | ✓ |
| 14 | `moving-mountains` | 移山 | mountains, move | 一座山与很小的孩子，用大小对比表达。<br>A small child in front of a huge mountain, showing the contrast in size. | `public/images/words/moving-mountains.webp` | ✓ |
| 15 | `giving` | 赒济 | give, poor | 把一篮食物递给需要食物的邻居。<br>Handing a basket of food to a neighbor who needs it. | `public/images/words/giving.webp` | ✓ |
| 16 | `anger` | 发怒 | angered, angry | 一个孩子生气时先停一停，慢慢呼吸。<br>An upset child pauses and takes a slow breath before speaking. | `public/images/words/anger.webp` | ✓ |
| 17 | `truth` | 真理 | truth | 孩子打翻杯子后，诚实地指着自己说明经过。<br>After knocking over a cup, a child honestly points to themself and explains what happened. | `public/images/words/truth.webp` | ✓ |
| 18 | `bearing-with` | 包容 | protects | 画画时颜色溅到纸上，两个孩子一起想办法。<br>Paint splashes onto a drawing; two children work out together what to do. | `public/images/words/bearing-with.webp` | ✓ |
| 19 | `hope` | 盼望 | hope, hopes | 两个孩子给刚发芽的小植物浇水。<br>Two children water a seedling that has just sprouted. | `public/images/words/hope.webp` | ✓ |
| 20 | `in-part` | 有限 | part, partially | 一块拼图旁边留着还没拼好的位置。<br>A jigsaw puzzle with a gap where pieces are still missing. | `public/images/words/in-part.webp` | ✓ |
| 21 | `completeness` | 完全 | completeness, complete | 几块拼图拼成一整幅图。<br>The last puzzle pieces fit, completing the whole picture. | `public/images/words/completeness.webp` | ✓ |
| 22 | `mirror` | 镜子 | mirror | 一面能看到孩子脸庞的小镜子。<br>A small mirror showing a child’s face. | `public/images/words/mirror.webp` | ✓ |
| 23 | `unclear` | 模糊不清 | reflection | 同一片叶子：一边隔着雾玻璃，一边直接看。<br>The same leaf seen two ways: blurred behind frosted glass, and clearly in the open. | `public/images/words/unclear.webp` | ✓ |
| 24 | `face-to-face` | 面对面 | face | 两个孩子坐在同样高度，面对面谈话。<br>Two children sitting at the same height, talking face to face. | `public/images/words/face-to-face.webp` | ✓ |
