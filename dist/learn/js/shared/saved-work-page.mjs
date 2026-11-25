// Saved-work listing and explicit clear-all interaction.
import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=breadcrumb-58';
import { workStore } from './saved-work-storage.mjs?v=40';
import { dbLessons } from '../database/database-pages.mjs?v=breadcrumb-58';
import { exercises as sqlChallenges } from '../database/sql/sql-practice-challenges.mjs?v=40';
import { taskBank } from '../programming-logic/content/practice-task-bank.mjs?v=40';
import { lessons } from '../programming-logic/content/lessons-and-quizzes.mjs?v=40';
import { activities } from '../programming-logic/content/interactive-activities.mjs?v=40';
import { escapeHTML as e } from '../programming-logic/pseudocode-parser-and-diagrams.mjs?v=40';
import { wedeLessons } from '../web-development/content/course.mjs';
export function savedWorkPage({ view, crumb, sidebar }) {
  const $ = (selector) => view.querySelector(selector);
  const seenSQL = new Set();
  const entries = workStore
    .list()
    .map((item) => {
      let title, href;
      if (item.key.startsWith('nf-builder:')) {
        const [, id, level] = item.key.split(':');
        title = 'Diagram builder: ' + id + ' (' + level + ')';
        href = '#nf-builder/' + id + '/' + level;
      } else if (item.key.startsWith('normalisation:')) {
        title = 'Dependency diagram: ' + item.key.slice(14);
        href = '#normalisation/' + item.key.slice(14);
      } else if (item.key.startsWith('db-exam:')) {
        const course = item.key.split(':')[1];
        title =
          course === 'intermediate' ? 'DATA6222 practice exam' : 'DATA6211 practice exam';
        href = '#db-exams/' + course;
      } else if (item.key === 'exam') {
        title = 'PRLD5121 practice exam';
        href = '#exams';
      } else if (item.key.startsWith('wede:')) {
        const lesson = wedeLessons.find((lesson) => lesson.id === item.key.slice(5));
        if (lesson) {
          title = 'Web Development · ' + lesson.title;
          href = '#wede-lesson/' + lesson.id;
        }
      } else if (item.key.startsWith('database:')) {
        const lesson = dbLessons.find(
          (l) => l.id === item.key.slice(9).split(':task-')[0],
        );
        if (lesson) {
          const savedTask = item.key.split(':task-')[1];
          title =
            'Databases: ' +
            lesson.title +
            (savedTask ? ' . Task ' + (Number(savedTask) + 1) : '');
          href = '#db-lesson/' + lesson.id + (savedTask ? '/task-' + savedTask : '');
        }
      } else if (
        item.key.startsWith('sqlchallenge:') ||
        item.key.startsWith('sqltask:')
      ) {
        const [kind, challengeId, dialect] = item.key.split(':');
        const challenge = sqlChallenges.find((t) => t.id === challengeId);
        if (challenge) {
          title = 'SQL challenge: ' + challenge.title;
          href = '#sql/challenge-' + challengeId + '/' + dialect;
        }
      } else if (item.key.startsWith('sql:')) {
        const [, data, mode] = item.key.split(':');
        title = 'SQL draft . ' + data + ' . ' + mode;
        href = '#sql/draft-' + data + '-' + mode;
      } else if (item.key === 'diagram') {
        title = 'Diagram lab draft';
        href = '#lab';
      } else if (item.key === 'tracer') {
        title = 'Interactive tracing draft';
        href = '#trace';
      } else if (item.key.startsWith('lesson:')) {
        const l = lessons.find((x) => x.id === item.key.slice(7));
        if (l) {
          title = l.title;
          href = '#lesson/' + l.id;
        }
      } else if (item.key.startsWith('task:')) {
        const t = taskBank.find((x) => x.id === item.key.slice(5));
        if (t) {
          title = t.title;
          href = '#task/' + t.id;
        }
      } else if (item.key.startsWith('activity:')) {
        const a = activities.find((x) => x.id === item.key.slice(9));
        if (a) {
          title = a.title;
          href = '#activity/' + a.id;
        }
      }
      return title ? { ...item, title, href } : null;
    })
    .filter((item) => {
      if (!item) return false;
      if (!item.key.startsWith('sqlchallenge:') && !item.key.startsWith('sqltask:'))
        return true;
      if (seenSQL.has(item.href)) return false;
      seenSQL.add(item.href);
      return true;
    });
  view.innerHTML =
    crumb('Saved work') +
    renderHtmlPage('studylab/saved-work', {
      dynamic_1: entries.length
        ? `<div class="saved-work-list">${entries.map((item) => `<article><div><h3>${e(item.title)}</h3><p>${item.unreadable ? 'This saved item could not be read.' : item.updatedAt ? 'Last saved: ' + e(new Date(item.updatedAt).toLocaleString()) : 'Saved date unavailable'}</p></div><a class="button secondary" href="${e(item.href)}">Continue</a></article>`).join('')}</div>`
        : '<p>No saved drafts or question attempts yet. Start an exercise or type in an editor, then return here.</p>',
    });
  $('#clear-saved-work').onclick = () => $('#clear-work-dialog').showModal();
  $('#cancel-clear-work').onclick = () => $('#clear-work-dialog').close();
  $('#confirm-clear-work').onclick = () => {
    if (workStore.clearAll()) location.reload();
    else {
      $('#clear-work-dialog').close();
      $('#clear-work-status').textContent =
        'Some saved work could not be removed. Try again after checking browser storage settings.';
    }
  };
  sidebar();
}
