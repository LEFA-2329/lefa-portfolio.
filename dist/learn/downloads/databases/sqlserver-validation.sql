-- StudyLab native SQL Server validation harness
-- Status: prepared and reviewed, NOT executed in the ChatGPT build environment.
-- In SSMS, create and select a disposable user database named StudyLabNativeValidation.
-- Do not run this file in production. The harness refuses other database contexts.
-- Expected: a list of PASS checks. All fixture objects are rolled back at the end.
SET NOCOUNT ON;
IF DB_NAME() <> 'StudyLabNativeValidation'
 THROW 50001,'Select the disposable StudyLabNativeValidation database first.',1;
IF @@TRANCOUNT <> 0
 THROW 50002,'Run this harness without an existing transaction.',1;
IF OBJECT_ID('dbo.StudyLabNativeStudents') IS NOT NULL
 OR OBJECT_ID('dbo.StudyLabNativeDepartments') IS NOT NULL
 OR OBJECT_ID('dbo.usp_StudyLabNativeCount') IS NOT NULL
 OR OBJECT_ID('dbo.StudyLabNativeAdults') IS NOT NULL
 THROW 50003,'Fixture names already exist. Use a fresh disposable database.',1;
DECLARE @OriginalXactAbort BIT=CASE WHEN (@@OPTIONS & 16384)=16384 THEN 1 ELSE 0 END;
DECLARE @Checks TABLE(TestName NVARCHAR(120),Result VARCHAR(8));
SET XACT_ABORT OFF; -- Expected constraint failures must leave the test transaction usable.
BEGIN TRY
 BEGIN TRANSACTION;
 CREATE TABLE dbo.StudyLabNativeDepartments(DepartmentID INT PRIMARY KEY,Name NVARCHAR(60) NOT NULL);
 CREATE TABLE dbo.StudyLabNativeStudents(
  StudentID INT PRIMARY KEY,StudentName NVARCHAR(60) NOT NULL,
  City VARCHAR(60) NOT NULL,Age INT NOT NULL CHECK(Age>=18),
  DepartmentID INT NULL REFERENCES dbo.StudyLabNativeDepartments(DepartmentID) ON DELETE SET NULL
 );
 INSERT INTO dbo.StudyLabNativeDepartments VALUES(1,N'IT');
 INSERT INTO dbo.StudyLabNativeStudents VALUES(1,N'Lebo','Polokwane',20,1),(2,N'Naledi','Pretoria',22,NULL);
 INSERT INTO @Checks VALUES(N'Table creation and initial inserts','PASS');
 BEGIN TRY
  INSERT INTO dbo.StudyLabNativeStudents VALUES(3,N'Invalid','Polokwane',17,NULL);
  THROW 50010,'Age CHECK failed to reject an invalid row.',1;
 END TRY
 BEGIN CATCH
  IF ERROR_NUMBER()<>547 THROW;
 END CATCH;
 INSERT INTO @Checks VALUES(N'CHECK constraint rejects an invalid age','PASS');
 BEGIN TRY
  INSERT INTO dbo.StudyLabNativeStudents VALUES(3,N'Orphan','Polokwane',20,999);
  THROW 50011,'Foreign key failed to reject an orphan.',1;
 END TRY
 BEGIN CATCH
  IF ERROR_NUMBER()<>547 THROW;
 END CATCH;
 INSERT INTO @Checks VALUES(N'Foreign key rejects an orphan reference','PASS');
 DECLARE @Changed TABLE(StudentID INT,OldAge INT,NewAge INT);
 UPDATE dbo.StudyLabNativeStudents SET Age=Age+1
 OUTPUT inserted.StudentID,deleted.Age,inserted.Age INTO @Changed
 WHERE StudentID=1;
 DECLARE @Affected INT=@@ROWCOUNT;
 IF @Affected<>1 OR NOT EXISTS(SELECT 1 FROM @Changed WHERE StudentID=1 AND OldAge=20 AND NewAge=21)
  THROW 50012,'OUTPUT or @@ROWCOUNT assertion failed.',1;
 INSERT INTO @Checks VALUES(N'UPDATE OUTPUT and immediate row count','PASS');
 SAVE TRANSACTION AgeTest;
 UPDATE dbo.StudyLabNativeStudents SET Age=40 WHERE StudentID=1;
 ROLLBACK TRANSACTION AgeTest;
 IF (SELECT Age FROM dbo.StudyLabNativeStudents WHERE StudentID=1)<>21
  THROW 50013,'Savepoint rollback did not restore the age.',1;
 INSERT INTO @Checks VALUES(N'Transaction savepoint rollback','PASS');
 CREATE INDEX IX_StudyLabNative_City ON dbo.StudyLabNativeStudents(City);
 DROP INDEX IX_StudyLabNative_City ON dbo.StudyLabNativeStudents;
 INSERT INTO @Checks VALUES(N'Native CREATE and DROP INDEX syntax','PASS');
 EXEC(N'CREATE VIEW dbo.StudyLabNativeAdults AS SELECT StudentID,StudentName,Age FROM dbo.StudyLabNativeStudents WHERE Age>=18 WITH CHECK OPTION;');
 DECLARE @ViewCount INT;
 EXEC sys.sp_executesql N'SELECT @N=COUNT(*) FROM dbo.StudyLabNativeAdults;',N'@N INT OUTPUT',@N=@ViewCount OUTPUT;
 IF @ViewCount<>2 THROW 50014,'View result assertion failed.',1;
 INSERT INTO @Checks VALUES(N'Native view creation and query','PASS');
 EXEC(N'CREATE PROCEDURE dbo.usp_StudyLabNativeCount @City VARCHAR(60)=''Polokwane'',@Total INT OUTPUT AS BEGIN SET NOCOUNT ON; SELECT @Total=COUNT(*) FROM dbo.StudyLabNativeStudents WHERE City=@City; RETURN 0; END;');
 DECLARE @Total INT,@Status INT;
 EXEC @Status=dbo.usp_StudyLabNativeCount @Total=@Total OUTPUT;
 IF @Total<>1 OR @Status<>0 THROW 50015,'Procedure default/OUTPUT/RETURN assertion failed.',1;
 EXEC @Status=dbo.usp_StudyLabNativeCount @City='Missing',@Total=@Total OUTPUT;
 IF @Total<>0 OR @Status<>0 THROW 50016,'Procedure no-match assertion failed.',1;
 INSERT INTO @Checks VALUES(N'Procedure defaults input OUTPUT and RETURN','PASS');
 BEGIN TRY
  DECLARE @Zero INT=0;
  SELECT 10/@Zero AS ExpectedFailure;
  THROW 50017,'Expected runtime error did not occur.',1;
 END TRY
 BEGIN CATCH
  IF ERROR_NUMBER()<>8134 THROW;
 END CATCH;
 INSERT INTO @Checks VALUES(N'TRY CATCH receives runtime divide-by-zero','PASS');
 DELETE FROM dbo.StudyLabNativeDepartments WHERE DepartmentID=1;
 IF (SELECT DepartmentID FROM dbo.StudyLabNativeStudents WHERE StudentID=1) IS NOT NULL
  THROW 50018,'SET NULL referential action assertion failed.',1;
 INSERT INTO @Checks VALUES(N'ON DELETE SET NULL preserves the child','PASS');
 ROLLBACK TRANSACTION;
 IF @OriginalXactAbort=1 SET XACT_ABORT ON;
 SELECT TestName,Result FROM @Checks;
 SELECT 'Fixture objects rolled back. Review every PASS before recording native verification.' AS Summary;
END TRY
BEGIN CATCH
 IF XACT_STATE()<>0 ROLLBACK TRANSACTION;
 IF @OriginalXactAbort=1 SET XACT_ABORT ON;
 THROW;
END CATCH;
