# Five additional SQL demos

The SQL workspace now has seven datasets. The original College and Bookshop IDs remain unchanged.

| New dataset         | Parent records              | Fact records    | Practice focus                                         |
| ------------------- | --------------------------- | --------------- | ------------------------------------------------------ |
| Library             | 8 members, 12 titles        | 24 loans        | NULL returns, missing activity, borrower sequences     |
| Clinic Appointments | 8 patients, 4 clinicians    | 24 appointments | Scheduling joins, cancellations, NULL notes            |
| Payroll             | 4 departments, 12 employees | 24 payments     | Optional departments, payment totals, salary ranks     |
| Hotel Bookings      | 8 guests, 10 rooms          | 24 bookings     | Historical booked rates, revenue, running totals       |
| Delivery Logistics  | 8 customers, 5 drivers      | 24 shipments    | Optional assignments, pending deliveries, running fees |

All records are fictional. These are teaching schemas, not complete production systems. Clinic data contains appointment scheduling only, with no real medical information.

Each new dataset includes three worked queries and three automatically marked challenges. The grader uses both the initial data and additional edge records to reject hardcoded answers. There are now 52 SQL examples and 47 challenges overall. Setup scripts download in the chosen SQL Server, PostgreSQL or MySQL mode with explicit IDs. Browser execution uses SQLite and does not certify native behaviour. Saved drafts reopen for all seven dataset IDs.

Edit `dist/learn/js/database/sql/sql-demo-datasets.mjs` for the new schemas, seed records, examples, challenges and grader fixtures. Update row counts and tests whenever changing data.

## Native verification on LEFA\\SQLEXPRESS

Native execution is pending: the remote workspace cannot access the user's local SQL Server. In SSMS, connect to the intended instance and create/select a fresh disposable database named `StudyLabNativeValidation`. Review and run `dist/learn/downloads/databases/sqlserver-validation.sql`, then retain its PASS output or errors. The existing harness checks representative behaviours, not all examples.

For each new demo setup, use a separate empty disposable database, download its setup from the SQL workspace for Microsoft SQL Server, and run it in SSMS. Compare table counts against the table above and run its three worked queries. Do not run different demos into an existing production database. A successful browser test is separate evidence from a native SQL Server run.

## Verification

All 34 automated tests pass, including 141 model-answer checks across the three compatibility modes, new dataset counts, constraints and hardcoded-answer rejection. Browser tests verified all five datasets load through the worker, each activity table has 24 rows, one challenge per new dataset passes both grading fixtures, and a Hotel SQL draft survives refresh and reopens from Saved work with the correct dataset. Native SQL Server execution is still pending.
