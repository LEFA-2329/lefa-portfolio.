# Editing StudyLab

StudyLab is a static app. Edit the files inside `dist/learn/` directly; there is no separate source copy or compilation step. The browser uses native JavaScript modules. The portfolio homepage and its assets remain in `dist/`.

## Start here

| Folder or file                          | What belongs here                                                 |
| --------------------------------------- | ----------------------------------------------------------------- |
| `dist/learn/index.html`                 | The page shell, header and navigation containers                  |
| `dist/learn/app.mjs`                    | Small browser entry point; loads the application shell            |
| `dist/learn/js/app.mjs`                 | Routes, sidebar, saved-work page and PRLD lesson views            |
| `dist/learn/js/shared/`                 | Browser storage, appearance, progress and shared quiz rendering   |
| `dist/learn/js/prld/`                   | Pseudocode parser, diagrams, tracing, activities and PRLD exams   |
| `dist/learn/js/prld/content/`           | PRLD units, lessons, quizzes, practice tasks and examples         |
| `dist/learn/js/database/`               | Database lesson views, record validation and practice exams       |
| `dist/learn/js/database/content/`       | Introduction/Intermediate lesson content and practical quizzes    |
| `dist/learn/js/database/sql/`           | SQL datasets, examples, challenges, marking, UI and worker        |
| `dist/learn/js/database/normalisation/` | Dependency scenarios, diagrams, builder and feedback              |
| `dist/learn/css/`                       | Readable styles split by responsibility                           |
| `dist/learn/downloads/`                 | Generated Word/PDF/PowerPoint files and downloadable SQL examples |
| `dist/learn/vendor/`                    | Third-party SQL engine; do not edit or reformat                   |
| `scripts/`                              | Optional generators for course exports, slides, packs and the CV  |
| `tests/`                                | Behaviour checks, grouped by their filename prefixes              |

## Find the right file

| What you want to change                          | File relative to `dist/learn/`                                                                 |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| PRLD lesson theory, worked examples or main quiz | `js/prld/content/data.mjs`                                                                     |
| PRLD extra quizzes, debugging and lesson tasks   | `js/prld/content/practice.mjs`                                                                 |
| PRLD standalone task library                     | `js/prld/content/tasks.mjs`                                                                    |
| PRLD interactive activities                      | `js/prld/content/activities.mjs`                                                               |
| Database Introduction units and lessons          | `js/database/content/database-data.mjs`                                                        |
| Intermediate units, theory and lesson tasks      | `js/database/content/intermediate-data.mjs`                                                    |
| Current Intermediate practical questions         | `js/database/content/intermediate-quizzes.mjs`                                                 |
| Database quiz layout or lesson tabs              | `js/database/database-ui.mjs`                                                                  |
| Database exam selection/scoring                  | `js/database/db-exam.mjs`                                                                      |
| Database exam layout and timer controls          | `js/database/db-exam-ui.mjs`                                                                   |
| SQL demo datasets and dialect setup              | `js/database/sql/sql-data.mjs`                                                                 |
| SQL challenge definitions                        | `js/database/sql/sql-challenges.mjs`                                                           |
| SQL result checking                              | `js/database/sql/sql-grading.mjs`                                                              |
| Dependency-diagram scenarios                     | `js/database/normalisation/normalisation.mjs` and `normalisation-extra.mjs` in the same folder |
| Diagram builder controls                         | `js/database/normalisation/normalisation-builder.mjs`                                          |
| Normalisation feedback rules                     | `js/database/normalisation/normalisation-grading.mjs`                                          |
| Colours, themes and current general layout       | `css/appearance.css`                                                                           |
| SQL/database layout                              | `css/database.css`                                                                             |
| Quiz snippets and spacing                        | `css/quizzes.css`                                                                              |
| Dependency diagrams or builder styling           | `css/normalisation.css` and `css/normalisation-builder.css`                                    |
| Progress styling                                 | `css/progress.css`                                                                             |

## Preview and check an edit

From the repository root:

```bash
npm ci
npm test
npm run format
npm run format:check
python -m http.server 8000 --directory dist
```

Open `http://localhost:8000/learn/`. Use `python3` instead of `python` if your system requires it. Stop the server with Ctrl+C. Node.js is needed for tests and formatting; the public website still needs no Node server, account or API key.

For a small edit, run the relevant test first, for example:

```bash
node --test tests/studylab-practical-quizzes.test.mjs
```

Run the complete `npm test` suite before pushing. Test imports and teaching-material exporters already point to the new folders. Do not copy modules back into the old flat folder.

For the optional Python material generators, use their separate formatter:

```bash
python -m pip install -r requirements-dev.txt
python -m black scripts
python -m black --check scripts
```

`pyproject.toml` keeps Python formatting consistent. The Python scripts were checked to have the same syntax trees before and after this formatting pass.

## Editing questions and preserving student work

Keep lesson IDs, task IDs and browser-storage keys stable when changing wording. They link saved drafts and progress to the correct activity. A change to question identity or answer ordering needs a deliberate quiz revision/migration; otherwise an old saved answer may be marked against a different question.

The Intermediate practical bank uses `S`, `D` and `P` helpers for case studies, debugging and prediction. In their source option arrays, the correct answer goes first; the helper rotates choices and records the resulting correct index. Do not manually set the displayed answer index. Portable prediction fixtures also record expected returned values and are tested automatically.

Legacy Intermediate quizzes are retained inside `intermediate-data.mjs` only to restore older exam attempts. Edit `intermediate-quizzes.mjs` for the current bank. See `studylab-practical-intermediate-quizzes.md` for the migration design.

## CSS and asset paths

`styles.css` imports the nine CSS files in their original cascade order. That order is intentional: appearance and later feature rules override earlier defaults. Prefer the feature file listed above instead of appending unrelated rules to `styles.css`. This refactor did not consolidate or reorder visual overrides.

HTML links to `./downloads/...` resolve from `index.html`. JavaScript imports and `new URL(..., import.meta.url)` resolve from their module file. The SQL worker lives in `js/database/sql/`; its vendor engine paths go up to `dist/learn/vendor/`. Keep these two kinds of relative path distinct.

Use the existing version suffix convention when publishing changes to cached files. During this reorganisation the entry point and relocated modules use version 27. CSS imports are versioned too.

## Deployment and generated files

Push to `main` to run tests and deploy through `.github/workflows/deploy-pages.yml`. That workflow publishes `dist/`; no bundler or build output needs to be generated first. Confirm the deployment job succeeds before describing a change as live.

Content edits do not automatically regenerate Word, PDF or PowerPoint downloads. The optional scripts have their own runtime dependencies and review requirements. Regenerate and review those deliverables separately when their content changes. Do not manually reformat vendor code or binary downloads.

## Advanced Database extension

Edit `dist/learn/js/database/content/advanced-data.mjs` for the eight Advanced units, lessons, quizzes and tasks. Unit IDs start at 201; lesson IDs start with `advanced-`. Matching example downloads live in `dist/learn/downloads/advanced/`. Update both the lesson example and download together. This extension has no institution-specific module code. Native SQL Server execution remains pending.

The five additional SQL datasets live in `dist/learn/js/database/sql/sql-demo-datasets.mjs`. Each dataset keeps its schema, records, examples, challenges and additional grading fixture together. See `docs/studylab-five-datasets.md` for row counts and native testing steps.
