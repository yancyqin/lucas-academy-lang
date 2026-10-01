// Run with the local preview server: node scripts/check-study-alignment.mjs
// Runtime English remains in memory; only counts are printed.
import assert from 'node:assert/strict';
import {love,makeSeed} from '../preview/lesson.js';
import {studyUnits} from '../preview/study-content.js';
import {readFile} from 'node:fs/promises';

const base=process.env.LANG_PREVIEW_URL||'http://127.0.0.1:8095';
const english=new Map();
for(const section of love.sections){
 assert.ok(section.range[1]-section.range[0]+1<=7);
 const response=await fetch(`${base}/api/passage?ref=1CO.13.${section.range.join('-')}`);
 assert.equal(response.ok,true,`Passage API returned ${response.status}`);
 for(const verse of (await response.json()).verses)english.set(verse.n,verse.text);
}
let count=0;
for(const verse of love.verses){
 const text=english.get(verse.n),units=studyUnits('love',verse,text);
 assert.ok(units.parts.length>1,`Missing verified clauses: verse ${verse.n}`);
 assert.equal(units.parts.map(u=>u.zh).join(''),verse.tokens.join(''));
 assert.equal(units.parts.map(u=>u.en).join(''),text);
 for(const unit of [units.whole,...units.parts]){
  assert.equal(unit.tokens.join(''),unit.zh);
  assert.equal(unit.question.length,2);
  assert.ok(unit.question.every(q=>typeof q==='string'&&q.length>5));
 }
 assert.equal(studyUnits('love',verse,text+' changed').parts.length,0);
 assert.equal(studyUnits('love',verse,'').parts.length,0);
 count+=units.parts.length;
}
const seed=makeSeed(JSON.parse(await readFile(new URL('../preview/seed-reference.json',import.meta.url),'utf8')));
for(const verse of seed.verses){
 const units=studyUnits('seed',verse,'Example only');
 assert.equal(units.parts.length,0);
 assert.equal(units.whole.question.length,2);
}
console.log(`PASS: ${love.verses.length} verses, ${count} aligned clauses, exact text reconstruction, bilingual questions, changed/missing text fallback, ${seed.verses.length} reference-lesson questions.`);
