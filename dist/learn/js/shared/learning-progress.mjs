import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=39';
import {
  advancedUnits,
  advancedLessons,
} from '../database/content/advanced-lessons.mjs?v=39';
import { cleanDatabaseLesson } from '../database/saved-database-answers.mjs?v=39';
import { workStore } from './saved-work-storage.mjs?v=39';
import {
  lessons as prldLessons,
  units as prldUnits,
} from '../programming-logic/content/lessons-and-quizzes.mjs?v=39';
import { practice } from '../programming-logic/content/lesson-practice.mjs?v=39';
import { cleanLesson } from './saved-programming-answers.mjs?v=39';
import { dbLessons, dbUnits } from '../database/content/introduction-lessons.mjs?v=39';
import {
  intermediateLessons,
  intermediateUnits,
} from '../database/content/intermediate-lessons.mjs?v=39';
import { escapeHTML as e } from '../programming-logic/pseudocode-parser-and-diagrams.mjs?v=39';
export const progressCourses = {
  advanced: {
    title: 'Advanced Database',
    lessons: advancedLessons,
    units: advancedUnits,
  },
  prld: { title: 'Programming Logic and Design', lessons: prldLessons, units: prldUnits },
  database: { title: 'DATA6211 Introduction', lessons: dbLessons, units: dbUnits },
  intermediate: {
    title: 'DATA6222 Intermediate',
    lessons: intermediateLessons,
    units: intermediateUnits,
  },
};
const valid = new Set(
    Object.values(progressCourses).flatMap((c) => c.lessons.map((l) => l.id)),
  ),
  KEY = 'studylab-completion-v1',
  LEGACY = 'logiclab-progress-v1';
export function createCompletionStore(provider = () => globalThis.localStorage) {
  let issue = '';
  const decode = (raw) => {
    if (!raw) return [];
    const v = JSON.parse(raw);
    const entries = Array.isArray(v)
      ? v
      : Array.isArray(v?.completed)
        ? v.completed
        : Array.isArray(v?.completedLessons)
          ? v.completedLessons
          : Object.entries(v || {})
              .filter(([id, done]) => valid.has(id) && done === true)
              .map(([id]) => id);
    return entries.filter((id) => typeof id === 'string' && valid.has(id));
  };
  const read = () => {
    const ids = new Set();
    try {
      const storage = provider();
      for (const key of [LEGACY, KEY]) {
        try {
          for (const id of decode(storage.getItem(key))) ids.add(id);
        } catch {
          issue =
            'Some completion data could not be restored. Existing records have not been removed.';
        }
      }
    } catch {
      issue = 'Completion storage is unavailable in this browser.';
    }
    return ids;
  };
  return {
    read,
    getIssue: () => issue,
    set(id, done) {
      if (!valid.has(id)) throw Error('Unknown lesson');
      try {
        const ids = read();
        done ? ids.add(id) : ids.delete(id);
        provider().setItem(KEY, JSON.stringify({ version: 1, completed: [...ids] }));
        /* Migrate a valid legacy list only after saving its merged values. */ try {
          const raw = provider().getItem(LEGACY);
          if (raw) {
            JSON.parse(raw);
            provider().removeItem(LEGACY);
          }
        } catch {}
        issue = '';
        return true;
      } catch {
        issue =
          'Completion could not be saved. Keep this page open or check browser storage.';
        return false;
      }
    },
    reset() {
      try {
        const s = provider();
        s.removeItem(KEY);
        s.removeItem(LEGACY);
        issue = '';
        return true;
      } catch {
        issue = 'Completion could not be reset. Check browser storage.';
        return false;
      }
    },
  };
}
export const completionStore = createCompletionStore();
export function lessonProgress(
  lesson,
  course,
  store = workStore,
  completion = completionStore,
) {
  let correct = 0,
    attempted = 0,
    total = 0,
    debugReady = true,
    debugAttempted = false;
  if (course === 'prld') {
    const s = store.read('lesson:' + lesson.id, {}, (raw) =>
      cleanLesson(lesson, practice[lesson.id], raw),
    );
    const questions = [lesson.quiz, ...practice[lesson.id].quizzes];
    total = questions.length;
    for (let i = 0; i < total; i++) {
      if (s.quizAttempts?.[i]) {
        attempted++;
        if (s.quizChoices?.[i] === questions[i].correct) correct++;
      }
    }
    debugReady = !!s.bugPassed;
    debugAttempted = !!s.debugAttempts;
  } else {
    const s = store.read('database:' + lesson.id, {}, (raw) =>
      cleanDatabaseLesson(raw, lesson),
    );
    total = lesson.quizzes.length;
    for (let i = 0; i < total; i++) {
      if (
        s.checked?.[i] === true &&
        Number.isInteger(s.choices?.[i]) &&
        s.choices[i] >= 0 &&
        s.choices[i] < lesson.quizzes[i].options.length
      ) {
        attempted++;
        if (s.choices[i] === lesson.quizzes[i].answer) correct++;
      }
    }
  }
  const completed = completion.read().has(lesson.id),
    ready = correct === total && debugReady,
    needsRevision = attempted > correct || (debugAttempted && !debugReady);
  return {
    id: lesson.id,
    title: lesson.title,
    unit: lesson.unit,
    total,
    attempted,
    correct,
    completed,
    ready,
    needsRevision,
    debugReady,
    status: needsRevision
      ? 'Needs revision'
      : completed
        ? 'Complete'
        : ready
          ? 'Ready to complete'
          : attempted || debugAttempted
            ? 'In progress'
            : 'Not started',
  };
}
export function courseProgress(
  course = 'prld',
  store = workStore,
  completion = completionStore,
) {
  const c = progressCourses[course] || progressCourses.prld;
  const items = c.lessons.map((l) => lessonProgress(l, course, store, completion));
  return {
    ...c,
    items,
    completed: items.filter((l) => l.completed).length,
    total: items.length,
    correct: items.reduce((n, l) => n + l.correct, 0),
    attempted: items.reduce((n, l) => n + l.attempted, 0),
    quizTotal: items.reduce((n, l) => n + l.total, 0),
  };
}
export function progressSummary(course) {
  const p = courseProgress(course);
  return `<p class="progress-summary">${p.completed} of ${p.total} lessons complete. <a class="text-link" href="#progress/${course}">View my progress</a></p>`;
}
export function refreshLessonCompletion(view, id, course, create = false) {
  let host = view.querySelector('#lesson-completion');
  if (!host && !create) return;
  if (!host) {
    host = document.createElement('section');
    host.id = 'lesson-completion';
    host.className = 'panel lesson-completion';
    view.append(host);
  }
  const l = progressCourses[course]?.lessons.find((x) => x.id === id);
  if (!l) return;
  const p = lessonProgress(l, course);
  host.innerHTML = `<h2>Lesson progress</h2><p>${p.completed ? 'Marked complete. ' : ''}Quiz: ${p.correct}/${p.total} correct (${p.attempted} checked). ${course === 'prld' ? 'Debugging check: ' + (p.debugReady ? 'passed.' : 'not passed yet.') : ''}</p><button class="button secondary" id="complete-lesson" ${!p.completed && !p.ready ? 'disabled' : ''}>${p.completed ? 'Mark as incomplete' : 'Mark lesson complete'}</button><p class="muted" id="completion-status" role="status">${e(completionStore.getIssue() || (!p.ready && !p.completed ? 'Pass all lesson quiz questions' + (course === 'prld' ? ' and the debugging check' : '') + ' to unlock completion.' : 'Completion and scores are saved on this browser profile.'))}</p>`;
  host.querySelector('button').onclick = () => {
    const current = lessonProgress(l, course);
    if (!current.completed && !current.ready) return;
    if (completionStore.set(id, !current.completed))
      refreshLessonCompletion(view, id, course);
    else
      host.querySelector('#completion-status').textContent = completionStore.getIssue();
  };
}
export function progressPage({ view, sidebar, course = 'prld' }) {
  if (!progressCourses[course]) course = 'prld';
  const draw = () => {
    const p = courseProgress(course);
    view.innerHTML = renderHtmlPage('studylab/learning-progress', {
      dynamic_1: e(p.title),
      dynamic_2: p.completed,
      dynamic_3: p.total,
      dynamic_4: p.correct,
      dynamic_5: p.quizTotal,
      dynamic_6: p.attempted,
      dynamic_7: Object.entries(progressCourses)
        .map(
          ([id, c]) =>
            `<a class="button secondary" href="#progress/${id}">${e(c.title)}</a>`,
        )
        .join(''),
      dynamic_8: completionStore.getIssue()
        ? `<p class="note">${e(completionStore.getIssue())}</p>`
        : '',
      dynamic_9: p.units
        .map((u) => {
          const ls = p.items.filter((l) => l.unit === u.id);
          return `<section class="course-unit"><h2>Unit ${u.number || u.id}: ${e(u.title)}</h2><p>${ls.filter((l) => l.completed).length}/${ls.length} lessons complete${ls.some((l) => l.needsRevision) ? '. Some topics need revision.' : '.'}</p><div class="progress-lessons">${ls.map((l) => `<article><div><h3><a href="#${course === 'prld' ? 'lesson' : 'db-lesson'}/${l.id}">${e(l.title)}</a></h3><p>Quiz ${l.correct}/${l.total}; ${l.attempted} checked. ${course === 'prld' ? 'Debugging ' + (l.debugReady ? 'passed' : 'not passed') + '.' : ''}</p></div><strong class="progress-state">${l.status}</strong></article>`).join('')}</div></section>`;
        })
        .join(''),
    });
    const dialog = view.querySelector('#progress-reset-dialog');
    view.querySelector('#reset-completion').onclick = () => dialog.showModal();
    view.querySelector('#keep-completion').onclick = () => dialog.close();
    view.querySelector('#confirm-reset-completion').onclick = () => {
      dialog.close();
      if (completionStore.reset()) draw();
      else
        view.querySelector('#progress-reset-status').textContent =
          completionStore.getIssue();
    };
    sidebar();
  };
  draw();
}
