import assert from 'node:assert/strict';
import { createRunner } from '../dist/learn/js/programming-logic/pseudocode-interpreter.mjs';
function execute(code, inputs = [], options) {
  const runner = createRunner(code, options),
    states = [runner.initial()];
  let i = 0;
  for (let n = 0; n < 3000; n++) {
    const s = runner.step();
    if (s.kind === 'input') {
      assert(i < inputs.length, 'Input fixture missing');
      states.push(runner.step(inputs[i++]));
    } else states.push(s);
    if (states.at(-1).kind === 'done') return states;
  }
  throw Error('Runner did not terminate.');
}
function output(code, inputs = []) {
  return execute(code, inputs).at(-1).output;
}
const declarations = 'DECLARE total AS INTEGER\nDECLARE i AS INTEGER\nSET total = 0\n';
assert.deepEqual(
  output(declarations + 'FOR i = 1 TO 3\nSET total = total + i\nENDFOR\nOUTPUT total'),
  ['6'],
);
assert.deepEqual(
  output(
    declarations + 'FOR i = 3 TO 1 STEP -1\nSET total = total + i\nENDFOR\nOUTPUT total',
  ),
  ['6'],
);
assert.deepEqual(
  output(declarations + 'FOR i = 3 TO 1\nOUTPUT i\nENDFOR\nOUTPUT total'),
  ['0'],
);
assert.deepEqual(
  output('DECLARE i AS INTEGER = 2\nWHILE i > 0 DO\nOUTPUT i\nSET i = i - 1\nENDWHILE'),
  ['2', '1'],
);
const repeat = execute(
  'DECLARE i AS INTEGER = 0\nREPEAT\nSET i = i + 1\nUNTIL i = 2\nOUTPUT i',
);
assert.deepEqual(repeat.at(-1).output, ['2']);
assert(repeat.some((s) => s.line === 4 && s.condition === false));
assert.deepEqual(
  output(
    'DECLARE mark AS REAL\nINPUT mark\nIF mark >= 75 THEN\nOUTPUT "Distinction"\nELSEIF mark >= 50 THEN\nOUTPUT "Pass"\nELSE\nOUTPUT "Revise"\nENDIF',
    ['74'],
  ),
  ['Pass'],
);
assert.deepEqual(
  output(
    'DECLARE x AS INTEGER = 9\nSWITCH x\nCASE 1:\nOUTPUT "One"\nDEFAULT:\nOUTPUT "Other"\nENDSWITCH',
  ),
  ['Other'],
);
assert.deepEqual(
  output('DECLARE x AS INTEGER = 0\nOUTPUT NOT x = 1, TRUE OR FALSE AND FALSE'),
  ['TRUE, TRUE'],
);
assert.deepEqual(
  output('DECLARE x AS INTEGER\nIF FALSE AND x > 0 THEN\nOUTPUT x\nENDIF\nOUTPUT "Safe"'),
  ['Safe'],
);
assert.deepEqual(output('OUTPUT -5 DIV 2, -5 MOD 2, 7 / 2, (2 + 3) * 4'), [
  '-2, -1, 3.5, 20',
]);
assert.deepEqual(
  output(
    'DECLARE name AS STRING\nINPUT name\nOUTPUT "Hello " + name, "a,b", "https://example.org"',
    ['Lebo'],
  ),
  ['Hello Lebo, a,b, https://example.org'],
);
assert.deepEqual(
  output('DECLARE flag AS BOOLEAN\nINPUT flag\nOUTPUT NOT flag', ['FALSE']),
  ['TRUE'],
);
assert.deepEqual(
  output('DECLARE Amount AS REAL\nINPUT amount\nOUTPUT AMOUNT', ['12.5']),
  ['12.5'],
);
assert.deepEqual(output('CONSTANT limit AS INTEGER = 3\nOUTPUT limit'), ['3']);
assert.throws(() => output('OUTPUT absent'), /declared/);
assert.throws(() => output('DECLARE x AS INTEGER\nOUTPUT x'), /not been assigned/);
assert.throws(() => output('DECLARE x AS INTEGER\nSET x = 1.5'), /INTEGER/);
assert.throws(() => output('DECLARE x AS REAL\nSET x = 1 / 0'), /Division by zero/);
assert.throws(() => output('IF 1 THEN\nOUTPUT "Bad"\nENDIF'), /BOOLEAN/);
assert.throws(
  () => output('DECLARE x AS INTEGER\nDECLARE X AS INTEGER'),
  /already declared/,
);
assert.throws(() => output('CONSTANT x = 1\nSET x = 2'), /constant/);
assert.throws(
  () => execute('WHILE TRUE DO\nENDWHILE', [], { maxSteps: 10 }),
  /Stopped after 10 steps/,
);
for (const code of [
  'METHOD A()\nOUTPUT 1\nENDMETHOD',
  'CLASS Book\nENDCLASS',
  'OUTPUT window.alert(1)',
  'OUTPUT globalThis',
  'OUTPUT "x" * 2',
  'OUTPUT 1 = "1"',
  'OUTPUT 1 < 2 < 3',
])
  assert.throws(() => output(code));
const r = createRunner('DECLARE x AS INTEGER\nINPUT x\nOUTPUT x');
r.step();
assert.equal(r.step().kind, 'input');
assert.throws(
  () => r.step('abc'),
  (e) => e.recoverable === true,
);
assert.equal(r.step().kind, 'input');
assert.equal(r.step('4').variables[0].value, 4);
assert.equal(r.step().output[0], '4');
const states = execute('DECLARE x AS INTEGER = 1\nSET x = x + 1\nOUTPUT x');
assert.equal(states[1].variables[0].value, 1);
assert.equal(states.at(-1).variables[0].value, 2);
assert.deepEqual(states[1].output, []);
const source = 'DECLARE x AS INTEGER\nINPUT x\nIF x >= 0 THEN\nOUTPUT x\nENDIF';
const lines = execute(source, ['2']);
assert(lines.some((s) => s.line === 3 && s.condition === true));
assert.throws(() => createRunner('OUTPUT "' + 'x'.repeat(2100) + '"'), /2,000/);
console.log(
  'Passed: input recovery, snapshots, types, arithmetic, branches, FOR/WHILE/REPEAT, SWITCH, safety and step limits.',
);

const arrayProgram = `DECLARE values[3] AS INTEGER
DECLARE i AS INTEGER
DECLARE total AS INTEGER = 0
FOR i = 0 TO 2
INPUT values[i]
SET total = total + values[i]
ENDFOR
OUTPUT total`;
const arrayStates = execute(arrayProgram, ['2', '3', '4']);
assert.deepEqual(arrayStates.at(-1).output, ['9']);
assert.deepEqual(
  arrayStates.find((s) => s.variables.some((v) => v.array)).variables[0].value,
  [undefined, undefined, undefined],
);
assert.deepEqual(arrayStates.at(-1).variables[0].value, [2, 3, 4]);
assert(arrayStates.some((s) => s.changed?.includes('values[1]')));
assert.deepEqual(
  output(
    'CONSTANT size = 2\nDECLARE Names[size] AS STRING\nSET names[0] = "Lebo"\nINPUT NAMES[1]\nOUTPUT names[0], names[1]',
    ['Neo'],
  ),
  ['Lebo, Neo'],
);
assert.deepEqual(
  output('DECLARE a[2] AS BOOLEAN\nSET a[0] = TRUE\nSET a[1] = NOT a[0]\nOUTPUT a[1]'),
  ['FALSE'],
);
assert.deepEqual(
  output(
    'DECLARE a[2] AS INTEGER\nDECLARE i AS INTEGER = 0\nSET a[i + 1] = 7\nOUTPUT a[(1)]',
  ),
  ['7'],
);
for (const code of [
  'DECLARE a[0] AS INTEGER',
  'DECLARE a[101] AS INTEGER',
  'DECLARE a[1.5] AS INTEGER',
  'DECLARE a[70] AS INTEGER\nDECLARE b[40] AS REAL',
  'DECLARE a[2] AS INTEGER\nOUTPUT a[2]',
  'DECLARE a[2] AS INTEGER\nSET a[-1] = 1',
  'DECLARE a[2] AS INTEGER\nOUTPUT a[0]',
  'DECLARE a[2] AS INTEGER\nSET a[0] = 1.5',
  'DECLARE a[2] AS INTEGER\nOUTPUT a',
  'DECLARE a[2] AS INTEGER\nINPUT a',
  'DECLARE a[2] AS INTEGER\nSET a = 2',
  'DECLARE x AS INTEGER = 1\nOUTPUT x[0]',
  'DECLARE a[2] AS INTEGER\nOUTPUT a[0][1]',
])
  assert.throws(() => output(code));
const ar = createRunner('DECLARE a[1] AS INTEGER\nINPUT a[0]');
ar.step();
assert.equal(ar.step().name, 'a[0]');
assert.throws(
  () => ar.step('bad'),
  (e) => e.recoverable,
);
assert.deepEqual(ar.step('8').variables[0].value, [8]);
console.log(
  'Passed: indexed array inputs, writes, expressions, deep snapshots, types, bounds and allocation limits.',
);

const shippedArrayExamples = {
  'Array input and total': {
    hint: 'Enter 2, 3 and 4. Watch values[0], values[1] and values[2] fill; the total should be 9.',
    code: 'BEGIN\n  DECLARE values[3] AS INTEGER\n  DECLARE i AS INTEGER\n  DECLARE total AS INTEGER = 0\n  FOR i = 0 TO 2\n    INPUT values[i]\n    SET total = total + values[i]\n  ENDFOR\n  OUTPUT total\nEND',
  },
  'Linear search': {
    hint: 'Enter 11 to find index 2. Restart with 99 to see the not-found result -1.',
    code: 'BEGIN\n  DECLARE values[4] AS INTEGER\n  DECLARE target AS INTEGER\n  DECLARE i AS INTEGER = 0\n  DECLARE foundAt AS INTEGER = -1\n  SET values[0] = 8\n  SET values[1] = 3\n  SET values[2] = 11\n  SET values[3] = 5\n  INPUT target\n  WHILE i < 4 AND foundAt = -1 DO\n    IF values[i] = target THEN\n      SET foundAt = i\n    ENDIF\n    SET i = i + 1\n  ENDWHILE\n  OUTPUT foundAt\nEND',
  },
  'Parallel arrays': {
    hint: 'Enter 1 for Neo and 72, or 2 for Amina and 88. Names and marks share the same index.',
    code: 'BEGIN\n  DECLARE names[3] AS STRING\n  DECLARE marks[3] AS INTEGER\n  DECLARE selected AS INTEGER\n  SET names[0] = "Lebo"\n  SET names[1] = "Neo"\n  SET names[2] = "Amina"\n  SET marks[0] = 65\n  SET marks[1] = 72\n  SET marks[2] = 88\n  INPUT selected\n  IF selected >= 0 AND selected < 3 THEN\n    OUTPUT names[selected], marks[selected]\n  ELSE\n    OUTPUT "Choose an index from 0 to 2"\n  ENDIF\nEND',
  },
  'Bubble sort': {
    hint: 'Follow adjacent comparisons and swaps. The final output should be 1, 3, 5, 8.',
    code: 'BEGIN\n  DECLARE values[4] AS INTEGER\n  DECLARE pass AS INTEGER\n  DECLARE i AS INTEGER\n  DECLARE temp AS INTEGER\n  SET values[0] = 8\n  SET values[1] = 3\n  SET values[2] = 5\n  SET values[3] = 1\n  FOR pass = 0 TO 2\n    FOR i = 0 TO 2 - pass\n      IF values[i] > values[i + 1] THEN\n        SET temp = values[i]\n        SET values[i] = values[i + 1]\n        SET values[i + 1] = temp\n      ENDIF\n    ENDFOR\n  ENDFOR\n  OUTPUT values[0], values[1], values[2], values[3]\nEND',
  },
};
assert.deepEqual(output(shippedArrayExamples['Bubble sort'].code), ['1, 3, 5, 8']);
assert.deepEqual(output(shippedArrayExamples['Linear search'].code, ['11']), ['2']);
assert.deepEqual(output(shippedArrayExamples['Linear search'].code, ['99']), ['-1']);
assert.deepEqual(output(shippedArrayExamples['Parallel arrays'].code, ['1']), [
  'Neo, 72',
]);
assert.deepEqual(output(shippedArrayExamples['Parallel arrays'].code, ['8']), [
  'Choose an index from 0 to 2',
]);
console.log('Passed: shipped bubble sort, linear search and parallel-array examples.');
