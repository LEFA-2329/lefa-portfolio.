-- StudyLab DATA6222: Index creation, order and maintenance
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

CREATE NONCLUSTERED INDEX IX_Students_City_Age
ON Students(City ASC,Age DESC) INCLUDE(StudentName);
SELECT StudentName,Age FROM Students WHERE City='Polokwane' ORDER BY Age DESC;
DROP INDEX IX_Students_City_Age ON Students;
