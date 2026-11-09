# LogicLab practice exams

Version 1.1 adds the `/learn/#exams` route, with links in the sidebar and dashboard.

Each attempt selects 15 distinct questions from the existing 110-question lesson bank: three questions per unit. A stored random seed preserves selection across refreshes. The two original written tasks cover counted loops and returning a meaningful prefix total from an array method. Each has five criteria worth 0, 1 or 2 self-assessed marks.

Quiz results are marked automatically out of 15. Written work is self-assessed out of 20, with a combined practice total displayed only after all ten criteria have a mark. This is revision, not a formal assessment or a secure exam. Solutions are rendered only after the full attempt is submitted, but remain inspectable in client source. The written tasks stay the same between attempts.

Untimed, 30-minute and 60-minute modes are available. Timed deadlines are absolute local wall-clock times and continue while navigating or closing the browser. An expired attempt is submitted when its exam view is open or next reopened, before any additional answer changes. The route cleans up its interval when leaving. Clock tampering, student identity and secure submissions are outside this browser-only version.

One attempt is stored under the existing work-store key `exam`, with validated answer indices, 10,000-character written limits and rubric marks. Starting a new attempt replaces that record, with a visible notice. Saved work links back to the attempt; clearing all saved work includes the exam. People sharing the same browser profile share the record; devices do not synchronise.

After submission students can inspect each quiz answer, compare written work with complete solutions, use the marking checklist, follow unit revision links and print results through the browser. Print expands quiz reviews. Unit suggestions reflect three sampled questions, not measured mastery.

Verification: 14 LogicLab test files pass, including selection across 99 seeds, persistence validation, deadline boundaries, unanswered/incorrect/correct results, separate rubric totals and executable written-loop boundary cases. Browser checks cover setup, timed and untimed attempts, selection, written drafts, refresh, submission confirmation, solution unlocking and retained self-assessment. Phone-width setup and navigation were inspected at 390px. No physical-device test was performed.
