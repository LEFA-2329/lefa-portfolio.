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
// Additional colour collections. Existing theme IDs remain stable.
themes.splice(
  7,
  0,
  ...[
    {
      id: 'sunshine-cobalt',
      name: 'Sunshine & Cobalt',
      description: 'Golden yellow, coral and confident blue.',
      colours: ['#f3c231', '#f2f2f2', '#033e74', '#f26052', '#f29471'],
      collection: 'colourful',
    },
    {
      id: 'citrus-ivory',
      name: 'Citrus & Ivory',
      description: 'Fresh olive, warm ivory and soft amber.',
      colours: ['#000000', '#91ae30', '#ebe3cc', '#ffffff', '#fdb85c'],
      collection: 'colourful',
    },
    {
      id: 'honey-indigo',
      name: 'Honey & Indigo',
      description: 'Honey highlights with clear indigo details.',
      colours: ['#b38f38', '#ffeea1', '#fed569', '#3052b3', '#d4defb'],
      collection: 'colourful',
    },
    {
      id: 'tropical',
      name: 'Tropical Breeze',
      description: 'Mint, turquoise and a lively coral touch.',
      colours: ['#f13759', '#f4a503', '#e9f2df', '#55d9cd', '#3aa2b9'],
      collection: 'colourful',
    },
    {
      id: 'tangerine-night',
      name: 'Tangerine Night',
      description: 'Charcoal surfaces with warm orange light.',
      colours: ['#1d1e26', '#fee0ac', '#f9a450', '#f27830', '#a55745'],
      collection: 'colourful',
    },
    {
      id: 'candy-forest',
      name: 'Candy Garden',
      description: 'Peach and pink balanced with bright green and blue.',
      colours: ['#fbaca2', '#eb7399', '#efcc68', '#253dc9', '#39d18c'],
      collection: 'colourful',
    },
    {
      id: 'lime-slate',
      name: 'Lime & Slate',
      description: 'Deep blue with crisp lime and teal highlights.',
      colours: ['#f2f2f2', '#c5e06f', '#92c46d', '#277d7d', '#1d354d'],
      collection: 'colourful',
    },
    {
      id: 'rose-ocean',
      name: 'Rose & Ocean',
      description: 'Ocean blue with rose and golden accents.',
      colours: ['#f1bcc0', '#d92378', '#133d73', '#b8d7d3', '#fcc954'],
      collection: 'colourful',
    },
    {
      id: 'peach-lagoon',
      name: 'Peach Lagoon',
      description: 'Soft peach, sunshine and a pale sea-green background.',
      colours: ['#fccddd', '#ff8f73', '#ffcc38', '#a5d6d0', '#8aabd0'],
      collection: 'colourful',
    },
    {
      id: 'blue-silver',
      name: 'Blue & Silver',
      description: 'A clean blue workspace with cool silver surfaces.',
      colours: ['#4a9cf4', '#127fd5', '#e2e5e8', '#656769', '#afb3b5'],
      collection: 'colourful',
    },
    {
      id: 'neon-orchid',
      name: 'Neon Orchid',
      description: 'Violet evenings with electric cyan and pink.',
      colours: ['#ffffff', '#f966a0', '#665ec7', '#2ec1de', '#fed600'],
      collection: 'colourful',
    },
    {
      id: 'amethyst-gold',
      name: 'Amethyst & Gold',
      description: 'Rich purple with warm gold and turquoise accents.',
      colours: ['#36cfb0', '#28a49f', '#30225c', '#fdbb1d', '#de6408'],
      collection: 'colourful',
    },
  ],
);

export const defaults = Object.freeze({
  theme: 'light',
  textSize: 'standard',
  editorSize: 'standard',
  editorWrap: 'wrap',
  editorTabSize: '4',
  spacing: 'comfortable',
  width: 'standard',
  reduceMotion: false,
});
const choices = {
  theme: themes.map((t) => t.id),
  textSize: ['small', 'standard', 'large', 'larger'],
  editorSize: ['standard', 'large', 'larger'],
  editorWrap: ['wrap', 'scroll'],
  editorTabSize: ['4', '2', '8'],
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
