-- StudyLab DATA6222: Add, remove and review constraints
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

ALTER TABLE Students WITH CHECK ADD CONSTRAINT CK_Students_Adult CHECK(Age>=18);
SELECT name,is_disabled,is_not_trusted
FROM sys.check_constraints WHERE parent_object_id=OBJECT_ID('Students');
ALTER TABLE Students DROP CONSTRAINT CK_Students_Adult;
