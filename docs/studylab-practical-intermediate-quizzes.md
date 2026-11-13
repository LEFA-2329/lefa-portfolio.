# Practical DATA6222 quizzes

Released 13 November 2026. All 27 Intermediate lessons now have three practical questions: 81 current questions, replacing the 54 earlier generic questions. The bank contains 35 case studies, 27 debugging questions and 19 result-prediction questions. Subjects include database design, SQL filtering/aggregation, joins, data changes, schemas, constraints, normalisation, indexes/views, batches/control flow, error handling and stored procedures.

Each question has plausible answer choices and an explanation. Relevant questions include a self-contained SQL snippet and stated assumptions. Lesson quizzes and new mixed-unit exams both render that context. Incorrect choices receive explanatory feedback and can be retried. Native T-SQL remains a teaching example, not an executed SQL Server simulation.

## Saved work

Lesson records now use their lesson's actual question count, including all three checked answers. A question-bank revision prevents old answer positions from being applied to different questions. Written drafts, task attempts and completion marks remain intact. Progress uses the same record validation as the lesson UI and reports the new bank's checked score.

Existing exam attempts retain their previous bank, seed, question identities and marking through bankRevision=1. New Intermediate attempts use revision 2 and draw from the practical bank. Legacy result/attempt screens identify their earlier bank. The frozen legacy questions are retained only to restore existing exams, not offered in new attempts. Introduction exams are unchanged.

## Validation

31 regression tests pass. New checks cover all 81 question records and unique prompts, nine executable prediction fixtures in the portable SQL engine, frozen legacy-exam hashes, restored scores, question-bank migration without losing drafts/completion, all three answers after restoration and escaped snippets. Browser checks confirm wrong/correct explanations, three-answer reload, progress and new exam question context, submission, scoring and worked review.

The portable fixtures check filtering, aggregates/NULL/DISTINCT, join multiplicity, outer-join counts, UNION ALL, NOT IN with NULL and CASE. They do not verify native SQL Server procedures, transaction semantics or engine-specific behaviour. Those still require an actual SQL Server instance.

Microsoft reference material reviewed for native semantics:

- https://learn.microsoft.com/en-us/sql/t-sql/functions/avg-transact-sql
- https://learn.microsoft.com/en-us/sql/t-sql/functions/rowcount-transact-sql
- https://learn.microsoft.com/en-us/sql/t-sql/statements/set-nocount-transact-sql
- https://learn.microsoft.com/en-us/sql/t-sql/language-elements/null-and-unknown-transact-sql
- https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql
- https://learn.microsoft.com/en-us/sql/t-sql/statements/create-procedure-transact-sql

The next content item remains downloadable dependency-diagram question/answer packs with diagrams at each stage.
