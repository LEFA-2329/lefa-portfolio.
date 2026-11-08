# Interactive exercises and progressive hints

Open `/learn/#activities` or use Interactive exercises in the sidebar. Twenty original activities provide one of each format in each of the five units: missing line, predict output, reorder statements and debugging. Existing lessons, written tasks, tracing and downloads remain available.

Choice answers are checked against the authored correct option. Ordering exercises use an explicit required sequence, with prompts constraining ordering where syntax could otherwise permit alternatives. Move up/down buttons support keyboard operation and retain focus on the moved statement. A missing selection or untouched initial order cannot unlock a solution. After any submitted attempt, including an incorrect answer, students can reveal the worked answer and explanation. Two hints are revealed in order, separately from the solution. Answers are not inserted into the solution DOM before reveal. This is browser practice, not a secure assessment system; the authored data remains inspectable in source.

Activities cover NUM declarations, assignment, arithmetic, boundaries, counted and conditional loops, array bounds, parallel arrays, return values, arguments, private fields and object state. Methods and objects are checked as authored exercises and are not executed by the tracer. Inputs and order changes stay in page memory for this release; refresh persistence is a later plan item.

Validation: `node tests/logiclab-activities.test.mjs` checks unit/format coverage, choices, invalid submissions, ordering data and executable numeric examples. Browser checks cover filters, empty/wrong/correct attempts, hint progression, solution gating, reorder buttons and keyboard activation. Existing NUM, grid and lesson tests pass.
