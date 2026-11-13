import assert from 'node:assert/strict';
import { taskBank } from '../dist/learn/js/prld/content/tasks.mjs';
import { parse, flowchart } from '../dist/learn/js/prld/engine.mjs';
assert.equal(taskBank.length, 53);
assert.equal(new Set(taskBank.map((t) => t.id)).size, 53);
for (const t of taskBank) {
  assert(t.prompt.length > 40);
  assert(t.solution.length > 40);
  assert(t.checklist.length >= 3);
  if (t.diagram) assert.match(flowchart(parse(t.solution.split('\n\n')[0])), /<svg/);
}
assert(taskBank.some((t) => t.topic === 'OOP'));
assert(taskBank.some((t) => t.topic === 'Overloading' && !t.diagram));
console.log(
  'Passed: 53 unique library tasks, model solutions, checklists and supported diagrams.',
);
