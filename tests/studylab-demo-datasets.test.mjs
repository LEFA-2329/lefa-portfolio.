import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import {
  datasets,
  setupScript,
  dialects,
} from '../dist/learn/js/database/sql/sql-data.mjs';
import {
  additionalDatasets,
  additionalExercises,
} from '../dist/learn/js/database/sql/sql-demo-datasets.mjs';
import { gradeChallenge } from '../dist/learn/js/database/sql/sql-grading.mjs';
const init = createRequire(import.meta.url)('../dist/learn/vendor/sqljs/sql-wasm.js');
const SQL = await init({
  locateFile: () =>
    fileURLToPath(new URL('../dist/learn/vendor/sqljs/sql-wasm.wasm', import.meta.url)),
});
assert.equal(Object.keys(datasets).length, 7);
assert.equal(Object.keys(additionalDatasets).length, 5);
for (const [key, dataset] of Object.entries(additionalDatasets)) {
  for (const dialect of Object.keys(dialects)) {
    const db = new SQL.Database();
    try {
      db.run('PRAGMA foreign_keys=ON');
      db.run(setupScript(key, dialect));
      assert.equal(db.exec('PRAGMA foreign_key_check').length, 0);
      for (const [table, count] of Object.entries(dataset.rowCounts))
        assert.equal(db.exec(`SELECT COUNT(*) FROM ${table}`)[0].values[0][0], count);
      assert.equal(Object.keys(dataset.tables).length, 3);
    } finally {
      db.close();
    }
  }
  const task = additionalExercises.find(
    (t) => t.dataset === key && t.id.endsWith('-absent'),
  );
  const db = new SQL.Database();
  db.run(dataset.sql);
  const result = db.exec(task.answer)[0];
  const literal = result.values
    .map(
      (row) =>
        'SELECT ' +
        row
          .map((v) =>
            typeof v === 'number' ? String(v) : "'" + v.replaceAll("'", "''") + "'",
          )
          .join(', '),
    )
    .join(' UNION ALL ');
  db.close();
  assert.equal(
    gradeChallenge(SQL, task.id, literal, 'sqlserver').status,
    'incorrect',
    key + ': hardcoded initial rows must fail fixture',
  );
}
const db = new SQL.Database();
db.run('PRAGMA foreign_keys=ON');
db.run(datasets.library.sql);
assert.throws(() => db.run("INSERT INTO Loans VALUES(100,999,1,'2026-12-01',NULL)"));
assert.throws(() => db.run("INSERT INTO Members VALUES(1,'Duplicate','City')"));
db.close();
console.log(
  'Passed: five relational demos, row counts, 15 setup/dialect combinations, FK and key enforcement, and hardcoded-answer rejection on new challenge fixtures.',
);
