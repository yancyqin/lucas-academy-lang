const paragraphs = [
  ['Last time, after reading about Ethan’s dream of building a bridge, Bella asked, “Can you add my dream next time?”',
    '上次/读/完/ /Ethan/ /想/造/桥/的/故事/，/Bella/ /问/：/“/下次/可以/把/我/的/梦想/也/加/进去/吗/？/”'],
  ['Bella has thought about designing clothes and opening a bakery. She said her dreams might change as she grows up.',
    'Bella/ /想/过/做/服装/设计/，/也/想/过/开/一/家/烘焙店/。/她/说/，/长大/以后/，/自己/的/梦想/也许/还/会/变/。'],
  ['Her mom and sister can make cakes, cookies, and cream puffs. Bella wants to find a tutorial, follow it step by step, and write the recipe down on a piece of paper.',
    '她/的/妈妈/和/姐姐/会/做/蛋糕/、/饼干/和/泡芙/。/Bella/ /想/先/找/一/个/教程/，/照着/一步一步/学/，/再/找/张/纸/把/配方/记/下来/。'],
  ['The teacher asked why she wanted to do it. Bella said that making things made her happy and gave her a sense of accomplishment.',
    '老师/问/她/为什么/想/做/。/Bella/ /说/，/做/的/时候/很/开心/，/也/很/有/满足感/。'],
];

export const units = [{
  en: paragraphs.map(([en]) => en).join('\n'),
  tokens: paragraphs.map(([, zh]) => zh).join('/\n/').split('/'),
}];
