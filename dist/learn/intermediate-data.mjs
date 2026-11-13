import {practicalIntermediateQuizzes} from './intermediate-quizzes.mjs?v=26';
// Original supplementary material aligned to the supplied DATA6222 outline.
export const intermediateUnits=[
  {
    "id": 101,
    "number": 1,
    "title": "Foundation of database concepts",
    "subtitle": "DATA6222 Intermediate \u00b7 10 learning outcomes",
    "chapter": "1 and 8",
    "sessions": "Sessions 1-2",
    "overview": "Develop practical SQL Server skills in foundation of database concepts. Work through three lessons, inspect complete examples, then attempt the questions and compare your reasoning with the model answers. Native T-SQL is clearly separated from browser practice.",
    "themes": [
      "Database components and models",
      "Keys, tables and design quality",
      "SQL Server system databases"
    ],
    "outcomes": [
      "Explain the main components of a database system.",
      "Discuss the table as the most basic database object.",
      "Explain primary keys and foreign keys.",
      "Compare the four system databases.",
      "Describe the main functions of a DBMS.",
      "Discuss the types of DBMS.",
      "Compare DBMS and file system data management.",
      "Plan a well-designed database.",
      "Identify a poorly designed database.",
      "Discuss data redundancy and how to avoid it."
    ],
    "check": "Explain each stated outcome, attempt the three lessons and test the relevant SQL in its labelled environment."
  },
  {
    "id": 102,
    "number": 2,
    "title": "Tools of the trade",
    "subtitle": "DATA6222 Intermediate \u00b7 14 learning outcomes",
    "chapter": "2, 3 and 11",
    "sessions": "Sessions 3-6",
    "overview": "Develop practical SQL Server skills in tools of the trade. Work through three lessons, inspect complete examples, then attempt the questions and compare your reasoning with the model answers. Native T-SQL is clearly separated from browser practice.",
    "themes": [
      "Tools, SELECT and filtering",
      "Aggregates, DISTINCT and grouping",
      "Safe data changes and system functions"
    ],
    "outcomes": [
      "Describe the function of SQL Server tools.",
      "Use SELECT to display data.",
      "Describe SELECT clauses including FROM and WHERE.",
      "Create simple and complex WHERE conditions.",
      "Use ORDER BY, GROUP BY and HAVING.",
      "Use MIN, MAX, SUM, AVG and COUNT.",
      "Differentiate HAVING and WHERE.",
      "Use DISTINCT and ALL.",
      "Insert rows using INSERT INTO.",
      "Update existing data.",
      "Delete rows.",
      "Explain precautions for UPDATE and DELETE.",
      "Classify relational relationships.",
      "Use system and aggregate functions for specified criteria."
    ],
    "check": "Explain each stated outcome, attempt the three lessons and test the relevant SQL in its labelled environment."
  },
  {
    "id": 103,
    "number": 3,
    "title": "JOINs",
    "subtitle": "DATA6222 Intermediate \u00b7 12 learning outcomes",
    "chapter": "4",
    "sessions": "Sessions 7-12",
    "overview": "Develop practical SQL Server skills in joins. Work through three lessons, inspect complete examples, then attempt the questions and compare your reasoning with the model answers. Native T-SQL is clearly separated from browser practice.",
    "themes": [
      "INNER JOIN and relationship cardinality",
      "Outer joins, CROSS JOIN and self joins",
      "UNION and UNION ALL"
    ],
    "outcomes": [
      "Explain the join operator.",
      "Compare join types.",
      "Construct joins for desired outputs.",
      "Write an ANSI INNER JOIN.",
      "Write an ANSI OUTER JOIN.",
      "Identify outer-join use cases.",
      "Differentiate LEFT, RIGHT and FULL OUTER JOIN.",
      "Identify CROSS JOIN and Cartesian products.",
      "Write an ANSI CROSS JOIN.",
      "Explain the risks of accidental Cartesian products.",
      "Provide alternative join syntax.",
      "Use UNION and UNION ALL."
    ],
    "check": "Explain each stated outcome, attempt the three lessons and test the relevant SQL in its labelled environment."
  },
  {
    "id": 104,
    "number": 4,
    "title": "Creating and altering tables",
    "subtitle": "DATA6222 Intermediate \u00b7 9 learning outcomes",
    "chapter": "5",
    "sessions": "Sessions 13-18",
    "overview": "Develop practical SQL Server skills in creating and altering tables. Work through three lessons, inspect complete examples, then attempt the questions and compare your reasoning with the model answers. Native T-SQL is clearly separated from browser practice.",
    "themes": [
      "Schemas, databases and data types",
      "ALTER, DROP and change planning",
      "SSMS design view and generated scripts"
    ],
    "outcomes": [
      "Explain schemas.",
      "Create a database in SQL Server.",
      "Choose appropriate field data types.",
      "Use ALTER.",
      "Use DROP.",
      "Explain DROP and ALTER precautions.",
      "Create a database using the GUI.",
      "Use a database designed with the GUI.",
      "Generate scripts in SQL Server Management Studio."
    ],
    "check": "Explain each stated outcome, attempt the three lessons and test the relevant SQL in its labelled environment."
  },
  {
    "id": 105,
    "number": 5,
    "title": "Constraints and referential integrity",
    "subtitle": "DATA6222 Intermediate \u00b7 9 learning outcomes",
    "chapter": "6",
    "sessions": "Sessions 19-26",
    "overview": "Develop practical SQL Server skills in constraints and referential integrity. Work through three lessons, inspect complete examples, then attempt the questions and compare your reasoning with the model answers. Native T-SQL is clearly separated from browser practice.",
    "themes": [
      "Entity integrity and named constraints",
      "Foreign keys and referential actions",
      "Add, remove and review constraints"
    ],
    "outcomes": [
      "Explain and implement constraints.",
      "Discuss constraint naming rules.",
      "Explain entity integrity in SQL Server.",
      "Explain referential integrity in SQL Server.",
      "Use PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, DEFAULT and NOT NULL.",
      "Compare CASCADE, NO ACTION, SET NULL and SET DEFAULT.",
      "Use CHECK constraints.",
      "Use rules and defaults.",
      "Add and remove constraints."
    ],
    "check": "Explain each stated outcome, attempt the three lessons and test the relevant SQL in its labelled environment."
  },
  {
    "id": 106,
    "number": 6,
    "title": "Normalisation and other basic design issues",
    "subtitle": "DATA6222 Intermediate \u00b7 13 learning outcomes",
    "chapter": "7 and 8",
    "sessions": "Sessions 27-34",
    "overview": "Develop practical SQL Server skills in normalisation and other basic design issues. Work through three lessons, inspect complete examples, then attempt the questions and compare your reasoning with the model answers. Native T-SQL is clearly separated from browser practice.",
    "themes": [
      "Subqueries, EXISTS and OUTPUT",
      "Normalisation with dependency reasoning",
      "ERDs, object properties and denormalisation"
    ],
    "outcomes": [
      "Use the OUTPUT clause.",
      "Compare joins and subqueries with attention to performance.",
      "Write different subqueries.",
      "Explain normalisation.",
      "Discuss 1NF, 2NF and 3NF.",
      "Normalise a given dataset.",
      "Discuss normalisation benefits and disadvantages.",
      "Explain when to denormalise.",
      "Identify relationship types with examples.",
      "Resolve many-to-many relationships.",
      "Construct an ERD in SQL Server.",
      "Open database object properties.",
      "Select types and add attribute constraints."
    ],
    "check": "Explain each stated outcome, attempt the three lessons and test the relevant SQL in its labelled environment."
  },
  {
    "id": 107,
    "number": 7,
    "title": "SQL Server storage, index structures and views",
    "subtitle": "DATA6222 Intermediate \u00b7 12 learning outcomes",
    "chapter": "9 and 10",
    "sessions": "Sessions 35-39",
    "overview": "Develop practical SQL Server skills in sql server storage, index structures and views. Work through three lessons, inspect complete examples, then attempt the questions and compare your reasoning with the model answers. Native T-SQL is clearly separated from browser practice.",
    "themes": [
      "Storage hierarchy, scans and seeks",
      "Index creation, order and maintenance",
      "Views and update restrictions"
    ],
    "outcomes": [
      "Describe SQL Server storage hierarchy.",
      "Explain indexes and B-trees.",
      "Discuss scans and seeks.",
      "Differentiate clustered and nonclustered indexes.",
      "Use CREATE INDEX.",
      "Use ASC and DESC index key order.",
      "Discuss index benefits and costs.",
      "Use DROP INDEX.",
      "Explain view benefits.",
      "Create simple and complex views.",
      "Use an updatable view to change data.",
      "Create, alter and drop views."
    ],
    "check": "Explain each stated outcome, attempt the three lessons and test the relevant SQL in its labelled environment."
  },
  {
    "id": 108,
    "number": 8,
    "title": "Writing scripts and batches",
    "subtitle": "DATA6222 Intermediate \u00b7 15 learning outcomes",
    "chapter": "11",
    "sessions": "Sessions 40-44",
    "overview": "Develop practical SQL Server skills in writing scripts and batches. Work through three lessons, inspect complete examples, then attempt the questions and compare your reasoning with the model answers. Native T-SQL is clearly separated from browser practice.",
    "themes": [
      "Scripts, batches and variable scope",
      "IF, WHILE and CASE",
      "System functions and TRY CATCH"
    ],
    "outcomes": [
      "Identify a script.",
      "Explain USE.",
      "Declare and use variables.",
      "Use SET.",
      "Use variables in SELECT.",
      "Use @@DATEFIRST, @@ERROR, @@ROWCOUNT and @@IDENTITY.",
      "Create batches.",
      "Use GO.",
      "Compare syntax and runtime errors.",
      "Use EXEC.",
      "Use IF ELSE.",
      "Use WHILE.",
      "Create BEGIN END blocks.",
      "Use CASE in SELECT.",
      "Use TRY CATCH."
    ],
    "check": "Explain each stated outcome, attempt the three lessons and test the relevant SQL in its labelled environment."
  },
  {
    "id": 109,
    "number": 9,
    "title": "Stored procedures and error handling",
    "subtitle": "DATA6222 Intermediate \u00b7 12 learning outcomes",
    "chapter": "12",
    "sessions": "Sessions 45-48",
    "overview": "Develop practical SQL Server skills in stored procedures and error handling. Work through three lessons, inspect complete examples, then attempt the questions and compare your reasoning with the model answers. Native T-SQL is clearly separated from browser practice.",
    "themes": [
      "Create, execute, alter and drop procedures",
      "Input, OUTPUT, defaults and RETURN",
      "Procedure validation and transaction errors"
    ],
    "outcomes": [
      "Explain stored procedures.",
      "Create stored procedures.",
      "ALTER and DROP procedures.",
      "Create procedures for different tasks.",
      "Use input and output parameters.",
      "Declare parameters.",
      "Provide parameter defaults.",
      "Use RETURN.",
      "Discuss SQL Server error handling.",
      "Use @@ERROR.",
      "Prevent errors before execution.",
      "Discuss procedure advantages."
    ],
    "check": "Explain each stated outcome, attempt the three lessons and test the relevant SQL in its labelled environment."
  }
];
export const intermediateLessons=[
  {
    "id": "intermediate-1-1",
    "unit": 101,
    "title": "Database components and models",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "A database system includes data, hardware, DBMS software, applications, procedures and people. The DBMS provides querying, transactions, concurrency, integrity, security and recovery. Relational systems use tables and keys; hierarchical systems use trees; network models allow multiple parent links; document systems store structured documents. Choose a model for access patterns and rules, not fashion. File systems remain useful for simple file storage but independent files leave sharing, validation and concurrency to application code."
      },
      {
        "heading": "Where this example runs",
        "text": "This is design notation for reasoning about tables, keys and dependencies. It is not an executable SQL script. Translate it into CREATE TABLE statements only after confirming the stated business rules."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. The bridge table records a many-to-many relationship without placing a list of course IDs in one student row."
      }
    ],
    "example": {
      "title": "Database components and models",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "The bridge table records a many-to-many relationship without placing a list of course IDs in one student row."
    },
    "task": {
      "prompt": "A college stores comma-separated course names in a student spreadsheet. Design three tables and identify two DBMS services it needs.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "Use Students, Courses and Enrolments with a composite enrolment key. Foreign keys prevent orphan enrolments; concurrency control coordinates simultaneous edits. A backup and tested recovery plan protects against data loss."
    },
    "tasks": [
      {
        "prompt": "A college stores comma-separated course names in a student spreadsheet. Design three tables and identify two DBMS services it needs.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "Use Students, Courses and Enrolments with a composite enrolment key. Foreign keys prevent orphan enrolments; concurrency control coordinates simultaneous edits. A backup and tested recovery plan protects against data loss.",
        "title": "Apply the concept"
      },
      {
        "title": "Repair a file-based design",
        "prompt": "Two registration spreadsheets contain different addresses for the same StudentNumber. Explain how to repair the data and prevent recurrence.",
        "hint": "Choose an authoritative source before adding a uniqueness rule.",
        "solution": "Identify duplicate students by the institutionally unique StudentNumber, confirm the current address and merge records without losing enrolments. Store one student row, enforce UNIQUE NOT NULL on StudentNumber and refer to it through stable keys. Document who may update contact details.",
        "revision": "practical-2"
      },
      {
        "title": "Choose a data model",
        "prompt": "A shop needs customers, orders and order lines, concurrent checkout and exact financial totals. Choose a DBMS model and list four required services.",
        "hint": "Match business rules to relationships and transactional changes.",
        "solution": "A relational DBMS suits the related entities and integrity rules. Require transactions, concurrency control, referential integrity and controlled permissions; also plan backup and recovery. Use exact decimal totals rather than approximate floating point.",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Which service coordinates simultaneous database changes?",
        "options": [
          "Concurrency control",
          "Changing file extensions",
          "Removing keys"
        ],
        "answer": 0,
        "explanation": "The DBMS coordinates concurrent operations while enforcing the configured isolation rules."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Every example creates a new SQL Server instance in the browser.",
          "The bridge table records a many-to-many relationship without placing a list of course IDs in one student row.",
          "All source tables are permanently removed by every example."
        ],
        "answer": 1,
        "explanation": "The bridge table records a many-to-many relationship without placing a list of course IDs in one student row."
      }
    ],
    "sampleCode": "Students(StudentID PK, StudentName)\nCourses(CourseID PK, CourseName)\nEnrolments(StudentID PK/FK, CourseID PK/FK, Mark)",
    "environment": "design",
    "diagram": null,
    "sql": null,
    "download": "intermediate-1-1.txt"
  },
  {
    "id": "intermediate-1-2",
    "unit": 101,
    "title": "Keys, tables and design quality",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "A table represents one subject, a row one occurrence, and columns its attributes. A candidate key is minimal and unique; choose one as the primary key. A foreign key references a primary or unique candidate key and may repeat. Repeating a customer address on every sale causes update anomalies. Write business rules, identify keys, model relationships, normalise and test edge cases before implementation."
      },
      {
        "heading": "Where this example runs",
        "text": "This is design notation for reasoning about tables, keys and dependencies. It is not an executable SQL script. Translate it into CREATE TABLE statements only after confirming the stated business rules."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. One customer address is stored once; Orders connects to it by CustomerID. Historical delivery addresses may deliberately be stored separately."
      }
    ],
    "example": {
      "title": "Keys, tables and design quality",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "One customer address is stored once; Orders connects to it by CustomerID. Historical delivery addresses may deliberately be stored separately."
    },
    "task": {
      "prompt": "Explain why StudentName is a weak primary key and choose a better key. Give one insertion and one update anomaly in a single enrolment spreadsheet.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "Names can repeat and change. Use a stable StudentID and enforce any separate business identifiers with UNIQUE. A course cannot be recorded before a student enrols in a mixed table; repeated course names can be updated inconsistently."
    },
    "tasks": [
      {
        "prompt": "Explain why StudentName is a weak primary key and choose a better key. Give one insertion and one update anomaly in a single enrolment spreadsheet.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "Names can repeat and change. Use a stable StudentID and enforce any separate business identifiers with UNIQUE. A course cannot be recorded before a student enrols in a mixed table; repeated course names can be updated inconsistently.",
        "title": "Apply the concept"
      },
      {
        "title": "Find a key error",
        "prompt": "A designer makes StudentName the primary key and records two learners named Lefa Malatji. Explain the failure and redesign the key without deleting a learner.",
        "hint": "A key identifies a person; a name describes one.",
        "solution": "Names are not reliably unique. Assign distinct stable StudentID values, retain both names and enforce a separate unique StudentNumber if the institution guarantees it. Update enrolment foreign keys using a verified mapping before changing the old key.",
        "revision": "practical-2"
      },
      {
        "title": "Model a new rule",
        "prompt": "Each order can contain many products and a product can occur in many orders. Each product occurs at most once per order. Show all keys and where Quantity belongs.",
        "hint": "Quantity depends on the pair.",
        "solution": "Orders(OrderID PK,...), Products(ProductID PK,...) and OrderLines(OrderID PK/FK, ProductID PK/FK, Quantity). The composite key enforces at most one line per order-product pair. Quantity depends on that whole pair.",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Which is the best reason to avoid StudentName as a primary key?",
        "options": [
          "Every primary key must be generated automatically",
          "Names can repeat and change",
          "Names cannot be stored in a database"
        ],
        "answer": 1,
        "explanation": "Choose a stable unique identifier; names are not reliably unique or stable."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser.",
          "One customer address is stored once; Orders connects to it by CustomerID. Historical delivery addresses may deliberately be stored separately."
        ],
        "answer": 2,
        "explanation": "One customer address is stored once; Orders connects to it by CustomerID. Historical delivery addresses may deliberately be stored separately."
      }
    ],
    "sampleCode": "Customers(CustomerID PK, CustomerName, Address)\nOrders(OrderID PK, CustomerID FK, OrderDate)",
    "environment": "design",
    "diagram": null,
    "sql": null,
    "download": "intermediate-1-2.txt"
  },
  {
    "id": "intermediate-1-3",
    "unit": 101,
    "title": "SQL Server system databases",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "master holds instance-level configuration and metadata. model is the template for new databases. msdb supports SQL Server Agent jobs, alerts and operational history. tempdb holds temporary objects and internal work and is recreated when the instance starts. These four teaching databases have different responsibilities; Resource is another system database containing system objects. Do not put application tables in system databases."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. On a normal SQL Server instance this returns the four named databases. Requires native SQL Server; metadata visibility depends on permissions."
      }
    ],
    "example": {
      "title": "SQL Server system databases",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "On a normal SQL Server instance this returns the four named databases. Requires native SQL Server; metadata visibility depends on permissions."
    },
    "task": {
      "prompt": "Match a scheduled job, a temporary table, a new-database template and instance login metadata to the appropriate system database.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "Job: msdb. Temporary table: tempdb. Template: model. Instance login metadata: master. Application data belongs in a user database."
    },
    "tasks": [
      {
        "prompt": "Match a scheduled job, a temporary table, a new-database template and instance login metadata to the appropriate system database.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "Job: msdb. Temporary table: tempdb. Template: model. Instance login metadata: master. Application data belongs in a user database.",
        "title": "Apply the concept"
      },
      {
        "title": "Correct a system-database mix-up",
        "prompt": "A colleague says master stores all temporary tables and tempdb stores scheduled jobs permanently. Correct both statements and explain what a restart means for tempdb.",
        "hint": "Separate instance metadata, temporary work and agent history.",
        "solution": "Temporary tables and internal temporary work use tempdb; SQL Server Agent jobs and related metadata use msdb. master holds instance-level metadata. tempdb is recreated on restart, so temporary objects are not permanent application storage.",
        "revision": "practical-2"
      },
      {
        "title": "Plan a practice database",
        "prompt": "You are asked to create student tables inside model so everyone can use them. Explain a safer deployment plan and how to verify your current database.",
        "hint": "Changing the template can affect newly created databases.",
        "solution": "Create a dedicated user database, select it explicitly with USE and check SELECT DB_NAME(). Create and populate student tables there. model is the new-database template, so changes there can propagate unexpectedly to later databases. Do not use a system database as the shared student application database.",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Which system database is the template for new databases?",
        "options": [
          "msdb",
          "master",
          "model"
        ],
        "answer": 2,
        "explanation": "model supplies the template; msdb supports jobs and master stores instance metadata."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "On a normal SQL Server instance this returns the four named databases. Requires native SQL Server; metadata visibility depends on permissions.",
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser."
        ],
        "answer": 0,
        "explanation": "On a normal SQL Server instance this returns the four named databases. Requires native SQL Server; metadata visibility depends on permissions."
      }
    ],
    "sampleCode": "SELECT name, database_id\nFROM sys.databases\nWHERE name IN ('master','model','msdb','tempdb')\nORDER BY name;",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "moreExamples": [
      {
        "title": "Inspect the active database",
        "code": "SELECT DB_NAME() AS CurrentDatabase;\nSELECT name,type_desc FROM sys.objects WHERE is_ms_shipped=0 ORDER BY name;",
        "reason": "DB_NAME() identifies the current user database; sys.objects lists visible user-defined objects. Verify context before any DDL.",
        "environment": "native"
      }
    ],
    "download": "intermediate-1-3.sql"
  },
  {
    "id": "intermediate-2-1",
    "unit": 102,
    "title": "Tools, SELECT and filtering",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "SSMS manages instances, edits queries and shows execution plans. Object Explorer displays server objects. SQL Server Configuration Manager manages relevant local services and protocols; it is not the query editor. SELECT chooses columns, FROM the source, WHERE rows and ORDER BY ordering. AND binds more tightly than OR, so add parentheses to make intent explicit. Use IS NULL for missing values; equality to NULL is not true."
      },
      {
        "heading": "Where this example runs",
        "text": "This example uses the college demo or disposable practice tables and the documented portable SQL subset. Run query examples in the SQL workspace, compare the result and reset the data before repeating schema changes."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Only students in either named city aged 21 or more are returned, ordered by city then name. Runs in the browser college dataset."
      }
    ],
    "example": {
      "title": "Tools, SELECT and filtering",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Only students in either named city aged 21 or more are returned, ordered by city then name. Runs in the browser college dataset."
    },
    "task": {
      "prompt": "Find students aged between 20 and 24 inclusive whose names begin with L. Sort oldest first, breaking ties by StudentID.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "SELECT StudentID, StudentName, Age FROM Students WHERE Age BETWEEN 20 AND 24 AND StudentName LIKE 'L%' ORDER BY Age DESC, StudentID;"
    },
    "tasks": [
      {
        "prompt": "Find students aged between 20 and 24 inclusive whose names begin with L. Sort oldest first, breaking ties by StudentID.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "SELECT StudentID, StudentName, Age FROM Students WHERE Age BETWEEN 20 AND 24 AND StudentName LIKE 'L%' ORDER BY Age DESC, StudentID;",
        "title": "Apply the concept"
      },
      {
        "title": "Fix AND/OR precedence",
        "prompt": "This query should return only Polokwane or Pretoria students aged at least 21: SELECT StudentName FROM Students WHERE City='Polokwane' OR City='Pretoria' AND Age>=21;. Correct it and explain the unwanted rows.",
        "hint": "Group the two city alternatives.",
        "solution": "SELECT StudentName FROM Students WHERE (City='Polokwane' OR City='Pretoria') AND Age>=21; AND binds before OR, so the original includes all Polokwane students regardless of age.",
        "revision": "practical-2"
      },
      {
        "title": "Filter and sort a range",
        "prompt": "List StudentID, StudentName and Age for students aged 20 through 24 inclusive, ordered by Age then StudentID.",
        "hint": "BETWEEN includes both endpoints.",
        "solution": "SELECT StudentID,StudentName,Age FROM Students WHERE Age BETWEEN 20 AND 24 ORDER BY Age,StudentID;",
        "sqlChallenge": "expanded-between",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Which condition includes only missing marks?",
        "options": [
          "Mark IS NULL",
          "Mark = NULL",
          "Mark = 0"
        ],
        "answer": 0,
        "explanation": "NULL represents missing information; equality does not test for it."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Every example creates a new SQL Server instance in the browser.",
          "Only students in either named city aged 21 or more are returned, ordered by city then name. Runs in the browser college dataset.",
          "All source tables are permanently removed by every example."
        ],
        "answer": 1,
        "explanation": "Only students in either named city aged 21 or more are returned, ordered by city then name. Runs in the browser college dataset."
      }
    ],
    "sampleCode": "SELECT StudentName, City, Age\nFROM Students\nWHERE (City = 'Polokwane' OR City = 'Pretoria') AND Age >= 21\nORDER BY City, StudentName;",
    "environment": "browser",
    "diagram": null,
    "sql": null,
    "download": "intermediate-2-1.sql"
  },
  {
    "id": "intermediate-2-2",
    "unit": 102,
    "title": "Aggregates, DISTINCT and grouping",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "COUNT(*) counts rows; COUNT(column) ignores NULL. SUM, AVG, MIN and MAX ignore NULL values. SQL Server AVG of integers has an integer return type: cast marks to decimal if fractions are required. WHERE filters individual rows before GROUP BY; HAVING filters groups. SELECT ALL is the default and retains duplicate result rows; DISTINCT removes duplicate selected tuples."
      },
      {
        "heading": "Where this example runs",
        "text": "This example uses the college demo or disposable practice tables and the documented portable SQL subset. Run query examples in the SQL workspace, compare the result and reset the data before repeating schema changes."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. One result per course with at least five marked enrolments. The count here excludes unmarked rows because WHERE removed them."
      }
    ],
    "example": {
      "title": "Aggregates, DISTINCT and grouping",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "One result per course with at least five marked enrolments. The count here excludes unmarked rows because WHERE removed them."
    },
    "task": {
      "prompt": "Show cities with at least five students aged 20 or more. Explain why the age condition belongs in WHERE.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "SELECT City, COUNT(*) AS N FROM Students WHERE Age >= 20 GROUP BY City HAVING COUNT(*) >= 5; Age is a row condition; the minimum group size is a group condition."
    },
    "tasks": [
      {
        "prompt": "Show cities with at least five students aged 20 or more. Explain why the age condition belongs in WHERE.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "SELECT City, COUNT(*) AS N FROM Students WHERE Age >= 20 GROUP BY City HAVING COUNT(*) >= 5; Age is a row condition; the minimum group size is a group condition.",
        "title": "Apply the concept"
      },
      {
        "title": "Move the aggregate filter",
        "prompt": "Repair SELECT CourseID,AVG(Mark) FROM Enrolments WHERE COUNT(*)>=5 GROUP BY CourseID; so it returns courses with at least five enrolments and a fractional average.",
        "hint": "A group does not exist while WHERE is filtering rows.",
        "solution": "SELECT CourseID,AVG(CAST(Mark AS DECIMAL(10,2))) AS AverageMark FROM Enrolments GROUP BY CourseID HAVING COUNT(*)>=5; COUNT(*) includes unmarked enrolments; AVG ignores NULL.",
        "revision": "practical-2"
      },
      {
        "title": "Count categories in one query",
        "prompt": "Return CourseID, PassCount for marks >=50, and PendingCount for NULL marks, sorted by CourseID.",
        "hint": "Use SUM with CASE for each independent category.",
        "solution": "SELECT CourseID,SUM(CASE WHEN Mark>=50 THEN 1 ELSE 0 END) AS PassCount,SUM(CASE WHEN Mark IS NULL THEN 1 ELSE 0 END) AS PendingCount FROM Enrolments GROUP BY CourseID ORDER BY CourseID;",
        "sqlChallenge": "expanded-conditional",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Where should a minimum group-size condition go?",
        "options": [
          "ORDER BY COUNT(*) >= 5",
          "HAVING COUNT(*) >= 5",
          "WHERE COUNT(*) >= 5"
        ],
        "answer": 1,
        "explanation": "HAVING filters groups; WHERE filters the input rows."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser.",
          "One result per course with at least five marked enrolments. The count here excludes unmarked rows because WHERE removed them."
        ],
        "answer": 2,
        "explanation": "One result per course with at least five marked enrolments. The count here excludes unmarked rows because WHERE removed them."
      }
    ],
    "sampleCode": "SELECT CourseID, COUNT(*) AS Enrolments,\n AVG(CAST(Mark AS DECIMAL(10,2))) AS AverageMark\nFROM Enrolments\nWHERE Mark IS NOT NULL\nGROUP BY CourseID\nHAVING COUNT(*) >= 5\nORDER BY AverageMark DESC;",
    "environment": "browser",
    "diagram": null,
    "sql": null,
    "moreExamples": [
      {
        "title": "ALL compared with DISTINCT",
        "code": "SELECT ALL City FROM Students ORDER BY City;\nSELECT DISTINCT City FROM Students ORDER BY City;",
        "reason": "The first result has 20 city occurrences; the second has four unique cities. ALL is the default.",
        "environment": "browser"
      }
    ],
    "download": "intermediate-2-2.sql"
  },
  {
    "id": "intermediate-2-3",
    "unit": 102,
    "title": "Safe data changes and system functions",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "INSERT adds rows, UPDATE changes existing rows and DELETE removes rows. Always preview the intended WHERE selection, check dependent tables and verify affected row counts. Use a transaction and rollback during native practice; backups are essential for recovery. @@ROWCOUNT describes the preceding statement and must be captured immediately. DB_NAME() returns the current database; these system functions require native SQL Server."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. The transaction makes a temporary practice change and rolls it back. The captured row count is 1 on the original dataset. Run in SSMS."
      }
    ],
    "example": {
      "title": "Safe data changes and system functions",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "The transaction makes a temporary practice change and rolls it back. The captured row count is 1 on the original dataset. Run in SSMS."
    },
    "task": {
      "prompt": "Write an INSERT for student 99, then a scoped UPDATE and DELETE. Explain what happens if WHERE is omitted.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "INSERT INTO Students (StudentID,StudentName,City,Age) VALUES (99,'Practice','Polokwane',21); UPDATE Students SET Age=22 WHERE StudentID=99; DELETE FROM Students WHERE StudentID=99; Without WHERE the statement targets every row, subject to constraints and permissions."
    },
    "tasks": [
      {
        "prompt": "Write an INSERT for student 99, then a scoped UPDATE and DELETE. Explain what happens if WHERE is omitted.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "INSERT INTO Students (StudentID,StudentName,City,Age) VALUES (99,'Practice','Polokwane',21); UPDATE Students SET Age=22 WHERE StudentID=99; DELETE FROM Students WHERE StudentID=99; Without WHERE the statement targets every row, subject to constraints and permissions.",
        "title": "Apply the concept"
      },
      {
        "title": "Prevent an unscoped change",
        "prompt": "An intended correction is UPDATE Students SET City='Polokwane'; for student 7 only. Explain the mistake, write the corrected query and outline a recovery step if it already committed.",
        "hint": "WHERE controls which rows are updated.",
        "solution": "UPDATE Students SET City='Polokwane' WHERE StudentID=7; Preview the same WHERE with SELECT. If the unscoped update committed, use a verified audit source or a tested backup/recovery procedure; ROLLBACK cannot undo an already committed transaction.",
        "revision": "practical-2"
      },
      {
        "title": "Capture a write count in SSMS",
        "prompt": "Write a practice transaction changing only student 7 to age 22. Capture @@ROWCOUNT immediately, show the count and roll back.",
        "hint": "Do not put another SELECT before capturing the row count.",
        "solution": "BEGIN TRANSACTION;\nUPDATE Students SET Age=22 WHERE StudentID=7;\nDECLARE @Changed INT=@@ROWCOUNT;\nSELECT @Changed AS Changed;\nROLLBACK TRANSACTION;",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "When must @@ROWCOUNT be captured?",
        "options": [
          "After any unrelated SELECT",
          "Only after disconnecting",
          "Immediately after the statement being measured"
        ],
        "answer": 2,
        "explanation": "Later statements change the value of @@ROWCOUNT."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "The transaction makes a temporary practice change and rolls it back. The captured row count is 1 on the original dataset. Run in SSMS.",
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser."
        ],
        "answer": 0,
        "explanation": "The transaction makes a temporary practice change and rolls it back. The captured row count is 1 on the original dataset. Run in SSMS."
      }
    ],
    "sampleCode": "BEGIN TRANSACTION;\nSELECT * FROM Students WHERE StudentID = 1;\nUPDATE Students SET Age = 19 WHERE StudentID = 1;\nDECLARE @Changed INT = @@ROWCOUNT;\nSELECT @Changed AS ChangedRows;\nROLLBACK TRANSACTION;",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "download": "intermediate-2-3.sql"
  },
  {
    "id": "intermediate-3-1",
    "unit": 103,
    "title": "INNER JOIN and relationship cardinality",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "INNER JOIN returns matching combinations. Qualify columns shared by both tables and write the ON condition using keys. A one-to-many join can repeat the parent values once per matching child; repetition is not automatically a mistake. Missing join predicates can multiply rows. The older comma-join syntax can express an inner join but explicit ANSI JOIN keeps relationships separate from filters."
      },
      {
        "heading": "Where this example runs",
        "text": "This example uses the college demo or disposable practice tables and the documented portable SQL subset. Run query examples in the SQL workspace, compare the result and reset the data before repeating schema changes."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. 40 rows on the college demo because each of 20 students has two enrolments."
      },
      {
        "heading": "Alternative inner-join syntax",
        "text": "SELECT s.StudentName,e.Mark FROM Students s, Enrolments e WHERE s.StudentID=e.StudentID expresses an inner join using a comma source list. The matching predicate is in WHERE. Prefer the explicit ANSI JOIN ... ON form for clarity and to reduce accidental Cartesian products; do not mix outer-join requirements into this older form."
      }
    ],
    "example": {
      "title": "INNER JOIN and relationship cardinality",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "40 rows on the college demo because each of 20 students has two enrolments."
    },
    "task": {
      "prompt": "Join Students, Enrolments and Courses to show names, course names and marks of 75 or more.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "SELECT s.StudentName,c.CourseName,e.Mark FROM Students s JOIN Enrolments e ON e.StudentID=s.StudentID JOIN Courses c ON c.CourseID=e.CourseID WHERE e.Mark>=75 ORDER BY s.StudentID,c.CourseID;"
    },
    "tasks": [
      {
        "prompt": "Join Students, Enrolments and Courses to show names, course names and marks of 75 or more.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "SELECT s.StudentName,c.CourseName,e.Mark FROM Students s JOIN Enrolments e ON e.StudentID=s.StudentID JOIN Courses c ON c.CourseID=e.CourseID WHERE e.Mark>=75 ORDER BY s.StudentID,c.CourseID;",
        "title": "Apply the concept"
      },
      {
        "title": "Repair a missing join predicate",
        "prompt": "A query uses Students s CROSS JOIN Enrolments e but is intended to show each student with their own marks. Replace it with the correct join and explain the row multiplication.",
        "hint": "The foreign key is Enrolments.StudentID.",
        "solution": "SELECT s.StudentName,e.CourseID,e.Mark FROM Students s INNER JOIN Enrolments e ON e.StudentID=s.StudentID ORDER BY s.StudentID,e.CourseID; The original multiplies 20 students by 40 enrolments into 800 rows, while the intended join has 40 original-demo rows.",
        "revision": "practical-2"
      },
      {
        "title": "Join learners to their marks",
        "prompt": "Return StudentName, CourseID and Mark for every enrolment, sorted by StudentID then CourseID.",
        "hint": "Qualify StudentID using the student alias.",
        "solution": "SELECT s.StudentName,e.CourseID,e.Mark FROM Students s JOIN Enrolments e ON e.StudentID=s.StudentID ORDER BY s.StudentID,e.CourseID;",
        "sqlChallenge": "join",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Twenty students each have two matching enrolments. How many inner-join rows result?",
        "options": [
          "40",
          "20",
          "80"
        ],
        "answer": 0,
        "explanation": "Each student matches two enrolment rows, giving 20 times 2 rows."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Every example creates a new SQL Server instance in the browser.",
          "40 rows on the college demo because each of 20 students has two enrolments.",
          "All source tables are permanently removed by every example."
        ],
        "answer": 1,
        "explanation": "40 rows on the college demo because each of 20 students has two enrolments."
      }
    ],
    "sampleCode": "SELECT s.StudentName, e.CourseID, e.Mark\nFROM Students AS s\nINNER JOIN Enrolments AS e ON e.StudentID=s.StudentID\nORDER BY s.StudentID, e.CourseID;",
    "environment": "browser",
    "diagram": null,
    "sql": null,
    "download": "intermediate-3-1.sql"
  },
  {
    "id": "intermediate-3-2",
    "unit": 103,
    "title": "Outer joins, CROSS JOIN and self joins",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "LEFT JOIN preserves every left row; RIGHT JOIN preserves right rows; FULL OUTER JOIN preserves both sides. Unmatched columns become NULL. A right-side WHERE condition can accidentally remove unmatched rows from a left join: place a match condition in ON when preserving the left side is intended. CROSS JOIN deliberately makes every combination. A self join uses two aliases for the same table."
      },
      {
        "heading": "Where this example runs",
        "text": "This example uses the college demo or disposable practice tables and the documented portable SQL subset. Run query examples in the SQL workspace, compare the result and reset the data before repeating schema changes."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Every student appears at least once, with NULL on the enrolment side if there is no qualifying mark."
      }
    ],
    "example": {
      "title": "Outer joins, CROSS JOIN and self joins",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Every student appears at least once, with NULL on the enrolment side if there is no qualifying mark."
    },
    "task": {
      "prompt": "How many rows does CROSS JOIN create for 20 students and 4 courses? Write a self join listing same-city student pairs once each.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "The cross join creates 80 rows. SELECT a.StudentName,b.StudentName FROM Students a JOIN Students b ON a.City=b.City AND a.StudentID<b.StudentID ORDER BY a.StudentID,b.StudentID; The inequality prevents self-pairs and mirrored duplicates."
    },
    "tasks": [
      {
        "prompt": "How many rows does CROSS JOIN create for 20 students and 4 courses? Write a self join listing same-city student pairs once each.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "The cross join creates 80 rows. SELECT a.StudentName,b.StudentName FROM Students a JOIN Students b ON a.City=b.City AND a.StudentID<b.StudentID ORDER BY a.StudentID,b.StudentID; The inequality prevents self-pairs and mirrored duplicates.",
        "title": "Apply the concept"
      },
      {
        "title": "Keep unmatched students",
        "prompt": "Why does SELECT s.StudentID,e.Mark FROM Students s LEFT JOIN Enrolments e ON e.StudentID=s.StudentID WHERE e.Mark>=80; lose students without high marks? Correct it while keeping every student.",
        "hint": "A WHERE predicate on the child removes the NULL-extended rows.",
        "solution": "SELECT s.StudentID,e.Mark FROM Students s LEFT JOIN Enrolments e ON e.StudentID=s.StudentID AND e.Mark>=80 ORDER BY s.StudentID,e.EnrolmentID; The qualification belongs in ON when unmatched students must remain.",
        "revision": "practical-2"
      },
      {
        "title": "Find same-city pairs once",
        "prompt": "Return FirstID, SecondID and City for student pairs in the same city, with the smaller student ID first. Sort by FirstID then SecondID.",
        "hint": "Use two aliases and an inequality.",
        "solution": "SELECT a.StudentID AS FirstID,b.StudentID AS SecondID,a.City FROM Students a JOIN Students b ON a.City=b.City AND a.StudentID<b.StudentID ORDER BY a.StudentID,b.StudentID;",
        "sqlChallenge": "expanded-self",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "How many candidate pairs arise from 20 students CROSS JOIN 4 courses?",
        "options": [
          "40",
          "80",
          "24"
        ],
        "answer": 1,
        "explanation": "A Cartesian product multiplies the two row counts."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser.",
          "Every student appears at least once, with NULL on the enrolment side if there is no qualifying mark."
        ],
        "answer": 2,
        "explanation": "Every student appears at least once, with NULL on the enrolment side if there is no qualifying mark."
      }
    ],
    "sampleCode": "SELECT s.StudentID, s.StudentName, e.Mark\nFROM Students s LEFT JOIN Enrolments e\n ON e.StudentID=s.StudentID AND e.Mark>=80\nORDER BY s.StudentID, e.EnrolmentID;",
    "environment": "browser",
    "diagram": null,
    "sql": null,
    "moreExamples": [
      {
        "title": "RIGHT and FULL OUTER JOIN with unmatched rows",
        "code": "CREATE TABLE PracticeLeft(ID INT PRIMARY KEY);\nCREATE TABLE PracticeRight(ID INT PRIMARY KEY);\nINSERT INTO PracticeLeft VALUES(1),(2);\nINSERT INTO PracticeRight VALUES(2),(3);\nSELECT l.ID AS LeftID,r.ID AS RightID FROM PracticeLeft l RIGHT JOIN PracticeRight r ON l.ID=r.ID ORDER BY r.ID;\nSELECT l.ID AS LeftID,r.ID AS RightID FROM PracticeLeft l FULL OUTER JOIN PracticeRight r ON l.ID=r.ID ORDER BY COALESCE(l.ID,r.ID);\nDROP TABLE PracticeLeft;\nDROP TABLE PracticeRight;",
        "reason": "RIGHT JOIN returns (2,2) and (NULL,3). FULL JOIN returns (1,NULL), (2,2), (NULL,3). Disposable tables are removed at the end.",
        "environment": "native"
      }
    ],
    "download": "intermediate-3-2.sql"
  },
  {
    "id": "intermediate-3-3",
    "unit": 103,
    "title": "UNION and UNION ALL",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "UNION combines compatible result sets and removes duplicate whole rows. UNION ALL retains duplicates and usually avoids duplicate elimination work. Both branches need the same number of columns with compatible types; result column names come from the first query. An ORDER BY for the combined result goes at the end. A join combines columns using relationships; a union stacks rows."
      },
      {
        "heading": "Where this example runs",
        "text": "This example uses the college demo or disposable practice tables and the documented portable SQL subset. Run query examples in the SQL workspace, compare the result and reset the data before repeating schema changes."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. The four demo cities appear once each. Replacing UNION with UNION ALL returns 20 rows."
      }
    ],
    "example": {
      "title": "UNION and UNION ALL",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "The four demo cities appear once each. Replacing UNION with UNION ALL returns 20 rows."
    },
    "task": {
      "prompt": "Combine the student IDs from course 1 and course 2, first retaining duplicates and then removing them. Explain the difference.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "SELECT StudentID FROM Enrolments WHERE CourseID=1 UNION ALL SELECT StudentID FROM Enrolments WHERE CourseID=2; Change UNION ALL to UNION to return each matching student once. A student in both courses appears twice with ALL."
    },
    "tasks": [
      {
        "prompt": "Combine the student IDs from course 1 and course 2, first retaining duplicates and then removing them. Explain the difference.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "SELECT StudentID FROM Enrolments WHERE CourseID=1 UNION ALL SELECT StudentID FROM Enrolments WHERE CourseID=2; Change UNION ALL to UNION to return each matching student once. A student in both courses appears twice with ALL.",
        "title": "Apply the concept"
      },
      {
        "title": "Fix UNION column compatibility",
        "prompt": "Repair SELECT StudentID,StudentName FROM Students UNION SELECT CourseID FROM Courses;. Explain whether the repaired result has meaningful semantics.",
        "hint": "Both branches need the same number of compatible columns.",
        "solution": "A syntactic repair is SELECT StudentID AS ID,StudentName AS Label FROM Students UNION SELECT CourseID,CourseName FROM Courses;. Student and course IDs refer to different entities, so add a source label or keep separate result sets when consumers need to distinguish them.",
        "revision": "practical-2"
      },
      {
        "title": "Keep duplicate city occurrences",
        "prompt": "Combine cities from students younger than 22 and students aged at least 22, retaining duplicate occurrences and sorting by City.",
        "hint": "Use UNION ALL rather than UNION.",
        "solution": "SELECT City FROM Students WHERE Age<22 UNION ALL SELECT City FROM Students WHERE Age>=22 ORDER BY City;",
        "sqlChallenge": "expanded-union-all",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Which operation retains duplicates when stacking result rows?",
        "options": [
          "UNION",
          "INNER JOIN",
          "UNION ALL"
        ],
        "answer": 2,
        "explanation": "UNION ALL retains duplicates; UNION removes duplicate complete result rows."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "The four demo cities appear once each. Replacing UNION with UNION ALL returns 20 rows.",
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser."
        ],
        "answer": 0,
        "explanation": "The four demo cities appear once each. Replacing UNION with UNION ALL returns 20 rows."
      }
    ],
    "sampleCode": "SELECT City FROM Students WHERE Age<22\nUNION\nSELECT City FROM Students WHERE Age>=22\nORDER BY City;",
    "environment": "browser",
    "diagram": null,
    "sql": null,
    "download": "intermediate-3-3.sql"
  },
  {
    "id": "intermediate-4-1",
    "unit": 104,
    "title": "Schemas, databases and data types",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "A schema is a namespace and securable container inside a database. CREATE DATABASE makes a database, not a table or schema. Use INT for suitable whole-number IDs, NVARCHAR for Unicode names, DECIMAL for exact currency and DATE for dates without time. Choose precision, length and nullability from business rules. FLOAT is approximate and is generally unsuitable for exact monetary totals."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Creates a dedicated practice database, schema and table in native SQL Server. Run once with appropriate permissions; use a new empty practice database."
      }
    ],
    "example": {
      "title": "Schemas, databases and data types",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Creates a dedicated practice database, schema and table in native SQL Server. Run once with appropriate permissions; use a new empty practice database."
    },
    "task": {
      "prompt": "Choose types for a learner name, birth date, price and telephone number. Explain why a phone number should not normally be INT.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "Use NVARCHAR(100), DATE, DECIMAL(10,2) and VARCHAR(25), adjusting lengths to requirements. A phone number is an identifier with possible leading zeros, + signs and formatting; arithmetic is not meaningful."
    },
    "tasks": [
      {
        "prompt": "Choose types for a learner name, birth date, price and telephone number. Explain why a phone number should not normally be INT.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "Use NVARCHAR(100), DATE, DECIMAL(10,2) and VARCHAR(25), adjusting lengths to requirements. A phone number is an identifier with possible leading zeros, + signs and formatting; arithmetic is not meaningful.",
        "title": "Apply the concept"
      },
      {
        "title": "Choose types that preserve meaning",
        "prompt": "A proposed table uses Phone INT, Price FLOAT and LearnerName VARCHAR(5). Identify three risks and propose suitable SQL Server types.",
        "hint": "Phone numbers are identifiers and currency needs exact arithmetic.",
        "solution": "Use VARCHAR(25) for formatted phone identifiers, DECIMAL(10,2) for exact prices, and appropriately sized NVARCHAR such as NVARCHAR(100) for Unicode names. Confirm lengths and price ranges from actual business requirements.",
        "revision": "practical-2"
      },
      {
        "title": "Create an assessment structure in SSMS",
        "prompt": "Create teaching.PracticeTests with TestID primary key, Unicode Title up to 100 characters, optional DueDate and required Weight between 0 and 100. Assume teaching already exists.",
        "hint": "Combine a data type, nullability and CHECK; each has a different job.",
        "solution": "CREATE TABLE teaching.PracticeTests(TestID INT PRIMARY KEY,Title NVARCHAR(100) NOT NULL,DueDate DATE NULL,Weight DECIMAL(5,2) NOT NULL CHECK(Weight BETWEEN 0 AND 100));",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Which type suits exact currency with two decimal places?",
        "options": [
          "DECIMAL(10,2)",
          "FLOAT",
          "DATE"
        ],
        "answer": 0,
        "explanation": "DECIMAL stores a fixed scale and precision; FLOAT is approximate."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Every example creates a new SQL Server instance in the browser.",
          "Creates a dedicated practice database, schema and table in native SQL Server. Run once with appropriate permissions; use a new empty practice database.",
          "All source tables are permanently removed by every example."
        ],
        "answer": 1,
        "explanation": "Creates a dedicated practice database, schema and table in native SQL Server. Run once with appropriate permissions; use a new empty practice database."
      }
    ],
    "sampleCode": "USE master;\nGO\nCREATE DATABASE StudyLabPractice;\nGO\nUSE StudyLabPractice;\nGO\nCREATE SCHEMA teaching;\nGO\nCREATE TABLE teaching.Assessments (\n AssessmentID INT PRIMARY KEY,\n Title NVARCHAR(100) NOT NULL,\n DueDate DATE NULL, Weight DECIMAL(5,2) NOT NULL\n);",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "download": "intermediate-4-1.sql"
  },
  {
    "id": "intermediate-4-2",
    "unit": 104,
    "title": "ALTER, DROP and change planning",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "ALTER changes a definition; DROP removes an object. DELETE removes rows and leaves the table. Before a type or nullability change, inspect existing values and dependent views, constraints and applications. A narrowing conversion may lose data or fail. Script and review changes, test a restore path and deploy migrations deliberately. Browser SQLite supports a smaller ALTER subset than SQL Server."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Native SQL Server creates a disposable table, adds a column, widens a name column and removes the table."
      }
    ],
    "example": {
      "title": "ALTER, DROP and change planning",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Native SQL Server creates a disposable table, adds a column, widens a name column and removes the table."
    },
    "task": {
      "prompt": "Write a safe plan to make an existing Email column NOT NULL. What must happen before ALTER COLUMN?",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "Find NULL emails, resolve them using a documented business rule, check length and duplicates if uniqueness is also required, test dependent code and back up. Then run ALTER TABLE with the existing type and NOT NULL in a controlled migration."
    },
    "tasks": [
      {
        "prompt": "Write a safe plan to make an existing Email column NOT NULL. What must happen before ALTER COLUMN?",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "Find NULL emails, resolve them using a documented business rule, check length and duplicates if uniqueness is also required, test dependent code and back up. Then run ALTER TABLE with the existing type and NOT NULL in a controlled migration.",
        "title": "Apply the concept"
      },
      {
        "title": "Distinguish DELETE and DROP",
        "prompt": "A learner uses DROP TABLE Students WHERE StudentID=99; to delete one test row. Correct it and explain why dependencies still matter.",
        "hint": "DROP changes schema; DELETE changes rows.",
        "solution": "DELETE FROM Students WHERE StudentID=99; DROP TABLE does not accept this row filter and would remove the whole table definition. Preview the row, inspect dependent enrolments and let referential rules prevent orphan data.",
        "revision": "practical-2"
      },
      {
        "title": "Add a column and inspect NULL",
        "prompt": "Create PracticeRooms with RoomID integer primary key. Add nullable Capacity, insert RoomID 1 only and display the table.",
        "hint": "Use simple ALTER TABLE ADD.",
        "solution": "CREATE TABLE PracticeRooms(RoomID INTEGER PRIMARY KEY); ALTER TABLE PracticeRooms ADD Capacity INTEGER; INSERT INTO PracticeRooms(RoomID) VALUES(1); SELECT * FROM PracticeRooms;",
        "sqlChallenge": "expanded-alter-demo",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Which statement removes a table definition?",
        "options": [
          "SELECT DISTINCT",
          "DROP TABLE",
          "DELETE FROM"
        ],
        "answer": 1,
        "explanation": "DROP removes an object; DELETE removes rows while retaining its definition."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser.",
          "Native SQL Server creates a disposable table, adds a column, widens a name column and removes the table."
        ],
        "answer": 2,
        "explanation": "Native SQL Server creates a disposable table, adds a column, widens a name column and removes the table."
      }
    ],
    "sampleCode": "CREATE TABLE PracticeRooms (RoomID INT PRIMARY KEY, RoomName NVARCHAR(60) NOT NULL);\nALTER TABLE PracticeRooms ADD Capacity INT NULL;\nALTER TABLE PracticeRooms ALTER COLUMN RoomName NVARCHAR(100) NOT NULL;\nSELECT * FROM PracticeRooms;\nDROP TABLE PracticeRooms;",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "moreExamples": [
      {
        "title": "Preview a destructive change",
        "code": "SELECT StudentID,StudentName FROM Students WHERE StudentID=99;\n-- Confirm the intended row and dependent records before DELETE.\n-- DELETE FROM Students WHERE StudentID=99;",
        "reason": "The original demo returns no student 99, so there is nothing to delete. A missing row is a useful check, not a query failure.",
        "environment": "browser"
      }
    ],
    "download": "intermediate-4-2.sql"
  },
  {
    "id": "intermediate-4-3",
    "unit": 104,
    "title": "SSMS design view and generated scripts",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "In SSMS, connect to the intended instance, expand Databases and use New Database for a practice database. Under its Tables node choose New Table, enter columns, types and nullability, set the primary key and save with a clear name. Menus vary by SSMS version. A graphical designer is another interface to schema changes; it does not remove the need for keys, permissions, review or backups."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Shows the saved column definitions. In Object Explorer, Script Table as > CREATE To > New Query Editor Window generates reviewable SQL."
      }
    ],
    "example": {
      "title": "SSMS design view and generated scripts",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Shows the saved column definitions. In Object Explorer, Script Table as > CREATE To > New Query Editor Window generates reviewable SQL."
    },
    "task": {
      "prompt": "Create an Assessments table in design view and generate its CREATE script. State five things to compare against your model.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "Check the target database and schema, every column name and type, required/optional nullability, primary/unique keys, and all CHECK/default/foreign-key definitions. Save the reviewed script and test it in an empty practice database."
    },
    "tasks": [
      {
        "prompt": "Create an Assessments table in design view and generate its CREATE script. State five things to compare against your model.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "Check the target database and schema, every column name and type, required/optional nullability, primary/unique keys, and all CHECK/default/foreign-key definitions. Save the reviewed script and test it in an empty practice database.",
        "title": "Apply the concept"
      },
      {
        "title": "Review a generated script",
        "prompt": "A designer generated a CREATE script in the wrong database and left StudentNumber nullable and nonunique. Identify the missing review checks before running it elsewhere.",
        "hint": "The designer does not infer the business rules.",
        "solution": "Verify target database/schema, StudentNumber type and length, NOT NULL, UNIQUE and the primary key. Review all foreign keys and CHECK/default rules. Test the corrected script in an empty practice database and compare metadata with the approved design.",
        "revision": "practical-2"
      },
      {
        "title": "Compare designer and metadata",
        "prompt": "After creating Students in SSMS, write a native query listing its column names, data types and nullability in ordinal order.",
        "hint": "Use INFORMATION_SCHEMA.COLUMNS and constrain the schema.",
        "solution": "SELECT COLUMN_NAME,DATA_TYPE,IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='dbo' AND TABLE_NAME='Students' ORDER BY ORDINAL_POSITION; Compare this with the design view and generated script.",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "What should be reviewed in a generated CREATE script?",
        "options": [
          "Only the file name",
          "Only the first SELECT result",
          "Types, keys, constraints, nullability and target schema"
        ],
        "answer": 2,
        "explanation": "The generated script must implement the complete model in the intended database."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Shows the saved column definitions. In Object Explorer, Script Table as > CREATE To > New Query Editor Window generates reviewable SQL.",
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser."
        ],
        "answer": 0,
        "explanation": "Shows the saved column definitions. In Object Explorer, Script Table as > CREATE To > New Query Editor Window generates reviewable SQL."
      }
    ],
    "sampleCode": "-- Inspect the created table in native SQL Server\nSELECT TABLE_SCHEMA,TABLE_NAME,COLUMN_NAME,DATA_TYPE,IS_NULLABLE\nFROM INFORMATION_SCHEMA.COLUMNS\nWHERE TABLE_NAME='Assessments'\nORDER BY ORDINAL_POSITION;",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "download": "intermediate-4-3.sql"
  },
  {
    "id": "intermediate-5-1",
    "unit": 105,
    "title": "Entity integrity and named constraints",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "PRIMARY KEY makes a row identifiable and is unique and non-NULL. UNIQUE enforces a candidate identifier. NOT NULL requires a value. CHECK tests a predicate; in SQL Server a CHECK accepts UNKNOWN, so combine it with NOT NULL when a value is required. DEFAULT supplies an omitted value rather than validating every supplied value. Use descriptive constraint names such as CK_PracticeScores_Mark."
      },
      {
        "heading": "Where this example runs",
        "text": "This example uses the college demo or disposable practice tables and the documented portable SQL subset. Run query examples in the SQL workspace, compare the result and reset the data before repeating schema changes."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. One valid row with default status Pending. Reusing the key or email fails; a mark of 101 fails. Reset before rerunning CREATE."
      }
    ],
    "example": {
      "title": "Entity integrity and named constraints",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "One valid row with default status Pending. Reusing the key or email fails; a mark of 101 fails. Reset before rerunning CREATE."
    },
    "task": {
      "prompt": "Explain why CHECK(Mark BETWEEN 0 AND 100) alone does not require a mark and why a default does not forbid other values.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "NULL produces UNKNOWN in the CHECK predicate and is accepted unless NOT NULL is added. DEFAULT is used when the column is omitted or DEFAULT is specified; an explicit supplied status is accepted unless another constraint rejects it."
    },
    "tasks": [
      {
        "prompt": "Explain why CHECK(Mark BETWEEN 0 AND 100) alone does not require a mark and why a default does not forbid other values.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "NULL produces UNKNOWN in the CHECK predicate and is accepted unless NOT NULL is added. DEFAULT is used when the column is omitted or DEFAULT is specified; an explicit supplied status is accepted unless another constraint rejects it.",
        "title": "Apply the concept"
      },
      {
        "title": "Reject missing marks deliberately",
        "prompt": "A required mark is defined as Mark INT CHECK(Mark BETWEEN 0 AND 100). Explain why NULL is accepted and correct the definition.",
        "hint": "A CHECK accepts UNKNOWN, while NOT NULL has a separate purpose.",
        "solution": "Mark INT NOT NULL CONSTRAINT CK_PracticeScores_Mark CHECK(Mark BETWEEN 0 AND 100). CHECK alone accepts the unknown result produced by NULL in SQL Server; NOT NULL enforces presence.",
        "revision": "practical-2"
      },
      {
        "title": "Demonstrate a default",
        "prompt": "Create PracticeFlags with integer FlagID primary key, required Label VARCHAR(30), and required Status VARCHAR(10) defaulting to Open. Insert flag 1 labelled Review SQL without supplying Status, then display it.",
        "hint": "Omit Status from the insert column list.",
        "solution": "CREATE TABLE PracticeFlags(FlagID INTEGER PRIMARY KEY,Label VARCHAR(30) NOT NULL,Status VARCHAR(10) NOT NULL DEFAULT 'Open'); INSERT INTO PracticeFlags(FlagID,Label) VALUES(1,'Review SQL'); SELECT * FROM PracticeFlags;",
        "sqlChallenge": "expanded-default-demo",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Does CHECK(Mark BETWEEN 0 AND 100) alone forbid NULL?",
        "options": [
          "No; add NOT NULL when a mark is required",
          "Yes, every CHECK rejects NULL",
          "Only if the table has an index"
        ],
        "answer": 0,
        "explanation": "CHECK accepts UNKNOWN in SQL Server; NULL often makes the predicate unknown."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Every example creates a new SQL Server instance in the browser.",
          "One valid row with default status Pending. Reusing the key or email fails; a mark of 101 fails. Reset before rerunning CREATE.",
          "All source tables are permanently removed by every example."
        ],
        "answer": 1,
        "explanation": "One valid row with default status Pending. Reusing the key or email fails; a mark of 101 fails. Reset before rerunning CREATE."
      }
    ],
    "sampleCode": "CREATE TABLE PracticeScores (\n ScoreID INT CONSTRAINT PK_PracticeScores PRIMARY KEY,\n Email VARCHAR(120) NOT NULL CONSTRAINT UQ_PracticeScores_Email UNIQUE,\n Mark INT NOT NULL CONSTRAINT CK_PracticeScores_Mark CHECK(Mark BETWEEN 0 AND 100),\n Status VARCHAR(12) NOT NULL CONSTRAINT DF_PracticeScores_Status DEFAULT 'Pending'\n);\nINSERT INTO PracticeScores(ScoreID,Email,Mark) VALUES(1,'test@example.com',70);\nSELECT * FROM PracticeScores;",
    "environment": "browser",
    "diagram": null,
    "sql": null,
    "download": "intermediate-5-1.sql"
  },
  {
    "id": "intermediate-5-2",
    "unit": 105,
    "title": "Foreign keys and referential actions",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "A foreign key enforces that each non-NULL child reference matches an existing parent key. NO ACTION rejects a violating parent change; CASCADE propagates a change or deletion. SET NULL needs nullable child columns. SET DEFAULT needs a default that still satisfies the foreign key, unless it is NULL and NULL is allowed. Select the action from business rules rather than convenience; deleting history through a cascade may be inappropriate."
      },
      {
        "heading": "Where this example runs",
        "text": "This example uses the college demo or disposable practice tables and the documented portable SQL subset. Run query examples in the SQL workspace, compare the result and reset the data before repeating schema changes."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Child 10 remains with ParentID NULL. The child is preserved while its optional link is removed."
      }
    ],
    "example": {
      "title": "Foreign keys and referential actions",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Child 10 remains with ParentID NULL. The child is preserved while its optional link is removed."
    },
    "task": {
      "prompt": "Choose referential actions for financial invoices and optional staff assignment. Explain both choices.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "Keep invoices using NO ACTION or a deliberate archival policy; do not casually cascade-delete financial history. Optional assignment can use SET NULL when a staff record is removed, provided the foreign key column is nullable and business history is retained separately."
    },
    "tasks": [
      {
        "prompt": "Choose referential actions for financial invoices and optional staff assignment. Explain both choices.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "Keep invoices using NO ACTION or a deliberate archival policy; do not casually cascade-delete financial history. Optional assignment can use SET NULL when a staff record is removed, provided the foreign key column is nullable and business history is retained separately.",
        "title": "Apply the concept"
      },
      {
        "title": "Find an invalid referential action",
        "prompt": "A child FK is NOT NULL but specifies ON DELETE SET NULL. Explain why the design conflicts and propose two valid policies.",
        "hint": "An automatic action must satisfy the child constraints.",
        "solution": "Make the child reference nullable if an unassigned child is meaningful, or use NO ACTION to prevent deleting a referenced parent. Choose from the business rule; do not remove integrity checks merely to make a delete succeed.",
        "revision": "practical-2"
      },
      {
        "title": "Preserve an optional child",
        "prompt": "Create PracticeParents(ParentID primary key) and PracticeChildren(ChildID primary key, nullable ParentID FK). Use ON DELETE SET NULL, insert parent 1 and child 10, delete the parent and show the child.",
        "hint": "Enable referential integrity; the child must remain with a NULL link.",
        "solution": "CREATE TABLE PracticeParents(ParentID INTEGER PRIMARY KEY); CREATE TABLE PracticeChildren(ChildID INTEGER PRIMARY KEY,ParentID INTEGER REFERENCES PracticeParents(ParentID) ON DELETE SET NULL); INSERT INTO PracticeParents VALUES(1); INSERT INTO PracticeChildren VALUES(10,1); DELETE FROM PracticeParents WHERE ParentID=1; SELECT * FROM PracticeChildren;",
        "sqlChallenge": "expanded-foreign-demo",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "What must a child column support for ON DELETE SET NULL?",
        "options": [
          "A primary key on that same single column",
          "NULL values",
          "A non-NULL-only constraint"
        ],
        "answer": 1,
        "explanation": "The referential action must be able to assign NULL without violating nullability."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser.",
          "Child 10 remains with ParentID NULL. The child is preserved while its optional link is removed."
        ],
        "answer": 2,
        "explanation": "Child 10 remains with ParentID NULL. The child is preserved while its optional link is removed."
      }
    ],
    "sampleCode": "CREATE TABLE PracticeParents(ParentID INT PRIMARY KEY);\nCREATE TABLE PracticeChildren(ChildID INT PRIMARY KEY,ParentID INT NULL,\n CONSTRAINT FK_PracticeChildren_Parents FOREIGN KEY(ParentID)\n REFERENCES PracticeParents(ParentID) ON DELETE SET NULL);\nINSERT INTO PracticeParents VALUES(1);\nINSERT INTO PracticeChildren VALUES(10,1);\nDELETE FROM PracticeParents WHERE ParentID=1;\nSELECT * FROM PracticeChildren;",
    "environment": "browser",
    "diagram": null,
    "sql": null,
    "download": "intermediate-5-2.sql"
  },
  {
    "id": "intermediate-5-3",
    "unit": 105,
    "title": "Add, remove and review constraints",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "Existing data must satisfy a new validated constraint. In SQL Server use ALTER TABLE ... WITH CHECK ADD CONSTRAINT to validate current rows. DROP CONSTRAINT uses the constraint name. Review dependencies before removing a key. Standalone CREATE RULE and bound defaults are legacy features; use CHECK and DEFAULT constraints for new designs. SQL Server UNIQUE nullable-column behaviour differs from SQLite: a single-column unique constraint allows at most one NULL."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Native SQL Server adds and validates the age rule, inspects it, then removes it. The original college data satisfies Age>=18."
      }
    ],
    "example": {
      "title": "Add, remove and review constraints",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Native SQL Server adds and validates the age rule, inspects it, then removes it. The original college data satisfies Age>=18."
    },
    "task": {
      "prompt": "A table contains negative prices. Can a validated CHECK(Price>=0) simply be added? Give the repair sequence.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "First identify invalid rows and agree a correction or rejection policy. Repair the data, validate the correction, then add the CHECK with validation. Avoid hiding bad data by adding an untrusted constraint just to make deployment pass."
    },
    "tasks": [
      {
        "prompt": "A table contains negative prices. Can a validated CHECK(Price>=0) simply be added? Give the repair sequence.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "First identify invalid rows and agree a correction or rejection policy. Repair the data, validate the correction, then add the CHECK with validation. Avoid hiding bad data by adding an untrusted constraint just to make deployment pass.",
        "title": "Apply the concept"
      },
      {
        "title": "Repair data before a new CHECK",
        "prompt": "A table contains Age 15, 20 and NULL. The new policy requires Age>=18 and a value. Give a migration plan without inventing replacement ages.",
        "hint": "A valid repair needs a documented source, not guessed values.",
        "solution": "Identify underage and missing records, confirm policy and authoritative values, correct or quarantine them through an agreed process, then add NOT NULL and a validated CHECK(Age>=18). Test application writes and keep a rollback/recovery plan.",
        "revision": "practical-2"
      },
      {
        "title": "Inspect trusted constraints in SSMS",
        "prompt": "Write a query returning each CHECK constraint name, disabled state and trust state for dbo.Students. Explain the trust flag.",
        "hint": "Use sys.check_constraints and OBJECT_ID.",
        "solution": "SELECT name,is_disabled,is_not_trusted FROM sys.check_constraints WHERE parent_object_id=OBJECT_ID('dbo.Students'); A trusted, enabled constraint has been validated for existing data; review and validate an untrusted constraint before relying on it.",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "What should happen before adding a validated CHECK to dirty data?",
        "options": [
          "Ignore existing rows permanently",
          "Disable all foreign keys",
          "Identify and repair invalid rows using an agreed rule"
        ],
        "answer": 2,
        "explanation": "Existing rows must satisfy the new validated constraint."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Native SQL Server adds and validates the age rule, inspects it, then removes it. The original college data satisfies Age>=18.",
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser."
        ],
        "answer": 0,
        "explanation": "Native SQL Server adds and validates the age rule, inspects it, then removes it. The original college data satisfies Age>=18."
      }
    ],
    "sampleCode": "ALTER TABLE Students WITH CHECK ADD CONSTRAINT CK_Students_Adult CHECK(Age>=18);\nSELECT name,is_disabled,is_not_trusted\nFROM sys.check_constraints WHERE parent_object_id=OBJECT_ID('Students');\nALTER TABLE Students DROP CONSTRAINT CK_Students_Adult;",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "moreExamples": [
      {
        "title": "CHECK validation and failure reasoning",
        "code": "SELECT StudentID,Age FROM Students WHERE Age<18 OR Age IS NULL;\n-- In native SQL Server, after resolving invalid rows:\n-- ALTER TABLE Students WITH CHECK ADD CONSTRAINT CK_Students_Age18 CHECK(Age>=18);",
        "reason": "The original demo returns no invalid rows. A validated constraint checks existing data; NOT NULL separately requires a value.",
        "environment": "browser"
      }
    ],
    "download": "intermediate-5-3.sql"
  },
  {
    "id": "intermediate-6-1",
    "unit": 106,
    "title": "Subqueries, EXISTS and OUTPUT",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "A scalar subquery must return at most one row; IN compares against a set; EXISTS tests whether any matching row exists. Correlated subqueries refer to an outer row. Joins and subqueries express different result intentions and may receive similar optimiser plans: neither is always faster. Compare actual plans, logical reads and representative data. SQL Server OUTPUT returns affected row values using inserted and deleted; it is not SQLite RETURNING syntax."
      },
      {
        "heading": "Where this example runs",
        "text": "This example uses the college demo or disposable practice tables and the documented portable SQL subset. Run query examples in the SQL workspace, compare the result and reset the data before repeating schema changes."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Each qualifying student appears once even when several of their marks are 80 or higher."
      },
      {
        "heading": "Scalar and set subqueries",
        "text": "Use Fee > (SELECT AVG(Fee) FROM Courses) for a scalar comparison. Use CourseID IN (SELECT CourseID FROM Courses WHERE Fee>1400) for a set comparison. A scalar subquery returning several rows fails in SQL Server. NOT IN behaves unexpectedly when the subquery contains NULL; NOT EXISTS with an explicit correlation is often easier to reason about."
      }
    ],
    "example": {
      "title": "Subqueries, EXISTS and OUTPUT",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Each qualifying student appears once even when several of their marks are 80 or higher."
    },
    "task": {
      "prompt": "Write native SQL Server OUTPUT showing old and new ages for a change to student 1.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "UPDATE Students SET Age=Age+1 OUTPUT inserted.StudentID,deleted.Age AS OldAge,inserted.Age AS NewAge WHERE StudentID=1; Run inside a practice transaction and roll back when finished. Do not treat OUTPUT rows as proof a transaction later committed."
    },
    "tasks": [
      {
        "prompt": "Write native SQL Server OUTPUT showing old and new ages for a change to student 1.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "UPDATE Students SET Age=Age+1 OUTPUT inserted.StudentID,deleted.Age AS OldAge,inserted.Age AS NewAge WHERE StudentID=1; Run inside a practice transaction and roll back when finished. Do not treat OUTPUT rows as proof a transaction later committed.",
        "title": "Apply the concept"
      },
      {
        "title": "Fix NOT IN with NULL",
        "prompt": "Explain why StudentID NOT IN (SELECT StudentID FROM OptionalLinks) can return no students when OptionalLinks contains NULL. Rewrite it using a correlation.",
        "hint": "NULL introduces UNKNOWN into the comparison.",
        "solution": "SELECT s.StudentID FROM Students s WHERE NOT EXISTS(SELECT 1 FROM OptionalLinks l WHERE l.StudentID=s.StudentID); NOT EXISTS tests for a matching row and does not let an unrelated NULL poison the set comparison. OptionalLinks is an illustrative table, not part of the demo.",
        "revision": "practical-2"
      },
      {
        "title": "Return each high-scoring student once",
        "prompt": "Return StudentID and StudentName for students with at least one mark >=80, sorted by StudentID.",
        "hint": "EXISTS avoids duplicating a student with several high marks.",
        "solution": "SELECT s.StudentID,s.StudentName FROM Students s WHERE EXISTS(SELECT 1 FROM Enrolments e WHERE e.StudentID=s.StudentID AND e.Mark>=80) ORDER BY s.StudentID;",
        "sqlChallenge": "expanded-exists",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Which predicate tests whether a related row exists without multiplying parent rows?",
        "options": [
          "EXISTS",
          "CROSS JOIN",
          "UNION ALL"
        ],
        "answer": 0,
        "explanation": "EXISTS tests for at least one matching row and retains the outer row once."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Every example creates a new SQL Server instance in the browser.",
          "Each qualifying student appears once even when several of their marks are 80 or higher.",
          "All source tables are permanently removed by every example."
        ],
        "answer": 1,
        "explanation": "Each qualifying student appears once even when several of their marks are 80 or higher."
      }
    ],
    "sampleCode": "SELECT StudentID,StudentName\nFROM Students s\nWHERE EXISTS (SELECT 1 FROM Enrolments e\n WHERE e.StudentID=s.StudentID AND e.Mark>=80)\nORDER BY StudentID;",
    "environment": "browser",
    "diagram": null,
    "sql": null,
    "moreExamples": [
      {
        "title": "OUTPUT shows before and after values",
        "code": "BEGIN TRANSACTION;\nUPDATE dbo.Students SET Age=Age+1\nOUTPUT inserted.StudentID,deleted.Age AS OldAge,inserted.Age AS NewAge\nWHERE StudentID=1;\nROLLBACK TRANSACTION;",
        "reason": "Student 1 shows the old and incremented age, then the practice change is rolled back. OUTPUT rows do not establish that a transaction committed.",
        "environment": "native"
      }
    ],
    "download": "intermediate-6-1.sql"
  },
  {
    "id": "intermediate-6-2",
    "unit": 106,
    "title": "Normalisation with dependency reasoning",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "State candidate keys and functional dependencies before splitting tables. 1NF removes repeating groups and uses single values within each field domain. 2NF removes dependencies of nonprime attributes on a proper subset of any candidate key. 3NF requires each nontrivial dependency X -> A to have a superkey determinant or a prime right-hand attribute. In simple teaching designs, remove non-key-to-non-key transitive dependencies. Normalisation is driven by rules, not coincidental sample values."
      },
      {
        "heading": "Where this example runs",
        "text": "This is design notation for reasoning about tables, keys and dependencies. It is not an executable SQL script. Translate it into CREATE TABLE statements only after confirming the stated business rules."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Moving order and product attributes removes partial dependencies; moving customer name removes the transitive dependency. The composite line key remains."
      }
    ],
    "example": {
      "title": "Normalisation with dependency reasoning",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Moving order and product attributes removes partial dependencies; moving customer name removes the transitive dependency. The composite line key remains."
    },
    "task": {
      "prompt": "Normalise Enrolment(StudentID,CourseID,StudentName,CourseName,LecturerID,LecturerName,Mark). Assume one lecturer per course.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "Key is (StudentID,CourseID). StudentID determines StudentName; CourseID determines CourseName,LecturerID; LecturerID determines LecturerName; the whole key determines Mark. Use Students, Lecturers, Courses(CourseID,CourseName,LecturerID FK), Enrolments(StudentID PK/FK,CourseID PK/FK,Mark)."
    },
    "tasks": [
      {
        "prompt": "Normalise Enrolment(StudentID,CourseID,StudentName,CourseName,LecturerID,LecturerName,Mark). Assume one lecturer per course.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "Key is (StudentID,CourseID). StudentID determines StudentName; CourseID determines CourseName,LecturerID; LecturerID determines LecturerName; the whole key determines Mark. Use Students, Lecturers, Courses(CourseID,CourseName,LecturerID FK), Enrolments(StudentID PK/FK,CourseID PK/FK,Mark).",
        "title": "Apply the concept"
      },
      {
        "title": "Identify a missing 3NF split",
        "prompt": "A proposed 2NF design has Orders(OrderID,CustomerID,CustomerName), Products and OrderLines. State the remaining dependency and complete 3NF.",
        "hint": "CustomerName describes the customer, not an independent fact about an order.",
        "solution": "OrderID -> CustomerID -> CustomerName is transitive under the stated rules. Create Customers(CustomerID PK,CustomerName) and keep Orders(OrderID PK,CustomerID FK,...). Products and OrderLines remain as previously decomposed.",
        "revision": "practical-2"
      },
      {
        "title": "Normalise a booking relation",
        "prompt": "Normalise Booking(MemberID,SessionID,MemberName,SessionTitle,RoomID,RoomName) where the key is (MemberID,SessionID), a session uses one room and each room has one name.",
        "hint": "Identify partial dependencies before removing the room-name transitive dependency.",
        "solution": "Members(MemberID PK,MemberName); Rooms(RoomID PK,RoomName); Sessions(SessionID PK,SessionTitle,RoomID FK); Bookings(MemberID PK/FK,SessionID PK/FK). MemberName and session facts are partial dependencies; SessionID -> RoomID -> RoomName is transitive.",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Which dependency is partial for key (OrderID, ProductID)?",
        "options": [
          "A dependency on no attribute at all",
          "ProductID -> ProductName",
          "(OrderID,ProductID) -> Quantity"
        ],
        "answer": 1,
        "explanation": "ProductName depends on only one proper subset of the composite key."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser.",
          "Moving order and product attributes removes partial dependencies; moving customer name removes the transitive dependency. The composite line key remains."
        ],
        "answer": 2,
        "explanation": "Moving order and product attributes removes partial dependencies; moving customer name removes the transitive dependency. The composite line key remains."
      }
    ],
    "sampleCode": "Original: OrderLine(OrderID,ProductID,OrderDate,CustomerID,CustomerName,ProductName,Quantity)\nKey: (OrderID,ProductID)\nOrderID -> OrderDate,CustomerID\nCustomerID -> CustomerName\nProductID -> ProductName\n(OrderID,ProductID) -> Quantity\n3NF: Customers(CustomerID PK,CustomerName)\nOrders(OrderID PK,OrderDate,CustomerID FK)\nProducts(ProductID PK,ProductName)\nOrderLines(OrderID PK/FK,ProductID PK/FK,Quantity)",
    "environment": "design",
    "diagram": "normal",
    "sql": null,
    "download": "intermediate-6-2.txt"
  },
  {
    "id": "intermediate-6-3",
    "unit": 106,
    "title": "ERDs, object properties and denormalisation",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "Resolve a many-to-many relationship through an associative table with two foreign keys and a uniqueness rule on the pair when repeat membership is forbidden. Set cardinality and optionality from business rules. In SSMS inspect table Properties, Columns, Keys and Constraints; Database Diagrams availability and permissions vary. Denormalisation deliberately duplicates or precomputes facts for a measured workload and requires a consistency strategy."
      },
      {
        "heading": "Where this example runs",
        "text": "This is design notation for reasoning about tables, keys and dependencies. It is not an executable SQL script. Translate it into CREATE TABLE statements only after confirming the stated business rules."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Each enrolment has one student and course. An unmarked assessment may be NULL, while values outside 0..100 are rejected."
      }
    ],
    "example": {
      "title": "ERDs, object properties and denormalisation",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Each enrolment has one student and course. An unmarked assessment may be NULL, while values outside 0..100 are rejected."
    },
    "task": {
      "prompt": "A dashboard is slow. Should you immediately copy course names and totals into every student row? Propose an evidence-based alternative.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "Measure the query and execution plan first; improve appropriate indexes or query shape. If precomputed summary data is justified, define refresh timing, source of truth and reconciliation. Copying names everywhere introduces update anomalies without proving a speed benefit."
    },
    "tasks": [
      {
        "prompt": "A dashboard is slow. Should you immediately copy course names and totals into every student row? Propose an evidence-based alternative.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "Measure the query and execution plan first; improve appropriate indexes or query shape. If precomputed summary data is justified, define refresh timing, source of truth and reconciliation. Copying names everywhere introduces update anomalies without proving a speed benefit.",
        "title": "Apply the concept"
      },
      {
        "title": "Repair an ERD assumption",
        "prompt": "A model places CourseID directly in Students although students can take several courses. Explain the data loss risk and revise the relationship.",
        "hint": "A single field cannot represent arbitrary many-to-many membership.",
        "solution": "A single CourseID either restricts each student to one course or forces repeating fields/lists. Introduce Enrolments with StudentID and CourseID foreign keys, a composite key or equivalent uniqueness rule, and Mark if it depends on that pair.",
        "revision": "practical-2"
      },
      {
        "title": "Evaluate denormalisation",
        "prompt": "A report repeats current course names and monthly enrolment totals in a summary table. Define when that is justified and a consistency policy.",
        "hint": "Measure a workload and decide which source remains authoritative.",
        "solution": "Measure the report and try suitable indexes/query changes first. If summary data is justified, retain authoritative normalised course and enrolment tables, specify refresh intervals, detect failed refreshes and reconcile summary totals. Historical names require a separate explicit history policy.",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "How is a many-to-many relationship normally implemented?",
        "options": [
          "Comma-separated IDs in one field",
          "Removal of both primary keys",
          "An associative table with foreign keys"
        ],
        "answer": 2,
        "explanation": "The associative table records each relationship occurrence and its dependent facts."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Each enrolment has one student and course. An unmarked assessment may be NULL, while values outside 0..100 are rejected.",
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser."
        ],
        "answer": 0,
        "explanation": "Each enrolment has one student and course. An unmarked assessment may be NULL, while values outside 0..100 are rejected."
      }
    ],
    "sampleCode": "Students 1 -- 0..* Enrolments 0..* -- 1 Courses\nEnrolments: StudentID PK/FK, CourseID PK/FK, Mark DECIMAL(5,2) NULL\nCHECK (Mark BETWEEN 0 AND 100)",
    "environment": "design",
    "diagram": "college",
    "sql": null,
    "download": "intermediate-6-3.txt"
  },
  {
    "id": "intermediate-7-1",
    "unit": 107,
    "title": "Storage hierarchy, scans and seeks",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "SQL Server databases use data and log files. Data pages are 8 KB and extents group eight pages; tables and indexes use allocation structures. A heap lacks a clustered index. A clustered rowstore index organises table rows at its leaf level; a nonclustered index has its own key structure and row locators. A B+ tree supports navigation through root, intermediate and leaf levels. A seek locates a range; a scan reads a broader structure. A scan can be the right plan for a large fraction of a table."
      },
      {
        "heading": "Where this example runs",
        "text": "This example uses the college demo or disposable practice tables and the documented portable SQL subset. Run query examples in the SQL workspace, compare the result and reset the data before repeating schema changes."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. A tiny table may be scanned even when an index exists. Physical index order does not guarantee SELECT result order; use ORDER BY."
      }
    ],
    "example": {
      "title": "Storage hierarchy, scans and seeks",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "A tiny table may be scanned even when an index exists. Physical index order does not guarantee SELECT result order; use ORDER BY."
    },
    "task": {
      "prompt": "Compare a clustered index, nonclustered index and heap. Why might a scan be cheaper than a seek?",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "A heap stores rows without a clustered tree; the clustered index leaf contains table rows; a nonclustered index stores keys and row locators with optional included columns. A broad query may read most rows, making one scan cheaper than many lookups."
    },
    "tasks": [
      {
        "prompt": "Compare a clustered index, nonclustered index and heap. Why might a scan be cheaper than a seek?",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "A heap stores rows without a clustered tree; the clustered index leaf contains table rows; a nonclustered index stores keys and row locators with optional included columns. A broad query may read most rows, making one scan cheaper than many lookups.",
        "title": "Apply the concept"
      },
      {
        "title": "Correct an index-order claim",
        "prompt": "A developer removes ORDER BY because Students has a clustered primary-key index. Explain why this is unsafe.",
        "hint": "An access path is not a result-order contract.",
        "solution": "SQL result order is not guaranteed without ORDER BY. The optimiser may choose another index, a parallel plan or a different access path. Keep an explicit ORDER BY with a deterministic tie-breaker when output order matters.",
        "revision": "practical-2"
      },
      {
        "title": "Choose between scan and seek",
        "prompt": "A query returns 95% of a large table but a proposed nonclustered index requires a lookup for every matching row. Explain a plan you would compare and what to measure.",
        "hint": "Many random lookups can cost more than reading a broader structure once.",
        "solution": "Compare the lookup plan with a table or clustered-index scan and, if justified, a covering index. Measure actual logical reads, elapsed time, CPU and write/storage costs on representative data rather than assuming a seek is always best.",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Is an index seek always cheaper than a scan?",
        "options": [
          "No; selectivity and lookup costs matter",
          "Yes, for every table and query",
          "Only when there is no index"
        ],
        "answer": 0,
        "explanation": "A scan may be cheaper when most of the table is required."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Every example creates a new SQL Server instance in the browser.",
          "A tiny table may be scanned even when an index exists. Physical index order does not guarantee SELECT result order; use ORDER BY.",
          "All source tables are permanently removed by every example."
        ],
        "answer": 1,
        "explanation": "A tiny table may be scanned even when an index exists. Physical index order does not guarantee SELECT result order; use ORDER BY."
      }
    ],
    "sampleCode": "SELECT StudentID,StudentName FROM Students WHERE City='Polokwane';\n-- In SSMS enable Include Actual Execution Plan before running.\n-- Compare plans and logical reads on representative data, not only 20 rows.",
    "environment": "browser",
    "diagram": null,
    "sql": null,
    "download": "intermediate-7-1.sql"
  },
  {
    "id": "intermediate-7-2",
    "unit": 107,
    "title": "Index creation, order and maintenance",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "Choose index keys for real predicates, joins and ordering. Composite key order matters: an index on (City,Age) naturally supports a City prefix. ASC/DESC can support mixed-order queries; the engine can also scan indexes backwards. INCLUDE stores extra columns at nonclustered leaf level. Each added index costs storage and write maintenance. A unique index enforces uniqueness as well as supporting access."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Native SQL Server creates a covering candidate index, runs the query and drops it. The optimiser still chooses whether to use it."
      }
    ],
    "example": {
      "title": "Index creation, order and maintenance",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Native SQL Server creates a covering candidate index, runs the query and drops it. The optimiser still chooses whether to use it."
    },
    "task": {
      "prompt": "Propose an index for enrolment lookup by CourseID ordered by Mark descending, returning StudentID. State its cost.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "CREATE INDEX IX_Enrolments_Course_Mark ON Enrolments(CourseID ASC,Mark DESC) INCLUDE(StudentID); It may reduce reads for that pattern but adds storage and work to inserts, deletes and mark changes. Verify against actual plans and workload."
    },
    "tasks": [
      {
        "prompt": "Propose an index for enrolment lookup by CourseID ordered by Mark descending, returning StudentID. State its cost.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "CREATE INDEX IX_Enrolments_Course_Mark ON Enrolments(CourseID ASC,Mark DESC) INCLUDE(StudentID); It may reduce reads for that pattern but adds storage and work to inserts, deletes and mark changes. Verify against actual plans and workload.",
        "title": "Apply the concept"
      },
      {
        "title": "Repair a mismatched DROP INDEX",
        "prompt": "An index IX_Students_City belongs to Students, but the script uses DROP INDEX IX_Students_City ON Courses;. Correct native SQL Server syntax and explain what to verify first.",
        "hint": "The ON table is part of the index identity in SQL Server.",
        "solution": "DROP INDEX IX_Students_City ON dbo.Students; Inspect metadata and dependencies first and confirm that removing the index does not remove required uniqueness enforcement or damage important query access paths.",
        "revision": "practical-2"
      },
      {
        "title": "Design a covering index in SSMS",
        "prompt": "Queries filter enrolments by CourseID, order by Mark DESC and return StudentID. Write a nonclustered index and describe one cost.",
        "hint": "Put the filter first and include the returned non-key attribute.",
        "solution": "CREATE INDEX IX_Enrolments_Course_Mark ON dbo.Enrolments(CourseID ASC,Mark DESC) INCLUDE(StudentID); It can reduce lookups for this pattern but costs storage and maintenance on writes. Verify actual plans before retaining it.",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "What is a cost of adding a nonclustered index?",
        "options": [
          "Guaranteed faster queries",
          "Additional storage and write maintenance",
          "Automatic elimination of all joins"
        ],
        "answer": 1,
        "explanation": "Indexes must be maintained as rows are inserted, updated or deleted."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser.",
          "Native SQL Server creates a covering candidate index, runs the query and drops it. The optimiser still chooses whether to use it."
        ],
        "answer": 2,
        "explanation": "Native SQL Server creates a covering candidate index, runs the query and drops it. The optimiser still chooses whether to use it."
      }
    ],
    "sampleCode": "CREATE NONCLUSTERED INDEX IX_Students_City_Age\nON Students(City ASC,Age DESC) INCLUDE(StudentName);\nSELECT StudentName,Age FROM Students WHERE City='Polokwane' ORDER BY Age DESC;\nDROP INDEX IX_Students_City_Age ON Students;",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "download": "intermediate-7-2.sql"
  },
  {
    "id": "intermediate-7-3",
    "unit": 107,
    "title": "Views and update restrictions",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "A normal view stores a query definition, not a frozen copy of its result. Views can simplify queries and expose selected columns, but access security also depends on permissions and ownership rules. A simple single-table view can often be updated; grouped, aggregate, DISTINCT and UNION results generally cannot be directly updated in the same way. WITH CHECK OPTION prevents changes through a view that make rows disappear from its filter."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Native SQL Server creates, queries, alters and drops a view. CREATE/ALTER VIEW begins its own batch."
      }
    ],
    "example": {
      "title": "Views and update restrictions",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Native SQL Server creates, queries, alters and drops a view. CREATE/ALTER VIEW begins its own batch."
    },
    "task": {
      "prompt": "Why can a grouped view returning City and COUNT(*) not simply accept an inserted student?",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "A count row does not identify the required base student attributes or one unambiguous base row to change. Insert the complete student into Students; the view result changes when queried. Use a simple filtered view when appropriate and control permissions."
    },
    "tasks": [
      {
        "prompt": "Why can a grouped view returning City and COUNT(*) not simply accept an inserted student?",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "A count row does not identify the required base student attributes or one unambiguous base row to change. Insert the complete student into Students; the view result changes when queried. Use a simple filtered view when appropriate and control permissions.",
        "title": "Apply the concept"
      },
      {
        "title": "Reject an ambiguous view update",
        "prompt": "A view groups Students by City and returns COUNT(*). A learner tries to INSERT a city and count into the view. Explain why no unique student insertion follows from that request.",
        "hint": "A summary row does not contain a full base row.",
        "solution": "The grouped row does not identify the new students, IDs or required attributes. Insert complete valid rows into Students; the aggregate view changes when queried. A simple updatable view is different from a grouped summary.",
        "revision": "practical-2"
      },
      {
        "title": "Write a filtered view in SSMS",
        "prompt": "Create dbo.PracticeAdultStudents exposing StudentID,StudentName,City,Age for Age>=18. Prevent updates through the view from making a row fall outside its filter.",
        "hint": "WITH CHECK OPTION applies the view predicate to changes through the view.",
        "solution": "CREATE VIEW dbo.PracticeAdultStudents AS\nSELECT StudentID,StudentName,City,Age FROM dbo.Students WHERE Age>=18\nWITH CHECK OPTION;\nGO\nSELECT * FROM dbo.PracticeAdultStudents ORDER BY StudentID;",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "What does a normal view normally store?",
        "options": [
          "An immutable copy of every result row",
          "A separate physical database",
          "A query definition"
        ],
        "answer": 2,
        "explanation": "The view is evaluated against its sources; indexed views are a special separate feature."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Native SQL Server creates, queries, alters and drops a view. CREATE/ALTER VIEW begins its own batch.",
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser."
        ],
        "answer": 0,
        "explanation": "Native SQL Server creates, queries, alters and drops a view. CREATE/ALTER VIEW begins its own batch."
      }
    ],
    "sampleCode": "CREATE VIEW dbo.PracticeAdultStudents AS\nSELECT StudentID,StudentName,City,Age FROM dbo.Students WHERE Age>=18\nWITH CHECK OPTION;\nGO\nSELECT * FROM dbo.PracticeAdultStudents;\nGO\nALTER VIEW dbo.PracticeAdultStudents AS\nSELECT StudentID,StudentName,City,Age FROM dbo.Students WHERE Age>=20\nWITH CHECK OPTION;\nGO\nDROP VIEW dbo.PracticeAdultStudents;",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "moreExamples": [
      {
        "title": "A simple updatable view",
        "code": "CREATE VIEW dbo.PracticeStudentCities AS SELECT StudentID,City FROM dbo.Students;\nGO\nBEGIN TRANSACTION;\nUPDATE dbo.PracticeStudentCities SET City='Practice City' WHERE StudentID=1;\nSELECT StudentID,City FROM dbo.Students WHERE StudentID=1;\nROLLBACK TRANSACTION;\nGO\nDROP VIEW dbo.PracticeStudentCities;",
        "reason": "Updating this simple view changes the underlying student row. The transaction restores the data; the disposable view is then dropped.",
        "environment": "native"
      }
    ],
    "download": "intermediate-7-3.sql"
  },
  {
    "id": "intermediate-8-1",
    "unit": 108,
    "title": "Scripts, batches and variable scope",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "A script is a saved sequence of SQL and client commands. USE chooses the database context. GO is a batch separator recognised by clients such as SSMS, not a T-SQL statement sent directly by an API. Variables are local to the batch or procedure, so a GO ends their scope. DECLARE creates a variable and SET assigns it. BEGIN/END groups statements without starting a transaction."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Native SQL Server returns students aged 21 or more if the college setup has been loaded into StudyLabPractice. @MinimumAge is unavailable in the following batch."
      }
    ],
    "example": {
      "title": "Scripts, batches and variable scope",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Native SQL Server returns students aged 21 or more if the college setup has been loaded into StudyLabPractice. @MinimumAge is unavailable in the following batch."
    },
    "task": {
      "prompt": "Explain the error in DECLARE @n INT=2; GO SELECT @n;. Correct it and describe how an application should handle GO.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "Remove GO between declaration and use, or redeclare the variable after it. GO belongs on its own line in SSMS. Applications must split batches themselves or omit GO before sending SQL commands to the server."
    },
    "tasks": [
      {
        "prompt": "Explain the error in DECLARE @n INT=2; GO SELECT @n;. Correct it and describe how an application should handle GO.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "Remove GO between declaration and use, or redeclare the variable after it. GO belongs on its own line in SSMS. Applications must split batches themselves or omit GO before sending SQL commands to the server.",
        "title": "Apply the concept"
      },
      {
        "title": "Repair variable scope",
        "prompt": "The script declares @MinimumAge, ends the batch with GO, then uses the variable. Rewrite it as one valid batch.",
        "hint": "Keep the declaration and its use in the same batch.",
        "solution": "DECLARE @MinimumAge INT=21;\nSELECT StudentID,StudentName FROM dbo.Students WHERE Age>=@MinimumAge ORDER BY StudentID;\nGO\nGO is an SSMS client separator, not a T-SQL command sent to the server by an application.",
        "revision": "practical-2"
      },
      {
        "title": "Assign and query a variable in SSMS",
        "prompt": "Declare @City VARCHAR(60), assign Polokwane with SET and select that city's StudentID and StudentName sorted by StudentID.",
        "hint": "Do not place GO between DECLARE and SELECT.",
        "solution": "DECLARE @City VARCHAR(60);\nSET @City='Polokwane';\nSELECT StudentID,StudentName FROM dbo.Students WHERE City=@City ORDER BY StudentID;",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "What happens to a local variable after GO?",
        "options": [
          "Its batch scope ends",
          "It becomes a server-wide variable",
          "Its value is automatically written to every table"
        ],
        "answer": 0,
        "explanation": "GO separates batches in clients such as SSMS; local variable scope does not cross it."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Every example creates a new SQL Server instance in the browser.",
          "Native SQL Server returns students aged 21 or more if the college setup has been loaded into StudyLabPractice. @MinimumAge is unavailable in the following batch.",
          "All source tables are permanently removed by every example."
        ],
        "answer": 1,
        "explanation": "Native SQL Server returns students aged 21 or more if the college setup has been loaded into StudyLabPractice. @MinimumAge is unavailable in the following batch."
      }
    ],
    "sampleCode": "USE StudyLabPractice;\nGO\nDECLARE @MinimumAge INT;\nSET @MinimumAge=21;\nSELECT StudentID,StudentName,Age FROM dbo.Students WHERE Age>=@MinimumAge ORDER BY StudentID;\nGO",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "download": "intermediate-8-1.sql"
  },
  {
    "id": "intermediate-8-2",
    "unit": 108,
    "title": "IF, WHILE and CASE",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "IF/ELSE chooses which statements run; BEGIN/END groups a branch. WHILE repeats statements while its condition is true: ensure the loop changes a value toward termination. CASE is an expression returning a value in SELECT, not a control-of-flow block. Use set-based queries instead of row loops where possible. EXEC invokes a procedure or dynamic batch; parameterise dynamic values rather than concatenating input."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Three labelled result sets precede the enrolment classification. NULL marks are Pending, not Fail. Requires native SQL Server for the control flow."
      }
    ],
    "example": {
      "title": "IF, WHILE and CASE",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Three labelled result sets precede the enrolment classification. NULL marks are Pending, not Fail. Requires native SQL Server for the control flow."
    },
    "task": {
      "prompt": "Write a CASE returning Distinction for marks >=75, Pass for >=50, Pending for NULL and Fail otherwise. Why is order important?",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "CASE WHEN Mark IS NULL THEN 'Pending' WHEN Mark>=75 THEN 'Distinction' WHEN Mark>=50 THEN 'Pass' ELSE 'Fail' END. CASE takes the first true branch, so placing >=50 first would hide distinctions."
    },
    "tasks": [
      {
        "prompt": "Write a CASE returning Distinction for marks >=75, Pass for >=50, Pending for NULL and Fail otherwise. Why is order important?",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "CASE WHEN Mark IS NULL THEN 'Pending' WHEN Mark>=75 THEN 'Distinction' WHEN Mark>=50 THEN 'Pass' ELSE 'Fail' END. CASE takes the first true branch, so placing >=50 first would hide distinctions.",
        "title": "Apply the concept"
      },
      {
        "title": "Fix a nonterminating loop",
        "prompt": "A WHILE @n<=3 loop prints @n but never changes it. Write a terminating native T-SQL version and predict its values.",
        "hint": "Every iteration must advance the condition toward false.",
        "solution": "DECLARE @n INT=1;\nWHILE @n<=3\nBEGIN\n SELECT @n AS Counter;\n SET @n=@n+1;\nEND;\nIt produces 1, 2 and 3, then stops.",
        "revision": "practical-2"
      },
      {
        "title": "Classify pending and passing marks",
        "prompt": "Return EnrolmentID, Mark and Result, classifying NULL as Pending, >=75 as Distinction, >=50 as Pass and the rest as Fail. Sort by EnrolmentID.",
        "hint": "CASE uses the first true branch.",
        "solution": "SELECT EnrolmentID,Mark,CASE WHEN Mark IS NULL THEN 'Pending' WHEN Mark>=75 THEN 'Distinction' WHEN Mark>=50 THEN 'Pass' ELSE 'Fail' END AS Result FROM Enrolments ORDER BY EnrolmentID;",
        "sqlChallenge": "expanded-case",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "What is CASE in a SELECT?",
        "options": [
          "A replacement for a stored procedure",
          "An expression returning a value",
          "A batch separator"
        ],
        "answer": 1,
        "explanation": "CASE evaluates branches in order and returns the value from the first true branch."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser.",
          "Three labelled result sets precede the enrolment classification. NULL marks are Pending, not Fail. Requires native SQL Server for the control flow."
        ],
        "answer": 2,
        "explanation": "Three labelled result sets precede the enrolment classification. NULL marks are Pending, not Fail. Requires native SQL Server for the control flow."
      }
    ],
    "sampleCode": "DECLARE @n INT=1;\nWHILE @n<=3\nBEGIN\n IF @n=2 SELECT 'Middle' AS Label;\n ELSE SELECT 'Edge' AS Label;\n SET @n=@n+1;\nEND;\nSELECT StudentID,Mark,CASE WHEN Mark IS NULL THEN 'Pending' WHEN Mark>=50 THEN 'Pass' ELSE 'Fail' END AS Result FROM Enrolments;",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "download": "intermediate-8-2.sql"
  },
  {
    "id": "intermediate-8-3",
    "unit": 108,
    "title": "System functions and TRY CATCH",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "@@DATEFIRST reports the session first-day-of-week setting (1 Monday through 7 Sunday). @@ROWCOUNT and @@ERROR refer to the preceding statement; capture them immediately. @@IDENTITY can return an identity generated by a trigger in another scope; SCOPE_IDENTITY() is usually safer for the current scope, while OUTPUT inserted.ID supports multirow inserts. TRY/CATCH handles many runtime errors, but same-level compilation errors and some connection-ending errors are not caught."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. The CATCH returns divide-by-zero information in native SQL Server. FirstDay reflects the current session setting."
      }
    ],
    "example": {
      "title": "System functions and TRY CATCH",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "The CATCH returns divide-by-zero information in native SQL Server. FirstDay reflects the current session setting."
    },
    "task": {
      "prompt": "Compare @@ERROR and TRY/CATCH. Explain why @@IDENTITY may not be the intended newly inserted ID.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "@@ERROR must be read immediately and describes one statement; TRY/CATCH groups error handling and exposes details through ERROR_* functions. A trigger may insert into another identity table and change @@IDENTITY; use SCOPE_IDENTITY() for the current scope or OUTPUT for all inserted IDs."
    },
    "tasks": [
      {
        "prompt": "Compare @@ERROR and TRY/CATCH. Explain why @@IDENTITY may not be the intended newly inserted ID.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "@@ERROR must be read immediately and describes one statement; TRY/CATCH groups error handling and exposes details through ERROR_* functions. A trigger may insert into another identity table and change @@IDENTITY; use SCOPE_IDENTITY() for the current scope or OUTPUT for all inserted IDs.",
        "title": "Apply the concept"
      },
      {
        "title": "Find a lost error code",
        "prompt": "Legacy code runs an UPDATE, then an unrelated SELECT, then reads @@ERROR. Explain the defect and give a better error-handling approach.",
        "hint": "Every statement can overwrite the status being inspected.",
        "solution": "Capture @@ERROR immediately after the statement being measured, before unrelated SQL. Prefer a TRY/CATCH block for grouped error handling, use ERROR_MESSAGE()/ERROR_NUMBER() in CATCH and THROW when the caller should receive the failure.",
        "revision": "practical-2"
      },
      {
        "title": "Catch a runtime arithmetic error in SSMS",
        "prompt": "Write TRY/CATCH around division by a variable containing zero. Return the error number and message rather than pretending the result is zero.",
        "hint": "Use a runtime variable and the ERROR_* functions inside CATCH.",
        "solution": "BEGIN TRY\n DECLARE @Denominator INT=0;\n SELECT 10/@Denominator AS Answer;\nEND TRY\nBEGIN CATCH\n SELECT ERROR_NUMBER() AS ErrorNumber,ERROR_MESSAGE() AS ErrorMessage;\nEND CATCH;",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Why can @@IDENTITY be misleading after an INSERT?",
        "options": [
          "It always returns zero",
          "It is identical to COUNT(*)",
          "A trigger may generate an identity in another scope"
        ],
        "answer": 2,
        "explanation": "SCOPE_IDENTITY() stays within the current scope; OUTPUT can return IDs for multiple inserted rows."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "The CATCH returns divide-by-zero information in native SQL Server. FirstDay reflects the current session setting.",
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser."
        ],
        "answer": 0,
        "explanation": "The CATCH returns divide-by-zero information in native SQL Server. FirstDay reflects the current session setting."
      }
    ],
    "sampleCode": "BEGIN TRY\n DECLARE @Zero INT=0;\n SELECT 10/@Zero AS Answer;\nEND TRY\nBEGIN CATCH\n SELECT ERROR_NUMBER() AS ErrorNumber,ERROR_MESSAGE() AS ErrorMessage;\nEND CATCH;\nSELECT @@DATEFIRST AS FirstDay;",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "moreExamples": [
      {
        "title": "Capture legacy error status immediately",
        "code": "BEGIN TRANSACTION;\nUPDATE dbo.Students SET Age=Age WHERE StudentID=-1;\nDECLARE @Err INT=@@ERROR,@Rows INT=@@ROWCOUNT;\nSELECT @Err AS ErrorCode,@Rows AS AffectedRows;\nROLLBACK TRANSACTION;",
        "reason": "No matching row is not a SQL error: ErrorCode=0 and AffectedRows=0. Capture both immediately before another statement overwrites them.",
        "environment": "native"
      }
    ],
    "download": "intermediate-8-3.sql"
  },
  {
    "id": "intermediate-9-1",
    "unit": 109,
    "title": "Create, execute, alter and drop procedures",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "A stored procedure is a named executable module stored in the database. It can accept parameters, return result sets and encapsulate related operations. Procedures can centralise logic, reduce repeated client text and support permission boundaries, but are not automatically faster or immune to injection. CREATE PROCEDURE starts a batch. ALTER changes the definition without recreating the object. Use schema-qualified names."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Native SQL Server creates a procedure and returns the five Polokwane students after loading the college setup."
      }
    ],
    "example": {
      "title": "Create, execute, alter and drop procedures",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Native SQL Server creates a procedure and returns the five Polokwane students after loading the college setup."
    },
    "task": {
      "prompt": "How do you change and remove this procedure? Give two advantages and one maintenance cost.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "Use ALTER PROCEDURE dbo.usp_StudyLabStudentsByCity with the full new definition in its own batch; use DROP PROCEDURE dbo.usp_StudyLabStudentsByCity to remove it. Benefits include reusable logic and controlled execution permissions. Costs include versioning, deployment coordination and database-specific code."
    },
    "tasks": [
      {
        "prompt": "How do you change and remove this procedure? Give two advantages and one maintenance cost.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "Use ALTER PROCEDURE dbo.usp_StudyLabStudentsByCity with the full new definition in its own batch; use DROP PROCEDURE dbo.usp_StudyLabStudentsByCity to remove it. Benefits include reusable logic and controlled execution permissions. Costs include versioning, deployment coordination and database-specific code.",
        "title": "Apply the concept"
      },
      {
        "title": "Fix unsafe dynamic SQL",
        "prompt": "A procedure builds a WHERE clause by concatenating an untrusted city string into SQL. Explain the risk and replace it with a static parameterised query.",
        "hint": "Values should remain values, not part of SQL syntax.",
        "solution": "Accept @City VARCHAR(60) and use SELECT StudentID,StudentName FROM dbo.Students WHERE City=@City;. Untrusted string concatenation can allow SQL injection; a static parameterised predicate avoids turning the city value into executable SQL. Procedures are not automatically safe if they concatenate SQL.",
        "revision": "practical-2"
      },
      {
        "title": "Create a parameterised procedure in SSMS",
        "prompt": "Create dbo.usp_StudyLabMinimumAge taking @Age INT and returning StudentID, StudentName and Age for students at least that age, ordered by StudentID. Include an EXEC example in another batch.",
        "hint": "CREATE PROCEDURE starts its own batch.",
        "solution": "CREATE PROCEDURE dbo.usp_StudyLabMinimumAge @Age INT\nAS\nBEGIN\n SET NOCOUNT ON;\n SELECT StudentID,StudentName,Age FROM dbo.Students WHERE Age>=@Age ORDER BY StudentID;\nEND;\nGO\nEXEC dbo.usp_StudyLabMinimumAge @Age=21;",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Which statement changes an existing procedure definition?",
        "options": [
          "ALTER PROCEDURE",
          "UPDATE PROCEDURE",
          "INSERT PROCEDURE"
        ],
        "answer": 0,
        "explanation": "ALTER changes the module definition; use its full replacement definition."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Every example creates a new SQL Server instance in the browser.",
          "Native SQL Server creates a procedure and returns the five Polokwane students after loading the college setup.",
          "All source tables are permanently removed by every example."
        ],
        "answer": 1,
        "explanation": "Native SQL Server creates a procedure and returns the five Polokwane students after loading the college setup."
      }
    ],
    "sampleCode": "CREATE PROCEDURE dbo.usp_StudyLabStudentsByCity @City VARCHAR(60)\nAS\nBEGIN\n SET NOCOUNT ON;\n SELECT StudentID,StudentName FROM dbo.Students WHERE City=@City ORDER BY StudentID;\nEND;\nGO\nEXEC dbo.usp_StudyLabStudentsByCity @City='Polokwane';\nGO",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "moreExamples": [
      {
        "title": "ALTER and DROP a practice procedure",
        "code": "-- Run the CREATE example first.\nALTER PROCEDURE dbo.usp_StudyLabStudentsByCity @City VARCHAR(60)\nAS\nBEGIN\n SET NOCOUNT ON;\n SELECT StudentID,StudentName,Age FROM dbo.Students WHERE City=@City ORDER BY StudentID;\nEND;\nGO\nEXEC dbo.usp_StudyLabStudentsByCity @City='Pretoria';\nGO\nDROP PROCEDURE dbo.usp_StudyLabStudentsByCity;",
        "reason": "The revised procedure includes Age and returns the five Pretoria students. DROP then removes the practice procedure.",
        "environment": "native"
      }
    ],
    "download": "intermediate-9-1.sql"
  },
  {
    "id": "intermediate-9-2",
    "unit": 109,
    "title": "Input, OUTPUT, defaults and RETURN",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "An input parameter supplies a value. A default permits omission. An OUTPUT parameter carries a value back only when the caller also specifies OUTPUT and supplies a variable. RETURN exits the procedure and can provide an integer status; it is not the same as returning a rowset or an output parameter. Use types matching the compared columns and validate values before changing data."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Total is 5 and Status is 0 on the original college demo. City is omitted so the default is used."
      }
    ],
    "example": {
      "title": "Input, OUTPUT, defaults and RETURN",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Total is 5 and Status is 0 on the original college demo. City is omitted so the default is used."
    },
    "task": {
      "prompt": "Call the procedure for Pretoria and explain what breaks if the caller omits OUTPUT.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "DECLARE @n INT,@rc INT; EXEC @rc=dbo.usp_StudyLabCountStudents @City='Pretoria',@Total=@n OUTPUT; SELECT @n AS Total,@rc AS Status; Without caller OUTPUT the assigned value is not copied back to @n."
    },
    "tasks": [
      {
        "prompt": "Call the procedure for Pretoria and explain what breaks if the caller omits OUTPUT.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "DECLARE @n INT,@rc INT; EXEC @rc=dbo.usp_StudyLabCountStudents @City='Pretoria',@Total=@n OUTPUT; SELECT @n AS Total,@rc AS Status; Without caller OUTPUT the assigned value is not copied back to @n.",
        "title": "Apply the concept"
      },
      {
        "title": "Fix a missing OUTPUT keyword",
        "prompt": "A procedure declares @Total INT OUTPUT but the caller runs EXEC dbo.usp_StudyLabCountStudents @Total=@n;. Explain why @n is not updated and correct the call.",
        "hint": "OUTPUT must appear in both the declaration and invocation.",
        "solution": "DECLARE @n INT;\nEXEC dbo.usp_StudyLabCountStudents @Total=@n OUTPUT;\nSELECT @n AS Total;\nThe call without OUTPUT does not copy the changed parameter value back into the caller variable.",
        "revision": "practical-2"
      },
      {
        "title": "Separate three return mechanisms",
        "prompt": "Design a procedure contract that returns matching student rows, their count and an integer status. State which mechanism should carry each.",
        "hint": "Result sets, OUTPUT parameters and RETURN values are different interfaces.",
        "solution": "Use a SELECT result set for student rows, an @Total INT OUTPUT parameter for the count and RETURN 0 for success if the contract uses integer statuses. For failures requiring caller handling, propagate errors with THROW rather than disguising failure as an empty success result.",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "How does the caller receive an OUTPUT parameter?",
        "options": [
          "Use RETURN as a text rowset",
          "Supply a variable and specify OUTPUT in the call",
          "Omit OUTPUT and select an unrelated constant"
        ],
        "answer": 1,
        "explanation": "OUTPUT is needed on both the parameter declaration and the call to copy the value back."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser.",
          "Total is 5 and Status is 0 on the original college demo. City is omitted so the default is used."
        ],
        "answer": 2,
        "explanation": "Total is 5 and Status is 0 on the original college demo. City is omitted so the default is used."
      }
    ],
    "sampleCode": "CREATE PROCEDURE dbo.usp_StudyLabCountStudents\n @City VARCHAR(60)='Polokwane', @Total INT OUTPUT\nAS\nBEGIN\n SET NOCOUNT ON;\n SELECT @Total=COUNT(*) FROM dbo.Students WHERE City=@City;\n RETURN 0;\nEND;\nGO\nDECLARE @Count INT,@Status INT;\nEXEC @Status=dbo.usp_StudyLabCountStudents @Total=@Count OUTPUT;\nSELECT @Count AS Total,@Status AS Status;\nGO",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "download": "intermediate-9-2.sql"
  },
  {
    "id": "intermediate-9-3",
    "unit": 109,
    "title": "Procedure validation and transaction errors",
    "sections": [
      {
        "heading": "Understand the concept",
        "text": "Validate parameters and rely on database constraints for concurrent correctness. @@ERROR is reset by each statement, so legacy code must capture it immediately. Prefer TRY/CATCH and THROW for new error propagation. SET XACT_ABORT ON and a deliberate transaction boundary simplify many write operations. In CATCH use XACT_STATE() to determine whether a transaction remains and roll it back when appropriate. A procedure that starts its own transaction should document how it behaves when called inside an existing one."
      },
      {
        "heading": "Where this example runs",
        "text": "Use Microsoft SQL Server and SSMS with a disposable practice database. This script is a native T-SQL example and cannot execute in the browser SQLite workspace. Load the college setup first where Students, Courses or Enrolments are referenced."
      },
      {
        "heading": "Check your understanding",
        "text": "Read the stated assumptions and predict the result before running a query. Native SQL Server creates a validated write procedure. It rejects invalid age, unknown student IDs and callers with an existing transaction. Test only on practice data."
      }
    ],
    "example": {
      "title": "Procedure validation and transaction errors",
      "problem": "Study the example, predict the result, then explain the important decisions.",
      "solution": "Native SQL Server creates a validated write procedure. It rejects invalid age, unknown student IDs and callers with an existing transaction. Test only on practice data."
    },
    "task": {
      "prompt": "Design three tests for this procedure and explain why parameter validation alone is insufficient for referential integrity.",
      "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
      "solution": "Test a valid student and age, an age below 18 and an unknown student. Confirm invalid cases leave data unchanged. Other sessions may change data after a precheck; database constraints enforce integrity at the actual write, so validation complements rather than replaces them."
    },
    "tasks": [
      {
        "prompt": "Design three tests for this procedure and explain why parameter validation alone is insufficient for referential integrity.",
        "hint": "Use the worked example, state your assumptions and check the relevant keys or SQL clauses.",
        "solution": "Test a valid student and age, an age below 18 and an unknown student. Confirm invalid cases leave data unchanged. Other sessions may change data after a precheck; database constraints enforce integrity at the actual write, so validation complements rather than replaces them.",
        "title": "Apply the concept"
      },
      {
        "title": "Protect a caller transaction",
        "prompt": "A procedure always rolls back any transaction in CATCH, even when the caller started it. Explain the consequence and propose a documented ownership policy.",
        "hint": "Transaction ownership affects the caller, not just the procedure.",
        "solution": "An unconditional ROLLBACK can undo the caller's other work. Either reject calls inside an existing transaction as the lesson example does, or implement and document savepoint/transaction ownership semantics, including uncommittable XACT_STATE()=-1. Do not silently assume every active transaction belongs to this procedure.",
        "revision": "practical-2"
      },
      {
        "title": "Write a failure test plan",
        "prompt": "For usp_StudyLabChangeAge, define four tests: valid update, NULL age, below-minimum age and missing student. Include before/after assertions and transaction state.",
        "hint": "Test both returned errors and persistent state.",
        "solution": "Record the original age and transaction count. A valid existing student and age>=18 changes exactly one row. NULL and age<18 must throw without changing data. A missing student must throw and leave all rows unchanged. Verify no transaction opened by the procedure remains; restore valid-test data using a controlled practice cleanup.",
        "revision": "practical-2"
      }
    ],
    "quizzes": [
      {
        "question": "Why retain constraints when procedure input is validated?",
        "options": [
          "Validation disables all other sessions",
          "Constraints are only decorative",
          "Concurrent writes still need integrity enforcement"
        ],
        "answer": 2,
        "explanation": "Parameter validation helps explain errors; database constraints enforce rules for every write path."
      },
      {
        "question": "Which is the correct expected behaviour of this lesson example?",
        "options": [
          "Native SQL Server creates a validated write procedure. It rejects invalid age, unknown student IDs and callers with an existing transaction. Test only on practice data.",
          "All source tables are permanently removed by every example.",
          "Every example creates a new SQL Server instance in the browser."
        ],
        "answer": 0,
        "explanation": "Native SQL Server creates a validated write procedure. It rejects invalid age, unknown student IDs and callers with an existing transaction. Test only on practice data."
      }
    ],
    "sampleCode": "CREATE PROCEDURE dbo.usp_StudyLabChangeAge @StudentID INT,@Age INT\nAS\nBEGIN\n SET NOCOUNT ON;\n SET XACT_ABORT ON;\n IF @@TRANCOUNT<>0 THROW 50001,'Call without an active transaction.',1;\n IF @Age IS NULL OR @Age<18 THROW 50002,'Age must be at least 18.',1;\n BEGIN TRY\n  BEGIN TRANSACTION;\n  UPDATE dbo.Students SET Age=@Age WHERE StudentID=@StudentID;\n  IF @@ROWCOUNT=0 THROW 50003,'Student not found.',1;\n  COMMIT TRANSACTION;\n END TRY\n BEGIN CATCH\n  IF XACT_STATE()<>0 ROLLBACK TRANSACTION;\n  THROW;\n END CATCH;\nEND;\nGO",
    "environment": "native",
    "diagram": null,
    "sql": null,
    "download": "intermediate-9-3.sql"
  }
];

// Keep old question identities available solely for previously saved exams.
export const intermediateLegacyQuizzes=Object.fromEntries(intermediateLessons.map(l=>[l.id,l.quizzes]));
for(const lesson of intermediateLessons){lesson.quizzes=practicalIntermediateQuizzes[lesson.id];lesson.quizRevision='practical-v2';}
