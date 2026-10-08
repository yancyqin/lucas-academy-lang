// Fetch only the selected verses, joining adjacent verses of the same chapter.
// A section may offer several reading perspectives from different passages.
export function scriptureRequests(lesson, section) {
  const byId = new Map(lesson.verses.map(verse => [verse.id, verse]));
  const runs = [];
  const ids = section.verseIds || lesson.verses.filter(v => v.n >= section.range[0] && v.n <= section.range[1]).map(v => v.id);
  for (const id of ids) {
    const verse = byId.get(id);
    const ref = verse.ref || (lesson.passage && `${lesson.passage.book}.${lesson.passage.chapter}.${verse.n}`);
    if (!ref) continue;
    const [book, chapter, number] = ref.split('.');
    const n = Number(number);
    let run = runs.at(-1);
    if (!run || run.chapter !== `${book}.${chapter}` || n !== run.numbers.at(-1) + 1) {
      run = {chapter: `${book}.${chapter}`, ids: [], numbers: []};
      runs.push(run);
    }
    run.ids.push(id);
    run.numbers.push(n);
  }
  return runs.map(({chapter, ids, numbers}) => ({
    ref: `${chapter}.${numbers.length === 1 ? numbers[0] : `${numbers[0]}-${numbers.at(-1)}`}`,
    ids, numbers,
  }));
}
