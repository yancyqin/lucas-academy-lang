// Lesson registry, in dropdown order. Each lesson loads only when chosen.
export const lessons = [
  {id: 'love', title: '爱的篇章', load: () => import('./love/index.js')},
  {id: 'seed', title: '种子与好土', load: () => import('./seed/index.js')},
];
