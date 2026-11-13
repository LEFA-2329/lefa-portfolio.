import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';
import {
  intermediateUnits as units,
  intermediateLessons as lessons,
} from '../dist/learn/js/database/content/intermediate-data.mjs';
import { dbLessons } from '../dist/learn/js/database/content/database-data.mjs';
import { datasets, sqlExamples } from '../dist/learn/js/database/sql/sql-data.mjs';
import { exercises } from '../dist/learn/js/database/sql/sql-ui.mjs';
import { executeBatch } from '../dist/learn/js/database/sql/sql-core.mjs';
assert.deepEqual(
  units.map((u) => u.outcomes.length),
  [10, 14, 12, 9, 9, 13, 12, 15, 12],
);
assert.equal(lessons.length, 27);
assert.equal(new Set(lessons.map((l) => l.id)).size, 27);
for (const u of units) assert.equal(lessons.filter((l) => l.unit === u.id).length, 3);
for (const l of lessons) {
  assert(l.sections[0].text.length > 200);
  assert.equal(l.tasks.length, 3);
  assert(l.sampleCode.length > 50);
  for (const q of l.quizzes) {
    assert(q.options[q.answer]);
    assert(q.explanation.length > 30);
  }
  assert(
    existsSync(
      new URL('../dist/learn/downloads/intermediate/' + l.download, import.meta.url),
    ),
  );
}
for (const l of dbLessons) assert.equal(l.tasks.length, 4);
assert.equal(sqlExamples.length, 37);
assert.equal(exercises.length, 32);
const init = createRequire(import.meta.url)('../dist/learn/vendor/sqljs/sql-wasm.js');
const SQL = await init({
  locateFile: () =>
    fileURLToPath(new URL('../dist/learn/vendor/sqljs/sql-wasm.wasm', import.meta.url)),
});
let runs = 0;
for (const mode of ['sqlserver', 'postgresql', 'mysql']) {
  for (const l of lessons) {
    for (const x of [
      { code: l.sampleCode, environment: l.environment },
      ...(l.moreExamples || []),
    ]) {
      if (x.environment !== 'browser') continue;
      const db = new SQL.Database();
      db.run('PRAGMA foreign_keys=ON');
      db.run(datasets.college.sql);
      executeBatch(db, x.code, mode);
      db.close();
      runs++;
    }
  }
}
const db = new SQL.Database();
db.run(datasets.college.sql);
executeBatch(db, 'CREATE INDEX IX_Test ON Students(City)', 'sqlserver');
assert.throws(
  () => executeBatch(db, 'DROP INDEX IX_Test ON Courses', 'sqlserver'),
  /another table/,
);
executeBatch(db, 'DROP INDEX IX_Test ON dbo.Students', 'sqlserver');
assert.equal(db.exec("SELECT name FROM sqlite_master WHERE name='IX_Test'").length, 0);
assert.throws(
  () =>
    executeBatch(
      db,
      'UPDATE Students SET Age=20 OUTPUT inserted.Age WHERE StudentID=1',
      'sqlserver',
    ),
  /SSMS/,
);
assert.throws(() => executeBatch(db, 'SELECT 1\nGO\nSELECT 2', 'sqlserver'), /SSMS/);
assert.throws(() => executeBatch(db, 'SELECT @n', 'sqlserver'), /SSMS/);
// Rejecting a later statement must not retain an earlier data change.
const age = db.exec('SELECT Age FROM Students WHERE StudentID=1')[0].values[0][0];
assert.throws(() =>
  executeBatch(
    db,
    'UPDATE Students SET Age=99 WHERE StudentID=1; DROP INDEX IX_Unknown ON dbo.Students',
    'sqlserver',
  ),
);
assert.equal(db.exec('SELECT Age FROM Students WHERE StudentID=1')[0].values[0][0], age);
db.close();
const workflow = readFileSync(
  new URL('../.github/workflows/deploy-pages.yml', import.meta.url),
  'utf8',
);
assert(workflow.includes('node --test tests/*.test.mjs'));
console.log(
  `Passed: 9 units/106 outcomes, 27 intermediate lessons, task banks, 37 SQL examples/32 challenges, ${runs} portable lesson example runs, download files, qualified DROP INDEX, table validation and native T-SQL guidance.`,
);
