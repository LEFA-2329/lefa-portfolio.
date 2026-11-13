import assert from 'node:assert/strict';
import {
  normalisationQuestions,
  normalisationSolution,
  cleanNormalisationWork,
} from '../dist/learn/js/database/normalisation/normalisation-practice.mjs';
import { readFileSync } from 'node:fs';
import {
  normalisationExamples,
  dependencyDiagram,
  stageHTML,
  normalisationWalkthrough,
} from '../dist/learn/js/database/normalisation/normalisation.mjs';
const project = (data, attributes) => [
  ...new Map(
    data.map((row) => {
      const item = Object.fromEntries(attributes.map((a) => [a, row[a]]));
      return [JSON.stringify(item), item];
    }),
  ).values(),
];
const naturalJoin = (left, right) =>
  left.flatMap((a) =>
    right
      .filter((b) =>
        Object.keys(a)
          .filter((k) => k in b)
          .every((k) => a[k] === b[k]),
      )
      .map((b) => ({ ...a, ...b })),
  );
for (const [id, example] of Object.entries(normalisationExamples)) {
  for (const [n, stage] of Object.entries(example.stages)) {
    const tables = stage.tables;
    assert(tables.length);
    for (const t of tables) {
      assert(t.key.length && t.key.every((a) => t.attributes.includes(a)));
      const rows = project(example.data, t.attributes);
      assert.equal(
        new Set(rows.map((r) => JSON.stringify(t.key.map((a) => r[a])))).size,
        rows.length,
        'Keys must identify projected rows',
      );
      for (const d of t.dependencies) {
        assert(d.from.every((a) => t.attributes.includes(a)));
        assert(d.to.every((a) => t.attributes.includes(a)));
        const seen = new Map();
        for (const r of rows) {
          const key = JSON.stringify(d.from.map((a) => r[a])),
            value = JSON.stringify(d.to.map((a) => r[a]));
          if (seen.has(key)) assert.equal(seen.get(key), value);
          seen.set(key, value);
        }
        if (Number(n) >= 2) assert.notEqual(d.kind, 'partial');
        if (Number(n) === 3) assert.notEqual(d.kind, 'transitive');
      }
      for (const [attribute, target] of Object.entries(t.foreign)) {
        assert(t.attributes.includes(attribute));
        const [parent, key] = target.split('.');
        const referenced = tables.find((x) => x.name === parent);
        assert(referenced?.key.includes(key));
        for (const r of rows)
          assert(
            project(example.data, referenced.attributes).some(
              (p) => p[key] === r[attribute],
            ),
          );
      }
      const svg = dependencyDiagram(t, `test-${id}-${n}-${t.name}`);
      assert(svg.includes('role="img"'));
      assert(svg.includes('aria-label='));
      assert(svg.includes('text-decoration="underline"'));
      assert(!svg.includes('undefined'));
      assert(!svg.includes('NaN'));
    }
    const reconstructed = tables
      .map((t) => project(example.data, t.attributes))
      .reduce(naturalJoin);
    const attrs = Object.keys(example.data[0]);
    assert.deepEqual(
      project(reconstructed, attrs).map(JSON.stringify).sort(),
      project(example.data, attrs).map(JSON.stringify).sort(),
      'Decomposed sample must rejoin without missing or spurious rows',
    );
    const html = stageHTML(id, Number(n));
    assert(html.includes(n + 'NF result'));
    assert(html.includes('Dependencies in the current'));
    assert(html.includes('Inspect sample rows'));
  }
}
// Test dependencies against declared keys, not just their illustrative sample rows.
const closure = (attrs, deps) => {
  const result = new Set(attrs);
  let size;
  do {
    size = result.size;
    for (const d of deps)
      if (d.from.every((a) => result.has(a))) for (const a of d.to) result.add(a);
  } while (size !== result.size);
  return result;
};
assert.equal(Object.keys(normalisationExamples).length, 9);
for (const [id, x] of Object.entries(normalisationExamples)) {
  const initial = x.stages[1].tables[0];
  assert.equal(
    closure(initial.key, initial.dependencies).size,
    initial.attributes.length,
  );
  for (const keyPart of initial.key)
    assert(
      closure(
        initial.key.filter((a) => a !== keyPart),
        initial.dependencies,
      ).size < initial.attributes.length,
      'Declared key must be minimal',
    );
  for (const [stage, model] of Object.entries(x.stages))
    for (const t of model.tables) {
      assert.equal(closure(t.key, t.dependencies).size, t.attributes.length);
      if (Number(stage) >= 2)
        for (let mask = 0; mask < (1 << t.key.length) - 1; mask++) {
          const subset = t.key.filter((_, i) => mask & (1 << i)),
            determined = closure(subset, t.dependencies);
          assert(
            !t.attributes.some((a) => !t.key.includes(a) && determined.has(a)),
            '2NF tables must not retain dependencies on a proper key subset',
          );
        }
      for (const d of t.dependencies) {
        if (Number(stage) === 3)
          assert.equal(
            closure(d.from, t.dependencies).size,
            t.attributes.length,
            'Every final determinant must be a superkey for these cases',
          );
        if (d.kind === 'partial')
          assert(d.from.length < t.key.length && d.from.every((a) => t.key.includes(a)));
        if (d.kind === 'transitive') assert(d.from.some((a) => !t.key.includes(a)));
      }
    }
  assert(normalisationSolution(id).includes('Final ERD relationships'));
  assert(normalisationSolution(id).includes('3NF diagrams and schemas'));
}
assert.equal(normalisationQuestions.length, 6);
assert.equal(
  normalisationQuestions.reduce((n, q) => n + q.marks, 0),
  20,
);
assert.deepEqual(cleanNormalisationWork({ draft: 4, attempted: 'yes', revealed: true }), {
  draft: '',
  attempted: false,
  revealed: false,
});
assert.equal(cleanNormalisationWork({ draft: 'a'.repeat(30000) }).draft.length, 20000);
assert.equal(normalisationExamples.orders.stages[1].tables.length, 1);
assert.equal(normalisationExamples.orders.stages[2].tables.length, 3);
assert.equal(normalisationExamples.orders.stages[3].tables.length, 4);
assert.equal(
  normalisationExamples.employees.stages[1].tables.length,
  normalisationExamples.employees.stages[2].tables.length,
);
assert(normalisationWalkthrough().includes('id="nf-example"'));
for (const name of ['js/app.mjs', 'js/database/database-ui.mjs']) {
  const source = readFileSync(new URL('../dist/learn/' + name, import.meta.url), 'utf8');
  assert(!source.includes('<span aria-hidden="true">→</span>'));
  assert(!source.includes('<span>→</span>'));
  assert(!source.includes('← Previous lesson'));
  assert(!source.includes('Next lesson →'));
}
console.log(
  'Passed: nine scenarios/27 normal-form stages and 54 questions, determinant closure/key minimality/3NF checks, dependency validity, composite keys, foreign-key preservation, lossless sample reconstruction, SVG labels and decorative-arrow removal.',
);
