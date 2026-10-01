// Recorded narration: one clip per whole verse and per aligned clause, per
// language, listed in audio/<lesson>/manifest.json as
//   {lessonId, verseId, unitId, language, voice, src, duration, textHash, speed}
// A clip plays only while its textHash matches the text on screen, so a verse
// whose wording has changed is never read by a recording of the old one — it
// falls back to the system voice, which says so.
import {fingerprint} from './units.js';

const manifests = new Map(); // lesson id -> Map(key -> clip)
const key = (verseId, unitId, language) => `${verseId}#${unitId}#${language}`;

export async function load(lesson) {
  if (manifests.has(lesson.id) || !lesson.audio) return;
  const clips = new Map();
  manifests.set(lesson.id, clips);
  try {
    const base = new URL(lesson.audio, document.baseURI);
    const response = await fetch(base);
    if (!response.ok) return;
    const data = await response.json();
    for (const clip of data.clips || []) {
      if (clip.lessonId !== lesson.id) continue;
      clips.set(key(clip.verseId, clip.unitId, clip.language), {...clip, src: new URL(clip.src, base).href});
    }
  } catch {
    // No recordings: every line uses the system voice, labelled as such.
  }
}

export function clip(lesson, verseId, unitId, language, text) {
  const found = manifests.get(lesson.id)?.get(key(verseId, unitId, language));
  if (!found || !text || fingerprint(text) !== found.textHash) return null;
  return found;
}

export function voices(lesson) {
  const names = new Set();
  for (const c of manifests.get(lesson.id)?.values() || []) names.add(`${c.language}:${c.voice}`);
  return [...names];
}
