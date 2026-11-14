import { lessons, units } from './content/lessons-and-quizzes.mjs?v=38';
import { practice } from './content/lesson-practice.mjs?v=38';
export const examBank = lessons.flatMap((l) =>
  [l.quiz, ...practice[l.id].quizzes].map((q, i) => ({
    ...q,
    id: l.id + '-q' + i,
    unit: l.unit,
  })),
);
export const writtenQuestions = [
  {
    id: 'marks',
    title: 'Count passing marks',
    unit: 2,
    prompt:
      'Write a complete main program that reads exactly four marks, counts marks at least 50 and displays the count. Assume valid numeric marks from 0 to 100. Declare every variable, use a FOR loop and initialise the counter. Give the expected output for 50, 49, 75, 0.',
    solution:
      'BEGIN\n  DECLARE mark AS NUM\n  DECLARE i AS INTEGER\n  DECLARE passed AS INTEGER\n  SET passed = 0\n  FOR i = 1 TO 4\n    INPUT mark\n    IF mark >= 50 THEN\n      SET passed = passed + 1\n    ENDIF\n  ENDFOR\n  OUTPUT passed\nEND',
    explanation:
      'The four inputs contribute 1, 0, 1 and 0 to the count. Expected output: 2. A mark of exactly 50 passes. The counter is initialised once before the loop.',
    criteria: [
      'Declare a numeric mark, whole-number loop counter and pass counter.',
      'Initialise passed to zero before the loop.',
      'Use four iterations and read a fresh mark each time.',
      'Test mark >= 50 and increment only when true.',
      'Display the final count after the loop and give test output 2.',
    ],
  },
  {
    id: 'total',
    title: 'Return an array total',
    unit: 4,
    prompt:
      'Write METHOD Total(values AS NUM[], count AS INTEGER) RETURNS NUM. It must return the sum of the first count elements. Assume 0 <= count <= array capacity. In Main, declare a four-element NUM array containing 10, 20, 30 and 999, then display Total with count 3. Declare all local variables. State the output and what the method returns when count is 0.',
    solution:
      'METHOD Total(values AS NUM[], count AS INTEGER) RETURNS NUM\n  DECLARE i AS INTEGER\n  DECLARE total AS NUM\n  SET total = 0\n  FOR i = 0 TO count - 1\n    SET total = total + values[i]\n  ENDFOR\n  RETURN total\nENDMETHOD\nBEGIN\n  DECLARE marks[4] AS NUM\n  SET marks[0] = 10\n  SET marks[1] = 20\n  SET marks[2] = 30\n  SET marks[3] = 999\n  OUTPUT Total(marks, 3)\nEND',
    explanation:
      'The method visits indices 0, 1 and 2, returns 60 and ignores the spare value 999. Main displays 60. At count 0 the inclusive FOR loop performs no iterations and the initial total 0 is returned. This is written practice; methods are not executable in the current tracer.',
    criteria: [
      'Declare typed array/count parameters, a NUM result type and local variables.',
      'Initialise the total once to zero.',
      'Traverse indices 0 through count - 1 and accumulate values[i].',
      'RETURN the total, including 0 when count is 0.',
      'Declare/populate Main’s array, pass count 3 and state output 60.',
    ],
  },
];
function random(seed) {
  let x = seed >>> 0;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967296;
  };
}
export function examQuestions(seed) {
  const rng = random(seed);
  return units.flatMap((u) => {
    const bank = examBank.filter((q) => q.unit === u.id);
    for (let i = bank.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [bank[i], bank[j]] = [bank[j], bank[i]];
    }
    return bank.slice(0, 3);
  });
}
export function createExam(seed, minutes = 0, now = Date.now()) {
  if (
    !Number.isInteger(seed) ||
    seed < 1 ||
    seed > 4294967295 ||
    ![0, 30, 60].includes(minutes) ||
    !Number.isSafeInteger(now) ||
    now <= 0
  )
    throw Error('Invalid exam settings.');
  return {
    version: 1,
    seed,
    minutes,
    startedAt: now,
    deadline: minutes ? now + minutes * 60000 : null,
    submittedAt: null,
    expired: false,
    index: 0,
    answers: {},
    written: {},
    ratings: {},
  };
}
export function cleanExam(raw) {
  if (!raw || raw.version !== 1) return null;
  let s;
  try {
    s = createExam(raw.seed, raw.minutes, raw.startedAt);
  } catch {
    return null;
  }
  const qs = examQuestions(s.seed);
  s.index =
    Number.isInteger(raw.index) && raw.index >= 0 && raw.index < 17 ? raw.index : 0;
  if (Number.isSafeInteger(raw.submittedAt) && raw.submittedAt >= s.startedAt) {
    s.submittedAt = raw.submittedAt;
    s.expired = !!s.deadline && raw.submittedAt >= s.deadline;
  }
  for (const q of qs) {
    const a = raw.answers?.[q.id];
    if (Number.isInteger(a) && a >= 0 && a < q.options.length) s.answers[q.id] = a;
  }
  for (const q of writtenQuestions) {
    s.written[q.id] =
      typeof raw.written?.[q.id] === 'string' ? raw.written[q.id].slice(0, 10000) : '';
    s.ratings[q.id] = q.criteria.map((_, i) => {
      const n = raw.ratings?.[q.id]?.[i];
      return s.submittedAt !== null && Number.isInteger(n) && n >= 0 && n <= 2 ? n : null;
    });
  }
  return s;
}
export const remainingSeconds = (s, now = Date.now()) =>
  s.deadline === null ? null : Math.max(0, Math.ceil((s.deadline - now) / 1000));
export function submitExam(s, now = Date.now()) {
  if (s.submittedAt !== null) return s;
  s.submittedAt = now;
  s.expired = s.deadline !== null && now >= s.deadline;
  return s;
}
export function examResult(s) {
  if (s.submittedAt === null)
    throw Error('Submit your attempt before reviewing answers.');
  const qs = examQuestions(s.seed);
  const byUnit = units.map((u) => ({
    id: u.id,
    title: u.title,
    total: 3,
    correct: qs.filter((q) => q.unit === u.id && s.answers[q.id] === q.correct).length,
  }));
  const objective = byUnit.reduce((n, u) => n + u.correct, 0);
  let rated = 0,
    self = 0;
  for (const q of writtenQuestions)
    for (let i = 0; i < q.criteria.length; i++) {
      const v = s.ratings[q.id]?.[i];
      if (Number.isInteger(v) && v >= 0 && v <= 2) {
        rated++;
        self += v;
      }
    }
  return {
    objective,
    objectiveTotal: 15,
    byUnit,
    self,
    selfTotal: 20,
    rated,
    rubricItems: 10,
    combined: rated === 10 ? objective + self : null,
    total: 35,
  };
}
