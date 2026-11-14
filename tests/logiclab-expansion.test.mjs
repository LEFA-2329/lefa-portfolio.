import assert from 'node:assert/strict';
import { lessons } from '../dist/learn/js/programming-logic/content/lessons-and-quizzes.mjs';
import { practice } from '../dist/learn/js/programming-logic/content/lesson-practice.mjs';
import {
  parse,
  flowchart,
  hierarchy,
} from '../dist/learn/js/programming-logic/pseudocode-parser-and-diagrams.mjs';
assert.equal(lessons.length, 22);
let count = 0,
  tasks = 0;
for (const l of lessons) {
  const b = practice[l.id];
  assert(b);
  const qs = [l.quiz, ...b.quizzes];
  assert.equal(qs.length, 5);
  for (const q of qs) {
    assert(q.options[q.correct]);
    count++;
  }
  tasks += b.tasks.length;
  if (l.diagram === 'flow') assert.match(flowchart(parse(l.example)), /<svg/);
  if (l.diagram === 'hierarchy') assert.match(hierarchy(parse(l.example)).svg, /<svg/);
  if (b.tasks[0].diagram) {
    try {
      assert.match(flowchart(parse(b.worked.code)), /<svg/);
    } catch (e) {
      throw Error(l.id + ': ' + e.message);
    }
  }
}
assert.equal(count, 110);
assert.equal(tasks, 44);
for (const code of [
  'START\nREAD x\nx ← x + 1 // increment\nIF x > 5\nPRINT "High"\nELSE IF x = 5\nDISPLAY "Equal"\nELSE\nPRINT "Low"\nEND IF\nSTOP',
  'METHOD pick(x)\nIF x > 0 THEN\nRETURN x\nELSE\nRETURN 0\nENDIF\nENDMETHOD\nBEGIN\nSET y = pick(2)\nEND',
  'MODULE Main\nFOR i FROM 1 TO 3\nOUTPUT i\nNEXT i\nEND MODULE',
])
  assert.match(flowchart(parse(code)), /<svg/);
assert.match(flowchart(parse('OUTPUT "https://example.org"')), /https:\/\/example.org/);
assert.throws(() => flowchart(parse('RETURN 1\nOUTPUT 2')), /unreachable/i);
assert.throws(() => parse('BEGIN\nIF x THEN\nOUTPUT x\nEND'), /Line/);
console.log(
  'Passed: 22 lessons, 110 questions, 44 tasks, lesson diagrams and syntax/return checks.',
);
