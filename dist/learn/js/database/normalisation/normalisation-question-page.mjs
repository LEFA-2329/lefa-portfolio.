import {
  normalisationExamples,
  dependencyDiagram,
  stageHTML,
  normalisationRules,
  bindDiagramFit,
} from './normalisation-lessons-and-diagrams.mjs?v=39';
import { escapeHTML as e } from '../../programming-logic/pseudocode-parser-and-diagrams.mjs?v=39';
import { workStore } from '../../shared/saved-work-storage.mjs?v=39';
export const normalisationQuestions = [
  {
    marks: 2,
    prompt: 'State the candidate key and explain why this relation is in 1NF.',
  },
  {
    marks: 4,
    prompt:
      'List the functional dependencies. Classify the full, partial and transitive dependencies; distinguish direct rules from implied key paths.',
  },
  {
    marks: 4,
    prompt:
      'Decompose to 2NF. Draw an attribute-row dependency diagram for every resulting table and give each relational schema with its primary key.',
  },
  {
    marks: 4,
    prompt:
      'Decompose to 3NF. Draw every resulting dependency diagram, give the relational schemas and identify all foreign keys.',
  },
  {
    marks: 4,
    prompt:
      'Draw the final ERD using the foreign-key links. State both sides of each relationship and explain how joining the final tables reconstructs the original facts.',
  },
  {
    marks: 2,
    prompt:
      'Describe one update, insertion or deletion anomaly in the original relation. Explain which decomposition prevents it.',
  },
];
export const cleanNormalisationWork = (raw) => ({
  draft: typeof raw?.draft === 'string' ? raw.draft.slice(0, 20000) : '',
  attempted: raw?.attempted === true,
  revealed: raw?.attempted === true && raw?.revealed === true,
});
const schema = (t) =>
  `${t.name}(${t.attributes.map((a) => a + (t.key.includes(a) ? ' PK' : '') + (t.foreign[a] ? ' FK' : '')).join(', ')})`;
export function normalisationSolution(id) {
  const x = normalisationExamples[id];
  if (!x) return '';
  const t = x.stages[1].tables[0],
    final = x.stages[3].tables;
  return `<h2>Worked solution: ${e(x.title)}</h2><h3>1. Key and 1NF / 2 marks</h3><p>The stated candidate key is (${e(t.key.join(', '))}). All cells are atomic, with one row per key combination; no repeating group remains.</p><h3>2. Dependencies / 4 marks</h3><ul>${t.dependencies.map((d) => `<li><strong>${e(d.kind === 'full' ? 'Full/key dependency' : d.kind === 'partial' ? 'Partial dependency' : 'Transitive dependency through a non-key determinant')}:</strong> ${e(d.from.join(' + '))} determines ${e(d.to.join(', '))}.</li>`).join('')}</ul><p>The whole key also determines every non-key attribute through any partial or transitive paths. Those implied paths do not turn a partial dependency into a full dependency.</p><h3>3. 2NF diagrams and schemas / 4 marks</h3>${stageHTML(id, 2)}<pre><code>${e(x.stages[2].tables.map(schema).join('\n'))}</code></pre><h3>4. 3NF diagrams and schemas / 4 marks</h3>${stageHTML(id, 3)}<pre><code>${e(final.map(schema).join('\n'))}</code></pre><h3>5. Final ERD relationships / 4 marks</h3><p>Use these links to draw your ERD. Each child row references exactly one parent; a parent may have zero or many child rows under these rules. Mandatory parent participation is not implied. For a composite child key, repeat neither the complete combination nor an individual entity table merely because it participates in several links.</p><ul>${final.flatMap((t) => Object.entries(t.foreign).map(([a, parent]) => `<li>${e(parent.split('.')[0])} (one) to ${e(t.name)} (zero or many), joined through ${e(t.name + '.' + a + ' = ' + parent)}.</li>`)).join('')}</ul><p>The shared determinant is a key in each extracted table. Join using the listed foreign keys to recover the original attributes without creating unrelated combinations. The sample-row tables illustrate this; the declared dependencies justify the decomposition for all valid data.</p><h3>6. Anomaly / 2 marks</h3><p>${e(anomaly(x))}</p><p class="note">Award marks for correct reasoning and equivalent table names. Diagrams must preserve the stated dependencies and keys. Written answers are self-assessed.</p>`;
}
function anomaly(x) {
  const d =
    x.stages[1].tables[0].dependencies.find((d) => d.kind === 'transitive') ||
    x.stages[1].tables[0].dependencies.find((d) => d.kind === 'partial');
  return `An update anomaly occurs when ${d.to.join(', ')} is repeated across rows and only some copies are changed. In the final decomposition, these facts are stored once per ${d.from.join(' + ')} in its own table. Referencing rows retain the identifier rather than a conflicting duplicate of the descriptive fact.`;
}
export function normalisationPracticePage({ view, sidebar, id }) {
  if (!normalisationExamples[id]) id = 'projects';
  let work = workStore.read(
    'normalisation:' + id,
    cleanNormalisationWork({}),
    cleanNormalisationWork,
  );
  const draw = () => {
    const x = normalisationExamples[id];
    view.innerHTML = `<p class="eyebrow">DATABASE DESIGN / DEPENDENCY DIAGRAMS</p><h1>From 1NF to 3NF.</h1><p><a class="button" href="#nf-builder/${id}/standard">Build and automatically check my diagrams</a></p><p class="lede">Nine original cases and 54 questions in the attribute-row style: composite keys, upper key arrows and lower partial/transitive dependencies.</p>${normalisationRules()}<section class="panel"><h2>Choose a diagram question</h2><label class="field-label" for="nf-practice-case">Practice case</label><select id="nf-practice-case">${Object.entries(
      normalisationExamples,
    )
      .map(
        ([key, x]) =>
          `<option value="${key}" ${key === id ? 'selected' : ''}>${e(x.title)}</option>`,
      )
      .join(
        '',
      )}</select><h3>${e(x.title)} / 20 marks</h3><p><strong>Business rules:</strong> ${e(x.assumptions)}</p><p>The diagram shows a relation with atomic values. Read the stated dependencies, then draw your own 2NF and 3NF diagrams. Fit or scroll the diagram as needed.</p>${dependencyDiagram(x.stages[1].tables[0], 'question-' + id, true)}<ol>${normalisationQuestions.map((q) => `<li>${e(q.prompt)} <strong>(${q.marks} marks)</strong></li>`).join('')}</ol><form id="nf-attempt"><label class="field-label" for="nf-draft">Your schemas, dependencies and reasoning</label><textarea class="editor" id="nf-draft" maxlength="20000" rows="10" placeholder="Write your key, dependencies and table schemas. Draw the diagrams on paper, then compare with the worked stages.">${e(work.draft)}</textarea><p>You may draw the diagrams on paper. Save a short explanation here before opening the answer.</p><div class="button-row"><button class="button" type="submit">Save my attempt</button><button class="button secondary" type="button" id="nf-reveal" ${work.attempted ? '' : 'disabled'}>${work.revealed ? 'Hide' : 'Show'} worked solution</button><button class="button secondary" type="button" id="nf-print">Print question / current view</button></div><p id="nf-attempt-status" role="status">${work.attempted ? 'Attempt saved. Compare your answer with the worked diagrams.' : 'Try the questions before revealing the solution. Drafts save in this browser.'}</p></form></section><div id="nf-solution" ${work.revealed ? '' : 'hidden'}>${work.revealed ? normalisationSolution(id) : ''}</div>`;
    view.querySelector('#nf-practice-case').onchange = (event) => {
      location.hash = 'normalisation/' + event.target.value;
    };
    const input = view.querySelector('#nf-draft');
    input.oninput = () => {
      work.draft = input.value;
      workStore.write('normalisation:' + id, work);
    };
    view.querySelector('#nf-attempt').onsubmit = (event) => {
      event.preventDefault();
      if (!input.value.trim()) {
        view.querySelector('#nf-attempt-status').textContent =
          'Write a short attempt first, even if your diagrams are on paper.';
        return;
      }
      work.attempted = true;
      work.draft = input.value;
      const saved = workStore.write('normalisation:' + id, work);
      view.querySelector('#nf-reveal').disabled = false;
      view.querySelector('#nf-attempt-status').textContent = saved
        ? 'Attempt saved. You can now compare with the worked solution.'
        : 'Attempt recorded on this page. Browser saving is unavailable; keep a copy before leaving.';
    };
    view.querySelector('#nf-reveal').onclick = () => {
      if (!work.attempted) return;
      work.revealed = !work.revealed;
      workStore.write('normalisation:' + id, work);
      const host = view.querySelector('#nf-solution');
      host.hidden = !work.revealed;
      host.innerHTML = work.revealed ? normalisationSolution(id) : '';
      view.querySelector('#nf-reveal').textContent =
        (work.revealed ? 'Hide' : 'Show') + ' worked solution';
      bindDiagramFit(host);
    };
    view.querySelector('#nf-print').onclick = () => window.print();
    bindDiagramFit(view);
    sidebar();
  };
  draw();
}
