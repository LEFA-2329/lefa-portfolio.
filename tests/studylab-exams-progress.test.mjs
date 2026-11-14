import assert from 'node:assert/strict';
import { databaseExamEngine } from '../dist/learn/js/database/database-exam-logic.mjs';
import {
  createCompletionStore,
  lessonProgress,
  courseProgress,
} from '../dist/learn/js/shared/learning-progress.mjs';
import { createWorkStore } from '../dist/learn/js/shared/saved-work-storage.mjs';
import { dbLessons } from '../dist/learn/js/database/content/introduction-lessons.mjs';
import { lessons } from '../dist/learn/js/programming-logic/content/lessons-and-quizzes.mjs';
for (const course of ['database', 'intermediate']) {
  const e = databaseExamEngine(course),
    s = e.createExam(123, 30, 1000),
    qs = e.examQuestions(s.seed);
  assert.equal(qs.length, e.units.length * 2);
  assert.equal(new Set(qs.map((q) => q.id)).size, qs.length);
  assert.deepEqual(qs, e.examQuestions(123));
  assert.notDeepEqual(qs, e.examQuestions(987));
  for (const u of e.units) assert.equal(qs.filter((q) => q.unit === u.id).length, 2);
  assert.throws(() => e.examResult(s), /Submit/);
  for (const q of qs) s.answers[q.id] = q.correct;
  assert.equal(e.remainingSeconds(s, 1000), 1800);
  e.submitExam(s, 1801000);
  assert(s.expired);
  const clean = e.cleanExam(s);
  assert.equal(e.examResult(clean).objective, e.quizCount);
  assert.equal(e.examResult(clean).combined, null);
  for (const q of e.writtenQuestions) clean.ratings[q.id] = Array(5).fill(2);
  assert.equal(e.examResult(clean).combined, e.quizCount + 20);
  assert.equal(e.examResult(clean).total, e.quizCount + 20);
  assert.equal(e.cleanExam({ ...s, course: 'other' }), null);
  const invalid = e.cleanExam({
    ...s,
    index: 999,
    answers: { [qs[0].id]: 100 },
    ratings: {},
  });
  assert.equal(invalid.index, 0);
  assert.deepEqual(invalid.answers, {});
  assert.throws(() => e.createExam(1, 10), /Invalid/);
  const untimed = e.createExam(1, 0, 1000);
  assert.equal(e.remainingSeconds(untimed), null);
  assert.equal(e.cleanExam({ ...untimed, ratings: { x: [2] } }).ratings.x, undefined);
}
const memory = new Map(),
  storage = {
    getItem: (k) => memory.get(k) ?? null,
    setItem: (k, v) => memory.set(k, String(v)),
    removeItem: (k) => memory.delete(k),
    key: (i) => [...memory.keys()][i],
    get length() {
      return memory.size;
    },
  };
const store = createWorkStore(() => storage),
  completion = createCompletionStore(() => storage),
  l = dbLessons[0];
storage.setItem('logiclab-progress-v1', JSON.stringify(['lesson-1', 'not-a-lesson']));
assert(completion.read().has('lesson-1'));
assert(!completion.read().has('not-a-lesson'));
assert(!lessonProgress(l, 'database', store, completion).ready);
store.write('database:' + l.id, {
  choices: l.quizzes.map((q) => q.answer),
  checked: [true, true],
});
assert(lessonProgress(l, 'database', store, completion).ready);
completion.set(l.id, true);
assert(lessonProgress(l, 'database', store, completion).completed);
assert(completion.read().has('lesson-1'));
completion.set('lesson-1', false);
assert(!completion.read().has('lesson-1'));
store.write('database:' + l.id, {
  choices: l.quizzes.map((q) => (q.answer + 1) % q.options.length),
  checked: [true, true],
});
assert(lessonProgress(l, 'database', store, completion).needsRevision);
assert(lessonProgress(l, 'database', store, completion).completed);
assert.equal(courseProgress('database', store, completion).completed, 1);
assert(!lessonProgress(lessons[0], 'prld', store, completion).ready);
store.clearAll();
assert(completion.read().has(l.id));
store.write('database:' + l.id, { draft: 'Keep this draft' });
completion.reset();
assert.equal(completion.read().size, 0);
assert.equal(store.read('database:' + l.id, {}).draft, 'Keep this draft');
const blocked = createCompletionStore(() => {
  throw Error('blocked');
});
assert.equal(blocked.read().size, 0);
assert.equal(blocked.set(l.id, true), false);
assert(blocked.getIssue());
storage.setItem('studylab-completion-v1', 'broken');
assert.equal(createCompletionStore(() => storage).read().size, 0);
console.log(
  'Passed: separate course exams, seeded mixed-unit selection, deadlines, score boundaries, restore sanitisation, completion migration, quiz gates, revision signals, scoped reset, blocked/corrupt storage.',
);
