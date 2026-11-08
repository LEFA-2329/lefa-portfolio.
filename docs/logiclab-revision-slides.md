# Short revision slides

Each of the five units has a separate editable 10-slide revision PowerPoint, available alongside its detailed teaching deck in `/learn/#resources`. The files are `dist/learn/downloads/logiclab-unit-N-revision.pptx`, where N is 1 through 5. Existing detailed decks and study packs are retained by the Git tree update.

The decks cover key definitions, worked pseudocode and traces, practice answers and common mistakes. NUM is included. Code declares scalar and array variables or typed parameters before use. Flowchart, hierarchy and class diagrams use native editable slide objects. Method/object examples remain revision exercises and do not imply that the current tracer executes methods or objects.

Authored content: `scripts/revision-content.json`. Builder: `scripts/build-revision-slides.mjs`, using the runtime Artifact Tool presentation package and the presentation finalizer. Run from the repository root with CODEX_PRIMARY_RUNTIME_NODE_MODULES and CODEX_PRIMARY_RUNTIME_PYTHON set. The build writes private candidate/validation/render files under `revision-build` and copies final validated decks into the download directory. Run the presentation-operation marker for a new authoring session before regeneration.

Checks: `node tests/logiclab-revision.test.mjs` verifies unit counts, ten slides per unit, example results and download links. The presentation finalizer checks package integrity, slide dimensions, text geometry, fonts and importability. All slides were rendered and visually reviewed, including corrected flow direction and hierarchy spacing. A browser download of Unit 1 matched the final local file hash. These checks do not claim native Microsoft PowerPoint application testing.
