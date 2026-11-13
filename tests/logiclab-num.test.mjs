import assert from 'node:assert/strict';
import { createRunner } from '../dist/learn/js/prld/runner.mjs';
import { parse, flowchart } from '../dist/learn/js/prld/engine.mjs';
function run(code, inputs = []) {
  const r = createRunner(code);
  let next = 0;
  for (let i = 0; i < 2001; i++) {
    let s = r.step();
    if (s.kind === 'input') s = r.step(inputs[next++]);
    if (s.kind === 'done') return s;
  }
  throw Error('Did not finish');
}
assert.deepEqual(run('DECLARE num AS NUM\nINPUT num\nOUTPUT num', ['7']).output, ['7']);
assert.deepEqual(run('DECLARE num AS NUM\nINPUT num\nOUTPUT num', ['7.5']).output, [
  '7.5',
]);
const sum = run(
  'DECLARE first, second, total AS NUM\nINPUT first\nINPUT second\nSET total = first + second\nOUTPUT total',
  ['4', '6.5'],
);
assert.deepEqual(sum.output, ['10.5']);
assert(sum.variables.every((v) => v.type === 'NUM'));
assert.deepEqual(run('num num\nSET NUM = -2.5\nOUTPUT num').output, ['-2.5']);
assert.deepEqual(
  run('CONSTANT price AS NUM = 2.5\nDECLARE quantity AS NUM = 3\nOUTPUT price * quantity')
    .output,
  ['7.5'],
);
assert.deepEqual(
  run('DECLARE a[2] AS NUM\nSET a[0] = 2\nSET a[1] = 2.5\nOUTPUT a[0] + a[1]').output,
  ['4.5'],
);
assert.deepEqual(
  run('NUM a[1][2]\nSET a[0][0] = 4\nINPUT a[0][1]\nOUTPUT a[0][0] + a[0][1]', ['1.25'])
    .output,
  ['5.25'],
);
assert.deepEqual(
  run(
    'DECLARE count AS NUM\nDECLARE total AS NUM = 0\nFOR count = 1 TO 3\nSET total = total + count\nENDFOR\nOUTPUT total',
  ).output,
  ['6'],
);
assert.deepEqual(
  run('DECLARE count AS NUM\nFOR count = 3 TO 1 STEP -1\nOUTPUT count\nENDFOR').output,
  ['3', '2', '1'],
);
assert.deepEqual(
  run('DECLARE i AS NUM = 1\nDECLARE a[2] AS NUM\nSET a[i] = 8.5\nOUTPUT a[i]').output,
  ['8.5'],
);
for (const code of [
  'DECLARE n AS NUM = "7"',
  'DECLARE n AS NUM = TRUE',
  'CONSTANT n AS NUM = FALSE',
  'DECLARE n AS NUM = 1e999',
  'DECLARE n AS NUM = 1 / 0',
  'DECLARE a[1] AS NUM\nSET a[0] = "x"',
  'DECLARE a[1][1] AS NUM\nSET a[0][0] = FALSE',
  'DECLARE i AS NUM\nFOR i = 1.5 TO 3\nOUTPUT i\nENDFOR',
  'DECLARE i AS NUM\nFOR i = 1 TO 3\nSET i = 1.5\nENDFOR',
  'DECLARE i AS NUM = 0.5\nDECLARE a[2] AS NUM\nOUTPUT a[i]',
])
  assert.throws(() => run(code));
const r = createRunner('DECLARE num AS NUM\nINPUT num\nOUTPUT num');
r.step();
assert.equal(r.step().type, 'NUM');
for (const bad of ['abc', 'TRUE', 'NaN', 'Infinity', '1e999', ''])
  assert.throws(
    () => r.step(bad),
    (e) => e.recoverable,
  );
assert.equal(r.step('6.25').variables[0].value, 6.25);
assert.deepEqual(r.step().output, ['6.25']);
assert.throws(() => run('DECLARE n AS INTEGER = 2.5'), /INTEGER/);
assert.deepEqual(run('DECLARE n AS REAL = 2.5\nOUTPUT n').output, ['2.5']);
assert.match(flowchart(parse('NUM num\nINPUT num\nOUTPUT num')), /<svg/);
assert.match(flowchart(parse('DECLARE num AS NUM\nINPUT num\nOUTPUT num')), /<svg/);
console.log(
  'Passed: NUM whole/decimal inputs, declarations, constants, lists, grids, FOR counters, validation, compatibility and flowcharts.',
);
