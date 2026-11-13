-- StudyLab DATA6222: Procedure validation and transaction errors
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

CREATE PROCEDURE dbo.usp_StudyLabChangeAge @StudentID INT,@Age INT
AS
BEGIN
 SET NOCOUNT ON;
 SET XACT_ABORT ON;
 IF @@TRANCOUNT<>0 THROW 50001,'Call without an active transaction.',1;
 IF @Age IS NULL OR @Age<18 THROW 50002,'Age must be at least 18.',1;
 BEGIN TRY
  BEGIN TRANSACTION;
  UPDATE dbo.Students SET Age=@Age WHERE StudentID=@StudentID;
  IF @@ROWCOUNT=0 THROW 50003,'Student not found.',1;
  COMMIT TRANSACTION;
 END TRY
 BEGIN CATCH
  IF XACT_STATE()<>0 ROLLBACK TRANSACTION;
  THROW;
 END CATCH;
END;
GO
