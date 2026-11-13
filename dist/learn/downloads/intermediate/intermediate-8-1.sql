-- StudyLab DATA6222: Scripts, batches and variable scope
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

USE StudyLabPractice;
GO
DECLARE @MinimumAge INT;
SET @MinimumAge=21;
SELECT StudentID,StudentName,Age FROM dbo.Students WHERE Age>=@MinimumAge ORDER BY StudentID;
GO
