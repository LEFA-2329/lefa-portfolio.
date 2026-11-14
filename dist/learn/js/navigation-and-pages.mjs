import { renderHtmlPage } from '../../shared/render-html-page.mjs?v=32';
import { builderPage } from './database/normalisation/normalisation-diagram-builder.mjs?v=32';
import { normalisationPracticePage } from './database/normalisation/normalisation-question-page.mjs?v=32';
import { databaseExamPage } from './database/database-exam-page.mjs?v=32';
import {
  progressPage,
  progressSummary,
  refreshLessonCompletion,
} from './shared/learning-progress.mjs?v=32';
import { exercises as sqlChallenges } from './database/sql/sql-practice-challenges.mjs?v=32';
import {
  databaseHome,
  databaseUnit,
  databaseLesson,
  databasePractice,
  databaseResources,
  dbUnits,
  dbLessons,
} from './database/database-pages.mjs?v=32';
import { sqlPage } from './database/sql/sql-workspace-page.mjs?v=32';
import './shared/theme-settings.mjs?v=32';
import { examPage } from './programming-logic/practice-exam-page.mjs?v=32';
import { workStore } from './shared/saved-work-storage.mjs?v=32';
import {
  cleanLesson,
  cleanTask,
  cleanDraft,
} from './shared/saved-programming-answers.mjs?v=32';
import { activities } from './programming-logic/content/interactive-activities.mjs?v=32';
import {
  activitiesPage,
  activityPage,
} from './programming-logic/interactive-activities-page.mjs?v=32';
import { interactiveTracePage } from './programming-logic/pseudocode-tracer-page.mjs?v=32';
import { taskBank } from './programming-logic/content/practice-task-bank.mjs?v=32';
import { units, lessons } from './programming-logic/content/lessons-and-quizzes.mjs?v=32';
import { practice } from './programming-logic/content/lesson-practice.mjs?v=32';
import {
  parse,
  flowchart,
  hierarchy,
  classDiagram,
  escapeHTML as e,
} from './programming-logic/pseudocode-parser-and-diagrams.mjs?v=32';
const $ = (s) => document.querySelector(s),
  view = $('#view');
let activeModule = 'prld';
try {
  activeModule = ['database', 'intermediate', 'advanced'].includes(
    localStorage.getItem('studylab-module'),
  )
    ? localStorage.getItem('studylab-module')
    : 'prld';
} catch {}
let carriedCode = null,
  carriedTraceCode = null;
let pageCleanup = () => {};
let states = new Map(),
  activeLesson = null,
  activeTab = 'theory';
// Application state and shared navigation
function persistLesson(l = activeLesson) {
  if (!l) return;
  const state = states.get(l.id);
  if (!state) return;
  state.tab = activeTab;
  workStore.write('lesson:' + l.id, cleanLesson(l, practice[l.id], state));
  refreshLessonCompletion(view, l.id, 'prld');
}
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
  return `<p class="breadcrumb"><a href="#home">Learning space</a><span>/</span><strong>${e(label)}</strong></p>`;
}
function sidebar(unit) {
  const page = location.hash.slice(1).split('/')[0] || 'home',
    shared = ['saved-work', 'about', 'progress', 'normalisation', 'nf-builder'].includes(
      page,
    ),
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
  $('#course-select').value = activeModule;
  $('#progress-link').href = '#progress/' + activeModule;
  $('#course-caption').textContent = advanced
    ? 'ADVANCED DATABASE'
    : intermediate
      ? 'DATA6222 INTERMEDIATE'
      : database
        ? 'DATA6211 TUTORIAL'
        : 'PRLD TUTORIAL';
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
              : activeLesson?.id === l.id && page === 'lesson';
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
// PRLD home, practice hub and unit pages
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
function unitPage(id) {
  const u = units.find((u) => u.id === Number(id));
  if (!u) {
    location.hash = 'home';
    return;
  }
  const ls = lessons.filter((l) => l.unit === u.id);
  view.innerHTML =
    crumb('Unit ' + u.id) +
    renderHtmlPage('studylab/programming-unit', {
      dynamic_1: u.id,
      dynamic_2: e(u.title),
      dynamic_3: e(u.subtitle),
      dynamic_4: e(u.subtitle),
      dynamic_5: u.themes.map((t) => `<li>${e(t)}</li>`).join(''),
      dynamic_6: ls
        .flatMap((l) => l.outcomes)
        .map((o) => `<li>${e(o)}</li>`)
        .join(''),
      dynamic_7: u.id,
      dynamic_8: u.id,
      dynamic_9: ls
        .map(
          (l, i) =>
            `<article class="lesson-row"><span class="sequence">${String(i + 1).padStart(2, '0')}</span><div><h3>${e(l.title)}</h3><p>${e(l.outcomes[0])}</p></div><a class="button secondary" href="#lesson/${l.id}">Open lesson</a></article>`,
        )
        .join(''),
    });
  sidebar(u.id);
}
function codeBlock(code, numbered = false) {
  return `<pre><code>${
    numbered
      ? code
          .split('\n')
          .map(
            (line, i) =>
              `<span class="line-code"><span class="ln">${i + 1}</span>${e(line)}</span>`,
          )
          .join('')
      : e(code)
  }</code></pre>`;
}
// PRLD lesson tabs, checks and practice
function lessonPage(id) {
  const l = lessons.find((l) => l.id === id);
  if (!l) {
    location.hash = 'home';
    return;
  }
  activeLesson = l;
  activeTab = 'theory';
  if (!states.has(id))
    states.set(
      id,
      workStore.read('lesson:' + id, cleanLesson(l, practice[id], {}), (raw) =>
        cleanLesson(l, practice[id], raw),
      ),
    );
  activeTab = states.get(id).tab;
  view.innerHTML =
    crumb(renderHtmlPage('studylab/programming-lesson', { dynamic_1: l.unit })) +
    renderHtmlPage('studylab/programming-lesson-2', {
      dynamic_1: l.unit,
      dynamic_2: e(l.title),
      dynamic_3: [
        ['theory', 'Learn'],
        ['quiz', 'Quiz'],
        ['debug', 'Find errors'],
        ['practice', 'Try it yourself'],
      ]
        .map(
          ([id, text]) =>
            `<button role="tab" id="tab-${id}" aria-controls="lesson-panel" data-tab="${id}">${text}</button>`,
        )
        .join(''),
      dynamic_4: l.outcomes.map((o) => `<li>${e(o)}</li>`).join(''),
      dynamic_5: l.unit,
      dynamic_6: l.unit,
      dynamic_7:
        lessons.indexOf(l) > 0
          ? `<a class="button secondary" href="#lesson/${lessons[lessons.indexOf(l) - 1].id}">Previous lesson</a>`
          : '<span></span>',
      dynamic_8:
        lessons.indexOf(l) < lessons.length - 1
          ? `<a class="button" href="#lesson/${lessons[lessons.indexOf(l) + 1].id}">Next lesson</a>`
          : '<a class="button" href="#practice">Continue to practice</a>',
    });
  document.querySelectorAll('[data-tab]').forEach((b) =>
    b.addEventListener('click', () => {
      activeTab = b.dataset.tab;
      persistLesson(l);
      renderLessonTab();
    }),
  );
  document.querySelector('.lesson-tabs').onkeydown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...document.querySelectorAll('[data-tab]')],
      i = tabs.findIndex((b) => b.dataset.tab === activeTab);
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? tabs.length - 1
          : (i + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].click();
    tabs[next].focus();
  };
  $('#print-lesson').onclick = () => window.print();
  renderLessonTab();
  sidebar(l.unit);
  refreshLessonCompletion(view, l.id, 'prld', true);
}
function renderLessonTab() {
  const l = activeLesson,
    s = states.get(l.id);
  document.querySelectorAll('[data-tab]').forEach((b) => {
    const selected = b.dataset.tab === activeTab;
    b.classList.toggle('active', selected);
    b.setAttribute('aria-selected', selected);
    b.tabIndex = selected ? 0 : -1;
  });
  const panel = $('#lesson-panel');
  panel.setAttribute('aria-labelledby', 'tab-' + activeTab);
  if (activeTab === 'theory') {
    panel.innerHTML = `<div class="theory">${l.sections.map((p) => `<h2>${e(p.heading)}</h2><p>${e(p.text)}</p>`).join('')}<h2>Worked example</h2><p>${l.diagram === 'class' ? 'This example describes a class model. Class notation is taught here separately from the flowchart lab’s supported syntax.' : e(l.examplePrompt || 'Follow the statements in order.')}</p>${codeBlock(l.example)}${l.exampleTrace ? `<h3>Walk through the example</h3><ol>${l.exampleTrace.map((t) => `<li>${e(t)}</li>`).join('')}</ol>` : ''}${l.diagram === 'none' ? '' : `<h2>${l.diagram === 'hierarchy' ? 'Module hierarchy' : l.diagram === 'class' ? 'Class diagram example' : 'Flowchart'}</h2><div class="diagram" id="lesson-diagram"></div><p class="muted" style="font-size:11px">${l.diagram === 'hierarchy' ? 'Arrows represent calls, not execution decisions. Uncalled methods are also displayed.' : l.diagram === 'class' ? 'An illustrative Learner-Course association. Minus means private; plus means public.' : 'Read labelled decisions and follow arrows. Scroll the diagram to inspect the full chart.'}</p>`}<h2>Another worked example: ${e(practice[l.id].worked.title)}</h2><p>${e(practice[l.id].worked.prompt)}</p>${codeBlock(practice[l.id].worked.code)}<h3>Expected behaviour</h3><p>${e(practice[l.id].worked.expected)}</p><h3>Think through the solution</h3><ol>${practice[l.id].teaching.map((t) => `<li>${e(t)}</li>`).join('')}</ol>${practice[l.id].tasks[0].diagram ? '<button class="button secondary" id="worked-lab">Explore this example in the diagram lab</button>' : ''}<div class="note">Convention: zero-based arrays; inclusive FOR bounds; TRUE/FALSE Boolean values. This is supplementary teaching content, not an institution-issued assessment.</div></div>`;
    if ($('#worked-lab'))
      $('#worked-lab').onclick = () => {
        carriedCode = practice[l.id].worked.code;
        location.hash = 'lab';
      };
    if (l.diagram !== 'none') {
      try {
        $('#lesson-diagram').innerHTML =
          l.diagram === 'class'
            ? classDiagram()
            : l.diagram === 'hierarchy'
              ? hierarchy(parse(l.example)).svg
              : flowchart(parse(l.example));
      } catch (err) {
        $('#lesson-diagram').textContent = err.message;
      }
    }
  } else if (activeTab === 'quiz') {
    const questions = [l.quiz, ...practice[l.id].quizzes];
    s.quizIndex ??= 0;
    s.quizChoices ??= [];
    s.quizResults ??= [];
    s.quizAttempts ??= [];
    const i = s.quizIndex,
      q = questions[i];
    panel.innerHTML = `<p class="eyebrow">KNOWLEDGE CHECK / QUESTION ${i + 1} OF ${questions.length}</p><p class="muted">Pass each question to complete this knowledge check. You can review and retry.</p><div class="quiz-navigation">${questions.map((_, j) => `<button class="button ${j === i ? '' : 'secondary'}" data-question="${j}" aria-label="Question ${j + 1}${s.quizResults[j] ? ', passed' : ''}">${j + 1}${s.quizResults[j] ? ' ✓' : ''}</button>`).join('')}</div><form id="quiz-form"><fieldset><legend>${e(q.question)}</legend>${q.options.map((option, j) => `<label class="quiz-option"><input required type="radio" name="quiz" value="${j}" ${s.quizChoices[i] === j ? 'checked' : ''}><span>${e(option)}</span></label>`).join('')}</fieldset><div class="button-row"><button class="button" type="submit">Check answer</button>${i < questions.length - 1 ? '<button class="button secondary" type="button" id="next-question">Next question</button>' : ''}</div><div class="feedback" role="status">${s.quizAttempts[i] ? `${s.quizResults[i] ? 'Correct.' : 'Not quite. Review and try again.'} ${e(q.explanation)}` : ''}</div></form>`;
    panel.querySelectorAll('[name="quiz"]').forEach(
      (input) =>
        (input.onchange = () => {
          s.quizChoices[i] = Number(input.value);
          s.quizAttempts[i] = false;
          s.quizResults[i] = false;
          s.quizPassed = false;
          panel.querySelector('.feedback').textContent =
            'Answer selected. Check this answer when you are ready.';
          persistLesson(l);
        }),
    );
    document.querySelectorAll('[data-question]').forEach(
      (b) =>
        (b.onclick = () => {
          s.quizIndex = Number(b.dataset.question);
          persistLesson(l);
          renderLessonTab();
        }),
    );
    if ($('#next-question'))
      $('#next-question').onclick = () => {
        s.quizIndex++;
        persistLesson(l);
        renderLessonTab();
      };
    $('#quiz-form').onsubmit = (event) => {
      event.preventDefault();
      s.quizChoices[i] = Number(new FormData(event.currentTarget).get('quiz'));
      s.quizAttempts[i] = true;
      s.quizResults[i] = s.quizChoices[i] === q.correct;
      s.quizPassed = questions.every((_, j) => s.quizResults[j] === true);
      persistLesson(l);
      renderLessonTab();
    };
  } else if (activeTab === 'practice') {
    s.taskIndex ??= 0;
    s.taskWork ??= {};
    s.taskAttempt ??= {};
    s.taskReveal ??= {};
    const tasks = practice[l.id].tasks,
      t = tasks[s.taskIndex];
    panel.innerHTML = `<p class="eyebrow">INDEPENDENT PRACTICE</p><p><a class="text-link" href="#tasks">Looking for more? Browse the task library</a></p><div class="quiz-navigation">${tasks.map((t, i) => `<button class="button ${i === s.taskIndex ? '' : 'secondary'}" data-task="${i}">Task ${i + 1}</button>`).join('')}</div><h2>${e(t.title)}</h2><p>${e(t.prompt)}</p><div class="note">This is a self-check task. The system does not automatically grade free-text explanations or arbitrary pseudocode. Write your attempt, then compare it with the model solution.</div><form id="task-form"><label class="field-label">Your answer or pseudocode<textarea id="task-work" class="editor" maxlength="10000" required minlength="20" placeholder="Explain your reasoning or write your pseudocode here...">${e(s.taskWork[t.id] || '')}</textarea></label><div class="button-row"><button class="button" type="submit">Submit my attempt</button><button type="button" class="button secondary" id="task-reveal" ${s.taskAttempt[t.id] ? '' : 'disabled'}>Reveal model solution</button>${t.diagram ? '<button type="button" class="button ghost" id="task-lab">Open my pseudocode in the lab</button>' : ''}</div><p id="task-status" class="feedback" role="status">${s.taskAttempt[t.id] ? 'Attempt saved in this browser. Compare your reasoning and test cases with the solution.' : ''}</p></form><div class="model-answer" id="task-solution" ${s.taskReveal[t.id] ? '' : 'hidden'}><h3>Model solution</h3>${codeBlock(t.solution)}<h3>Review your work</h3><ul>${t.checklist.map((c) => `<li>${e(c)}</li>`).join('')}</ul></div>`;
    document.querySelectorAll('[data-task]').forEach(
      (b) =>
        (b.onclick = () => {
          s.taskIndex = Number(b.dataset.task);
          persistLesson(l);
          renderLessonTab();
        }),
    );
    $('#task-work').oninput = (event) => {
      s.taskWork[t.id] = event.target.value;
      persistLesson(l);
    };
    $('#task-form').onsubmit = (event) => {
      event.preventDefault();
      const answer = $('#task-work').value.trim();
      if (answer.length < 20 || !/[a-z]{3}/i.test(answer)) {
        $('#task-status').textContent =
          'Write a meaningful attempt of at least 20 characters first.';
        return;
      }
      s.taskWork[t.id] = answer;
      s.taskAttempt[t.id] = true;
      persistLesson(l);
      renderLessonTab();
    };
    $('#task-reveal').onclick = () => {
      if (!s.taskAttempt[t.id]) return;
      s.taskReveal[t.id] = true;
      persistLesson(l);
      $('#task-solution').hidden = false;
    };
    if ($('#task-lab'))
      $('#task-lab').onclick = () => {
        carriedCode = $('#task-work').value;
        location.hash = 'lab';
      };
  } else if (activeTab === 'debug') {
    const b = l.bug;
    panel.innerHTML = `<p class="eyebrow">DEBUGGING CHALLENGE</p><h2>Find the error. Explain the fix.</h2><p class="muted" style="font-size:12px">This focused snippet contains one deliberate error. Unless the task says otherwise, assume omitted declarations and input setup have already been supplied. Select its line, category and correction. The model answer unlocks after a complete attempt.</p><p class="note"><strong>Requirement:</strong> ${e(b.prompt || b.explanation)}</p>${codeBlock(b.code, true)}<form id="debug-form"><div class="debug-fields"><label class="field-label">Faulty line<select name="line" required><option value="">Choose a line</option>${b.code
      .split('\n')
      .map(
        (_, i) =>
          `<option value="${i + 1}" ${s.line === i + 1 ? 'selected' : ''}>Line ${i + 1}</option>`,
      )
      .join(
        '',
      )}</select></label><label class="field-label">Error category<select name="category" required><option value="">Choose a category</option>${['Syntax', 'Logic', 'Calculation', 'Boundary', 'Initialisation', 'Design'].map((c) => `<option ${s.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></label></div><fieldset><legend style="font-size:13px">Which correction fixes the stated problem?</legend>${b.options.map((o, i) => `<label class="quiz-option"><input type="radio" name="correction" value="${i}" required ${s.correction === i ? 'checked' : ''}><span>${e(o)}</span></label>`).join('')}</fieldset><div class="button-row"><button type="submit" class="button">Check my attempt</button><button type="button" class="button secondary" id="debug-hint" ${s.debugAttempts ? '' : 'disabled'}>Get a hint</button><button type="button" class="button ghost" id="reveal-answer" ${s.debugAttempts ? '' : 'disabled'}>Reveal model answer</button></div><div id="debug-feedback" role="status" class="feedback">${s.debugFeedback ? e(s.debugFeedback) : ''}</div><div id="debug-hint-text" class="note" ${s.debugHintShown ? '' : 'hidden'}>${s.debugHintShown ? e(b.hint) : ''}</div><div id="model-answer" class="model-answer" ${s.debugRevealed ? '' : 'hidden'}><h3>Model answer</h3><p>Line ${b.line} · ${e(b.category)} error</p><code>${e(b.options[b.correct])}</code><p>${e(b.explanation)}</p></div></form>`;
    $('#debug-form').onchange = () => {
      const fd = new FormData($('#debug-form'));
      s.line = fd.get('line') ? Number(fd.get('line')) : null;
      s.category = String(fd.get('category') || '');
      s.correction = fd.get('correction') === null ? null : Number(fd.get('correction'));
      s.debugChecked = false;
      s.bugPassed = false;
      s.debugFeedback = 'Answer changed. Check your attempt when you are ready.';
      $('#debug-feedback').textContent = s.debugFeedback;
      persistLesson(l);
    };
    $('#debug-form').onsubmit = (event) => {
      event.preventDefault();
      const fd = new FormData(event.currentTarget);
      if (!fd.get('line') || !fd.get('category') || fd.get('correction') === null) return;
      s.line = Number(fd.get('line'));
      s.category = String(fd.get('category'));
      s.correction = Number(fd.get('correction'));
      s.debugAttempts = Math.min(10000, s.debugAttempts + 1);
      s.debugChecked = true;
      const checks = [
        s.line === b.line,
        (b.acceptedCategories || [b.category]).includes(s.category),
        s.correction === b.correct,
      ];
      const score = checks.filter(Boolean).length;
      s.bugPassed = score === 3;
      s.debugFeedback = `${score} of 3 parts correct. Line: ${checks[0] ? 'correct' : 'review it'}. Category: ${checks[1] ? 'correct' : 'review it'}. Correction: ${checks[2] ? 'correct' : 'review it'}. ${score === 3 ? 'Well done. You can now read the full explanation.' : 'Try again, request a hint or reveal the model answer.'}`;
      $('#debug-feedback').textContent = s.debugFeedback;
      $('#debug-hint').disabled = false;
      $('#reveal-answer').disabled = false;
      persistLesson(l);
    };
    $('#debug-hint').onclick = () => {
      if (!s.debugAttempts) return;
      s.debugHintShown = true;
      persistLesson(l);
      $('#debug-hint-text').hidden = false;
      $('#debug-hint-text').textContent = b.hint;
    };
    $('#reveal-answer').onclick = () => {
      if (s.debugAttempts) {
        s.debugRevealed = true;
        persistLesson(l);
        $('#model-answer').hidden = false;
      }
    };
  }
}
const samples = {
  'Pass or revise':
    'BEGIN\n  DECLARE mark AS NUM\n  INPUT mark\n  IF mark >= 50 THEN\n    OUTPUT "Pass"\n  ELSE\n    OUTPUT "Revise and try again"\n  ENDIF\nEND',
  'Counted loop':
    'BEGIN\n  DECLARE total AS NUM\n  DECLARE value AS NUM\n  DECLARE i AS INTEGER\n  SET total = 0\n  FOR i = 1 TO 3\n    INPUT value\n    SET total = total + value\n  ENDFOR\n  OUTPUT total\nEND',
  'Sentinel input':
    'BEGIN\n  DECLARE value AS NUM\n  INPUT value\n  WHILE value <> -1 DO\n    OUTPUT value\n    INPUT value\n  ENDWHILE\nEND',
  'Post-test loop':
    'BEGIN\n  DECLARE age AS INTEGER\n  REPEAT\n    INPUT age\n  UNTIL age >= 0\n  OUTPUT age\nEND',
  'CASE menu':
    'BEGIN\n  DECLARE choice AS INTEGER\n  INPUT choice\n  CASE choice OF\n    WHEN 1:\n      OUTPUT "Add"\n    WHEN 2:\n      OUTPUT "Edit"\n    OTHERWISE:\n      OUTPUT "Unknown choice"\n  ENDCASE\nEND',
  'Module hierarchy':
    'METHOD doubleValue(value AS NUM) RETURNS NUM\n  RETURN value * 2\nENDMETHOD\nMETHOD showResult(result AS NUM)\n  OUTPUT result\nENDMETHOD\nBEGIN\n  DECLARE value AS NUM\n  DECLARE result AS NUM\n  INPUT value\n  SET result = doubleValue(value)\n  CALL showResult(result)\nEND',
};
let currentSVG = '',
  lastAst = null;
function downloadBlob(bytes, type, name) {
  const url = URL.createObjectURL(new Blob([bytes], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
// Pseudocode diagrams and tracing
function labPage() {
  const savedDraft = workStore.read('diagram', null, (raw) => cleanDraft(raw));
  const importingCode = carriedCode !== null;
  view.innerHTML =
    crumb('Diagram lab') +
    renderHtmlPage('studylab/pseudocode-diagram-lab', {
      dynamic_1: Object.keys(samples)
        .map((s) => `<option>${e(s)}</option>`)
        .join(''),
      dynamic_2: e(carriedCode ?? savedDraft?.code ?? samples['Pass or revise']),
    });
  sidebar();
  const editor = $('#pseudocode'),
    type = $('#lab-type'),
    module = $('#lab-module'),
    status = $('#lab-status');
  currentSVG = '';
  lastAst = null;
  if (!importingCode && savedDraft) type.value = savedDraft.type;
  module.disabled = type.value === 'hierarchy';
  carriedCode = null;
  function persistLab() {
    workStore.write('diagram', { code: editor.value, type: type.value });
  }
  if (importingCode) persistLab();
  function invalidate() {
    currentSVG = '';
    lastAst = null;
    ['download-svg', 'download-png', 'diagram-pdf', 'fit-chart'].forEach(
      (id) => ($('#' + id).disabled = true),
    );
    $('#lab-diagram').innerHTML =
      '<div class="diagram-placeholder"><span>◇</span><p>Your code has changed. Generate a fresh diagram.</p></div>';
    status.textContent = '';
  }
  function draw() {
    try {
      lastAst = parse(editor.value);
      const selected = module.value;
      module.innerHTML =
        '<option value="main">Main program</option>' +
        lastAst.modules
          .map((m) => `<option value="${e(m.name)}">${e(m.name)}</option>`)
          .join('');
      if ([...module.options].some((o) => o.value === selected)) module.value = selected;
      let notice = '';
      if (type.value === 'hierarchy') {
        const result = hierarchy(lastAst);
        currentSVG = result.svg;
        if (result.missing.length)
          notice =
            ' Undefined calls: ' +
            result.missing.join(', ') +
            '. These are shown without a definition.';
      } else currentSVG = flowchart(lastAst, module.value);
      $('#lab-diagram').innerHTML = currentSVG;
      $('#lab-diagram').classList.remove('fit');
      $('#fit-chart').textContent = 'Fit width';
      status.textContent = 'Diagram generated from the supported syntax.' + notice;
      module.disabled = type.value === 'hierarchy';
      ['download-svg', 'download-png', 'diagram-pdf', 'fit-chart'].forEach(
        (id) => ($('#' + id).disabled = false),
      );
    } catch (err) {
      currentSVG = '';
      $('#lab-diagram').innerHTML =
        '<div class="diagram-placeholder"><span>!</span><p>Check the editor feedback, correct the code and try again.</p></div>';
      status.textContent = err.message;
      ['download-svg', 'download-png', 'diagram-pdf', 'fit-chart'].forEach(
        (id) => ($('#' + id).disabled = true),
      );
    }
  }
  $('#lab-example').onchange = (event) => {
    editor.value = samples[event.target.value];
    type.value = event.target.value === 'Module hierarchy' ? 'hierarchy' : 'flow';
    module.value = 'main';
    invalidate();
    persistLab();
  };
  editor.oninput = () => {
    invalidate();
    persistLab();
  };
  type.onchange = () => {
    module.disabled = type.value === 'hierarchy';
    invalidate();
    persistLab();
  };
  $('#generate-chart').onclick = draw;
  $('#trace-my-code').onclick = () => {
    carriedTraceCode = editor.value;
    location.hash = 'trace';
  };
  module.onchange = draw;
  $('#download-svg').onclick = () => {
    if (currentSVG) downloadBlob(currentSVG, 'image/svg+xml', 'StudyLab-diagram.svg');
  };
  $('#fit-chart').onclick = () => {
    const fit = $('#lab-diagram').classList.toggle('fit');
    $('#fit-chart').textContent = fit ? 'Actual size' : 'Fit width';
  };
  $('#download-png').onclick = async () => {
    if (!currentSVG) return;
    const button = $('#download-png');
    button.disabled = true;
    try {
      const svg = currentSVG;
      const img = new Image(),
        url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      try {
        await new Promise((res, rej) => {
          img.onload = res;
          img.onerror = rej;
          img.src = url;
        });
        const scale = Math.min(
          2,
          6000 / img.width,
          10000 / img.height,
          Math.sqrt(18000000 / (img.width * img.height)),
        );
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'));
        if (!blob) throw Error();
        downloadBlob(blob, 'image/png', 'StudyLab-diagram.png');
        status.textContent = 'PNG prepared. Check your downloads.';
      } finally {
        URL.revokeObjectURL(url);
      }
    } catch {
      status.textContent = 'PNG could not be created. Try the SVG download instead.';
    } finally {
      button.disabled = !currentSVG;
    }
  };
  $('#diagram-pdf').onclick = () => {
    if (!currentSVG) return;
    document.body.classList.add('print-diagram');
    window.print();
  };
  window.onafterprint = () => document.body.classList.remove('print-diagram');
}
function traceData(kind) {
  if (kind === 'sum') {
    let states = [
      {
        line: 1,
        vars: { total: 0, i: '-' },
        output: '',
        note: 'Initialise total before the loop.',
      },
    ];
    let total = 0;
    for (let i = 1; i <= 3; i++) {
      states.push({
        line: 2,
        vars: { total, i },
        output: '',
        note: `The loop condition is true for i = ${i}.`,
      });
      total += i;
      states.push({
        line: 3,
        vars: { total, i },
        output: '',
        note: `Add ${i} to the running total.`,
      });
    }
    states.push(
      {
        line: 2,
        vars: { total, i: 4 },
        output: '',
        note: 'i is now 4. The upper bound is 3, so the loop ends.',
      },
      {
        line: 5,
        vars: { total, i: 4 },
        output: String(total),
        note: 'Display the final total after the loop.',
      },
    );
    return {
      code: 'SET total = 0\nFOR i = 1 TO 3\n  SET total = total + i\nENDFOR\nOUTPUT total',
      states,
    };
  }
  if (kind === 'search') {
    const a = [8, 3, 11, 5],
      states = [
        {
          line: 1,
          vars: { i: 0, foundAt: -1 },
          array: a,
          compare: [],
          output: '',
          note: 'Search for 11. Initialise the result to -1.',
        },
      ];
    for (let i = 0; i < a.length; i++) {
      states.push({
        line: 3,
        vars: { i, foundAt: i > 2 ? 2 : -1 },
        array: a,
        compare: [i],
        output: '',
        note: `Compare values[${i}] (${a[i]}) with 11.`,
      });
      if (a[i] === 11)
        states.push({
          line: 4,
          vars: { i, foundAt: i },
          array: a,
          compare: [i],
          output: '',
          note: 'A match is found at index 2. Store its position.',
        });
    }
    states.push({
      line: 7,
      vars: { i: 4, foundAt: 2 },
      array: a,
      compare: [],
      output: '2',
      note: 'The full traversal is complete. Display the match position.',
    });
    return {
      code: 'SET foundAt = -1\nFOR i = 0 TO 3\n  IF values[i] = 11 THEN\n    SET foundAt = i\n  ENDIF\nENDFOR\nOUTPUT foundAt',
      states,
    };
  }
  const a = [5, 2, 4, 1],
    states = [
      {
        line: 1,
        vars: { pass: 0, j: '-' },
        array: [...a],
        compare: [],
        output: '',
        note: 'Start with four unsorted values.',
      },
    ];
  for (let p = 0; p < a.length - 1; p++)
    for (let j = 0; j < a.length - 1 - p; j++) {
      states.push({
        line: 3,
        vars: { pass: p, j },
        array: [...a],
        compare: [j, j + 1],
        output: '',
        note: `Compare adjacent values ${a[j]} and ${a[j + 1]}.`,
      });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        states.push({
          line: 6,
          vars: { pass: p, j },
          array: [...a],
          compare: [j, j + 1],
          output: '',
          note: 'Swap the pair using a temporary value.',
        });
      }
    }
  states.push({
    line: 10,
    vars: { pass: 3, j: '-' },
    array: [...a],
    compare: [],
    output: a.join(', '),
    note: 'The array is now sorted in ascending order.',
  });
  return {
    code: 'FOR pass = 0 TO 2\n  FOR j = 0 TO 2 - pass\n    IF values[j] > values[j + 1] THEN\n      SET temp = values[j]\n      SET values[j] = values[j + 1]\n      SET values[j + 1] = temp\n    ENDIF\n  ENDFOR\nENDFOR\nOUTPUT values',
    states,
  };
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
function guidedTracePage() {
  view.innerHTML =
    crumb('Visual step-through') +
    `<p class="eyebrow">WATCH THE PROGRAM STATE</p><h1>Slow it down. See every change.</h1><p class="lede">These guided traces use fixed examples. They do not execute arbitrary pasted pseudocode.</p><label class="field-label" style="max-width:400px">Choose an algorithm<select id="trace-example"><option value="sum">A loop and a running total</option><option value="search">Linear search in an array</option><option value="sort">Bubble sort, one comparison at a time</option></select></label><div id="trace-view"></div>`;
  sidebar();
  let step = 0,
    data = traceData('sum');
  function render() {
    const s = data.states[step];
    $('#trace-view').innerHTML =
      `<div class="trace-grid"><section class="panel"><h2>The algorithm</h2><pre><code>${data.code
        .split('\n')
        .map(
          (line, i) =>
            `<span class="line-code ${i + 1 === s.line ? 'trace-current' : ''}"><span class="ln">${i + 1}</span>${e(line)}</span>`,
        )
        .join(
          '',
        )}</code></pre><div class="button-row"><button class="button secondary" id="trace-prev" ${step === 0 ? 'disabled' : ''}>Previous step</button><button class="button" id="trace-next" ${step === data.states.length - 1 ? 'disabled' : ''}>Next step</button><button class="button secondary" id="trace-reset">Restart</button></div><p class="status" role="status">Step ${step + 1} of ${data.states.length}</p></section><section class="panel"><h2>Current state</h2><div class="trace-variables">${Object.entries(
        s.vars,
      )
        .map(
          ([key, value]) =>
            `<div class="variable"><span>${e(key)}</span><strong>${e(value)}</strong></div>`,
        )
        .join(
          '',
        )}</div>${s.array ? `<div class="array-cells">${s.array.map((v, i) => `<div class="array-cell ${s.compare.includes(i) ? 'compare' : ''}"><small style="font-size:9px;display:block;color:#87909c">[${i}]</small>${v}</div>`).join('')}</div>` : ''}<p class="trace-description" role="status">${e(s.note)}</p><h3 style="font-size:12px">Output</h3><div class="trace-output">${e(s.output || 'No output yet')}</div><h3 style="font-size:12px;margin-top:25px">Trace history</h3><div class="scroll-table"><table class="trace-history"><thead><tr><th>Step</th><th>Line</th><th>Variables</th></tr></thead><tbody>${data.states
        .slice(0, step + 1)
        .map(
          (t, i) =>
            `<tr><td>${i + 1}</td><td>${t.line}</td><td>${e(
              Object.entries(t.vars)
                .map(([k, v]) => k + ' = ' + v)
                .join(', '),
            )}</td></tr>`,
        )
        .join('')}</tbody></table></div></section></div>`;
    $('#trace-prev').onclick = () => {
      step--;
      render();
    };
    $('#trace-next').onclick = () => {
      step++;
      render();
    };
    $('#trace-reset').onclick = () => {
      step = 0;
      render();
    };
  }
  $('#trace-example').onchange = (event) => {
    data = traceData(event.target.value);
    step = 0;
    render();
  };
  render();
}
const libraryWork = new Map();
let taskFilters = { query: '', topic: 'All topics', level: 'All levels' };
// Standalone practice-task library
function libraryState(id) {
  if (!libraryWork.has(id))
    libraryWork.set(id, workStore.read('task:' + id, cleanTask({}), cleanTask));
  return libraryWork.get(id);
}
function tasksPage() {
  view.innerHTML =
    crumb('Practice tasks') +
    `<p class="eyebrow">YOUR SPACE TO PRACTISE</p><h1>Small tasks. Stronger understanding.</h1><p class="lede">Choose a topic, try a question, then compare your thinking with a model solution. These 53 library tasks extend the 44 tasks inside your lessons.</p><div class="button-row"><a class="button secondary" href="#activities">Try interactive exercises</a><a class="button secondary" href="#resources">Download questions and answers</a></div><div class="task-filters panel"><label class="field-label">Search tasks<input id="task-search" type="search" placeholder="Try average, array or method" value="${e(taskFilters.query)}"></label><label class="field-label">Topic<select id="task-topic">${['All topics', ...new Set(taskBank.map((t) => t.topic))].map((x) => `<option ${x === taskFilters.topic ? 'selected' : ''}>${e(x)}</option>`).join('')}</select></label><label class="field-label">Difficulty<select id="task-level">${['All levels', 'Foundation', 'Developing', 'Challenge'].map((x) => `<option ${x === taskFilters.level ? 'selected' : ''}>${x}</option>`).join('')}</select></label><button class="button secondary" id="clear-filters">Clear filters</button></div><p class="task-count" id="task-count" role="status"></p><div class="task-grid" id="task-results"></div><div class="note">Work at your own pace. Written answers are self-checked, not automatically graded. Drafts save automatically in this browser when storage is available. Use Saved work to review or clear them.</div>`;
  function results() {
    const query = taskFilters.query.trim().toLowerCase();
    const list = taskBank.filter(
      (t) =>
        (taskFilters.topic === 'All topics' || t.topic === taskFilters.topic) &&
        (taskFilters.level === 'All levels' || t.level === taskFilters.level) &&
        (!query || [t.title, t.prompt, t.topic].join(' ').toLowerCase().includes(query)),
    );
    $('#task-count').textContent =
      `${list.length} ${list.length === 1 ? 'task' : 'tasks'} found`;
    $('#task-results').innerHTML = list.length
      ? list
          .map(
            (t) =>
              `<article class="task-card"><div class="task-badges"><span class="topic-badge">${e(t.topic)}</span><span class="level-badge ${t.level.toLowerCase()}">${e(t.level)}</span></div><h2>${e(t.title)}</h2><p>${e(t.prompt)}</p><div class="task-card-bottom"><span>${t.diagram ? 'Diagram-ready pseudocode' : 'Written practice'}</span><a class="button secondary" href="#task/${t.id}">Try task</a></div></article>`,
          )
          .join('')
      : '<div class="panel empty-state"><h2>No matching tasks</h2><p>Try another keyword or clear the filters to see every task.</p></div>';
  }
  $('#task-search').oninput = (event) => {
    taskFilters.query = event.target.value;
    results();
  };
  $('#task-topic').onchange = (event) => {
    taskFilters.topic = event.target.value;
    results();
  };
  $('#task-level').onchange = (event) => {
    taskFilters.level = event.target.value;
    results();
  };
  $('#clear-filters').onclick = () => {
    taskFilters = { query: '', topic: 'All topics', level: 'All levels' };
    $('#task-search').value = '';
    $('#task-topic').value = 'All topics';
    $('#task-level').value = 'All levels';
    results();
  };
  results();
  sidebar();
}
function taskPage(id) {
  const t = taskBank.find((t) => t.id === id);
  if (!t) {
    location.hash = 'tasks';
    return;
  }
  const s = libraryState(id);
  view.innerHTML =
    crumb('Practice / ' + t.topic) +
    `<div class="resource-links"><a class="text-link" href="#tasks">Back to task library</a><a class="text-link" href="#resources">Download study packs</a></div><div class="task-badges" style="margin-top:22px"><span class="topic-badge">${e(t.topic)}</span><span class="level-badge ${t.level.toLowerCase()}">${e(t.level)}</span></div><h1>${e(t.title)}</h1><p class="lede">${e(t.prompt)}</p><div class="task-workspace"><section class="panel"><p class="eyebrow">1. WRITE YOUR ATTEMPT</p><h2>Think it through</h2><p>Write pseudocode, a trace or an explanation as requested. Include at least one test case.</p><form id="library-form"><label class="field-label" for="library-answer">Your answer</label><textarea class="editor" id="library-answer" spellcheck="false" required minlength="20" maxlength="20000" placeholder="Start your answer here...">${e(s.work)}</textarea><div class="button-row"><button class="button" type="submit">Submit my attempt</button>${t.diagram ? '<button class="button secondary" type="button" id="library-lab">Open my code in diagram lab</button>' : ''}<button class="button ghost" type="button" id="copy-work">Copy my answer</button></div><p class="feedback" id="library-status" role="status">${s.attempted ? 'Attempt recorded. You can now reveal and compare the model solution.' : ''}</p></form></section><section class="panel solution-panel"><p class="eyebrow">2. COMPARE AND IMPROVE</p><h2>Model solution</h2><p>Try the task before revealing the answer. There can be more than one correct solution.</p><button class="button secondary" id="library-reveal" ${s.attempted ? '' : 'disabled'}>Reveal model solution</button><p class="solution-lock" id="solution-lock" ${s.attempted ? 'hidden' : ''}>Submit a meaningful attempt of at least 20 characters to unlock this solution.</p><div id="library-solution" ${s.revealed ? '' : 'hidden'}>${codeBlock(t.solution)}<h3>Check your reasoning</h3><ul>${t.checklist.map((c) => `<li>${e(c)}</li>`).join('')}</ul></div><div class="note">Self-check practice: the system does not automatically mark free-text answers or prove your algorithm correct. Drafts save in this browser when storage is available. They do not sync across devices.</div></section></div>`;
  $('#library-answer').oninput = (event) => {
    s.work = event.target.value;
    workStore.write('task:' + id, cleanTask(s));
  };
  $('#library-form').onsubmit = (event) => {
    event.preventDefault();
    s.work = $('#library-answer').value;
    const answer = s.work.trim();
    if (answer.length < 20 || !/[a-z]{3}/i.test(answer)) {
      $('#library-status').textContent =
        'Add a meaningful explanation or pseudocode of at least 20 characters first.';
      return;
    }
    s.attempted = true;
    workStore.write('task:' + id, cleanTask(s));
    $('#library-reveal').disabled = false;
    $('#solution-lock').hidden = true;
    $('#library-status').textContent =
      'Attempt recorded. Reveal the model solution and compare your approach, bounds and test cases.';
  };
  $('#library-reveal').onclick = () => {
    if (!s.attempted) return;
    s.revealed = true;
    workStore.write('task:' + id, cleanTask(s));
    $('#library-solution').hidden = false;
  };
  if ($('#library-lab'))
    $('#library-lab').onclick = () => {
      s.work = $('#library-answer').value;
      if (!s.work.trim()) {
        $('#library-status').textContent =
          'Write some pseudocode first, then open it in the lab.';
        return;
      }
      carriedCode = s.work;
      location.hash = 'lab';
    };
  $('#copy-work').onclick = async () => {
    try {
      await navigator.clipboard.writeText($('#library-answer').value);
      $('#library-status').textContent =
        'Answer copied. Paste it into your own notes to keep it.';
    } catch {
      $('#library-answer').select();
      $('#library-status').textContent =
        'Select and copy your answer using your device copy command.';
    }
  };
  sidebar();
}
// Downloadable teaching material
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
// Saved work and privacy
function savedWorkPage() {
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
        title = 'PRLD practice exam';
        href = '#exams';
      } else if (item.key.startsWith('database:')) {
        const lesson = dbLessons.find(
          (l) => l.id === item.key.slice(9).split(':task-')[0],
        );
        if (lesson) {
          const savedTask = item.key.split(':task-')[1];
          title =
            'Databases: ' +
            lesson.title +
            (savedTask ? ' · Task ' + (Number(savedTask) + 1) : '');
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
    ['prld', 'database', 'intermediate', 'advanced'].includes(id)
  )
    activeModule = id;
  if (page === 'nf-builder') {
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
  else if (page === 'trace-guided') guidedTracePage();
  else if (page === 'saved-work') savedWorkPage();
  else if (page === 'about') about();
  else dashboard();
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.title =
    (page === 'nf-builder'
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
                                  ? activeLesson?.title
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
    event.target.value === 'advanced'
      ? 'db-advanced'
      : event.target.value === 'intermediate'
        ? 'db-intermediate'
        : event.target.value === 'database'
          ? 'db'
          : 'home';
};
$('#lesson-search').addEventListener('input', filterTopics);
