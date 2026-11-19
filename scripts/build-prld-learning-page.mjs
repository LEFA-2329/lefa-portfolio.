// Generate the readable PRLD guide from the same content as the application.
import { readFileSync } from 'node:fs';
import {
  lessons,
  units,
} from '../dist/learn/js/programming-logic/content/lessons-and-quizzes.mjs';
const read = (name) =>
  JSON.parse(
    readFileSync(
      new URL('./study-packs/prld5121/' + name + '.json', import.meta.url),
      'utf8',
    ),
  );
const extras = read('extra-topics');
const questions = read('additional-practice');
const diagrams = read('diagrams');
export function prldLearningPage(page, escape) {
  const code = (source) => {
    const pattern =
      /("[^"\n]*"|\/\/[^\n]*|\b(?:BEGIN|END|DECLARE|AS|SET|INPUT|OUTPUT|IF|THEN|ELSE|ELSEIF|ENDIF|FOR|TO|ENDFOR|WHILE|DO|ENDWHILE|METHOD|ENDMETHOD|RETURN|RETURNS|CLASS|ENDCLASS|PRIVATE|PUBLIC|NEW|CONSTRUCTOR|ENDCONSTRUCTOR|INHERITS|VIRTUAL|OVERRIDE|SWITCH|CASE|DEFAULT|ENDSWITCH|TRUE|FALSE|AND|OR|NOT|INTEGER|REAL|STRING|BOOLEAN|CALL|REPEAT|UNTIL|WHEN|OTHERWISE|ENDCASE)\b)/g;
    let at = 0,
      html = '';
    for (const match of source.matchAll(pattern)) {
      html += escape(source.slice(at, match.index));
      const kind = match[0].startsWith('//')
        ? 'comment'
        : match[0].startsWith('"')
          ? 'string'
          : 'keyword';
      html += `<span class="prld-${kind}">${escape(match[0])}</span>`;
      at = match.index + match[0].length;
    }
    return `<pre tabindex="0"><code>${html + escape(source.slice(at))}</code></pre>`;
  };
  const link = (route, label) =>
    `<a class="button" href="/learn/${route}">${escape(label)}</a>`;
  page(
    '/learn/prld5121/',
    'PRLD5121 complete study route',
    'Programming Logic study route with 22 lessons, pseudocode examples, traces, debugging, 78 tasks, Word and PDF resources, revision slides and two mixed practice papers.',
    `
<p class="lede">Learn the idea, trace the example, then solve a problem yourself.</p>
<p>This route covers all 22 lessons in the current StudyLab course. Three extensions add SWITCH, two dimensional arrays and an integrated student marks project. Match it with your lecturer's official outline and assessment notation.</p>
<div class="actions">${link('#unit/1', 'Start Unit 1')}${link('study-packs/#pack-prld5121', 'Download PRLD5121 resources')}</div>
<section class="panel"><h2>Your learning resources</h2><p>The expanded pack includes a full study guide, a 78-task workbook, worked answers, editable Word copies, a quick reference, revision slides and two 100-mark practice papers with separate marking guides. The slides are for revision; the guide gives the detailed teaching.</p><ol><li>Read the lesson explanation and identify its inputs, rules and outputs.</li><li>Predict the example output, then check its execution trace.</li><li>Attempt the workbook task before looking at its answer.</li><li>Record what went wrong, change an input and try again.</li><li>Complete each unit before attempting the mixed practice papers.</li></ol></section>
<section class="panel"><h2>Choose a unit</h2>${units
      .map(
        (u) =>
          `<h3>Unit ${u.id} ${escape(u.title)}</h3><ul>${lessons
            .filter((l) => l.unit === u.id)
            .map((l) => `<li><a href="#${l.id}">${escape(l.title)}</a></li>`)
            .join('')}</ul>`,
      )
      .join(
        '',
      )}<h3>Extra practice</h3><ul>${extras.map((l) => `<li><a href="#${l.id}">${escape(l.title)}</a></li>`).join('')}</ul></section>
<section class="panel"><h2>Notation and tool support</h2><p>DECLARE introduces a variable, SET assigns a value, INPUT reads and OUTPUT displays. Arrays start at index 0. FOR includes its end value. A positive-step range with its start above its end runs zero times. // starts a short comment. Blue keywords, brown strings and green comments use separate styles while following your chosen theme.</p><p>Pseudocode is a design notation with different institutional conventions. These examples do not compile directly in Visual Studio. Use the StudyLab tracer for its supported subset. The matrix extension uses supported separate row and column brackets. Some object-oriented designs still require a written trace. A generated flowchart alone does not verify a program's behaviour.</p></section>
${[...lessons, ...extras]
  .map((l, i) => {
    const task = i < 22 ? questions[i] : l;
    const diagram = diagrams.find((d) => d.lesson === i + 1);
    return `<section class="panel" id="${l.id}"><p>Unit ${l.unit} . ${i < 22 ? 'Core lesson ' + (i + 1) : 'Extension ' + (i - 21)}</p><h2>${escape(l.title)}</h2><h3>Learning goals</h3><ul>${l.outcomes.map((o) => `<li>${escape(o)}</li>`).join('')}</ul><details><summary>Read the step-by-step explanations</summary>${l.sections.map((s) => `<h3>${escape(s.heading)}</h3><p>${escape(s.text)}</p>`).join('')}</details><h3>What you are building</h3><p>${escape(l.examplePrompt)}</p>${diagram ? `<figure><img class="prld-diagram" src="/learn/images/study-packs/prld5121-lesson-${i + 1}.svg" alt="${escape(diagram.title)}" loading="lazy"><figcaption>${escape(diagram.title)}</figcaption></figure>` : ''}${code(l.example)}<details><summary>Check the worked execution</summary><ol>${l.exampleTrace.map((t) => `<li>${escape(t)}</li>`).join('')}</ol></details>${l.bug ? `<h3>Find and fix the error</h3><p>${escape(l.bug.prompt)}</p>${code(l.bug.code)}<details><summary>Show the repair and explanation</summary>${code(l.bug.options[l.bug.correct])}<p>${escape(l.bug.explanation)}</p></details>` : ''}<h3>Try independently</h3><p>${escape(task.question)}</p><details><summary>Show answer and self-check criteria</summary><p>${escape(task.answer)}</p><ul>${task.rubric.map((t) => `<li>${escape(t)}</li>`).join('')}</ul></details>${i < 22 ? link('#lesson/' + l.id, 'Open lesson activities and quiz') : ''}<p><a href="#content">Back to the study route</a></p></section>`;
  })
  .join('')}
<section class="panel"><h2>Practise with the learning tools</h2><div class="actions">${link('#tasks', '53-task online bank')}${link('#trace', 'Pseudocode tracer')}${link('#lab', 'Flowchart editor')}${link('#exams', 'Online practice exam')}${link('#resources', 'Unit downloads and slides')}</div><p>The chapter workbook and practice papers include written designs, traces, debugging and diagrams. Some activities need self-marking against the worked criteria. Automatic multiple-choice scores cannot assess your complete written solution.</p></section>`,
    { lesson: false },
  );
}
