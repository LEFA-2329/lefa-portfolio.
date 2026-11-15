import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=backup-55';
import { escapeHTML as e } from '../programming-logic/pseudocode-parser-and-diagrams.mjs?v=40';
import {
  makeBackup,
  parseBackup,
  backupSummary,
  planRestore,
  applyRestore,
  MAX_BACKUP_BYTES,
} from './progress-backup.mjs?v=backup-55';
function download(backup, prefix = 'studylab-progress') {
  const date = new Date(),
    day = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');
  let text = JSON.stringify(backup, null, 2);
  if (new TextEncoder().encode(text).byteLength > MAX_BACKUP_BYTES)
    text = JSON.stringify(backup);
  if (new TextEncoder().encode(text).byteLength > MAX_BACKUP_BYTES)
    throw Error(
      'This backup exceeds the 8 MB file limit. Keep copies of large drafts separately.',
    );
  const url = URL.createObjectURL(
    new Blob([text], { type: 'application/json;charset=utf-8' }),
  );
  const a = document.createElement('a');
  a.href = url;
  a.download = prefix + '-' + day + '.json';
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const summary = (data) =>
  `${data.completed} completed lesson entries . ${data.quizzes} checked quiz records . ${data.activities} saved activity/draft records . ${data.csharpLessons} C#/Docker lesson records. Display settings ${data.settings ? 'included' : 'not included'}.`;
export function progressBackupPage({ view, sidebar }) {
  view.innerHTML = renderHtmlPage('studylab/progress-backup');
  sidebar();
  const $ = (selector) => view.querySelector(selector),
    status = (message) => {
      $('#backup-status').textContent = message;
    };
  let backup = null,
    plan = null,
    choices = {},
    safetyReady = false,
    generation = 0;
  try {
    const message = sessionStorage.getItem('studylab-backup-restored');
    if (message) {
      status(message);
      sessionStorage.removeItem('studylab-backup-restored');
    }
  } catch {}
  const arm = () => {
    $('#backup-apply').disabled = !plan || !safetyReady || !$('#backup-confirm').checked;
  };
  function preview(refreshConflicts = true) {
    if (!backup) return;
    try {
      plan = planRestore(backup, localStorage, {
        mode: $('#backup-mode').value,
        restoreSettings: $('#backup-restore-settings').checked,
        choices,
      });
      $('#backup-date').textContent =
        'Created: ' + new Date(backup.exportedAt).toLocaleString();
      $('#backup-summary').textContent = summary(backupSummary(backup));
      $('#backup-result-summary').textContent = 'After restore: ' + summary(plan.summary);
      $('#backup-mode-help').textContent =
        plan.mode === 'merge'
          ? 'Merge combines completed lessons and C#/Docker readiness checks. For matching C# quiz totals it keeps the higher score. If quiz totals differ, it keeps the current score. Conflicting saved activity records are kept whole, including their quiz answers and drafts; choose which version to keep below.'
          : 'Replace removes the current StudyLab learning records and uses this backup. An empty backup will clear learning progress. Other website data and display settings are preserved unless you choose to restore display settings.';
      $('#backup-confirm-label').textContent =
        plan.mode === 'merge'
          ? 'I have saved the safety backup and want to merge this progress.'
          : "I have saved the safety backup and want to replace this browser's learning progress with the backup.";
      if (refreshConflicts) {
        $('#backup-conflicts').innerHTML = plan.conflicts.length
          ? `<h3>Choose which saved work to keep</h3><p>Current work is kept by default. Previews show at most the first 1,200 characters; the whole selected record is restored.</p>${plan.conflicts.map((c, i) => `<section class="backup-conflict"><h4>${e(c.label)}</h4><label for="backup-conflict-${i}">Version to keep</label><select id="backup-conflict-${i}" data-backup-conflict="${i}"><option value="current" ${choices[c.id] !== 'backup' ? 'selected' : ''}>Keep current work</option><option value="backup" ${choices[c.id] === 'backup' ? 'selected' : ''}>Use work from backup</option></select><details><summary>Compare previews</summary><h4>Current work</h4><pre>${e(c.currentPreview)}</pre><h4>Work from backup</h4><pre>${e(c.backupPreview)}</pre></details></section>`).join('')}`
          : '<p>No conflicting saved work needs a choice.</p>';
        for (const select of view.querySelectorAll('[data-backup-conflict]')) {
          const conflictId = plan.conflicts[Number(select.dataset.backupConflict)].id;
          select.addEventListener('change', () => {
            choices[conflictId] = select.value;
            preview(false);
          });
        }
      }
      $('#backup-preview').hidden = false;
      arm();
    } catch (error) {
      plan = null;
      $('#backup-preview').hidden = true;
      status(error.message);
      arm();
    }
  }
  $('#backup-export').addEventListener('click', () => {
    try {
      const current = makeBackup(localStorage, {
        includeSettings: $('#backup-export-settings').checked,
      });
      download(current);
      status(
        'Backup download requested. ' +
          summary(backupSummary(current)) +
          ' Keep the file before clearing browser data.',
      );
    } catch (error) {
      status(error.message);
    }
  });
  $('#backup-file').addEventListener('change', async () => {
    const request = ++generation;
    backup = null;
    plan = null;
    choices = {};
    safetyReady = false;
    $('#backup-preview').hidden = true;
    $('#backup-confirm').checked = false;
    $('#backup-confirm').disabled = true;
    arm();
    const file = $('#backup-file').files[0];
    if (!file) return;
    try {
      if (file.size > MAX_BACKUP_BYTES)
        throw Error('Choose a StudyLab backup smaller than 8 MB.');
      const text = await file.text();
      if (request !== generation) return;
      backup = parseBackup(text);
      $('#backup-mode').value = 'merge';
      $('#backup-restore-settings').checked = false;
      $('#backup-settings-choice').hidden = !backupSummary(backup).settings;
      status('File checked. Review the preview before applying any changes.');
      preview();
    } catch (error) {
      if (request === generation) status(error.message);
    }
  });
  for (const selector of ['#backup-mode', '#backup-restore-settings'])
    $(selector).addEventListener('change', () => {
      safetyReady = false;
      $('#backup-confirm').checked = false;
      $('#backup-confirm').disabled = true;
      preview();
    });
  $('#backup-refresh').addEventListener('click', () => {
    safetyReady = false;
    $('#backup-confirm').checked = false;
    $('#backup-confirm').disabled = true;
    preview();
    status(
      'Preview refreshed. Review it and download a fresh safety backup before restoring.',
    );
  });
  $('#backup-safety').addEventListener('click', () => {
    try {
      download(
        makeBackup(localStorage, { includeSettings: true }),
        'studylab-before-restore',
      );
      safetyReady = true;
      $('#backup-confirm').disabled = false;
      status(
        'Safety backup download requested. Check that you have saved it, then confirm the restore.',
      );
      arm();
    } catch (error) {
      safetyReady = false;
      status(error.message);
      arm();
    }
  });
  $('#backup-confirm').addEventListener('change', arm);
  $('#backup-apply').addEventListener('click', () => {
    if (!plan || !safetyReady || !$('#backup-confirm').checked) return;
    try {
      const result = applyRestore(plan, localStorage);
      const message = 'Progress restored successfully. ' + summary(result);
      try {
        sessionStorage.setItem('studylab-backup-restored', message);
      } catch {}
      status(message);
      $('#backup-apply').disabled = true;
      location.reload();
    } catch (error) {
      safetyReady = false;
      $('#backup-confirm').checked = false;
      $('#backup-confirm').disabled = true;
      status(error.message);
      arm();
    }
  });
  return () => {
    generation++;
  };
}
