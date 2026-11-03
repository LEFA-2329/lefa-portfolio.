# Free portfolio guide

The current interface uses prepared answers from dist/guide-core.mjs and does not call an AI service. It requires no API key or backend. Questions stay in the browser. It covers experience, technical skills, databases, projects, research, education and contact. Unknown questions get a contact fallback.

Run `node --test tests/guide.test.mjs` and `node --check dist/assistant.js`.

The optional Worker files and tests are retained as an inactive future upgrade. They are not connected to the guide and must not be deployed without secure key setup and explicit approval of paid API usage. assistant-config.js is not loaded by index.html.

This work remains on a feature branch for review; main and the live portfolio are unchanged. The private Sites review requires ChatGPT sign-in. Browser QA remains pending because the test browser is not signed in.
