import assert from 'node:assert/strict';
import { lessons } from '../dist/learn/js/programming-logic/content/lessons-and-quizzes.mjs';
import { practice } from '../dist/learn/js/programming-logic/content/lesson-practice.mjs';
import { auditDeclarations } from '../scripts/slide-audit.mjs';
import { cleanLesson } from '../dist/learn/js/shared/saved-programming-answers.mjs';
import { createRunner } from '../dist/learn/js/programming-logic/pseudocode-interpreter.mjs';
for (const l of lessons) {
  for (const code of [l.example, practice[l.id].worked.code]) auditDeclarations(code);
  assert(l.examplePrompt && l.exampleTrace.length >= 2, l.id);
  assert(l.bug.prompt.length > 35, l.id);
}
const checks = [
  [1, [20, 3], ['60'], [3, 12], ['36']],
  [2, [18], ['Adult'], [15], ['Mild or warm']],
  [3, [], ['0017, 75, TRUE'], [2, 3, 4], ['24']],
  [4, [40, 60], ['50'], [20, 3], ['54']],
  [5, [], ['8'], [], ['5, 10']],
  [6, [100], ['Valid'], [500, true], ['450']],
  [7, [74], ['Pass'], [16, true], ['Eligible']],
  [8, [2, 3, 4], ['9'], [3, 50, 49, 100], ['2']],
  [
    9,
    [10, 20, -1],
    ['15'],
    [101, -5, 70],
    ['Enter a mark from 0 to 100', 'Enter a mark from 0 to 100', '70'],
  ],
  [10, [], ['1, 1', '1, 2', '1, 3', '2, 1', '2, 2', '2, 3'], [2, 4, 6, 8], ['6', '14']],
  [11, [], ['15, 3'], [], ['-3']],
  [12, [], ['0'], [], ['Not found']],
  [13, [], ['Lebo, 64', 'Naledi, 81', 'Thabo, 72'], [], ['Naledi, 81']],
  [14, [], ['1, 2, 4, 5'], [], ['1, 3, 2, 4']],
];
function run(code, inputs) {
  const r = createRunner(code);
  let at = 0;
  for (let i = 0; i < 2001; i++) {
    let s = r.step();
    if (s.kind === 'input') {
      assert(at < inputs.length);
      s = r.step(String(inputs[at++]));
    }
    if (s.kind === 'done') return s.output;
  }
  throw Error('Execution did not finish');
}
for (const [n, input, output, practiceInput, practiceOutput] of checks) {
  const l = lessons[n - 1];
  assert.deepEqual(run(l.example, input), output, l.id);
  assert.deepEqual(
    run(practice[l.id].worked.code, practiceInput),
    practiceOutput,
    l.id + ' worked',
  );
}
for (const index of [0, 3]) {
  const l = lessons[index];
  for (const category of ['Calculation', 'Logic'])
    assert(
      cleanLesson(l, practice[l.id], {
        debugAttempts: 1,
        debugChecked: true,
        line: l.bug.line,
        category,
        correction: l.bug.correct,
      }).bugPassed,
    );
  assert(
    !cleanLesson(l, practice[l.id], {
      debugAttempts: 1,
      debugChecked: true,
      line: l.bug.line,
      category: 'Syntax',
      correction: l.bug.correct,
    }).bugPassed,
  );
}
console.log(
  'Passed: declarations in 44 online examples, explicit debugging requirements, 28 live numeric examples and persisted arithmetic category checks.',
);
