import { escapeHTML as e } from '../programming-logic/pseudocode-parser-and-diagrams.mjs?v=40';

export function codeBlock(code, numbered = false) {
  return `<pre><code>${
    numbered
      ? code
          .split('\n')
          .map(
            (line, i) =>
              `<span class="line-code"><span class="ln">${i + 1}</span>${e(line)}</span>`,
          )
          .join('')
      : e(code)
  }</code></pre>`;
}
