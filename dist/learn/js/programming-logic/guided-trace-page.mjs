import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=organised-56';
// Guided trace page: selection and step-by-step state rendering.
import { guidedTraceData } from './content/guided-trace-examples.mjs?v=organised-56';
import { escapeHTML as e } from './pseudocode-parser-and-diagrams.mjs?v=40';
export function guidedTracePage({ view, crumb, sidebar }) {
  const $ = (selector) => view.querySelector(selector);
  view.innerHTML =
    crumb('Visual step-through') + renderHtmlPage('studylab/guided-pseudocode-trace', {});
  sidebar();
  let step = 0,
    data = guidedTraceData('sum');
  function render() {
    const s = data.states[step];
    $('#trace-view').innerHTML =
      `<div class="trace-grid"><section class="panel"><h2>The algorithm</h2><pre><code>${data.code
        .split('\n')
        .map(
          (line, i) =>
            `<span class="line-code ${i + 1 === s.line ? 'trace-current' : ''}"><span class="ln">${i + 1}</span>${e(line)}</span>`,
        )
        .join(
          '',
        )}</code></pre><div class="button-row"><button class="button secondary" id="trace-prev" ${step === 0 ? 'disabled' : ''}>Previous step</button><button class="button" id="trace-next" ${step === data.states.length - 1 ? 'disabled' : ''}>Next step</button><button class="button secondary" id="trace-reset">Restart</button></div><p class="status" role="status">Step ${step + 1} of ${data.states.length}</p></section><section class="panel"><h2>Current state</h2><div class="trace-variables">${Object.entries(
        s.vars,
      )
        .map(
          ([key, value]) =>
            `<div class="variable"><span>${e(key)}</span><strong>${e(value)}</strong></div>`,
        )
        .join(
          '',
        )}</div>${s.array ? `<div class="array-cells">${s.array.map((v, i) => `<div class="array-cell ${s.compare.includes(i) ? 'compare' : ''}"><small style="font-size:9px;display:block;color:#87909c">[${i}]</small>${v}</div>`).join('')}</div>` : ''}<p class="trace-description" role="status">${e(s.note)}</p><h3 style="font-size:12px">Output</h3><div class="trace-output">${e(s.output || 'No output yet')}</div><h3 style="font-size:12px;margin-top:25px">Trace history</h3><div class="scroll-table"><table class="trace-history"><thead><tr><th>Step</th><th>Line</th><th>Variables</th></tr></thead><tbody>${data.states
        .slice(0, step + 1)
        .map(
          (t, i) =>
            `<tr><td>${i + 1}</td><td>${t.line}</td><td>${e(
              Object.entries(t.vars)
                .map(([k, v]) => k + ' = ' + v)
                .join(', '),
            )}</td></tr>`,
        )
        .join('')}</tbody></table></div></section></div>`;
    $('#trace-prev').onclick = () => {
      step--;
      render();
    };
    $('#trace-next').onclick = () => {
      step++;
      render();
    };
    $('#trace-reset').onclick = () => {
      step = 0;
      render();
    };
  }
  $('#trace-example').onchange = (event) => {
    data = guidedTraceData(event.target.value);
    step = 0;
    render();
  };
  render();
}
