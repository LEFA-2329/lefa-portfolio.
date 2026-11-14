# Student display settings

Light remains the default. The Settings button replaces both the old Appearance selector and arbitrary colour picker. It contains Light, Vintage Cream, Vintage Terracotta, Vintage Midnight, Vintage Teal, Vintage Sage, Vintage Brick, Dark, Grey and Use device appearance. The six vintage palettes were inspired by the supplied colour reference; the stock illustration itself is not used on the website.

Settings also manages text size, reading spacing, page width and reduced motion across StudyLab. Changes apply immediately and save automatically in browser localStorage without an expiry date. A fresh visit restores the choice, and other open tabs update when settings change. The small head script restores only validated attributes before paint to avoid an unnecessary Light flash.

Existing Light, Dark, Grey and Device preferences migrate from the previous storage key. The arbitrary custom accent is retired. Reset affects display preferences only; answers, drafts, scores and completion marks remain untouched.

Persistence is local to the same browser/device and site origin. Clearing site data, private browsing, storage restrictions or browser eviction may remove or prevent saving. This is not account-based cross-device synchronisation. An unavailable-storage message is shown rather than promising that unsaved settings were stored. Use device appearance intentionally follows the operating system setting.

## Editing

- `dist/learn/pages/settings-panel.html`: panel wording and controls.
- `dist/learn/js/shared/display-preferences.mjs`: names, swatches, validation, defaults and persistence.
- `dist/learn/js/shared/theme-settings.mjs`: UI events and application of settings.
- `dist/learn/js/shared/restore-theme-before-paint.js`: early restoration allowlists.
- `dist/learn/css/student-settings.css`: full-page palette tokens, readability options and responsive panel styles.

Run format, build and tests after edits. The palette regression checks cover normal text and primary-button contrast of at least 4.5:1 for the six new themes; this is a targeted check, not whole-site accessibility certification. Existing diagram content retains its authored styling where needed for legibility.

## Validation

All 43 automated tests pass, including defaults, all theme preferences across fresh store instances, legacy migration, invalid/blocked storage, pre-paint restoration, learning-data separation and palette contrast. Browser checks confirmed six distinct palettes, reading preferences retained after reload, a second visit restoring Vintage Brick, another tab changing to Vintage Cream, reset to Light, and SQL execution after settings changes.

References: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage and https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html.
