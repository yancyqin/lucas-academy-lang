import {illustrations, illustrationBindings} from '../lessons/illustrations.js';
import {el} from './tokens.js';
import {t, pick} from './strings.js';

// Reading and sentence study show the same art beside the same verse. The
// picture starts folded so the words come first; it loads on the first open.
export function illustrationFigure(lessonId, verseId) {
  const id = illustrationBindings[lessonId]?.[verseId];
  const art = illustrations[id];
  if (!art) return null;
  const details = el('details', 'lesson-picture');
  details.dataset.illustration = id;
  details.append(el('summary', '', t('showPicture')));
  const figure = el('figure');
  const image = document.createElement('img');
  image.alt = pick(art.alt);
  image.width = art.width;
  image.height = art.height;
  image.decoding = 'async';
  image.addEventListener('error', () => details.remove(), {once: true});
  figure.append(image);
  details.append(figure);
  details.addEventListener('toggle', () => {
    if (details.open && !image.src) image.src = art.src;
  });
  return details;
}
