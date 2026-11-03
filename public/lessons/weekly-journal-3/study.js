const lines = [
  ['参加活动时，如果你觉得无聊，可以怎样表达自己的感受？', 'If you feel bored at an event, how could you express your feelings?'],
  ['妹妹或别的孩子难过时，你可以怎样关心他们？', 'How could you care for your little sister or another child when they feel sad?'],
  ['你帮家人找过丢失的东西吗？你是怎样找到的？', 'Have you helped a family member look for something they lost? How did you find it?'],
  ['如果你可以帮学校做布置，你想怎样布置？', 'If you could help decorate your school, how would you like to decorate it?'],
  ['如果用一种颜色代表你喜欢的活动，你会选什么颜色？', 'If you chose a color to represent an activity you like, what color would you choose?'],
  ['参加活动时，你想尝试什么特别的发型？', 'What special hairstyle would you like to try for an activity?'],
];

export const questions = lines.map(([zh, en]) => ({zh, en}));
