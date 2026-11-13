# Dependency-diagram teaching expansion

Released 13 November 2026. Route: `#normalisation/projects`, linked from database Practice and the normalisation lesson walkthroughs.

## Student experience

Nine original cases now provide 54 questions: order lines, enrolments, employees, project assignments, rental items, book royalties, C1-C5, A-G and clinic visits. Each case supplies business rules, an initial attribute-row diagram, a six-question 20-mark exercise, a browser-saved draft and worked 2NF/3NF decompositions after an attempt. Worked answers include primary/foreign-key schemas, dependency classifications, final ERD relationship mappings and an update-anomaly explanation. The current view can be printed; hiding the solution prints the question view.

The shared diagram renderer now follows the supplied teaching convention: shaded, bold, underlined key cells; a joint key bus above the row; partial/transitive arrows below. Upper key arrows include implied dependencies, so the rules explicitly warn that an upper arrow does not establish a _full_ dependency. Diagrams have readable-size scrolling, a fit control and text alternatives. The existing lesson walkthroughs share all nine cases and their 27 normal-form stages.

Rules define functional dependencies, candidate keys, superkeys and prime attributes, then distinguish 1NF, 2NF and 3NF. 2NF applies to every candidate key, and the formal 3NF superkey/prime-attribute condition accompanies the simpler exercise-specific transitive-dependency rule. Cases state a single candidate key so the intended dependency classifications are unambiguous. BookID is used across editions rather than incorrectly reusing ISBN as a work identifier.

## Checks

The regression suite verifies all nine cases, declared key minimality and closure, proper-subset dependency removal at 2NF, final determinant superkeys, foreign-key preservation and sample lossless reconstruction. It also checks the six-question/20-mark structure and saved-draft sanitisation. Browser checks cover attempt gating, empty draft handling, solution reveal, persisted answers, separate case drafts, diagrams and the shared lesson walkthrough. Native SQL Server verification remains outside this diagram-only change.
