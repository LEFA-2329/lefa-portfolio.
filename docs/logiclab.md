# LogicLab: first PRLD release

Live path: `/learn/` on the existing portfolio GitHub Pages deployment.

## Files

- `dist/learn/index.html`: application shell and accessible navigation.
- `dist/learn/styles.css`: responsive workspace, lesson and diagram styling.
- `dist/learn/data.mjs`: five units and 22 original lessons, each with theory, quiz and structured debugging exercise.
- `dist/learn/engine.mjs`: supported pseudocode parser and SVG flowchart/hierarchy rendering.
- `dist/learn/app.mjs`: hash routes, lesson checks, local progress, diagram exports and guided visual traces.

No build step, API key, database, account or paid AI service is required. ES modules must be served over HTTP, not opened via `file://`.

## Tests

Run `node tests/logiclab.test.mjs` from the repository root. The tests cover every supported lesson diagram, malformed blocks, CASE, nested loops and decisions, function dependencies, recursion and escaping.

## Teaching conventions

Arrays are zero-based; FOR bounds are inclusive; comments use whole-line `//`. The diagram lab has a visible syntax guide. It validates recognised structure, not expression semantics or algorithm correctness. Flowcharts support ELSEIF and terminal RETURN exits. BREAK, CONTINUE, class definitions and overloaded method resolution are outside the converter scope. Methods can be diagrammed but are not executed by the tracer.

## Practice and privacy

Model answers stay hidden in the UI until a complete attempt. This is not secure assessment: client-side solutions can be inspected in source. Completion requires passing both the quiz and the structured debugging check. Completion IDs are saved in browser localStorage only. Reset progress removes those IDs. No cross-device synchronisation is claimed.

English is available in this release. Sepedi content requires review before release. Other teaching modules are planned, not implemented. Review the original explanations and exercise keys before using them in assessed work.

## Extending

Add lessons with stable unique IDs and a unit ID in `data.mjs`. A debugging exercise identifies one line, one category and one multiple-choice correction, with a hint and explanation. Add new pseudocode constructs in the parser and renderer together, and extend tests before changing the published supported-syntax list.

SVG and PNG download directly. PDF uses the browser's Print / Save as PDF interface. Browser camera, microphone and external AI services are not used.
