-- StudyLab DATA6222: INNER JOIN and relationship cardinality
-- Environment: browser
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

SELECT s.StudentName, e.CourseID, e.Mark
FROM Students AS s
INNER JOIN Enrolments AS e ON e.StudentID=s.StudentID
ORDER BY s.StudentID, e.CourseID;
