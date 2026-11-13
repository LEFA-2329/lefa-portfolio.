const mode = document.querySelector('#theme-mode'),
  accent = document.querySelector('#theme-accent');
const device = matchMedia('(prefers-color-scheme: dark)');
let preference = { mode: 'light', accent: '#2563eb' };
try {
  const saved = JSON.parse(localStorage.getItem('logiclab-appearance') || '{}');
  if (['light', 'dark', 'grey', 'system'].includes(saved.mode))
    preference.mode = saved.mode;
  if (/^#[0-9a-f]{6}$/i.test(saved.accent)) preference.accent = saved.accent;
} catch {}
function apply() {
  document.documentElement.dataset.theme =
    preference.mode === 'system' ? (device.matches ? 'dark' : 'light') : preference.mode;
  const hex = preference.accent;
  const rgb = hex
    .slice(1)
    .match(/../g)
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  const luminance = rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  document.documentElement.style.setProperty('--chosen-accent', hex);
  document.documentElement.style.setProperty(
    '--accent-ink',
    luminance > 0.179 ? '#081426' : '#ffffff',
  );
  mode.value = preference.mode;
  accent.value = hex;
}
function save() {
  apply();
  try {
    localStorage.setItem('logiclab-appearance', JSON.stringify(preference));
  } catch {}
}
mode.addEventListener('change', () => {
  preference.mode = mode.value;
  save();
});
accent.addEventListener('input', () => {
  preference.accent = accent.value;
  save();
});
device.addEventListener('change', () => {
  if (preference.mode === 'system') apply();
});
apply();
