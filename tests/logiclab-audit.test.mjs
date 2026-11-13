import assert from 'node:assert/strict';
import { parse, hierarchy, flowchart } from '../dist/learn/js/prld/engine.mjs';
import { createRunner } from '../dist/learn/js/prld/runner.mjs';
function run(code) {
  const r = createRunner(code);
  for (let i = 0; i < 100; i++) {
    const s = r.step();
    if (s.kind === 'done') return s.output;
  }
  throw Error('Did not finish');
}
const path = String.raw`BEGIN
DECLARE path AS STRING
SET path = "C:\\" // A path ending in a backslash
OUTPUT path
OUTPUT "https://example.org" // URL text is not a comment
OUTPUT "She said \\" // Even backslash pair closes the string
END`;
assert.deepEqual(run(path), ['C:\\', 'https://example.org', 'She said \\']);
assert(!flowchart(parse(path)).includes('A path ending'));
assert.deepEqual(
  run(String.raw`BEGIN
OUTPUT "A quote: \" // still text" // real comment
END`),
  ['A quote: " // still text'],
);
const definitions = `METHOD Valid(value AS NUM) RETURNS BOOLEAN
 RETURN value > 0
ENDMETHOD
METHOD Bound() RETURNS NUM
 RETURN 2
ENDMETHOD
METHOD Sink(value AS NUM)
 OUTPUT value
ENDMETHOD`;
const chart = (code) => hierarchy(parse(definitions + '\nBEGIN\n' + code + '\nEND'));
const edges = (c) => (c.svg.match(/marker-end="url\(#arrow\)"/g) || []).length;
assert.equal(edges(chart('OUTPUT "Valid(3) and Bound() are just text"')), 0);
assert.equal(edges(chart('IF Valid(3) THEN\n OUTPUT "yes"\nENDIF')), 1);
assert.equal(edges(chart('WHILE Valid(3) DO\n OUTPUT "yes"\nENDWHILE')), 1);
assert.equal(edges(chart('REPEAT\n OUTPUT "yes"\nUNTIL Valid(3)')), 1);
assert.equal(edges(chart('FOR i = Bound() TO Bound()\n OUTPUT i\nENDFOR')), 1);
assert.equal(edges(chart('CALL Sink(Bound())')), 2);
assert.deepEqual(chart('CALL Missing()').missing, ['Missing']);
assert.equal(edges(chart('IF Valid(Bound()) THEN\n CALL Sink(Bound())\nENDIF')), 3);
console.log(
  'Passed: escaped string endings, real comments vs quoted text, hierarchy calls in conditions, loop bounds and nested arguments.',
);
