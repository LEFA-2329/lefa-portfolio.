-- StudyLab DATA6222: IF, WHILE and CASE
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

DECLARE @n INT=1;
WHILE @n<=3
BEGIN
 IF @n=2 SELECT 'Middle' AS Label;
 ELSE SELECT 'Edge' AS Label;
 SET @n=@n+1;
END;
SELECT StudentID,Mark,CASE WHEN Mark IS NULL THEN 'Pending' WHEN Mark>=50 THEN 'Pass' ELSE 'Fail' END AS Result FROM Enrolments;
