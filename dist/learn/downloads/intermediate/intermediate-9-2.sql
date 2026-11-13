-- StudyLab DATA6222: Input, OUTPUT, defaults and RETURN
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

CREATE PROCEDURE dbo.usp_StudyLabCountStudents
 @City VARCHAR(60)='Polokwane', @Total INT OUTPUT
AS
BEGIN
 SET NOCOUNT ON;
 SELECT @Total=COUNT(*) FROM dbo.Students WHERE City=@City;
 RETURN 0;
END;
GO
DECLARE @Count INT,@Status INT;
EXEC @Status=dbo.usp_StudyLabCountStudents @Total=@Count OUTPUT;
SELECT @Count AS Total,@Status AS Status;
GO
