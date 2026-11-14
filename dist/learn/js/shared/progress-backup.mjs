// Only StudyLab learning records are portable. Never export all origin storage.
import { cleanPreferences, SETTINGS_KEY } from './display-preferences.mjs?v=40';
const COMPLETION = 'studylab-completion-v1';
const LEGACY = 'logiclab-progress-v1';
const CSHARP = 'studylab-csharp-learning-v1';
const PREFIX = 'logiclab-work-v1:';
export const MAX_BACKUP_BYTES = 8 * 1024 * 1024;
const plain = (value) =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  [Object.prototype, null].includes(Object.getPrototypeOf(value));
const id = (value) =>
  typeof value === 'string' && /^[a-z0-9][a-z0-9-]{0,99}$/.test(value);
const progressKey = (key) =>
  key === COMPLETION ||
  key === LEGACY ||
  key === CSHARP ||
  (typeof key === 'string' &&
    key.length <= 180 &&
    /^logiclab-work-v1:[a-z0-9-]+(?::[a-z0-9-]+)*$/.test(key));
function safeTree(value, depth = 0) {
  if (depth > 20) throw Error('The backup contains data nested too deeply.');
  if (value === null || typeof value === 'boolean' || typeof value === 'string') return;
  if (typeof value === 'number' && Number.isFinite(value)) return;
  if (Array.isArray(value)) {
    if (value.length > 20000) throw Error('A backup list is too large.');
    for (const child of value) safeTree(child, depth + 1);
    return;
  }
  if (!plain(value)) throw Error('The backup contains an unsupported value.');
  for (const [key, child] of Object.entries(value)) {
    if (['__proto__', 'prototype', 'constructor'].includes(key))
      throw Error('The backup contains an unsafe object key.');
    safeTree(child, depth + 1);
  }
}
function completions(data) {
  let values;
  if (Array.isArray(data)) values = data;
  else if (plain(data) && Array.isArray(data.completed)) values = data.completed;
  else if (plain(data) && Array.isArray(data.completedLessons))
    values = data.completedLessons;
  else if (plain(data))
    values = Object.entries(data)
      .filter(([, v]) => v === true)
      .map(([k]) => k);
  else throw Error('Invalid completed-lesson data.');
  if (values.length > 2000 || !values.every(id))
    throw Error('Invalid completed-lesson identifiers.');
  return { version: 1, completed: [...new Set(values)].sort() };
}
function record(key, data) {
  safeTree(data);
  if (key === COMPLETION || key === LEGACY) return completions(data);
  if (key === SETTINGS_KEY) {
    if (!plain(data) || data.version !== 1 || !plain(data.preferences))
      throw Error('Invalid display settings.');
    const clean = cleanPreferences(data.preferences);
    if (
      Object.keys(data.preferences).some(
        (k) => !Object.hasOwn(clean, k) || data.preferences[k] !== clean[k],
      )
    )
      throw Error('Unsupported display settings.');
    return { version: 1, preferences: clean };
  }
  if (key === CSHARP) {
    if (!plain(data) || Object.keys(data).length > 1000)
      throw Error('Invalid C# learning data.');
    for (const [lesson, row] of Object.entries(data)) {
      if (lesson.length > 100 || !/^(cs|docker)-[a-z0-9-]+$/.test(lesson) || !plain(row))
        throw Error('Invalid C# lesson record.');
      if (
        Object.keys(row).some(
          (k) =>
            !['complete', 'score', 'total', 'readiness', 'independentNotes'].includes(k),
        )
      )
        throw Error('Unsupported C# progress field.');
      if (Object.hasOwn(row, 'complete') && typeof row.complete !== 'boolean')
        throw Error('Invalid completion flag.');
      if (Object.hasOwn(row, 'score') || Object.hasOwn(row, 'total')) {
        if (
          !Number.isInteger(row.total) ||
          row.total < 1 ||
          row.total > 1000 ||
          !Number.isInteger(row.score) ||
          row.score < 0 ||
          row.score > row.total
        )
          throw Error('Invalid quiz score.');
      }
      if (
        Object.hasOwn(row, 'readiness') &&
        (!Array.isArray(row.readiness) ||
          row.readiness.length !== 3 ||
          !row.readiness.every((v) => typeof v === 'boolean'))
      )
        throw Error('Invalid readiness checks.');
      if (
        Object.hasOwn(row, 'independentNotes') &&
        (typeof row.independentNotes !== 'string' || row.independentNotes.length > 200000)
      )
        throw Error('Invalid lesson notes.');
    }
    return data;
  }
  if (!progressKey(key) || !key.startsWith(PREFIX))
    throw Error('This file contains a storage key that StudyLab cannot restore.');
  if (
    !plain(data) ||
    data.version !== 1 ||
    !Number.isFinite(data.updatedAt) ||
    data.updatedAt < 0 ||
    !Object.hasOwn(data, 'payload') ||
    JSON.stringify(data).length > 300000
  )
    throw Error('Invalid saved activity record.');
  return data;
}
function snapshot(storage) {
  const values = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (progressKey(key) || key === SETTINGS_KEY)
      values.push([key, storage.getItem(key)]);
  }
  return values.sort(([a], [b]) => a.localeCompare(b));
}
function readRecords(storage, includeSettings) {
  const values = new Map();
  let completed = [];
  let hasCompletion = false;
  for (const [key, text] of snapshot(storage)) {
    if (key === SETTINGS_KEY && !includeSettings) continue;
    let data;
    try {
      data = record(key, JSON.parse(text));
    } catch (error) {
      throw Error(
        'Cannot back up ' +
          key +
          ': ' +
          error.message +
          ' Your saved data has not been changed.',
      );
    }
    if (key === COMPLETION || key === LEGACY) {
      completed.push(...data.completed);
      hasCompletion = true;
    } else values.set(key, data);
  }
  if (hasCompletion) values.set(COMPLETION, completions(completed));
  return values;
}
export function makeBackup(storage, { includeSettings = false, now = new Date() } = {}) {
  const backup = {
    format: 'studylab-progress-backup',
    version: 1,
    exportedAt: now.toISOString(),
    records: [...readRecords(storage, includeSettings)].map(([key, data]) => ({
      key,
      data,
    })),
  };
  return parseBackup(JSON.stringify(backup));
}
export function parseBackup(text) {
  if (
    typeof text !== 'string' ||
    text.length > MAX_BACKUP_BYTES ||
    new TextEncoder().encode(text).byteLength > MAX_BACKUP_BYTES
  )
    throw Error('Choose a StudyLab backup smaller than 8 MB.');
  let backup;
  try {
    backup = JSON.parse(text);
  } catch {
    throw Error('This is not a readable JSON backup.');
  }
  safeTree(backup);
  if (
    !plain(backup) ||
    backup.format !== 'studylab-progress-backup' ||
    backup.version !== 1
  )
    throw Error('This file is not a supported StudyLab progress backup (version 1).');
  if (
    typeof backup.exportedAt !== 'string' ||
    backup.exportedAt.length > 40 ||
    !Number.isFinite(Date.parse(backup.exportedAt))
  )
    throw Error('The backup date is invalid.');
  if (!Array.isArray(backup.records) || backup.records.length > 2000)
    throw Error('The backup record list is invalid or too large.');
  const keys = new Set();
  for (const entry of backup.records) {
    if (
      !plain(entry) ||
      typeof entry.key !== 'string' ||
      keys.has(entry.key) ||
      entry.key === LEGACY
    )
      throw Error('The backup has invalid or duplicate record keys.');
    keys.add(entry.key);
    entry.data = record(entry.key, entry.data);
  }
  return backup;
}
export function backupSummary(backup) {
  const completed = new Set();
  let activities = 0,
    quizzes = 0,
    lessons = 0;
  let settings = false;
  for (const { key, data } of backup.records) {
    if (key === COMPLETION) for (const lesson of data.completed) completed.add(lesson);
    else if (key === CSHARP)
      for (const [lesson, row] of Object.entries(data)) {
        lessons++;
        if (row.complete) completed.add(lesson);
        if (Number.isInteger(row.score)) quizzes++;
      }
    else if (key === SETTINGS_KEY) settings = true;
    else {
      activities++;
      if (
        (Array.isArray(data.payload?.checked) &&
          data.payload.checked.some((v) => v === true)) ||
        (Array.isArray(data.payload?.quizAttempts) &&
          data.payload.quizAttempts.some((v) => v === true))
      )
        quizzes++;
    }
  }
  return {
    completed: completed.size,
    activities,
    quizzes,
    csharpLessons: lessons,
    settings,
  };
}
// Merging activity records keeps each quiz/draft state internally consistent.
export function planRestore(
  backup,
  storage,
  { mode = 'merge', restoreSettings = false, choices = {} } = {},
) {
  backup = parseBackup(JSON.stringify(backup));
  if (!['merge', 'replace'].includes(mode)) throw Error('Choose merge or replace.');
  const before = snapshot(storage),
    current = readRecords(storage, true),
    target = mode === 'merge' ? new Map(current) : new Map();
  if (mode === 'replace' && current.has(SETTINGS_KEY))
    target.set(SETTINGS_KEY, current.get(SETTINGS_KEY));
  const conflicts = [];
  const choose = (conflictId, label, a, b) => {
    const preview = (value) =>
      (typeof value === 'string' ? value : JSON.stringify(value, null, 2)).slice(0, 1200);
    conflicts.push({
      id: conflictId,
      label,
      currentPreview: preview(a),
      backupPreview: preview(b),
    });
    return choices[conflictId] === 'backup' ? b : a;
  };
  for (const { key, data } of backup.records) {
    if (key === SETTINGS_KEY) {
      if (restoreSettings) target.set(key, data);
      continue;
    }
    if (mode === 'replace' || !target.has(key)) {
      target.set(key, data);
      continue;
    }
    const a = target.get(key);
    if (key === COMPLETION) {
      target.set(key, completions([...a.completed, ...data.completed]));
      continue;
    }
    if (key === CSHARP) {
      const merged = JSON.parse(JSON.stringify(a));
      for (const [lesson, b] of Object.entries(data)) {
        if (!merged[lesson]) {
          merged[lesson] = b;
          continue;
        }
        const old = merged[lesson],
          row = { ...b, ...old };
        if (Object.hasOwn(old, 'complete') || Object.hasOwn(b, 'complete'))
          row.complete = old.complete === true || b.complete === true;
        if (
          !Number.isInteger(old.score) ||
          (old.total === b.total && b.score > old.score)
        ) {
          if (Number.isInteger(b.score)) {
            row.score = b.score;
            row.total = b.total;
          }
        }
        if (old.readiness || b.readiness)
          row.readiness = [0, 1, 2].map(
            (i) => old.readiness?.[i] === true || b.readiness?.[i] === true,
          );
        if (
          old.independentNotes &&
          b.independentNotes &&
          old.independentNotes !== b.independentNotes
        )
          row.independentNotes = choose(
            'notes:' + lesson,
            'C#/Docker notes: ' + lesson,
            old.independentNotes,
            b.independentNotes,
          );
        else row.independentNotes = old.independentNotes || b.independentNotes || '';
        merged[lesson] = row;
      }
      target.set(key, merged);
      continue;
    }
    if (JSON.stringify(a.payload) !== JSON.stringify(data.payload))
      target.set(
        key,
        choose(key, 'Saved activity: ' + key.slice(PREFIX.length), a, data),
      );
  }
  const entries = [...target].map(([key, data]) => ({ key, data: record(key, data) }));
  return {
    mode,
    restoreSettings,
    before,
    entries,
    conflicts,
    summary: backupSummary({ records: entries }),
  };
}
export function applyRestore(plan, storage) {
  if (JSON.stringify(snapshot(storage)) !== JSON.stringify(plan.before))
    throw Error(
      'Progress changed after the preview, possibly in another tab. Preview the backup again before restoring.',
    );
  // Validate again before the first write. Never call localStorage.clear().
  const desired = new Map(
    plan.entries.map(({ key, data }) => [key, JSON.stringify(record(key, data))]),
  );
  const before = new Map(plan.before);
  try {
    for (const [key] of before) if (!desired.has(key)) storage.removeItem(key);
    for (const [key, value] of desired)
      if (before.get(key) !== value) storage.setItem(key, value);
  } catch (error) {
    let recovered = true;
    try {
      for (const [key] of snapshot(storage))
        if (!before.has(key)) storage.removeItem(key);
      for (const [key, value] of before)
        if (storage.getItem(key) !== value) storage.setItem(key, value);
    } catch {
      recovered = false;
    }
    throw Error(
      recovered
        ? 'Restore failed, and the original saved records were restored. Check storage space or browser permissions.'
        : 'Restore failed and the original records could not be fully recovered. Keep your downloaded safety backup and restore it when browser storage is available.',
    );
  }
  return plan.summary;
}
