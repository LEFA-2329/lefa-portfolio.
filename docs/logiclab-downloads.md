# Study downloads and additional practice topics

The Downloads route offers PDF and real DOCX files with questions only, answers only, or both. All three variants share 229 numbered exercises: 110 MCQs, 22 debugging exercises, 44 lesson tasks and 53 library tasks. Answers are deliberately available as open revision downloads, independent of in-app solution gates.

Five editable PowerPoint files cover the five learning units, including every original lesson theory section, two worked examples per lesson with explanations, test cases, review questions and explanations. The units contain 55, 60, 49, 54 and 39 slides respectively (257 total). Additional diagrams explain flowchart symbols, IF/ELSE branches, array indices, module calls and class compartments. Unit 2 adds SWITCH/CASE; Unit 3 adds a concrete matrix traversal.

New library tasks add six standard-array exercises, six IF/ELSE exercises and six SWITCH/CASE exercises. The diagram parser accepts SWITCH selector, CASE value, DEFAULT and ENDSWITCH aliases using the existing CASE AST. This pseudocode dialect has no fall-through.

Runtime files remain static and use relative download links, suitable for later standalone migration. No new service, credentials or payment is required. Generated binaries are versioned with the application.

Checks: run the expansion, student-tasks and downloads Node tests. Reopen DOCX/PPTX ZIP packages, extract PDF text, validate all exercise numbers and render samples. PowerPoint files are exported with Artifact Tool and pass its package/layout validation. Original assessment files are not republished.

## Complete worked examples revision

The five decks now use a dedicated authored example set in scripts/slide-lessons.json. Every one of the 22 lessons has a complete solved program, explicit problem inputs and requirements, a worked trace with final output, an exercise prompt, a complete exercise solution and its trace. Unit 2 additionally includes a dedicated SWITCH exercise and solved answer. Multi-slide programs are labelled by part and use balanced page lengths.

Unit 1 adds a Data type definition slide with INTEGER, REAL, STRING, BOOLEAN and CHARACTER definitions and examples. Array programs initialise or input their data. Method programs include declarations and calls. OOP examples include complete class definitions, constructors, methods and object use rather than comment-only outlines. Overloading and OOP remain written pseudocode outside the diagram parser grammar.

The test-only restricted translator in tests/logiclab-slide-examples.test.mjs executes 36 authored numeric programs plus boundary cases to check their stated outputs. It is not an application feature or a general pseudocode runner. Package/layout checks and rendered slide review cover the exported decks.
