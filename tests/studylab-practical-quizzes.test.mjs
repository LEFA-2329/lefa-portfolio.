import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {intermediateLessons,intermediateLegacyQuizzes} from '../dist/learn/intermediate-data.mjs';
import {databaseExamEngine} from '../dist/learn/db-exam.mjs';
import {cleanDatabaseLesson} from '../dist/learn/database-state.mjs';
import {lessonProgress} from '../dist/learn/progress.mjs';
import {quizContext} from '../dist/learn/quiz-context.mjs';
const qs=intermediateLessons.flatMap(l=>l.quizzes);assert.equal(qs.length,81);assert.equal(new Set(qs.map(q=>q.question)).size,81);
for(const l of intermediateLessons){assert.equal(l.quizzes.length,3);assert.equal(l.quizRevision,'practical-v2');assert.equal(intermediateLegacyQuizzes[l.id].length,2);for(const q of l.quizzes){assert(['Case study','Debugging','Predict the result'].includes(q.kind));assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert(q.options[q.answer]);assert(q.explanation.length>60);assert(!/every example creates|All source tables are permanently/.test(q.options.join(' ')));}}
const init=createRequire(import.meta.url)('../dist/learn/vendor/sqljs/sql-wasm.js'),SQL=await init({locateFile:()=>fileURLToPath(new URL('../dist/learn/vendor/sqljs/sql-wasm.wasm',import.meta.url))});
const sorted=x=>x.map(JSON.stringify).sort();let runs=0;for(const q of qs.filter(q=>q.probe)){const db=new SQL.Database(),out=db.exec(q.probe.sql);assert.deepEqual(sorted(out[0]?.values||[]),sorted(q.probe.values),q.question);db.close();runs++;}assert.equal(runs,9);
// Existing exams must retain their seeded legacy question identities and scoring.
// Golden hashes were checked against the pre-change bank and shuffle algorithm.
const legacyDigests={1:'67848c6ddc7f4834df12321069c65ab5a301c1df2d893cff47316cc769148d79',123:'d1d6d9586c15c6729554d57216bdc00580895e7ce07db1b8f0ea55f73fe77450',987654:'affb6934edab4cb62d460711022095d3683bf18601f0eefc454ae83ac8c42042'};
const engine=databaseExamEngine('intermediate');for(const seed of [1,123,987654])assert.equal(createHash('sha256').update(JSON.stringify(engine.examQuestions(seed,1))).digest('hex'),legacyDigests[seed]);
const old=engine.createExam(123,30,1000);delete old.bankRevision;for(const q of engine.examQuestions(123,1))old.answers[q.id]=q.correct;old.submittedAt=2000;const restored=engine.cleanExam(old);assert.equal(restored.bankRevision,1);assert.equal(engine.examResult(restored).objective,18);assert.equal(engine.createExam(123).bankRevision,2);assert(engine.examQuestions(123,2).every(q=>q.kind));assert.notDeepEqual(engine.examQuestions(123,2),engine.examQuestions(123,1));assert.equal(engine.cleanExam({...old,bankRevision:999}),null);
const lesson=intermediateLessons[4],raw={draft:'Keep my SQL',attempted:true,tab:'quiz',choices:[0,1],checked:[true,true]};const migrated=cleanDatabaseLesson(raw,lesson);assert.equal(migrated.draft,raw.draft);assert.equal(migrated.attempted,true);assert.deepEqual(migrated.choices,[]);assert.deepEqual(migrated.checked,[]);
const completed={read:()=>new Set([lesson.id])},stale={read:(_k,_fallback,clean)=>clean(raw)};assert.equal(lessonProgress(lesson,'intermediate',stale,completed).attempted,0);assert.equal(lessonProgress(lesson,'intermediate',stale,completed).completed,true);
const newRaw={...migrated,choices:lesson.quizzes.map(q=>q.answer),checked:[true,true,true]};const clean=cleanDatabaseLesson(newRaw,lesson);assert.equal(clean.checked.length,3);const saved={read:(_k,_fallback,fn)=>fn(newRaw)};assert(lessonProgress(lesson,'intermediate',saved,completed).ready);
assert(!quizContext({code:'<script>bad()</script>',context:'<b>data</b>'}).includes('<script>'));assert(quizContext({code:'SELECT 1;'}).includes('<pre'));
console.log('Passed: 81 distinct practical questions, nine executable prediction fixtures, legacy exam identity/score preservation, three-answer reload, quiz-revision migration without losing drafts/completion and escaped SQL snippets.');
