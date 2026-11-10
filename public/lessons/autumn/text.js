// The owner's complete article, including its closing question.
const zh = [
  '天/冷/了/，/加拿大雁/飞/到/我们/这里/来/了/过冬/，/它们/在/湖/里/游/，/在/草地/上/吃/草/。',
  '树叶/黄/了/，/天黑/得/也/早/了/，/才/走/一会儿/，/路灯/就/亮/了/。',
  '它们/为什么/来/这里/过冬/？',
].join('/\n/');

export const units = [{
  tokens: zh.split('/'),
  en: [
    'It is getting cold. Canada geese have come here to spend the winter. They swim in the lake and eat grass on the lawn.',
    'The leaves have turned yellow. It gets dark earlier now. We have only been walking for a little while when the streetlights come on.',
    'Why do they come here for the winter?',
  ].join('\n'),
}];
