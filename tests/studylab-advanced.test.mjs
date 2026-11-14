import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import {
  advancedUnits,
  advancedLessons,
} from '../dist/learn/js/database/content/advanced-lessons.mjs';
import { progressCourses } from '../dist/learn/js/shared/learning-progress.mjs';
assert.equal(advancedUnits.length, 9);
assert.equal(advancedLessons.length, 11);
assert.equal(new Set(advancedLessons.map((l) => l.id)).size, 11);
for (const lesson of advancedLessons) {
  assert(advancedUnits.some((u) => u.id === lesson.unit));
  assert.equal(lesson.quizzes.length, 3);
  assert.equal(lesson.tasks.length, 2);
  for (const q of lesson.quizzes) {
    assert(q.answer >= 0 && q.answer < q.options.length);
    assert(q.explanation.trim());
  }
  for (const t of lesson.tasks) assert(t.prompt && t.hint && t.solution);
  const url = new URL(
    '../dist/learn/downloads/advanced/' + lesson.download,
    import.meta.url,
  );
  assert(existsSync(url));
  assert.equal(readFileSync(url, 'utf8').trim(), lesson.sampleCode.trim());
}
assert.deepEqual(progressCourses.advanced.lessons, advancedLessons);
console.log(
  'Passed: Advanced module content, 33 quiz answers, 22 tasks, eleven downloads and progress registration.',
);
