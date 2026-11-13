import { workStore } from '../shared/work-store.mjs?v=30';
import { cleanActivity } from '../shared/work-state.mjs?v=30';
import { activities, checkActivity } from './content/activities.mjs?v=30';
import { escapeHTML as e } from './engine.mjs?v=30';
const work = new Map();
let filters = { unit: 'All', kind: 'All' };
const types = ['Missing line', 'Predict the output', 'Reorder statements', 'Debugging'];
function stateFor(a) {
  if (!work.has(a.id))
    work.set(
      a.id,
      workStore.read('activity:' + a.id, cleanActivity(a, {}), (raw) =>
        cleanActivity(a, raw),
      ),
    );
  return work.get(a.id);
}
const code = (text) => `<pre class="activity-code"><code>${e(text)}</code></pre>`;
export function activitiesPage({ view, crumb, sidebar }) {
  view.innerHTML =
    crumb('Interactive exercises') +
    `<p class="eyebrow">FOUR WAYS TO TEST YOUR THINKING</p><h1>Try it. Check it. Understand it.</h1><p class="lede">20 focused activities across all five units. Complete a line, predict output, arrange statements or repair an error. Ask for a small clue, then a stronger hint before revealing a worked solution.</p><div class="button-row"><a class="button secondary" href="#tasks">Written task library</a><a class="button secondary" href="#trace">Interactive tracing</a></div><section class="panel activity-filters"><label class="field-label">Learning unit<select id="activity-unit"><option value="All">All units</option>${[1, 2, 3, 4, 5].map((u) => `<option value="${u}" ${filters.unit === String(u) ? 'selected' : ''}>Unit ${u}</option>`).join('')}</select></label><label class="field-label">Activity type<select id="activity-kind"><option value="All">All types</option>${types.map((t) => `<option ${filters.kind === t ? 'selected' : ''}>${e(t)}</option>`).join('')}</select></label><button class="button secondary" id="activity-clear">Clear filters</button></section><p id="activity-count" role="status"></p><div class="task-grid" id="activity-results"></div><p class="note">Practice answers are checked against the stated task. Answers, statement order and hints save in this browser when storage is available. Use Saved work to review or clear them. Methods and object examples are checked as exercises; the tracer does not execute them yet.</p>`;
  const $ = (s) => view.querySelector(s);
  function results() {
    const list = activities.filter(
      (a) =>
        (filters.unit === 'All' || String(a.unit) === filters.unit) &&
        (filters.kind === 'All' || a.kind === filters.kind),
    );
    $('#activity-count').textContent =
      `${list.length} ${list.length === 1 ? 'activity' : 'activities'} found`;
    $('#activity-results').innerHTML = list
      .map(
        (a) =>
          `<article class="task-card"><div class="task-badges"><span class="topic-badge">Unit ${a.unit}</span><span class="level-badge">${e(a.kind)}</span></div><h2>${e(a.title)}</h2><p>${e(a.prompt)}</p><div class="task-card-bottom"><a class="button secondary" href="#activity/${a.id}">Try activity</a></div></article>`,
      )
      .join('');
  }
  $('#activity-unit').onchange = (event) => {
    filters.unit = event.target.value;
    results();
  };
  $('#activity-kind').onchange = (event) => {
    filters.kind = event.target.value;
    results();
  };
  $('#activity-clear').onclick = () => {
    filters = { unit: 'All', kind: 'All' };
    $('#activity-unit').value = 'All';
    $('#activity-kind').value = 'All';
    results();
  };
  results();
  sidebar();
}
export function activityPage({ id, view, crumb, sidebar }) {
  const a = activities.find((x) => x.id === id);
  if (!a) {
    location.hash = 'activities';
    return;
  }
  const s = stateFor(a),
    $ = (selector) => view.querySelector(selector);
  const persist = () => workStore.write('activity:' + a.id, cleanActivity(a, s));
  view.innerHTML =
    crumb(`Unit ${a.unit} / ${a.kind}`) +
    `<a class="text-link" href="#activities">Back to interactive exercises</a><p class="eyebrow">UNIT ${a.unit} / ${e(a.kind)}</p><h1>${e(a.title)}</h1><p class="lede">${e(a.prompt)}</p><div class="activity-workspace"><section class="panel"><h2>Your attempt</h2>${a.code ? code(a.code) : '<p>Use Move up and Move down to arrange the statements. You can use the buttons with a keyboard; dragging is not required.</p>'}<form id="activity-form">${a.statements ? '<ol id="activity-order" class="activity-order"></ol>' : `<fieldset class="activity-choices"><legend>Choose your answer</legend>${a.choices.map((c, i) => `<label><input type="radio" name="activity-answer" value="${i}" ${s.answer === i ? 'checked' : ''}><span><code>${e(c)}</code></span></label>`).join('')}</fieldset>`}<div class="button-row"><button class="button" type="submit">Check my attempt</button></div><p id="activity-feedback" class="feedback" role="status">${e(s.feedback)}</p></form></section><aside class="panel activity-support"><p class="eyebrow">CLUE, HINT, THEN SOLUTION</p><h2>Need a nudge?</h2><button class="button secondary" id="activity-hint">${s.hints === 0 ? 'Show a small clue' : s.hints === 1 ? 'Show a stronger hint' : 'Both hints shown'}</button><ol id="activity-hints" class="activity-hints"></ol><h2>Worked solution</h2><p>Submit an attempt first. A correct answer is not required to unlock the explanation.</p><button class="button secondary" id="activity-reveal" ${s.attempts ? '' : 'disabled'}>Reveal worked solution</button><p id="activity-lock" ${s.attempts ? 'hidden' : ''}>Choose an answer, or change the statement order, then check your attempt.</p><div id="activity-solution"></div></aside></div><div class="button-row"><a class="button secondary" href="#activities">Choose another activity</a><a class="button ghost" href="#unit/${a.unit}">Review Unit ${a.unit}</a></div>`;
  function support() {
    $('#activity-hint').disabled = s.hints === 2;
    $('#activity-hint').textContent =
      s.hints === 0
        ? 'Show a small clue'
        : s.hints === 1
          ? 'Show a stronger hint'
          : 'Both hints shown';
    $('#activity-hints').innerHTML = a.hints
      .slice(0, s.hints)
      .map(
        (hint, i) =>
          `<li><strong>${i === 0 ? 'Small clue' : 'Stronger hint'}</strong><p>${e(hint)}</p></li>`,
      )
      .join('');
    $('#activity-reveal').disabled = s.attempts === 0;
    $('#activity-lock').hidden = s.attempts > 0;
    $('#activity-solution').innerHTML = s.revealed
      ? `${code(a.solution)}<h3>Why this works</h3><p>${e(a.explanation)}</p>`
      : '';
  }
  function changed() {
    s.feedback = 'Answer changed. Check this attempt when you are ready.';
    $('#activity-feedback').textContent = s.feedback;
    persist();
  }
  function order(focusId = null) {
    $('#activity-order').innerHTML = s.order
      .map(
        (value, index) =>
          `<li><span class="activity-position">${index + 1}</span><code>${e(a.statements[value])}</code><div class="activity-move"><button type="button" data-move="${index}" data-delta="-1" ${index === 0 ? 'disabled' : ''} aria-label="Move statement ${index + 1} up">Move up</button><button type="button" data-move="${index}" data-delta="1" ${index === s.order.length - 1 ? 'disabled' : ''} aria-label="Move statement ${index + 1} down">Move down</button></div></li>`,
      )
      .join('');
    view.querySelectorAll('[data-move]').forEach((button) => {
      button.onclick = () => {
        const at = Number(button.dataset.move),
          delta = Number(button.dataset.delta),
          next = at + delta;
        [s.order[at], s.order[next]] = [s.order[next], s.order[at]];
        s.moved = true;
        changed();
        order({
          index: next,
          delta: next === 0 ? 1 : next === s.order.length - 1 ? -1 : delta,
        });
      };
    });
    if (focusId)
      view
        .querySelector(`[data-move="${focusId.index}"][data-delta="${focusId.delta}"]`)
        ?.focus();
  }
  if (a.statements) order();
  else
    view.querySelectorAll('[name="activity-answer"]').forEach((input) => {
      input.onchange = () => {
        s.answer = Number(input.value);
        changed();
      };
    });
  $('#activity-form').onsubmit = (event) => {
    event.preventDefault();
    if (a.statements ? !s.moved : s.answer === null) {
      s.feedback = a.statements
        ? 'Move at least one statement before checking your attempt.'
        : 'Choose an answer before checking your attempt.';
      $('#activity-feedback').textContent = s.feedback;
      return;
    }
    s.attempts = Math.min(10000, s.attempts + 1);
    const correct = checkActivity(a, a.statements ? s.order : s.answer);
    s.feedback = correct
      ? 'Correct. Reveal the worked solution to review the reasoning.'
      : 'Not quite yet. Use a hint and try again, or reveal the worked solution to compare your reasoning.';
    $('#activity-feedback').textContent = s.feedback;
    persist();
    support();
  };
  $('#activity-hint').onclick = () => {
    s.hints = Math.min(2, s.hints + 1);
    persist();
    support();
  };
  $('#activity-reveal').onclick = () => {
    if (s.attempts === 0) return;
    s.revealed = true;
    persist();
    support();
  };
  support();
  sidebar();
}
