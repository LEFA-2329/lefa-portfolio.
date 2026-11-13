-- StudyLab DATA6222: Create, execute, alter and drop procedures
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

CREATE PROCEDURE dbo.usp_StudyLabStudentsByCity @City VARCHAR(60)
AS
BEGIN
 SET NOCOUNT ON;
 SELECT StudentID,StudentName FROM dbo.Students WHERE City=@City ORDER BY StudentID;
END;
GO
EXEC dbo.usp_StudyLabStudentsByCity @City='Polokwane';
GO
