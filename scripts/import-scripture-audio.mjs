// Reuse published Bible narration and optionally package machine-checked takes.
// Does not modify the source Bible project, generate speech, mark owner review,
// upload, or deploy. Private input paths and WAV masters stay outside the repo.
// node scripts/import-scripture-audio.mjs <bible-repo> [checked-takes.json]
import assert from 'node:assert/strict';
import {readFile, writeFile, mkdir, copyFile, mkdtemp, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve, join, basename} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {lessons} from '../public/lessons/index.js';
import {fingerprint} from '../public/js/units.js';

const [sourceDir, checkedFile] = process.argv.slice(2);
if (!sourceDir) throw new Error('usage: import-scripture-audio.mjs <bible-repo> [checked-takes.json]');
const root = fileURLToPath(new URL('..', import.meta.url));
const source = resolve(sourceDir);
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const readJSON = async path => JSON.parse(await readFile(path, 'utf8'));
const normalizeChinese = text => [...text].filter(c => /[\p{L}\p{N}]/u.test(c)).join('');
const checked = checkedFile ? (await readJSON(resolve(checkedFile))).clips : [];
const selected = new Map(checked.map(take => [`${take.ref}#${take.language}`, take]));
assert.equal(selected.size, checked.length, 'duplicate checked takes');
const sources = {};
for (const language of ['zh', 'en']) {
  const stem = language === 'zh' ? 'cuv-fangfang' : 'web-louise';
  sources[language] = {
    catalog: await readJSON(join(source, `public/audio/${stem}/catalog.json`)),
    status: await readJSON(join(source, `data/narration-${stem}.json`)),
  };
}
const temporary = await mkdtemp(join(tmpdir(), 'lang-scripture-mp3-'));
let copied = 0;
let encoded = 0;
try {
  for (const entry of lessons.filter(entry => entry.id.startsWith('idioms-'))) {
    const lesson = (await entry.load()).default;
    const manifestPath = join(root, 'public', lesson.audio);
    const manifest = await readJSON(manifestPath);
    const clips = [];
    for (const verse of lesson.verses.filter(v => v.ref)) {
      for (const language of ['zh', 'en']) {
        const screen = language === 'zh' ? verse.tokens.join('') : verse.en;
        assert.ok(screen, `${verse.id}: missing ${language} text`);
        const binding = `${verse.ref}#${language}`;
        const published = sources[language].catalog.clips.find(clip => clip.id === verse.ref);
        const sourceStatus = sources[language].status.verses.find(row => row.id === verse.ref);
        const take = selected.get(binding);
        let sourceFile;
        let provenance;
        let measured;
        if (published && sourceStatus?.status === 'published' && !take) {
          assert.equal(sourceStatus.published, true, `${binding}: source is not published`);
          if (language === 'en') assert.equal(published.text, screen, `${binding}: WEB text differs`);
          else assert.equal(normalizeChinese(published.text), normalizeChinese(screen), `${binding}: Chinese words differ`);
          sourceFile = join(source, 'public', published.key);
          const bytes = await readFile(sourceFile);
          assert.equal(sha(bytes), published.sha256, `${binding}: published MP3 changed`);
          assert.equal(bytes.length, published.bytes, `${binding}: published MP3 bytes changed`);
          measured = {sha256: published.sha256, bytes: bytes.length, duration: published.durationSeconds};
          provenance = {kind: 'reuse', project: 'lucas-academy-bible', sourceUrl: published.url,
            sourceKey: published.key, sourceTextSha256: published.textSha256, configId: published.configId,
            qaPolicy: sources[language].catalog.qaPolicy, status: 'published'};
          copied += 1;
        } else if (take) {
          assert.equal(take.speed, 0.85, `${binding}: scripture speed must be 0.85`);
          assert.equal(take.textHash, fingerprint(screen), `${binding}: checked text differs`);
          assert.equal(take.qa?.status, 'checked', `${binding}: take has not passed checking`);
          const homophone = language === 'en' && verse.ref === 'MAT.5.45' && take.qa?.wordExact === false &&
            take.qa?.wordSoundExact === true && take.qa?.policy === 'web-exact-word-sounds/1';
          if (homophone) assert.deepEqual(take.qa.homophones,
            [{expected: 'sun', recognized: 'son', ipa: '/sʌn/'}], `${binding}: unsupported homophone audit`);
          assert.equal(language === 'zh' ? take.qa?.syllableExact : take.qa?.wordExact === true || homophone, true,
            `${binding}: incomplete word/syllable match`);
          assert.deepEqual(take.qa?.issues, [], `${binding}: unresolved audio issues`);
          assert.ok(take.qa?.policy && take.qa?.checkedAt, `${binding}: missing QA provenance`);
          assert.equal(sha(await readFile(take.wavPath)), take.wavSha256, `${binding}: WAV changed after checking`);
          sourceFile = join(temporary, `${verse.ref}-${language}.mp3`);
          execFileSync('ffmpeg', ['-nostdin', '-hide_banner', '-loglevel', 'error', '-i', take.wavPath,
            '-ac', '1', '-ar', '32000', '-codec:a', 'libmp3lame', '-b:a', '48k', '-map_metadata', '-1', sourceFile]);
          const bytes = await readFile(sourceFile);
          const duration = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', sourceFile], {encoding: 'utf8'}).trim());
          assert.ok(bytes.length > 2000 && duration > 0.3, `${binding}: empty MP3`);
          measured = {sha256: sha(bytes), bytes: bytes.length, duration};
          provenance = {kind: 'generated', wavSha256: take.wavSha256, qaPolicy: take.qa.policy,
            checkedAt: take.qa.checkedAt, status: 'checked', rawScore: take.qa.score,
            ...(language === 'zh' ? {syllableExact: true} : homophone
              ? {wordExact: false, wordSoundExact: true, homophones: take.qa.homophones} : {wordExact: true})};
          if (take.configId) provenance.configId = take.configId;
          if (take.synthesisTextSha256) provenance.synthesisTextSha256 = take.synthesisTextSha256;
          encoded += 1;
        } else continue;
        const file = `${verse.ref.toLowerCase().replaceAll('.', '-')}-${measured.sha256}.mp3`;
        const target = join(root, 'public/audio/scripture', language, file);
        await mkdir(resolve(target, '..'), {recursive: true});
        await copyFile(sourceFile, target);
        assert.equal(sha(await readFile(target)), measured.sha256, `${binding}: copied bytes differ`);
        clips.push({lessonId: lesson.id, verseId: verse.id, unitId: 'whole', language,
          voice: language === 'zh' ? 'fangfang/zh' : 'louise/en', src: `../scripture/${language}/${basename(target)}`,
          ...measured, textHash: fingerprint(screen), textSha256: sha(screen), speed: 0.85,
          translation: language === 'zh' ? 'CUV' : 'WEB', ref: verse.ref, provenance});
      }
    }
    const scriptureIds = new Set(lesson.verses.filter(v => v.ref).map(v => v.id));
    // Existing title recordings stay intact, and stories receive no clips.
    manifest.clips = [...manifest.clips.filter(c => !scriptureIds.has(c.verseId)), ...clips];
    await writeFile(manifestPath, JSON.stringify(manifest, null, 1) + '\n');
  }
} finally {
  await rm(temporary, {recursive: true, force: true});
}
console.log(`Imported ${copied} published clips and ${encoded} checked new clips; title recordings preserved.`);
