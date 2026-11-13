-- SQL Server / SSMS; self-contained rollback demonstration.
SET XACT_ABORT ON;
DECLARE @Before int = 10;
CREATE TABLE #Balance (ID int PRIMARY KEY, Amount int CHECK (Amount >= 0));
INSERT #Balance VALUES (1, @Before);
BEGIN TRY
  BEGIN TRANSACTION;
  UPDATE #Balance SET Amount = Amount - 20 WHERE ID = 1;
  COMMIT;
END TRY
BEGIN CATCH
  IF XACT_STATE() <> 0 ROLLBACK;
  SELECT ERROR_NUMBER() AS ErrorNumber;
END CATCH;
SELECT * FROM #Balance; -- Amount remains 10.
DROP TABLE #Balance;
