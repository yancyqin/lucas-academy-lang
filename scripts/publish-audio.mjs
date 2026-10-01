// Publish checked narration takes as web audio, with their manifest:
//
//   npm run audio:publish -- love ../lucas-academy-media/data/processed/lucas-lang \
//     zh=../lucas-academy-media/outputs/fangfang/zh/lang-love \
//     en=../lucas-academy-media/outputs/louise/en/lang-love
//
// For every line of <scripts>/<lesson>-<lang>.json (from narration-scripts.mjs)
// it takes <wav-dir>/<id>.wav, trims the silence the synthesiser leaves around
// a take (keeping a short lead-in and tail), and encodes mono 32 kHz 48 kbps
// MP3 — MPEG-1 Layer III, which every Safari and iPad decodes — into
// public/audio/<lesson>/<lang>/. The manifest records each clip's ids, voice,
// real duration, and a fingerprint of the text it reads (never the text).
// A missing or empty take stops the run: nothing is published half-done.
import {readFile, writeFile, mkdir, stat} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {fingerprint} from '../public/js/units.js';

const VOICES = {zh: 'fangfang/zh', en: 'louise/en'};
const NATIVE_SPEED = 0.85; // lucas-narrate --speed: the children's pace
const LEAD_IN = 0.15;
const TAIL = 0.25;

const [lessonId, scriptsDir, ...dirs] = process.argv.slice(2);
const wavDirs = Object.fromEntries(dirs.map(arg => arg.split('=')).filter(([lang, dir]) => VOICES[lang] && dir));
if (!lessonId || !scriptsDir || !Object.keys(wavDirs).length) {
  console.error('usage: node scripts/publish-audio.mjs <lesson> <scripts-dir> zh=<wav-dir> en=<wav-dir>');
  process.exit(2);
}
const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = join(root, 'public', 'audio', lessonId);

// Where speech starts and ends, from 10 ms windows. The Chinese voice carries
// a faint noise bed (about −40 dB) before it speaks, so the start is the first
// window above −30 dB from the take's peak that stays up for most of the next
// 50 ms — a lone click cannot start it. Endings fade into digital silence, so
// the end is found at −45 dB.
const dB = level => 20 * Math.log10(Math.max(level, 1));
function speechBounds(file, buffer) {
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WAVE') throw new Error(`${file}: not a WAV file`);
  let offset = 12;
  let format = null;
  let data = null;
  while (offset + 8 <= buffer.length) {
    const id = buffer.toString('ascii', offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    if (id === 'fmt ') format = {channels: buffer.readUInt16LE(offset + 10), rate: buffer.readUInt32LE(offset + 12), bits: buffer.readUInt16LE(offset + 22)};
    if (id === 'data') data = {start: offset + 8, size: Math.min(size, buffer.length - offset - 8)};
    offset += 8 + size + (size % 2);
  }
  if (!format || !data || format.bits !== 16) throw new Error(`${file}: expected 16-bit PCM`);
  const frames = Math.floor(data.size / (2 * format.channels));
  const window = Math.max(1, Math.round(format.rate / 100));
  const levels = [];
  for (let w = 0; w * window < frames; w += 1) {
    let max = 0;
    for (let i = w * window; i < Math.min(frames, (w + 1) * window); i += 1) {
      const value = Math.abs(buffer.readInt16LE(data.start + i * 2 * format.channels));
      if (value > max) max = value;
    }
    levels.push(dB(max));
  }
  const peak = Math.max(...levels);
  if (peak < dB(1000)) throw new Error(`${file}: no speech in this take`);
  const first = levels.findIndex((level, i) =>
    level > peak - 30 && levels.slice(i + 1, i + 6).filter(next => next > peak - 35).length >= 3);
  const last = levels.length - 1 - [...levels].reverse().findIndex(level => level > peak - 45);
  if (first < 0) throw new Error(`${file}: no speech onset found`);
  const seconds = frames / format.rate;
  return {
    start: Math.max(0, first * window / format.rate - LEAD_IN),
    end: Math.min(seconds, (last + 1) * window / format.rate + TAIL),
    seconds,
  };
}

const clips = [];
let bytes = 0;
for (const [lang, wavDir] of Object.entries(wavDirs)) {
  const script = JSON.parse(await readFile(resolve(scriptsDir, `${lessonId}-${lang}.json`), 'utf8'));
  await mkdir(join(outDir, lang), {recursive: true});
  for (const line of script.lines) {
    const wav = resolve(wavDir, `${line.id}.wav`);
    const bounds = speechBounds(wav, await readFile(wav));
    const length = bounds.end - bounds.start;
    const mp3 = join(outDir, lang, `${line.id}.mp3`);
    execFileSync('ffmpeg', ['-nostdin', '-loglevel', 'error', '-y',
      '-ss', bounds.start.toFixed(3), '-t', length.toFixed(3), '-i', wav,
      '-af', `afade=t=in:d=0.01,afade=t=out:st=${Math.max(0, length - 0.03).toFixed(3)}:d=0.03`,
      '-ac', '1', '-ar', '32000', '-codec:a', 'libmp3lame', '-b:a', '48k', mp3]);
    const size = (await stat(mp3)).size;
    const duration = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp3]).toString().trim());
    if (!(size > 2000 && duration > 0.3)) throw new Error(`${mp3}: encoded file is empty (${size} bytes, ${duration}s)`);
    bytes += size;
    clips.push({
      lessonId, verseId: line.verseId, unitId: line.unitId, language: lang, voice: VOICES[lang],
      src: `${lang}/${line.id}.mp3`, duration: Math.round(duration * 100) / 100,
      textHash: fingerprint(line.text), speed: NATIVE_SPEED,
    });
  }
}

await writeFile(join(outDir, 'manifest.json'), JSON.stringify({
  lessonId,
  note: 'Narration clips for one lesson. textHash fingerprints the exact text each clip reads (public/js/units.js); a clip only plays while it matches the text on screen.',
  clips,
}, null, 1) + '\n');
const total = clips.reduce((sum, c) => sum + c.duration, 0);
for (const lang of Object.keys(wavDirs)) {
  const mine = clips.filter(c => c.language === lang);
  console.log(`${lang}: ${mine.length} clips, ${mine.reduce((s, c) => s + c.duration, 0).toFixed(1)} s, all non-empty`);
}
console.log(`${clips.length} clips, ${total.toFixed(1)} s, ${(bytes / 1024 / 1024).toFixed(2)} MB -> ${outDir}`);
