import { renderHtmlPage } from '../../../../shared/render-html-page.mjs?v=33';
import { exercises } from './sql-practice-challenges.mjs?v=33';
export { exercises };
const cleanDraft = (raw) => ({
  code: typeof raw?.code === 'string' ? raw.code.slice(0, 30000) : '',
});
import {
  datasets,
  dialects,
  sqlExamples,
  setupScript,
} from './demo-databases-and-examples.mjs?v=33';
import { workStore } from '../../shared/saved-work-storage.mjs?v=33';
import { escapeHTML as e } from '../../programming-logic/pseudocode-parser-and-diagrams.mjs?v=33';
function download(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function sqlPage({ view, id, modeOverride, sidebar }) {
  const pref = workStore.read(
    'sql-settings',
    { dataset: 'college', mode: 'sqlserver' },
    (raw) => ({
      dataset: Object.hasOwn(datasets, raw?.dataset) ? raw.dataset : 'college',
      mode: Object.hasOwn(dialects, raw?.mode) ? raw.mode : 'sqlserver',
    }),
  );
  let dataset = pref.dataset,
    mode = Object.hasOwn(dialects, modeOverride) ? modeOverride : pref.mode;
  const restored = /^draft-([a-z]+)-(sqlserver|postgresql|mysql)$/.exec(id || '');
  if (restored && Object.hasOwn(datasets, restored[1])) {
    dataset = restored[1];
    mode = restored[2];
  }
  const requested = sqlExamples.find((x) => x.id === id),
    requestedTask = id?.startsWith('challenge-')
      ? exercises.find((x) => x.id === id.slice(10))
      : null;
  if (requested) dataset = requested.dataset;
  if (requestedTask) dataset = requestedTask.dataset;
  let worker = null,
    serial = 0,
    pending = null,
    timer = null,
    disposed = false,
    busy = false,
    selectedTask = requestedTask?.id || '',
    restartNotice = '';
  const key = () =>
    selectedTask ? `sqlchallenge:${selectedTask}:${mode}` : `sql:${dataset}:${mode}`;
  const sample = (ex) => (typeof ex.code === 'function' ? ex.code(mode) : ex.code);
  let draft = workStore.read(
    key(),
    { code: selectedTask ? '' : sample(sqlExamples.find((x) => x.dataset === dataset)) },
    cleanDraft,
  );
  if (requested) draft.code = sample(requested);
  view.innerHTML = renderHtmlPage('studylab/sql-workspace', {
    dynamic_1: Object.entries(dialects)
      .map(
        ([k, v]) => `<option value="${k}" ${k === mode ? 'selected' : ''}>${v}</option>`,
      )
      .join(''),
    dynamic_2: Object.entries(datasets)
      .map(
        ([k, v]) =>
          `<option value="${k}" ${k === dataset ? 'selected' : ''}>${e(v.title)}</option>`,
      )
      .join(''),
    dynamic_3: e(draft.code),
    dynamic_4: exercises
      .map(
        (x) =>
          `<option value="${x.id}">${e(x.title)} (${datasets[x.dataset].title})</option>`,
      )
      .join(''),
  });
  const $ = (s) => view.querySelector(s),
    editor = $('#sql-editor');
  const save = () => workStore.write(key(), { code: editor.value });
  const saveSettings = () => workStore.write('sql-settings', { dataset, mode });
  function controls(running) {
    busy = running;
    $('#sql-run').disabled = running || !worker;
    $('#sql-check').disabled = running || !worker || !selectedTask;
    editor.readOnly = running;
    $('#sql-stop').disabled = !running;
    $('#sql-reset').disabled = running;
    $('#sql-mode').disabled = running;
    $('#sql-dataset').disabled = running;
    $('#sql-load').disabled = running;
    $('#sql-task').disabled = running;
  }
  function taskState() {
    return selectedTask
      ? workStore.read(
          `sqltask:${selectedTask}:${mode}`,
          { attempted: false, hint: false, revealed: false },
          (r) => ({
            attempted: !!r?.attempted,
            hint: !!r?.hint,
            revealed: !!r?.revealed,
            lastGrade:
              r?.lastGrade &&
              ['correct', 'incorrect', 'error'].includes(r.lastGrade.status) &&
              typeof r.lastGrade.message === 'string' &&
              typeof r.lastGrade.code === 'string'
                ? {
                    status: r.lastGrade.status,
                    message: r.lastGrade.message.slice(0, 2000),
                    code: r.lastGrade.code.slice(0, 30000),
                  }
                : null,
          }),
        )
      : null;
  }
  function renderTask() {
    const task = exercises.find((t) => t.id === selectedTask);
    if (!task) return;
    const state = taskState();
    $('#sql-task-panel').innerHTML =
      `<h3>${e(task.title)}</h3><p>${e(task.prompt)}</p><p class="muted">Check my answer tests your SQL on fresh ${e(datasets[task.dataset].title)} data and a second dataset with extra rows and edge cases. It leaves your open workspace unchanged. Run SQL executes in your current workspace. Column aliases may differ unless explicitly requested; row order is checked when the prompt requests it.</p><p id="sql-grade-feedback" class="feedback"></p><div class="button-row"><button class="button secondary" id="sql-task-hint">Hint</button><button class="button secondary" id="sql-task-answer" ${state.attempted ? '' : 'disabled'}>Reveal worked answer</button></div><p class="note" id="sql-task-hint-text" ${state.hint ? '' : 'hidden'}>${e(task.hint)}</p><section class="model-answer" id="sql-task-answer-text" ${state.attempted && state.revealed ? '' : 'hidden'}><h3>Worked answer</h3><pre><code>${e(task.answer)}</code></pre><p>${e(task.expected)}</p><p>Compare the columns, row values and ordering from your query with this answer.</p></section>`;
    gradeFeedback();
    $('#sql-task-hint').onclick = () => {
      state.hint = true;
      workStore.write(`sqltask:${selectedTask}:${mode}`, state);
      $('#sql-task-hint-text').hidden = false;
    };
    $('#sql-task-answer').onclick = () => {
      if (!state.attempted) return;
      state.revealed = true;
      workStore.write(`sqltask:${selectedTask}:${mode}`, state);
      $('#sql-task-answer-text').hidden = false;
    };
  }
  function gradeFeedback() {
    const last = taskState()?.lastGrade;
    for (const host of [$('#sql-grade-feedback'), $('#sql-grade-summary')]) {
      if (!host) continue;
      host.hidden = !selectedTask;
      host.textContent = !selectedTask
        ? ''
        : last
          ? last.code === editor.value
            ? last.message
            : 'Your query has changed since the last check. Choose Check my answer to mark this version.'
          : 'No answer checked yet. Write your query, then choose Check my answer.';
      host.className =
        'feedback ' +
        (last?.code === editor.value && last.status === 'correct'
          ? 'sql-grade-correct'
          : '');
    }
  }

  function examples() {
    const list = sqlExamples.filter((x) => x.dataset === dataset);
    $('#sql-example').innerHTML = list
      .map(
        (x) =>
          `<option value="${x.id}" ${requested?.id === x.id ? 'selected' : ''}>${e(x.title)}</option>`,
      )
      .join('');
    $('#sql-example-help').textContent =
      'Choose an example and select Load example to replace the editor text.';
    $('#sql-data-description').textContent = datasets[dataset].description;
  }
  function showSchema(rows) {
    $('#sql-schema').innerHTML = rows
      .map(
        ([name, type, definition]) =>
          `<details><summary>${e(name)} <small>${e(type)}</small></summary><pre><code>${e(definition || '')}</code></pre>${type === 'table' || type === 'view' ? `<button class="button secondary" data-preview="${e(name)}">Preview rows</button>` : ''}</details>`,
      )
      .join('');
    view.querySelectorAll('[data-preview]').forEach(
      (b) =>
        (b.onclick = () => {
          editor.value =
            mode === 'sqlserver'
              ? `SELECT TOP (20) * FROM [${b.dataset.preview.replaceAll(']', ']]')}];`
              : `SELECT * FROM "${b.dataset.preview.replaceAll('"', '""')}" LIMIT 20;`;
          save();
          run();
        }),
    );
  }
  function renderResults(results) {
    $('#sql-results').innerHTML = results
      .map(
        (r) =>
          `<section class="sql-result"><h3>Statement ${r.statement}${r.adapted ? ' . dialect syntax adapted' : ''}</h3>${r.columns.length ? `<p>${r.values.length}${r.truncated ? '+' : ''} row${r.values.length === 1 ? '' : 's'} displayed${r.truncated ? ' . display capped at 500' : ''}.</p><div class="scroll-table"><table class="db-table"><thead><tr>${r.columns.map((c) => `<th scope="col">${e(c)}</th>`).join('')}</tr></thead><tbody>${r.values.map((row) => `<tr>${row.map((v) => `<td>${v === null ? '<span class="sql-null">NULL</span>' : e(String(v))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${r.values.length ? '' : '<p>No matching rows.</p>'}` : `<p>Statement completed. ${r.changed === null ? 'Structure updated.' : r.changed + ' row(s) affected.'}</p>`}</section>`,
      )
      .join('');
  }
  function start(notice = '') {
    restartNotice = notice;
    worker?.terminate();
    clearTimeout(timer);
    worker = new Worker(new URL('./sql-database-worker.js?v=33', import.meta.url));
    const current = worker;
    worker.onmessage = (event) => {
      if (disposed || current !== worker || event.data.id !== pending?.id) return;
      clearTimeout(timer);
      const request = pending;
      pending = null;
      controls(false);
      const msg = event.data;
      if (msg.report) {
        const st = taskState();
        st.lastGrade = { ...msg.report, code: request.code };
        workStore.write(`sqltask:${selectedTask}:${mode}`, st);
        renderTask();
        $('#sql-status').textContent =
          'Answer checked on fresh test data. Your open workspace is unchanged.';
        $('#sql-status').className = 'sql-ready';
        return;
      }
      if (!msg.ok) {
        $('#sql-status').textContent =
          msg.error + ' No changes from this failed run were kept.';
        $('#sql-status').className = 'runner-error';
        return;
      }
      showSchema(msg.schema);
      if (request.action === 'run') {
        renderResults(msg.results);
        $('#sql-status').textContent =
          `Finished in ${Math.round(performance.now() - request.started)} ms. ${msg.results.length} statement(s) executed.`;
      } else {
        $('#sql-status').textContent =
          `${restartNotice}${restartNotice ? ' ' : ''}${datasets[dataset].title} demo ready. Write a query or load an example.`;
        restartNotice = '';
        $('#sql-results').innerHTML = '';
      }
      $('#sql-status').className = 'sql-ready';
    };
    worker.onerror = () => {
      clearTimeout(timer);
      worker?.terminate();
      worker = null;
      pending = null;
      controls(false);
      $('#sql-status').textContent =
        'The SQL engine could not load. Check your connection and choose Reset demo data to retry. Your draft is still available.';
      $('#sql-status').className = 'runner-error';
    };
    send('init', 15000);
  }
  function send(action, timeout) {
    if (action === 'run') $('#sql-results').innerHTML = '';
    const id = ++serial;
    pending = { id, action, code: editor.value, started: performance.now() };
    controls(true);
    $('#sql-status').className = '';
    $('#sql-status').textContent =
      action === 'init'
        ? 'Loading the local SQL engine...'
        : action === 'grade'
          ? 'Checking your answer on fresh datasets...'
          : 'Running SQL...';
    worker.postMessage({
      id,
      action,
      dataset,
      mode,
      code: editor.value,
      taskId: selectedTask,
    });
    timer = setTimeout(() => {
      if (disposed || pending?.id !== id) return;
      const wasRun = action !== 'init';
      worker.terminate();
      worker = null;
      pending = null;
      controls(false);
      $('#sql-results').innerHTML = '';
      if (wasRun) {
        start(
          'Query exceeded 4 seconds and was stopped. Original demo restored; your SQL draft is kept.',
        );
      } else {
        $('#sql-status').textContent =
          'The SQL engine took too long to load. Check your connection and use Reset demo data to retry.';
        $('#sql-status').className = 'runner-error';
      }
    }, timeout);
  }
  function run() {
    if (busy || !worker) return;
    if (!editor.value.trim()) {
      $('#sql-status').textContent = 'Write an SQL statement first.';
      return;
    }
    save();
    if (selectedTask) {
      const st = taskState();
      st.attempted = true;
      workStore.write(`sqltask:${selectedTask}:${mode}`, st);
      renderTask();
    }
    send('run', 4000);
  }
  function checkAnswer() {
    if (busy || !worker || !selectedTask) return;
    if (!editor.value.trim()) {
      $('#sql-status').textContent = 'Write your SQL answer before checking it.';
      return;
    }
    save();
    const st = taskState();
    st.attempted = true;
    workStore.write(`sqltask:${selectedTask}:${mode}`, st);
    renderTask();
    send('grade', 4000);
  }
  function reset(nextDataset = dataset, after = () => {}) {
    const dialog = $('#sql-reset-dialog');
    $('#sql-reset-confirm').onclick = () => {
      save();
      const changing = dataset !== nextDataset;
      dataset = nextDataset;
      if (changing) {
        selectedTask = '';
        history.replaceState(null, '', '#sql');
        gradeFeedback();
        $('#sql-task').value = '';
        $('#sql-task-panel').innerHTML = '<p class="muted">Choose a challenge above.</p>';
      }
      $('#sql-dataset').value = dataset;
      draft = workStore.read(
        key(),
        {
          code: selectedTask
            ? ''
            : sample(sqlExamples.find((x) => x.dataset === dataset)),
        },
        cleanDraft,
      );
      editor.value = draft.code;
      examples();
      saveSettings();
      dialog.close();
      after();
      start();
    };
    $('#sql-reset-cancel').onclick = () => {
      $('#sql-dataset').value = dataset;
      $('#sql-task').value = selectedTask;
      dialog.close();
    };
    dialog.oncancel = () => {
      $('#sql-dataset').value = dataset;
      $('#sql-task').value = selectedTask;
    };
    dialog.showModal();
  }
  editor.oninput = () => {
    save();
    gradeFeedback();
  };
  editor.onkeydown = (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      run();
    }
  };
  $('#sql-run').onclick = run;
  $('#sql-check').onclick = checkAnswer;
  $('#sql-stop').onclick = () => {
    if (!busy) return;
    start('Query stopped. Original demo restored; your SQL draft is kept.');
    $('#sql-results').innerHTML = '';
  };
  $('#sql-reset').onclick = () => reset();
  $('#sql-dataset').onchange = (event) => reset(event.target.value);
  $('#sql-mode').onchange = (event) => {
    save();
    mode = event.target.value;
    if (selectedTask)
      history.replaceState(null, '', '#sql/challenge-' + selectedTask + '/' + mode);
    const fallback = selectedTask
      ? ''
      : sample(
          sqlExamples.find((x) => x.id === $('#sql-example').value) || sqlExamples[0],
        );
    editor.value = workStore.read(key(), { code: fallback }, cleanDraft).code;
    saveSettings();
    $('#sql-results').innerHTML = '';
    if (selectedTask) renderTask();
    $('#sql-status').textContent =
      'Dialect changed. Existing table data is unchanged; review the syntax before running.';
  };
  $('#sql-example').onchange = () => {
    $('#sql-example-help').textContent =
      sqlExamples.find((x) => x.id === $('#sql-example').value)?.explain || '';
  };
  $('#sql-load').onclick = () => {
    const ex = sqlExamples.find((x) => x.id === $('#sql-example').value);
    editor.value = sample(ex);
    $('#sql-example-help').textContent = ex.explain;
    save();
  };
  $('#sql-task').onchange = (event) => {
    const task = exercises.find((t) => t.id === event.target.value);
    if (!task) {
      save();
      selectedTask = '';
      history.replaceState(null, '', '#sql');
      editor.value = workStore.read(
        key(),
        { code: sample(sqlExamples.find((x) => x.dataset === dataset)) },
        cleanDraft,
      ).code;
      controls(false);
      gradeFeedback();
      $('#sql-task-panel').innerHTML = '<p class="muted">Choose a challenge above.</p>';
      return;
    }
    const choose = () => {
      save();
      selectedTask = task.id;
      history.replaceState(null, '', '#sql/challenge-' + selectedTask + '/' + mode);
      $('#sql-task').value = selectedTask;
      editor.value = workStore.read(key(), { code: '' }, cleanDraft).code;
      renderTask();
      controls(false);
    };
    if (task.dataset !== dataset) reset(task.dataset, choose);
    else choose();
  };
  $('#sql-download-query').onclick = () =>
    download(`studylab-${mode}-query.sql`, editor.value);
  $('#sql-download-data').onclick = () =>
    download(`studylab-${dataset}-${mode}-setup.sql`, setupScript(dataset, mode));
  $('#sql-show-limits').onclick = () => {
    const limits = $('#sql-limits');
    limits.open = true;
    limits.scrollIntoView({ behavior: 'smooth', block: 'start' });
    limits.querySelector('summary').focus();
  };
  examples();
  if (selectedTask) {
    $('#sql-task').value = selectedTask;
    renderTask();
  }
  saveSettings();
  sidebar();
  start();
  return () => {
    disposed = true;
    save();
    clearTimeout(timer);
    worker?.terminate();
  };
}
