// Each repeated affirmation has its own question about the action just read.
const lines = [
  ['明天上学，你想自己准备哪两样东西？', 'What two things would you like to get ready for school tomorrow?'],
  ['你最近自己做好了哪一件小事？', 'What little job have you done by yourself recently?'],
  ['如果把书借给朋友，你希望朋友怎样保管它？', 'If you lend a book to a friend, how would you like them to look after it?'],
  ['记得归还借来的东西，会让别人有什么感觉？', 'How might someone feel when you remember to return what you borrowed?'],
  ['你答应过朋友什么事？怎样让自己记得？', 'What have you promised a friend? How can you remember to do it?'],
  ['如果答应的事暂时做不到，你会怎样和朋友说？', 'If you cannot do what you promised yet, what could you tell your friend?'],
  ['教室里有哪些小事，是你可以帮忙做的？', 'What little jobs could you help with in the classroom?'],
  ['和同学一起值日时，你想负责哪一件事？', 'When you tidy the classroom with your classmates, which job would you like to do?'],
  ['不小心碰倒朋友的积木，你会先说什么？', 'If you knock over a friend’s blocks by accident, what would you say first?'],
  ['承认自己做错了事时，心里会是什么感觉？', 'How might you feel when you admit that you made a mistake?'],
  ['你现在有哪一件不会做的事，想请人教你？', 'What is something you cannot do yet that you would like someone to teach you?'],
  ['别人请你帮忙时，你愿意怎样帮助他？', 'How would you like to help someone who asks you for help?'],
  ['大家一起做一件事时，你能出哪一份力？', 'When everyone works on a job together, how could you help?'],
  ['你做过什么小事，让大家轻松了一点？', 'What little thing have you done that made a job easier for everyone?'],
  ['如果忘了做一件事，你想用什么办法记起来？', 'If you forget a job, what could help you remember it?'],
  ['把忘记的事补上以后，你会怎样鼓励自己？', 'After finishing a job you forgot, what kind words could you say to yourself?'],
  ['你正在慢慢学会什么？谁可以陪你练习？', 'What are you learning little by little? Who could practise with you?'],
  ['说说一件小事，告诉对方：我也是一个有责任感的人。', 'Share a little thing you do that shows you are a responsible person too.'],
];

export const questions = lines.map(([zh, en]) => ({zh, en}));
