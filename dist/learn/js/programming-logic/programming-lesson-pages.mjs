// Programming lesson lifecycle, tabs, quizzes and independent attempts.
import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=structure-57';
import { units, lessons } from './content/lessons-and-quizzes.mjs?v=40';
import { practice } from './content/lesson-practice.mjs?v=40';
import { workStore } from '../shared/saved-work-storage.mjs?v=40';
import { cleanLesson } from '../shared/saved-programming-answers.mjs?v=40';
import { refreshLessonCompletion } from '../shared/learning-progress.mjs?v=structure-57';
import { codeBlock } from '../shared/render-code-block.mjs?v=structure-57';
import {
  parse,
  flowchart,
  hierarchy,
  classDiagram,
  escapeHTML as e,
} from './pseudocode-parser-and-diagrams.mjs?v=40';
export function createProgrammingLessonPages({ view, crumb, sidebar, openDiagram }) {
  const $ = (selector) => view.querySelector(selector);
  let states = new Map(),
    activeLesson = null,
    activeTab = 'theory';
  // Persist only this controller's active lesson state.
  function persistLesson(l = activeLesson) {
    if (!l) return;
    const state = states.get(l.id);
    if (!state) return;
    state.tab = activeTab;
    workStore.write('lesson:' + l.id, cleanLesson(l, practice[l.id], state));
    refreshLessonCompletion(view, l.id, 'prld');
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
          openDiagram(practice[l.id].worked.code);
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
          openDiagram($('#task-work').value);
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
        )}</select></label><label class="field-label">Error category<select name="category" required><option value="">Choose a category</option>${['Syntax', 'Logic', 'Calculation', 'Boundary', 'Initialisation', 'Design'].map((c) => `<option ${s.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></label></div><fieldset><legend style="font-size:13px">Which correction fixes the stated problem?</legend>${b.options.map((o, i) => `<label class="quiz-option"><input type="radio" name="correction" value="${i}" required ${s.correction === i ? 'checked' : ''}><span>${e(o)}</span></label>`).join('')}</fieldset><div class="button-row"><button type="submit" class="button">Check my attempt</button><button type="button" class="button secondary" id="debug-hint" ${s.debugAttempts ? '' : 'disabled'}>Get a hint</button><button type="button" class="button ghost" id="reveal-answer" ${s.debugAttempts ? '' : 'disabled'}>Reveal model answer</button></div><div id="debug-feedback" role="status" class="feedback">${s.debugFeedback ? e(s.debugFeedback) : ''}</div><div id="debug-hint-text" class="note" ${s.debugHintShown ? '' : 'hidden'}>${s.debugHintShown ? e(b.hint) : ''}</div><div id="model-answer" class="model-answer" ${s.debugRevealed ? '' : 'hidden'}><h3>Model answer</h3><p>Line ${b.line} . ${e(b.category)} error</p><code>${e(b.options[b.correct])}</code><p>${e(b.explanation)}</p></div></form>`;
      $('#debug-form').onchange = () => {
        const fd = new FormData($('#debug-form'));
        s.line = fd.get('line') ? Number(fd.get('line')) : null;
        s.category = String(fd.get('category') || '');
        s.correction =
          fd.get('correction') === null ? null : Number(fd.get('correction'));
        s.debugChecked = false;
        s.bugPassed = false;
        s.debugFeedback = 'Answer changed. Check your attempt when you are ready.';
        $('#debug-feedback').textContent = s.debugFeedback;
        persistLesson(l);
      };
      $('#debug-form').onsubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.currentTarget);
        if (!fd.get('line') || !fd.get('category') || fd.get('correction') === null)
          return;
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

  return { unitPage, lessonPage, getActiveLesson: () => activeLesson };
}
