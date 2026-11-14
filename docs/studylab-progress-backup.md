# Progress backup and restore

Open Settings > Your learning > Back up or restore progress, or use the sidebar Backup & restore link. The #backup route works across all modules. It is browser-only and adds no account, backend or automatic syncing.

progress-backup.mjs contains the portable format and storage operations. progress-backup-page.mjs owns file download/preview, conflict selectors and safety-copy confirmation. progress-backup.html is the editable page layout.

Version 1 exports only logiclab-work-v1:\* saved activities, studylab-completion-v1 and studylab-csharp-learning-v1. It folds recognised legacy completion lists into the modern format. studylab-display-preferences-v1 is optional. Other site storage, authentication data and module-selection preferences are not exported. SQL editor source can be saved, but in-memory SQL database contents and unsaved edits are not portable. Saved timed exams retain their deadlines; backups do not pause timers.

Merge unions completed lesson entries and readiness checks. C# quiz records keep the higher score when totals match; differing totals keep the current score. Conflicting activity records are chosen as a whole, so quiz answers and drafts remain consistent. Conflicting C# notes have their own choice. Current work is the default, and preview text is escaped and truncated for display. Replace uses the backup's learning records and preserves unrelated storage. Display settings only change when explicitly selected.

A safety download and explicit checkbox are required before the restore button is enabled. Files are validated before writes, with an 8 MB file limit, bounded records/nesting and rejection of unknown storage keys and prototype-pollution keys. The preview snapshot is checked before applying changes. Writes attempt rollback if storage fails, but browser storage has no true multi-record transaction; if recovery also fails, the UI instructs the student to use the downloaded safety copy. A successful restore reloads the app to discard stale in-memory lesson state.

Tests cover round trips, legacy migration, draft conflicts, completion/quiz merging, settings opt-in, empty replacement, malformed/oversized files, unsafe keys, stale previews, quota failures, recovery errors and unrelated-storage preservation.
