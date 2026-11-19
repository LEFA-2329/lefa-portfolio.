import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { lessons } from '../dist/learn/js/programming-logic/content/lessons-and-quizzes.mjs';
import { createRunner } from '../dist/learn/js/programming-logic/pseudocode-interpreter.mjs';
const data = (name) =>
  JSON.parse(
    readFileSync(
      new URL('../scripts/study-packs/prld5121/' + name + '.json', import.meta.url),
      'utf8',
    ),
  );
function run(source, inputs = []) {
  const r = createRunner(source);
  let at = 0;
  for (let i = 0; i < 2000; i++) {
    let state = r.step();
    if (state.kind === 'input') {
      assert.ok(at < inputs.length, 'Missing input');
      state = r.step(inputs[at++]);
    }
    assert.notEqual(state.kind, 'error', state.note);
    if (state.kind === 'done') return state.output;
  }
  throw Error('Run did not terminate');
}
test('PRLD study route maps every current lesson to independent practice', () => {
  const q = data('additional-practice');
  assert.deepEqual(
    q.map((x) => x.lesson),
    lessons.map((_, i) => i + 1),
  );
  const html = readFileSync(
    new URL('../dist/learn/prld5121/index.html', import.meta.url),
    'utf8',
  );
  for (const l of lessons) {
    assert.ok(html.includes(`id="${l.id}"`));
    assert.ok(html.includes('#lesson/' + l.id));
  }
  for (const x of q) {
    assert.equal(x.rubric.length, 5);
    assert.ok(x.answer.length > 100);
  }
});
test('PRLD extension examples execute with expected outputs including edge cases', () => {
  const [menu, matrix, project] = data('extra-topics');
  assert.deepEqual(run(menu.example, ['1']), ['500']);
  assert.deepEqual(run(menu.example, ['3']), ['Unknown choice']);
  assert.deepEqual(run(matrix.example), ['0, 180', '1, 180']);
  assert.deepEqual(
    run(project.example, ['Ada', '50', 'Bo', '49', 'Cy', '75']).slice(-3),
    ['Average, 58', 'Passed, 2', 'Top, Cy, 75'],
  );
  assert.deepEqual(
    run(project.example, ['Ada', '-1', '101', '0', 'Bo', '0', 'Cy', '0']).slice(-3),
    ['Average, 0', 'Passed, 0', 'Top, Ada, 0'],
  );
});
test('both PRLD practice papers have consistent 100 mark rubrics', () => {
  const papers = data('revision-papers');
  assert.equal(papers.length, 2);
  for (const p of papers) {
    assert.equal(p.questions.length, 5);
    assert.equal(
      p.questions.reduce((s, q) => s + q.marks, 0),
      100,
    );
    for (const q of p.questions)
      assert.equal(
        q.criteria.reduce((s, c) => s + c[1], 0),
        q.marks,
      );
  }
});
