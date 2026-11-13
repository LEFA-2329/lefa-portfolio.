-- StudyLab DATA6222: UNION and UNION ALL
-- Environment: browser
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

SELECT City FROM Students WHERE Age<22
UNION
SELECT City FROM Students WHERE Age>=22
ORDER BY City;
