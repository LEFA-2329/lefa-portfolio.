-- StudyLab DATA6222: SQL Server system databases
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

SELECT name, database_id
FROM sys.databases
WHERE name IN ('master','model','msdb','tempdb')
ORDER BY name;
