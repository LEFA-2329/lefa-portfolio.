// Searchable task library and individual task attempts.
import { taskBank } from './content/practice-task-bank.mjs?v=40';
import { workStore } from '../shared/saved-work-storage.mjs?v=40';
import { cleanTask } from '../shared/saved-programming-answers.mjs?v=40';
import { codeBlock } from '../shared/render-code-block.mjs?v=structure-57';
import { escapeHTML as e } from './pseudocode-parser-and-diagrams.mjs?v=40';
export function createProgrammingTaskPages({ view, crumb, sidebar, openDiagram }) {
  const $ = (selector) => view.querySelector(selector);
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
          (!query ||
            [t.title, t.prompt, t.topic].join(' ').toLowerCase().includes(query)),
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
        openDiagram(s.work);
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

  return { tasksPage, taskPage };
}
