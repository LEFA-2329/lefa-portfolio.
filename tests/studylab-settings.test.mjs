import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import {
  themes,
  defaults,
  cleanPreferences,
  createPreferenceStore,
  resolvedTheme,
  SETTINGS_KEY,
  LEGACY_KEY,
} from '../dist/learn/js/shared/display-preferences.mjs';
const storage = () => {
  const data = new Map();
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  };
};
test('Light remains the default; all six vintage themes are available', () => {
  assert.equal(defaults.theme, 'light');
  assert.deepEqual(
    themes.slice(1, 7).map((t) => t.id),
    ['cream', 'terracotta', 'midnight', 'teal', 'sage', 'brick'],
  );
  assert.equal(new Set(themes.map((t) => t.id)).size, themes.length);
  assert.equal(resolvedTheme({ theme: 'system' }, true), 'dark');
  assert.equal(resolvedTheme({ theme: 'system' }, false), 'light');
});
test('all display choices survive a fresh store instance without expiring or changing learning data', () => {
  const memory = storage();
  memory.setItem('logiclab-work-v1:lesson:test', 'unchanged');
  for (const theme of themes) {
    const wanted = {
      theme: theme.id,
      textSize: 'larger',
      spacing: 'relaxed',
      width: 'focused',
      reduceMotion: true,
    };
    createPreferenceStore(() => memory).write(wanted);
    assert.deepEqual(createPreferenceStore(() => memory).read(), wanted);
    assert.equal(memory.getItem('logiclab-work-v1:lesson:test'), 'unchanged');
    assert(!memory.getItem(SETTINGS_KEY).includes('expires'));
  }
});
test('legacy modes migrate once; invalid and blocked storage are handled safely', () => {
  const memory = storage();
  memory.setItem(LEGACY_KEY, JSON.stringify({ mode: 'grey', accent: '#ffffff' }));
  const store = createPreferenceStore(() => memory);
  assert.equal(store.read().theme, 'grey');
  assert(memory.getItem(SETTINGS_KEY));
  store.write({ ...defaults, theme: 'sage' });
  assert.equal(createPreferenceStore(() => memory).read().theme, 'sage');
  memory.setItem(SETTINGS_KEY, '{broken');
  assert.deepEqual(store.read(), defaults);
  assert(store.getIssue());
  const blocked = createPreferenceStore(() => {
    throw new Error('blocked');
  });
  assert.deepEqual(blocked.read(), defaults);
  blocked.write({ ...defaults, theme: 'brick' });
  assert.match(blocked.getIssue(), /visit only/);
  assert.deepEqual(
    cleanPreferences({
      theme: '<svg>',
      textSize: '999',
      spacing: 'javascript:',
      width: 'constructor',
      reduceMotion: 'true',
    }),
    defaults,
  );
  assert.deepEqual(cleanPreferences(null), defaults);
});
test('pre-paint restoration agrees with full settings for every theme and fallback', () => {
  const source = readFileSync(
    new URL('../dist/learn/js/shared/restore-theme-before-paint.js', import.meta.url),
    'utf8',
  );
  for (const theme of themes)
    for (const dark of [false, true]) {
      const memory = storage();
      const settings = {
        ...defaults,
        theme: theme.id,
        textSize: 'large',
        spacing: 'compact',
        width: 'wide',
        reduceMotion: true,
      };
      createPreferenceStore(() => memory).write(settings);
      const dataset = {};
      vm.runInNewContext(source, {
        localStorage: memory,
        document: { documentElement: { dataset } },
        matchMedia: () => ({ matches: dark }),
      });
      assert.equal(dataset.theme, resolvedTheme(settings, dark));
      assert.equal(dataset.textSize, 'large');
      assert.equal(dataset.readingWidth, 'wide');
      assert.equal(dataset.reduceMotion, 'true');
    }
  const dataset = {};
  vm.runInNewContext(source, {
    localStorage: {
      getItem() {
        throw Error('blocked');
      },
    },
    document: { documentElement: { dataset } },
    matchMedia: () => ({ matches: false }),
  });
  assert.equal(dataset.theme, 'light');
});
test('vintage core text and primary buttons have at least 4.5:1 contrast', () => {
  const css = readFileSync(
    new URL('../dist/learn/css/student-settings.css', import.meta.url),
    'utf8',
  );
  const lum = (hex) => {
    const values = hex
      .replace('#', '')
      .match(/../g)
      .map((x) => parseInt(x, 16) / 255)
      .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
    return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
  };
  const contrast = (a, b) =>
    (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
  for (const theme of themes.slice(1, 7)) {
    const rule = css.match(
      new RegExp(":root\\[data-theme='" + theme.id + "'\\]\\s*\\{([^}]+)\\}"),
    )[1];
    const value = (name) =>
      rule.match(new RegExp('--' + name + ':\\s*(#[0-9a-f]{6})'))[1];
    for (const background of ['surface', 'paper', 'surface-alt'])
      for (const text of ['ink', 'muted'])
        assert(
          contrast(value(text), value(background)) >= 4.5,
          theme.id + ' ' + text + '/' + background,
        );
    assert(
      contrast(value('chosen-accent'), value('accent-ink')) >= 4.5,
      theme.id + ' button',
    );
  }
});
