import { additionalFixtures } from './five-extra-demo-databases.mjs?v=36';
import { executeBatch } from './sql-statement-execution.mjs?v=36';
import { datasets } from './demo-databases-and-examples.mjs?v=36';
import { exercises } from './sql-practice-challenges.mjs?v=36';
const fixtures = {
  ...additionalFixtures,
  college: `INSERT INTO Students VALUES(99,'Lerato Test','Polokwane',24),(100,'Lindi Test','New City',20);
INSERT INTO Courses VALUES(99,'Practice Course',2000),(100,'Empty Course',100);
INSERT INTO Enrolments VALUES(99,100,99,NULL),(100,100,1,80);`,
  shop: `INSERT INTO Categories VALUES(99,'Empty category');
INSERT INTO Books VALUES(99,'Unsold Practice Book',1,250,8);
INSERT INTO Sales VALUES(99,1,3,'2026-11-01');`,
};
const schemaTables = {
  create: ['PracticeNotes'],
  'expanded-default-demo': ['PracticeFlags'],
  'expanded-alter-demo': ['PracticeRooms'],
  'expanded-foreign-demo': ['PracticeParents', 'PracticeChildren'],
};
const sameValue = (a, b) =>
  typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) <= 1e-7 : a === b;
const sameRow = (a, b) => a.length === b.length && a.every((v, i) => sameValue(v, b[i]));
function sameBag(a, b) {
  if (a.length !== b.length) return false;
  const remaining = b.slice();
  for (const row of a) {
    const i = remaining.findIndex((other) => sameRow(row, other));
    if (i < 0) return false;
    remaining.splice(i, 1);
  }
  return true;
}
export function compareResults(actual, expected, { ordered = false, alias = null } = {}) {
  if (!actual || !actual.columns?.length)
    return {
      status: 'incorrect',
      message:
        'Return a result table with SELECT as the final query. Data changes alone do not answer this task.',
    };
  if (actual.truncated)
    return {
      status: 'incorrect',
      message:
        'The result exceeds the 500-row display limit. Check your join conditions and filters before marking.',
    };
  if (actual.columns.length !== expected.columns.length)
    return {
      status: 'incorrect',
      message: `Return ${expected.columns.length} column(s), in this order: ${expected.columns.join(', ')}. Your query returned ${actual.columns.length}. Column aliases may differ unless the task explicitly names one.`,
    };
  if (alias && !actual.columns.some((c) => c.toLowerCase() === alias.toLowerCase()))
    return {
      status: 'incorrect',
      message: `This task explicitly asks for the column alias ${alias}. Add it using AS.`,
    };
  if (actual.values.length !== expected.values.length)
    return {
      status: 'incorrect',
      message: `Expected ${expected.values.length} row(s); your query returned ${actual.values.length}. Check filtering, joins, grouping and duplicates.`,
    };
  if (!sameBag(actual.values, expected.values))
    return {
      status: 'incorrect',
      message:
        'The row count matches, but some values or duplicate counts differ. Check selected columns, NULL handling, calculations and join keys.',
    };
  if (ordered && !actual.values.every((row, i) => sameRow(row, expected.values[i])))
    return {
      status: 'incorrect',
      message:
        'The values match, but the row order differs. Use the requested ORDER BY columns and direction, including tie-breakers.',
    };
  return { status: 'correct', message: 'Columns and row values match.' };
}
const finalTable = (results) => results.filter((r) => r.columns.length).at(-1);
const typeName = (s) => s.toUpperCase().replace(/\s/g, '').replace(/^INT$/, 'INTEGER');
function shape(db, name) {
  const quote = '"' + name.replaceAll('"', '""') + '"';
  const rows = db.exec('PRAGMA table_info(' + quote + ')')[0]?.values;
  if (!rows) return null;
  return {
    columns: rows.map((r) => [
      r[1].toLowerCase(),
      typeName(r[2]),
      r[5] ? 1 : r[3],
      r[4]?.replace(/^\((.*)\)$/, '$1'),
      r[5],
    ]),
    foreign:
      db
        .exec('PRAGMA foreign_key_list(' + quote + ')')[0]
        ?.values.map((r) => r.slice(2)) || [],
  };
}
export function gradeChallenge(SQL, taskId, code, mode) {
  const task = exercises.find((t) => t.id === taskId);
  if (!task) throw Error('Choose a valid SQL challenge first.');
  if (typeof code !== 'string' || !code.trim())
    return { status: 'incorrect', message: 'Write your SQL answer before checking it.' };
  for (let test = 0; test < 2; test++) {
    const reference = new SQL.Database(),
      student = new SQL.Database();
    try {
      for (const db of [reference, student]) {
        db.run('PRAGMA foreign_keys=ON; PRAGMA max_page_count=8192;');
        db.run(datasets[task.dataset].sql);
        if (test) db.run(fixtures[task.dataset]);
      }
      const expected = finalTable(executeBatch(reference, task.answer, mode));
      let actual;
      try {
        actual = finalTable(executeBatch(student, code, mode));
      } catch (error) {
        return {
          status: 'error',
          message: `${test ? 'Additional-data test' : 'Demo-data test'}: ${error.message} Fix the SQL and check again.`,
        };
      }
      const report = compareResults(actual, expected, {
        ordered: /sort|order/i.test(task.prompt),
        alias: task.id === 'marks' ? 'Unmarked' : null,
      });
      if (report.status !== 'correct')
        return {
          ...report,
          message:
            (test
              ? 'The answer matches the original demo but fails additional data containing unmatched rows, extra values or NULLs. '
              : '') + report.message,
        };
      for (const table of schemaTables[task.id] || []) {
        if (
          JSON.stringify(shape(student, table)) !==
          JSON.stringify(shape(reference, table))
        )
          return {
            status: 'incorrect',
            message: `Check the ${table} table definition: column names, types, primary key, nullability, default and foreign-key actions must match the task. Returning matching values without creating the required structure is insufficient.`,
          };
      }
    } finally {
      reference.close();
      student.close();
    }
  }
  return {
    status: 'correct',
    message:
      'Correct on both the original demo and an additional-data test. Required values, duplicates, requested ordering and any table-definition checks matched. This is practice feedback, not proof for every possible dataset.',
  };
}
