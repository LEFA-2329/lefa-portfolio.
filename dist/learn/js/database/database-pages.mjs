import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=33';
import { advancedUnits, advancedLessons } from './content/advanced-lessons.mjs?v=33';
import { quizContext } from '../shared/quiz-code-examples.mjs?v=33';
import { cleanDatabaseLesson } from './saved-database-answers.mjs?v=33';
import {
  progressSummary,
  refreshLessonCompletion,
} from '../shared/learning-progress.mjs?v=33';
import {
  normalisationWalkthrough,
  bindNormalisation,
} from './normalisation/normalisation-lessons-and-diagrams.mjs?v=33';
import {
  dbUnits as introUnits,
  dbLessons as introLessons,
} from './content/introduction-lessons.mjs?v=33';
import {
  intermediateUnits,
  intermediateLessons,
} from './content/intermediate-lessons.mjs?v=33';
const dbUnits = [...introUnits, ...intermediateUnits, ...advancedUnits],
  dbLessons = [...introLessons, ...intermediateLessons, ...advancedLessons];
import { workStore } from '../shared/saved-work-storage.mjs?v=33';
import { escapeHTML as e } from '../programming-logic/pseudocode-parser-and-diagrams.mjs?v=33';
export { dbUnits, dbLessons };
const code = (text) => `<pre><code>${e(text)}</code></pre>`;
const link = (l) => `<a href="#db-lesson/${l.id}">${e(l.title)}</a>`;
export function databaseHome({ view, sidebar }) {
  const advanced = location.hash.startsWith('#db-advanced'),
    intermediate = location.hash.startsWith('#db-intermediate'),
    courseUnits = advanced
      ? advancedUnits
      : intermediate
        ? intermediateUnits
        : introUnits;
  view.innerHTML = renderHtmlPage('studylab/database-home', {
    dynamic_1: advanced
      ? 'DATABASE ADVANCED . EXTENSION'
      : intermediate
        ? 'DATABASE INTERMEDIATE . DATA6222'
        : 'DATABASE INTRODUCTION . DATA6211 / DATA6211w',
    dynamic_2: advanced ? 201 : intermediate ? 101 : 1,
    dynamic_3: progressSummary(
      advanced ? 'advanced' : intermediate ? 'intermediate' : 'database',
    ),
    dynamic_4: advanced
      ? 'Nine units, 11 lessons, 33 quiz questions, 22 practical tasks and downloadable examples. Prerequisite: Introduction and Intermediate. This is an independent extension, not an institution-specific module outline.'
      : intermediate
        ? 'Nine units, 106 outcomes, 27 lessons, 81 practical quiz questions and native SQL Server examples.'
        : 'Six units with expanded tasks, worked examples and SQL practice.',
    dynamic_5: courseUnits
      .map(
        (u) =>
          `<article class="course-unit"><div class="course-unit-title"><span class="unit-badge">${String(u.number || u.id).padStart(2, '0')}</span><div><h2><a href="#db-unit/${u.id}">${e(u.title)}</a></h2><p>${e(u.subtitle)}</p><a class="text-link" href="#db-unit/${u.id}">Read unit overview</a></div></div><div class="course-lesson-links">${dbLessons
            .filter((l) => l.unit === u.id)
            .map(link)
            .join('')}</div></article>`,
      )
      .join(''),
  });
  sidebar();
}
export function databaseUnit({ view, id, sidebar }) {
  const u = dbUnits.find((u) => u.id === Number(id));
  if (!u) {
    location.hash = 'db';
    return;
  }
  const ls = dbLessons.filter((l) => l.unit === u.id),
    number = u.number || u.id,
    home = u.id > 200 ? 'db-advanced' : u.id > 100 ? 'db-intermediate' : 'db';
  view.innerHTML = renderHtmlPage('studylab/database-unit', {
    dynamic_1: home,
    dynamic_2: number,
    dynamic_3:
      u.id > 200
        ? 'ADVANCED EXTENSION'
        : u.id > 100
          ? 'DATA6222'
          : 'DATA6211 / DATA6211w',
    dynamic_4: number,
    dynamic_5: e(u.title),
    dynamic_6: e(u.overview),
    dynamic_7: u.outcomes.map((o) => `<li>${e(o)}</li>`).join(''),
    dynamic_8: u.themes.map((t) => `<li>${e(t)}</li>`).join(''),
    dynamic_9:
      u.id > 200
        ? '<strong>Study reference:</strong> Independent extension; no prescribed textbook chapter assigned.'
        : '<strong>Outline reference:</strong> prescribed textbook chapter ' +
          e(u.chapter) +
          '.',
    dynamic_10: e(u.sessions),
    dynamic_11:
      u.id === 6
        ? 'Run the SQL examples using the demo data and inspect the result tables.'
        : 'Explain your design decisions in your own words and check them against the business rules.',
    dynamic_12: e(u.check),
    dynamic_13: ls[0].id,
    dynamic_14:
      u.id === 6 ? '<a class="button secondary" href="#sql">Practise SQL</a>' : '',
    dynamic_15: ls
      .map(
        (l, i) =>
          `<article class="lesson-row"><span class="sequence">${i + 1}</span><div><h3>${e(l.title)}</h3><p>Explanation, worked example, quiz and practice.</p></div><a class="button secondary" href="#db-lesson/${l.id}">Open lesson</a></article>`,
      )
      .join(''),
  });
  view.querySelector('#print-db-unit').onclick = () => window.print();
  sidebar(u.id);
}
export function collegeDiagram() {
  return `<figure class="db-diagram"><svg viewBox="0 0 820 270" role="img" aria-label="Students and Courses each have zero or many Enrolments; every Enrolment has exactly one Student and one Course." xmlns="http://www.w3.org/2000/svg"><defs><marker id="db-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="#245b8e"/></marker></defs>${[
    [15, 50, 'Students', ['PK StudentID', 'StudentName', 'City', 'Age']],
    [
      305,
      50,
      'Enrolments',
      ['PK EnrolmentID', 'FK StudentID', 'FK CourseID', 'Mark (may be NULL)'],
    ],
    [595, 50, 'Courses', ['PK CourseID', 'CourseName', 'Fee']],
  ]
    .map(
      ([x, y, title, attrs]) =>
        `<g><rect x="${x}" y="${y}" width="210" height="175" rx="8" fill="#edf4ff" stroke="#6a90b9"/><rect x="${x}" y="${y}" width="210" height="38" rx="8" fill="#245b8e"/><text x="${x + 14}" y="${y + 25}" fill="white" font-size="18" font-weight="bold">${title}</text>${attrs.map((a, i) => `<text x="${x + 14}" y="${y + 65 + i * 25}" fill="#19344c" font-size="15">${e(a)}</text>`).join('')}</g>`,
    )
    .join(
      '',
    )}<path d="M225 130 H305 M595 130 H515" stroke="#245b8e" stroke-width="2" fill="none"/><text x="233" y="118" fill="#19344c" font-size="14">1</text><text x="265" y="118" fill="#19344c" font-size="14">0..*</text><text x="526" y="118" fill="#19344c" font-size="14">0..*</text><text x="577" y="118" fill="#19344c" font-size="14">1</text><text x="305" y="252" fill="#19344c" font-size="14">UNIQUE (StudentID, CourseID)</text></svg><figcaption>Labelled relational ERD. PK = primary key. FK = foreign key. 0..* = zero or many. Each enrolment must reference one existing student and one existing course.</figcaption></figure>`;
}
const cleanLesson = cleanDatabaseLesson;
export function databaseLesson({ view, id, task, sidebar }) {
  const l = dbLessons.find((l) => l.id === id);
  if (!l) {
    location.hash = 'db';
    return;
  }
  let state = workStore.read('database:' + id, cleanLesson({}, l), (raw) =>
    cleanLesson(raw, l),
  );
  if (/^task-[0-9]+$/.test(task || '')) {
    state.taskIndex = Math.min(Number(task.slice(5)), (l.tasks || [l.task]).length - 1);
    state.tab = 'practice';
  }
  const save = () => {
    workStore.write('database:' + id, state);
    refreshLessonCompletion(
      view,
      id,
      l.unit > 200 ? 'advanced' : l.unit > 100 ? 'intermediate' : 'database',
    );
  };
  const courseLessons = dbLessons.filter(
      (x) => Math.floor(x.unit / 100) === Math.floor(l.unit / 100),
    ),
    idx = courseLessons.indexOf(l),
    number = l.unit % 100,
    home = l.unit > 200 ? 'db-advanced' : l.unit > 100 ? 'db-intermediate' : 'db';
  view.innerHTML = renderHtmlPage('studylab/database-lesson', {
    dynamic_1: home,
    dynamic_2: l.unit,
    dynamic_3: number,
    dynamic_4:
      l.unit > 200 ? 'ADVANCED EXTENSION' : l.unit > 100 ? 'DATA6222' : 'DATA6211',
    dynamic_5: number,
    dynamic_6: e(l.title),
    dynamic_7: [
      ['learn', 'Learn'],
      ['quiz', 'Quiz'],
      ['practice', 'Try it yourself'],
    ]
      .map(
        ([key, label]) =>
          `<button id="db-tab-${key}" role="tab" data-db-tab="${key}" aria-controls="db-panel">${label}</button>`,
      )
      .join(''),
    dynamic_8: idx
      ? `<a class="button secondary" href="#db-lesson/${courseLessons[idx - 1].id}">Previous lesson</a>`
      : `<a class="button secondary" href="#db-unit/${l.unit}">Unit overview</a>`,
    dynamic_9:
      idx < courseLessons.length - 1
        ? `<a class="button" href="#db-lesson/${courseLessons[idx + 1].id}">Next lesson</a>`
        : '<a class="button" href="#sql">Practise SQL</a>',
  });
  const render = () => {
    view.querySelectorAll('[data-db-tab]').forEach((b) => {
      const selected = b.dataset.dbTab === state.tab;
      b.classList.toggle('active', selected);
      b.setAttribute('aria-selected', selected);
      b.tabIndex = selected ? 0 : -1;
    });
    const panel = view.querySelector('#db-panel');
    panel.setAttribute('aria-labelledby', 'db-tab-' + state.tab);
    if (state.tab === 'learn') {
      panel.innerHTML = `<div class="theory">${l.sections.map((s) => `<h2>${e(s.heading)}</h2><p>${e(s.text)}</p>`).join('')}<h2>Worked example: ${e(l.example.title)}</h2><p>${e(l.example.problem)}</p><div class="worked-explanation"><h3>Solution and reasoning</h3><p>${e(l.example.solution)}</p></div>${l.sampleCode ? `<h3>${l.environmentLabel ? e(l.environmentLabel) : l.environment === 'native' ? 'SQL Server / SSMS example' : l.environment === 'design' ? 'Design and dependency example' : 'Portable SQL example'}</h3>${code(l.sampleCode)}<div class="button-row"><button class="button secondary" id="db-copy-code">Copy example</button><a class="button secondary" href="./downloads/${e(l.downloadFolder || 'intermediate')}/${e(l.download)}" download>Download example</a></div><p id="db-copy-status" role="status"></p>` : ''}${(l.moreExamples || []).map((x) => `<h3>Additional example: ${e(x.title)}</h3><p class="note">${x.environment === 'native' ? 'Run in SQL Server / SSMS.' : 'Portable SQL: use the college workspace.'}</p>${code(x.code)}<p>${e(x.reason)}</p>`).join('')}${l.references?.length ? `<h2>Official references</h2><ul>${l.references.map((r) => `<li><a class="text-link" href="${e(r.url)}" target="_blank" rel="noopener">${e(r.title)}</a></li>`).join('')}</ul>` : ''}${l.diagram === 'college' ? collegeDiagram() : l.diagram ? normalisationWalkthrough() : ''}${l.sql ? `<a class="button" href="#sql/${l.sql}">Run a related SQL example</a>` : ''}</div>`;
      if (l.sampleCode) {
        panel.querySelector('#db-copy-code').onclick = async () => {
          try {
            await navigator.clipboard.writeText(l.sampleCode);
            panel.querySelector('#db-copy-status').textContent = 'Example copied.';
          } catch {
            panel.querySelector('#db-copy-status').textContent =
              'Select the code above and copy it using your keyboard.';
          }
        };
      }
      if (l.diagram && l.diagram !== 'college') bindNormalisation(panel);
    } else if (state.tab === 'quiz') {
      panel.innerHTML = `<p class="muted">Choose an answer and check it. You can retry.</p>${l.quizRevision ? '<p class="note">New practical question bank: earlier quiz selections do not apply to these questions. Written drafts and completion marks are retained.</p>' : ''}${l.quizzes.map((q, i) => `<form class="db-quiz" data-quiz="${i}">${quizContext(q)}<fieldset><legend>${i + 1}. ${e(q.question)}</legend>${q.options.map((o, j) => `<label class="quiz-option"><input type="radio" name="answer" value="${j}" required ${state.choices[i] === j ? 'checked' : ''}>${e(o)}</label>`).join('')}</fieldset><button class="button" type="submit">Check answer ${i + 1}</button><p class="feedback" role="status">${state.checked[i] ? `${state.choices[i] === q.answer ? 'Correct.' : 'Not quite.'} ${e(q.explanation)}` : ''}</p></form>`).join('')}`;
      panel.querySelectorAll('form').forEach((form) => {
        const i = Number(form.dataset.quiz);
        form.onchange = () => {
          state.choices[i] = Number(new FormData(form).get('answer'));
          state.checked[i] = false;
          form.querySelector('.feedback').textContent =
            'Answer selected. Check it when ready.';
          save();
        };
        form.onsubmit = (event) => {
          event.preventDefault();
          if (!form.reportValidity()) return;
          state.choices[i] = Number(new FormData(form).get('answer'));
          state.checked[i] = true;
          save();
          render();
        };
      });
    } else {
      const tasks = l.tasks || [l.task];
      state.taskIndex = Math.min(state.taskIndex || 0, tasks.length - 1);
      const task = tasks[state.taskIndex],
        key = 'database:' + id + ':task-' + state.taskIndex;
      let ps =
        state.taskIndex === 0 ? state : workStore.read(key, cleanLesson({}), cleanLesson);
      const updatedTask = !!task.revision && task.revision !== ps.revision && !!ps.draft;
      const savePractice = () => {
        ps.revision = task.revision || '';
        return state.taskIndex === 0 ? save() : workStore.write(key, ps);
      };
      panel.innerHTML = `<h2>Try it yourself</h2><label class="field-label" for="db-task-select">Practice task</label><select id="db-task-select" aria-label="Practice task">${tasks.map((t, i) => `<option value="${i}" ${i === state.taskIndex ? 'selected' : ''}>${i + 1}. ${e(t.title || 'Task ' + (i + 1))}</option>`).join('')}</select><p>${e(task.prompt)}</p>${updatedTask ? '<p class="note">This task has been updated. Your earlier draft is retained below; review it against the new instructions.</p>' : ''}${task.sqlChallenge ? `<a class="button secondary" href="#sql/challenge-${e(task.sqlChallenge)}">Solve in SQL workspace with automatic marking</a>` : ''}<form id="db-task"><label class="field-label">Your explanation or SQL<textarea id="db-answer" rows="8" maxlength="20000" required>${e(ps.draft)}</textarea></label><div class="button-row"><button class="button" type="submit">Submit my attempt</button><button class="button secondary" type="button" id="db-hint">Give me a hint</button><button class="button secondary" type="button" id="db-solution" ${ps.attempted ? '' : 'disabled'}>Reveal worked answer</button></div><p id="db-task-status" class="muted" role="status">${ps.attempted ? 'Attempt saved. Compare it with the worked answer. This written task is self-assessed.' : 'Write an attempt before revealing the answer. Written answers are self-assessed.'}</p></form><p class="note" id="db-hint-text" ${ps.hint ? '' : 'hidden'}>${e(task.hint)}</p><div class="model-answer" id="db-worked" ${ps.attempted && ps.revealed ? '' : 'hidden'}><h3>Worked answer</h3>${code(task.solution)}</div>`;
      panel.querySelector('#db-task-select').onchange = (event) => {
        state.taskIndex = Number(event.target.value);
        save();
        render();
      };
      const input = panel.querySelector('#db-answer');
      input.oninput = () => {
        ps.draft = input.value;
        savePractice();
      };
      panel.querySelector('#db-task').onsubmit = (event) => {
        event.preventDefault();
        if (!input.value.trim()) {
          panel.querySelector('#db-task-status').textContent =
            'Write your attempt first.';
          return;
        }
        ps.draft = input.value;
        ps.attempted = true;
        savePractice();
        render();
      };
      panel.querySelector('#db-hint').onclick = () => {
        ps.hint = true;
        savePractice();
        panel.querySelector('#db-hint-text').hidden = false;
      };
      panel.querySelector('#db-solution').onclick = () => {
        if (!ps.attempted) return;
        ps.revealed = true;
        savePractice();
        panel.querySelector('#db-worked').hidden = false;
      };
    }
  };
  view.querySelectorAll('[data-db-tab]').forEach(
    (b) =>
      (b.onclick = () => {
        state.tab = b.dataset.dbTab;
        save();
        render();
      }),
  );
  view.querySelector('.lesson-tabs').onkeydown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...view.querySelectorAll('[data-db-tab]')],
      i = tabs.findIndex((b) => b.dataset.dbTab === state.tab),
      n =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? 2
            : (i + (event.key === 'ArrowRight' ? 1 : -1) + 3) % 3;
    tabs[n].click();
    tabs[n].focus();
  };
  view.querySelector('#db-print').onclick = () => window.print();
  render();
  sidebar(l.unit);
  refreshLessonCompletion(
    view,
    id,
    l.unit > 200 ? 'advanced' : l.unit > 100 ? 'intermediate' : 'database',
    true,
  );
}
export function databasePractice({ view, sidebar }) {
  view.innerHTML = renderHtmlPage('studylab/database-practice', {
    dynamic_1: dbUnits
      .map(
        (u) =>
          `<a href="#db-unit/${u.id}">${u.id > 200 ? 'Advanced' : u.id > 100 ? 'Intermediate' : 'Introduction'} Unit ${u.number || u.id}: ${e(u.title)}</a>`,
      )
      .join(''),
  });
  sidebar();
}
export function databaseResources({ view, sidebar }) {
  view.innerHTML = renderHtmlPage('studylab/database-downloads', {
    dynamic_1: [
      ['data6211', 'DATA6211 Introduction', 18, 14],
      ['data6222', 'DATA6222 Intermediate', 27, 20],
    ]
      .map(
        ([code, title, count, slides]) =>
          `<h3>${title}</h3><p>${count} written revision questions and model answers, plus a ${slides}-slide editable revision deck.</p><div class="button-row"><a class="button secondary" href="./downloads/databases/${code}-questions.pdf" download>Questions PDF</a><a class="button secondary" href="./downloads/databases/${code}-questions.docx" download>Questions Word</a><a class="button secondary" href="./downloads/databases/${code}-answers.pdf" download>Answers PDF</a><a class="button secondary" href="./downloads/databases/${code}-answers.docx" download>Answers Word</a><a class="button secondary" href="./downloads/databases/${code}-revision.pptx" download>Revision PowerPoint</a></div>`,
      )
      .join(''),
    dynamic_2: intermediateUnits
      .map(
        (u) =>
          `<h3>Unit ${u.number}: ${e(u.title)}</h3><ul>${intermediateLessons
            .filter((l) => l.unit === u.id)
            .map(
              (l) =>
                `<li><a href="./downloads/${e(l.downloadFolder || 'intermediate')}/${e(l.download)}" download>${e(l.title)} (${l.environment === 'hadoop' ? e(l.environmentLabel) : l.environment === 'design' ? 'design text' : 'SQL'})</a> · <a href="#db-lesson/${l.id}">Read lesson</a></li>`,
            )
            .join('')}</ul>`,
      )
      .join(''),
    dynamic_3: advancedLessons
      .map(
        (l) =>
          `<li><a href="./downloads/advanced/${e(l.download)}" download>${e(l.title)} (${l.environment === 'hadoop' ? e(l.environmentLabel) : l.environment === 'design' ? 'design text' : 'SQL'})</a> · <a href="#db-lesson/${l.id}">Read lesson</a></li>`,
      )
      .join(''),
  });
  sidebar();
}
