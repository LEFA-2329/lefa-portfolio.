import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import {
  courseUnits,
  courseLessons,
} from '../dist/learn/js/csharp/course-outline-and-lessons.mjs';
import { exampleFiles } from '../dist/learn/js/csharp/complete-example-files.mjs';
import { sourceZip } from '../dist/learn/js/csharp/project-zip-download.mjs';
test('five C# units and separate Docker topics cover every supplied outcome', () => {
  assert.equal(courseUnits.filter((u) => u.id.startsWith('csharp-')).length, 5);
  assert.equal(courseUnits.filter((u) => u.id.startsWith('docker-')).length, 2);
  assert.equal(new Set(courseLessons.map((l) => l.id)).size, courseLessons.length);
  for (const u of courseUnits) {
    const covered = new Set(
      courseLessons.filter((l) => l.unit === u.id).flatMap((l) => l.outcomes),
    );
    for (const o of u.outcomes) assert(covered.has(o.split(' ')[0]), u.id + ':' + o);
  }
  for (const lesson of courseLessons) {
    assert(exampleFiles[lesson.project]?.length, lesson.project);
    assert(
      existsSync(
        new URL('../dist/learn/pages/' + lesson.page + '.html', import.meta.url),
      ),
    );
    assert(lesson.quiz.length);
    for (const q of lesson.quiz) assert(q.answer >= 0 && q.answer < q.options.length);
  }
});
test('complete example catalogues match editable source files and exclude build output or databases', () => {
  for (const [project, files] of Object.entries(exampleFiles))
    for (const f of files) {
      assert(!/(^|\/)(bin|obj)(\/|$)|\.db$|(^|\/)\.env$/.test(f.name));
      assert.equal(
        f.content,
        readFileSync(
          new URL(
            '../dist/learn/downloads/csharp/' + project + '/' + f.name,
            import.meta.url,
          ),
          'utf8',
        ),
      );
    }
});
test('project ZIP encodes exact source bytes with a matching directory', async () => {
  const files = [
    { name: 'Program.cs', content: 'Console.WriteLine("Lefa");\n' },
    { name: 'Data/Notes.txt', content: 'C# . Docker . café' },
  ];
  const bytes = new Uint8Array(await sourceZip(files).arrayBuffer()),
    view = new DataView(bytes.buffer);
  assert.equal(view.getUint32(0, true), 0x04034b50);
  assert.equal(view.getUint32(bytes.length - 22, true), 0x06054b50);
  assert.equal(view.getUint16(bytes.length - 12, true), 2);
  const text = new TextDecoder().decode(bytes);
  for (const f of files) {
    assert(text.includes(f.name));
    assert(text.includes(f.content));
  }
  assert.throws(() => sourceZip([{ name: '../escape.cs', content: 'bad' }]));
});

test('numbered parts reconstruct every complete source file exactly', async () => {
  const { codeParts, orderedTeachingFiles } = await import(
    '../dist/learn/js/csharp/step-by-step-code.mjs'
  );
  for (const files of Object.values(exampleFiles)) {
    for (const file of files)
      assert.equal(
        codeParts(file)
          .map((p) => p.code)
          .join(''),
        file.content,
        file.name,
      );
    for (const { file, index } of orderedTeachingFiles(files))
      assert.equal(files[index], file);
  }
  const minimal = exampleFiles['01-minimal-api'].find((f) => f.name === 'Program.cs');
  assert(codeParts(minimal).length >= 6);
  const config = exampleFiles['03-ef-sqlite'].find((f) => f.name === 'appsettings.json');
  assert.doesNotThrow(() => JSON.parse(config.content));
});
test('beginner guidance provides a separate runnable starting example and standard hyphens', () => {
  const guide = readFileSync(
    new URL('../dist/learn/pages/csharp-beginner-guide.html', import.meta.url),
    'utf8',
  );
  assert.match(guide, /separate Console App/);
  assert.match(guide, /Hello Lefa\. You are 22\./);
  assert.match(guide, /cs-lesson\/cs-crud-minimal/);
  assert.match(guide, /Dependency injection means/i);
  assert.ok(!/[\u2013\u2014]/.test(guide));
  for (const unit of courseUnits) assert.ok(!/[\u2013\u2014]/.test(unit.sessions));
});
test('every lesson has a project description and focus before code', async () => {
  const { projectBriefs, lessonFocus } = await import(
    '../dist/learn/js/csharp/course-outline-and-lessons.mjs'
  );
  for (const lesson of courseLessons) {
    assert.equal(projectBriefs[lesson.project].length, 4);
    assert.ok(
      projectBriefs[lesson.project].every(
        (text) => text.length > 20 && !/[\u2013\u2014]/.test(text),
      ),
    );
    assert.ok(lessonFocus[lesson.id]?.length > 20, lesson.id);
  }
  const shell = readFileSync(
    new URL('../dist/learn/pages/csharp-lesson-shell.html', import.meta.url),
    'utf8',
  );
  assert.ok(shell.indexOf('{{dynamic_12}}') < shell.indexOf('{{dynamic_11}}'));
  assert.ok(
    shell.indexOf('{{dynamic_12}}') < shell.indexOf('Build the code part by part'),
  );
});
test('guided C# path covers every lesson with valid prerequisite links and five unit practicals', async () => {
  const { lessonGuides, lessonPrerequisites, unitPracticals, troubleshooting } =
    await import('../dist/learn/js/csharp/learning-path-and-guides.mjs');
  const csharp = courseLessons.filter((l) => l.unit.startsWith('csharp-'));
  assert.equal(csharp[0].id, 'cs-foundations');
  for (const lesson of csharp) {
    assert.equal(lessonGuides[lesson.id].length, 6, lesson.id);
    assert.ok(lessonGuides[lesson.id].every((text) => text.length > 20));
    assert.ok(troubleshooting[lesson.unit].length >= 3);
    const visited = new Set();
    const visit = (id) => {
      assert.ok(!visited.has(id), 'Prerequisite cycle at ' + id);
      visited.add(id);
      for (const prerequisite of lessonPrerequisites[id]) {
        assert.ok(
          csharp.some((l) => l.id === prerequisite),
          prerequisite,
        );
        visit(prerequisite);
      }
      visited.delete(id);
    };
    visit(lesson.id);
  }
  assert.equal(Object.keys(unitPracticals).length, 5);
});
