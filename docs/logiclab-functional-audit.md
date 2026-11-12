# LogicLab functional audit

Date: 12 November 2026

## Fixes
- Correctly handle escaped backslashes and quotes when stripping inline pseudocode comments.
- Ignore Method-like text inside strings when building hierarchy charts.
- Include Method calls in conditions, loop bounds and nested call arguments in hierarchy charts.
- Refresh module cache versions and add regression coverage.

## Verification
- All 15 LogicLab automated test suites passed.
- All 22 lessons rendered their theory, knowledge check, debugging and practice sections.
- All six diagram presets generated diagrams; SVG and PNG downloads worked.
- Tracing accepted valid NUM input and recovered from invalid numeric input.
- Quiz attempts, hints, debugging feedback, solution unlocking and completion marks worked.
- Drafts and exam timers survived refresh. Exam submission and rubric self-assessment worked.
- Clearing audit drafts preserved completed lesson marks.
- All 16 live PDF, Word and PowerPoint downloads matched repository files. Office archives and XML were valid.
- At a 390px mobile viewport, lessons, diagram lab and exams had no page overflow; mobile navigation worked.

## Limits
This audit verifies the listed scenarios, not every possible program or device. Methods, Modules and object-oriented programs are not executed by the tracer. Written exam answers require self-assessment. Work is stored per browser profile, without accounts or cross-device sync. Hidden answers are a learning aid, not secure examination protection. Mobile checks used a browser viewport, not a physical phone.

## Navigation and appearance update
- Simplified primary navigation to Home, Practice, Code tools and Downloads.
- Added searchable topic groups, direct lesson links and Previous/Next lesson navigation.
- Removed completion counters, badges, completion actions and progress reset UI. Existing stored marks remain untouched for future use. Drafts and question answers continue to save.
- Added persistent light, dark, grey and device-following themes, with a custom accent picker and contrasting button text.
- All 17 current LogicLab test files passed. Browser checks covered topic search, quiz feedback, theme and colour persistence, nine route destinations, generated diagrams and a 390px mobile menu with no page overflow.
