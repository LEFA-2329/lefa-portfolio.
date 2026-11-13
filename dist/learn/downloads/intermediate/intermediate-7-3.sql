-- StudyLab DATA6222: Views and update restrictions
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

CREATE VIEW dbo.PracticeAdultStudents AS
SELECT StudentID,StudentName,City,Age FROM dbo.Students WHERE Age>=18
WITH CHECK OPTION;
GO
SELECT * FROM dbo.PracticeAdultStudents;
GO
ALTER VIEW dbo.PracticeAdultStudents AS
SELECT StudentID,StudentName,City,Age FROM dbo.Students WHERE Age>=20
WITH CHECK OPTION;
GO
DROP VIEW dbo.PracticeAdultStudents;
