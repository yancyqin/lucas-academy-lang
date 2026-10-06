// Lesson registry, in dropdown order. Each lesson loads only when chosen.
export const lessons = [
  {id: 'love', title: {zh: '爱的篇章', en: 'The Love Chapter'}, load: () => import('./love/index.js')},
  {id: 'seed', title: {zh: '种子与好土', en: 'Seed and Good Soil'}, load: () => import('./seed/index.js')},
  {id: 'happy-prince', title: {zh: '快乐王子', en: 'The Happy Prince'}, load: () => import('./happy-prince/index.js')},
  {id: 'lilliput', title: {zh: '格列佛游记 · 小人国', en: 'Gulliver in Lilliput'}, load: () => import('./lilliput/index.js')},
  {id: 'gentlemen', title: {zh: '镜花缘 · 君子国和小人国', en: 'The Land of Gentlemen'}, load: () => import('./gentlemen/index.js')},
  {id: 'climb-higher', title: {zh: '爬高一点，看远一点', en: 'Climb Higher, See Farther'}, load: () => import('./climb-higher/index.js')},
  {id: 'little-boats', title: {zh: '小船去远方', en: 'Little Boats, Far Away'}, load: () => import('./little-boats/index.js')},
];
