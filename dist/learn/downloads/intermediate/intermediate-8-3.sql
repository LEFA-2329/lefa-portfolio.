-- StudyLab DATA6222: System functions and TRY CATCH
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

BEGIN TRY
 DECLARE @Zero INT=0;
 SELECT 10/@Zero AS Answer;
END TRY
BEGIN CATCH
 SELECT ERROR_NUMBER() AS ErrorNumber,ERROR_MESSAGE() AS ErrorMessage;
END CATCH;
SELECT @@DATEFIRST AS FirstDay;
