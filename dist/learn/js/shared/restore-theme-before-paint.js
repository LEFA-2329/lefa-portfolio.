// Tiny synchronous startup: restores validated display attributes before page paint.
// Keep these allowlists aligned with display-preferences.mjs (covered by tests).
(() => {
  const allowed = {
    theme: [
      'light',
      'cream',
      'terracotta',
      'midnight',
      'teal',
      'sage',
      'brick',
      'dark',
      'grey',
      'system',
    ],
    textSize: ['standard', 'large', 'larger'],
    spacing: ['comfortable', 'relaxed', 'compact'],
    width: ['standard', 'focused', 'wide'],
  };
  let saved = {};
  try {
    const current = localStorage.getItem('studylab-display-preferences-v1');
    if (current && current.length <= 5000) {
      const record = JSON.parse(current);
      if (record?.version === 1) saved = record.preferences || {};
    } else if (!current) {
      const previous = localStorage.getItem('logiclab-appearance');
      if (previous && previous.length <= 5000)
        saved = { theme: JSON.parse(previous)?.mode };
    }
  } catch {
    /* A blocked storage API must never prevent the page loading. */
  }
  const root = document.documentElement;
  for (const [key, values] of Object.entries(allowed)) {
    let value = values.includes(saved?.[key]) ? saved[key] : values[0];
    if (key === 'theme' && value === 'system')
      value = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.dataset[key === 'width' ? 'readingWidth' : key] = value;
  }
  root.dataset.reduceMotion = String(saved?.reduceMotion === true);
})();
