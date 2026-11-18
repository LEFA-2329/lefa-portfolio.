// Diagram lab: rendering, saved draft, generation and downloads belong here.
import { renderHtmlPage } from '../../../shared/render-html-page.mjs?v=organised-56';
import { workStore } from '../shared/saved-work-storage.mjs?v=40';
import { cleanDraft } from '../shared/saved-programming-answers.mjs?v=40';
import { downloadFile } from '../shared/download-file.mjs?v=organised-56';
import { diagramExamples as samples } from './content/diagram-examples.mjs?v=organised-56';
import {
  parse,
  flowchart,
  hierarchy,
  escapeHTML as e,
} from './pseudocode-parser-and-diagrams.mjs?v=40';
export function diagramLabPage({ view, crumb, sidebar, initialCode = null, openTrace }) {
  const $ = (selector) => view.querySelector(selector);
  let currentSVG = '',
    lastAst = null;
  const savedDraft = workStore.read('diagram', null, (raw) => cleanDraft(raw));
  const importingCode = initialCode !== null;
  view.innerHTML =
    crumb('Diagram lab') +
    renderHtmlPage('studylab/pseudocode-diagram-lab', {
      dynamic_1: Object.keys(samples)
        .map((s) => `<option>${e(s)}</option>`)
        .join(''),
      dynamic_2: e(initialCode ?? savedDraft?.code ?? samples['Pass or revise']),
    });
  sidebar();
  const editor = $('#pseudocode'),
    type = $('#lab-type'),
    module = $('#lab-module'),
    status = $('#lab-status');
  currentSVG = '';
  lastAst = null;
  if (!importingCode && savedDraft) type.value = savedDraft.type;
  module.disabled = type.value === 'hierarchy';
  function persistLab() {
    workStore.write('diagram', { code: editor.value, type: type.value });
  }
  if (importingCode) persistLab();
  function invalidate() {
    currentSVG = '';
    lastAst = null;
    ['download-svg', 'download-png', 'diagram-pdf', 'fit-chart'].forEach(
      (id) => ($('#' + id).disabled = true),
    );
    $('#lab-diagram').innerHTML =
      '<div class="diagram-placeholder"><span>◇</span><p>Your code has changed. Generate a fresh diagram.</p></div>';
    status.textContent = '';
  }
  function draw() {
    try {
      lastAst = parse(editor.value);
      const selected = module.value;
      module.innerHTML =
        '<option value="main">Main program</option>' +
        lastAst.modules
          .map((m) => `<option value="${e(m.name)}">${e(m.name)}</option>`)
          .join('');
      if ([...module.options].some((o) => o.value === selected)) module.value = selected;
      let notice = '';
      if (type.value === 'hierarchy') {
        const result = hierarchy(lastAst);
        currentSVG = result.svg;
        if (result.missing.length)
          notice =
            ' Undefined calls: ' +
            result.missing.join(', ') +
            '. These are shown without a definition.';
      } else currentSVG = flowchart(lastAst, module.value);
      $('#lab-diagram').innerHTML = currentSVG;
      $('#lab-diagram').classList.remove('fit');
      $('#fit-chart').textContent = 'Fit width';
      status.textContent = 'Diagram generated from the supported syntax.' + notice;
      module.disabled = type.value === 'hierarchy';
      ['download-svg', 'download-png', 'diagram-pdf', 'fit-chart'].forEach(
        (id) => ($('#' + id).disabled = false),
      );
    } catch (err) {
      currentSVG = '';
      $('#lab-diagram').innerHTML =
        '<div class="diagram-placeholder"><span>!</span><p>Check the editor feedback, correct the code and try again.</p></div>';
      status.textContent = err.message;
      ['download-svg', 'download-png', 'diagram-pdf', 'fit-chart'].forEach(
        (id) => ($('#' + id).disabled = true),
      );
    }
  }
  $('#lab-example').onchange = (event) => {
    editor.value = samples[event.target.value];
    type.value = event.target.value === 'Module hierarchy' ? 'hierarchy' : 'flow';
    module.value = 'main';
    invalidate();
    persistLab();
  };
  editor.oninput = () => {
    invalidate();
    persistLab();
  };
  type.onchange = () => {
    module.disabled = type.value === 'hierarchy';
    invalidate();
    persistLab();
  };
  $('#generate-chart').onclick = draw;
  $('#trace-my-code').onclick = () => {
    openTrace(editor.value);
  };
  module.onchange = draw;
  $('#download-svg').onclick = () => {
    if (currentSVG) downloadFile(currentSVG, 'image/svg+xml', 'StudyLab-diagram.svg');
  };
  $('#fit-chart').onclick = () => {
    const fit = $('#lab-diagram').classList.toggle('fit');
    $('#fit-chart').textContent = fit ? 'Actual size' : 'Fit width';
  };
  $('#download-png').onclick = async () => {
    if (!currentSVG) return;
    const button = $('#download-png');
    button.disabled = true;
    try {
      const svg = currentSVG;
      const img = new Image(),
        url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      try {
        await new Promise((res, rej) => {
          img.onload = res;
          img.onerror = rej;
          img.src = url;
        });
        const scale = Math.min(
          2,
          6000 / img.width,
          10000 / img.height,
          Math.sqrt(18000000 / (img.width * img.height)),
        );
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'));
        if (!blob) throw Error();
        downloadFile(blob, 'image/png', 'StudyLab-diagram.png');
        status.textContent = 'PNG prepared. Check your downloads.';
      } finally {
        URL.revokeObjectURL(url);
      }
    } catch {
      status.textContent = 'PNG could not be created. Try the SVG download instead.';
    } finally {
      button.disabled = !currentSVG;
    }
  };
  $('#diagram-pdf').onclick = () => {
    if (!currentSVG) return;
    document.body.classList.add('print-diagram');
    window.print();
  };
  window.onafterprint = () => document.body.classList.remove('print-diagram');
}
