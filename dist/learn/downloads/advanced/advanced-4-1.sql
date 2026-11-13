-- SQL Server / SSMS; prerequisite: college setup.
DECLARE @City nvarchar(100) = N'Polokwane';
EXEC sys.sp_executesql
 N'SELECT StudentID, StudentName FROM dbo.Students WHERE City = @pCity;',
 N'@pCity nvarchar(100)', @pCity = @City;
-- Values are parameters, never concatenated into executable SQL.
