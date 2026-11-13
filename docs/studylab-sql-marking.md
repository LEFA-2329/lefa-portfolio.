# SQL challenge marking and practical Intermediate tasks

13 November 2026

## Changes

- All 32 SQL challenges now offer **Check my answer**, separate from the ordinary **Run SQL** sandbox action.
- Marking executes the student and reference SQL in separate temporary databases, first with the original fictional demo, then with extra rows, NULLs, empty parents and unmatched children. The open sandbox is not used for grading and remains unchanged by completed checks.
- Feedback distinguishes syntax errors, missing result tables, wrong column counts, wrong row counts, wrong values or duplicate multiplicities, requested ordering and explicitly requested aliases. Unspecified aliases are allowed; unordered tasks use multiset comparison. Floating-point differences within an absolute 0.0000001 tolerance are allowed.
- CREATE/default/ALTER/foreign-key exercises additionally inspect required table metadata. Marking checks the specified outputs and structures on two fixtures, rather than proving equivalence for every possible database or enforcing a particular query spelling.
- Feedback appears beside the editor and in the task section. Drafts and checked answers save separately for each challenge and dialect. Editing a query marks the feedback as stale; reloading or opening Saved work restores the relevant draft and feedback. No server accounts, remote database service or AI API are involved.
- The worker retains query-time and memory limits. Stopping or timing out a worker restores the original demo, as in the existing sandbox. Native T-SQL is not executed by this SQLite-based marker.
- 54 repeated Intermediate tracing/review prompts were replaced with distinct debugging and application scenarios across all nine units. Selected portable tasks link directly to the matching automatically marked workspace challenge. Native SSMS tasks and free-text design answers remain self-assessed.
- Existing task drafts remain available. An updated prompt displays a notice when an earlier-version draft exists.

## Validation

The full Node test suite passes. Dedicated marking checks execute all 32 model answers in all three compatibility modes against both fixtures (192 model execution scenarios), plus regressions for hardcoded demo answers, always-empty queries, outer-join COUNT mistakes, schema omission, ordering, duplicate counts, NULL/zero, text/numeric values, alias requirements and syntax errors. Linked Intermediate model answers are also graded.

Browser verification covers incorrect and correct feedback, an additional-data failure, saved feedback and draft restoration, stale feedback after editing, preservation of an inserted sandbox row during marking, direct links from Intermediate tasks and challenge selection.

This remains local practice feedback, not a secure assessment platform. Native SQL Server procedures, SSMS GUI steps and T-SQL batches still require separate native testing.
