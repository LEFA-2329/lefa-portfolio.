# Database exams, study packs and restored progress

Released 13 November 2026. Extends the SQL marking, practical exercises and dependency-diagram releases.

## Database practice exams

Routes: `#db-exams/database` and `#db-exams/intermediate`. DATA6211 draws 12 quiz questions (two per unit); DATA6222 draws 18. Each adds two ten-mark written tasks, giving 32 and 38 possible practice marks. Quiz questions are automatically scored; written tasks use an explicit self-assessment rubric. Solutions unlock after submission. Attempts offer untimed, 30-minute and 60-minute modes and retain their deadline across reloads. Expired saved attempts submit when reopened. Each course has a separate saved record. These are supplementary practice exams, not official assessments.

## Downloadable packs

`dist/learn/downloads/databases/` contains separate question and answer books in editable Word and printable PDF formats. DATA6211 has 18 questions across six units and a 14-slide revision PowerPoint. DATA6222 has 27 questions across nine units and a 20-slide revision PowerPoint. Question numbers match the answer books. Offline procedure questions include their signatures and normalisation tasks state their assumed dependencies.

Builders: `scripts/export-database-packs.mjs`, `scripts/build-database-workbooks.py` and `scripts/build-database-revision.mjs`. The presentation builder uses the artifact-tool runtime and the presentation validation helpers. The workbook renderer uses LibreOffice through the document rendering helper. Generation requires those build-environment dependencies, not the public site's browser runtime.

## Progress

`#progress/prld`, `#progress/database` and `#progress/intermediate` show completed lessons, latest checked quiz scores and revision suggestions. Completion unlocks after passing the required quiz checks (plus debugging for PRLD). Earlier `logiclab-progress-v1` completion marks are preserved and migrated when a new completion change saves successfully. Completion and drafts use separate storage keys. Clearing saved work retains completion marks; resetting completion marks retains drafts and exams. Browser storage errors are reported. Progress does not sync between devices or profiles.

Also fixed a literal template placeholder in the first database lesson's Unit overview link.

## SQL Server verification remains pending

No SQL Server instance or native SQL client is available in this build environment. `sqlserver-validation.sql` is prepared and reviewed, **not executed**. It refuses database contexts other than a disposable `StudyLabNativeValidation`, refuses existing transactions and fixture-name collisions, exercises representative native behaviour and rolls back fixture objects. Keep PASS output from an actual run before recording native verification. This harness does not certify every lesson example.

## Validation

- Node regression suite: 29 tests passed, including course-specific exams, timers, restoration, scoring, completion migration, revision signals and storage failures.
- Four DOCX/PDF books rendered; every page visually checked. Four PDF page and question-number counts verified (6/6/9/9 pages).
- Both PowerPoints passed package/layout checks; all 34 slides rendered and visually checked. Package integrity and slide counts verified.
- Browser checks: timed Intermediate answer/reload and continuing deadline, submission guard, objective marks, written rubric totals and reload, separate Introduction attempt, lesson quiz completion and persistence, revision suggestions and navigation.
