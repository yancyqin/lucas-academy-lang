// Anonymised first-person sharing and prayers for Week 5, read together.
// Each unit: [English, segmented Chinese, 用简单的话理解, In simple words]
const lines = [
  ['I attended a welcome ceremony for two new teachers and felt very bored.',
    '我/参加/了/两位/老师/的/入职/仪式/，/觉得/很/无聊/。',
    '我参加了欢迎两位老师开始新工作的仪式，觉得没有意思。', 'I went to a ceremony to welcome two teachers to their new jobs, and I did not find it interesting.'],
  ['I pray that my little sister will not keep making a sad face this week.',
    '我/祷告/，/希望/妹妹/这一周/不要/总是/哭丧着脸/。',
    '我祷告，希望妹妹这一周不要总是一脸难过的样子。', 'I pray that my little sister will not look upset so often this week.'],
  ['On Saturday, my dad took his students to the movies. He lost his wallet, and no one was willing to help look for it. Later, my mom and I went to the movie theater to look for it, and I finally found it under a chair.',
    '星期六/，/爸爸/带/学生/去/看电影/。/爸爸/的/钱包/丢/了/，/没有人/愿意/帮忙/找/。/后来/，/我/和/妈妈/去/电影院/找/，/最后/，/我/在/一张/椅子/下面/找到/了/爸爸/的/钱包/。',
    '爸爸带学生看电影时丢了钱包，没有人愿意帮忙找。后来，我和妈妈去找，我在椅子下面找到了。', 'Dad lost his wallet when he took his students to the movies. No one wanted to help look for it. Later, Mom and I went to look, and I found it under a chair.'],
  ['My school will be decorated on Thursday. I pray that the decorations will turn out well.',
    '星期四/，/学校/要/做/布置/。/我/祷告/，/希望/能/布置/得/很/好/。',
    '星期四学校要布置环境，我希望布置得很好。', 'There will be decorating at school on Thursday, and I pray that it will go well.'],
  ['My school has activities every day this week. Each day, we wear a different color to represent a different activity.',
    '这一周/，/学校/每天/都/有/活动/。/我们/每天/穿/不同/颜色/的/衣服/，/代表/不同/的/活动/。',
    '学校每天都有活动，大家穿不同颜色的衣服来表示不同的活动。', 'There is an activity at school every day, and the color we wear shows which activity it is.'],
  ['I pray that I will have a special hairstyle during this week’s activities.',
    '我/祷告/，/希望/这一周/参加/活动/时/，/我/的/发型/很/有特点/。',
    '我希望参加这一周的活动时，自己的头发样式很特别。', 'I pray that my hair will look special during this week’s activities.'],
];

export const units = lines.map(([en, zh, explainZh, explainEn]) => ({
  en,
  tokens: zh.split('/'),
  explain: {zh: explainZh, en: explainEn},
}));
