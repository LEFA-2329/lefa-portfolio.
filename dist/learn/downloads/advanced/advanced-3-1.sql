-- SQL Server / SSMS; self-contained sample.
WITH Marks AS (
 SELECT * FROM (VALUES (1,80),(2,80),(3,70)) AS v(StudentID,Mark)
)
SELECT StudentID, Mark,
 ROW_NUMBER() OVER (ORDER BY Mark DESC, StudentID) AS RowNum,
 RANK() OVER (ORDER BY Mark DESC) AS Position,
 DENSE_RANK() OVER (ORDER BY Mark DESC) AS DensePosition
FROM Marks ORDER BY StudentID;
