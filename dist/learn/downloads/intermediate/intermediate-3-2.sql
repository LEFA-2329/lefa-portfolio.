-- StudyLab DATA6222: Outer joins, CROSS JOIN and self joins
-- Environment: browser
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

SELECT s.StudentID, s.StudentName, e.Mark
FROM Students s LEFT JOIN Enrolments e
 ON e.StudentID=s.StudentID AND e.Mark>=80
ORDER BY s.StudentID, e.EnrolmentID;
