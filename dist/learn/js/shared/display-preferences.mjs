// Student display choices only. Never store lesson answers or personal data here.
export const SETTINGS_KEY = 'studylab-display-preferences-v1';
export const LEGACY_KEY = 'logiclab-appearance';
export const themes = [
  {
    id: 'light',
    name: 'Light',
    description: 'The original bright StudyLab look.',
    colours: ['#ffffff', '#e7effb', '#2563eb', '#152d47'],
  },
  {
    id: 'cream',
    name: 'Vintage Cream',
    description: 'Warm parchment and quiet earthy details.',
    colours: ['#e5dac6', '#f9f5ec', '#8b7755', '#3c3428'],
  },
  {
    id: 'terracotta',
    name: 'Vintage Terracotta',
    description: 'Soft peach with warm clay accents.',
    colours: ['#cc6f57', '#f4ddd4', '#fff8f4', '#9b5143'],
  },
  {
    id: 'midnight',
    name: 'Vintage Midnight',
    description: 'Deep slate with soft ivory highlights.',
    colours: ['#33364d', '#55586e', '#9295a5', '#e5dac6'],
  },
  {
    id: 'teal',
    name: 'Vintage Teal',
    description: 'Muted blue-green for a calm workspace.',
    colours: ['#4f6466', '#73898b', '#becdcd', '#f0ece1'],
  },
  {
    id: 'sage',
    name: 'Vintage Sage',
    description: 'Gentle greens with fresh, light surfaces.',
    colours: ['#6f9984', '#a9c1b2', '#e6eee7', '#315d47'],
  },
  {
    id: 'brick',
    name: 'Vintage Brick',
    description: 'Rich russet with warm cream text.',
    colours: ['#9b5143', '#b77a6e', '#ddbeb4', '#f3e9d8'],
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Classic deep blue for darker surroundings.',
    colours: ['#101b2b', '#19283b', '#93c5fd', '#e6eef9'],
  },
  {
    id: 'grey',
    name: 'Grey',
    description: 'Neutral charcoal with blue highlights.',
    colours: ['#282d34', '#3c444f', '#a9d3ff', '#ebedf0'],
  },
  {
    id: 'system',
    name: 'Use device appearance',
    description: 'Follow your device’s Light or Dark setting.',
    colours: ['#ffffff', '#101b2b', '#2563eb', '#93c5fd'],
  },
];
export const defaults = Object.freeze({
  theme: 'light',
  textSize: 'standard',
  spacing: 'comfortable',
  width: 'standard',
  reduceMotion: false,
});
const choices = {
  theme: themes.map((t) => t.id),
  textSize: ['standard', 'large', 'larger'],
  spacing: ['comfortable', 'relaxed', 'compact'],
  width: ['standard', 'focused', 'wide'],
};
export function cleanPreferences(raw) {
  const value = { ...defaults };
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return value;
  for (const [key, allowed] of Object.entries(choices))
    if (allowed.includes(raw[key])) value[key] = raw[key];
  if (typeof raw.reduceMotion === 'boolean') value.reduceMotion = raw.reduceMotion;
  return value;
}
export function resolvedTheme(preferences, deviceDark = false) {
  const theme = cleanPreferences(preferences).theme;
  return theme === 'system' ? (deviceDark ? 'dark' : 'light') : theme;
}
export function createPreferenceStore(provider = () => globalThis.localStorage) {
  let issue = '';
  const decode = (text) => {
    if (text.length > 5000) throw new Error('Settings record too large');
    return JSON.parse(text);
  };
  const write = (value) => {
    const preferences = cleanPreferences(value);
    try {
      provider().setItem(SETTINGS_KEY, JSON.stringify({ version: 1, preferences }));
      issue = '';
    } catch {
      issue = 'Browser storage is unavailable. These settings apply to this visit only.';
    }
    return preferences;
  };
  return {
    read() {
      issue = '';
      try {
        const storage = provider();
        const text = storage.getItem(SETTINGS_KEY);
        if (text !== null) {
          const record = decode(text);
          if (record?.version !== 1) throw new Error('Unsupported settings version');
          return cleanPreferences(record.preferences);
        }
        const legacy = storage.getItem(LEGACY_KEY);
        if (legacy !== null) {
          const old = decode(legacy);
          return write({
            theme: ['light', 'dark', 'grey', 'system'].includes(old?.mode)
              ? old.mode
              : 'light',
          });
        }
        return { ...defaults };
      } catch {
        issue =
          'Saved display settings could not be restored. You can choose them again below.';
        return { ...defaults };
      }
    },
    write,
    getIssue: () => issue,
  };
}
