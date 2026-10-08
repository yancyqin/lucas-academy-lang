// One question per unit (numbered as in text.js), for children, in both
// languages: a small everyday moment the idiom or the verse brings to mind.
// Idioms are studied whole; no short-clause alignment is written.
const lines = [
  // 井底之蛙
  ["你有没有以为一件事很小，后来发现它其实很大？", "Have you ever thought something was small, then found out it was really big?"], // 1
  ["如果你住在井里，每天能看见什么？", "If you lived in a well, what would you see every day?"], // 2
  ["抬头看天的时候，你觉得天有多大？", "When you look up at the sky, how big does it seem?"], // 3
  ["谁告诉过你一个你从没见过的地方？", "Who has told you about a place you have never seen?"], // 4
  ["有什么事是你想不明白、却相信神知道的？", "Is there something you can’t understand, but believe God knows?"], // 5
  // 守株待兔
  ["你见过有人什么都不做、只等好运吗？", "Have you seen someone do nothing and just wait for good luck?"], // 6
  ["农夫每天在田里做什么？", "What does a farmer do in the field every day?"], // 7
  ["兔子为什么会撞到树桩？", "Why did the rabbit run into the stump?"], // 8
  ["如果你是农夫，第二天你会做什么？", "If you were the farmer, what would you do the next day?"], // 9
  ["你看过蚂蚁搬东西吗？它们在做什么？", "Have you watched ants carrying things? What were they doing?"], // 10
  ["没有人提醒你，你也会主动做的事是什么？", "What do you do without anyone reminding you?"], // 11
  ["你会为以后的事提前准备什么？", "What do you prepare ahead of time?"], // 12
  // 愚公移山
  ["有什么事你做了很久才做成？", "What took you a long time to finish?"], // 13
  ["你家门口有什么挡路的东西吗？", "Is anything in the way outside your door?"], // 14
  ["一筐一筐地挖山，你觉得要挖多久？", "Digging basket by basket, how long do you think it would take?"], // 15
  ["别人笑你的时候，你会怎么办？", "What do you do when someone laughs at you?"], // 16
  ["一粒芥菜种有多小？小小的信心可以做什么？", "How small is a mustard seed? What can a small faith do?"], // 17
  // 亡羊补牢
  ["你做错过什么事，后来很快改好了？", "What mistake have you put right quickly?"], // 18
  ["羊圈破了一个洞，会发生什么？", "What can happen when a pen has a hole?"], // 19
  ["丢了一只羊，那个人心里会怎么想？", "How would the man feel after losing a sheep?"], // 20
  ["发现东西坏了，你会马上修吗？", "When you find something broken, do you fix it right away?"], // 21
  ["你丢过什么东西？你去找了吗？", "Have you lost something? Did you go looking for it?"], // 22
  ["找到丢了的东西，你开心吗？", "How do you feel when you find something you lost?"], // 23
  ["你会把好消息告诉谁？", "Whom do you tell your good news?"], // 24
  // 拔苗助长
  ["你有没有因为太着急，反而把事情弄糟？", "Have you ever spoiled something by rushing?"], // 25
  ["你种过什么？它长得快吗？", "Have you planted anything? Did it grow fast?"], // 26
  ["把苗拔高一点，苗会怎样？", "What happens to a seedling that is pulled up?"], // 27
  ["禾苗枯了，农夫心里会怎样？", "How would the farmer feel seeing the withered seedlings?"], // 28
  ["等待的时候，你可以做什么？", "What can you do while you wait?"], // 29
  // 自相矛盾
  ["你听过谁说的话前后对不上吗？", "Have you heard someone say two things that can’t both be true?"], // 30
  ["矛和盾各是做什么用的？", "What are a spear and a shield for?"], // 31
  ["你会怎么夸自己的东西？", "How would you praise something of yours?"], // 32
  ["那个人为什么答不出来？", "Why couldn’t the man answer?"], // 33
  ["你说过好话，也说过伤人的话吗？", "Have you said kind words, and hurtful words too?"], // 34
  ["你喝过泉水吗？是什么味道？", "Have you tasted spring water? What was it like?"], // 35
  // 塞翁失马
  ["有没有一件坏事，后来变成了好事？", "Has something bad ever turned out to be good?"], // 36
  ["你丢过东西吗？后来呢？", "Have you lost something? What happened then?"], // 37
  ["别人难过的时候，你会怎么安慰他？", "How do you comfort someone who is sad?"], // 38
  ["马回来的时候，大家会说什么？", "What would everyone say when the horse came back?"], // 39
  ["你相信坏事里也会有好事吗？", "Do you believe good can come out of something bad?"], // 40
  // 掩耳盗铃
  ["你有没有做过自己骗自己的事？", "Have you ever fooled only yourself?"], // 41
  ["小偷为什么想要那个铃铛？", "Why did the thief want the bell?"], // 42
  ["铃铛响了，谁会听见？", "When the bell rings, who hears it?"], // 43
  ["捂住耳朵，别人就听不见了吗？", "If you cover your ears, can other people still hear?"], // 44
  ["知道神看着你，你会怎样做事？", "Knowing God sees you, how do you act?"], // 45
  // 一诺千金
  ["你答应过别人什么？做到了吗？", "What have you promised someone? Did you do it?"], // 46
  ["谁说的话你最相信？为什么？", "Whose word do you trust most? Why?"], // 47
  ["一句话怎么会比金子还值钱？", "How can a word be worth more than gold?"], // 48
  ["不想答应的时候，你会怎么说？", "What do you say when you don’t want to promise?"], // 49
  // 盲人摸象
  ["你有没有只知道一点点，就以为全知道了？", "Have you ever known a little and thought you knew it all?"], // 50
  ["闭上眼睛摸一样东西，你能猜出是什么吗？", "With your eyes shut, can you guess a thing by touch?"], // 51
  ["大象的耳朵、腿和尾巴，分别像什么？", "What are an elephant’s ear, leg and tail like?"], // 52
  ["大家意见不一样的时候，怎么办？", "What do you do when people disagree?"], // 53
  ["有什么事你现在还不明白，以后想弄明白？", "What don’t you understand yet, that you’d like to one day?"], // 54
];

// The question for unit n is questions[n - 1].
export const questions = lines.map(([zh, en]) => ({zh, en}));
