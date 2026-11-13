# Source organisation refactor

Released 13 November 2026. This change reorganises and formats existing code so it can be edited directly, without introducing a build step or changing stored lesson/task IDs.

- Moved 36 application modules into `dist/learn/js/`, grouped into `shared`, `prld`, `database/content`, `database/sql` and `database/normalisation`. Kept a small `dist/learn/app.mjs` browser entry point.
- Split StudyLab CSS into nine named stylesheets. The original cascade order and non-whitespace rule content were verified before/after formatting; visual overrides were not consolidated or reordered.
- Updated module imports, SQL worker/vendor paths, tests and teaching-material exporters. Download links still resolve from the document and binary files were not regenerated.
- Formatted frontend code, tests, JavaScript generators and Markdown documentation. Python generators were formatted with Black and verified to retain identical syntax trees. Third-party vendor code and generated downloads are excluded.
- Added a pinned Prettier development dependency, lockfile and `npm test`, `npm run format`, `npm run format:check` commands. npm is not needed to serve the public static site.
- Added `studylab-editing-guide.md` and updated the README with the current file map and common editing tasks. Historical release documents point to the new module locations.

Validation: all 32 tests passed, formatting checks passed, module/worker/CSS path checks passed, and the database pack content exporter ran successfully. Browser checks verified SQL worker initialisation and execution (20 students), normalisation checking, saved Intermediate quiz records, PRLD quiz checking and the portfolio homepage. The public release is also checked after deployment.
