import test from 'node:test';
import assert from 'node:assert/strict';
import { guidedTraceData } from '../dist/learn/js/programming-logic/content/guided-trace-examples.mjs';
import { diagramExamples } from '../dist/learn/js/programming-logic/content/diagram-examples.mjs';
import {
  parse,
  flowchart,
  hierarchy,
} from '../dist/learn/js/programming-logic/pseudocode-parser-and-diagrams.mjs';

test('guided traces retain the teaching outcomes and independent restart state', () => {
  assert.equal(guidedTraceData('sum').states.at(-1).output, '6');
  assert.equal(guidedTraceData('search').states.at(-1).output, '2');
  const sorted = guidedTraceData('sort').states.at(-1).array;
  assert.deepEqual(
    sorted,
    [...sorted].sort((a, b) => a - b),
  );
  const first = guidedTraceData('sum');
  first.states[0].vars.total = 999;
  assert.equal(guidedTraceData('sum').states[0].vars.total, 0);
});

test('every editable diagram example still generates its intended diagram', () => {
  for (const [name, code] of Object.entries(diagramExamples)) {
    const ast = parse(code);
    const svg = name === 'Module hierarchy' ? hierarchy(ast).svg : flowchart(ast);
    assert.match(svg, /<svg\b/, name);
    assert.ok(!svg.includes('<script'), name);
  }
});

// Both lesson and task controllers use this renderer for student-visible code.
import { codeBlock } from '../dist/learn/js/shared/render-code-block.mjs';
test('shared code markup escapes input in plain and numbered displays', () => {
  const input = '<img src=x onerror=alert(1)>\n<script>alert(1)</script>';
  for (const numbered of [false, true]) {
    const result = codeBlock(input, numbered);
    assert.ok(!result.includes('<img'));
    assert.ok(!result.includes('<script'));
    assert.ok(result.includes('&lt;img'));
    if (numbered) assert.equal((result.match(/class="ln"/g) || []).length, 2);
  }
});
