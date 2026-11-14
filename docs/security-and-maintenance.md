# Security and maintainability review

## Implemented

- Added a restrictive Content Security Policy to the portfolio, StudyLab, services and school redirect pages. It restricts scripts, module connections and workers to this origin, blocks inline JavaScript, disallows plugin objects, frames and base URL changes, and blocks form submission navigation. Existing enquiry JavaScript still prepares messages locally for an explicit email/WhatsApp action.
- StudyLab permits WebAssembly compilation for its local SQLite engine; it does not permit JavaScript eval. Inline style declarations remain permitted because existing diagrams, layout and the colour picker depend on them.
- Added a referrer policy. There are no third-party runtime scripts in the reviewed entry pages.
- Page layouts and portfolio case studies compile from checked-in HTML; templates reject executable elements, event attributes and script URLs. Templates are not fetched from arbitrary URLs and do not evaluate expressions at runtime. Dynamic sections remain trusted application markup or explicitly escaped text.
- Preserved escaping for SQL result cells, column names, table definitions, saved answers and diagram labels. Added regression checks for malicious-looking text.
- Hardened dataset/dialect preference lookup so inherited object names cannot be treated as valid choices.
- Project story selection is an explicit own-property allowlist. Recruiter questions are rendered with textContent and answers remain prepared local content.
- Existing SQL time, statement, storage, result and worker limits remain in place. SQL runs in a local practice database, not on the hosting server.
- Added template freshness, content policy, import-path and malicious-text regression checks. File names now describe their role, with a full rename map and editing guide.

## Limits

This is defence in depth, not a guarantee against every threat or a penetration-test certification. Browser-delivered HTML, JavaScript, quizzes and answers are public and cannot be hidden from visitors. There is no secure exam backend, account system or cross-device private storage. Keep passwords, API keys and private student records out of the repository and browser storage.

GitHub Pages does not provide a custom response-header configuration in this repository. A meta CSP cannot set frame-ancestors, HSTS, X-Content-Type-Options or worker-specific response headers. Those would need a hosting/CDN layer that supports response headers. No unsupported `_headers` file is presented as effective protection. HTTPS and hosting-level controls still depend on the provider.

Native SQL Server and Hadoop examples remain unverified in their native environments. The changes do not connect to LEFA\\SQLEXPRESS or a Hadoop cluster.

## Maintaining the policy

Entry HTML contains the CSP meta tag. If editing an inline JSON-LD block, update its SHA-256 hash in that policy. Security tests check that the hash matches. Prefer same-origin scripts over adding remote script hosts. Do not add unsafe-inline or unsafe-eval to script-src to silence an error; investigate the blocked feature first.

Run `npm run format`, `npm run build`, `npm test`, then `npm run format:check`. Review browser console errors and test SQL, tracing, saved work and the portfolio guide after changes. Keep the policy and these limits accurate when hosting or features change.

Reference guidance: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy and https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html.

## Verification for this release

All 38 automated tests passed. Browser checks confirmed the new HTML-backed database pages, Hadoop lesson, pseudocode execution (output 5), portfolio StudyLab project popup and recruiter guide. An SQL query returning `<img onerror=...>` and an SVG-shaped column name displayed both as plain text with zero injected image, SVG or script elements. SQLite still initialized under the content policy. Browser extension errors were separate from the application; no first-party CSP breakage was observed in these checks.

The portfolio StudyLab card now uses a fresh dashboard screenshot and describes programming, databases, seven SQL datasets and Hadoop. StudyLab’s header links back to the portfolio.
