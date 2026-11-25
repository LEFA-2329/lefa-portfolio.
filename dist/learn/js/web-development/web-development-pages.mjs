import { languageSteps, tutorials } from './content/tutorials.mjs?v=wede-64';
import { wedeUnits, wedeLessons } from './content/course.mjs?v=wede-64';
import { escapeHTML as e } from '../programming-logic/pseudocode-parser-and-diagrams.mjs?v=40';
import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=wede-64';
import { codeBlock } from '../shared/render-code-block.mjs';
import { cleanQuizLesson } from '../shared/quiz-lesson-state.mjs';
import { workStore } from '../shared/saved-work-storage.mjs?v=40';
import {
  progressSummary,
  refreshLessonCompletion,
} from '../shared/learning-progress.mjs?v=wede-60';

const lessonsFor = (unit) => wedeLessons.filter((lesson) => lesson.unit === unit);
const lessonHref = (lesson) => '#wede-lesson/' + lesson.id;
const unitHref = (unit) => '#wede-unit/' + unit.id;

const languageStarts = [
  ['HTML step by step', 'html-dom'],
  ['CSS step by step', 'css-cascade'],
  ['JavaScript step by step', 'javascript-jquery'],
];

const tokenPatterns = {
  html: /(?<comment><!--[\s\S]*?-->)|(?<string>"[^"]*"|'[^']*')|(?<keyword><\/?[!\w-]+|\/?>)|(?<property>[\w-]+(?=\s*=))/g,
  css: /(?<comment>\/\*[\s\S]*?\*\/)|(?<string>"[^"]*"|'[^']*')|(?<property>[\w-]+(?=\s*:(?![\w-]+\s*\{)))|(?<number>#[\da-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|fr|%)?)|(?<keyword>[@.#][\w-]+|\b(?:grid|flex|repeat|minmax)\b)/g,
  js: /(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(?<string>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?<keyword>\b(?:const|let|function|return|if|else|for|of|new|true|false|null)\b)|(?<number>\b\d+(?:\.\d+)?\b)|(?<property>[A-Za-z_$][\w$]*(?=\s*\())/g,
};

function highlightedCode(code, language) {
  let output = '';
  let end = 0;
  for (const match of code.matchAll(tokenPatterns[language])) {
    const kind = Object.keys(match.groups).find(
      (name) => match.groups[name] !== undefined,
    );
    output += e(code.slice(end, match.index));
    output += `<span class="wede-token-${kind}">${e(match[0])}</span>`;
    end = match.index + match[0].length;
  }
  return `<pre class="wede-highlight"><code>${output + e(code.slice(end))}</code></pre>`;
}

function stepByStep(lesson) {
  const steps = languageSteps[lesson.slug];
  if (!steps) return '';
  const language = steps[0][0];
  const teachingLessons = Object.entries(languageSteps).filter(
    ([, group]) => group[0][0] === language,
  );
  const next =
    teachingLessons[teachingLessons.findIndex(([slug]) => slug === lesson.slug) + 1];
  const nextLink = next
    ? `<p><a class="button secondary" href="#wede-lesson/wede-${next[0]}">Continue to ${e(next[1][0][1])}</a></p>`
    : '';
  const chapters = {
    html: ['HTML', 'Page structure', 'Content and forms', 'Build and validate'],
    css: [
      'CSS',
      'Syntax and selectors',
      'Styling and layout',
      'Forms and animation',
      'Responsive design',
    ],
    js: ['JavaScript', 'Language and DOM', 'Forms, data and modules'],
  };
  const [languageName, ...chapterNames] = chapters[language];
  const chapterLinks = `<nav class="button-row" aria-label="${languageName} chapters">${teachingLessons
    .map(
      ([slug], index) =>
        `<a class="button secondary" href="#wede-lesson/wede-${slug}"${slug === lesson.slug ? ' aria-current="page"' : ''}>${chapterNames[index]}</a>`,
    )
    .join('')}</nav>`;
  const lessonDemos = {
    'html-elements':
      '<details><summary>Try the native HTML disclosure</summary><p>Bring a lamp, fan or bicycle. Open and close this example with your keyboard or mouse.</p></details>',
    'javascript-jquery':
      '<section class="wede-teaching-step"><h3>Try a click event</h3><button type="button" class="button secondary" id="wede-book-demo">Reserve a practice place</button><p id="wede-demo-places" role="status">3 places available</p><button type="button" class="button secondary" id="wede-reset-demo">Reset demo</button></section>',
  };
  const animationDemo =
    lesson.slug === 'css-devtools'
      ? '<details class="wede-motion-demo"><summary>Open the animation demo</summary><p><span>Saturday session open</span></p><p>Close and reopen this demo to replay. With reduced motion enabled, the badge appears immediately.</p></details>'
      : '';
  return (
    chapterLinks +
    animationDemo +
    (lessonDemos[lesson.slug] || '') +
    steps
      .map(
        ([syntax, title, explanation, code, task, answer]) =>
          `<section class="wede-teaching-step"><h3>${e(title)}</h3><p>${e(explanation)}</p>${highlightedCode(code, syntax)}<h4>Try it</h4><p>${e(task)}</p>${answer ? `<details><summary>Check your result</summary><p>${e(answer)}</p></details>` : ''}</section>`,
      )
      .join('') +
    nextLink
  );
}

const resourceFiles = [
  ['Study guide', 'WEDE5020-Study-Guide.pdf'],
  ['Practice workbook', 'WEDE5020-Practice-Questions.pdf'],
  ['Worked answers', 'WEDE5020-Worked-Answers.pdf'],
  ['Editable revision slides', 'WEDE5020-Revision.pptx'],
  ['Revision slides for printing', 'WEDE5020-Revision-Slides.pdf'],
  ['Complete revision pack', 'WEDE5020-Complete-Free-Revision.zip'],
];

export const webReferences = [
  ['GitHub step by step', '/learn/github/'],
  ['W3Schools . HTML tutorial', 'https://www.w3schools.com/html/'],
  ['MDN . CSS reference', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference'],
  ['W3Schools . CSS tutorial', 'https://www.w3schools.com/css/'],
  ['W3Schools . JavaScript tutorial', 'https://www.w3schools.com/js/'],
  ['W3Schools . Practice exercises', 'https://www.w3schools.com/exercises/'],
  [
    'MDN . HTML syntax',
    'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax',
  ],
  ['VS Code . Emmet abbreviations', 'https://code.visualstudio.com/docs/languages/emmet'],
  ['Creative Commons . Licence conditions', 'https://creativecommons.org/cc-licenses/'],
  ['Squoosh . Compress and resize an image', 'https://squoosh.app/'],
  ['W3C . Nu HTML Checker', 'https://validator.w3.org/nu/'],
  [
    'MDN . Responsive design',
    'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design',
  ],
  ['jQuery . Event handlers', 'https://api.jquery.com/on/'],
  [
    'Google Forms . Publish and embed a form',
    'https://support.google.com/docs/answer/2839588',
  ],
  ['Google Forms . Manage responses', 'https://support.google.com/docs/answer/139706'],
  [
    'Google Search Central . SEO starter guide',
    'https://developers.google.com/search/docs/fundamentals/seo-starter-guide',
  ],
  [
    'FileZilla . Connect to a server with SFTP',
    'https://filezillapro.com/docs/v3/basic-usage-instructions/connecting-to-a-server/',
  ],
];

function unitLinks(unit, practice = false) {
  return lessonsFor(unit.id)
    .map(
      (lesson) =>
        '<a href="' +
        lessonHref(lesson) +
        (practice ? '/practice' : '') +
        '">' +
        e(lesson.title) +
        '</a>',
    )
    .join('');
}
function unitCard(unit, practice = false) {
  return (
    '<article class="course-unit"><div class="course-unit-title"><span class="unit-badge">' +
    unit.id +
    '</span><div><h2><a href="' +
    unitHref(unit) +
    '">' +
    e(unit.title) +
    '</a></h2><p>' +
    e(practice ? unit.checkpoint : unit.goal) +
    '</p></div></div><div class="course-lesson-links">' +
    unitLinks(unit, practice) +
    '</div></article>'
  );
}
export function wedeSidebar({ page, id }) {
  document.querySelector('#course-select').value = 'wede';
  document.querySelector('#course-caption').textContent = 'WEDE5020 . WEB DEVELOPMENT';
  document.querySelector('.brand').href = '#wede';
  document.querySelector('#progress-link').href = '#progress/wede';
  const destinations = {
    home: 'wede',
    practice: 'wede-practice',
    tools: 'wede-tools',
    resources: 'wede-resources',
  };
  for (const anchor of document.querySelectorAll('[data-page]')) {
    const destination = destinations[anchor.dataset.page];
    anchor.href = '#' + destination;
    const current = page === destination;
    anchor.classList.toggle('active', current);
    if (current) anchor.setAttribute('aria-current', 'page');
    else anchor.removeAttribute('aria-current');
  }
  const currentLesson = wedeLessons.find((l) => l.id === id);
  document.querySelector('#unit-nav').innerHTML = wedeUnits
    .map((u) => {
      const open =
        (page === 'wede-unit' && String(u.id) === id) || currentLesson?.unit === u.id;
      const links = lessonsFor(u.id)
        .map(
          (l) =>
            '<a class="topic-link' +
            (l.id === id ? ' active' : '') +
            '" href="' +
            lessonHref(l) +
            '"' +
            (l.id === id ? ' aria-current="page"' : '') +
            '>' +
            e(l.title) +
            '</a>',
        )
        .join('');
      return (
        '<details class="topic-group"' +
        (open ? ' open' : '') +
        '><summary>' +
        e(u.title) +
        '</summary><a class="unit-overview" href="' +
        unitHref(u) +
        '">Unit overview</a>' +
        links +
        '</details>'
      );
    })
    .join('');
}

function renderLesson(view, lesson, section) {
  const [explanation, drill, drillAnswer, challenge, challengeAnswer] =
    tutorials[lesson.slug];
  const selectedSection = ['practice', 'quiz'].includes(section) ? section : 'learn';
  const tabs = [
    ['learn', 'Learn', ''],
    ['practice', 'Practice', '/practice'],
    ['quiz', 'Quiz', '/quiz'],
  ];
  const key = 'wede:' + lesson.id;
  const state = workStore.read(key, cleanQuizLesson({}, lesson), (value) =>
    cleanQuizLesson(value, lesson),
  );
  const index = wedeLessons.indexOf(lesson);
  const previous = wedeLessons[index - 1];
  const next = wedeLessons[index + 1];
  const buttons =
    '<a class="button secondary" href="' +
    (previous ? lessonHref(previous) : '#wede') +
    '">' +
    (previous ? 'Previous lesson' : 'Course home') +
    '</a><a class="button" href="' +
    (next ? lessonHref(next) : '#progress/wede') +
    '">' +
    (next ? 'Next lesson' : 'View my progress') +
    '</a>';
  view.innerHTML = renderHtmlPage('studylab/wede-lesson', {
    dynamic_1: lesson.unit,
    dynamic_2: e(lesson.outcomes),
    dynamic_3: e(lesson.title),
    dynamic_4:
      lesson.sections
        .map(([title, body]) => '<h2>' + e(title) + '</h2><p>' + e(body) + '</p>')
        .join('') + stepByStep(lesson),
    dynamic_5: e(lesson.example),
    dynamic_6: languageSteps[lesson.slug]
      ? highlightedCode(lesson.code, languageSteps[lesson.slug][0][0])
      : codeBlock(lesson.code),
    dynamic_7: e(lesson.result),
    dynamic_8: e(lesson.task),
    dynamic_9: e(lesson.hint),
    dynamic_10: lesson.solution.includes('\n')
      ? codeBlock(lesson.solution)
      : '<p>' + e(lesson.solution) + '</p>',
    dynamic_11: lesson.quizzes
      .map(
        (q, i) =>
          '<form class="db-quiz"><fieldset><legend>' +
          (i + 1) +
          '. ' +
          e(q.question) +
          '</legend>' +
          q.options
            .map(
              (option, j) =>
                '<label class="quiz-option"><input type="radio" name="answer" value="' +
                j +
                '" required' +
                (state.choices[i] === j ? ' checked' : '') +
                '>' +
                e(option) +
                '</label>',
            )
            .join('') +
          '</fieldset><button class="button secondary" type="submit">Check answer</button><p class="feedback" role="status"></p></form>',
      )
      .join(''),
    dynamic_12: buttons,
    dynamic_13: e(explanation),
    dynamic_14: [
      [drill, drillAnswer],
      [challenge, challengeAnswer],
    ]
      .map(
        ([prompt, answer], index) =>
          `<h3>${index === 0 ? 'Quick exercise' : 'Apply it'}</h3><p>${e(prompt)}</p><details><summary>Show worked answer</summary><p>${e(answer)}</p></details>`,
      )
      .join(''),
    dynamic_15: tabs
      .map(
        ([id, label, suffix]) =>
          `<a class="button secondary" href="${lessonHref(lesson) + suffix}"${selectedSection === id ? ' aria-current="page"' : ''}>${label}</a>`,
      )
      .join(''),
  });
  for (const panel of view.querySelectorAll('[data-wede-section]')) {
    panel.hidden = panel.dataset.wedeSection !== selectedSection;
  }
  const bookDemo = view.querySelector('#wede-book-demo');
  if (bookDemo) {
    const status = view.querySelector('#wede-demo-places');
    let places = 3;
    const update = () => {
      status.textContent =
        places === 0
          ? 'Session full'
          : places === 1
            ? '1 place available'
            : places + ' places available';
      bookDemo.disabled = places === 0;
    };
    bookDemo.onclick = () => {
      places--;
      update();
    };
    view.querySelector('#wede-reset-demo').onclick = () => {
      places = 3;
      update();
      bookDemo.focus();
    };
  }
  const draft = view.querySelector('#wede-draft');
  draft.value = state.draft;
  draft.oninput = () => {
    state.draft = draft.value;
    workStore.write(key, state);
  };
  view.querySelectorAll('.db-quiz').forEach((form, index) => {
    const quiz = lesson.quizzes[index];
    const feedback = form.querySelector('.feedback');
    const describe = () => {
      feedback.textContent = state.checked[index]
        ? (state.choices[index] === quiz.answer ? 'Correct. ' : 'Try again. ') +
          quiz.explanation
        : '';
    };
    describe();
    form.onchange = () => {
      state.choices[index] = Number(new FormData(form).get('answer'));
      state.checked[index] = false;
      workStore.write(key, state);
      describe();
      refreshLessonCompletion(view, lesson.id, 'wede');
    };
    form.onsubmit = (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      state.choices[index] = Number(new FormData(form).get('answer'));
      state.checked[index] = true;
      workStore.write(key, state);
      describe();
      refreshLessonCompletion(view, lesson.id, 'wede');
    };
  });
  refreshLessonCompletion(view, lesson.id, 'wede');
  if (section === 'practice') {
    requestAnimationFrame(() => {
      if (draft.isConnected) {
        draft.focus({ preventScroll: true });
        view.querySelector('#wede-task').scrollIntoView({ block: 'start' });
      }
    });
  }
}

function renderBoxLab(view) {
  view.innerHTML = renderHtmlPage('studylab/wede-tools');
  const sizing = view.querySelector('#wede-sizing');
  const card = view.querySelector('.wede-box-card');
  const sliders = Object.fromEntries(
    ['width', 'padding', 'border', 'margin'].map((name) => [
      name,
      view.querySelector('#wede-' + name),
    ]),
  );
  function update() {
    for (const input of Object.values(sliders)) {
      view.querySelector('output[for="' + input.id + '"]').value = input.value;
    }
    const width = Number(sliders.width.value),
      padding = Number(sliders.padding.value),
      border = Number(sliders.border.value),
      margin = Number(sliders.margin.value);
    Object.assign(card.style, {
      boxSizing: sizing.value,
      width: width + 'px',
      padding: padding + 'px',
      borderWidth: border + 'px',
      margin: margin + 'px',
    });
    const edges = 2 * (padding + border);
    const content = sizing.value === 'border-box' ? width - edges : width;
    const borderBox = content + edges;
    view.querySelector('#wede-measurements').textContent =
      'Content ' +
      content +
      ' px . Border box ' +
      borderBox +
      ' px . Total including margins ' +
      (borderBox + 2 * margin) +
      ' px';
    view.querySelector('#wede-css').textContent =
      '.card {\n  box-sizing: ' +
      sizing.value +
      ';\n  width: ' +
      width +
      'px;\n  padding: ' +
      padding +
      'px;\n  border: ' +
      border +
      'px solid;\n  margin: ' +
      margin +
      'px;\n}';
  }
  sizing.onchange = update;
  for (const input of Object.values(sliders)) input.oninput = update;
  update();
}

export function renderWedePage({ view, page, id, section }) {
  if (page === 'wede-lesson') {
    const lesson = wedeLessons.find((l) => l.id === id);
    if (lesson) {
      renderLesson(view, lesson, section);
      return;
    }
  } else if (page === 'wede-unit') {
    const unit = wedeUnits.find((u) => String(u.id) === id);
    if (unit) {
      view.innerHTML = renderHtmlPage('studylab/wede-unit', {
        dynamic_1: unit.id,
        dynamic_2: e(unit.sessions),
        dynamic_3: e(unit.title),
        dynamic_4: e(unit.goal),
        dynamic_5: lessonsFor(unit.id)
          .map(
            (lesson) =>
              '<article class="lesson-row"><div><h3><a href="' +
              lessonHref(lesson) +
              '">' +
              e(lesson.title) +
              '</a></h3><p>' +
              e(lesson.outcomes) +
              '</p></div></article>',
          )
          .join(''),
        dynamic_6: e(unit.checkpoint),
      });
      return;
    }
  } else if (page === 'wede-practice') {
    view.innerHTML = renderHtmlPage('studylab/wede-practice', {
      dynamic_1: wedeUnits.map((u) => unitCard(u, true)).join(''),
    });
    return;
  } else if (page === 'wede-resources') {
    view.innerHTML = renderHtmlPage('studylab/wede-resources', {
      dynamic_1: resourceFiles
        .map(
          ([label, file]) =>
            '<li><a href="./downloads/modules/' +
            file +
            '" download>' +
            e(label) +
            '</a> (' +
            file.split('.').pop().toUpperCase() +
            ')</li>',
        )
        .join(''),
      dynamic_2: webReferences
        .map(
          ([label, url]) =>
            '<li><a class="text-link" href="' + e(url) + '">' + e(label) + '</a></li>',
        )
        .join(''),
    });
    return;
  } else if (page === 'wede-tools') {
    renderBoxLab(view);
    return;
  } else if (page === 'wede') {
    view.innerHTML = renderHtmlPage('studylab/wede-home', {
      dynamic_1:
        progressSummary('wede') +
        '<nav class="button-row" aria-label="Step-by-step tutorials">' +
        languageStarts
          .map(
            ([label, slug]) =>
              `<a class="button secondary" href="#wede-lesson/wede-${slug}">${label}</a>`,
          )
          .join('') +
        '<a class="button secondary" href="/learn/github/">GitHub step by step</a></nav>',
      dynamic_2: wedeUnits.map((u) => unitCard(u)).join(''),
    });
    return;
  }
  view.innerHTML =
    '<h1>Web development lesson unavailable</h1><a class="button" href="#wede">Browse the learning units</a>';
}
