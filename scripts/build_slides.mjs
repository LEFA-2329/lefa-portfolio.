import fs from 'node:fs/promises';
import path from 'node:path';
import { Presentation, PresentationFile } from '@oai/artifact-tool';
import { finalizePresentation } from '/home/agent/.codex/skills/builtins/presentations/container_tools/artifact_tool_utils.mjs';
const root = process.cwd();
const C = JSON.parse(await fs.readFile(root + '/build/course.json', 'utf8'));
const solved = JSON.parse(
  await fs.readFile(root + '/scripts/slide-lessons.json', 'utf8'),
);
const foundations = JSON.parse(
  await fs.readFile(root + '/scripts/slide-foundations.json', 'utf8'),
);
const { explainProgram } = await import(root + '/scripts/slide-audit.mjs');
const buildId = Date.now().toString();
const theme = {
  ink: '#17334a',
  muted: '#50677a',
  teal: '#0f766e',
  blue: '#225d8c',
  paper: '#f4f8fb',
  dark: '#122b3c',
};
const clean = (s) => String(s).replace(/[—–]/g, '-').replace(/→/g, ' to ');
function text(
  slide,
  name,
  s,
  x,
  y,
  w,
  h,
  size = 27,
  color = theme.ink,
  bold = false,
  font = 'DejaVu Sans',
) {
  const a = slide.shapes.add({
    name,
    geometry: 'textbox',
    position: { left: x, top: y, width: w, height: h },
    fill: 'none',
    line: { fill: 'none', style: 'solid', width: 0 },
  });
  a.text =
    font === 'DejaVu Sans Mono'
      ? clean(s)
          .split('\n')
          .map((line) => ({
            marginLeft: Math.round(line.match(/^ */)[0].length * 14.4 * 9525),
            runs: [line.trimStart()],
          }))
      : clean(s);
  a.text.style = {
    fontSize: size,
    typeface: font,
    color,
    bold,
    verticalAlignment: 'top',
    autoFit: 'none',
    insets: 0,
  };
  return a;
}
function block(slide, name, label, x, y, w, h, geometry = 'rect', fill = '#e0f2f1') {
  const a = slide.shapes.add({
    name,
    geometry,
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: { style: 'solid', fill: '#5c8b9b', width: 2 },
  });
  a.text = label;
  a.text.style = {
    fontSize: 24,
    typeface: 'DejaVu Sans',
    color: theme.ink,
    alignment: 'center',
    verticalAlignment: 'middle',
    insets: 12,
  };
  return a;
}
function line(slide, x1, y1, x2, y2) {
  slide.shapes.add({
    geometry: 'line',
    position: {
      left: Math.min(x1, x2),
      top: Math.min(y1, y2),
      width: Math.max(1, Math.abs(x2 - x1)),
      height: Math.max(1, Math.abs(y2 - y1)),
    },
    line: { style: 'solid', fill: '#526c80', width: 2 },
  });
}
let total = 0;
const manifest = [];
for (const u of C.units.filter(
  (u) => !process.argv[2] || process.argv.slice(2).map(Number).includes(u.id),
)) {
  const p = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  let page = 0;
  const ls = C.lessons.filter((l) => l.unit === u.id);
  function slide(title, subtitle = '') {
    const s = p.slides.add();
    s.background.fill = theme.paper;
    page++;
    text(s, 'title', title, 64, 44, 1152, 104, 42, theme.ink, true);
    if (subtitle) text(s, 'subtitle', subtitle, 66, 151, 1148, 45, 20, theme.teal);
    text(
      s,
      'footer',
      `LogicLab   Unit ${u.id}   ${page}`,
      64,
      674,
      1150,
      26,
      16,
      theme.muted,
    );
    s.speakerNotes.text = `Original supplementary LogicLab teaching content by Lefa Malatji. Unit ${u.id}: ${u.title}. Use zero-based arrays and inclusive FOR bounds. Teach pseudocode as a design notation, with syntax conventions stated explicitly.`;
    return s;
  }
  let s = slide(u.title);
  s.background.fill = theme.dark;
  text(
    s,
    'unit',
    `PROGRAMMING LOGIC AND DESIGN\nLEARNING UNIT ${u.id}`,
    66,
    183,
    1148,
    90,
    26,
    '#70d5c5',
    true,
  );
  text(s, 'cover-title', u.subtitle, 66, 302, 1110, 160, 55, '#ffffff', true);
  text(
    s,
    'cover-details',
    'Theory, worked examples and revision\nLefa Malatji',
    66,
    517,
    1100,
    90,
    27,
    '#d5e8ef',
  );
  // Hide the dark title/footer conflict by applying the same readable cover text colour.
  s.shapes.items.find((x) => x.name === 'title').text.color = '#ffffff';
  s.shapes.items.find((x) => x.name === 'footer').text.color = '#bdd7e0';
  s = slide('Learning outcomes');
  text(
    s,
    'outcomes',
    ls.map((l, i) => `${i + 1}. ${l.title}`).join('\n\n'),
    66,
    190,
    1140,
    445,
    29,
  );
  function codeSlides(title, code, notes, kind = 'Complete worked solution') {
    const explanations = explainProgram(code);
    const raw = clean(code)
        .split('\n')
        .map((line, i) => `${String(i + 1).padStart(2, '0')}  ${line}`),
      lines = [];
    for (const ln of raw) {
      if (ln.length <= 72) lines.push(ln);
      else {
        let rest = ln;
        while (rest.length > 72) {
          let cut = rest.lastIndexOf(' ', 72);
          if (cut < 15) cut = 72;
          lines.push(rest.slice(0, cut));
          rest = '    ' + rest.slice(cut).trimStart();
        }
        lines.push(rest);
      }
    }
    const parts = Math.ceil(lines.length / 15),
      chunkSize = Math.ceil(lines.length / parts);
    for (let i = 0; i < lines.length; i += chunkSize) {
      const z = slide(
        title,
        `${kind} - part ${Math.floor(i / chunkSize) + 1} of ${parts}`,
      );
      z.background.fill = '#ffffff';
      text(
        z,
        'code',
        lines.slice(i, i + chunkSize).join('\n'),
        66,
        202,
        1145,
        435,
        24,
        theme.ink,
        false,
        'DejaVu Sans Mono',
      );
    }
    for (let i = 0; i < explanations.length; i += 4) {
      const group = explanations.slice(i, i + 4);
      const z = slide(
        'How the code works',
        `${title} - logical lines ${group[0].line} to ${group.at(-1).line}`,
      );
      group.forEach((entry, j) => {
        text(
          z,
          'line-' + entry.line,
          String(entry.line).padStart(2, '0'),
          66,
          207 + j * 104,
          52,
          90,
          25,
          theme.teal,
          true,
        );
        text(
          z,
          'meaning-' + entry.line,
          entry.explanation,
          135,
          207 + j * 104,
          1075,
          94,
          24,
        );
      });
    }
    const z = slide('Trace and final answer', title);
    text(z, 'explanation', notes, 66, 207, 1135, 430, 29, theme.muted);
  }
  function dataTypeDefinition() {
    s = slide('Data type definition');
    text(
      s,
      'definition',
      'A data type defines the kind of values a variable can hold and the operations that are valid for those values.',
      66,
      198,
      1135,
      110,
      31,
      theme.ink,
      true,
    );
    text(
      s,
      'type-examples',
      'INTEGER: whole numbers such as -2, 0 and 17.\nREAL: numbers with fractional parts such as 12.5.\nSTRING: text such as "Lebo" or the identifier "0017".\nBOOLEAN: logical values TRUE and FALSE.\nCHARACTER: one character such as \'A\' in dialects that support it.',
      66,
      337,
      1135,
      235,
      27,
    );
    text(
      s,
      'type-meaning',
      'Choose a type from the meaning of the data. A student identifier uses STRING when leading zeros must be preserved.',
      66,
      590,
      1135,
      64,
      24,
      theme.teal,
    );
  }
  function teachingSlides(title, items, subtitle = 'Concepts before code') {
    for (let i = 0; i < items.length; i += 3) {
      const z = slide(title, subtitle);
      items
        .slice(i, i + 3)
        .forEach((item, j) =>
          text(z, 'concept-' + j, item, 66, 205 + j * 145, 1140, 132, 26),
        );
    }
  }
  for (const [i, section] of foundations.units[String(u.id)].entries()) {
    teachingSlides(section.title, section.items);
    if (u.id === 1 && i === 1) dataTypeDefinition();
  }
  for (const l of ls) {
    const b = C.practice[l.id];
    teachingSlides(
      l.title,
      foundations.lessons[l.id.split('-')[1]],
      'New notation and assumptions',
    );
    for (let i = 0; i < l.sections.length; i += 2) {
      s = slide(l.title, `Theory ${i / 2 + 1} of ${Math.ceil(l.sections.length / 2)}`);
      let y = 207;
      for (const sec of l.sections.slice(i, i + 2)) {
        text(
          s,
          'heading-' + i + '-' + y,
          sec.heading,
          66,
          y,
          1145,
          50,
          29,
          theme.teal,
          true,
        );
        text(s, 'body-' + y, sec.text, 66, y + 55, 1145, 145, 27);
        y += 218;
      }
    }

    const worked = solved[l.id];
    s = slide('Solved example', l.title);
    text(s, 'problem', worked.prompt, 66, 212, 1135, 240, 31, theme.ink);
    text(
      s,
      'problem-guidance',
      'Identify the inputs and required output. The following slides give the complete program, then trace its result.',
      66,
      505,
      1135,
      100,
      27,
      theme.teal,
    );
    codeSlides(l.title, worked.code, worked.trace.join('\n\n'));
    s = slide('Pseudocode exercise', l.title);
    text(s, 'exercise', worked.exercise, 66, 212, 1135, 265, 31, theme.ink);
    text(
      s,
      'exercise-guidance',
      'Write your own solution and trace a test case first. A complete model solution follows on the next slides.',
      66,
      520,
      1135,
      100,
      27,
      theme.teal,
      true,
    );
    codeSlides(
      'Exercise solution',
      worked.solution,
      worked.answer.join('\n\n'),
      'Worked exercise answer',
    );
    const q = l.quiz;
    s = slide('Review question', l.title);
    text(s, 'question', q.question, 66, 205, 1140, 110, 31, theme.ink, true);
    text(
      s,
      'options',
      q.options.map((o, i) => String.fromCharCode(65 + i) + '. ' + o).join('\n\n'),
      66,
      335,
      1130,
      260,
      28,
    );
    s = slide('Review solution', l.title);
    text(
      s,
      'correct',
      String.fromCharCode(65 + q.correct) + '. ' + q.options[q.correct],
      66,
      205,
      1130,
      100,
      32,
      theme.teal,
      true,
    );
    text(s, 'reason', q.explanation, 66, 325, 1130, 145, 29);
    text(s, 'error-label', 'Common mistake', 66, 492, 1130, 45, 27, theme.blue, true);
    text(s, 'error-explanation', l.bug.explanation, 66, 547, 1130, 102, 25);
  }
  // Extra concrete diagrams and the requested additional topics.
  if (u.id === 1) {
    s = slide('Flowchart symbols');
    block(s, 'terminal', 'Start / End', 80, 210, 420, 90, 'roundRect');
    block(s, 'process', 'Calculation or assignment', 650, 210, 500, 90);
    block(s, 'input', 'Input / Output', 80, 410, 420, 100, 'parallelogram');
    block(s, 'decision', 'Condition?', 650, 370, 500, 190, 'diamond');
    text(
      s,
      'symbol-note',
      'Label decision exits True and False. Arrows show the order of control.',
      66,
      592,
      1140,
      55,
      26,
      theme.teal,
    );
  }
  if (u.id === 2) {
    s = slide('IF ELSE control flow');
    block(s, 'test', 'mark >= 50?', 420, 195, 430, 140, 'diamond', '#fff0ce');
    block(s, 'pass', 'OUTPUT "Pass"', 80, 430, 400, 90, 'parallelogram');
    block(s, 'revise', 'OUTPUT "Revise"', 800, 430, 400, 90, 'parallelogram');
    line(s, 420, 265, 280, 265);
    line(s, 280, 265, 280, 430);
    line(s, 850, 265, 1000, 265);
    line(s, 1000, 265, 1000, 430);
    text(s, 'true', 'True', 295, 290, 100, 40, 23);
    text(s, 'false', 'False', 1015, 290, 120, 40, 23);
    text(
      s,
      'if-note',
      'Decision excerpt for the declared mark in the worked example. Exactly one branch runs.',
      66,
      575,
      1130,
      65,
      28,
      theme.teal,
    );
    codeSlides(
      'SWITCH CASE selection',
      'BEGIN\n  DECLARE option AS INTEGER\n  INPUT option\n  SWITCH option\n    CASE 1:\n      OUTPUT "Add"\n    CASE 2:\n      OUTPUT "View"\n    DEFAULT:\n      OUTPUT "Invalid option"\n  ENDSWITCH\nEND',
      'A selector matches exact values. DEFAULT handles an unmatched value.\n\nThis pseudocode dialect has no fall-through and needs no BREAK.\n\nUse IF / ELSE for ranges or compound conditions.',
    );
    s = slide('SWITCH CASE exercise');
    text(
      s,
      'switch-exercise',
      'Input day code 1, 2 or 3. Display Monday, Tuesday or Wednesday. Other inputs display Unsupported day. Write a full program and trace inputs 2 and 9.',
      66,
      212,
      1135,
      260,
      31,
    );
    text(
      s,
      'try-switch',
      'Try the exercise before continuing to the worked answer.',
      66,
      530,
      1135,
      70,
      27,
      theme.teal,
      true,
    );
    codeSlides(
      'SWITCH exercise solution',
      'BEGIN\n  DECLARE day AS INTEGER\n  INPUT day\n  SWITCH day\n    CASE 1:\n      OUTPUT "Monday"\n    CASE 2:\n      OUTPUT "Tuesday"\n    CASE 3:\n      OUTPUT "Wednesday"\n    DEFAULT:\n      OUTPUT "Unsupported day"\n  ENDSWITCH\nEND',
      'Input 2 matches CASE 2 and displays Tuesday.\n\nInput 9 matches no case, so DEFAULT displays Unsupported day.\n\nThis pseudocode dialect executes one branch without fall-through.',
      'Worked exercise answer',
    );
  }
  if (u.id === 3) {
    s = slide('Single array indices and values');
    text(
      s,
      'array-label',
      'DECLARE values[4] AS INTEGER\nSET values = [12, 8, 20, 10]',
      66,
      195,
      1140,
      100,
      27,
      theme.teal,
      true,
    );
    for (let i = 0; i < 4; i++) {
      block(s, 'cell-' + i, String([12, 8, 20, 10][i]), 130 + i * 250, 315, 220, 110);
      text(s, 'index-' + i, 'index ' + i, 130 + i * 250, 445, 220, 45, 24, theme.muted);
    }
    text(
      s,
      'array-note',
      'Length is 4. Valid indices are 0 to 3. The total is 50 and the average is 12.5.',
      66,
      555,
      1130,
      80,
      28,
    );
    codeSlides(
      'Two-dimensional arrays',
      'BEGIN\n  DECLARE matrix[2][3] AS INTEGER\n  DECLARE row AS INTEGER\n  DECLARE col AS INTEGER\n  DECLARE rowTotal AS INTEGER\n  FOR row = 0 TO 1\n    SET rowTotal = 0\n    FOR col = 0 TO 2\n      INPUT matrix[row][col]\n      SET rowTotal = rowTotal + matrix[row][col]\n    ENDFOR\n    OUTPUT row, rowTotal\n  ENDFOR\nEND',
      'The outer loop selects a row. The inner loop visits its columns.\n\nReset rowTotal for every row.\n\nRows [1, 2, 3] and [4, 5, 6] give totals 6 and 15.',
    );
  }
  if (u.id === 4) {
    s = slide('Module hierarchy');
    block(s, 'main', 'Main', 470, 205, 340, 90);
    for (const [x, label] of [
      [150, 'ReadName'],
      [790, 'Greet'],
    ]) {
      block(s, label, label, x, 440, 340, 90);
      line(s, x + 170, 365, x + 170, 440);
    }
    line(s, 640, 295, 640, 365);
    line(s, 320, 365, 960, 365);
    text(
      s,
      'hierarchy-note',
      'Matches the declared ReadName and Greet methods in the worked example. Main calls each module.',
      66,
      575,
      1140,
      75,
      27,
      theme.teal,
    );
  }
  if (u.id === 5) {
    s = slide('Class structure and visibility');
    block(s, 'class-header', 'Learner', 300, 195, 680, 65, 'rect', '#d9efec');
    block(
      s,
      'attributes',
      '- name : STRING\n- course : Course',
      300,
      260,
      680,
      120,
      'rect',
      '#ffffff',
    );
    block(
      s,
      'methods',
      '+ DisplayDetails() : VOID',
      300,
      380,
      680,
      130,
      'rect',
      '#ffffff',
    );
    text(
      s,
      'class-note',
      'Matches the worked Learner class. Minus is PRIVATE and plus is PUBLIC. The constructor is omitted from this diagram.',
      66,
      555,
      1140,
      90,
      28,
      theme.teal,
    );
  }
  s = slide('Unit revision');
  text(
    s,
    'revision',
    `Review the learning outcomes for Unit ${u.id}.\n\nWrite a solution without looking at the worked example.\n\nTrace normal and boundary test cases.\n\nUse the task library and the downloadable question and answer packs for further practice.`,
    66,
    210,
    1140,
    365,
    29,
  );
  text(
    s,
    'convention',
    'Conventions: zero-based arrays, inclusive FOR bounds, METHOD / MODULE names and structured block endings.',
    66,
    588,
    1140,
    65,
    22,
    theme.muted,
  );
  const staging = root + '/build/solved-' + buildId + '-unit-' + u.id;
  await fs.mkdir(staging, { recursive: true });
  const candidate = staging + '/candidate.pptx';
  await (await PresentationFile.exportPptx(p)).save(candidate);
  await fs.mkdir(staging + '/output', { recursive: true });
  const final = staging + '/output/validated.pptx';
  await finalizePresentation({
    workspaceDir: root,
    candidatePath: candidate,
    finalPath: final,
    pythonExecutable: process.env.CODEX_PRIMARY_RUNTIME_PYTHON,
    integrityValidatorPath:
      '/home/agent/.codex/skills/builtins/presentations/container_tools/inspect_presentation_package_integrity.py',
    layoutValidatorPath:
      '/home/agent/.codex/skills/builtins/presentations/container_tools/inspect_presentation_layout_geometry.py',
    layoutArgs: [
      '--expected-slide-size-emu',
      '12192000,6858000',
      '--validate-heading-fit',
    ],
    fontPolicy: { basis: 'design', families: ['DejaVu Sans', 'DejaVu Sans Mono'] },
    verifyArtifactToolImport: true,
    receiptPath: staging + '/validation.json',
  });
  for (let i = 0; i < p.slides.items.length; i++) {
    const b = await p.export({ slide: p.slides.items[i], format: 'png', scale: 0.65 });
    await fs.writeFile(
      staging + `/slide-${String(i + 1).padStart(3, '0')}.png`,
      new Uint8Array(await b.arrayBuffer()),
    );
  }
  await fs.copyFile(final, root + `/dist/learn/downloads/logiclab-unit-${u.id}.pptx`);
  manifest.push({
    unit: u.id,
    title: u.title,
    slides: page,
    file: `logiclab-unit-${u.id}.pptx`,
  });
  total += page;
  console.log('Unit', u.id, 'complete:', page, 'slides');
}
if (!process.argv[2])
  await fs.writeFile(
    root + '/dist/learn/downloads/slides-manifest.json',
    JSON.stringify(manifest, null, 2),
  );
console.log('Total slides', total);
