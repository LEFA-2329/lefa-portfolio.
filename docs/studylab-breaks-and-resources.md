# Study breaks and learning resources

Students can choose “Are you tired? Take a break” or “Helpful resources” in the sidebar or Settings → Learning. The portfolio link is in the footer and Settings instead of the header.

Settings now has Themes, Reading, Editor and Learning section buttons so students can reach each control without scrolling through 22 themes. Existing display preferences and storage keys are unchanged.

## Where to edit

- Layouts: `dist/learn/pages/study-break.html` and `helpful-resources.html`.
- Game and resource page behaviour: `dist/learn/js/shared/study-break-and-resources.mjs`.
- Resource links, providers, topic tags and suggestions: `dist/learn/js/shared/study-resource-catalog.mjs`.
- Appearance: `dist/learn/css/study-break-and-resources.css`.
- Navigation: `dist/learn/index.html` and `dist/learn/js/navigation-and-pages.mjs`.

The game shuffles six pairs, supports keyboard activation and has no timers, remote requests or score storage. A mismatch stays visible until another card is chosen or the student turns the cards over. Matched cards are marked unavailable. A new garden resets the game only.

The last visible learning route and title are held in memory for returning to study and suggesting resources. Reloading starts a fresh context. All links are curated HTTPS destinations with new-tab isolation. Third-party players are not embedded. Dialect notes distinguish SQL Server from other SQL examples. Review links periodically; the catalogue was researched in November 2026.

Run `npm run format`, `npm run build`, `npm test` and `npm run format:check` after editing HTML.

## Four more games

The break page offers Computing Word Search, Snake, Sliding Puzzle, Tic-tac-toe and the existing Garden Pairs. Layouts live in `pages/study-break.html` and `pages/refresh-games.html`. Edit browser controls in `js/shared/refresh-games.mjs`, and game rules or word lists in `js/shared/refresh-game-rules.mjs`. Styles are in `css/study-break-and-resources.css`.

Word Search places eight computing words horizontally or vertically in either direction. Choose endpoints with clicks, taps or keyboard activation. Sliding Puzzle starts from legal moves, so every board is solvable. Tic-tac-toe supports a local friend and a minimax computer opponent. Snake supports arrow/WASD keys within the focused playfield and direction buttons, with explicit start, pause and restart. It pauses when the document becomes hidden and disposes its timer when switching games or leaving the page. Game rounds are temporary and do not write learning progress.

Rules tests cover word placement, sliding-puzzle solvability, all human branches against the computer, and snake growth/collisions. Browser checks cover finishing Word Search, a Tic-tac-toe win, a legal sliding move and Snake start/steer/pause.
