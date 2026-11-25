import test from 'node:test';
import assert from 'node:assert/strict';
import {
  makeBackup,
  parseBackup,
  backupSummary,
  planRestore,
  applyRestore,
  MAX_BACKUP_BYTES,
} from '../dist/learn/js/shared/progress-backup.mjs';
import { defaults, SETTINGS_KEY } from '../dist/learn/js/shared/display-preferences.mjs';
import { wedeLessons } from '../dist/learn/js/web-development/content/course.mjs';
import { createWorkStore } from '../dist/learn/js/shared/saved-work-storage.mjs';
import {
  courseProgress,
  createCompletionStore,
  lessonProgress,
} from '../dist/learn/js/shared/learning-progress.mjs';
const C = 'studylab-completion-v1',
  CS = 'studylab-csharp-learning-v1',
  P = 'logiclab-work-v1:';
class Storage {
  constructor(data = {}) {
    this.data = new Map(
      Object.entries(data).map(([k, v]) => [
        k,
        typeof v === 'string' ? v : JSON.stringify(v),
      ]),
    );
    this.fail = null;
  }
  get length() {
    return this.data.size;
  }
  key(i) {
    return [...this.data.keys()][i] ?? null;
  }
  getItem(k) {
    return this.data.get(k) ?? null;
  }
  setItem(k, v) {
    if (this.fail?.(k, v)) throw Error('Quota exceeded');
    this.data.set(k, v);
  }
  removeItem(k) {
    this.data.delete(k);
  }
}
const work = (payload) => ({ version: 1, updatedAt: 123, payload });
const backup = (records) => ({
  format: 'studylab-progress-backup',
  version: 1,
  exportedAt: '2026-11-15T00:00:00.000Z',
  records: Object.entries(records).map(([key, data]) => ({ key, data })),
});
const json = (s) => Object.fromEntries(s.data);
const parsed = (s, k) => JSON.parse(s.getItem(k));
test('export includes all learning families, migrates legacy completions and excludes unrelated storage', () => {
  const s = new Storage({
    [C]: { version: 1, completed: ['lesson-1'] },
    'logiclab-progress-v1': ['lesson-2'],
    [CS]: {
      'cs-foundations': {
        complete: true,
        score: 2,
        total: 3,
        readiness: [true, false, true],
        independentNotes: 'My code',
      },
    },
    [P + 'sql:free']: work({ code: 'SELECT 1;' }),
    [P + 'exam']: work({ seed: 1 }),
    [SETTINGS_KEY]: { version: 1, preferences: defaults },
    authToken: 'private',
  });
  const b = makeBackup(s);
  assert.ok(
    !b.records.some(
      (r) =>
        r.key === 'authToken' ||
        r.key === SETTINGS_KEY ||
        r.key === 'logiclab-progress-v1',
    ),
  );
  assert.deepEqual(b.records.find((r) => r.key === C).data.completed, [
    'lesson-1',
    'lesson-2',
  ]);
  assert.deepEqual(backupSummary(b), {
    completed: 3,
    activities: 2,
    quizzes: 1,
    csharpLessons: 1,
    settings: false,
  });
  assert.ok(
    makeBackup(s, { includeSettings: true }).records.some((r) => r.key === SETTINGS_KEY),
  );
  const restored = new Storage();
  applyRestore(planRestore(parseBackup(JSON.stringify(b)), restored), restored);
  assert.equal(parsed(restored, P + 'sql:free').payload.code, 'SELECT 1;');
  assert.equal(s.getItem('authToken'), 'private');
});
test('WEDE restores a practical draft, checked quiz choices and independent course completion', () => {
  const storage = new Storage();
  const workStore = createWorkStore(() => storage);
  const completion = createCompletionStore(() => storage);
  const lesson = wedeLessons[0];
  const key = 'wede:' + lesson.id;
  const answers = {
    choices: lesson.quizzes.map((q) => q.answer),
    checked: [true, false],
    draft: 'Keep visitor information on a permanent page.',
  };
  workStore.write(key, answers);
  assert.equal(lessonProgress(lesson, 'wede', workStore, completion).ready, false);
  workStore.write(key, { ...answers, checked: [true, true] });
  assert.equal(lessonProgress(lesson, 'wede', workStore, completion).ready, true);
  completion.set(lesson.id, true);

  const restored = new Storage();
  const backup = parseBackup(JSON.stringify(makeBackup(storage)));
  applyRestore(planRestore(backup, restored), restored);
  const restoredWork = createWorkStore(() => restored);
  const restoredCompletions = createCompletionStore(() => restored);
  const progress = courseProgress('wede', restoredWork, restoredCompletions);
  assert.equal(restoredWork.read(key, {}).draft, answers.draft);
  assert.equal(progress.completed, 1);
  assert.equal(progress.correct, 2);
  assert.equal(progress.quizTotal, 38);
  assert.equal(
    courseProgress('database', restoredWork, restoredCompletions).completed,
    0,
  );
});
test('merge preserves whole current drafts by default and lets the user choose each conflict', () => {
  const s = new Storage({
    [C]: { completed: ['lesson-1'] },
    [P + 'lesson:lesson-1']: work({ work: 'current', checked: [true] }),
    [CS]: {
      'cs-foundations': {
        complete: true,
        score: 1,
        total: 3,
        readiness: [true, false, false],
        independentNotes: 'Current notes',
      },
    },
  });
  const b = backup({
    [C]: { completed: ['lesson-2'] },
    [P + 'lesson:lesson-1']: work({ work: 'backup', checked: [false] }),
    [CS]: {
      'cs-foundations': {
        complete: false,
        score: 3,
        total: 3,
        readiness: [false, true, false],
        independentNotes: 'Backup notes',
      },
    },
  });
  const plan = planRestore(b, s);
  assert.equal(plan.conflicts.length, 2);
  assert.match(plan.conflicts[0].currentPreview, /current/);
  const choices = Object.fromEntries(plan.conflicts.map((c) => [c.id, 'backup']));
  applyRestore(planRestore(b, s, { choices }), s);
  assert.deepEqual(parsed(s, C).completed, ['lesson-1', 'lesson-2']);
  assert.equal(parsed(s, P + 'lesson:lesson-1').payload.work, 'backup');
  const row = parsed(s, CS)['cs-foundations'];
  assert.equal(row.complete, true);
  assert.equal(row.score, 3);
  assert.deepEqual(row.readiness, [true, true, false]);
  assert.equal(row.independentNotes, 'Backup notes');
});
test('different quiz totals preserve the current score instead of combining incompatible scores', () => {
  const s = new Storage({ [CS]: { 'cs-foundations': { score: 1, total: 2 } } });
  const b = backup({ [CS]: { 'cs-foundations': { score: 3, total: 3 } } });
  applyRestore(planRestore(b, s), s);
  assert.equal(parsed(s, CS)['cs-foundations'].score, 1);
  assert.equal(parsed(s, CS)['cs-foundations'].total, 2);
});
test('replace clears only learning records and does not restore theme settings without opting in', () => {
  const settings = { version: 1, preferences: { ...defaults, theme: 'cream' } };
  const s = new Storage({
    [C]: { completed: ['lesson-1'] },
    [P + 'diagram']: work({ code: 'draft' }),
    [SETTINGS_KEY]: settings,
    unrelated: 'keep',
    'studylab-module': 'csharp',
  });
  const b = backup({
    [C]: { completed: ['lesson-2'] },
    [SETTINGS_KEY]: { version: 1, preferences: defaults },
  });
  applyRestore(planRestore(b, s, { mode: 'replace' }), s);
  assert.deepEqual(parsed(s, C).completed, ['lesson-2']);
  assert.equal(s.getItem(P + 'diagram'), null);
  assert.equal(parsed(s, SETTINGS_KEY).preferences.theme, 'cream');
  assert.equal(s.getItem('unrelated'), 'keep');
  assert.equal(s.getItem('studylab-module'), 'csharp');
  applyRestore(planRestore(b, s, { restoreSettings: true }), s);
  assert.equal(parsed(s, SETTINGS_KEY).preferences.theme, 'light');
});
test('unknown keys, malicious object keys, duplicate records and unsupported versions are rejected before writes', () => {
  const s = new Storage({ untouched: 'yes' }),
    before = json(s);
  for (const text of [
    JSON.stringify(backup({ authToken: { token: 'no' } })),
    JSON.stringify({ ...backup({}), version: 2 }),
    '{"format":"studylab-progress-backup","version":1,"exportedAt":"2026-11-15","records":[],"__proto__":{"polluted":true}}',
    JSON.stringify({
      ...backup({}),
      records: [
        { key: C, data: { completed: [] } },
        { key: C, data: { completed: [] } },
      ],
    }),
  ])
    assert.throws(() => parseBackup(text));
  assert.deepEqual(json(s), before);
  assert.equal({}.polluted, undefined);
});
test('oversized, malformed and deeply nested records cannot be restored', () => {
  assert.throws(() => parseBackup('x'.repeat(MAX_BACKUP_BYTES + 1)), /8 MB/);
  assert.throws(() => parseBackup('not JSON'), /readable JSON/);
  for (const record of [
    { version: 2, updatedAt: 1, payload: {} },
    { version: 1, updatedAt: 1, payload: { code: 'x'.repeat(300001) } },
  ])
    assert.throws(() => parseBackup(JSON.stringify(backup({ [P + 'diagram']: record }))));
  assert.throws(
    () =>
      parseBackup(
        JSON.stringify(backup({ [CS]: { 'cs-foundations': { score: 4, total: 3 } } })),
      ),
    /score/,
  );
  let deep = {};
  for (let i = 0; i < 25; i++) deep = { child: deep };
  assert.throws(
    () => parseBackup(JSON.stringify(backup({ [P + 'diagram']: work(deep) }))),
    /nested/,
  );
});
test('stale preview detects changes in another tab before changing any records', () => {
  const s = new Storage({ [C]: { completed: ['lesson-1'] } }),
    plan = planRestore(backup({ [C]: { completed: ['lesson-2'] } }), s);
  s.setItem(C, JSON.stringify({ completed: ['lesson-3'] }));
  const before = json(s);
  assert.throws(() => applyRestore(plan, s), /changed after the preview/);
  assert.deepEqual(json(s), before);
});
test('failed writes roll back original records including legacy data, without clearing other storage', () => {
  const s = new Storage({
      'logiclab-progress-v1': ['lesson-1'],
      [P + 'diagram']: work({ code: 'original' }),
      unrelated: 'keep',
    }),
    before = json(s);
  const plan = planRestore(
    backup({ [C]: { completed: ['lesson-2'] }, [P + 'task:new']: work({ work: 'new' }) }),
    s,
    { mode: 'replace' },
  );
  let failed = false;
  s.fail = (k) => {
    if (k === P + 'task:new' && !failed) {
      failed = true;
      return true;
    }
    return false;
  };
  assert.throws(() => applyRestore(plan, s), /original saved records were restored/);
  assert.deepEqual(json(s), before);
});
test('persistent storage failures report incomplete recovery and keep unrelated keys', () => {
  const s = new Storage({
    [P + 'diagram']: work({ code: 'original' }),
    unrelated: 'keep',
  });
  const plan = planRestore(backup({ [P + 'task:new']: work({ work: 'new' }) }), s, {
    mode: 'replace',
  });
  s.fail = () => true;
  assert.throws(() => applyRestore(plan, s), /could not be fully recovered/);
  assert.equal(s.getItem('unrelated'), 'keep');
});
test('empty replacement is explicit, unreadable local data blocks export and strings remain inert data', () => {
  const s = new Storage({ [C]: { completed: ['lesson-1'] } });
  applyRestore(planRestore(backup({}), s, { mode: 'replace' }), s);
  assert.equal(s.getItem(C), null);
  assert.throws(
    () => makeBackup(new Storage({ [P + 'diagram']: 'broken JSON' })),
    /Cannot back up/,
  );
  const malicious = '<img src=x onerror=alert(1)>';
  const b = parseBackup(
    JSON.stringify(
      backup({
        [P + 'task:example']: work({
          work: malicious,
          checked: { some: 'not a function' },
        }),
      }),
    ),
  );
  assert.equal(backupSummary(b).activities, 1);
  applyRestore(planRestore(b, s), s);
  assert.equal(parsed(s, P + 'task:example').payload.work, malicious);
});
test('a modified restore plan cannot write outside the allowed StudyLab keys', () => {
  const s = new Storage({ unrelated: 'keep' });
  const plan = planRestore(backup({}), s);
  plan.entries.push({ key: 'unrelated', data: {} });
  assert.throws(() => applyRestore(plan, s), /cannot restore/);
  assert.equal(s.getItem('unrelated'), 'keep');
});
