import {
  lessonGuides,
  lessonPrerequisites,
  unitPracticals,
  troubleshooting,
} from './learning-path-and-guides.mjs?v=guided-csharp-50';
import { colourCode } from './code-syntax-colours.mjs?v=guided-csharp-50';
import {
  codeParts,
  orderedTeachingFiles,
} from './step-by-step-code.mjs?v=guided-csharp-50';
import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=guided-csharp-50';
import { escapeHTML as e } from '../programming-logic/pseudocode-parser-and-diagrams.mjs?v=40';
import {
  courseUnits,
  courseLessons,
  projectBriefs,
  lessonFocus,
} from './course-outline-and-lessons.mjs?v=guided-csharp-50';
import { exampleFiles } from './complete-example-files.mjs?v=guided-csharp-50';
import { sourceZip } from './project-zip-download.mjs?v=csharp-44';
const beginnerGoals = {
  'csharp-1':
    'Think of a program as small steps that work with values and objects. In this unit you will learn how objects are cleaned up, how to reuse code and how to handle work that takes time. Try one feature before combining several.',
  'csharp-2':
    'Imagine a student office. A request asks the office to add, show, change or remove a student. Your API receives that request, checks it and sends back a result. Start with the web foundations, then the in-memory CRUD example before adding a database.',
  'csharp-3':
    'Start with saving and reading a small piece of data. A file stores data on disk. A database stores it in organised tables. Learn one storage option first, then compare the others.',
  'csharp-4':
    'Think of a screen, its data and the code that connects them. The View is the screen. The Model describes the data. The ViewModel gives the screen values and actions. Start with one textbox and one button.',
  'csharp-5':
    'A class library is a toolbox that several projects can share. Start by calling one ordinary method from that toolbox. Then explore reflection, which lets code inspect types, and dynamic, which checks some operations while the program runs.',
};
function beginnerGuide(unit) {
  return renderHtmlPage('studylab/csharp-beginner-guide', {
    dynamic_1: e(
      beginnerGoals[unit] ||
        'Start with the small console example, then follow the web foundations and beginner CRUD lessons. Take one step at a time.',
    ),
  });
}
function learningPath() {
  const stages = [
    [
      'cs-foundations',
      '1. Foundations',
      'Build the console student register. Practise values, decisions, loops, methods, objects and lists.',
    ],
    [
      'cs-web-foundations',
      '2. First web requests',
      'Understand requests, then build GET, POST, validation, PUT and DELETE in that order.',
    ],
    [
      'cs-ef-sqlite',
      '3. Remember the data',
      'Move from a temporary store to a database. Compare SQLite, SQL Server and ADO.NET.',
    ],
    [
      'cs-api-auth',
      '4. Protect and test',
      'Add accounts and ownership. Check paging and conflicting edits, then run HTTP checks.',
    ],
    [
      'cs-mvc-client',
      '5. Add a screen',
      'Build an MVC client. Explore the separate WPF, file and MVVM examples in Units 3 and 4.',
    ],
    [
      'cs-class-libraries',
      '6. Reuse and explore',
      'Share rules through a library, then explore reflection and dynamic features. Return to Unit 1 for lifetime, LINQ, threads and async experiments.',
    ],
  ];
  return `<section class="panel"><h2>Your step-by-step learning path</h2><p>Keep the Student Management System idea throughout. The downloads are separate teaching stages, not files to paste into one project. Keep each stage in its own folder. The official five units remain below; this path gives beginners a practical starting order.</p><ol>${stages.map(([id, title, why]) => `<li>${link('#cs-lesson/' + id, title, 'text-link')}<p>${e(why)}</p></li>`).join('')}</ol><p>Read, predict, build, run, change, then try independently. Check the prerequisites and readiness statements before moving on. They guide your revision and do not lock lessons.</p></section>`;
}
function guideBefore(lesson) {
  const g = lessonGuides[lesson.id];
  if (!g) return '';
  const prereqs = lessonPrerequisites[lesson.id];
  return `<section class="panel"><h2>Before you start</h2><p>${prereqs.length ? 'Revise these lessons if you need them:' : 'No previous C# lesson is required. Start with the setup and console example below.'}</p><ul>${prereqs
    .map((id) => {
      const prior = courseLessons.find((l) => l.id === id);
      return `<li>${link('#cs-lesson/' + id, prior.title, 'text-link')}</li>`;
    })
    .join(
      '',
    )}</ul><h3>Predict before running</h3><p>${e(g[0])}</p><details><summary>Check the prediction</summary><p>${e(g[1])}</p></details><h3>Build one small change</h3><p>${e(g[2])}</p><details><summary>Hint and worked guidance</summary><p>${e(g[3])}</p></details><p>First run the supplied project unchanged and compare its expected result. Make the change above only after that baseline works. The numbered code and complete files follow.</p></section>`;
}
function guideAfter(lesson, record) {
  const g = lessonGuides[lesson.id];
  if (!g) return '';
  const checks = [
    'I ran the example and compared the expected result.',
    'I made the guided change and explained its effect.',
    g[5],
  ];
  return `<section class="panel"><h2>Try without the solution</h2><p>${e(g[4])}</p><label for="cs-independent-notes">Your plan, code notes and test results</label><textarea id="cs-independent-notes" rows="6" placeholder="Write your approach and the results you observed.">${e(record.independentNotes || '')}</textarea><p id="cs-guided-status" role="status" aria-live="polite">Notes and readiness checks save in this browser. These are self-checks, not automatically marked code.</p><h3>Ready to move on?</h3>${checks.map((text, i) => `<label class="guided-check"><input type="checkbox" data-readiness="${i}" ${record.readiness?.[i] === true ? 'checked' : ''}/> ${i === 2 ? 'I can: ' : ''}${e(text)}</label>`).join('')}<p>If you cannot explain a step, revisit its prerequisite or worked example before starting the next lesson.</p><h3>If something goes wrong</h3>${troubleshooting[lesson.unit].map(([error, fix]) => `<details><summary>${e(error)}</summary><p>${e(fix)}</p></details>`).join('')}</section>`;
}
function unitPractical(unit) {
  const task = unitPracticals[unit];
  if (!task) return '';
  return `<section class="panel"><h2>Unit practical: ${e(task[0])}</h2><p>${e(task[1])}</p><p><strong>Suggested marks: 10.</strong> ${e(task[2])}</p><p>Try it independently first. Submit your source files, a short explanation and evidence of normal and invalid-input tests. The website does not award these marks automatically.</p><details><summary>Review the solution approach after your attempt</summary><p>${e(task[3])}</p></details></section>`;
}
const key = 'studylab-csharp-learning-v1';
export const courseForLesson = (lesson) =>
  lesson?.unit.startsWith('docker-') ? 'docker' : 'csharp';
export const courseName = (course) => (course === 'docker' ? 'Docker' : 'C# PROG6212');
const courseUnitsFor = (course) =>
  courseUnits.filter((u) => u.id.startsWith(course === 'docker' ? 'docker-' : 'csharp-'));
function read() {
  try {
    const r = JSON.parse(localStorage.getItem(key) || '{}');
    return r && typeof r === 'object' && !Array.isArray(r) ? r : {};
  } catch {
    return {};
  }
}
function save(id, patch) {
  try {
    const state = read();
    state[id] = { ...state[id], ...patch };
    localStorage.setItem(key, JSON.stringify(state));
    return 'Saved on this browser.';
  } catch {
    return 'Browser storage is unavailable. This visit only.';
  }
}
function link(href, text, cls = 'button secondary') {
  return `<a class="${cls}" href="${e(href)}">${e(text)}</a>`;
}
export function newCourseSidebar({ course, page, id }) {
  const units = courseUnitsFor(course);
  document.querySelector('#course-select').value = course;
  document.querySelector('#course-caption').textContent = courseName(course);
  document.querySelector('.brand').href = '#cs/' + course;
  document.querySelector('#progress-link').href = '#cs-progress/' + course;
  const destinations = {
    home: '#cs/' + course,
    practice: '#cs-practice/' + course,
    tools: '#cs-downloads/' + course,
    resources: '#cs-downloads/' + course,
  };
  for (const a of document.querySelectorAll('[data-page]')) {
    a.href = destinations[a.dataset.page];
    a.classList.toggle(
      'active',
      (page === 'cs' && a.dataset.page === 'home') ||
        (page === 'cs-practice' && a.dataset.page === 'practice'),
    );
    a.removeAttribute('aria-current');
  }
  document.querySelector('#unit-nav').innerHTML = units
    .map(
      (u) =>
        `<details class="topic-group" ${id === u.id || courseLessons.some((l) => l.id === id && l.unit === u.id) ? 'open' : ''}><summary>${e(u.title)}</summary><a class="unit-overview" href="#cs-unit/${u.id}">${course === 'docker' ? 'Topic' : 'Unit'} overview</a>${courseLessons
          .filter((l) => l.unit === u.id)
          .map(
            (l) =>
              `<a class="topic-link ${l.id === id ? 'active' : ''}" href="#cs-lesson/${l.id}">${e(l.title)}</a>`,
          )
          .join('')}</details>`,
    )
    .join('');
}
export function newCoursePage({ view, page, id, course }) {
  const units = courseUnitsFor(course),
    state = read(),
    lessons = courseLessons.filter((l) => units.some((u) => u.id === l.unit));
  if (page === 'cs-lesson') {
    const lesson = courseLessons.find((l) => l.id === id);
    if (!lesson) {
      view.innerHTML = '<h1>Lesson not found</h1>';
      return;
    }
    const unit = courseUnits.find((u) => u.id === lesson.unit),
      files = exampleFiles[lesson.project] || [],
      index = lessons.indexOf(lesson),
      record = state[id] || {};
    view.innerHTML = renderHtmlPage('studylab/csharp-lesson-shell', {
      dynamic_1: '#cs/' + course,
      dynamic_2: courseName(course),
      dynamic_3: e(unit.title),
      dynamic_4: e(lesson.title),
      dynamic_5: e(lesson.outcomes.join(', ') + ' . ' + unit.sessions),
      dynamic_6: renderHtmlPage('studylab/' + lesson.page, {}),
      dynamic_13: guideBefore(lesson),
      dynamic_14: guideAfter(lesson, record),
      dynamic_12: renderHtmlPage('studylab/csharp-project-brief', {
        dynamic_1: e(projectBriefs[lesson.project][0]),
        dynamic_2: e(projectBriefs[lesson.project][1]),
        dynamic_3: e(lessonFocus[lesson.id]),
        dynamic_4: e(projectBriefs[lesson.project][2]),
        dynamic_5: e(projectBriefs[lesson.project][3]),
      }),
      dynamic_11: course === 'csharp' ? beginnerGuide(lesson.unit) : '',
      dynamic_10: orderedTeachingFiles(files)
        .map(
          ({ file, index }, fileNumber) =>
            `<section class="panel"><h3>File ${fileNumber + 1}: ${e(file.name)}</h3><p>${e(filePurpose(file.name))}</p><p>Use the numbered parts below in this order inside <strong>${e(file.name)}</strong>. A part is a small piece of this file. Add the next part underneath it. Build only after all parts of the file are in place. The complete file is provided afterwards.</p>${codeParts(
              file,
            )
              .map(
                (part, partNumber) =>
                  `<details class="cs-source-file" ${partNumber === 0 ? 'open' : ''}><summary>Part ${partNumber + 1}: ${e(part.title)}</summary><p>Continue in the same file, directly after the previous part. Read the comments before the code.</p><button type="button" class="button secondary" data-copy-part="${index}:${partNumber}" aria-label="Copy part ${partNumber + 1} of ${e(file.name)}">Copy this part</button><pre tabindex="0"><code>${colourCode(part.code, file.name)}</code></pre></details>`,
              )
              .join('')}</section>`,
        )
        .join(''),
      dynamic_7: files
        .map(
          (f, index) =>
            `<details class="cs-source-file" ${f.name === 'Program.cs' || f.name === 'MainWindow.xaml' || f.name === 'StudentViewModel.cs' || f.name === 'compose.yaml' || f.name.endsWith('/Dockerfile') || f.name.startsWith('Controllers/') ? 'open' : ''}><summary>${e(f.name)}</summary><p>${e(filePurpose(f.name))}</p><div class="button-row"><button type="button" class="button secondary" data-copy-source="${index}" aria-label="Copy code from ${e(f.name)}">Copy code</button><a href="./downloads/csharp/${e(lesson.project)}/${e(f.name)}" download>Download this file</a></div><pre tabindex="0" aria-label="Code for ${e(f.name)}"><code>${colourCode(f.content, f.name)}</code></pre></details>`,
        )
        .join(''),
      dynamic_8: lesson.quiz
        .map(
          (q, i) =>
            `<fieldset><legend>${e(q.question)}</legend>${q.options.map((option, j) => `<label class="quiz-option"><input type="radio" name="cs-q-${i}" value="${j}"/>${e(option)}</label>`).join('')}<p id="cs-q-feedback-${i}"></p></fieldset>`,
        )
        .join(''),
      dynamic_9:
        (index > 0
          ? link('#cs-lesson/' + lessons[index - 1].id, 'Previous lesson')
          : '') +
        link('#cs-unit/' + unit.id, 'Unit overview') +
        (index < lessons.length - 1
          ? link('#cs-lesson/' + lessons[index + 1].id, 'Next lesson')
          : link('#cs-progress/' + course, 'Review progress')),
    });
    const notes = view.querySelector('#cs-independent-notes');
    if (notes) {
      notes.addEventListener('input', () => {
        view.querySelector('#cs-guided-status').textContent = save(id, {
          independentNotes: notes.value,
        });
      });
      for (const check of view.querySelectorAll('[data-readiness]'))
        check.addEventListener('change', () => {
          const readiness = [...view.querySelectorAll('[data-readiness]')].map(
            (input) => input.checked,
          );
          view.querySelector('#cs-guided-status').textContent = save(id, { readiness });
        });
    }
    const complete = view.querySelector('#cs-complete');
    complete.checked = record.complete === true;
    view.querySelector('#cs-progress-status').textContent =
      'Completion is self-reported. Quiz scores are checked separately.';
    complete.addEventListener(
      'change',
      () =>
        (view.querySelector('#cs-progress-status').textContent = save(id, {
          complete: complete.checked,
        })),
    );
    view.querySelector('#cs-check-quiz').addEventListener('click', () => {
      let score = 0;
      lesson.quiz.forEach((q, i) => {
        const selected = view.querySelector(`[name="cs-q-${i}"]:checked`);
        const correct = selected && Number(selected.value) === q.answer;
        if (correct) score++;
        view.querySelector('#cs-q-feedback-' + i).textContent =
          (correct ? 'Correct. ' : selected ? 'Try again. ' : 'Choose an answer. ') +
          q.explanation;
      });
      view.querySelector('#cs-quiz-status').textContent =
        `${score}/${lesson.quiz.length} correct. ` +
        save(id, { score, total: lesson.quiz.length });
    });
    view.querySelector('#cs-jump-code').addEventListener('click', () => {
      const heading = view.querySelector('#cs-code-title');
      heading.scrollIntoView({ block: 'start' });
      heading.focus({ preventScroll: true });
    });
    for (const button of view.querySelectorAll('[data-copy-part]')) {
      button.addEventListener('click', async () => {
        const [fileIndex, partIndex] = button.dataset.copyPart.split(':').map(Number);
        const file = files[fileIndex],
          part = codeParts(file)[partIndex];
        try {
          await navigator.clipboard.writeText(part.code);
          view.querySelector('#cs-parts-status').textContent =
            `Copied part ${partIndex + 1} of ${file.name}. Add it after the previous part in that file.`;
        } catch {
          view.querySelector('#cs-parts-status').textContent =
            'Select and copy the part manually. The complete file is available below.';
        }
      });
    }
    for (const button of view.querySelectorAll('[data-copy-source]')) {
      button.addEventListener('click', async () => {
        const file = files[Number(button.dataset.copySource)];
        const status = view.querySelector('#cs-copy-status');
        try {
          await navigator.clipboard.writeText(file.content);
          status.textContent = `Copied ${file.name}. Paste it into that exact file in Visual Studio.`;
        } catch {
          status.textContent = `Clipboard access is unavailable. Select the code in ${file.name}, then copy it manually, or download the file.`;
        }
      });
    }
    for (const [id, open] of [
      ['cs-expand-code', true],
      ['cs-collapse-code', false],
    ])
      view.querySelector('#' + id).addEventListener('click', () => {
        for (const file of view.querySelectorAll('#cs-complete-code .cs-source-file'))
          file.open = open;
      });
    view.querySelector('#cs-download-project').addEventListener('click', () => {
      try {
        const url = URL.createObjectURL(sourceZip(files));
        const a = document.createElement('a');
        a.href = url;
        a.download = lesson.project + '.zip';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        view.querySelector('#cs-download-status').textContent =
          'Project ZIP prepared. Open its .csproj in Visual Studio.';
      } catch {
        view.querySelector('#cs-download-status').textContent =
          'Could not create ZIP. Download individual files below.';
      }
    });
    return;
  }
  let title = courseName(course),
    description =
      course === 'docker'
        ? 'A separate practical module: build .NET images, run an API and MVC website with SQL Server, then manage networks and persistent data.'
        : 'Follow Units 1-5 from the supplied outline. Read simple explanations, inspect complete files, test in Visual Studio, and practise with worked answers.';
  let content = '';
  if (page === 'cs-progress') {
    title += ' progress';
    description =
      'Your completed lessons and last checked quiz scores. Completion is self-reported and stored in this browser.';
    content = lessons
      .map(
        (l) =>
          `<article class="panel"><h2>${link('#cs-lesson/' + l.id, l.title, 'text-link')}</h2><p>${state[l.id]?.complete === true ? 'Complete' : 'Not marked complete'} . Readiness ${(state[l.id]?.readiness || []).filter(Boolean).length}/3 self-checked . Quiz ${Number.isInteger(state[l.id]?.score) ? state[l.id].score : 0}/${l.quiz.length}</p></article>`,
      )
      .join('');
  } else if (page === 'cs-downloads') {
    title += ' complete examples';
    description =
      'Each lesson includes a ZIP download with every required project file. Choose an example below, then use Download complete project ZIP. C# runs in Visual Studio/.NET; Docker runs in Docker Desktop.';
    const unique = [...new Set(lessons.map((l) => l.project))];
    content = unique
      .map((project) => {
        const lesson = lessons.find((l) => l.project === project);
        return `<article class="panel"><h2>${e(project)}</h2><p>${exampleFiles[project].length} source files . ${e(lesson.title)}</p>${link('#cs-lesson/' + lesson.id, 'Open example and download')}</article>`;
      })
      .join('');
  } else if (page === 'cs-practice') {
    title += ' practice';
    description =
      'Each lesson has distinct tasks, expandable worked answers and a checked quiz. Choose a topic and try the task before opening its answer.';
    content =
      (course === 'csharp'
        ? Object.keys(unitPracticals).map(unitPractical).join('')
        : '') +
      lessons
        .map(
          (l) =>
            `<article class="panel"><h2>${e(l.title)}</h2>${link('#cs-lesson/' + l.id, 'Open tasks and quiz')}</article>`,
        )
        .join('');
  } else {
    const chosen = page === 'cs-unit' ? units.filter((u) => u.id === id) : units;
    if (page === 'cs-unit' && chosen[0]) {
      title = chosen[0].title;
      description = chosen[0].sessions;
    }
    content =
      (course === 'csharp'
        ? (page === 'cs-unit' ? unitPractical(id) : learningPath()) +
          beginnerGuide(page === 'cs-unit' ? id : '')
        : '') +
      chosen
        .map(
          (u) =>
            `<section class="course-unit"><h2>${course === 'docker' ? '' : `Unit ${u.number}: `}${link('#cs-unit/' + u.id, u.title, 'text-link')}</h2><p>${e(u.sessions)}</p><details><summary>Learning outcomes</summary><ul>${u.outcomes.map((o) => `<li>${e(o)}</li>`).join('')}</ul></details><div class="course-lesson-links">${lessons
              .filter((l) => l.unit === u.id)
              .map((l) => link('#cs-lesson/' + l.id, l.title, 'topic-link'))
              .join('')}</div></section>`,
        )
        .join('');
  }
  view.innerHTML = renderHtmlPage('studylab/csharp-course-shell', {
    dynamic_1: course === 'docker' ? 'DOCKER . PRACTICAL LEARNING' : 'C# . PROG6212',
    dynamic_2: e(title),
    dynamic_3: e(description),
    dynamic_4:
      link('#cs/' + course, 'Course overview') +
      link('#cs-practice/' + course, 'Practice') +
      link('#cs-downloads/' + course, 'Complete examples') +
      link('#cs-progress/' + course, 'My progress'),
    dynamic_5: content,
  });
}
function filePurpose(name) {
  if (name.endsWith('.csproj'))
    return 'Project settings: target framework and NuGet package references. Visual Studio restores these dependencies.';
  if (name.endsWith('.http'))
    return 'Ready-to-send HTTP requests. Set the base URL and use Send Request in Visual Studio.';
  if (name.endsWith('Program.cs'))
    return 'Application startup/entry point. Registers services and connects the request pipeline or runs the console example.';
  if (name.endsWith('.xaml'))
    return 'WPF markup: window/application layout and data bindings. Windows desktop workload required.';
  if (name.endsWith('.cshtml'))
    return 'Razor MVC view: server-rendered HTML forms and data display.';
  if (name.endsWith('.json'))
    return 'Configuration or data. Never put real passwords in committed files.';
  if (name.endsWith('Dockerfile'))
    return 'Multi-stage image build. Run docker build from this file’s directory.';
  if (name.endsWith('.yaml'))
    return 'Compose service, network, port and volume configuration.';
  return 'Part of the complete example. Keep this exact relative file name and follow the lesson steps.';
}
