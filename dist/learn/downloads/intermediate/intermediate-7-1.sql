-- StudyLab DATA6222: Storage hierarchy, scans and seeks
-- Environment: browser
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

SELECT StudentID,StudentName FROM Students WHERE City='Polokwane';
-- In SSMS enable Include Actual Execution Plan before running.
-- Compare plans and logical reads on representative data, not only 20 rows.
