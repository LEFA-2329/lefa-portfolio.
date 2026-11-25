// Application composition root. Feature modules own their page state and events.
import { renderWedePage } from './web-development/web-development-pages.mjs?v=wede-67';
import { createNavigationSidebar } from './application/navigation-sidebar.mjs?v=wede-67';
import { createProgrammingLessonPages } from './programming-logic/programming-lesson-pages.mjs?v=breadcrumb-58';
import { createProgrammingTaskPages } from './programming-logic/programming-task-pages.mjs?v=breadcrumb-58';
import { createProgrammingOverviewPages } from './programming-logic/programming-overview-pages.mjs?v=breadcrumb-58';
import { savedWorkPage } from './shared/saved-work-page.mjs?v=wede-60';
import { diagramLabPage } from './programming-logic/pseudocode-diagram-page.mjs?v=breadcrumb-58';
import { guidedTracePage } from './programming-logic/guided-trace-page.mjs?v=breadcrumb-58';
import { progressBackupPage } from './shared/progress-backup-page.mjs?v=breadcrumb-58';
import {
  newCoursePage,
  courseForLesson,
  courseName,
} from './csharp/csharp-and-docker-pages.mjs?v=breadcrumb-58';
import {
  courseLessons as csharpLessons,
  courseUnits as csharpUnits,
} from './csharp/course-outline-and-lessons.mjs?v=csharp-44';
import {
  studyBreakPage,
  helpfulResourcesPage,
} from './shared/study-break-and-resources.mjs?v=wede-60';
import { renderHtmlPage } from '../../shared/render-html-page.mjs?v=wede-64';
import { builderPage } from './database/normalisation/normalisation-diagram-builder.mjs?v=40';
import { normalisationPracticePage } from './database/normalisation/normalisation-question-page.mjs?v=40';
import { databaseExamPage } from './database/database-exam-page.mjs?v=40';
import { progressPage } from './shared/learning-progress.mjs?v=wede-66';
import {
  databaseHome,
  databaseUnit,
  databaseLesson,
  databasePractice,
  databaseResources,
  dbLessons,
} from './database/database-pages.mjs?v=breadcrumb-58';
import { sqlPage } from './database/sql/sql-workspace-page.mjs?v=csharp-44';
import './shared/theme-settings.mjs?v=breadcrumb-58';
import { examPage } from './programming-logic/practice-exam-page.mjs?v=csharp-44';
import { workStore } from './shared/saved-work-storage.mjs?v=40';
import { activities } from './programming-logic/content/interactive-activities.mjs?v=40';
import {
  activitiesPage,
  activityPage,
} from './programming-logic/interactive-activities-page.mjs?v=40';
import { interactiveTracePage } from './programming-logic/pseudocode-tracer-page.mjs?v=40';
import { escapeHTML as e } from './programming-logic/pseudocode-parser-and-diagrams.mjs?v=40';
const $ = (s) => document.querySelector(s),
  view = $('#view');
let activeModule = 'prld';
try {
  activeModule = [
    'database',
    'intermediate',
    'advanced',
    'csharp',
    'docker',
    'wede',
  ].includes(localStorage.getItem('studylab-module'))
    ? localStorage.getItem('studylab-module')
    : 'prld';
} catch {}
let lastStudyRoute = '#home';
let lastStudyTitle = '';
new MutationObserver(() => {
  const page = location.hash.slice(1).split('/')[0];
  if (!['study-break', 'helpful-resources'].includes(page)) {
    lastStudyRoute = location.hash || '#home';
    lastStudyTitle = view.querySelector('h1')?.textContent || '';
  }
}).observe(view, { childList: true, subtree: true });
let carriedCode = null,
  carriedTraceCode = null;
let pageCleanup = () => {};
workStore.subscribe((status) => {
  const host = $('#work-save-status');
  if (!host) return;
  host.classList.toggle('save-warning', !!status.issue);
  host.querySelector('span').textContent =
    status.issue ||
    (status.saved
      ? 'Saved in this browser.'
      : 'Your drafts save automatically in this browser.');
});
function crumb(label) {
  return `<p class="breadcrumb"><a href="${activeModule === 'wede' ? '#wede' : '#home'}">Learning space</a><span>/</span><strong>${e(label)}</strong></p>`;
}
const openDiagram = (code) => {
  carriedCode = code;
  location.hash = 'lab';
};
const { sidebar, filterTopics } = createNavigationSidebar({
  getActiveModule: () => activeModule,
  setActiveModule: (course) => {
    activeModule = course;
  },
  getActiveLesson: () => lessonPages.getActiveLesson(),
});
const lessonPages = createProgrammingLessonPages({ view, crumb, sidebar, openDiagram });
const { unitPage, lessonPage } = lessonPages;
const { tasksPage, taskPage } = createProgrammingTaskPages({
  view,
  crumb,
  sidebar,
  openDiagram,
});
const { dashboard, practiceHub, toolsHub, resourcesPage } =
  createProgrammingOverviewPages({ view, crumb, sidebar });

// Keep cross-page handoff here; the diagram feature owns its local UI state.
function labPage() {
  diagramLabPage({
    view,
    crumb,
    sidebar,
    initialCode: carriedCode,
    openTrace: (code) => {
      carriedTraceCode = code;
      location.hash = 'trace';
    },
  });
  carriedCode = null;
}
function tracePage() {
  interactiveTracePage({
    view,
    crumb,
    sidebar,
    initialCode: carriedTraceCode,
    openDiagram: (code) => {
      carriedCode = code;
      location.hash = 'lab';
    },
  });
  carriedTraceCode = null;
}
// Downloadable teaching material
// Saved work and privacy
function about() {
  view.innerHTML =
    crumb('About & privacy') + renderHtmlPage('studylab/about-and-privacy', {});
  sidebar();
}
// Route dispatch and global controls
function route() {
  pageCleanup();
  pageCleanup = () => {};
  document.body.classList.remove('menu-open');
  $('#menu-toggle').setAttribute('aria-expanded', 'false');
  document.body.classList.remove('print-diagram');
  const [page, id, task] = location.hash.slice(1).split('/');
  if (
    page === 'progress' &&
    ['prld', 'database', 'intermediate', 'advanced', 'wede'].includes(id)
  )
    activeModule = id;
  const webRoute = page === 'wede' || page?.startsWith('wede-');
  if (webRoute) {
    activeModule = 'wede';
    sidebar();
    renderWedePage({ view, page, id, section: task });
  } else if (page?.startsWith('cs')) {
    if (page === 'cs-lesson')
      activeModule = courseForLesson(csharpLessons.find((l) => l.id === id));
    else if (page === 'cs-unit')
      activeModule = id?.startsWith('docker-') ? 'docker' : 'csharp';
    else activeModule = id === 'docker' ? 'docker' : 'csharp';
    sidebar();
    newCoursePage({ view, page, id, course: activeModule });
  } else if (page === 'study-break') {
    sidebar();
    pageCleanup = studyBreakPage({ view, returnTo: lastStudyRoute });
  } else if (page === 'helpful-resources') {
    sidebar();
    helpfulResourcesPage({
      view,
      course: activeModule,
      title: lastStudyTitle,
      returnTo: lastStudyRoute,
    });
  } else if (page === 'nf-builder') {
    if (activeModule === 'prld') activeModule = 'database';
    builderPage({ view, sidebar, id, level: task });
  } else if (page === 'normalisation') {
    if (activeModule === 'prld') activeModule = 'database';
    normalisationPracticePage({ view, sidebar, id });
  } else if (page === 'progress') progressPage({ view, sidebar, course: activeModule });
  else if (page === 'db-exams')
    pageCleanup = databaseExamPage({
      view,
      crumb,
      sidebar,
      course: id === 'intermediate' ? 'intermediate' : 'database',
    });
  else if (page === 'db' || page === 'db-intermediate' || page === 'db-advanced')
    databaseHome({ view, sidebar });
  else if (page === 'db-unit') databaseUnit({ view, id, sidebar });
  else if (page === 'db-lesson') databaseLesson({ view, id, task, sidebar });
  else if (page === 'db-practice') databasePractice({ view, sidebar });
  else if (page === 'db-resources') databaseResources({ view, sidebar });
  else if (page === 'sql')
    pageCleanup = sqlPage({ view, id, modeOverride: task, sidebar });
  else if (page === 'practice') practiceHub();
  else if (page === 'tools') toolsHub();
  else if (page === 'exams') pageCleanup = examPage({ view, crumb, sidebar });
  else if (page === 'unit') unitPage(id);
  else if (page === 'lesson') lessonPage(id);
  else if (page === 'resources') resourcesPage();
  else if (page === 'activities') activitiesPage({ view, crumb, sidebar });
  else if (page === 'activity') activityPage({ id, view, crumb, sidebar });
  else if (page === 'tasks') tasksPage();
  else if (page === 'task') taskPage(id);
  else if (page === 'lab') labPage();
  else if (page === 'trace') tracePage();
  else if (page === 'trace-guided') guidedTracePage({ view, crumb, sidebar });
  else if (page === 'backup') pageCleanup = progressBackupPage({ view, sidebar });
  else if (page === 'saved-work') savedWorkPage({ view, crumb, sidebar });
  else if (page === 'about') about();
  else dashboard();
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.title =
    (page === 'backup'
      ? 'Progress backup and restore'
      : page?.startsWith('cs')
        ? courseName(activeModule)
        : page === 'nf-builder'
          ? 'Dependency diagram builder'
          : page === 'normalisation'
            ? 'Dependency diagram practice'
            : page === 'progress'
              ? 'My progress'
              : page === 'db-exams'
                ? 'Database practice exams'
                : page === 'db-advanced'
                  ? 'Advanced Database'
                  : page === 'db-intermediate'
                    ? 'Database Intermediate . DATA6222'
                    : page === 'db'
                      ? 'Database Introduction'
                      : page === 'db-unit'
                        ? 'Database unit overview'
                        : page === 'db-lesson'
                          ? dbLessons.find((l) => l.id === id)?.title || 'Databases'
                          : page === 'db-practice'
                            ? 'Database practice'
                            : page === 'db-resources'
                              ? 'Database resources'
                              : page === 'sql'
                                ? 'SQL workspace'
                                : page === 'practice'
                                  ? 'Practice'
                                  : page === 'tools'
                                    ? 'Code tools'
                                    : page === 'lesson'
                                      ? lessonPages.getActiveLesson()?.title
                                      : page === 'lab'
                                        ? 'Diagram lab'
                                        : page === 'trace'
                                          ? 'Interactive tracing'
                                          : page === 'trace-guided'
                                            ? 'Guided traces'
                                            : page === 'saved-work'
                                              ? 'Saved work'
                                              : page === 'exams'
                                                ? 'Practice exams'
                                                : page === 'resources'
                                                  ? 'Study resources'
                                                  : page === 'activities'
                                                    ? 'Interactive exercises'
                                                    : page === 'activity'
                                                      ? 'Interactive exercise'
                                                      : page === 'tasks'
                                                        ? 'Practice tasks'
                                                        : page === 'task'
                                                          ? 'Practice task'
                                                          : webRoute
                                                            ? view.querySelector('h1')
                                                                ?.textContent ||
                                                              'Web Development'
                                                            : 'Programming Logic and Design') +
    ' | StudyLab';
  const report = $('#report-content');
  if (report) {
    report.href =
      'mailto:lazylefa@gmail.com?' +
      new URLSearchParams({
        subject: 'StudyLab content feedback',
        body:
          'Page: ' +
          location.href +
          '\n\nWhat is unclear or incorrect?\n\nWhat did you expect?\n',
      }).toString();
  }
  $('#main').focus({ preventScroll: true });
}
$('#menu-toggle').onclick = () => {
  const open = document.body.classList.toggle('menu-open');
  $('#menu-toggle').setAttribute('aria-expanded', open);
};
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.body.classList.remove('menu-open');
    $('#menu-toggle').setAttribute('aria-expanded', 'false');
  }
});
window.addEventListener('hashchange', route);
route();

$('#course-select').onchange = (event) => {
  $('#lesson-search').value = '';
  location.hash =
    event.target.value === 'wede'
      ? 'wede'
      : event.target.value === 'csharp'
        ? 'cs/csharp'
        : event.target.value === 'docker'
          ? 'cs/docker'
          : event.target.value === 'advanced'
            ? 'db-advanced'
            : event.target.value === 'intermediate'
              ? 'db-intermediate'
              : event.target.value === 'database'
                ? 'db'
                : 'home';
};
$('#lesson-search').addEventListener('input', filterTopics);
