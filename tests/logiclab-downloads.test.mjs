import assert from 'node:assert/strict';
import fs from 'node:fs';
import { taskBank } from '../dist/learn/js/prld/content/tasks.mjs';
import { parse, flowchart } from '../dist/learn/js/prld/engine.mjs';
assert.equal(taskBank.filter((t) => t.topic === 'Arrays').length, 6);
assert.equal(taskBank.filter((t) => t.topic === 'IF / ELSE').length, 6);
assert.equal(taskBank.filter((t) => t.topic === 'SWITCH / CASE').length, 6);
for (const task of taskBank.filter((t) =>
  ['Arrays', 'IF / ELSE', 'SWITCH / CASE'].includes(t.topic),
))
  assert.match(flowchart(parse(task.solution)), /<svg/);
for (const mode of ['questions', 'answers', 'questions-and-answers'])
  for (const ext of ['pdf', 'docx']) {
    const bytes = fs.readFileSync(
      new URL('../dist/learn/downloads/logiclab-' + mode + '.' + ext, import.meta.url),
    );
    assert(bytes.length > 1000);
    assert.equal(
      bytes.subarray(0, ext === 'pdf' ? 4 : 2).toString(),
      ext === 'pdf' ? '%PDF' : 'PK',
    );
  }
const manifest = JSON.parse(
  fs.readFileSync(
    new URL('../dist/learn/downloads/slides-manifest.json', import.meta.url),
  ),
);
assert.equal(manifest.length, 5);
for (const m of manifest) {
  assert(m.slides >= 25);
  assert(
    fs.statSync(new URL('../dist/learn/downloads/' + m.file, import.meta.url)).size >
      1000,
  );
}
console.log(
  'Passed: 18 new topic tasks, SWITCH parsing, six study packs and five unit decks.',
);
