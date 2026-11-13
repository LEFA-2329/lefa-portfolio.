import assert from 'node:assert/strict';
import { createWorkStore } from '../dist/learn/js/shared/work-store.mjs';
import {
  cleanTask,
  cleanLesson,
  cleanActivity,
  cleanDraft,
} from '../dist/learn/js/shared/work-state.mjs';
import { lessons } from '../dist/learn/js/prld/content/data.mjs';
import { practice } from '../dist/learn/js/prld/content/practice.mjs';
import { activities } from '../dist/learn/js/prld/content/activities.mjs';
function memory() {
  const data = new Map();
  return {
    get length() {
      return data.size;
    },
    key: (i) => [...data.keys()][i] ?? null,
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
  };
}
const storage = memory(),
  a = createWorkStore(() => storage),
  b = createWorkStore(() => storage);
assert(a.write('task:one', { work: 'Unfinished pseudocode', attempted: false }));
assert.deepEqual(b.read('task:one', {}, cleanTask), {
  work: 'Unfinished pseudocode',
  attempted: false,
  revealed: false,
});
assert(a.write('task:two', { work: 'Another task' }));
assert.equal(b.read('task:one', {}, cleanTask).work, 'Unfinished pseudocode');
assert.equal(a.list().length, 2);
const fallback = { work: '' };
assert.deepEqual(a.read('missing', fallback), fallback);
storage.setItem('logiclab-work-v1:corrupt', '{broken');
assert.deepEqual(a.read('corrupt', {}, cleanTask), {});
assert(a.getStatus().issue);
assert(a.list().some((x) => x.unreadable));
storage.setItem(
  'logiclab-work-v1:future',
  JSON.stringify({ version: 2, updatedAt: 1, payload: {} }),
);
assert.deepEqual(a.read('future', { fresh: true }), { fresh: true });
assert(
  a.write('tracer', { code: 'DECLARE num AS NUM\nINPUT num', preset: 'Add two numbers' }),
);
assert.equal(a.getStatus().issue, '');
assert.equal(
  b.read('tracer', null, (x) => cleanDraft(x, 20000)).code,
  'DECLARE num AS NUM\nINPUT num',
);
const blocked = createWorkStore(() => {
  const error = new Error('blocked');
  error.name = 'SecurityError';
  throw error;
});
assert.deepEqual(blocked.read('draft', { code: '' }), { code: '' });
assert.equal(blocked.write('draft', { code: 'new' }), false);
assert.equal(blocked.getStatus().available, false);
const quota = createWorkStore(() => ({
  ...storage,
  setItem() {
    throw Error('QuotaExceededError');
  },
}));
assert.equal(quota.write('task:one', { work: 'unsaved' }), false);
assert.equal(quota.getStatus().available, false);
assert.equal(b.read('task:one', {}, cleanTask).work, 'Unfinished pseudocode');
const notices = [];
const stop = a.subscribe((s) => notices.push(s));
a.write('task:three', {});
stop();
assert(notices.at(-1).saved);
const l = lessons[0],
  p = practice[l.id],
  q = [l.quiz, ...p.quizzes];
const blank = cleanLesson(l, p, {
  quizPassed: true,
  bugPassed: true,
  debugHintShown: true,
  debugRevealed: true,
});
assert.equal(blank.quizPassed, false);
assert.equal(blank.bugPassed, false);
assert.equal(blank.debugRevealed, false);
assert.equal(blank.debugHintShown, false);
const answer = {
  tab: 'quiz',
  quizIndex: 2,
  quizChoices: q.map((x) => x.correct),
  quizAttempts: q.map(() => true),
  debugAttempts: 1,
  debugChecked: true,
  line: l.bug.line,
  category: l.bug.category,
  correction: l.bug.correct,
  debugHintShown: true,
  debugRevealed: true,
  taskWork: { [p.tasks[0].id]: 'An unfinished answer' },
  taskAttempt: {},
  taskReveal: {},
};
assert(a.write('lesson:' + l.id, cleanLesson(l, p, answer)));
const restored = b.read('lesson:' + l.id, {}, (x) => cleanLesson(l, p, x));
assert.equal(restored.quizIndex, 2);
assert.equal(restored.tab, 'quiz');
assert(restored.quizPassed && restored.bugPassed && restored.debugRevealed);
assert.equal(restored.taskWork[p.tasks[0].id], 'An unfinished answer');
const partial = cleanLesson(l, p, {
  ...answer,
  quizAttempts: [false],
  debugChecked: false,
  taskWork: { alien: 'bad' },
  taskReveal: { [p.tasks[0].id]: true },
});
assert(!partial.quizPassed && !partial.bugPassed && !partial.taskReveal[p.tasks[0].id]);
assert(!Object.hasOwn(partial.taskWork, 'alien'));
const invalid = cleanLesson(l, p, {
  tab: 'unknown',
  quizIndex: -1,
  quizChoices: [900],
  debugAttempts: '1',
  line: -2,
  correction: 999,
});
assert.equal(invalid.tab, 'theory');
assert.equal(invalid.quizIndex, 0);
assert.equal(invalid.quizChoices[0], null);
assert.equal(invalid.line, null);
const order = activities.find((x) => x.statements);
const invalidOrder = cleanActivity(order, {
  order: [0, 0, 0, 0],
  attempts: 0,
  revealed: true,
  hints: 50,
});
assert.deepEqual(invalidOrder.order, order.initialOrder);
assert(!invalidOrder.revealed);
assert.equal(invalidOrder.hints, 0);
const progressed = cleanActivity(order, {
  order: [0, 1, 2, 3],
  moved: true,
  hints: 2,
  attempts: 1,
  revealed: true,
  feedback: 'Correct',
});
a.write('activity:' + order.id, progressed);
assert.deepEqual(
  b.read('activity:' + order.id, {}, (x) => cleanActivity(order, x)),
  progressed,
);
assert.equal(
  cleanTask({ work: 'x'.repeat(25000), attempted: 'true', revealed: true }).work.length,
  20000,
);
assert(!cleanTask({ revealed: true }).revealed);
assert.equal(cleanDraft({ code: 'x'.repeat(30000) }, 20000).code.length, 20000);
storage.setItem('logiclab-progress-v1', JSON.stringify({ completed: ['lesson-1'] }));
storage.setItem('another-app', 'keep');
assert(a.clearAll());
assert.equal(a.list().length, 0);
assert(storage.getItem('logiclab-progress-v1'));
assert.equal(storage.getItem('another-app'), 'keep');
assert.deepEqual(b.read('task:one', { fresh: true }), { fresh: true });
console.log(
  'Passed: reload restoration, separate record keys, corrupted/blocked/full storage, safe validation, quiz/debug gates, activity order, draft limits and scoped clearing.',
);
