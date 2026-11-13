-- StudyLab DATA6222: Aggregates, DISTINCT and grouping
-- Environment: browser
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

SELECT CourseID, COUNT(*) AS Enrolments,
 AVG(CAST(Mark AS DECIMAL(10,2))) AS AverageMark
FROM Enrolments
WHERE Mark IS NOT NULL
GROUP BY CourseID
HAVING COUNT(*) >= 5
ORDER BY AverageMark DESC;
