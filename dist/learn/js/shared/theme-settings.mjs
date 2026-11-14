import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=33';
import {
  themes,
  defaults,
  cleanPreferences,
  createPreferenceStore,
  resolvedTheme,
  SETTINGS_KEY,
} from './display-preferences.mjs?v=33';
import { escapeHTML as escape } from '../programming-logic/pseudocode-parser-and-diagrams.mjs?v=33';

const launch = document.querySelector('#settings-open');
const device = matchMedia('(prefers-color-scheme: dark)');
const store = createPreferenceStore();
let preferences = store.read();
let dialog;

function apply() {
  const root = document.documentElement;
  root.dataset.theme = resolvedTheme(preferences, device.matches);
  root.dataset.textSize = preferences.textSize;
  root.dataset.spacing = preferences.spacing;
  root.dataset.readingWidth = preferences.width;
  root.dataset.reduceMotion = String(preferences.reduceMotion);
  if (!dialog) return;
  for (const radio of dialog.querySelectorAll('[name="settings-theme"]'))
    radio.checked = radio.value === preferences.theme;
  dialog.querySelector('#settings-text-size').value = preferences.textSize;
  dialog.querySelector('#settings-spacing').value = preferences.spacing;
  dialog.querySelector('#settings-width').value = preferences.width;
  dialog.querySelector('#settings-reduce-motion').checked = preferences.reduceMotion;
}
function status(
  message = 'Saved automatically. Your choices will be used on your next visit.',
) {
  if (dialog)
    dialog.querySelector('#settings-save-status').textContent =
      store.getIssue() || message;
}
function save(patch) {
  preferences = store.write({ ...preferences, ...patch });
  apply();
  status();
}
function openSettings() {
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.className = 'settings-dialog';
    dialog.setAttribute('aria-labelledby', 'settings-title');
    dialog.innerHTML = renderHtmlPage('studylab/settings-panel', {
      dynamic_1: themes
        .map(
          (theme) =>
            `<label class="theme-choice"><input type="radio" name="settings-theme" value="${escape(theme.id)}" /><span class="theme-choice-body"><span class="theme-swatch" aria-hidden="true">${theme.colours.map((colour) => `<span style="background:${colour}"></span>`).join('')}</span><strong>${escape(theme.name)}</strong><span class="theme-description">${escape(theme.description)}</span></span></label>`,
        )
        .join(''),
    });
    document.body.append(dialog);
    dialog
      .querySelector('#settings-close')
      .addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => launch.focus());
    dialog
      .querySelectorAll('[name="settings-theme"]')
      .forEach((radio) =>
        radio.addEventListener('change', () => save({ theme: radio.value })),
      );
    for (const [id, key] of [
      ['settings-text-size', 'textSize'],
      ['settings-spacing', 'spacing'],
      ['settings-width', 'width'],
    ])
      dialog
        .querySelector('#' + id)
        .addEventListener('change', (event) => save({ [key]: event.target.value }));
    dialog
      .querySelector('#settings-reduce-motion')
      .addEventListener('change', (event) =>
        save({ reduceMotion: event.target.checked }),
      );
    dialog.querySelector('#settings-reset').addEventListener('click', () => {
      preferences = store.write(defaults);
      apply();
      status(
        'Display settings reset to Light and standard reading preferences. Learning progress is unchanged.',
      );
    });
    dialog
      .querySelectorAll('a')
      .forEach((link) => link.addEventListener('click', () => dialog.close()));
  }
  const course = document.querySelector('#course-select')?.value;
  dialog.querySelector('#settings-progress').href =
    '#progress/' +
    (['prld', 'database', 'intermediate', 'advanced'].includes(course) ? course : 'prld');
  apply();
  status('Your current settings are ready. Changes save automatically.');
  dialog.showModal();
  dialog.querySelector('#settings-close').focus();
}
apply();
launch?.addEventListener('click', openSettings);
device.addEventListener('change', () => {
  if (preferences.theme === 'system') apply();
});
window.addEventListener('storage', (event) => {
  if (event.key !== SETTINGS_KEY && event.key !== null) return;
  preferences = cleanPreferences(store.read());
  apply();
  status('Display settings updated from another tab.');
});
