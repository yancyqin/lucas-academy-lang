// Lesson registry, in dropdown order. Each lesson loads only when chosen.
export const lessons = [
  {id: 'love', title: {zh: '爱的篇章', en: 'The Love Chapter'}, load: () => import('./love/index.js')},
  {id: 'seed', title: {zh: '种子与好土', en: 'Seed and Good Soil'}, load: () => import('./seed/index.js')},
  {id: 'happy-prince', title: {zh: '快乐王子', en: 'The Happy Prince'}, load: () => import('./happy-prince/index.js')},
];
