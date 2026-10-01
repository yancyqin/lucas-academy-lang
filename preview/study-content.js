// Editorial alignment for the runtime text, not a copy of the English passage.
// groups = Chinese punctuation clauses per unit; ends = exclusive English word ends.
// Fingerprints make text changes fail closed to a whole verse, never mispaired clauses.
const row = (groups, ends, hash, question, parts) => ({groups, ends, hash, question, parts});
export const loveStudy = {
  1: row([2,1,2], [11,16,26], '9a1553f0',
    ['朋友没听懂你的话，你可以怎样再说一次？','If a friend does not understand you, how could you say it again?'], [
      ['你会用两种语言说「你好」吗？教教对方。','Can you say hello in two languages? Teach your partner.'],
      ['同一句话，怎样说能让朋友觉得被关心？','How can the way you speak help a friend feel cared for?'],
      ['如果大家只顾着大声说话，可以怎样让每个人都被听见？','If everyone is talking loudly, how can you help each person be heard?']]),
  2: row([3,2,1,1], [15,25,30,33], 'b19c4412',
    ['你会做的哪件小事，可以教给朋友？','What is one small thing you can teach a friend?'], [
      ['你最近学会了什么？用简单的话讲给对方听。','What have you learned lately? Explain it in simple words.'],
      ['有一件事很难，你希望朋友怎样帮助你？','When something is hard, how would you like a friend to help?'],
      ['朋友还不会的时候，你可以怎样鼓励他？','How can you encourage a friend who is still learning?'],
      ['会做很多事的人，可以怎样关心别人？','If you can do lots of things, how can you use them to care for others?']]),
  3: row([2,1,1], [20,25,28], '4dffbe76',
    ['帮助别人前，你可以先问他什么？','What could you ask someone before helping them?'], [
      ['你有什么东西可以分享，让别人开心一点？','What could you share to brighten someone’s day?'],
      ['怎样知道对方真正需要什么？','How can you find out what someone really needs?'],
      ['除了送东西，你还能怎样表达关心？','Besides giving a gift, how can you show that you care?']]),
  4: row([1,1,1,1,1], [3,6,10,14,18], 'bd613337',
    ['朋友学得比你慢，你可以怎样陪他一起学？','If a friend learns more slowly than you, how can you learn together?'], [
      ['朋友还没说完，你可以怎样等一等？','How can you give a friend time to finish speaking?'],
      ['今天你可以做哪件温柔的小事？','What is one kind thing you could do today?'],
      ['朋友得到了你也想要的东西，你可以对他说什么？','If a friend gets something you want too, what could you say to them?'],
      ['做好一件事以后，怎样分享开心，也听听别人的故事？','When you do something well, how can you share your joy and listen to others too?'],
      ['你会、朋友还不会时，怎样让他觉得你们一样重要？','When you can do something your friend cannot yet do, how can you show that you both matter?']]),
  5: row([1,1,1,1], [5,9,14,20], 'd060c5f9',
    ['和朋友意见不一样时，你可以怎样好好说话？','When you and a friend disagree, how can you speak kindly?'], [
      ['朋友说错一个词，你可以怎样提醒他，让他不难过？','If a friend says a word wrong, how can you help without making them feel bad?'],
      ['只有一盒彩笔，两个人可以怎样一起用？','How could two people share one box of crayons?'],
      ['生气的时候，你可以先做什么，再开口说话？','When you feel angry, what could you do before speaking?'],
      ['朋友已经道歉了，下次玩耍时，你愿意怎样对待他？','After a friend says sorry, how would you like to treat them next time you play?']]),
  6: row([1,1], [6,11], '1de71988',
    ['打翻了杯子，你可以怎样诚实地告诉别人？','If you knock over a cup, how could you tell someone honestly?'], [
      ['有人被取笑时，你可以做哪件小事帮助他？','If someone is being laughed at, what small thing could you do to help?'],
      ['做错事以后，怎样把真正发生的事说出来？','After a mistake, how can you tell what really happened?']]),
  7: row([1,1,1,1], [3,5,7,9], 'f3eeefc',
    ['朋友练了几次还没学会，你可以怎样陪他？','If a friend still cannot do something after a few tries, how can you help?'], [
      ['朋友今天心情不好，你可以怎样关心他？','How could you care for a friend who feels sad today?'],
      ['朋友说「我想再试一次」，你可以怎样鼓励他？','If a friend says “I want to try again,” how could you encourage them?'],
      ['你盼望自己学会什么？今天可以先做哪一步？','What do you hope to learn? What is one step you could take today?'],
      ['一起做一件难事时，你们可以怎样继续试？','When something is hard, how could you keep trying together?']]),
  8: row([1,1,1,1], [3,11,19,27], '13f48d26',
    ['喜欢的游戏变了，你还可以怎样关心老朋友？','When your favorite games change, how can you keep caring for an old friend?'], [
      ['很久没见的朋友，你可以怎样让他知道你还记得他？','How could you let a friend you have not seen for a while know you remember them?'],
      ['一个活动结束了，你还可以怎样关心一起参加的人？','When an activity ends, how can you keep caring for the people who joined you?'],
      ['想不出怎么说的时候，你还可以怎样表达关心？','When you cannot find the words, how else can you show you care?'],
      ['有一道题你不会，也可以怎样帮助朋友？','Even when you do not know an answer, how can you still help a friend?']]),
  9: row([1,1], [5,10], '29b2975c',
    ['有什么事你还不懂，想请对方教你？','What is something you do not understand yet and would like your partner to teach you?'], [
      ['遇到不认识的词，你可以怎么问？','What could you ask when you find a word you do not know?'],
      ['讲故事时想不起一部分，你可以请谁帮忙？','If you forget part of a story, who could help you?']]),
  10: row([1,1], [4,9], '53b769d5',
    ['有些事现在还不懂。等着慢慢学时，你可以先做什么？','Some things take time to understand. What could you do while you keep learning?'], [
      ['一幅拼图还没拼好时，你会怎样耐心等一等？','How could you be patient while a puzzle is still being finished?'],
      ['你有没有后来才明白的事？说给对方听。','Have you ever understood something later? Tell your partner about it.']]),
  11: row([2,2,2], [10,20,33], 'ad667c17',
    ['现在的你，比小时候多会了哪件关心别人的事？','What can you do to care for others now that you could not do when you were younger?'], [
      ['小时候不会说的话，现在你会说了吗？教给对方听。','What can you say now that you could not say when you were younger? Teach your partner.'],
      ['你以前怎样想一件事，现在想法变了吗？','Has the way you think about something changed as you have grown?'],
      ['下一次生气时，你想试试哪种更好的办法？','Next time you feel angry, what better way would you like to try?']]),
  12: row([2,1,1,1,1], [11,18,23,28,34], '544bd5be',
    ['没听懂朋友的话，你可以怎样问清楚？','If you do not understand a friend, how could you ask them to explain?'], [
      ['看不清或听不清时，你会怎么请人帮忙？','How would you ask for help when you cannot see or hear clearly?'],
      ['面对面说话时，你可以怎样认真听？','How can you listen carefully when you talk face to face?'],
      ['只知道事情的一部分时，你还想问什么？','When you know only part of a story, what else would you ask?'],
      ['哪件事你想多了解一点？可以先问一个什么问题？','What would you like to understand better? What is one question you could ask?'],
      ['被人理解的时候，你有什么感觉？','How do you feel when someone understands you?']]),
  13: row([3,1], [9,16], '5e74d741',
    ['今天，你想用哪一件小事表达爱？','What is one small thing you would like to do to show love today?'], [
      ['你正在盼望什么？谁在陪你一起等待？','What are you hoping for? Who is waiting with you?'],
      ['今天，你想用哪一件小事表达爱？','What is one small thing you would like to do to show love today?']]),
};

const seedQuestions = [
 ['很多人一起听的时候，怎样让大家都听清楚？','When many people are listening, how can you help everyone hear?'],
 ['你会用一个小故事教朋友什么？','What could you teach a friend with a little story?'],
 ['开始听故事前，你可以做什么准备？','What could you do to get ready to listen to a story?'],
 ['如果你是撒种的人，会把种子放在哪里？','If you were planting seeds, where would you put them?'],
 ['种子刚开始长的时候，可能需要什么？','What might a seed need when it starts to grow?'],
 ['天气很热时，你可以怎样照顾小植物？','How could you care for a small plant on a hot day?'],
 ['有什么东西可能让植物长不好？你能做什么？','What might make it hard for a plant to grow? What could you do?'],
 ['看见自己照顾的植物长大，你想和谁分享？','Who would you tell when a plant you cared for grows?'],
 ['怎样让对方知道，你在认真听他的话？','How can you show your partner that you are listening carefully?'],
];

export function fingerprint(text) {
 let h=2166136261;
 for(const c of text.replace(/\s+/g,' ').trim()){h^=c.codePointAt(0);h=Math.imul(h,16777619);}
 return (h>>>0).toString(16);
}
function sliceTokens(tokens,start,end){
 let offset=0;const result=[];
 for(const token of tokens){const next=offset+token.length;if(next>start&&offset<end)result.push(token.slice(Math.max(0,start-offset),Math.min(token.length,end-offset)));offset=next;}
 return result;
}
export function studyUnits(id,verse,englishText){
 const data=id==='love'?loveStudy[verse.n]:null;
 const whole={zh:verse.tokens.join(''),en:englishText||'',tokens:verse.tokens,question:data?.question||seedQuestions[verse.n-1]};
 if(!data||!englishText||fingerprint(englishText)!==data.hash)return{whole,parts:[],reason:!englishText?'loading':data?'changed':'unavailable'};
 const clauses=whole.zh.match(/[^，；。！？]+[，；。！？]?/g)||[];
 const words=englishText.match(/\S+\s*/g)||[];
 if(clauses.length!==data.groups.reduce((a,b)=>a+b,0)||words.length!==data.ends.at(-1))return{whole,parts:[],reason:'changed'};
 let zhIndex=0,enIndex=0,offset=0;
 const parts=data.groups.map((count,i)=>{
  const zh=clauses.slice(zhIndex,zhIndex+count).join('');zhIndex+=count;
  const en=words.slice(enIndex,data.ends[i]).join('');enIndex=data.ends[i];
  const unit={zh,en,tokens:sliceTokens(verse.tokens,offset,offset+zh.length),question:data.parts[i]};offset+=zh.length;return unit;
 });
 return{whole,parts,reason:null};
}
