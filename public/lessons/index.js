// Lesson registry, in dropdown order. Each lesson loads only when chosen.
// Every lesson belongs to one category (the 分类 menu above the lesson menu);
// a category appears in that menu once a lesson belongs to it.
export const categories = [
  {id: 'idiom', title: {zh: '成语', en: 'Idioms'}},
  {id: 'poem', title: {zh: '诗词', en: 'Poems'}},
  {id: 'story', title: {zh: '小说', en: 'Stories'}},
  {id: 'scripture', title: {zh: '圣经', en: 'Bible'}},
];

export const lessons = [
  {id: 'love', category: 'scripture', title: {zh: '爱的篇章', en: 'The Love Chapter'}, load: () => import('./love/index.js')},
  {id: 'seed', category: 'scripture', title: {zh: '种子与好土', en: 'Seed and Good Soil'}, load: () => import('./seed/index.js')},
  {id: 'happy-prince', category: 'story', title: {zh: '快乐王子', en: 'The Happy Prince'}, load: () => import('./happy-prince/index.js')},
  {id: 'lilliput', category: 'story', title: {zh: '格列佛游记 · 小人国', en: 'Gulliver in Lilliput'}, load: () => import('./lilliput/index.js')},
  {id: 'gentlemen', category: 'story', title: {zh: '镜花缘 · 君子国和小人国', en: 'The Land of Gentlemen'}, load: () => import('./gentlemen/index.js')},
  {id: 'idioms-1', category: 'idiom', title: {zh: '成语 · 第一辑', en: 'Idioms · Set 1'}, load: () => import('./idioms-1/index.js')},
  {id: 'idioms-2', category: 'idiom', title: {zh: '成语 · 第二辑', en: 'Idioms · Set 2'}, load: () => import('./idioms-2/index.js')},
  {id: 'climb-higher', category: 'poem', title: {zh: '爬高一点，看远一点', en: 'Climb Higher, See Farther'}, load: () => import('./climb-higher/index.js')},
  {id: 'little-boats', category: 'poem', title: {zh: '小船去远方', en: 'Little Boats, Far Away'}, load: () => import('./little-boats/index.js')},
];
