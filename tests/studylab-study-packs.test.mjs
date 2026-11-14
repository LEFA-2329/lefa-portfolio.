import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const folder = new URL('../dist/learn/downloads/study-packs/', import.meta.url);
test('public study pack area contains only the sample and matching practice datasets', () => {
  assert.deepEqual(readdirSync(folder).sort(), [
    'database-revision-free-sample.pdf',
    'revision-practice-sqlite.sql',
    'revision-practice-sqlserver.sql',
  ]);
  assert.equal(
    readFileSync(new URL('database-revision-free-sample.pdf', folder))
      .subarray(0, 5)
      .toString(),
    '%PDF-',
  );
  const page = readFileSync(
    new URL('../dist/learn/study-packs/index.html', import.meta.url),
    'utf8',
  );
  assert.match(page, /Not yet for sale/);
  assert.ok(!/checkout|buy now|purchase button/i.test(page));
  assert.ok(!page.includes('Private-Pilot.zip'));
});
test('practice dataset supports missing marks, unmatched joins and a composite enrolment key', () => {
  const script = `import sqlite3,sys,json
c=sqlite3.connect(':memory:')
c.executescript(sys.stdin.read())
assert c.execute('SELECT COUNT(*) FROM Students').fetchone()[0]==20
assert c.execute('SELECT COUNT(*) FROM Enrolments').fetchone()[0]==23
assert c.execute('SELECT COUNT(*) FROM Enrolments WHERE Mark IS NULL').fetchone()[0]==2
assert c.execute('SELECT COUNT(*) FROM Students s WHERE NOT EXISTS(SELECT 1 FROM Enrolments e WHERE e.StudentID=s.StudentID)').fetchone()[0]==3
assert c.execute('SELECT COUNT(e.StudentID) FROM Courses c LEFT JOIN Enrolments e ON e.CourseID=c.CourseID WHERE c.CourseID=106').fetchone()[0]==0
for q in ["INSERT INTO Enrolments VALUES(1,101,'2026-02-01',60)","INSERT INTO Students VALUES(21,'Demo',999,'Pretoria')","UPDATE Enrolments SET Mark=101 WHERE StudentID=1 AND CourseID=101"]:
 try: c.execute(q)
 except sqlite3.IntegrityError: pass
 else: raise AssertionError('Expected integrity error')
print('Dataset edge cases and constraints verified')`;
  const r = spawnSync('python3', ['-c', script], {
    input: readFileSync(new URL('revision-practice-sqlite.sql', folder)),
    encoding: 'utf8',
  });
  assert.equal(r.status, 0, r.stderr);
});
