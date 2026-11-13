# StudyLab database expansion and DATA6222

Date: 13 November 2026

## Delivered

- DATA6222 is a separate learning-module choice with nine unit overviews, all 106 numbered outcomes transcribed from the supplied outline, 27 original lessons, 54 quiz questions and 81 lesson practice prompts (application, example tracing and design review).
- 36 Intermediate worked examples: 27 main examples and nine additional examples. Design notation, portable SQL and native SQL Server examples are labelled separately.
- Introductory lessons retain their original task and offer three additional unit-level exercises. These are 18 new distinct unit exercises reused across related lessons, giving four task choices per introductory lesson. Existing answers remain available.
- SQL workspace expanded from 13 to 37 executable examples and from eight to 32 self-check challenges. Examples include CASE, COALESCE, EXISTS, NOT EXISTS, subqueries, CTEs, unions, self joins, cross joins, defaults and referential actions.
- Each Intermediate main example is downloadable, with a separate college setup script for native SQL Server. These are original teaching examples, not textbook reproductions. No new Word/PDF/PPT packs or video uploads are included.

## Fixes

- Accept unquoted dbo-qualified table names in SQL Server DROP INDEX adaptation.
- Validate the ON table against the actual index owner rather than silently discarding an incorrect table name.
- Give explicit SSMS guidance for unsupported variables, GO, OUTPUT and TRY/CATCH instead of passing them to SQLite with misleading syntax errors.
- Save additional written task drafts, attempts, hints and solution visibility separately; preserve the original task record. Saved-work links identify the task and reopen the correct task.
- Correct course navigation and lesson paging so Intermediate remains separate from Introduction and PRLD.
- Preserve SQL line breaks in model answers; wrap long explanatory answers.
- Run all test files in GitHub Pages deployment, including the previously skipped database tests.
- Refresh changed module and stylesheet URLs together.

## Verification and limits

`node --test tests/*.test.mjs` passes. Database coverage includes 111 workspace example/dialect runs, 96 SQL challenge/dialect runs, 36 portable Intermediate example/dialect runs, foreign keys, batch rollback, result limits, invalid native T-SQL guidance, qualified index drops and wrong-table rejection.

Native SQL Server code is reviewed teaching material; this environment does not provide a SQL Server instance. Native procedures, batches, SSMS GUI steps, optimiser behaviour and transactions have not been execution-tested here. The browser continues to run SQLite via sql.js and does not simulate native SQL Server stored procedures or administrative features.

The screenshots supply the course outline, not error reports. Existing tests passed before changes. The fixes above are specific reproduced or observed issues; no claim is made that all possible defects have been eliminated.
