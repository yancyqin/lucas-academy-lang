// One bilingual, open question per reading unit.
const lines = [
  // 口蜜腹剑
  ["别人说的话和做的事不一样时，你会留意什么？","What do you notice when someone’s words and actions do not match?"],
  ["如果你负责一件大事，你会怎样让别人信任你？","If you were in charge of something important, how would you earn people’s trust?"],
  ["一句好听的话，可以证明一个人一定对你好了吗？","Can kind words alone prove that someone treats you well?"],
  ["蜜和剑为什么能用来说明两种不同的心思？","Why do honey and a sword picture such different intentions?"],
  ["向神说的话，怎样才能和心里的真实一致？","How could the words we say to God agree with what is truly in our hearts?"],
  // 对牛弹琴
  ["别人听不懂你的话，你愿意换个说法吗？","If someone cannot follow you, would you try another way of explaining?"],
  ["牛继续吃草，是因为它故意不理人吗？","Was the cow eating because it was deliberately ignoring the musician?"],
  ["给小一点的孩子讲游戏规则，你会换哪些词？","Which words would you change when explaining a game to a younger child?"],
  ["你有没有换一种说法，别人就明白了？","Have you ever changed an explanation and helped someone understand?"],
  ["听见神的话以后，你愿意怎样把它放在心里？","After hearing God’s word, how could you take it to heart?"],
  // 以德报怨
  ["别人让你难过时，除了报复，你还有哪些选择？","When someone hurts you, what choices do you have besides revenge?"],
  ["有人笑你的作品时，你希望谁来听你说说？","Who would you like to talk with if someone laughed at your work?"],
  ["一个曾经让你难过的人需要帮助，你会怎么想？","What would you think if someone who hurt you needed help?"],
  ["你会怎样一边帮助人，一边说清楚自己的感受？","How could you help someone and also explain how you feel?"],
  ["你愿意为一个让你难过的人向神祷告什么？","What might you pray to God for someone who has hurt you?"],
  ["想到天父怎样施恩，你想怎样对待一个和你不友好的人？","Thinking about our Father’s generosity, how would you like to treat someone unfriendly to you?"],
  // 近朱者赤
  ["谁的一个好习惯影响过你？","Whose good habit has influenced you?"],
  ["和朋友一起读书，和自己读书有什么不同？","How is reading with friends different from reading alone?"],
  ["你有什么兴趣，是看了别人做才想试试的？","What have you wanted to try after watching someone else do it?"],
  ["你想邀请朋友一起养成哪个好习惯？","Which good habit would you invite a friend to practice with you?"],
  ["亲近耶稣时，你盼望自己的哪一种心思或做法被改变？","As you draw near to Jesus, what attitude or action do you hope will change?"],
  // 投桃报李
  ["别人帮过你，你用什么方式表达过感谢？","How have you thanked someone who helped you?"],
  ["收到朋友的礼物时，你最先想说什么？","What is the first thing you want to say when a friend gives you a gift?"],
  ["除了送东西，你还能怎样回应朋友的善意？","How could you return a friend’s kindness without giving a gift?"],
  ["礼物不贵，也可以让人开心吗？为什么？","Can an inexpensive gift bring joy? Why?"],
  ["想到神先爱你，你愿意怎样把这份爱回应给神和别人？","Thinking of God loving you first, how would you like to respond to him and to others?"],
  // 滴水穿石
  ["什么事每天做一点，会慢慢有变化？","What might change if you worked on it a little every day?"],
  ["每天一点的小努力，你希望用在哪件事上？","What would you like to spend a little effort on each day?"],
  ["一天看不到结果，能说明努力没有用吗？","Does seeing no result in one day mean your effort is useless?"],
  ["你怎样记下一个月里慢慢发生的进步？","How could you keep track of progress over a month?"],
  ["有一件还在等待的事，你想怎样继续带到神面前？","What are you still waiting for, and how could you keep bringing it before God?"],
  // 知足常乐
  ["你手边有什么值得感谢的东西？","What do you have close at hand that you are thankful for?"],
  ["看见别人有新东西，你通常有什么心情？","How do you usually feel when someone has something new?"],
  ["你能给一个旧玩具想出一种新玩法吗？","Can you find a new way to play with an old toy?"],
  ["不买新东西，也可以怎样度过快乐的一天？","How could you enjoy a day without buying anything new?"],
  ["遇到不如意时，仰望耶稣和他前面的喜乐，会怎样帮助你？","When things disappoint you, how could looking to Jesus and the joy ahead help?"],
  // 杯弓蛇影
  ["你有没有把影子或声音误认成可怕的东西？","Have you ever mistaken a shadow or sound for something frightening?"],
  ["看见杯里像蛇的东西，你会先问什么？","What would you ask first if you saw something like a snake in a cup?"],
  ["一个担心一直在脑子里，你会告诉谁？","Whom would you tell about a worry that keeps coming back?"],
  ["你会怎样查清一个让你害怕的猜想？","How could you check a guess that makes you afraid?"],
  ["害怕的时候，神所赐的刚强、仁爱和谨守可以怎样帮助你？","When you are afraid, how could God’s gifts of power, love and self-discipline help?"],
  // 入乡随俗
  ["到一个新的地方，你想先了解什么习惯？","Which custom would you want to understand first in a new place?"],
  ["第一次去朋友家，你会怎样礼貌地打招呼？","How would you greet someone politely on your first visit to a friend’s home?"],
  ["和自己家不同的习惯，一定是错的吗？","Is a custom wrong just because it is different from your family’s?"],
  ["不知道该怎么做时，你会怎样开口问？","How would you ask when you do not know what to do?"],
  ["给不同年龄的人讲同一件事，你会怎样调整？","How would you explain the same thing to people of different ages?"],
  ["体谅别人时，你仍想坚持哪些重要的事？","Which important things would you keep while trying to understand others?"],
  // 刻舟求剑
  ["情况变了，什么老办法可能需要改一改？","What old method might need changing when a situation changes?"],
  ["剑落下时，应该记住河里的位置还是船上的位置？","When the sword fell, should its owner remember a place in the river or on the boat?"],
  ["船上的记号会移动吗？剑也跟着移动吗？","Does the mark move with the boat? Does the sword move with it?"],
  ["你会怎样向那个人解释他为什么找错了地方？","How would you explain why the man was looking in the wrong place?"],
  ["遇到新困难时，你有没有试过新的求助方法？","Have you tried a new way of asking for help with a new difficulty?"],
  ["你期待神在生活里开出怎样的新道路？","What new way do you hope God will open in your life?"],
];
export const questions = lines.map(([zh, en]) => ({zh, en}));
