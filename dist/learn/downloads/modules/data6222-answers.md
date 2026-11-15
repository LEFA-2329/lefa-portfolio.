# Database Intermediate . DATA6222 - worked answers

Compare your reasoning, not only the final result. Code fragments assume the schema and environment in each question. Test SQL Server, WPF and Docker examples in their native tools.

## Answer 1

SELECT s.StudentID, s.Name, e.CourseID
FROM Student AS s LEFT JOIN Enrolment AS e
ON e.StudentID = s.StudentID;
An unmatched student has NULL in CourseID.

## Answer 2

ALTER TABLE Enrolment ADD CONSTRAINT CK_Enrolment_Mark CHECK (Mark BETWEEN 0 AND 100);
CHECK alone permits NULL because the expression is unknown. Use NOT NULL as well when a mark is required.

## Answer 3

CREATE PROCEDURE dbo.GetStudent @StudentID int
AS
BEGIN
  SET NOCOUNT ON; -- Suppress row count messages
  SELECT StudentID, Name FROM dbo.Student WHERE StudentID = @StudentID;
END;
Execute separately: EXEC dbo.GetStudent @StudentID = 1;

## Answer 4

Both updates belong in one transaction. Roll back both on failure. Commit only when both succeed. Validate amounts and available balance, and handle concurrent updates.

## Answer 5

An index on a frequently filtered StudentID may reduce scanning. It uses storage and adds work to inserts, updates and deletes. Inspect the execution plan and realistic data before choosing it.

