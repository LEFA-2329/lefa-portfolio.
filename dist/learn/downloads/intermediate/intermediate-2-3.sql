-- StudyLab DATA6222: Safe data changes and system functions
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

BEGIN TRANSACTION;
SELECT * FROM Students WHERE StudentID = 1;
UPDATE Students SET Age = 19 WHERE StudentID = 1;
DECLARE @Changed INT = @@ROWCOUNT;
SELECT @Changed AS ChangedRows;
ROLLBACK TRANSACTION;
