# Advanced Database extension

Added an independent Advanced Database module to the selector and sidebar, including eight units/lessons, 24 quiz questions, 16 written tasks with hints and worked answers, eight downloadable examples, and browser-local progress tracking. Existing course IDs and saved work keys remain unchanged.

Topics: query optimisation, transactions and isolation, advanced SQL, database programming, BCNF/4NF, security, recovery, and distributed databases. Introduction and Intermediate are prerequisites. This is supplementary content without an institutional module code.

SQL Server examples are labelled for SSMS and a disposable database. Native execution is pending; browser SQLite compatibility does not certify SQL Server behaviour. Written tasks remain self-assessed. No Advanced exam or slide pack is claimed in this release.

Primary teaching references:

- https://learn.microsoft.com/en-us/sql/relational-databases/query-processing-architecture-guide
- https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide
- https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-deadlocks-guide
- https://learn.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql
- https://learn.microsoft.com/en-us/sql/relational-databases/backup-restore/backup-overview-sql-server

## Browser verification, 14 November 2026

Verified on the live site: all eight lesson pages and example links; quiz selections and all 24 checked answers reported correctly in Advanced progress; completion and quiz feedback retained after refresh; first and second written task drafts retained after refresh; hint and worked-answer unlock behaviour. Module switching between Intermediate and Advanced reached the correct course. All eight live example files were retrieved over HTTP and matched the repository bytes.

Fixed integration issues found during review: Advanced examples are now listed on the Downloads page, reset copy refers to all learning modules, and Advanced unit overviews no longer imply a prescribed textbook chapter. All 33 automated tests and formatting checks pass.

A browser download-event wait timed out, so no successful browser download-event capture is claimed. Link targets and deployed file contents were verified separately. No native SQL Server instance or client is available in this environment; SQL Server execution remains pending.

To validate locally: connect to the intended instance in SSMS, create a fresh disposable database named StudyLabNativeValidation, select it, then review and execute `dist/learn/downloads/databases/sqlserver-validation.sql`. Save its PASS output and any errors. This existing harness covers representative native behaviours, not every Advanced lesson or concurrency/recovery scenario. Never treat browser SQLite execution as SQL Server certification.

## Hadoop extension, 14 November 2026

Added Unit 9, Hadoop and Big Data, with three lessons: Hadoop architecture and HDFS; YARN and MapReduce processing; Hive, Spark and analytical design. The module now has nine units, eleven lessons, 33 quiz questions and 22 written tasks. Three labelled text downloads contain Hadoop shell commands, MapReduce teaching pseudocode and HiveQL respectively. Each lesson links to official Apache references and explains the separate runtime requirements.

All 34 automated tests and formatting checks pass. Browser verification confirmed the unit overview, all three lessons, reference and download links, all nine quiz checks, and quiz restoration after refresh. Hadoop/Hive native cluster execution is pending and is not simulated by the browser SQL engine. Existing lesson IDs and saved-work keys are unchanged.
