-- StudyLab DATA6222: Subqueries, EXISTS and OUTPUT
-- Environment: browser
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

SELECT StudentID,StudentName
FROM Students s
WHERE EXISTS (SELECT 1 FROM Enrolments e
 WHERE e.StudentID=s.StudentID AND e.Mark>=80)
ORDER BY StudentID;
