// One everyday question per reading unit; study each line group as a whole.
const lines = [
  ['你想念一个不在身边的人时，会做些什么？', 'What do you do when you miss someone who is far away?'],
  ['如果可以问月亮一个问题，你想问什么？', 'If you could ask the moon one question, what would you ask?'],
  ['你想象中的月亮上有什么？说给对方听。', 'What do you imagine on the moon? Tell your partner.'],
  ['有没有一个地方，让你既想去，又有一点担心？', 'Is there a place you would like to visit but feel a little worried about?'],
  ['和身边的人一起做什么，会让你觉得很快乐？', 'What do you enjoy doing with the people around you?'],
  ['晚上睡不着时，你会看见什么、听见什么？', 'What do you see or hear when you cannot sleep at night?'],
  ['节日里不能和想念的人在一起，你会怎样联系他？', 'How could you reach someone you miss when you cannot spend a holiday together?'],
  ['遇到一件不如意的小事时，什么能帮助你慢慢平静下来？', 'What helps you feel calmer when a little thing does not go as you hoped?'],
  ['你想把「但愿人长久」这句祝福送给谁？', 'Who would you like to send the wish “May you live long and well” to?'],
];

export const questions = lines.map(([zh, en]) => ({zh, en}));
