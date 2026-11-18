// Programming home, practice hub, tools hub and public downloads.
import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=breadcrumb-58';
import { units, lessons } from './content/lessons-and-quizzes.mjs?v=40';
import { progressSummary } from '../shared/learning-progress.mjs?v=breadcrumb-58';
import { escapeHTML as e } from './pseudocode-parser-and-diagrams.mjs?v=40';
export function createProgrammingOverviewPages({ view, crumb, sidebar }) {
  const $ = (selector) => view.querySelector(selector);
  function dashboard() {
    view.innerHTML = renderHtmlPage('studylab/programming-home', {
      dynamic_1: progressSummary('prld'),
      dynamic_2: units
        .map(
          (u) =>
            `<article class="course-unit"><div class="course-unit-title"><span class="unit-badge">${String(u.id).padStart(2, '0')}</span><div><h2><a href="#unit/${u.id}">${e(u.title)}</a></h2><p>${e(u.subtitle)}</p><a class="text-link" href="#unit/${u.id}">Read unit overview</a></div></div><div class="course-lesson-links">${lessons
              .filter((l) => l.unit === u.id)
              .map((l) => `<a href="#lesson/${l.id}">${e(l.title)}</a>`)
              .join('')}</div></article>`,
        )
        .join(''),
    });
    sidebar();
  }
  function practiceHub() {
    view.innerHTML =
      crumb('Practice') +
      renderHtmlPage('studylab/programming-practice', {
        dynamic_1: [
          [
            'activities',
            'Quick exercises',
            'Fill a missing line, predict output, reorder statements or find an error.',
            'Try an exercise',
          ],
          [
            'tasks',
            'Write pseudocode',
            'Choose a topic and write your own solution. Compare with a worked answer.',
            'Choose a task',
          ],
          [
            'exams',
            'Practice exam',
            'Use a mixed question paper when you are ready for revision.',
            'Set up an exam',
          ],
        ]
          .map(
            ([url, title, text, action]) =>
              `<article class="panel hub-card"><h2>${title}</h2><p>${text}</p><a class="button" href="#${url}">${action}</a></article>`,
          )
          .join(''),
      });
    sidebar();
  }
  function toolsHub() {
    view.innerHTML =
      crumb('Code tools') +
      renderHtmlPage('studylab/code-tools', {
        dynamic_1: [
          [
            'lab',
            'Create a flowchart',
            'Write pseudocode and generate a flowchart or a Method call hierarchy.',
            'Open diagram tool',
          ],
          [
            'trace',
            'Run step by step',
            'Enter values and watch variables, decisions and output change.',
            'Open code tracer',
          ],
        ]
          .map(
            ([url, title, text, action]) =>
              `<article class="panel hub-card"><h2>${title}</h2><p>${text}</p><a class="button" href="#${url}">${action}</a></article>`,
          )
          .join(''),
      });
    sidebar();
  }
  function resourcesPage() {
    view.innerHTML =
      crumb('Downloads') +
      renderHtmlPage('studylab/programming-downloads', {
        dynamic_1: units
          .map(
            (u) =>
              `<article class="panel slide-download"><p class="eyebrow">LEARNING UNIT ${u.id}</p><h3>${e(u.title)}</h3><p>${e(u.subtitle)}</p><ul>${u.themes.map((t) => `<li>${e(t)}</li>`).join('')}</ul><a class="button secondary" href="./downloads/logiclab-unit-${u.id}.pptx?v=15" download>Download detailed Unit ${u.id} slides</a><a class="button secondary" href="./downloads/logiclab-unit-${u.id}-revision.pptx?v=15" download>Download Unit ${u.id} revision slides</a><small>Revision: 10 slides. Editable PowerPoint.</small></article>`,
          )
          .join(''),
      });
    function update() {
      const content = $('#pack-content').value,
        format = $('#pack-format').value,
        label =
          content === 'questions'
            ? 'questions'
            : content === 'answers'
              ? 'answers'
              : 'questions and answers';
      $('#pack-download').href = './downloads/logiclab-' + content + '.' + format;
      $('#pack-download').textContent =
        'Download ' + label + ' ' + (format === 'docx' ? 'Word' : 'PDF');
    }
    $('#pack-content').onchange = update;
    $('#pack-format').onchange = update;
    $('#download-pack').onsubmit = (event) => event.preventDefault();
    sidebar();
  }

  return { dashboard, practiceHub, toolsHub, resourcesPage };
}
