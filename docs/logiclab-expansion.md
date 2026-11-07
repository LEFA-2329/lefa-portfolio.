# LogicLab learning expansion

22 lessons across five units, 110 multiple-choice questions, 22 structured debugging challenges, 44 self-check tasks and 22 additional worked examples. Examples and tasks are original supplementary material and need educator review before assessed use.

Every lesson has five questions. All five plus the existing debugging challenge are required for a new completion mark. Existing stored completion IDs are preserved. Quiz feedback follows an attempt; practice model solutions require a meaningful text attempt and a separate reveal action. Free text is self-checked, not automatically graded. Work stays in page memory; only completion IDs persist locally.

The deterministic browser converter accepts METHOD, MODULE and FUNCTION, ELSEIF, RETURN exits, several common aliases and plain assignments. It has no per-diagram quota or paid service. It is not a pseudocode interpreter or proof of correctness. Unsupported statements fail explicitly. Limits: 100,000 characters, 1,000 non-empty lines, nesting depth 16 and bounded SVG dimensions. Class syntax, overloaded names, BREAK and CONTINUE are outside the grammar.

## Later standalone project

All runtime files are self-contained under dist/learn and use relative imports with no portfolio dependencies. To separate later, copy that folder to the new repository web root; retain all six runtime files and index.html, configure static hosting and a domain, then update links. No repository migration is performed by this change.

## Validation

Run `node tests/logiclab-expansion.test.mjs`. Browser checks cover quiz navigation, gated solutions and diagram generation. No third-party dependencies or build step are required.
