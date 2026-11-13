import assert from 'node:assert/strict';
import {
  examBank,
  writtenQuestions,
  examQuestions,
  createExam,
  cleanExam,
  submitExam,
  remainingSeconds,
  examResult,
} from '../dist/learn/js/prld/exam.mjs';
import { auditDeclarations } from '../scripts/slide-audit.mjs';
import { createRunner } from '../dist/learn/js/prld/runner.mjs';
import { parse, flowchart, hierarchy } from '../dist/learn/js/prld/engine.mjs';
assert.equal(examBank.length, 110);
for (let seed = 1; seed < 100; seed++) {
  const qs = examQuestions(seed);
  assert.equal(qs.length, 15);
  assert.equal(new Set(qs.map((q) => q.id)).size, 15);
  for (let unit = 1; unit <= 5; unit++)
    assert.equal(qs.filter((q) => q.unit === unit).length, 3);
  assert.deepEqual(examQuestions(seed), qs);
}
assert.notDeepEqual(
  examQuestions(1).map((q) => q.id),
  examQuestions(2).map((q) => q.id),
);
const start = 100000,
  s = createExam(42, 30, start);
assert.equal(remainingSeconds(s, start), 1800);
assert.equal(remainingSeconds(s, s.deadline - 1), 1);
assert.equal(remainingSeconds(s, s.deadline), 0);
assert.equal(remainingSeconds(s, s.deadline + 10000), 0);
assert.equal(remainingSeconds(createExam(2, 0, start), 999999999), null);
assert.throws(() => examResult(s), /Submit/);
const qs = examQuestions(s.seed);
for (const q of qs) s.answers[q.id] = q.correct;
s.written.marks = 'My draft';
const restored = cleanExam(
  JSON.parse(JSON.stringify({ ...s, deadline: start + 999999999 })),
);
assert.equal(restored.deadline, s.deadline);
assert.equal(restored.written.marks, 'My draft');
assert.deepEqual(restored.answers, s.answers);
submitExam(restored, s.deadline);
assert(restored.expired);
assert.equal(examResult(restored).objective, 15);
assert.equal(examResult(restored).combined, null);
submitExam(restored, s.deadline + 9000);
assert.equal(restored.submittedAt, s.deadline);
for (const q of writtenQuestions) {
  auditDeclarations(q.solution);
  assert.equal(q.criteria.length, 5);
  restored.ratings[q.id] = [2, 2, 2, 2, 2];
}
assert.equal(examResult(restored).self, 20);
assert.equal(examResult(restored).combined, 35);
const incorrect = createExam(7, 0, start);
for (const q of examQuestions(7))
  incorrect.answers[q.id] = (q.correct + 1) % q.options.length;
submitExam(incorrect, start + 1000);
assert.equal(examResult(incorrect).objective, 0);
assert(!incorrect.expired);
const empty = createExam(8, 0, start);
submitExam(empty, start + 1);
assert.equal(examResult(empty).objective, 0);
assert.equal(cleanExam(null), null);
assert.equal(cleanExam({ version: 99 }), null);
assert.equal(cleanExam({ ...s, seed: 0 }), null);
assert.equal(cleanExam({ ...s, minutes: 1 }), null);
const dirty = cleanExam({
  ...s,
  index: 100,
  answers: { [qs[0].id]: 999, unknown: 0 },
  written: { marks: 'x'.repeat(20000) },
  ratings: { marks: [2, 2, 2, 2, 2] },
});
assert.equal(dirty.index, 0);
assert.deepEqual(dirty.answers, {});
assert.equal(dirty.written.marks.length, 10000);
assert(dirty.ratings.marks.every((x) => x === null));
const ratings = cleanExam({ ...restored, ratings: { marks: [-1, 3, '2', null, 1] } });
assert.deepEqual(ratings.ratings.marks, [null, null, null, null, 1]);
assert.match(flowchart(parse(writtenQuestions[0].solution)), /<svg/);
assert.match(hierarchy(parse(writtenQuestions[1].solution)).svg, /Total/);
function run(inputs) {
  const r = createRunner(writtenQuestions[0].solution);
  let at = 0;
  for (let i = 0; i < 100; i++) {
    let x = r.step();
    if (x.kind === 'input') x = r.step(String(inputs[at++]));
    if (x.kind === 'done') return x.output;
  }
  throw Error('Did not finish');
}
assert.deepEqual(run([50, 49, 75, 0]), ['2']);
assert.deepEqual(run([50, 50, 50, 50]), ['4']);
assert.deepEqual(run([0, 0, 0, 0]), ['0']);
console.log(
  'Passed: mixed-unit selection, deterministic restoration, timer deadlines, answer locking, empty/incorrect/correct marking, separate self-assessment, invalid saved state and written boundaries.',
);
