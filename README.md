# Lefa's portfolio

Personal portfolio for Lefa Malatji, showcasing software development, AI and NLP research, database systems and data analysis.

**Live website:** https://lefamalatji.co.za

## Technology

- HTML, CSS and vanilla JavaScript
- Static files with no application server, database or build step required
- Python and ReportLab for regenerating the downloadable CV (optional)

## Run locally

Install Python 3, open a terminal in this repository, then run:

```bash
python -m http.server 8000 --directory dist
```

Open http://localhost:8000 in your browser.

## Files

- `dist/index.html`: indented page structure and content
- `dist/styles.css`: formatted styles and responsive layouts
- `dist/script.js`: formatted project filters and case-study interactions
- `dist/assistant.js`: guide panel, buttons, messages and follow-up state
- `dist/assistant.css`: guide panel layout and mobile styles
- `dist/guide-core.mjs`: verified facts, project answers and question matching
- `tests/guide.test.mjs`: guide behaviour checks
- `.editorconfig`: indentation and line-ending settings for editors
- `.prettierrc.json`: HTML, CSS and JavaScript formatting rules
- `dist/lefa-malatji.jpeg`: portrait
- `dist/Lefa-Malatji-CV.pdf`: downloadable CV
- `dist/favicon.svg` and `dist/favicon.ico`: browser icons
- `scripts/generate_cv.py`: optional CV generator

## Update the portfolio

Edit page content in `dist/index.html`, styles in `dist/styles.css`, or interactions in `dist/script.js` using Visual Studio Code, then preview locally. Replace the portrait or CV in `dist/` as needed. Commit and push your changes to keep this repository up to date.

## Automatic deployment

The workflow `.github/workflows/deploy-pages.yml` deploys `dist/` to GitHub Pages when files in `dist/` change on `main`. It can also be started manually from Actions.

One-time setup:

1. In this repository, open Settings > Pages.
2. Under Build and deployment, set Source to GitHub Actions.
3. Open Actions > Deploy portfolio to GitHub Pages > Run workflow.
4. Wait for a successful deployment and open the URL shown by the deployment job.

The workflow adjusts asset links in the deployment copy so the GitHub Pages project URL works. No build or account secrets are required.

**Custom domain:** https://lefamalatji.co.za is served by GitHub Pages. Successful deployments from `main` update the live portfolio.

## StudyLab source structure

The learning app now separates shared code, PRLD, database lessons, SQL and normalisation into feature folders. Its CSS is split into focused stylesheets. Start with the [StudyLab editing guide](docs/studylab-editing-guide.md) for a file-by-file map and safe editing steps.

- `dist/learn/js/app.mjs`: application shell and routes
- `dist/learn/js/shared/`: appearance, storage and progress
- `dist/learn/js/prld/`: programming logic features and `content/`
- `dist/learn/js/database/`: database features, `content/`, `sql/` and `normalisation/`
- `dist/learn/css/`: styles grouped by responsibility
- `tests/`: regression checks; `scripts/`: optional material generators

## Keep code readable

Use two spaces for HTML, CSS and JavaScript, and four spaces for Python. Keep each statement on its own line. Prettier is pinned in the lockfile so editors and command-line formatting use the same version. Vendor files and generated teaching downloads are excluded.

```bash
npm ci
npm run format
npm run format:check
npm test
```

The website remains buildless: npm is a development convenience for formatting and tests, not a production server requirement.

### Common edits

| Change                                         | File                                                                           |
| ---------------------------------------------- | ------------------------------------------------------------------------------ |
| Introduction, project cards or contact buttons | `dist/index.html`                                                              |
| Main layout, colours or responsive styles      | `dist/styles.css`                                                              |
| Project filters and case-study dialogs         | `dist/script.js`                                                               |
| Guide answers, projects or matching rules      | `dist/guide-core.mjs`                                                          |
| Guide interactions and follow-up suggestions   | `dist/assistant.js`                                                            |
| Guide appearance                               | `dist/assistant.css`                                                           |
| Downloadable CV                                | Replace `dist/Lefa-Malatji-CV.pdf` and update its version in `dist/index.html` |

The guide runs locally in the visitor’s browser using prepared facts. No API key or AI billing is required.

## Regenerate the CV (optional)

The generator below is a legacy template and predates the latest uploaded two-page CV. To preserve the current CV content and section order, replace the PDF directly instead of regenerating it from this script.

```bash
python -m pip install -r requirements.txt
python scripts/generate_cv.py
```

The generator expects DejaVu Sans fonts under `/usr/share/fonts/truetype/dejavu/`. On other operating systems, update the `FONT` variable in the script to your local font directory.

## Content

Personal photographs, CV content and project descriptions belong to Lefa Malatji. No reuse licence has been granted.
