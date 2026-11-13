# Interactive normalisation builder and feedback

Released 13 November 2026. Main route: `#nf-builder/projects/standard`, linked from database Practice and each dependency question page.

Students choose the original candidate key and add typed dependency arrows, then create their own 2NF/3NF tables by selecting attributes and primary keys. They can name tables, add/remove tables, declare foreign-key links, copy their 2NF draft into 3NF and print the diagrams. Previews use the existing attribute-row SVG renderer. The 2NF/3NF preview arrows are projected from the supplied rules onto the student's selected attributes; a preview is explicitly distinguished from a correctness result.

Guided mode supplies the original key and arrows; Standard asks students to construct them; Challenge omits the rule reference panel. All modes retain the necessary scenario assumptions. Nine cases and three levels have separate saved drafts, with independent 2NF and 3NF table states. Saved work links reopen the relevant case and difficulty. Existing written answers are retained.

## Feedback

The original-arrow check uses attribute closure to validate dependency truth and coverage, candidate-key minimality and the selected classification. Full/key arrows must use a candidate key and require its whole determinant for each target. A dependency may be full on that key while also having a transitive path; the checker does not incorrectly treat these as mutually exclusive mathematical properties.

For decompositions, the checker projects the declared functional dependencies onto each submitted relation, enumerates minimal candidate keys, checks 2NF or the formal superkey/prime-attribute 3NF condition, checks attribute coverage and dependency preservation, and uses a tableau chase to establish a lossless join. Foreign-key links must contain the full chosen parent key and connect the decomposition. Table names and attribute order are ignored for equivalence. A fully 3NF answer also satisfies a 2NF check. Duplicate tables, missing facts, bad keys and invalid links receive feedback.

These bounded checks apply to the nine built-in cases (at most eight attributes and twelve submitted tables). They do not grade arbitrary schemas, free-text reasoning, SQL or physical database behaviour. No new server or API is required. Native SQL Server execution remains pending, as documented previously.

## Validation and remaining roadmap

30 Node tests pass. New tests cover all nine models and both stages, renamed/reordered tables, key errors, missing facts, partial/transitive violations, lossless/lossy joins, dependency preservation, FK validation, limits and restoration of table IDs/links. Browser checks cover creating key/arrows, a correct 1NF result, detecting and repairing 2NF/3NF violations, renamed tables, FK controls, reload restoration and separate difficulty drafts.

This release completes the interactive builder, automatic feedback and difficulty-level priorities. More varied Intermediate quizzes, diagram download packs and native SQL Server verification remain separate roadmap work.
