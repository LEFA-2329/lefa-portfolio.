import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const runtimeRequire = createRequire(
  path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES, 'runtime-entry.cjs'),
);
const { Presentation, PresentationFile, FileBlob } = await import(
  pathToFileURL(runtimeRequire.resolve('@oai/artifact-tool')).href
);
const root = process.cwd();
const skill = '/home/agent/.codex/skills/builtins/presentations';
const { finalizePresentation } = await import(
  pathToFileURL(path.join(skill, 'container_tools/artifact_tool_utils.mjs')).href
);
const decks = JSON.parse(
  await fs.readFile(path.join(root, 'scripts/revision-content.json'), 'utf8'),
);
const out = path.join(root, 'dist/learn/downloads');
const run = Date.now();
await fs.mkdir(path.join(root, 'revision-build/final'), { recursive: true });
function box(
  slide,
  name,
  text,
  x,
  y,
  w,
  h,
  {
    size = 26,
    bold = false,
    color = '#183247',
    fill = 'none',
    mono = false,
    align = 'left',
    geometry = 'textbox',
    insets = 0,
  } = {},
) {
  const shape = slide.shapes.add({
    name,
    geometry,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { style: 'solid', fill: 'none', width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    typeface: mono ? 'DejaVu Sans Mono' : 'DejaVu Sans',
    fontSize: size,
    bold,
    color,
    alignment: align,
    verticalAlignment: 'top',
    wrap: 'square',
    autoFit: 'none',
    insets,
    lineSpacing: 1.12,
  };
  return shape;
}
function points(slide, items, x, y, w, font = 26, gap = 24) {
  let at = y;
  for (const [i, t] of items.entries()) {
    const estimate = Math.ceil(t.length / (w / (font * 0.53)));
    const height = Math.max(font * 1.22, estimate * font * 1.23);
    box(slide, 'point-' + i, t, x, at, w, height, { size: font });
    at += height + gap;
  }
  if (at > 655) console.log('Check content height', items[0].slice(0, 35), at);
}
function table(slide, data) {
  const rows = data.rows;
  const t = slide.tables.add({
    rows: rows.length,
    columns: rows[0].length,
    left: 64,
    top: 165,
    width: 1152,
    height: rows.length === 6 ? 390 : 365,
    values: rows,
    columnTracks:
      rows[0].length === 2
        ? [
            { mode: 'fr', value: 1 },
            { mode: 'fr', value: 2.7 },
          ]
        : rows[0].map(() => ({ mode: 'fr', value: 1 })),
  });
  for (let r = 0; r < rows.length; r++)
    for (let c = 0; c < rows[0].length; c++) {
      const cell = t.getCell(r, c);
      cell.fill = r === 0 ? '#0F766E' : r % 2 ? '#EFF6F6' : '#FFFFFF';
      cell.text.style = {
        typeface: 'DejaVu Sans',
        fontSize: r === 0 ? 25 : 23,
        bold: r === 0,
        color: r === 0 ? '#FFFFFF' : '#183247',
        insets: 12,
        verticalAlignment: 'middle',
        wrap: 'square',
      };
    }
  if (data.note) box(slide, 'table-note', data.note, 64, 575, 1152, 76, { size: 24 });
}
function node(slide, name, text, x, y, w, h, geometry = 'rect') {
  const n = box(slide, name, text, x, y, w, h, {
    size: 23,
    fill: '#E5F3F0',
    geometry,
    insets: 12,
    align: 'center',
  });
  n.text.verticalAlignment = 'middle';
  n.line = { style: 'solid', fill: '#0F766E', width: 1.5 };
  return n;
}
for (const d of decks) {
  const p = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  let tables = [];
  for (const [index, data] of d.slides.entries()) {
    const slide = p.slides.add();
    slide.background.fill = data.type === 'cover' ? '#0F766E' : '#FFFFFF';
    if (data.type === 'cover') {
      box(slide, 'cover-label', 'LOGICLAB / UNIT ' + d.unit, 64, 84, 1100, 50, {
        size: 25,
        color: '#DDF3EE',
      });
      box(slide, 'cover-title', data.title, 64, 220, 1100, 180, {
        size: 60,
        bold: true,
        color: '#FFFFFF',
      });
      box(slide, 'cover-subtitle', data.body, 64, 470, 1100, 120, {
        size: 28,
        color: '#FFFFFF',
      });
    } else {
      box(slide, 'slide-title', data.title, 64, 49, 1152, 90, {
        size: 42,
        bold: true,
        color: '#0F766E',
      });
      if (data.type === 'text') points(slide, data.points, 64, 170, 1120, 28, 28);
      if (data.type === 'code') {
        box(slide, 'pseudocode', data.code, 64, 165, 710, 465, {
          size: 23,
          mono: true,
          color: '#E9F1F7',
          fill: '#172538',
          insets: 20,
        });
        points(slide, data.points, 820, 172, 396, 24, 24);
      }
      if (data.type === 'table') {
        table(slide, data);
        tables.push(index + 1);
      }
      if (data.type === 'flow') {
        const labels = [
          'Start',
          'DECLARE num AS NUM',
          'INPUT num',
          'SET num = num + 1',
          'OUTPUT num',
          'End',
        ];
        let prev;
        labels.forEach((label, i) => {
          const n = node(
            slide,
            'flow-' + i,
            label,
            100,
            159 + i * 76,
            460,
            54,
            [0, 5].includes(i)
              ? 'roundRect'
              : [2, 4].includes(i)
                ? 'parallelogram'
                : 'rect',
          );
          if (prev)
            slide.shapes.connect(prev, n, {
              kind: 'straight',
              fromSide: 'bottom',
              toSide: 'top',
              line: { style: 'solid', fill: '#0F766E', width: 2 },
              tail: { type: 'triangle' },
            });
          prev = n;
        });
        points(slide, data.points, 650, 180, 550, 26, 28);
      }
      if (data.type === 'hierarchy') {
        const main = node(slide, 'hierarchy-main', 'Main', 465, 170, 350, 70);
        ['ReadValues', 'CalculateTotal', 'DisplayResult'].forEach((label, i) => {
          const child = node(slide, 'hierarchy-' + i, label, 64 + i * 402, 350, 350, 70);
          slide.shapes.connect(main, child, {
            kind: 'elbow',
            fromSide: 'bottom',
            toSide: 'top',
            line: { style: 'solid', fill: '#0F766E', width: 2 },
          });
        });
        points(slide, data.points, 64, 450, 1140, 24, 16);
      }
      if (data.type === 'class') {
        const t = slide.tables.add({
          rows: 3,
          columns: 1,
          left: 64,
          top: 180,
          width: 560,
          height: 330,
          values: [
            ['Account'],
            ['- balance: NUM'],
            ['+ deposit(amount: NUM)\n+ getBalance(): NUM'],
          ],
        });
        for (let r = 0; r < 3; r++) {
          t.getCell(r, 0).fill = r === 0 ? '#0F766E' : '#EFF6F6';
          t.getCell(r, 0).text.style = {
            typeface: 'DejaVu Sans',
            fontSize: 26,
            color: r === 0 ? '#FFFFFF' : '#183247',
            bold: r === 0,
            insets: 20,
            verticalAlignment: 'middle',
          };
        }
        tables.push(index + 1);
        points(slide, data.points, 690, 185, 510, 26, 28);
      }
    }
    box(
      slide,
      'footer',
      `LogicLab / Unit ${d.unit} revision / ${index + 1} of ${d.slides.length}`,
      64,
      674,
      1152,
      25,
      { size: 16, color: data.type === 'cover' ? '#DDF3EE' : '#657B88' },
    );
    slide.speakerNotes.text =
      'Original supplementary revision material by Lefa Malatji. Based on the five-unit LogicLab course outline and authored teaching examples. The detailed teaching deck remains available separately. Pseudocode is a design notation. NUM accepts whole and decimal numbers. Method and object examples use documented design conventions.';
  }
  const staging = path.join(root, 'revision-build', 'unit-' + d.unit);
  await fs.mkdir(staging, { recursive: true });
  const candidate = path.join(staging, `candidate-${run}.pptx`),
    final = path.join(root, 'revision-build/final', `unit-${d.unit}-${run}.pptx`);
  await (await PresentationFile.exportPptx(p)).save(candidate);
  const r = await finalizePresentation({
    workspaceDir: root,
    candidatePath: candidate,
    finalPath: final,
    pythonExecutable: process.env.CODEX_PRIMARY_RUNTIME_PYTHON,
    integrityValidatorPath: path.join(
      skill,
      'container_tools/inspect_presentation_package_integrity.py',
    ),
    layoutValidatorPath: path.join(
      skill,
      'container_tools/inspect_presentation_layout_geometry.py',
    ),
    layoutArgs: [
      '--expected-slide-size-emu',
      '12192000,6858000',
      '--validate-heading-fit',
    ],
    explicitTotalSlideCount: 10,
    fontPolicy: { basis: 'design', families: ['DejaVu Sans', 'DejaVu Sans Mono'] },
    verifyArtifactToolImport: true,
    receiptPath: path.join(staging, `validation-${run}.json`),
  });
  await fs.copyFile(final, path.join(out, `logiclab-unit-${d.unit}-revision.pptx`));
  console.log('FINAL', d.unit, JSON.stringify(r).slice(0, 150));
  const finalP = await PresentationFile.importPptx(await FileBlob.load(final));
  for (const [i, slide] of finalP.slides.items.entries()) {
    const png = await finalP.export({ slide, format: 'png', scale: 1 });
    await fs.writeFile(
      path.join(staging, `slide-${i + 1}.png`),
      new Uint8Array(await png.arrayBuffer()),
    );
  }
  console.log('RENDERED', d.unit);
}
