-- StudyLab DATA6222: Tools, SELECT and filtering
-- Environment: browser
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

SELECT StudentName, City, Age
FROM Students
WHERE (City = 'Polokwane' OR City = 'Pretoria') AND Age >= 21
ORDER BY City, StudentName;
