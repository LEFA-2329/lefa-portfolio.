import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=code-examples-45';
import { escapeHTML as e } from '../programming-logic/pseudocode-parser-and-diagrams.mjs?v=40';
import { courseUnits, courseLessons } from './course-outline-and-lessons.mjs?v=csharp-44';
import { exampleFiles } from './complete-example-files.mjs?v=csharp-44';
import { sourceZip } from './project-zip-download.mjs?v=csharp-44';
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
      dynamic_7: files
        .map(
          (f, index) =>
            `<details class="cs-source-file" ${f.name === 'Program.cs' || f.name === 'MainWindow.xaml' || f.name === 'StudentViewModel.cs' || f.name === 'compose.yaml' || f.name.endsWith('/Dockerfile') || f.name.startsWith('Controllers/') ? 'open' : ''}><summary>${e(f.name)}</summary><p>${e(filePurpose(f.name))}</p><div class="button-row"><button type="button" class="button secondary" data-copy-source="${index}" aria-label="Copy code from ${e(f.name)}">Copy code</button><a href="./downloads/csharp/${e(lesson.project)}/${e(f.name)}" download>Download this file</a></div><pre tabindex="0" aria-label="Code for ${e(f.name)}"><code>${e(f.content)}</code></pre></details>`,
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
        for (const file of view.querySelectorAll('.cs-source-file')) file.open = open;
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
        : 'Follow Units 1–5 from the supplied outline. Read simple explanations, inspect complete files, test in Visual Studio, and practise with worked answers.';
  let content = '';
  if (page === 'cs-progress') {
    title += ' progress';
    description =
      'Your completed lessons and last checked quiz scores. Completion is self-reported and stored in this browser.';
    content = lessons
      .map(
        (l) =>
          `<article class="panel"><h2>${link('#cs-lesson/' + l.id, l.title, 'text-link')}</h2><p>${state[l.id]?.complete === true ? 'Complete' : 'Not marked complete'} . Quiz ${Number.isInteger(state[l.id]?.score) ? state[l.id].score : 0}/${l.quiz.length}</p></article>`,
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
    content = lessons
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
    content = chosen
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
