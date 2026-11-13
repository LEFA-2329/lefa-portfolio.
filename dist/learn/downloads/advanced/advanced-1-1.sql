-- SQL Server / SSMS; prerequisite: college setup.
SET STATISTICS IO ON;
SET STATISTICS TIME ON;
SELECT StudentID, StudentName FROM dbo.Students WHERE City = N'Polokwane';
SET STATISTICS TIME OFF;
SET STATISTICS IO OFF;
-- Inspect the actual execution plan in SSMS; do not infer speed from operator names alone.
