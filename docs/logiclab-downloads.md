# Study downloads and additional practice topics

The Downloads route offers PDF and real DOCX files with questions only, answers only, or both. All three variants share 229 numbered exercises: 110 MCQs, 22 debugging exercises, 44 lesson tasks and 53 library tasks. Answers are deliberately available as open revision downloads, independent of in-app solution gates.

Five editable PowerPoint files cover the five learning units, including every original lesson theory section, two worked examples per lesson with explanations, test cases, review questions and explanations. The units contain 95, 112, 95, 94 and 80 slides respectively (476 total). Additional diagrams explain flowchart symbols, IF/ELSE branches, array indices, module calls and class compartments. Unit 2 adds SWITCH/CASE; Unit 3 adds a concrete matrix traversal.

New library tasks add six standard-array exercises, six IF/ELSE exercises and six SWITCH/CASE exercises. The diagram parser accepts SWITCH selector, CASE value, DEFAULT and ENDSWITCH aliases using the existing CASE AST. This pseudocode dialect has no fall-through.

Runtime files remain static and use relative download links, suitable for later standalone migration. No new service, credentials or payment is required. Generated binaries are versioned with the application.

Checks: run the expansion, student-tasks and downloads Node tests. Reopen DOCX/PPTX ZIP packages, extract PDF text, validate all exercise numbers and render samples. PowerPoint files are exported with Artifact Tool and pass its package/layout validation. Original assessment files are not republished.

## Complete worked examples revision

The five decks now use a dedicated authored example set in scripts/slide-lessons.json. Every one of the 22 lessons has a complete solved program, explicit problem inputs and requirements, a worked trace with final output, an exercise prompt, a complete exercise solution and its trace. Unit 2 additionally includes a dedicated SWITCH exercise and solved answer. Multi-slide programs are labelled by part and use balanced page lengths.

Unit 1 adds a Data type definition slide with INTEGER, REAL, STRING, BOOLEAN and CHARACTER definitions and examples. Array programs initialise or input their data. Method programs include declarations and calls. OOP examples include complete class definitions, constructors, methods and object use rather than comment-only outlines. Overloading and OOP remain written pseudocode outside the diagram parser grammar.

The test-only restricted translator in tests/logiclab-slide-examples.test.mjs executes 36 authored numeric programs plus boundary cases to check their stated outputs. It is not an application feature or a general pseudocode runner. Package/layout checks and rendered slide review cover the exported decks.

## Teaching and declaration audit

All five units now introduce notation before worked code. Unit-level foundations cover declarations, literals, initialisation, input/output, expressions, control structures, arrays, method signatures, scope, return values, classes, access modifiers, constructors and inheritance. Lesson-specific bridge slides address concepts used ahead of their main unit, such as early FOR loops and matrix notation.

Every worked program and exercise answer has logical line numbers with matching line-by-line walkthroughs. There are 572 explanations across the 44 main programs, plus walkthroughs for the supplemental SWITCH and matrix examples. The authoring audit checks 135 variable, parameter and field declarations in their relevant scopes and fails on unknown identifiers or missing statement explanations. This is a source-quality check, not a general type checker or proof of correctness.

Access modifier definitions cover PUBLIC, PRIVATE and PROTECTED before the first class program. VIRTUAL and OVERRIDE are introduced before the inheritance example. Constructors initialise the fields used by later methods. NumberPrinter now has an explicit no-argument constructor, and Learner receives a Course through its constructor so the course reference is assigned before DisplayDetails reads it. Class and hierarchy diagrams match their worked code.

Validation adds tests/logiclab-slide-audit.test.mjs, including negative tests for undeclared names and local-scope leakage. The previous numeric-output tests still pass. Definitions distinguish named variables, which require declarations, from literal values, which do not.
