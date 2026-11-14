# StudyLab editing guide

Start with [START-HERE.md](../START-HERE.md). Public routes stay at `/learn/`; this file reorganisation does not change lesson IDs or saved-work keys.

## HTML and CSS

`dist/learn/index.html` is the shell: header, module picker, navigation and main content host. The larger page layouts are now real HTML files under `dist/learn/pages/`.

| Page                            | HTML source                                                        |
| ------------------------------- | ------------------------------------------------------------------ |
| Programming home                | `programming-home.html`                                            |
| Programming lesson and unit     | `programming-lesson.html`, `programming-unit.html`                 |
| Programming practice            | `programming-practice.html`                                        |
| Code tools and diagram lab      | `code-tools.html`, `pseudocode-diagram-lab.html`                   |
| Trace tool                      | `pseudocode-tracing.html`                                          |
| Programming downloads           | `programming-downloads.html`                                       |
| Database home, unit and lesson  | `database-home.html`, `database-unit.html`, `database-lesson.html` |
| Database practice and downloads | `database-practice.html`, `database-downloads.html`                |
| SQL editor page                 | `sql-workspace.html`                                               |
| Saved work and progress         | `saved-work.html`, `learning-progress.html`                        |
| About and privacy               | `about-and-privacy.html`                                           |

Each file begins with a comment naming its page function. `{{dynamic_N}}` placeholders are filled by that function with existing escaped content or trusted application markup. Do not add script tags, inline event handlers or javascript links to templates. Behaviour belongs in the matching JavaScript module.

CSS files in `dist/learn/css/` have descriptive names: `page-layout.css`, `programming-lessons.css`, `database-pages.css`, `theme-colours.css`, `shared-components.css`, `learning-progress.css`, plus normalisation and quiz styles. `dist/learn/styles.css` preserves their cascade order.

## Content and behaviour

| Change                                    | JavaScript file under `dist/learn/js/`                                                         |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Navigation and page selection             | `navigation-and-pages.mjs`                                                                     |
| Programming lessons and main quizzes      | `programming-logic/content/lessons-and-quizzes.mjs`                                            |
| Lesson practice                           | `programming-logic/content/lesson-practice.mjs`                                                |
| Standalone tasks                          | `programming-logic/content/practice-task-bank.mjs`                                             |
| Interactive activities                    | `programming-logic/content/interactive-activities.mjs`                                         |
| Pseudocode syntax and diagrams            | `programming-logic/pseudocode-parser-and-diagrams.mjs`                                         |
| Pseudocode execution and tracer interface | `programming-logic/pseudocode-interpreter.mjs`, `pseudocode-tracer-page.mjs`                   |
| Introduction lessons                      | `database/content/introduction-lessons.mjs`                                                    |
| Intermediate lessons and quizzes          | `database/content/intermediate-lessons.mjs`, `intermediate-quiz-questions.mjs`                 |
| Advanced and Hadoop lessons               | `database/content/advanced-lessons.mjs`, `hadoop-lessons.mjs`                                  |
| Database page behaviour                   | `database/database-pages.mjs`                                                                  |
| SQL data and examples                     | `database/sql/demo-databases-and-examples.mjs`                                                 |
| Five additional demos                     | `database/sql/five-extra-demo-databases.mjs`                                                   |
| SQL challenge questions                   | `database/sql/sql-practice-challenges.mjs`                                                     |
| SQL marking                               | `database/sql/sql-answer-checker.mjs`                                                          |
| SQL editor behaviour                      | `database/sql/sql-workspace-page.mjs`                                                          |
| SQL background worker                     | `database/sql/sql-database-worker.js`                                                          |
| Normalisation lessons and diagrams        | `database/normalisation/normalisation-lessons-and-diagrams.mjs`                                |
| Extra dependency cases                    | `database/normalisation/additional-normalisation-cases.mjs`                                    |
| Normalisation builder and checks          | `database/normalisation/normalisation-diagram-builder.mjs`, `normalisation-answer-checker.mjs` |
| Saved browser work                        | `shared/saved-work-storage.mjs`                                                                |
| Completed lessons and scores              | `shared/learning-progress.mjs`                                                                 |
| Theme settings                            | `shared/theme-settings.mjs`                                                                    |

The root loader is `dist/learn/studylab-start.mjs`. Keep it small. Imported paths are relative to their JavaScript file; links inside page HTML remain relative to the document URL `/learn/`.

## Edit, build and verify

```sh
npm ci
npm run format
npm run build
npm test
npm run format:check
```

`npm run build` compiles the HTML source into a trusted module for fast synchronous page rendering. It does not evaluate JavaScript from templates. Commit that generated module together with your HTML changes. Formatting happens before building; if you format HTML again, rebuild again.

Keep existing lesson IDs and browser storage keys stable. When changing quiz options or their order, update the relevant quiz revision so old selections are not applied to different answers. Keep downloaded example files consistent with lesson examples. Generated PDF, Word and PowerPoint materials use the scripts under `scripts/`.

Python generator formatting remains available with `python -m pip install -r requirements-dev.txt` and `python -m black scripts/*.py`. Native SQL Server and Hadoop validation is separate from browser checks and remains pending.
