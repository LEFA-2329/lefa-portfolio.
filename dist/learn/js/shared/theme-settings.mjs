import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=39';
import {
  themes,
  defaults,
  cleanPreferences,
  createPreferenceStore,
  resolvedTheme,
  SETTINGS_KEY,
} from './display-preferences.mjs?v=39';
import { escapeHTML as escape } from '../programming-logic/pseudocode-parser-and-diagrams.mjs?v=39';

const launch = document.querySelector('#settings-open');
const device = matchMedia('(prefers-color-scheme: dark)');
const store = createPreferenceStore();
let preferences = store.read();
let panel;
function closeSettings(restoreFocus = true) {
  if (!panel || panel.hidden) return;
  panel.hidden = true;
  document.body.classList.remove('settings-open');
  launch?.setAttribute('aria-expanded', 'false');
  if (restoreFocus) launch?.focus();
}

function apply() {
  const root = document.documentElement;
  root.dataset.theme = resolvedTheme(preferences, device.matches);
  root.dataset.textSize = preferences.textSize;
  root.dataset.editorSize = preferences.editorSize;
  root.dataset.editorWrap = preferences.editorWrap;
  root.dataset.editorTabSize = preferences.editorTabSize;
  root.dataset.spacing = preferences.spacing;
  root.dataset.readingWidth = preferences.width;
  root.dataset.reduceMotion = String(preferences.reduceMotion);
  if (!panel?.childElementCount) return;
  for (const radio of panel.querySelectorAll('[name="settings-theme"]'))
    radio.checked = radio.value === preferences.theme;
  panel.querySelector('#settings-text-size').value = preferences.textSize;
  panel.querySelector('#settings-editor-size').value = preferences.editorSize;
  panel.querySelector('#settings-editor-wrap').value = preferences.editorWrap;
  panel.querySelector('#settings-editor-tab-size').value = preferences.editorTabSize;
  panel.querySelector('#settings-spacing').value = preferences.spacing;
  panel.querySelector('#settings-width').value = preferences.width;
  panel.querySelector('#settings-reduce-motion').checked = preferences.reduceMotion;
}
function status(
  message = 'Saved automatically. Your choices will be used on your next visit.',
) {
  if (panel?.childElementCount)
    panel.querySelector('#settings-save-status').textContent =
      store.getIssue() || message;
}
function save(patch) {
  preferences = store.write({ ...preferences, ...patch });
  apply();
  status();
}
function openSettings() {
  if (!panel.childElementCount) {
    panel.innerHTML = renderHtmlPage('studylab/settings-panel', {
      dynamic_1: themes
        .map(
          (theme) =>
            `<label class="theme-choice" data-theme-id="${escape(theme.id)}" data-theme-collection="${escape(theme.collection || (['light', 'dark', 'grey', 'system'].includes(theme.id) ? 'classic' : 'vintage'))}"><input type="radio" name="settings-theme" value="${escape(theme.id)}" /><span class="theme-choice-body"><span class="theme-swatch" aria-hidden="true">${theme.colours.map((colour) => `<span style="background:${colour}"></span>`).join('')}</span><strong>${escape(theme.name)}</strong><span class="theme-description">${escape(theme.description)}</span></span></label>`,
        )
        .join(''),
    });
    function showCategory(category) {
      for (const section of panel.querySelectorAll('.settings-section'))
        section.hidden =
          section.getAttribute('aria-labelledby') !== 'settings-' + category + '-title';
      for (const button of panel.querySelectorAll('[data-settings-category]'))
        button.setAttribute(
          'aria-pressed',
          String(button.dataset.settingsCategory === category),
        );
      panel.scrollTop = 0;
    }
    for (const button of panel.querySelectorAll('[data-settings-category]'))
      button.addEventListener('click', () =>
        showCategory(button.dataset.settingsCategory),
      );
    showCategory('themes');
    panel
      .querySelector('#settings-theme-collection')
      .addEventListener('change', (event) => {
        const collection = event.target.value;
        for (const card of panel.querySelectorAll('.theme-choice')) {
          card.hidden =
            collection !== 'all' &&
            card.dataset.themeId !== 'light' &&
            card.dataset.themeCollection !== collection;
        }
      });
    panel
      .querySelector('#settings-close')
      .addEventListener('click', () => closeSettings());
    panel
      .querySelectorAll('[name="settings-theme"]')
      .forEach((radio) =>
        radio.addEventListener('change', () => save({ theme: radio.value })),
      );
    for (const [id, key] of [
      ['settings-text-size', 'textSize'],
      ['settings-editor-size', 'editorSize'],
      ['settings-editor-wrap', 'editorWrap'],
      ['settings-editor-tab-size', 'editorTabSize'],
      ['settings-spacing', 'spacing'],
      ['settings-width', 'width'],
    ])
      panel
        .querySelector('#' + id)
        .addEventListener('change', (event) => save({ [key]: event.target.value }));
    panel
      .querySelector('#settings-reduce-motion')
      .addEventListener('change', (event) =>
        save({ reduceMotion: event.target.checked }),
      );
    panel.querySelector('#settings-reset').addEventListener('click', () => {
      preferences = store.write(defaults);
      apply();
      status(
        'Display settings reset to Light and standard reading preferences. Learning progress is unchanged.',
      );
    });
    panel
      .querySelectorAll('a')
      .forEach((link) => link.addEventListener('click', () => closeSettings(false)));
  }
  const course = document.querySelector('#course-select')?.value;
  panel.querySelector('#settings-progress').href =
    '#progress/' +
    (['prld', 'database', 'intermediate', 'advanced'].includes(course) ? course : 'prld');
  apply();
  status('Your current settings are ready. Changes save automatically.');
  panel.hidden = false;
  document.body.classList.add('settings-open');
  launch.setAttribute('aria-expanded', 'true');
  panel.querySelector('#settings-close').focus();
}
// A non-modal region keeps the lesson page usable while preferences are changed.
panel = document.createElement('aside');
panel.id = 'student-settings-panel';
panel.className = 'settings-panel';
panel.setAttribute('aria-labelledby', 'settings-title');
panel.setAttribute('role', 'region');
panel.hidden = true;
document.body.append(panel);
apply();
launch?.addEventListener('click', () =>
  panel.hidden ? openSettings() : closeSettings(),
);
window.addEventListener('keydown', (event) => {
  if (
    event.key === 'Escape' &&
    !panel.hidden &&
    !document.querySelector('dialog[open]')
  ) {
    event.preventDefault();
    closeSettings();
  }
});
device.addEventListener('change', () => {
  if (preferences.theme === 'system') apply();
});
window.addEventListener('storage', (event) => {
  if (event.key !== SETTINGS_KEY && event.key !== null) return;
  preferences = cleanPreferences(store.read());
  apply();
  status('Display settings updated from another tab.');
});
