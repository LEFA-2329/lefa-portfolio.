import assert from 'node:assert/strict';
import {
  parse,
  flowchart,
  hierarchy,
  classDiagram,
} from '../dist/learn/js/programming-logic/pseudocode-parser-and-diagrams.mjs';
import {
  lessons,
  units,
} from '../dist/learn/js/programming-logic/content/lessons-and-quizzes.mjs';
assert.equal(lessons.length, 22);
assert.equal(units.length, 5);
for (const l of lessons) {
  assert(l.quiz.correct >= 0 && l.quiz.correct < l.quiz.options.length);
  assert(l.bug.correct >= 0 && l.bug.correct < l.bug.options.length);
  assert(l.bug.line <= l.bug.code.split('\n').length);
  if (l.diagram === 'flow') {
    const svg = flowchart(parse(l.example));
    assert(svg.startsWith('<svg'));
    assert(!/NaN|undefined/.test(svg), l.title);
  } else if (l.diagram === 'hierarchy') {
    const svg = hierarchy(parse(l.example)).svg;
    assert(!/NaN|undefined/.test(svg), l.title);
  }
}
assert.throws(() => parse('BEGIN\nIF x > 2 THEN\nOUTPUT x\nEND'), /matching/);
assert.throws(() => parse('FOR i = 1 TO 5 STEP 0\nOUTPUT i\nENDFOR'), /zero/);
assert.throws(() => parse('BEGIN\nELSEIF x THEN\nEND'), /Unexpected ELSEIF.*matching/);
assert.throws(() => parse('IF x THEN\nOUTPUT x'), /ENDIF/);
const nested = parse(
  'BEGIN\nIF x THEN\nWHILE y DO\nOUTPUT y\nENDWHILE\nELSE\nREPEAT\nINPUT y\nUNTIL y > 0\nENDIF\nEND',
);
assert(!/NaN/.test(flowchart(nested)));
const cs = parse(
  'CASE x OF\nWHEN 1:\nOUTPUT "a"\nWHEN 2:\nOUTPUT "b"\nOTHERWISE:\nOUTPUT "c"\nENDCASE',
);
assert.equal(cs.main[0].type, 'if');
assert(flowchart(cs).includes('x = 2'));
const f = parse(
  'FUNCTION add(a, b) RETURNS REAL\nRETURN a + b\nENDFUNCTION\nBEGIN\nSET x = add(1,2)\nEND',
);
assert(hierarchy(f).svg.includes('add'));
assert.match(flowchart(f, 'add'), /RETURN a \+ b/);
const h = hierarchy(
  parse('PROCEDURE a()\nCALL a()\nENDPROCEDURE\nCALL a()\nCALL missing()'),
);
assert.deepEqual(h.missing, ['missing']);
assert(!/NaN/.test(h.svg));
assert(flowchart(parse('OUTPUT "<script>alert(1)</script>"')).includes('&lt;script&gt;'));
assert(classDiagram().includes('Learner'));
console.log(
  'PASS: 22 lesson datasets, every supported lesson chart, nested control flow, CASE, method relationships, recursion, malformed code and SVG text escaping.',
);
