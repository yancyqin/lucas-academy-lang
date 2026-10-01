// 哥林多前书 13 · 和合本 (CUV, public domain), checked against
// https://b.ibible.hk/bible/9/1co/13 on 2026-09-30.
// The English (NIV) is licensed: the Worker requests it at read time and it is
// never stored here. Words are pre-segmented; punctuation is its own token.
const lines = [
  '我/若/能/说/万人/的/方言/，/并/天使/的/话语/，/却/没有/爱/，/我/就/成了/鸣/的/锣/，/响/的/钹/一般/。',
  '我/若/有/先知/讲道/之/能/，/也/明白/各样/的/奥秘/，/各样/的/知识/，/而且/有/全备/的/信/，/叫/我/能够/移山/，/却/没有/爱/，/我/就/算不得/什么/。',
  '我/若/将/所有/的/赒济/穷人/，/又/舍/己身/叫/人/焚烧/，/却/没有/爱/，/仍然/与/我/无益/。',
  '爱/是/恒久/忍耐/，/又/有/恩慈/；/爱/是/不/嫉妒/；/爱/是/不/自夸/，/不/张狂/，',
  '不/做/害羞/的/事/，/不/求/自己/的/益处/，/不/轻易/发怒/，/不/计算/人/的/恶/，',
  '不/喜欢/不义/，/只/喜欢/真理/；',
  '凡事/包容/，/凡事/相信/，/凡事/盼望/，/凡事/忍耐/。',
  '爱/是/永不/止息/。/先知/讲道/之/能/终必/归于/无有/；/说/方言/之/能/终必/停止/；/知识/也/终必/归于/无有/。',
  '我们/现在/所/知道/的/有限/，/先知/所/讲/的/也/有限/，',
  '等/那/完全/的/来到/，/这/有限/的/必/归于/无有/了/。',
  '我/作/孩子/的/时候/，/话语/像/孩子/，/心思/像/孩子/，/意念/像/孩子/，/既/成了/人/，/就/把/孩子/的/事/丢弃/了/。',
  '我们/如今/仿佛/对着/镜子/观看/，/模糊不清/（/原文/作/如同/猜谜/）/；/到/那时/就要/面对面/了/。/我/如今/所/知道/的/有限/，/到/那时/就/全/知道/，/如同/主/知道/我/一样/。',
  '如今/常存/的/有/信/，/有/望/，/有/爱/这/三样/，/其中/最大/的/是/爱/。',
];

// 用简单的话理解: a plain retelling for children, never mixed into the text.
const explanations = [
  ['会说很多话，也要真心关心别人。', 'Our words matter when we care about the people hearing them.'],
  ['知道很多、能力很强，也需要爱。', 'Knowing a lot and being able to do a lot still need love.'],
  ['帮助人时，心里也要真的关心他。', 'When we help someone, caring about that person matters.'],
  ['爱会耐心等候，温柔待人，不总是夸自己。', 'Love gives people time and treats them kindly.'],
  ['爱会顾到别人，不只想着自己，也不总翻旧账。', 'Love considers others and does not keep bringing up old wrongs.'],
  ['爱喜欢诚实和正确的事，不为伤害人的事高兴。', 'Love is glad about what is true and right.'],
  ['爱愿意体谅、信任、盼望，也愿意坚持。', 'Love makes room for others, trusts, hopes, and keeps going.'],
  ['许多能力会过去，爱仍然长存。', 'Abilities may come to an end; love lasts.'],
  ['我们懂得的只是其中一部分。', 'We only understand part of the picture.'],
  ['这里盼望有一天，我们能明白得更完整。', 'This looks ahead to a time of fuller understanding.'],
  ['长大时，我们说话和想事情的方式也会改变。', 'As we grow, the way we speak and think changes.'],
  ['我们现在还不能全明白，像看不清楚的镜子。', 'We do not yet see everything clearly.'],
  ['信、望、爱都长存，其中最大的是爱。', 'Faith, hope, and love remain, and love matters most.'],
];

export const verses = lines.map((line, i) => ({
  id: `1CO.13.${i + 1}`,
  n: i + 1,
  tokens: line.split('/'),
  explain: {zh: explanations[i][0], en: explanations[i][1]},
}));

// No section may hold more than seven verses.
export const sections = [
  {id: '1-4', title: '有爱，才有意义', range: [1, 4], intro: '会很多本领，也可以温柔地关心别人。'},
  {id: '5-8', title: '把爱做出来', range: [5, 8], intro: '在小小的事情上，练习关心彼此。'},
  {id: '9-13', title: '长大，也继续学着爱', range: [9, 13], intro: '我们都有还不懂的事，也都有可以教给别人的东西。'},
];
