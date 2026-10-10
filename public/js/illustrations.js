import {illustrations, illustrationBindings} from '../lessons/illustrations.js';
import {el} from './tokens.js';
import {pick} from './strings.js';

// Reading and sentence study show the same art beside the same verse.
export function illustrationFigure(lessonId, verseId, {study = false} = {}) {
  const id = illustrationBindings[lessonId]?.[verseId];
  const art = illustrations[id];
  if (!art) return null;
  const figure = el('figure', 'lesson-picture');
  figure.dataset.illustration = id;
  const image = document.createElement('img');
  image.src = art.src;
  image.alt = pick(art.alt);
  image.width = art.width;
  image.height = art.height;
  image.loading = study ? 'eager' : 'lazy';
  image.decoding = 'async';
  image.addEventListener('error', () => figure.remove(), {once: true});
  figure.append(image);
  return figure;
}
