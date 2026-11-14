import { hadoopUnit, hadoopLessons } from './hadoop-lessons.mjs?v=38';
// Original extension material; no formal module code or prescribed outline is claimed.
export const advancedUnits = [
  {
    id: 201,
    number: 1,
    title: 'Query optimisation and execution plans',
    subtitle: 'Advanced Database · independent extension',
    chapter: '',
    sessions: 'Suggested study: two sessions',
    overview:
      'Compare elapsed time, CPU time and logical reads on representative data. Read estimated versus actual row counts to find cardinality errors. A scan can be appropriate when most rows are needed; an index seek is not automatically faster.',
    themes: ['Measure before changing', 'Index design and searchable predicates'],
    outcomes: [
      'Explain measure before changing.',
      'Apply index design and searchable predicates to a practical case.',
      'Evaluate a proposed solution and justify its trade-offs.',
    ],
    check:
      'Complete the worked case, quiz and two practical tasks. State assumptions and validate native examples in a disposable SQL Server environment.',
  },
  {
    id: 202,
    number: 2,
    title: 'Transactions, isolation and deadlocks',
    subtitle: 'Advanced Database · independent extension',
    chapter: '',
    sessions: 'Suggested study: two sessions',
    overview:
      'A transaction groups work that must succeed or fail together. READ UNCOMMITTED permits dirty reads. READ COMMITTED prevents dirty reads; SQL Server may use locks or statement-level row versions depending on READ_COMMITTED_SNAPSHOT. REPEATABLE READ retains protection for read rows but can permit phantoms. SERIALIZABLE also protects qualifying key ranges.',
    themes: ['Isolation and anomalies', 'Blocking, deadlocks and retries'],
    outcomes: [
      'Explain isolation and anomalies.',
      'Apply blocking, deadlocks and retries to a practical case.',
      'Evaluate a proposed solution and justify its trade-offs.',
    ],
    check:
      'Complete the worked case, quiz and two practical tasks. State assumptions and validate native examples in a disposable SQL Server environment.',
  },
  {
    id: 203,
    number: 3,
    title: 'Advanced SQL: CTEs and window functions',
    subtitle: 'Advanced Database · independent extension',
    chapter: '',
    sessions: 'Suggested study: two sessions',
    overview:
      'A CTE names a query expression for one following statement; it is not automatically a stored or materialised result. Recursive CTEs combine an anchor and recursive member, normally with UNION ALL. Define a stopping rule and diagnose cycles; MAXRECURSION is a safety limit, not a cycle repair.',
    themes: ['CTEs and recursion', 'Rank and aggregate without collapsing rows'],
    outcomes: [
      'Explain ctes and recursion.',
      'Apply rank and aggregate without collapsing rows to a practical case.',
      'Evaluate a proposed solution and justify its trade-offs.',
    ],
    check:
      'Complete the worked case, quiz and two practical tasks. State assumptions and validate native examples in a disposable SQL Server environment.',
  },
  {
    id: 204,
    number: 4,
    title: 'Database programming: triggers and dynamic SQL',
    subtitle: 'Advanced Database · independent extension',
    chapter: '',
    sessions: 'Suggested study: two sessions',
    overview:
      'A SQL Server DML trigger runs once per statement, not once per affected row. inserted and deleted can contain many rows. INSERT supplies inserted, DELETE supplies deleted, and UPDATE supplies both. Keep triggers short and design tests for zero, one and many rows.',
    themes: ['Program for sets', 'Separate data from executable text'],
    outcomes: [
      'Explain program for sets.',
      'Apply separate data from executable text to a practical case.',
      'Evaluate a proposed solution and justify its trade-offs.',
    ],
    check:
      'Complete the worked case, quiz and two practical tasks. State assumptions and validate native examples in a disposable SQL Server environment.',
  },
  {
    id: 205,
    number: 5,
    title: 'Advanced normalisation: BCNF and 4NF',
    subtitle: 'Advanced Database · independent extension',
    chapter: '',
    sessions: 'Suggested study: two sessions',
    overview:
      'A superkey determines all attributes; a candidate key is a minimal superkey. A prime attribute belongs to some candidate key. In 3NF, each nontrivial functional dependency X determines A has X a superkey or A prime. BCNF requires every nontrivial functional dependency determinant to be a superkey. A BCNF decomposition is lossless when constructed correctly but can lose dependency preservation.',
    themes: ['Candidate keys and BCNF', 'Independent multivalued facts'],
    outcomes: [
      'Explain candidate keys and bcnf.',
      'Apply independent multivalued facts to a practical case.',
      'Evaluate a proposed solution and justify its trade-offs.',
    ],
    check:
      'Complete the worked case, quiz and two practical tasks. State assumptions and validate native examples in a disposable SQL Server environment.',
  },
  {
    id: 206,
    number: 6,
    title: 'Database security and permissions',
    subtitle: 'Advanced Database · independent extension',
    chapter: '',
    sessions: 'Suggested study: two sessions',
    overview:
      'Authentication establishes identity; authorisation controls permitted operations. SQL Server distinguishes logins, database users, roles and permissions. Use roles for responsibilities and grant only required access. An application account should not normally be db_owner. Review ownership chaining and execution context when granting procedure access.',
    themes: ['Least privilege and identities', 'Protect data throughout its lifecycle'],
    outcomes: [
      'Explain least privilege and identities.',
      'Apply protect data throughout its lifecycle to a practical case.',
      'Evaluate a proposed solution and justify its trade-offs.',
    ],
    check:
      'Complete the worked case, quiz and two practical tasks. State assumptions and validate native examples in a disposable SQL Server environment.',
  },
  {
    id: 207,
    number: 7,
    title: 'Backup, restore and recovery planning',
    subtitle: 'Advanced Database · independent extension',
    chapter: '',
    sessions: 'Suggested study: two sessions',
    overview:
      'RPO is the acceptable amount of lost data measured in time; RTO is the acceptable restoration duration. Full backups capture a recoverable database baseline. Differential backups capture changes since their differential base. Under FULL recovery, a valid log backup chain supports point-in-time recovery; selecting FULL alone does not establish a working backup strategy.',
    themes: [
      'Recovery objectives and backup types',
      'Restore drills prove recoverability',
    ],
    outcomes: [
      'Explain recovery objectives and backup types.',
      'Apply restore drills prove recoverability to a practical case.',
      'Evaluate a proposed solution and justify its trade-offs.',
    ],
    check:
      'Complete the worked case, quiz and two practical tasks. State assumptions and validate native examples in a disposable SQL Server environment.',
  },
  {
    id: 208,
    number: 8,
    title: 'Distributed databases, partitioning and NoSQL',
    subtitle: 'Advanced Database · independent extension',
    chapter: '',
    sessions: 'Suggested study: two sessions',
    overview:
      'Replication copies data; partitioning divides data. SQL Server table partitioning within one database is not automatically sharding across servers. Sharding introduces routing, cross-shard queries and transaction complexity. Replicas may lag, so decide which reads require the authoritative writer.',
    themes: [
      'Choose distribution for a reason',
      'Model around access and consistency needs',
    ],
    outcomes: [
      'Explain choose distribution for a reason.',
      'Apply model around access and consistency needs to a practical case.',
      'Evaluate a proposed solution and justify its trade-offs.',
    ],
    check:
      'Complete the worked case, quiz and two practical tasks. State assumptions and validate native examples in a disposable SQL Server environment.',
  },
];
export const advancedLessons = [
  {
    id: 'advanced-1-1',
    unit: 201,
    title: 'Query optimisation and execution plans',
    sections: [
      {
        heading: 'Measure before changing',
        text: 'Compare elapsed time, CPU time and logical reads on representative data. Read estimated versus actual row counts to find cardinality errors. A scan can be appropriate when most rows are needed; an index seek is not automatically faster.',
      },
      {
        heading: 'Index design and searchable predicates',
        text: 'An index on (City, StudentID) can support a City equality filter and StudentID ordering. INCLUDE columns can cover output without adding them to the key. Extra indexes consume storage and increase write costs. Avoid wrapping a filtered indexed column in a function when an equivalent range predicate is available.',
      },
      {
        heading: 'Environment and prerequisites',
        text: 'Complete Introduction and Intermediate first. SQL Server examples require SSMS and a disposable user database. Scripts are reviewed teaching examples; native execution has not been verified here. Design notation is not executable SQL.',
      },
    ],
    example: {
      title: 'A slow city lookup',
      problem:
        'A large Students table is frequently filtered by City and returns StudentID and StudentName. What would you measure and test?',
      solution:
        'Capture an actual plan and STATISTICS IO/TIME first. Test an index beginning with City and covering StudentName. Compare logical reads and write overhead on representative data; keep it only if the workload benefits.',
    },
    sampleCode:
      "-- SQL Server / SSMS; prerequisite: college setup.\nSET STATISTICS IO ON;\nSET STATISTICS TIME ON;\nSELECT StudentID, StudentName FROM dbo.Students WHERE City = N'Polokwane';\nSET STATISTICS TIME OFF;\nSET STATISTICS IO OFF;\n-- Inspect the actual execution plan in SSMS; do not infer speed from operator names alone.",
    environment: 'native',
    download: 'advanced-1-1.sql',
    downloadFolder: 'advanced',
    quizzes: [
      {
        question:
          'An actual plan estimates 10 rows but reads 200000. What should you investigate first?',
        options: [
          'Only the button colour',
          'Remove all primary keys',
          'Statistics and predicate selectivity',
        ],
        answer: 2,
        explanation:
          'Large estimation errors can change join and access choices. Inspect statistics and data distribution before choosing a fix.',
      },
      {
        question:
          'Which predicate is generally easier to support with an index on OrderDate?',
        options: [
          "CONVERT(varchar, OrderDate) LIKE '2026%'",
          "OrderDate >= '20260101' AND OrderDate < '20270101'",
          'YEAR(OrderDate) = 2026',
        ],
        answer: 1,
        explanation:
          'A direct date range avoids applying a function to every indexed value.',
      },
      {
        question: 'Why can adding every possible index hurt?',
        options: [
          'Writes must maintain indexes and storage grows',
          'Indexes disable SELECT',
          'Every index stores the same execution plan',
        ],
        answer: 0,
        explanation:
          'Index selection balances read benefits against maintenance and space.',
      },
    ],
    quizRevision: 'advanced-1',
    task: {
      title: 'Design an index experiment',
      prompt:
        'A report filters Orders by CustomerID and sorts by OrderDate. Propose a candidate index and a fair before/after test.',
      hint: 'Think about equality then ordering.',
      solution:
        'Test (CustomerID, OrderDate), possibly INCLUDE Total. Compare actual plans, logical reads and timings on representative parameters and include insert/update cost. Do not claim an index guarantees a seek.',
      revision: 'advanced-1',
    },
    tasks: [
      {
        title: 'Design an index experiment',
        prompt:
          'A report filters Orders by CustomerID and sorts by OrderDate. Propose a candidate index and a fair before/after test.',
        hint: 'Think about equality then ordering.',
        solution:
          'Test (CustomerID, OrderDate), possibly INCLUDE Total. Compare actual plans, logical reads and timings on representative parameters and include insert/update cost. Do not claim an index guarantees a seek.',
        revision: 'advanced-1',
      },
      {
        title: 'Repair a date filter',
        prompt:
          'Rewrite YEAR(OrderDate)=2026 as a searchable range and explain why a scan may still be reasonable.',
        hint: 'Use an inclusive lower and exclusive upper bound.',
        solution:
          "WHERE OrderDate >= '20260101' AND OrderDate < '20270101'. A scan may still be cheaper if most rows qualify or the index is not covering.",
        revision: 'advanced-1',
      },
    ],
  },
  {
    id: 'advanced-2-1',
    unit: 202,
    title: 'Transactions, isolation and deadlocks',
    sections: [
      {
        heading: 'Isolation and anomalies',
        text: 'A transaction groups work that must succeed or fail together. READ UNCOMMITTED permits dirty reads. READ COMMITTED prevents dirty reads; SQL Server may use locks or statement-level row versions depending on READ_COMMITTED_SNAPSHOT. REPEATABLE READ retains protection for read rows but can permit phantoms. SERIALIZABLE also protects qualifying key ranges.',
      },
      {
        heading: 'Blocking, deadlocks and retries',
        text: 'Blocking is waiting for a resource; a deadlock is a cycle of incompatible waits. SQL Server selects a victim and rolls its transaction back. Keep transactions short, access objects in a consistent order and retry the entire transaction after error 1205 with bounded backoff. SNAPSHOT uses a transaction-level view and can raise update conflicts; it is not a universal cure.',
      },
      {
        heading: 'Environment and prerequisites',
        text: 'Complete Introduction and Intermediate first. SQL Server examples require SSMS and a disposable user database. Scripts are reviewed teaching examples; native execution has not been verified here. Design notation is not executable SQL.',
      },
    ],
    example: {
      title: 'Two staff update accounts',
      problem:
        'Transaction A locks account 1 then requests 2; B locks 2 then requests 1. Diagnose the failure.',
      solution:
        'This is a deadlock cycle. Use a consistent account ordering and short transactions, log the deadlock graph, and safely retry the victim transaction. Retrying only its final statement may omit rolled-back work.',
    },
    sampleCode:
      '-- SQL Server / SSMS; self-contained rollback demonstration.\nSET XACT_ABORT ON;\nDECLARE @Before int = 10;\nCREATE TABLE #Balance (ID int PRIMARY KEY, Amount int CHECK (Amount >= 0));\nINSERT #Balance VALUES (1, @Before);\nBEGIN TRY\n  BEGIN TRANSACTION;\n  UPDATE #Balance SET Amount = Amount - 20 WHERE ID = 1;\n  COMMIT;\nEND TRY\nBEGIN CATCH\n  IF XACT_STATE() <> 0 ROLLBACK;\n  SELECT ERROR_NUMBER() AS ErrorNumber;\nEND CATCH;\nSELECT * FROM #Balance; -- Amount remains 10.\nDROP TABLE #Balance;',
    environment: 'native',
    download: 'advanced-2-1.sql',
    downloadFolder: 'advanced',
    quizzes: [
      {
        question:
          'A report reads an uncommitted fee change that is later rolled back. What happened?',
        options: ['Deadlock victim retry', 'Dirty read', 'Phantom-free snapshot'],
        answer: 1,
        explanation: 'READ UNCOMMITTED can expose changes that never commit.',
      },
      {
        question: 'Which pattern reduces a common source of deadlocks?',
        options: [
          'Update shared objects in a consistent order',
          'Hold transactions open during user input',
          'Always use NOLOCK',
        ],
        answer: 0,
        explanation:
          'Consistent ordering helps avoid cycles; it cannot eliminate every deadlock.',
      },
      {
        question: 'What should a safe deadlock retry repeat?',
        options: [
          'Only COMMIT',
          'Only its final SELECT',
          'The entire rolled-back transaction',
        ],
        answer: 2,
        explanation:
          'The victim transaction is rolled back, so retry its complete logical operation with bounded retries.',
      },
    ],
    quizRevision: 'advanced-1',
    task: {
      title: 'Draw a wait cycle',
      prompt:
        'Session A holds row 10 and wants 20. Session B holds 20 and wants 10. Explain blocking versus deadlock and propose two changes.',
      hint: 'Identify both edges in the wait graph.',
      solution:
        'A waits on B and B waits on A, forming a cycle. Access rows in the same order and shorten transactions. Handle victim error 1205 with bounded whole-transaction retry.',
      revision: 'advanced-1',
    },
    tasks: [
      {
        title: 'Draw a wait cycle',
        prompt:
          'Session A holds row 10 and wants 20. Session B holds 20 and wants 10. Explain blocking versus deadlock and propose two changes.',
        hint: 'Identify both edges in the wait graph.',
        solution:
          'A waits on B and B waits on A, forming a cycle. Access rows in the same order and shorten transactions. Handle victim error 1205 with bounded whole-transaction retry.',
        revision: 'advanced-1',
      },
      {
        title: 'Choose report isolation',
        prompt:
          'A report must not read uncommitted rows. Compare READ COMMITTED with SNAPSHOT for consistency across several statements.',
        hint: 'Distinguish statement and transaction views.',
        solution:
          'READ COMMITTED prevents dirty reads but successive statements can see later commits; RCSI gives each statement a committed snapshot. SNAPSHOT provides a transaction-level view when enabled, with version storage costs and update conflict handling.',
        revision: 'advanced-1',
      },
    ],
  },
  {
    id: 'advanced-3-1',
    unit: 203,
    title: 'Advanced SQL: CTEs and window functions',
    sections: [
      {
        heading: 'CTEs and recursion',
        text: 'A CTE names a query expression for one following statement; it is not automatically a stored or materialised result. Recursive CTEs combine an anchor and recursive member, normally with UNION ALL. Define a stopping rule and diagnose cycles; MAXRECURSION is a safety limit, not a cycle repair.',
      },
      {
        heading: 'Rank and aggregate without collapsing rows',
        text: 'GROUP BY collapses groups. Window functions retain detail rows. PARTITION BY restarts calculations per group; ORDER BY defines sequence. Use a deterministic tie breaker with ROW_NUMBER. For running totals, explicitly use ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW when row-by-row accumulation is intended.',
      },
      {
        heading: 'Environment and prerequisites',
        text: 'Complete Introduction and Intermediate first. SQL Server examples require SSMS and a disposable user database. Scripts are reviewed teaching examples; native execution has not been verified here. Design notation is not executable SQL.',
      },
    ],
    example: {
      title: 'Rank assessment marks',
      problem:
        'For one course, marks are 80, 80 and 70. Compare ROW_NUMBER, RANK and DENSE_RANK.',
      solution:
        'RANK gives 1,1,3 and DENSE_RANK gives 1,1,2. ROW_NUMBER gives distinct 1,2,3; StudentID breaks ties deterministically when ordered after Mark DESC.',
    },
    sampleCode:
      '-- SQL Server / SSMS; self-contained sample.\nWITH Marks AS (\n SELECT * FROM (VALUES (1,80),(2,80),(3,70)) AS v(StudentID,Mark)\n)\nSELECT StudentID, Mark,\n ROW_NUMBER() OVER (ORDER BY Mark DESC, StudentID) AS RowNum,\n RANK() OVER (ORDER BY Mark DESC) AS Position,\n DENSE_RANK() OVER (ORDER BY Mark DESC) AS DensePosition\nFROM Marks ORDER BY StudentID;',
    environment: 'native',
    download: 'advanced-3-1.sql',
    downloadFolder: 'advanced',
    quizzes: [
      {
        question: 'Marks are 90,90,70. What does RANK ordered by mark descending return?',
        options: ['1,1,3', '1,2,3', '1,1,2'],
        answer: 0,
        explanation: 'Tied rows share rank and leave a gap.',
      },
      {
        question:
          'Which operation preserves each sale row while adding its customer total?',
        options: [
          'GROUP BY CustomerID alone',
          'SELECT DISTINCT CustomerID',
          'SUM(Amount) OVER (PARTITION BY CustomerID)',
        ],
        answer: 2,
        explanation:
          'A window aggregate adds a group statistic without collapsing detail.',
      },
      {
        question:
          'A recursive employee CTE never terminates because managers form a cycle. What is the best repair?',
        options: [
          'Remove the anchor',
          'Detect or prevent cycles and define termination',
          'Set MAXRECURSION 0 immediately',
        ],
        answer: 1,
        explanation:
          'Unlimited recursion hides the underlying data or traversal problem.',
      },
    ],
    quizRevision: 'advanced-1',
    task: {
      title: 'Write a running total',
      prompt:
        'Using Sales(SaleID, SaleDate, Amount), write a deterministic running total ordered by date and sale ID.',
      hint: 'Use an explicit ROWS frame.',
      solution:
        'SELECT SaleID, SaleDate, Amount, SUM(Amount) OVER (ORDER BY SaleDate, SaleID ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RunningTotal FROM Sales ORDER BY SaleDate, SaleID;',
      revision: 'advanced-1',
    },
    tasks: [
      {
        title: 'Write a running total',
        prompt:
          'Using Sales(SaleID, SaleDate, Amount), write a deterministic running total ordered by date and sale ID.',
        hint: 'Use an explicit ROWS frame.',
        solution:
          'SELECT SaleID, SaleDate, Amount, SUM(Amount) OVER (ORDER BY SaleDate, SaleID ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RunningTotal FROM Sales ORDER BY SaleDate, SaleID;',
        revision: 'advanced-1',
      },
      {
        title: 'Design a hierarchy traversal',
        prompt:
          'Describe the anchor, recursive step and safeguards for Employees(EmployeeID, ManagerID).',
        hint: 'Start with roots and join children.',
        solution:
          'Anchor on ManagerID IS NULL. Join each child ManagerID to the prior EmployeeID with UNION ALL. Track depth and visited IDs or enforce acyclic relationships; use a finite MAXRECURSION limit during testing. Disconnected cycles need separate validation because roots cannot reach them.',
        revision: 'advanced-1',
      },
    ],
  },
  {
    id: 'advanced-4-1',
    unit: 204,
    title: 'Database programming: triggers and dynamic SQL',
    sections: [
      {
        heading: 'Program for sets',
        text: 'A SQL Server DML trigger runs once per statement, not once per affected row. inserted and deleted can contain many rows. INSERT supplies inserted, DELETE supplies deleted, and UPDATE supplies both. Keep triggers short and design tests for zero, one and many rows.',
      },
      {
        heading: 'Separate data from executable text',
        text: 'Parameterise values with sp_executesql. Parameters cannot replace object identifiers: validate identifiers against an allowlist and delimit with QUOTENAME. Stored procedures are not automatically safe when they concatenate untrusted text. Prefer explicit procedures for business operations; triggers are useful for rules or auditing that must follow all write paths.',
      },
      {
        heading: 'Environment and prerequisites',
        text: 'Complete Introduction and Intermediate first. SQL Server examples require SSMS and a disposable user database. Scripts are reviewed teaching examples; native execution has not been verified here. Design notation is not executable SQL.',
      },
    ],
    example: {
      title: 'An audit misses students',
      problem:
        'A trigger assigns a scalar variable from inserted during a 30-row update. Explain the defect.',
      solution:
        'The scalar assignment captures only one value. Write INSERT Audit(...) SELECT ... FROM inserted, joining deleted by the stable key when before and after values are needed. Test bulk updates and rollback behaviour.',
    },
    sampleCode:
      "-- SQL Server / SSMS; prerequisite: college setup.\nDECLARE @City nvarchar(100) = N'Polokwane';\nEXEC sys.sp_executesql\n N'SELECT StudentID, StudentName FROM dbo.Students WHERE City = @pCity;',\n N'@pCity nvarchar(100)', @pCity = @City;\n-- Values are parameters, never concatenated into executable SQL.",
    environment: 'native',
    download: 'advanced-4-1.sql',
    downloadFolder: 'advanced',
    quizzes: [
      {
        question: 'An UPDATE affects 25 rows. How often does its DML trigger fire?',
        options: ['Once per row', 'Only when called by EXEC', 'Once for the statement'],
        answer: 2,
        explanation:
          'The trigger must process all affected rows from inserted/deleted as sets.',
      },
      {
        question: 'Which input can be bound through a SQL value parameter?',
        options: [
          'A column identifier in ORDER BY',
          'A City filter value',
          'A table name in FROM',
        ],
        answer: 1,
        explanation: 'Identifiers require separate validation and safe delimiting.',
      },
      {
        question:
          'Does wrapping concatenated input in a stored procedure prevent injection?',
        options: [
          'No, unsafe dynamic SQL remains vulnerable',
          'Yes, all procedures are safe',
          'Only if the procedure is longer',
        ],
        answer: 0,
        explanation: 'The execution container does not make concatenated input safe.',
      },
    ],
    quizRevision: 'advanced-1',
    task: {
      title: 'Repair a trigger design',
      prompt:
        'An audit trigger uses SELECT @ID=StudentID FROM inserted. Describe a correct replacement and three tests.',
      hint: 'Use INSERT SELECT.',
      solution:
        'Insert one audit row per inserted row; join deleted for old values on a stable key. Test one-row, multi-row and zero-row updates, and verify audit rows roll back with the original transaction.',
      revision: 'advanced-1',
    },
    tasks: [
      {
        title: 'Repair a trigger design',
        prompt:
          'An audit trigger uses SELECT @ID=StudentID FROM inserted. Describe a correct replacement and three tests.',
        hint: 'Use INSERT SELECT.',
        solution:
          'Insert one audit row per inserted row; join deleted for old values on a stable key. Test one-row, multi-row and zero-row updates, and verify audit rows roll back with the original transaction.',
        revision: 'advanced-1',
      },
      {
        title: 'Secure dynamic ordering',
        prompt:
          'A page accepts a sort column and a search value. Design safe dynamic SQL.',
        hint: 'Identifiers and values need different treatment.',
        solution:
          'Allowlist permitted sort columns and ASC/DESC tokens. Use QUOTENAME for an approved identifier and bind the search value via sp_executesql. Reject unexpected tokens and grant only necessary execution rights.',
        revision: 'advanced-1',
      },
    ],
  },
  {
    id: 'advanced-5-1',
    unit: 205,
    title: 'Advanced normalisation: BCNF and 4NF',
    sections: [
      {
        heading: 'Candidate keys and BCNF',
        text: 'A superkey determines all attributes; a candidate key is a minimal superkey. A prime attribute belongs to some candidate key. In 3NF, each nontrivial functional dependency X determines A has X a superkey or A prime. BCNF requires every nontrivial functional dependency determinant to be a superkey. A BCNF decomposition is lossless when constructed correctly but can lose dependency preservation.',
      },
      {
        heading: 'Independent multivalued facts',
        text: '4NF addresses nontrivial multivalued dependencies whose determinant is not a superkey. If a student has independent sets of hobbies and languages, storing every combination duplicates facts. Split StudentHobby and StudentLanguage only when independence is a real business rule; correlated combinations must be preserved.',
      },
      {
        heading: 'Environment and prerequisites',
        text: 'Complete Introduction and Intermediate first. SQL Server examples require SSMS and a disposable user database. Scripts are reviewed teaching examples; native execution has not been verified here. Design notation is not executable SQL.',
      },
    ],
    example: {
      title: 'Teaching allocation',
      problem:
        'R(Student, Course, Tutor) has (Student,Course) determining Tutor and Tutor determining Course. Find keys and explain the BCNF issue.',
      solution:
        'Candidate keys are (Student,Course) and (Student,Tutor). Tutor is not a superkey, so Tutor determines Course violates BCNF; Course is prime, so the dependency meets 3NF. Split TutorCourse(Tutor,Course) and StudentTutor(Student,Tutor). The split is lossless, but the original Student,Course determines Tutor rule needs cross-table enforcement.',
    },
    sampleCode:
      'R(Student, Course, Tutor)\nFD1: (Student, Course) determines Tutor\nFD2: Tutor determines Course\nCandidate keys: (Student, Course); (Student, Tutor)\nBCNF: TutorCourse(Tutor PK, Course)\n      StudentTutor(Student PK-part, Tutor PK-part/FK)\nCheck dependency preservation separately from lossless reconstruction.',
    environment: 'design',
    download: 'advanced-5-1.txt',
    downloadFolder: 'advanced',
    quizzes: [
      {
        question:
          'Why does Tutor determining Course violate BCNF in the worked relation?',
        options: [
          'Every composite key violates BCNF',
          'Tutor is not a superkey',
          'Course has text values',
        ],
        answer: 1,
        explanation:
          'BCNF tests the determinant of each nontrivial functional dependency.',
      },
      {
        question: 'When may StudentHobbyLanguage be split into two 4NF relations?',
        options: [
          'When hobbies and languages vary independently per student',
          'Whenever three columns exist',
          'Only when the key has one column',
        ],
        answer: 0,
        explanation:
          'The independent multivalued dependency must follow the business rules.',
      },
      {
        question: 'Does a lossless decomposition guarantee dependency preservation?',
        options: [
          'Yes, always',
          'Only with integer keys',
          'No, these are separate properties',
        ],
        answer: 2,
        explanation:
          'A lossless join recovers rows, while some rules may still need a join to enforce.',
      },
    ],
    quizRevision: 'advanced-1',
    task: {
      title: 'Calculate closures',
      prompt:
        'For R(A,B,C) with AB determining C and C determining B, identify candidate keys and a BCNF violation.',
      hint: 'Compute AB+, AC+ and C+.',
      solution:
        'AB+ and AC+ are ABC, so AB and AC are candidate keys. C+ is BC, so C is not a superkey and C determines B violates BCNF. Split CB and AC; intersection C determines CB, giving a lossless split. AB determines C is not preserved locally.',
      revision: 'advanced-1',
    },
    tasks: [
      {
        title: 'Calculate closures',
        prompt:
          'For R(A,B,C) with AB determining C and C determining B, identify candidate keys and a BCNF violation.',
        hint: 'Compute AB+, AC+ and C+.',
        solution:
          'AB+ and AC+ are ABC, so AB and AC are candidate keys. C+ is BC, so C is not a superkey and C determines B violates BCNF. Split CB and AC; intersection C determines CB, giving a lossless split. AB determines C is not preserved locally.',
        revision: 'advanced-1',
      },
      {
        title: 'Check independence before splitting',
        prompt:
          'A student studies French only for chess activities and English only for debate. Can you assume independent hobbies and languages?',
        hint: 'Would recombining create invented combinations?',
        solution:
          'No. Splitting loses the pairing and the join invents French/debate and English/chess combinations. A 4NF decomposition based on independence needs an explicit business rule and lossless reconstruction.',
        revision: 'advanced-1',
      },
    ],
  },
  {
    id: 'advanced-6-1',
    unit: 206,
    title: 'Database security and permissions',
    sections: [
      {
        heading: 'Least privilege and identities',
        text: 'Authentication establishes identity; authorisation controls permitted operations. SQL Server distinguishes logins, database users, roles and permissions. Use roles for responsibilities and grant only required access. An application account should not normally be db_owner. Review ownership chaining and execution context when granting procedure access.',
      },
      {
        heading: 'Protect data throughout its lifecycle',
        text: 'Parameterisation reduces injection risk, but does not replace authorisation. Protect transport, backups and secrets as well as stored data. Encryption at rest does not prevent an authorised user from selecting plaintext. Keep audit records useful, restricted and free of unnecessary sensitive values.',
      },
      {
        heading: 'Environment and prerequisites',
        text: 'Complete Introduction and Intermediate first. SQL Server examples require SSMS and a disposable user database. Scripts are reviewed teaching examples; native execution has not been verified here. Design notation is not executable SQL.',
      },
    ],
    example: {
      title: 'A reporting service has db_owner',
      problem:
        'The service only needs student counts by city. Propose a narrower access design.',
      solution:
        'Expose an approved aggregate view or procedure, grant only required SELECT or EXECUTE to a reporting role and add the service user to that role. Test both permitted reports and denied writes; review inference risk for small groups.',
    },
    sampleCode:
      '-- SQL Server / SSMS; conceptual permission template.\n-- Requires an existing approved view and database user; replace placeholders.\n-- CREATE ROLE ReportingReader;\n-- GRANT SELECT ON OBJECT::dbo.ApprovedReport TO ReportingReader;\n-- ALTER ROLE ReportingReader ADD MEMBER ReportServiceUser;\n-- Test with the actual service identity; do not grant db_owner for convenience.',
    environment: 'native',
    download: 'advanced-6-1.sql',
    downloadFolder: 'advanced',
    quizzes: [
      {
        question:
          'A reporting account only reads one approved view. Which grant is most appropriate?',
        options: [
          'SELECT on that view through a reporting role',
          'db_owner',
          'CONTROL SERVER',
        ],
        answer: 0,
        explanation: 'A narrow grant supports the actual responsibility.',
      },
      {
        question: 'What does encryption at rest fail to stop by itself?',
        options: [
          'Offline access to encrypted files without keys',
          'Storage media theft without keys',
          'An authorised SELECT returning readable data',
        ],
        answer: 2,
        explanation: 'Access control still governs who may read decrypted values.',
      },
      {
        question: 'Which is an authorisation check?',
        options: [
          'Whether a TLS certificate is valid',
          'Whether this user may update marks',
          'Whether a password matches',
        ],
        answer: 1,
        explanation:
          'Authorisation decides permitted actions after identity is established.',
      },
    ],
    quizRevision: 'advanced-1',
    task: {
      title: 'Design college roles',
      prompt:
        'Define permissions for a lecturer, reporting service and database operator. Include one denied operation per role.',
      hint: 'Separate teaching, reporting and administration.',
      solution:
        'Lecturers execute approved mark-update procedures only for assigned classes; deny role management. Reporting service reads approved aggregates; deny raw mark updates. Operators follow defined backup/restore duties; avoid unrestricted application data access where feasible. Test each identity and review elevated operations.',
      revision: 'advanced-1',
    },
    tasks: [
      {
        title: 'Design college roles',
        prompt:
          'Define permissions for a lecturer, reporting service and database operator. Include one denied operation per role.',
        hint: 'Separate teaching, reporting and administration.',
        solution:
          'Lecturers execute approved mark-update procedures only for assigned classes; deny role management. Reporting service reads approved aggregates; deny raw mark updates. Operators follow defined backup/restore duties; avoid unrestricted application data access where feasible. Test each identity and review elevated operations.',
        revision: 'advanced-1',
      },
      {
        title: 'Review an export incident',
        prompt:
          'A staff member exports student data through an authorised account. Explain why disk encryption did not prevent it and propose controls.',
        hint: 'Consider access scope and auditing.',
        solution:
          'Disk encryption protects files at rest, while authorised queries return decrypted data. Reduce accessible columns/rows, control exports, log sensitive access, review retention and revoke excessive permissions. Do not put secrets into audit logs.',
        revision: 'advanced-1',
      },
    ],
  },
  {
    id: 'advanced-7-1',
    unit: 207,
    title: 'Backup, restore and recovery planning',
    sections: [
      {
        heading: 'Recovery objectives and backup types',
        text: 'RPO is the acceptable amount of lost data measured in time; RTO is the acceptable restoration duration. Full backups capture a recoverable database baseline. Differential backups capture changes since their differential base. Under FULL recovery, a valid log backup chain supports point-in-time recovery; selecting FULL alone does not establish a working backup strategy.',
      },
      {
        heading: 'Restore drills prove recoverability',
        text: 'A successful backup job is not a tested restore. Restore to an isolated target, validate data and application behaviour and record elapsed time. Protect backup copies and required encryption certificates/keys separately. SIMPLE recovery does not support transaction log backups or point-in-time recovery through a log chain.',
      },
      {
        heading: 'Environment and prerequisites',
        text: 'Complete Introduction and Intermediate first. SQL Server examples require SSMS and a disposable user database. Scripts are reviewed teaching examples; native execution has not been verified here. Design notation is not executable SQL.',
      },
    ],
    example: {
      title: 'Restore to 10:14 before a mistake',
      problem:
        'A full backup is from midnight, a differential from 08:00 and log backups every five minutes. A bad change commits at 10:15. Describe recovery.',
      solution:
        'Restore the matching full, then its compatible differential with NORECOVERY; restore the required contiguous log backups in order and use STOPAT before the bad commit in the log containing that time, then recover. Preserve the tail log if needed and possible. Validate time interpretation, chain and data on an isolated target.',
    },
    sampleCode:
      '-- Planning exercise, not an executable restore script.\nTarget RPO: 5 minutes; target RTO: 30 minutes.\nRestore sequence: full baseline, compatible differential, continuous required logs.\nUse NORECOVERY until the final restore; use STOPAT for a chosen recoverable point.\nValidate chain, encryption keys, target paths and application checks in an isolated drill.',
    environment: 'design',
    download: 'advanced-7-1.txt',
    downloadFolder: 'advanced',
    quizzes: [
      {
        question:
          'Which objective means at most five minutes of committed data may be lost?',
        options: ['RTO', 'CPU time', 'RPO'],
        answer: 2,
        explanation: 'RPO measures tolerated data loss; RTO measures tolerated downtime.',
      },
      {
        question:
          'Can SIMPLE recovery provide point-in-time restore through log backups?',
        options: [
          'Yes, every five minutes automatically',
          'No',
          'Yes, without any backups',
        ],
        answer: 1,
        explanation:
          'SIMPLE does not support transaction log backups for that recovery chain.',
      },
      {
        question: 'What best demonstrates that a backup strategy meets RTO?',
        options: [
          'A timed successful restore and application validation',
          'A green backup job alone',
          'The backup filename',
        ],
        answer: 0,
        explanation: 'A restore drill measures recovery and checks usability.',
      },
    ],
    quizRevision: 'advanced-1',
    task: {
      title: 'Create a recovery plan',
      prompt:
        'A college needs RPO 15 minutes and RTO one hour. Propose backups, retention and a validation schedule.',
      hint: 'Specify log cadence and recovery rehearsals.',
      solution:
        'Evaluate FULL recovery with an established full baseline, regular full/differential backups and log backups at most every 15 minutes, allowing operational margin. Keep protected offsite copies and necessary keys. Run timed isolated restores, validate application data and adjust for measured restore duration. Monitor backup failures and chain continuity.',
      revision: 'advanced-1',
    },
    tasks: [
      {
        title: 'Create a recovery plan',
        prompt:
          'A college needs RPO 15 minutes and RTO one hour. Propose backups, retention and a validation schedule.',
        hint: 'Specify log cadence and recovery rehearsals.',
        solution:
          'Evaluate FULL recovery with an established full baseline, regular full/differential backups and log backups at most every 15 minutes, allowing operational margin. Keep protected offsite copies and necessary keys. Run timed isolated restores, validate application data and adjust for measured restore duration. Monitor backup failures and chain continuity.',
        revision: 'advanced-1',
      },
      {
        title: 'Diagnose a broken chain',
        prompt:
          'A required log backup is missing. Can later log backups simply be applied after skipping it?',
        hint: 'Restore needs continuity.',
        solution:
          'No. The required sequence cannot skip a gap. Find a valid alternate restore path or newer baseline and quantify the resulting data loss against RPO. Investigate backup retention and copy failures.',
        revision: 'advanced-1',
      },
    ],
  },
  {
    id: 'advanced-8-1',
    unit: 208,
    title: 'Distributed databases, partitioning and NoSQL',
    sections: [
      {
        heading: 'Choose distribution for a reason',
        text: 'Replication copies data; partitioning divides data. SQL Server table partitioning within one database is not automatically sharding across servers. Sharding introduces routing, cross-shard queries and transaction complexity. Replicas may lag, so decide which reads require the authoritative writer.',
      },
      {
        heading: 'Model around access and consistency needs',
        text: 'Document, key-value, graph and relational models support different access patterns; NoSQL does not mean no schema or no transactions. During a network partition, CAP concerns the trade-off between linearizable consistency and availability for every request, not a general instruction to pick any two properties. Eventual consistency requires clear convergence and conflict rules.',
      },
      {
        heading: 'Environment and prerequisites',
        text: 'Complete Introduction and Intermediate first. SQL Server examples require SSMS and a disposable user database. Scripts are reviewed teaching examples; native execution has not been verified here. Design notation is not executable SQL.',
      },
    ],
    example: {
      title: 'A customer cannot see a new order',
      problem:
        'Checkout writes to the primary but the following page reads a lagging replica. Explain and repair the experience.',
      solution:
        'Replication lag can violate read-your-writes expectations. Route the immediate confirmation to the primary or use a consistency/session mechanism supported by the system. Monitor lag; do not promise that all replicas update instantly.',
    },
    sampleCode:
      'Design case: orders distributed by CustomerID\nRoute customer orders to the owning shard.\nKeep order and line writes together where possible.\nPlan global reporting, customer moves, hot shards and backup/restore per shard.\nFor an order event: use a stable EventID, idempotent consumers and a transactional outbox pattern where appropriate.',
    environment: 'design',
    download: 'advanced-8-1.txt',
    downloadFolder: 'advanced',
    quizzes: [
      {
        question: 'Which statement distinguishes replication from partitioning?',
        options: [
          'Partitioning automatically creates replicas',
          'Replication copies data; partitioning divides data',
          'Both always mean separate continents',
        ],
        answer: 1,
        explanation: 'The operations address different storage and availability needs.',
      },
      {
        question: 'Why might an immediate replica read miss a new order?',
        options: [
          'Replication lag',
          'A foreign key always deletes it',
          'SELECT cannot follow INSERT',
        ],
        answer: 0,
        explanation:
          'Asynchronous replicas may not yet have replayed the committed change.',
      },
      {
        question: 'What does an idempotent event consumer protect against?',
        options: [
          'Every possible network outage',
          'All cross-shard joins',
          'Duplicate delivery causing duplicate effects',
        ],
        answer: 2,
        explanation:
          'Processing the same event again should not repeat its business effect.',
      },
    ],
    quizRevision: 'advanced-1',
    task: {
      title: 'Select a storage model',
      prompt:
        'Choose storage for product documents and financial order totals. State access patterns and integrity requirements.',
      hint: 'Choose from requirements rather than popularity.',
      solution:
        'A document model may suit varied product attributes and aggregate reads. Relational order/line/payment data suits explicit constraints and transactional totals. A single relational platform with JSON may also meet both needs; compare operational complexity before introducing multiple stores.',
      revision: 'advanced-1',
    },
    tasks: [
      {
        title: 'Select a storage model',
        prompt:
          'Choose storage for product documents and financial order totals. State access patterns and integrity requirements.',
        hint: 'Choose from requirements rather than popularity.',
        solution:
          'A document model may suit varied product attributes and aggregate reads. Relational order/line/payment data suits explicit constraints and transactional totals. A single relational platform with JSON may also meet both needs; compare operational complexity before introducing multiple stores.',
        revision: 'advanced-1',
      },
      {
        title: 'Design for duplicate events',
        prompt:
          'An order-paid event can arrive twice. Explain how to avoid duplicate shipments and handle replica lag in confirmation.',
        hint: 'Use an event identity and atomic processing.',
        solution:
          'Record a unique EventID or business action key atomically with shipment creation, so retries detect prior processing. Use an outbox for reliable publication where suitable. Route immediate confirmation reads to a source with the required read-your-writes guarantee and monitor replica lag.',
        revision: 'advanced-1',
      },
    ],
  },
];

advancedUnits.push(hadoopUnit);
advancedLessons.push(...hadoopLessons);
