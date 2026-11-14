import { htmlPages } from './compiled-html-pages.mjs?v=38';

// These templates are authored in this repository and compiled before publication.
// Callers supply trusted markup or already escaped text; never pass raw user input.
export function renderHtmlPage(name, sections = {}) {
  if (!Object.hasOwn(htmlPages, name)) throw new Error('Unknown HTML page: ' + name);
  return htmlPages[name].replace(/\{\{(dynamic_\d+)\}\}/g, (_, key) => {
    if (!Object.hasOwn(sections, key)) throw new Error('Missing page section: ' + key);
    return String(sections[key] ?? '');
  });
}
