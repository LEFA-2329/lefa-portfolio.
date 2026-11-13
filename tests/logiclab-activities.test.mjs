import assert from 'node:assert/strict';
import { activities, checkActivity } from '../dist/learn/js/prld/content/activities.mjs';
import { createRunner } from '../dist/learn/js/prld/runner.mjs';
assert.equal(activities.length, 20);
assert.equal(new Set(activities.map((a) => a.id)).size, 20);
for (const unit of [1, 2, 3, 4, 5]) {
  const tasks = activities.filter((a) => a.unit === unit);
  assert.equal(tasks.length, 4);
  assert.equal(new Set(tasks.map((a) => a.kind)).size, 4);
}
for (const a of activities) {
  assert(a.prompt && a.title && a.solution && a.explanation);
  assert.equal(a.hints.length, 2);
  assert(a.hints.every((h) => h.length > 20));
  assert.notEqual(a.hints[0], a.hints[1]);
  if (a.statements) {
    assert.equal(new Set(a.initialOrder).size, a.statements.length);
    assert.deepEqual(
      [...a.initialOrder].sort((a, b) => a - b),
      a.statements.map((_, i) => i),
    );
    assert(!checkActivity(a, a.initialOrder));
    assert(
      checkActivity(
        a,
        a.statements.map((_, i) => i),
      ),
    );
    assert(!checkActivity(a, []));
    assert(
      !checkActivity(
        a,
        a.statements.map(() => 0),
      ),
    );
  } else {
    assert.equal(a.choices.length, 3);
    a.choices.forEach((_, index) =>
      assert.equal(checkActivity(a, index), index === a.correct),
    );
    assert(!checkActivity(a, null));
    assert(!checkActivity(a, '1'));
    assert(!checkActivity(a, -1));
  }
}
function execute(code, inputs = []) {
  const runner = createRunner(code);
  let i = 0;
  for (let n = 0; n < 1000; n++) {
    let s = runner.step();
    if (s.kind === 'input') s = runner.step(inputs[i++]);
    if (s.kind === 'done') return s.output;
  }
  throw Error('Unfinished fixture');
}
for (const a of activities.filter((a) => a.unit <= 3 && a.kind === 'Predict the output'))
  assert.deepEqual(execute(a.code), [a.choices[a.correct]]);
for (const a of activities.filter((a) => a.unit <= 3 && a.kind === 'Missing line')) {
  assert.equal(a.code.replace('____', a.choices[a.correct]), a.solution);
  assert(execute(a.solution, ['1', '2', '3']));
}
assert.deepEqual(execute(activities.find((a) => a.id === 'u1-debug').solution), ['2.5']);
assert.deepEqual(execute(activities.find((a) => a.id === 'u2-debug').solution), [
  '1',
  '2',
  '3',
]);
const parallel = activities.find((a) => a.id === 'u3-debug');
assert.deepEqual(
  execute(
    parallel.code.replace(
      'OUTPUT names[selected], marks[0]',
      parallel.choices[parallel.correct],
    ),
  ),
  ['Neo, 72'],
);
assert.deepEqual(execute(activities.find((a) => a.id === 'u1-order').solution, ['5']), [
  '6',
]);
assert.deepEqual(execute(activities.find((a) => a.id === 'u2-order').solution), [
  '2',
  '1',
]);
assert.deepEqual(execute(activities.find((a) => a.id === 'u3-order').solution), ['7']);
console.log(
  'Passed: 20 activities, all five units/four formats, correct and incorrect grading, ordered dependencies, and executable numeric solutions.',
);
