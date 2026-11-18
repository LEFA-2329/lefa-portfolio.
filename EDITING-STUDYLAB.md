# Editing StudyLab

Open this repository folder in VS Code. The application is a static website: HTML supplies page layouts, CSS supplies appearance, and JavaScript modules supply content and behaviour.

## Find the right file

| Change                                       | Source to edit                                                          |
| -------------------------------------------- | ----------------------------------------------------------------------- |
| Logo, header, module selector, sidebar shell | `dist/learn/index.html`                                                 |
| Page headings, sections, buttons and layout  | `dist/learn/pages/`                                                     |
| Colours and themes                           | `dist/learn/css/theme-colours.css`                                      |
| Overall layout and responsive rules          | `dist/learn/css/page-layout.css`                                        |
| Settings layout                              | `dist/learn/pages/settings-panel.html`                                  |
| Settings behaviour and persistence           | `dist/learn/js/shared/theme-settings.mjs` and `display-preferences.mjs` |
| Programming lessons and quizzes              | `dist/learn/js/programming-logic/content/lessons-and-quizzes.mjs`       |
| Diagram editor HTML                          | `dist/learn/pages/pseudocode-diagram-lab.html`                          |
| Diagram editor behaviour                     | `dist/learn/js/programming-logic/pseudocode-diagram-page.mjs`           |
| Diagram dropdown examples                    | `dist/learn/js/programming-logic/content/diagram-examples.mjs`          |
| Pseudocode syntax and generated diagrams     | `dist/learn/js/programming-logic/pseudocode-parser-and-diagrams.mjs`    |
| Guided trace page HTML                       | `dist/learn/pages/guided-pseudocode-trace.html`                         |
| Guided trace controls and rendering          | `dist/learn/js/programming-logic/guided-trace-page.mjs`                 |
| Guided trace algorithms and state examples   | `dist/learn/js/programming-logic/content/guided-trace-examples.mjs`     |
| Database lessons                             | `dist/learn/js/database/content/`                                       |
| SQL editor, marking and demo datasets        | `dist/learn/js/database/sql/`                                           |
| Normalisation tools and cases                | `dist/learn/js/database/normalisation/`                                 |
| C# and Docker course outline                 | `dist/learn/js/csharp/course-outline-and-lessons.mjs`                   |
| C# teaching guides                           | `dist/learn/js/csharp/learning-path-and-guides.mjs`                     |
| Progress backup HTML                         | `dist/learn/pages/progress-backup.html`                                 |
| Backup validation and merge rules            | `dist/learn/js/shared/progress-backup.mjs`                              |
| Public Study Packs page                      | `scripts/build-studylab-search-pages.mjs`                               |
| Free module study-pack questions             | `scripts/build-module-study-packs.py`                                   |
| Navigation and page handoffs                 | `dist/learn/js/navigation-and-pages.mjs`                                |

The private premium documents are separate from this public repository. Do not copy them into public download folders when editing free resources.

## Folder responsibilities

- `dist/learn/pages`: editable HTML templates.
- `dist/learn/css`: styles grouped by feature.
- `dist/learn/js/programming-logic`, `database`, `csharp`: each subject's pages and content.
- `dist/learn/js/shared`: browser storage, settings, downloads and other shared features.
- `dist/learn/downloads`: public student downloads and example projects.
- `scripts`: teaching-material and HTML generators.
- `tests`: behaviour and structural checks.
- `docs`: detailed editing notes and release records.

`dist` contains both editable source and generated output in this existing project. File headers identify generated files. Keep one authoritative source: change an HTML template, then rebuild its generated copy. Do not edit `dist/shared/compiled-html-pages.mjs` directly. Public topic pages such as `dist/learn/study-packs/index.html` are also generated; edit their generator instead.

## Make and preview a change

1. Run `npm ci` once to install development tools. Python 3 is also needed for teaching-material generation and local preview.
2. Open a source from the table and make a small change.
3. Run `npm run format`, `npm run build`, then `npm test`.
4. Run `npm run dev` and open `http://127.0.0.1:8080/learn/`.
5. Refresh the browser after edits. Stop the local server with Ctrl+C.
6. Commit the edited source and corresponding generated output. Pushing the main branch deploys through the existing GitHub Pages workflow.

For example, to add a diagram dropdown example, edit `diagram-examples.mjs`. To change the guided trace heading, edit `guided-pseudocode-trace.html`, then build. To change Next/Previous behaviour, edit `guided-trace-page.mjs`.

## Coding conventions

Use named exports and descriptive feature filenames. Keep editable learning data in `content/` and browser event handling in a page module. Pass page dependencies explicitly, as the diagram and guided trace pages do; avoid new global variables. Keep transient UI state inside the feature that owns it. Share a helper only when it has a clear reusable responsibility.

Keep saved lesson IDs, storage keys, page element IDs, template placeholders and route names stable unless their consumers and migrations are updated together. Continue escaping student input before adding it to HTML. Follow existing cleanup and storage-error handling patterns. Preserve the stylesheet import order because it affects the cascade.
