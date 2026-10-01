// One question per verse, for children, in both languages. No short-clause
// alignment has been written for this passage, so it is studied verse by verse.
const questions = [
  ['很多人一起听的时候，怎样让大家都听清楚？', 'When many people are listening, how can you help everyone hear?'],
  ['你会用一个小故事教朋友什么？', 'What could you teach a friend with a little story?'],
  ['开始听故事前，你可以做什么准备？', 'What could you do to get ready to listen to a story?'],
  ['如果你是撒种的人，会把种子放在哪里？', 'If you were planting seeds, where would you put them?'],
  ['种子刚开始长的时候，可能需要什么？', 'What might a seed need when it starts to grow?'],
  ['天气很热时，你可以怎样照顾小植物？', 'How could you care for a small plant on a hot day?'],
  ['有什么东西可能让植物长不好？你能做什么？', 'What might make it hard for a plant to grow? What could you do?'],
  ['看见自己照顾的植物长大，你想和谁分享？', 'Who would you tell when a plant you cared for grows?'],
  ['怎样让对方知道，你在认真听他的话？', 'How can you show your partner that you are listening carefully?'],
];

export const study = Object.fromEntries(questions.map(([zh, en], i) => [`MRK.4.${i + 1}`, {question: {zh, en}}]));
