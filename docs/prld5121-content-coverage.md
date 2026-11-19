# PRLD5121 teaching resources

The expanded resources cover every lesson currently in StudyLab. This is a coverage map of the current application, not certification against an official institutional outline. Check that outline before describing coverage as complete for assessment.

| Unit       | Core lesson numbers | Content                                                                                                                       |
| ---------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1          | 1-5                 | Algorithms, development cycle, pseudocode, flowcharts, types, variables, constants, expressions, structured design and traces |
| 2          | 6-10                | Boolean selection, nested decisions, counted and conditional loops, sentinels and nested loops                                |
| 3          | 11-14               | Arrays, bounds, linear search, parallel arrays and bubble sort                                                                |
| 4          | 15-19               | Decomposition, hierarchy charts, parameters, arguments, scope, returns, arrays in methods, overloads and contracts            |
| 5          | 20-22               | Classes, instances, constructors, encapsulation, inheritance, polymorphism and class diagrams                                 |
| Extensions | 23-25               | Multi-way CASE selection, two dimensional arrays and integrated student marks report                                          |

Each core chapter reuses the actual online lesson explanations, outcomes, example, trace and debugging case. Additional chapter practice covers a distinct scenario. The guide has six labelled diagrams. The workbook contains 25 chapter tasks and the existing 53 practical bank tasks, for 78 total. Answers cover all tasks. Two new supplementary papers have five 20-mark written questions each and separate marking guidance. These free papers were authored for this expansion; no private premium papers were copied.

## Edit content

- `dist/learn/js/programming-logic/content/lessons-and-quizzes.mjs`: authoritative core lessons, examples, traces and debugging cases.
- `dist/learn/js/programming-logic/content/practice-task-bank.mjs`: existing 53 practical tasks.
- `scripts/study-packs/prld5121/additional-practice.json`: 22 additional questions with answers and five-point self-checks.
- `scripts/study-packs/prld5121/extra-topics.json`: three extension chapters, complete pseudocode, traces and practice.
- `scripts/study-packs/prld5121/revision-papers.json`: two papers and mark allocations.
- `scripts/study-packs/prld5121/diagrams.json`: Graphviz source for six maintained PNG/SVG illustrations.
- `scripts/build-prld-resources.py`: PDF and Word generation, names and bundle contents.
- `scripts/build-prld-learning-page.mjs`: online study route and links.
- `dist/learn/css/prld-study-route.css`: syntax colours and teaching figures.

Run `npm run build` after editing. Install `requirements.txt` for ReportLab and python-docx. The normal build uses Node to read lesson data, then generates the PDFs, Word documents and resource catalogue. No Python runs in the student's browser. PowerPoint and its PDF copy remain maintained files: edit the deck, check every changed slide, export its matching PDF and then rebuild the catalogue. Six PNG/SVG diagrams are maintained outputs; regenerate from the DOT strings using Graphviz when changing their content.

## Student resource names

- `PRLD5121-Study-Guide.pdf` and `.docx`
- `PRLD5121-Practice-Questions.pdf` and `.docx`
- `PRLD5121-Worked-Answers.pdf` and `.docx`
- `PRLD5121-Illustrated-Revision.pptx`
- `PRLD5121-Revision-Slides.pdf`
- `PRLD5121-Mixed-Practice-Papers.pdf`
- `PRLD5121-Mixed-Practice-Marking-Guide.pdf`
- `PRLD5121-Quick-Reference.pdf`

The ZIP contains all 11 files. Word versions are editable; PDF copies have fixed layouts. The study route also links the existing unit slides, activities and supported pseudocode tools.

## Verification boundaries

The extension menu, matrix and integrated report examples run in the browser interpreter's JavaScript engine under automated tests, including invalid marks and immediate boundary values. Core lesson tests continue unchanged. Some object-oriented designs are written design tasks rather than executable tracer programs. The full workbook remains self-marked against solutions. No student accounts, paid APIs or new backend are required. Progress from existing lesson activities still uses the existing browser storage; reading the static companion page does not automatically mark a lesson completed.
