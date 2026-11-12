# StudyLab database module

Date: 12 November 2026

## Scope
- Rename the web application to StudyLab and add a module picker. Existing PRLD routes, saved answers and static resources are retained.
- Add explicit overviews to all five PRLD learning units.
- Add six DATA6211/w overviews aligned to the supplied outline, covering 38 stated outcomes, with 18 original lessons, 36 quiz questions and 18 written tasks.
- Include labelled relational ERDs and an interactive 1NF/2NF/3NF worked example with functional-dependency arrows and descriptions.
- Add a browser SQL workspace with SQL Server, PostgreSQL and MySQL compatibility choices; 13 examples, eight self-check challenges, schema inspection, query results, two fictional datasets and SQL downloads.

## Execution architecture and limits
The actual execution engine is sql.js 1.13.0 (SQLite compiled to WebAssembly). The browser does not connect to native SQL Server, PostgreSQL or MySQL services. The distinction appears prominently above the editor and in the teaching content. SQL Server TOP on a simple SELECT, unquoted dbo. prefixes and dialect-specific DROP INDEX forms are adapted. Other operations use the documented portable subset. Unsupported generated-key syntax, server commands, native functions and transaction control are rejected with guidance.

Native DBMS data types, collations, date rules, string lengths, numeric precision and optimiser behaviour are not emulated. Demo setup scripts use common SQL with explicitly supplied identifiers; they were executed in the local SQLite engine, not on three native servers. Database-specific behaviour should be checked in native tools.

Each workspace uses an isolated Web Worker and in-memory database. SQL drafts and lesson attempts persist in existing browser-local saved work; database mutations do not persist after leaving or refreshing. All statements in one Run are wrapped in a savepoint and rolled back on error. Foreign keys are enabled; output is capped at 500 rows per statement, input at 30,000 characters and 20 statements, pages at approximately 32 MB, and execution at four seconds. Stop/timeout terminates the worker and reloads demo data.

No student accounts, shared backend, private profiles or secure assessments are added. Written and SQL challenge answers remain self-assessed. Solutions unlock after an attempt but are not source-code secrets. New database Word packs and PowerPoint decks are not part of this release; unit/lesson printing and SQL downloads are available.

## Verification
- All 17 existing LogicLab test files passed.
- New database test file passed: six units, 38 outcomes, 18 lessons, 36 quizzes, 39 runnable example/dialect combinations, 24 challenge/dialect combinations, setup scripts, key constraints, rollback, comments/quoted literals, dialect rejection and result truncation.
- Browser: SQL Server TOP, PostgreSQL LIMIT and MySQL aggregates returned expected results. Failed-batch rollback retained the original 20 students and removed stale output. Timeout recovery restored the demo and retained the draft. Draft reload and setup download worked.
- Browser: challenge answers were locked before a run and unlocked afterward. Database quiz incorrect/correct feedback and reload restoration passed. Written task attempt, solution reveal and draft restoration passed.
- Browser: all six database unit overviews rendered expected outcome counts. All database lesson Learn/Quiz/Try it yourself sections rendered. Normalisation stage switching produced the complete 3NF schemas.
- Browser at 390px: SQL workspace had no page overflow and the Topics menu switched between PRLD and Databases and closed after navigation. Physical-device testing was not performed.
- Existing download files retain the original LogicLab branding; the web application uses StudyLab.

## Runtime attribution
sql.js: https://github.com/sql-js/sql.js (MIT licence retained in the vendor directory).
SQL syntax references: Microsoft SQL Server SELECT/TOP, PostgreSQL SELECT, and MySQL SELECT/CREATE TABLE documentation. Unit chapter references follow the user-supplied outline; the prescribed textbook itself was not supplied or reproduced.
