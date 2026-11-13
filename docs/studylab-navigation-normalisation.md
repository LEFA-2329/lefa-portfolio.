# Navigation cleanup and normalisation diagrams

13 November 2026

## Navigation

Removed the decorative right-arrow glyphs from PRLD, Introduction, Intermediate and database-practice lesson links, plus previous/next/continue button arrow glyphs. Instructional dependency notation, foreign-key notation, supported pseudocode assignment syntax and meaningful diagram connectors are retained.

## Normalisation

Replaced the generic dependency-box display with attribute-row dependency diagrams for three worked scenarios:

- Order lines: composite key, partial order/product dependencies and a customer-name transitive dependency.
- Enrolments: composite key, student/course partial dependencies and a lecturer-name transitive dependency.
- Employees: a single candidate key, no 2NF split, and a department-name transitive dependency removed for 3NF.

All nine scenario/stage combinations show the current tables, underlined primary keys, a composite-key bracket where needed, FK labels and named reference targets. Full/key dependencies use solid lines, partial dependencies dashed lines, and transitive dependencies dotted lines, with text labels as well as colours. Business assumptions are explicit, including catalogue pricing versus per-sale prices.

Each stage has a dependency table and expandable sample rows. Diagrams have accessible descriptions and scroll within their frame at readable size; a per-diagram control can fit the whole diagram to the available width. Printing fits diagrams to the page.

The walkthrough is shared by the existing introductory normalisation lessons and the Intermediate dependency lesson. No existing SQL challenges, exam attempts or saved written answers are replaced.

## Validation

The full automated suite passes. New checks cover all three scenarios and nine normal-form stages, projected candidate-key uniqueness, stated dependencies, preservation of foreign-key references and lossless reconstruction of the supplied sample through natural joins. Samples illustrate the rules; they do not prove dependencies for every possible dataset.

Browser verification covers scenario selection, all 1NF/2NF/3NF switches, expected table counts, fit/readable-size controls, readable SVG rendering and removal of decorative lesson-link arrows.
