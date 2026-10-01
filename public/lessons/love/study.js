// Editorial alignment of the CUV text with the NIV the Worker returns at read
// time — which Chinese clauses and which English words mean the same thing.
// It records counts, never the English itself:
//   zh — how many Chinese punctuation clauses (，；。！？) the unit takes;
//   en — how many English words (whitespace-separated) the unit takes.
// `hash` fingerprints the English verse the alignment was checked against. If
// the upstream text ever differs, study falls back to the whole verse rather
// than showing clauses that no longer pair up. Unit ids are stable keys for
// questions, notes and narration clips.
//
// Every whole verse and every unit has its own question for children, in both
// languages: one sentence, about a small everyday moment.
export const study = {
  '1CO.13.1': {hash: '9a1553f0', question: {zh:"朋友没听懂你的话，你可以怎样再说一次？", en:"If a friend does not understand you, how could you say it again?"}, units: [
    {id: 'c1', zh: 2, en: 11, question: {zh:"你会用两种语言说「你好」吗？教教对方。", en:"Can you say hello in two languages? Teach your partner."}},
    {id: 'c2', zh: 1, en: 5, question: {zh:"同一句话，怎样说能让朋友觉得被关心？", en:"How can the way you speak help a friend feel cared for?"}},
    {id: 'c3', zh: 2, en: 10, question: {zh:"如果大家只顾着大声说话，可以怎样让每个人都被听见？", en:"If everyone is talking loudly, how can you help each person be heard?"}},
  ]},
  '1CO.13.2': {hash: 'b19c4412', question: {zh:"你会做的哪件小事，可以教给朋友？", en:"What is one small thing you can teach a friend?"}, units: [
    {id: 'c1', zh: 3, en: 15, question: {zh:"你最近学会了什么？用简单的话讲给对方听。", en:"What have you learned lately? Explain it in simple words."}},
    {id: 'c2', zh: 2, en: 10, question: {zh:"有一件事很难，你希望朋友怎样帮助你？", en:"When something is hard, how would you like a friend to help?"}},
    {id: 'c3', zh: 1, en: 5, question: {zh:"朋友还不会的时候，你可以怎样鼓励他？", en:"How can you encourage a friend who is still learning?"}},
    {id: 'c4', zh: 1, en: 3, question: {zh:"会做很多事的人，可以怎样关心别人？", en:"If you can do lots of things, how can you use them to care for others?"}},
  ]},
  '1CO.13.3': {hash: '4dffbe76', question: {zh:"帮助别人前，你可以先问他什么？", en:"What could you ask someone before helping them?"}, units: [
    {id: 'c1', zh: 2, en: 20, question: {zh:"你有什么东西可以分享，让别人开心一点？", en:"What could you share to brighten someone’s day?"}},
    {id: 'c2', zh: 1, en: 5, question: {zh:"怎样知道对方真正需要什么？", en:"How can you find out what someone really needs?"}},
    {id: 'c3', zh: 1, en: 3, question: {zh:"除了送东西，你还能怎样表达关心？", en:"Besides giving a gift, how can you show that you care?"}},
  ]},
  '1CO.13.4': {hash: 'bd613337', question: {zh:"朋友学得比你慢，你可以怎样陪他一起学？", en:"If a friend learns more slowly than you, how can you learn together?"}, units: [
    {id: 'c1', zh: 1, en: 3, question: {zh:"朋友还没说完，你可以怎样等一等？", en:"How can you give a friend time to finish speaking?"}},
    {id: 'c2', zh: 1, en: 3, question: {zh:"今天你可以做哪件温柔的小事？", en:"What is one kind thing you could do today?"}},
    {id: 'c3', zh: 1, en: 4, question: {zh:"朋友得到了你也想要的东西，你可以对他说什么？", en:"If a friend gets something you want too, what could you say to them?"}},
    {id: 'c4', zh: 1, en: 4, question: {zh:"做好一件事以后，怎样分享开心，也听听别人的故事？", en:"When you do something well, how can you share your joy and listen to others too?"}},
    {id: 'c5', zh: 1, en: 4, question: {zh:"你会、朋友还不会时，怎样让他觉得你们一样重要？", en:"When you can do something your friend cannot yet do, how can you show that you both matter?"}},
  ]},
  '1CO.13.5': {hash: 'd060c5f9', question: {zh:"和朋友意见不一样时，你可以怎样好好说话？", en:"When you and a friend disagree, how can you speak kindly?"}, units: [
    {id: 'c1', zh: 1, en: 5, question: {zh:"朋友说错一个词，你可以怎样提醒他，让他不难过？", en:"If a friend says a word wrong, how can you help without making them feel bad?"}},
    {id: 'c2', zh: 1, en: 4, question: {zh:"只有一盒彩笔，两个人可以怎样一起用？", en:"How could two people share one box of crayons?"}},
    {id: 'c3', zh: 1, en: 5, question: {zh:"生气的时候，你可以先做什么，再开口说话？", en:"When you feel angry, what could you do before speaking?"}},
    {id: 'c4', zh: 1, en: 6, question: {zh:"朋友已经道歉了，下次玩耍时，你愿意怎样对待他？", en:"After a friend says sorry, how would you like to treat them next time you play?"}},
  ]},
  '1CO.13.6': {hash: '1de71988', question: {zh:"打翻了杯子，你可以怎样诚实地告诉别人？", en:"If you knock over a cup, how could you tell someone honestly?"}, units: [
    {id: 'c1', zh: 1, en: 6, question: {zh:"有人被取笑时，你可以做哪件小事帮助他？", en:"If someone is being laughed at, what small thing could you do to help?"}},
    {id: 'c2', zh: 1, en: 5, question: {zh:"做错事以后，怎样把真正发生的事说出来？", en:"After a mistake, how can you tell what really happened?"}},
  ]},
  '1CO.13.7': {hash: 'f3eeefc', question: {zh:"朋友练了几次还没学会，你可以怎样陪他？", en:"If a friend still cannot do something after a few tries, how can you help?"}, units: [
    {id: 'c1', zh: 1, en: 3, question: {zh:"朋友今天心情不好，你可以怎样关心他？", en:"How could you care for a friend who feels sad today?"}},
    {id: 'c2', zh: 1, en: 2, question: {zh:"朋友说「我想再试一次」，你可以怎样鼓励他？", en:"If a friend says “I want to try again,” how could you encourage them?"}},
    {id: 'c3', zh: 1, en: 2, question: {zh:"你盼望自己学会什么？今天可以先做哪一步？", en:"What do you hope to learn? What is one step you could take today?"}},
    {id: 'c4', zh: 1, en: 2, question: {zh:"一起做一件难事时，你们可以怎样继续试？", en:"When something is hard, how could you keep trying together?"}},
  ]},
  '1CO.13.8': {hash: '13f48d26', question: {zh:"喜欢的游戏变了，你还可以怎样关心老朋友？", en:"When your favorite games change, how can you keep caring for an old friend?"}, units: [
    {id: 'c1', zh: 1, en: 3, question: {zh:"很久没见的朋友，你可以怎样让他知道你还记得他？", en:"How could you let a friend you have not seen for a while know you remember them?"}},
    {id: 'c2', zh: 1, en: 8, question: {zh:"一个活动结束了，你还可以怎样关心一起参加的人？", en:"When an activity ends, how can you keep caring for the people who joined you?"}},
    {id: 'c3', zh: 1, en: 8, question: {zh:"想不出怎么说的时候，你还可以怎样表达关心？", en:"When you cannot find the words, how else can you show you care?"}},
    {id: 'c4', zh: 1, en: 8, question: {zh:"有一道题你不会，也可以怎样帮助朋友？", en:"Even when you do not know an answer, how can you still help a friend?"}},
  ]},
  '1CO.13.9': {hash: '29b2975c', question: {zh:"有什么事你还不懂，想请对方教你？", en:"What is something you do not understand yet and would like your partner to teach you?"}, units: [
    {id: 'c1', zh: 1, en: 5, question: {zh:"遇到不认识的词，你可以怎么问？", en:"What could you ask when you find a word you do not know?"}},
    {id: 'c2', zh: 1, en: 5, question: {zh:"讲故事时想不起一部分，你可以请谁帮忙？", en:"If you forget part of a story, who could help you?"}},
  ]},
  '1CO.13.10': {hash: '53b769d5', question: {zh:"有些事现在还不懂。等着慢慢学时，你可以先做什么？", en:"Some things take time to understand. What could you do while you keep learning?"}, units: [
    {id: 'c1', zh: 1, en: 4, question: {zh:"一幅拼图还没拼好时，你会怎样耐心等一等？", en:"How could you be patient while a puzzle is still being finished?"}},
    {id: 'c2', zh: 1, en: 5, question: {zh:"你有没有后来才明白的事？说给对方听。", en:"Have you ever understood something later? Tell your partner about it."}},
  ]},
  '1CO.13.11': {hash: 'ad667c17', question: {zh:"现在的你，比小时候多会了哪件关心别人的事？", en:"What can you do to care for others now that you could not do when you were younger?"}, units: [
    {id: 'c1', zh: 2, en: 10, question: {zh:"小时候不会说的话，现在你会说了吗？教给对方听。", en:"What can you say now that you could not say when you were younger? Teach your partner."}},
    {id: 'c2', zh: 2, en: 10, question: {zh:"你以前怎样想一件事，现在想法变了吗？", en:"Has the way you think about something changed as you have grown?"}},
    {id: 'c3', zh: 2, en: 13, question: {zh:"下一次生气时，你想试试哪种更好的办法？", en:"Next time you feel angry, what better way would you like to try?"}},
  ]},
  '1CO.13.12': {hash: '544bd5be', question: {zh:"没听懂朋友的话，你可以怎样问清楚？", en:"If you do not understand a friend, how could you ask them to explain?"}, units: [
    {id: 'c1', zh: 2, en: 11, question: {zh:"看不清或听不清时，你会怎么请人帮忙？", en:"How would you ask for help when you cannot see or hear clearly?"}},
    {id: 'c2', zh: 1, en: 7, question: {zh:"面对面说话时，你可以怎样认真听？", en:"How can you listen carefully when you talk face to face?"}},
    {id: 'c3', zh: 1, en: 5, question: {zh:"只知道事情的一部分时，你还想问什么？", en:"When you know only part of a story, what else would you ask?"}},
    {id: 'c4', zh: 1, en: 5, question: {zh:"哪件事你想多了解一点？可以先问一个什么问题？", en:"What would you like to understand better? What is one question you could ask?"}},
    {id: 'c5', zh: 1, en: 6, question: {zh:"被人理解的时候，你有什么感觉？", en:"How do you feel when someone understands you?"}},
  ]},
  '1CO.13.13': {hash: '5e74d741', question: {zh:"信心、盼望和爱，你今天最想练习哪一个？", en:"Faith, hope, and love: which one would you most like to practice today?"}, units: [
    {id: 'c1', zh: 3, en: 9, question: {zh:"你正在盼望什么？谁在陪你一起等待？", en:"What are you hoping for? Who is waiting with you?"}},
    {id: 'c2', zh: 1, en: 7, question: {zh:"今天，你想用哪一件小事表达爱？", en:"What is one small thing you would like to do to show love today?"}},
  ]},
};
