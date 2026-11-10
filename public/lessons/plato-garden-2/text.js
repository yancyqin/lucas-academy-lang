// Read the story in full in each language. The line breaks separate scenes.
const paragraphs = [
  ['Last time, everyone talked about what they wanted to do when they grew up. This time, six children came back with garden names. A sign on the wall asked, “What’s one small thing you can teach someone today?”',
    '上次/，/大家/聊/了/长大/以后/想/做/什么/。/这次/，/六/个/孩子/带着/园中/名字/回来/。/墙/上/贴着/一/张/纸/，/上面/写着/“/今天/，/你/能/教/别人/哪/一/小步/？/”'],
  ['Peel taped a banana to the wall. “A million dollars each! I’ll be a billionaire!” The banana slid down. He caught it. “I haven’t even sold the first one yet!”',
    '蕉点/用/胶带/把/香蕉/贴/在/墙/上/。/“/一/根/卖/一百万/！/我/就/快/成/亿万富翁/了/！/”/香蕉/慢慢/滑下来/。/他/伸手/接住/了/香蕉/。/“/第一/根/还/没/卖出去/呢/！/”'],
  ['Bridge wanted to be an engineer. He folded a paper sign so it would stand on its own beside the banana. Peel picked up a piece of paper. “That was too fast. How do you make the first fold?” Bridge folded the paper in half and waited for Peel to try.',
    '方桥/想/当/工程师/。/他/折/了/个/纸牌/，/放/在/香蕉/旁边/，/纸牌/自己/站住/了/。/蕉点/拿起/一/张/纸/。/“/刚才/太/快/了/。/第一/下/怎么/折/？/”/方桥/把/纸/对折/，/然后/等/蕉点/也/折/一下/。'],
  ['Palette wanted to do people’s makeup. She drew two faces that looked the same and gave just one of them rosy cheeks. “What’s different?” Sprout pointed to the cheeks and drew a face of her own. It was a child yawning. “I used to say I wanted to be an artist. I’d like to be a mom, too. If my child can’t sleep, I can draw him a story.”',
    '彩盘/想/给/人/化妆/。/她/画/了/两/张/一样/的/脸/，/只/给/一/张/涂/了/腮红/。/“/哪里/不一样/？/”/小芽/指了指/脸颊/，/也/画/了/一/张/，/是/个/打哈欠/的/孩子/。/“/我/以前/说/想/当/艺术家/。/我/现在/还/想/当/妈妈/。/以后/孩子/睡不着/，/我/就/画/个/故事/给/他/看/。/”'],
  ['Echo wanted to be a singer. “I’m pretty good at singing! I’ll sing for the child in the drawing.” She sang two lines in one breath. Sprout wanted to sing along, but could only remember the first line. So Echo sang one line, waited for Sprout to sing it back, and then sang the next.',
    '回声/想/当/歌手/。/“/我/唱/得/挺/好/！/我/来/给/画/里/的/孩子/唱/。/”/她/一口气/唱/了/两/句/。/小芽/想/跟着/唱/，/只/记住/了/第一/句/。/回声/就/唱/一/句/，/等/小芽/唱/回来/，/再/唱/下/一/句/。'],
  ['Sail drew a game. “When I grow up, I want to stay single and spend my money on vacations and a heated toilet seat. My game has both!” Peel looked for a long time. “Where do I start?” Sail looked at the game. He had forgotten to draw a starting point.',
    '远帆/画/了/一/个/游戏/。/“/我/长大/想/单身/，/把/钱/花/在/度假/和/加热/马桶圈/上/。/我/的/游戏/里/，/两样/都/有/！/”/蕉点/找/了/半天/。/“/从/哪儿/开始/玩/？/”/远帆/看/了/看/，/原来/自己/忘/了/画/起点/。'],
  ['Before they left, the children wrote down what they had taught and learned. Peel wanted to tape his note to the wall. Sail wanted to tape a starting point onto his game. There was only one roll of tape on the table. Two hands reached for it at the same time.',
    '要/走/时/，/大家/写下/自己/教/了/什么/、/学会/了/什么/。/蕉点/要/把/纸条/贴/上/墙/，/远帆/要/给/游戏/贴/一/个/起点/。/桌上/只有/一/卷/胶带/，/两/个/人/同时/伸出/了/手/。'],
];

export const units = [{
  en: paragraphs.map(([en]) => en).join('\n'),
  tokens: paragraphs.map(([, zh]) => zh).join('/\n/').split('/'),
}];
