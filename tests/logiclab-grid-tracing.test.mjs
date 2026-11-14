import assert from 'node:assert/strict';
import { createRunner } from '../dist/learn/js/programming-logic/pseudocode-interpreter.mjs';
import { gridExamples } from '../dist/learn/js/programming-logic/content/array-examples.mjs';
function run(code, inputs = []) {
  const r = createRunner(code),
    states = [r.initial()];
  let input = 0;
  for (let i = 0; i < 2500; i++) {
    let s = r.step();
    if (s.kind === 'input') {
      assert(input < inputs.length, 'Missing test input');
      s = r.step(inputs[input++]);
    }
    states.push(s);
    if (s.kind === 'done') return states;
  }
  throw Error('Did not complete');
}
const out = (code, inputs = []) => run(code, inputs).at(-1).output;
const total = run(gridExamples['2D grid input and total'].code, ['1', '2', '3', '4']);
assert.deepEqual(total.at(-1).output, ['10']);
assert.deepEqual(total.at(-1).variables[0].value, [1, 2, 3, 4]);
assert.deepEqual(total.at(-1).variables[0].dimensions, [2, 2]);
assert.deepEqual(total[1].variables[0].value, [
  undefined,
  undefined,
  undefined,
  undefined,
]);
assert(total.some((s) => s.changed?.includes('grid[1][0]')));
assert.deepEqual(out(gridExamples['2D row totals'].code), ['6', '15']);
assert.deepEqual(out(gridExamples['2D grid search'].code, ['11']), ['1, 1']);
assert.deepEqual(out(gridExamples['2D grid search'].code, ['8']), ['0, 0']);
assert.deepEqual(out(gridExamples['2D grid search'].code, ['7']), ['1, 2']);
assert.deepEqual(out(gridExamples['2D grid search'].code, ['99']), ['Not found']);
assert.deepEqual(
  out(
    'CONSTANT rows = 2\nDECLARE columns AS INTEGER = 3\nDECLARE grid[rows][columns] AS REAL\nDECLARE r AS INTEGER = 1\nSET GRID[r][columns - 1] = 7.5\nOUTPUT grid[1][2]',
  ),
  ['7.5'],
);
assert.deepEqual(
  out('DECLARE names[1][2] AS STRING\nINPUT names[0][1]\nOUTPUT names[0][1]', ['<Lebo>']),
  ['<Lebo>'],
);
assert.deepEqual(
  out('DECLARE flags[1][1] AS BOOLEAN\nSET flags[0][0] = TRUE\nOUTPUT NOT flags[0][0]'),
  ['FALSE'],
);
const code = 'DECLARE g[2][3] AS INTEGER\n';
for (const [suffix, pattern] of [
  ['SET g[2][0] = 1', /row.*0 to 1/],
  ['SET g[0][3] = 1', /column.*0 to 2/],
  ['OUTPUT g[-1][0]', /row/],
  ['OUTPUT g[0][-1]', /column/],
  ['OUTPUT g[0.5][0]', /row/],
  ['OUTPUT g[0][1.5]', /column/],
  ['OUTPUT g[0]', /requires 2 indexes/],
  ['INPUT g[0]', /requires 2 indexes/],
  ['SET g[0] = 1', /requires 2 indexes/],
  ['OUTPUT g', /read one array element/],
  ['SET g = 1', /as the target/],
  ['OUTPUT g[0][0]', /not been assigned/],
  ['SET g[0][0] = 1.5', /INTEGER/],
  ['SET g[0][0] = "text"', /numeric/],
])
  assert.throws(() => out(code + suffix), pattern);
for (const size of ['0][3', '2][-1', '1.5][2', '2][101', '11][10', 'missing][2'])
  assert.throws(() => out(`DECLARE g[${size}] AS INTEGER`));
assert.throws(
  () => out('DECLARE g[10][10] AS INTEGER\nDECLARE list[1] AS INTEGER'),
  /100 elements/,
);
assert.throws(() => createRunner('DECLARE g[2][3][4] AS INTEGER'));
assert.throws(() => createRunner('DECLARE g[2,3] AS INTEGER'));
assert.throws(
  () => out('DECLARE g[2][3] AS INTEGER\nOUTPUT g[0][0][0]'),
  /two-dimensional/,
);
assert.throws(
  () => out('DECLARE list[2] AS INTEGER\nSET list[0][0] = 1'),
  /requires 1 index/,
);
assert.throws(() => out('DECLARE x AS INTEGER = 2\nOUTPUT x[0][0]'), /not an array/);
assert.deepEqual(
  run('DECLARE g[10][10] AS INTEGER').at(-1).variables[0].dimensions,
  [10, 10],
);
const r = createRunner('DECLARE g[1][2] AS INTEGER\nINPUT g[0][1]\nOUTPUT g[0][1]');
const before = r.step();
before.variables[0].dimensions[0] = 99;
assert.equal(r.step().name, 'g[0][1]');
assert.throws(
  () => r.step('oops'),
  (e) => e.recoverable,
);
assert.equal(r.step().kind, 'input');
const after = r.step('9');
assert.deepEqual(after.variables[0].value, [undefined, 9]);
assert.deepEqual(after.variables[0].dimensions, [1, 2]);
assert.deepEqual(before.variables[0].value, [undefined, undefined]);
assert.deepEqual(r.step().output, ['9']);
const a = createRunner('DECLARE g[1][1] AS INTEGER\nSET g[0][0] = 7'),
  b = createRunner('DECLARE g[1][1] AS INTEGER');
a.step();
a.step();
assert.deepEqual(b.step().variables[0].value, [undefined]);
console.log(
  'Passed: 2D inputs, nested loops, row totals, first-match search, row/column bounds, dimensions, snapshot isolation and allocation limits.',
);
