import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../dist/learn/', import.meta.url));
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(path.join(dir, entry.name))
      : [path.join(dir, entry.name)],
  );
}
const modules = [
  path.join(root, 'studylab-start.mjs'),
  ...files(path.join(root, 'js')).filter((p) => /\.(mjs|js)$/.test(p)),
];
let imports = 0;
for (const file of modules) {
  const code = readFileSync(file, 'utf8');
  const patterns = [
    /\bfrom\s*['"](\.[^'"\n]+)['"]/g,
    /\bimport\s*(?:\(\s*)?['"](\.[^'"\n]+)['"]/g,
    /\bimportScripts\(\s*['"](\.[^'"\n]+)['"]/g,
    /new URL\(\s*['"](\.[^'"\n]+)['"]/g,
  ];
  for (const regex of patterns)
    for (const match of code.matchAll(regex)) {
      const relative = match[1].split('?')[0];
      assert(
        existsSync(path.resolve(path.dirname(file), relative)),
        file + ': missing ' + relative,
      );
      imports++;
    }
}
assert(imports > 80);
assert.equal(modules.length, 42);
const master = readFileSync(path.join(root, 'styles.css'), 'utf8');
const styles = [...master.matchAll(/@import url\(['"](.+?)['"]\)/g)].map(
  (m) => m[1].split('?')[0],
);
assert.deepEqual(styles, [
  './css/page-layout.css',
  './css/programming-lessons.css',
  './css/shared-components.css',
  './css/theme-colours.css',
  './css/database-pages.css',
  './css/normalisation.css',
  './css/learning-progress.css',
  './css/normalisation-builder.css',
  './css/quizzes.css',
  './css/student-settings.css',
]);
for (const file of styles) assert(existsSync(path.join(root, file)));
assert(existsSync(path.join(root, 'vendor/sqljs/sql-wasm.wasm')));
assert(
  readFileSync(path.join(root, 'index.html'), 'utf8').includes(
    './studylab-start.mjs?v=studylab-37',
  ),
);
console.log(
  `Passed: ${modules.length} application modules, ${imports} local module/worker imports, stable entry point, vendor assets and ten ordered CSS imports.`,
);
