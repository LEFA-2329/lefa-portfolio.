import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {
  parse,
  flowchart,
} from '../dist/learn/js/programming-logic/pseudocode-parser-and-diagrams.mjs';
const content = JSON.parse(
  fs.readFileSync(new URL('../scripts/slide-lessons.json', import.meta.url)),
);
// A restricted, test-only translation checks outputs of the authored numeric examples.
// It is not part of the application or a public pseudocode interpreter.
function run(code, input = []) {
  const expr = (x) =>
    x
      .replace(/<>/g, '!==')
      .replace(/\bAND\b/g, '&&')
      .replace(/\bOR\b/g, '||')
      .replace(/\bNOT\b/g, '!')
      .replace(/\bTRUE\b/g, 'true')
      .replace(/\bFALSE\b/g, 'false')
      .replace(/\bMOD\b/g, '%')
      .replace(/(?<![<>=!])=(?!=)/g, '===');
  const out = [];
  const js = code
    .split('\n')
    .map((raw) => {
      const line = raw.trim();
      let m;
      if (!line || /^(BEGIN|END)$/.test(line)) return '';
      if ((m = line.match(/^DECLARE (\w+)((?:\[\d+\])+) AS .+$/)))
        return `let ${m[1]} = allocate(${JSON.stringify([...m[2].matchAll(/\d+/g)].map((x) => Number(x[0])))});`;
      if ((m = line.match(/^DECLARE (\w+) AS .+$/))) return `let ${m[1]};`;
      if ((m = line.match(/^METHOD (\w+)\((.*)\)(?: RETURNS .+)?$/)))
        return `function ${m[1]}(${m[2]
          .split(',')
          .filter(Boolean)
          .map((p) => p.trim().split(/\s+AS\s+/)[0])
          .join(',')}) {`;
      if (line === 'ENDMETHOD') return '}';
      if ((m = line.match(/^INPUT (.+)$/))) return `${m[1]} = read();`;
      if ((m = line.match(/^OUTPUT (.+)$/))) return `write(${expr(m[1])});`;
      if ((m = line.match(/^SET (.+?) = (.+)$/))) return `${m[1]} = ${expr(m[2])};`;
      if ((m = line.match(/^IF (.+) THEN$/))) return `if (${expr(m[1])}) {`;
      if ((m = line.match(/^ELSEIF (.+) THEN$/))) return `} else if (${expr(m[1])}) {`;
      if (line === 'ELSE') return '} else {';
      if (/^(ENDIF|ENDFOR|ENDWHILE)$/.test(line)) return '}';
      if ((m = line.match(/^FOR (\w+) = (.+) TO (.+)$/)))
        return `for (${m[1]} = ${expr(m[2])}; ${m[1]} <= ${expr(m[3])}; ${m[1]}++) {`;
      if ((m = line.match(/^WHILE (.+) DO$/))) return `while (${expr(m[1])}) {`;
      if ((m = line.match(/^RETURN (.+)$/))) return `return ${expr(m[1])};`;
      if ((m = line.match(/^CALL (.+)$/))) return expr(m[1]) + ';';
      throw Error('Unsupported test notation: ' + line);
    })
    .join('\n');
  let next = 0;
  const allocate = (ds) =>
    Array.from({ length: ds[0] }, () =>
      ds.length > 1 ? allocate(ds.slice(1)) : undefined,
    );
  vm.runInNewContext(
    js,
    {
      allocate,
      read: () => {
        assert(next < input.length, 'Missing test input');
        return input[next++];
      },
      write: (...values) =>
        out.push(...values.map((v) => (Array.isArray(v) ? [...v] : v))),
    },
    { timeout: 1000 },
  );
  return out;
}
const cases = [
  [1, [20, 3], [60], [3, 12], [36]],
  [2, [18], ['Adult'], [14], ['Cold']],
  [3, [], ['0017', 75, true], [2, 3, 4], [24]],
  [4, [40, 60], [50], [20, 3], [54]],
  [5, [], [8], [], [5, 10]],
  [6, [100], ['Valid'], [500, true], [450]],
  [7, [74], ['Pass'], [16, true], ['Eligible']],
  [8, [2, 3, 4], [9], [3, 50, 49, 100], [2]],
  [
    9,
    [10, 20, -1],
    [15],
    [101, -5, 70],
    ['Enter a mark from 0 to 100', 'Enter a mark from 0 to 100', 70],
  ],
  [10, [], [1, 2, 3, 2, 4, 6], [2, 4, 6, 8], [6, 14]],
  [11, [], [15, 3], [], [-3]],
  [12, [], [0], [], ['Not found']],
  [13, [], ['Lebo', 64, 'Naledi', 81, 'Thabo', 72], [], ['Naledi', 81]],
  [14, [], [[1, 2, 4, 5]], [], [[1, 3, 2, 4]]],
  [15, ['Lebo'], ['Hello', 'Lebo'], [], ['Area', 24]],
  [16, [], ['Lebo', 68], [], [6, 5]],
  [17, [], [8, 9, 4], [], ['Revise']],
  [18, [], [60], [], [2, 4, 6, 8]],
];
assert.equal(Object.keys(content).length, 22);
for (const [number, input, expected, exerciseInput, exerciseExpected] of cases) {
  const l = content['lesson-' + number];
  for (const key of ['code', 'solution']) assert.match(flowchart(parse(l[key])), /<svg/);
  assert.deepEqual(run(l.code, input), expected, 'Worked example ' + number);
  assert.deepEqual(
    run(l.solution, exerciseInput),
    exerciseExpected,
    'Exercise ' + number,
  );
}
assert.deepEqual(run(content['lesson-9'].code, [-1]), ['No data']);
assert.deepEqual(run(content['lesson-6'].solution, [500, false]), [500]);
assert.deepEqual(run(content['lesson-7'].solution, [15, true]), ['Too young']);
assert.deepEqual(run(content['lesson-7'].solution, [16, false]), ['Approval required']);
for (const l of Object.values(content)) {
  assert(l.prompt && l.exercise);
  assert.equal(l.trace.length, 3);
  assert.equal(l.answer.length, 3);
  assert.match(l.code, /BEGIN[\s\S]+END$/);
  assert.match(l.solution, /BEGIN[\s\S]+END$/);
}
console.log(
  'Passed: 22 complete solved examples, 22 exercises, 36 executed numeric programs and boundary traces.',
);
