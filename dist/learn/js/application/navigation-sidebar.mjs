// Module navigation, sidebar rendering and topic filtering.
import {
  newCourseSidebar,
  courseForLesson,
} from '../csharp/csharp-and-docker-pages.mjs?v=breadcrumb-58';
import { courseLessons as csharpLessons } from '../csharp/course-outline-and-lessons.mjs?v=csharp-44';
import { dbUnits, dbLessons } from '../database/database-pages.mjs?v=breadcrumb-58';
import {
  units,
  lessons,
} from '../programming-logic/content/lessons-and-quizzes.mjs?v=40';
import { escapeHTML as e } from '../programming-logic/pseudocode-parser-and-diagrams.mjs?v=40';
import { wedeSidebar } from '../web-development/web-development-pages.mjs?v=wede-62';
export function createNavigationSidebar({
  getActiveModule,
  setActiveModule,
  getActiveLesson,
}) {
  const $ = (selector) => document.querySelector(selector);
  function sidebar(unit) {
    let activeModule = getActiveModule();
    const [newPage, newId] = location.hash.slice(1).split('/');
    const webRoute = newPage === 'wede' || newPage?.startsWith('wede-');
    const sharedWebRoute =
      activeModule === 'wede' &&
      [
        'study-break',
        'helpful-resources',
        'saved-work',
        'about',
        'backup',
        'progress',
      ].includes(newPage);
    if (webRoute || sharedWebRoute) {
      setActiveModule('wede');
      try {
        localStorage.setItem('studylab-module', 'wede');
      } catch {}
      wedeSidebar({ page: newPage, id: newId });
      filterTopics();
      return;
    }
    const isNewCourse =
      newPage?.startsWith('cs') ||
      (['study-break', 'helpful-resources', 'saved-work', 'about', 'backup'].includes(
        newPage,
      ) &&
        ['csharp', 'docker'].includes(activeModule));
    if (isNewCourse) {
      if (newPage === 'cs-lesson')
        activeModule = courseForLesson(csharpLessons.find((l) => l.id === newId));
      else if (newPage === 'cs-unit')
        activeModule = newId?.startsWith('docker-') ? 'docker' : 'csharp';
      else if (['csharp', 'docker'].includes(newId)) activeModule = newId;
      newCourseSidebar({ course: activeModule, page: newPage, id: newId });
      try {
        localStorage.setItem('studylab-module', activeModule);
      } catch {}
      setActiveModule(activeModule);
      filterTopics();
      return;
    }
    const page = location.hash.slice(1).split('/')[0] || 'home',
      shared = [
        'saved-work',
        'backup',
        'about',
        'progress',
        'normalisation',
        'nf-builder',
        'study-break',
        'helpful-resources',
      ].includes(page),
      advanced =
        page === 'db-advanced' ||
        (page === 'db-unit' && Number(location.hash.split('/')[1]) > 200) ||
        (page === 'db-lesson' && location.hash.includes('/advanced-')) ||
        ((shared || ['sql', 'db-practice', 'db-resources'].includes(page)) &&
          activeModule === 'advanced'),
      intermediate =
        !advanced &&
        (page === 'db-intermediate' ||
          (page === 'db-exams' && location.hash.split('/')[1] === 'intermediate') ||
          (page === 'db-unit' && Number(location.hash.split('/')[1]) > 100) ||
          (page === 'db-lesson' && location.hash.includes('/intermediate-')) ||
          ((shared || ['sql', 'db-practice', 'db-resources'].includes(page)) &&
            activeModule === 'intermediate')),
      database =
        advanced ||
        intermediate ||
        (shared ? activeModule === 'database' : page.startsWith('db') || page === 'sql');
    activeModule = advanced
      ? 'advanced'
      : intermediate
        ? 'intermediate'
        : database
          ? 'database'
          : 'prld';
    try {
      localStorage.setItem('studylab-module', activeModule);
    } catch {}
    setActiveModule(activeModule);
    $('#course-select').value = activeModule;
    $('#progress-link').href = '#progress/' + activeModule;
    $('#course-caption').textContent = advanced
      ? 'ADVANCED DATABASE'
      : intermediate
        ? 'DATA6222 INTERMEDIATE'
        : database
          ? 'DATA6211 TUTORIAL'
          : 'PRLD5121 TUTORIAL';
    $('.brand').href = advanced
      ? '#db-advanced'
      : intermediate
        ? '#db-intermediate'
        : database
          ? '#db'
          : '#home';
    const destinations = database
      ? {
          home: advanced ? 'db-advanced' : intermediate ? 'db-intermediate' : 'db',
          practice: 'db-practice',
          tools: 'sql',
          resources: 'db-resources',
        }
      : { home: 'home', practice: 'practice', tools: 'tools', resources: 'resources' };
    const group = [
      'tasks',
      'task',
      'activities',
      'activity',
      'exams',
      'db-practice',
      'db-exams',
      'normalisation',
      'nf-builder',
    ].includes(page)
      ? 'practice'
      : ['lab', 'trace', 'trace-guided', 'sql'].includes(page)
        ? 'tools'
        : ['db', 'db-intermediate', 'db-advanced'].includes(page)
          ? 'home'
          : page === 'db-resources'
            ? 'resources'
            : page;
    document.querySelectorAll('[data-page]').forEach((a) => {
      a.href = '#' + destinations[a.dataset.page];
      a.classList.toggle('active', a.dataset.page === group);
      if (a.dataset.page === group) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    const us = database
        ? dbUnits.filter((u) =>
            advanced ? u.id > 200 : intermediate ? u.id > 100 && u.id < 200 : u.id < 100,
          )
        : units,
      ls = database ? dbLessons : lessons;
    $('#unit-nav').innerHTML = us
      .map(
        (u) =>
          `<details class="topic-group" ${u.id === unit ? 'open' : ''}><summary>${e(u.title)}</summary><a class="unit-overview" href="#${database ? 'db-unit' : 'unit'}/${u.id}">Unit overview</a>${ls
            .filter((l) => l.unit === u.id)
            .map((l) => {
              const current = database
                ? location.hash === '#db-lesson/' + l.id
                : getActiveLesson()?.id === l.id && page === 'lesson';
              return `<a class="topic-link ${current ? 'active' : ''}" href="#${database ? 'db-lesson' : 'lesson'}/${l.id}" ${current ? 'aria-current="page"' : ''}>${e(l.title)}</a>`;
            })
            .join('')}</details>`,
      )
      .join('');
    filterTopics();
  }
  function filterTopics() {
    const q = $('#lesson-search').value.trim().toLowerCase();
    let matches = 0;
    document.querySelectorAll('.topic-group').forEach((group) => {
      let count = 0;
      group.querySelectorAll('.topic-link').forEach((a) => {
        a.hidden = !!q && !a.textContent.toLowerCase().includes(q);
        if (!a.hidden) count++;
      });
      group.hidden = !!q && !count;
      if (q) group.open = !!count;
      group.querySelector('.unit-overview').hidden = !!q;
      matches += count;
    });
    $('#search-empty').hidden = !!matches;
  }

  return { sidebar, filterTopics };
}
