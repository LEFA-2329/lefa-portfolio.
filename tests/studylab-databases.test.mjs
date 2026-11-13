import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dbUnits, dbLessons } from '../dist/learn/js/database/content/database-data.mjs';
import {
  datasets,
  dialects,
  sqlExamples,
  setupScript,
} from '../dist/learn/js/database/sql/sql-data.mjs';
import {
  statements,
  adaptStatement,
  executeBatch,
} from '../dist/learn/js/database/sql/sql-core.mjs';
import { exercises } from '../dist/learn/js/database/sql/sql-ui.mjs';
const require = createRequire(import.meta.url),
  init = require('../dist/learn/vendor/sqljs/sql-wasm.js');
const SQL = await init({
  locateFile: () =>
    fileURLToPath(new URL('../dist/learn/vendor/sqljs/sql-wasm.wasm', import.meta.url)),
});
const fresh = (name = 'college') => {
  const db = new SQL.Database();
  db.run('PRAGMA foreign_keys=ON');
  db.run(datasets[name].sql);
  return db;
};
const scalar = (db, sql) => db.exec(sql)[0].values[0][0];
assert.equal(dbUnits.length, 6);
assert.equal(dbLessons.length, 18);
assert.equal(new Set(dbLessons.map((l) => l.id)).size, 18);
assert.deepEqual(
  dbUnits.map((u) => u.outcomes.length),
  [7, 8, 6, 7, 4, 6],
);
for (const u of dbUnits) {
  assert(u.overview.length > 100);
  assert(dbLessons.some((l) => l.unit === u.id));
}
for (const l of dbLessons) {
  assert(l.sections.length >= 3);
  assert(l.sections.every((s) => s.text.length > 100));
  assert(l.example.solution.length > 100);
  assert(l.task.solution.length > 100);
  assert.equal(l.quizzes.length, 2);
  for (const q of l.quizzes) assert(q.options[q.answer]);
}
let runs = 0;
for (const mode of Object.keys(dialects)) {
  for (const ex of sqlExamples) {
    const db = fresh(ex.dataset);
    const code = typeof ex.code === 'function' ? ex.code(mode) : ex.code;
    const result = executeBatch(db, code, mode);
    assert(result.length > 0, ex.id);
    if (ex.id === 'top') assert.equal(result[0].values.length, 5);
    if (ex.id === 'aggregate')
      assert.deepEqual(result[0].values[0], [4, 5650, 1412.5, 1200, 1600]);
    if (ex.id === 'null') assert.deepEqual(result[0].values[0].slice(0, 2), [40, 37]);
    if (ex.id === 'join') assert.equal(result[0].values.length, 40);
    db.close();
    runs++;
  }
  for (const name of Object.keys(datasets)) {
    const db = new SQL.Database();
    db.run(setupScript(name, mode));
    assert(scalar(db, "SELECT count(*) FROM sqlite_master WHERE type='table'") >= 3);
    db.close();
  }
}
for (const task of exercises) {
  for (const mode of Object.keys(dialects)) {
    const db = fresh(task.dataset);
    const results = executeBatch(db, task.answer, mode);
    assert(
      task.id === 'expanded-unsold'
        ? results.at(-1).values.length === 0
        : results.at(-1).values.length > 0,
    );
    if (task.id === 'city')
      assert.deepEqual(results[0].values, [
        ['David', 21],
        ['Grace', 25],
        ['John', 26],
        ['Lebo', 18],
        ['Maria', 22],
      ]);
    if (task.id === 'stock')
      assert.deepEqual(results[0].values, [
        ['City Lights', 240],
        ['Local Histories', 240],
        ['The Journey', 205],
        ['Numbers Around Us', 205],
      ]);
    if (task.id === 'marks') assert.equal(results[0].values[0][0], 3);
    db.close();
  }
}
const db = fresh();
assert.throws(
  () =>
    executeBatch(
      db,
      "INSERT INTO Students VALUES (21,'Test','Nowhere',20); SELECT NotAColumn FROM Students;",
      'postgresql',
    ),
  /Statement 2/,
);
assert.equal(scalar(db, 'SELECT COUNT(*) FROM Students'), 20);
assert.throws(
  () => executeBatch(db, 'INSERT INTO Enrolments VALUES (999,999,1,50)', 'mysql'),
  /FOREIGN KEY/,
);
assert.throws(
  () => executeBatch(db, 'INSERT INTO Enrolments VALUES (999,1,3,150)', 'mysql'),
  /CHECK/,
);
assert.throws(
  () =>
    executeBatch(db, "INSERT INTO Students VALUES (1,'Duplicate','Here',20)", 'mysql'),
  /UNIQUE/,
);
assert.deepEqual(
  executeBatch(
    db,
    "SELECT 'TOP (2); -- still text' AS Label; -- TOP (9)\nSELECT COUNT(*) AS N FROM Students;",
    'sqlserver',
  )[0].values,
  [['TOP (2); -- still text']],
);
assert.equal(statements("SELECT 'O''Brien;'; /* semicolon ; */ SELECT 1;").length, 2);
assert.throws(() => statements("SELECT 'unfinished"), /Close/);
assert.throws(
  () => executeBatch(db, 'SELECT * FROM Students LIMIT 5', 'sqlserver'),
  /TOP/,
);
assert.throws(
  () => executeBatch(db, 'SELECT TOP (5) * FROM Students', 'postgresql'),
  /LIMIT/,
);
assert.throws(
  () => executeBatch(db, 'SELECT TOP (5) PERCENT * FROM Students', 'sqlserver'),
  /PERCENT/,
);
assert.throws(
  () =>
    executeBatch(db, 'CREATE TABLE X (ID INT IDENTITY(1,1) PRIMARY KEY)', 'sqlserver'),
  /outside/,
);
assert.throws(() => executeBatch(db, "ATTACH DATABASE 'x' AS x", 'mysql'), /supports/);
assert.throws(() => executeBatch(db, 'BEGIN TRANSACTION', 'sqlserver'), /supports/);
assert.equal(
  adaptStatement('SELECT TOP (2) * FROM dbo.Students', 'sqlserver').sql.trim(),
  'SELECT  * FROM Students\nLIMIT 2',
);
const long = executeBatch(
  db,
  'WITH RECURSIVE Numbers(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM Numbers WHERE n < 1000) SELECT n FROM Numbers;',
  'postgresql',
)[0];
assert.equal(long.values.length, 500);
assert(long.truncated);
db.close();
console.log(
  `Passed: six units/38 outcomes, 18 lessons/36 quizzes, ${runs} executable examples, ${exercises.length * 3} challenge runs, native setup scripts, keys/constraints, batch rollback, dialect boundaries, literal preservation and result limits.`,
);
