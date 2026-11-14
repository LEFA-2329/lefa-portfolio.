import {
  additionalDatasets,
  additionalExamples,
} from './five-extra-demo-databases.mjs?v=33';
import { extraExamples } from './additional-sql-examples.mjs?v=33';
export const dialects = {
  sqlserver: 'Microsoft SQL Server',
  postgresql: 'PostgreSQL',
  mysql: 'MySQL',
};
const q = (value) => "'" + String(value).replaceAll("'", "''") + "'";
export const students = [
  'Lebo',
  'Thabo',
  'Naledi',
  'Peter',
  'Maria',
  'Amina',
  'Sipho',
  'Lerato',
  'John',
  'Sarah',
  'Kabelo',
  'Precious',
  'David',
  'Zanele',
  'Mpho',
  'Tshepo',
  'Grace',
  'Bongani',
  'Ruth',
  'Karabo',
].map((name, i) => [
  i + 1,
  name,
  ['Polokwane', 'Johannesburg', 'Pretoria', 'Cape Town'][i % 4],
  18 + (i % 9),
]);
export const courses = [
  [1, 'Programming Logic', 1200],
  [2, 'Databases', 1500],
  [3, 'Web Development', 1350],
  [4, 'Data Analysis', 1600],
];
export const enrolments = students.flatMap((s, i) => [
  [i * 2 + 1, s[0], (i % 4) + 1, 40 + ((i * 7) % 61)],
  [i * 2 + 2, s[0], ((i + 1) % 4) + 1, i % 7 === 0 ? null : 45 + ((i * 3) % 56)],
]);
const tuples = (rows) =>
  rows
    .map(
      (r) =>
        '(' +
        r
          .map((v) => (v === null ? 'NULL' : typeof v === 'number' ? v : q(v)))
          .join(', ') +
        ')',
    )
    .join(',\n');
export const datasets = {
  college: {
    title: 'College',
    description:
      '20 students, 4 courses and 40 enrolments. Some marks are NULL because the assessment is not yet marked.',
    tables: {
      Students: ['StudentID (PK)', 'StudentName', 'City', 'Age'],
      Courses: ['CourseID (PK)', 'CourseName', 'Fee'],
      Enrolments: [
        'EnrolmentID (PK)',
        'StudentID (FK → Students)',
        'CourseID (FK → Courses)',
        'Mark (nullable)',
      ],
    },
    sql: `CREATE TABLE Students (StudentID INTEGER PRIMARY KEY, StudentName VARCHAR(60) NOT NULL, City VARCHAR(60) NOT NULL, Age INTEGER NOT NULL CHECK (Age >= 0));
CREATE TABLE Courses (CourseID INTEGER PRIMARY KEY, CourseName VARCHAR(80) NOT NULL UNIQUE, Fee DECIMAL(10,2) NOT NULL CHECK (Fee >= 0));
CREATE TABLE Enrolments (EnrolmentID INTEGER PRIMARY KEY, StudentID INTEGER NOT NULL, CourseID INTEGER NOT NULL, Mark DECIMAL(5,2) CHECK (Mark BETWEEN 0 AND 100), UNIQUE(StudentID, CourseID), FOREIGN KEY(StudentID) REFERENCES Students(StudentID), FOREIGN KEY(CourseID) REFERENCES Courses(CourseID));
INSERT INTO Students (StudentID, StudentName, City, Age) VALUES ${tuples(students)};
INSERT INTO Courses (CourseID, CourseName, Fee) VALUES ${tuples(courses)};
INSERT INTO Enrolments (EnrolmentID, StudentID, CourseID, Mark) VALUES ${tuples(enrolments)};`,
  },
  shop: {
    title: 'Bookshop',
    description:
      '12 fictional books, 4 categories and 16 sales. Practise joins, revenue and grouped totals.',
    tables: {
      Categories: ['CategoryID (PK)', 'CategoryName'],
      Books: ['BookID (PK)', 'Title', 'CategoryID (FK → Categories)', 'Price', 'Stock'],
      Sales: ['SaleID (PK)', 'BookID (FK → Books)', 'Quantity', 'SaleDate'],
    },
    sql: `CREATE TABLE Categories (CategoryID INTEGER PRIMARY KEY, CategoryName VARCHAR(60) NOT NULL UNIQUE);
CREATE TABLE Books (BookID INTEGER PRIMARY KEY, Title VARCHAR(100) NOT NULL, CategoryID INTEGER NOT NULL REFERENCES Categories(CategoryID), Price DECIMAL(10,2) NOT NULL CHECK(Price >= 0), Stock INTEGER NOT NULL CHECK(Stock >= 0));
CREATE TABLE Sales (SaleID INTEGER PRIMARY KEY, BookID INTEGER NOT NULL REFERENCES Books(BookID), Quantity INTEGER NOT NULL CHECK(Quantity > 0), SaleDate DATE NOT NULL);
INSERT INTO Categories VALUES (1,'Computing'),(2,'Fiction'),(3,'Science'),(4,'History');
INSERT INTO Books VALUES ${tuples(Array.from({ length: 12 }, (_, i) => [i + 1, ['SQL Foundations', 'Programming Basics', 'Web Design', 'The Journey', 'City Lights', 'River Stories', 'Space Explained', 'Earth and Life', 'Numbers Around Us', 'Local Histories', 'World Events', 'Ancient Times'][i], Math.floor(i / 3) + 1, 100 + (i % 5) * 35, 5 + i * 2]))};
INSERT INTO Sales VALUES ${tuples(Array.from({ length: 16 }, (_, i) => [i + 1, (i % 12) + 1, (i % 4) + 1, `2026-10-${String(i + 1).padStart(2, '0')}`]))};`,
  },
};
Object.assign(datasets, additionalDatasets);
export function setupScript(dataset = 'college', dialect = 'postgresql') {
  if (!Object.hasOwn(datasets, dataset) || !Object.hasOwn(dialects, dialect))
    throw Error('Choose a valid dataset and dialect.');
  return `-- StudyLab fictional ${datasets[dataset].title} demo for ${dialects[dialect]}\n-- Run in an empty database/schema. IDs are supplied explicitly.\n-- All records are fictional; no real personal data.\n\n${datasets[dataset].sql}\n`;
}
export const sqlExamples = [
  {
    id: 'all',
    title: 'Read a table',
    dataset: 'college',
    code: 'SELECT StudentID, StudentName, City, Age\nFROM Students\nORDER BY StudentID;',
    explain:
      'SELECT chooses columns. FROM names a table. ORDER BY makes the output order explicit.',
  },
  {
    id: 'filter',
    title: 'Filter with AND / OR / NOT',
    dataset: 'college',
    code: "SELECT StudentName, City, Age\nFROM Students\nWHERE (City = 'Polokwane' OR City = 'Pretoria')\n  AND NOT Age < 21\nORDER BY StudentName;",
    explain:
      'Parentheses group the OR. Both the city test and the age test must be true.',
  },
  {
    id: 'top',
    title: 'First five rows',
    dataset: 'college',
    code: (mode) =>
      mode === 'sqlserver'
        ? 'SELECT TOP (5) StudentID, StudentName\nFROM Students\nORDER BY StudentID;'
        : 'SELECT StudentID, StudentName\nFROM Students\nORDER BY StudentID\nLIMIT 5;',
    explain:
      'SQL Server uses TOP; PostgreSQL and MySQL use LIMIT. ORDER BY defines which five rows are first.',
  },
  {
    id: 'null',
    title: 'NULL and COUNT',
    dataset: 'college',
    code: 'SELECT COUNT(*) AS TotalEnrolments,\n       COUNT(Mark) AS MarkedEnrolments,\n       AVG(Mark) AS AverageMark\nFROM Enrolments;',
    explain:
      'COUNT(*) counts every row. COUNT(Mark) and AVG(Mark) ignore NULL marks. NULL is not zero.',
  },
  {
    id: 'aggregate',
    title: 'COUNT, SUM, AVG, MIN and MAX',
    dataset: 'college',
    code: 'SELECT COUNT(*) AS CourseCount,\n       SUM(Fee) AS TotalFees, AVG(Fee) AS AverageFee,\n       MIN(Fee) AS LowestFee, MAX(Fee) AS HighestFee\nFROM Courses;',
    explain:
      'Each function summarises the non-NULL values. Four courses have total fees of 5650.',
  },
  {
    id: 'join',
    title: 'Join related tables',
    dataset: 'college',
    code: 'SELECT s.StudentName, c.CourseName, e.Mark\nFROM Enrolments AS e\nJOIN Students AS s ON s.StudentID = e.StudentID\nJOIN Courses AS c ON c.CourseID = e.CourseID\nORDER BY s.StudentID, c.CourseID;',
    explain:
      'Foreign keys connect each enrolment to one student and one course. Aliases shorten qualified column names.',
  },
  {
    id: 'group',
    title: 'GROUP BY and HAVING',
    dataset: 'college',
    code: 'SELECT c.CourseName, COUNT(*) AS EnrolmentCount,\n       ROUND(AVG(e.Mark), 2) AS AverageMark\nFROM Courses AS c\nJOIN Enrolments AS e ON e.CourseID = c.CourseID\nGROUP BY c.CourseID, c.CourseName\nHAVING AVG(e.Mark) >= 60\nORDER BY AverageMark DESC;',
    explain:
      'GROUP BY creates course groups. HAVING filters aggregated groups. WHERE filters rows before grouping.',
  },
  {
    id: 'left',
    title: 'LEFT JOIN',
    dataset: 'college',
    code: 'SELECT s.StudentName, e.Mark\nFROM Students AS s\nLEFT JOIN Enrolments AS e ON e.StudentID = s.StudentID\n  AND e.Mark >= 75\nORDER BY s.StudentID;',
    explain:
      'Keep every student, even if none of their marks meets the condition. Moving the mark filter to WHERE would discard unmatched rows.',
  },
  {
    id: 'crud',
    title: 'INSERT, UPDATE and DELETE',
    dataset: 'college',
    code: "INSERT INTO Students (StudentID, StudentName, City, Age)\nVALUES (21, 'Demo Learner', 'Polokwane', 22);\nUPDATE Students SET Age = 23 WHERE StudentID = 21;\nSELECT * FROM Students WHERE StudentID = 21;\nDELETE FROM Students WHERE StudentID = 21;",
    explain:
      'This example adds, changes, reads and removes one row. WHERE scopes UPDATE and DELETE. Run it again safely: ID 21 was removed.',
  },
  {
    id: 'table',
    title: 'Create a table and constraints',
    dataset: 'college',
    code: "CREATE TABLE StudyGroups (\n  GroupID INTEGER PRIMARY KEY,\n  GroupName VARCHAR(60) NOT NULL UNIQUE,\n  Capacity INTEGER NOT NULL CHECK (Capacity > 0)\n);\nINSERT INTO StudyGroups VALUES (1, 'SQL study circle', 12);\nSELECT * FROM StudyGroups;",
    explain:
      'The primary key identifies a row. NOT NULL, UNIQUE and CHECK express data rules. Reset the dataset before running this CREATE example a second time.',
  },
  {
    id: 'view',
    title: 'Create and query a view',
    dataset: 'college',
    code: 'CREATE VIEW PassingMarks AS\nSELECT StudentID, CourseID, Mark\nFROM Enrolments WHERE Mark >= 50;\nSELECT * FROM PassingMarks ORDER BY StudentID, CourseID;',
    explain:
      'A view stores a query definition. It does not create a separate copy of all result rows. Reset before creating the same view again.',
  },
  {
    id: 'index',
    title: 'Create and drop an index',
    dataset: 'college',
    code: (mode) =>
      "CREATE INDEX IX_Students_City ON Students (City);\nSELECT StudentName FROM Students WHERE City = 'Polokwane';\n" +
      (mode === 'mysql'
        ? 'DROP INDEX IX_Students_City ON Students;'
        : 'DROP INDEX IX_Students_City' +
          (mode === 'sqlserver' ? ' ON Students' : '') +
          ';'),
    explain:
      'An index can improve some lookups but costs storage and write work. Tiny demo data cannot demonstrate realistic performance gains.',
  },
  {
    id: 'revenue',
    title: 'Bookshop sales revenue',
    dataset: 'shop',
    code: 'SELECT b.Title, SUM(s.Quantity) AS CopiesSold,\n       SUM(s.Quantity * b.Price) AS Revenue\nFROM Books AS b\nJOIN Sales AS s ON s.BookID = b.BookID\nGROUP BY b.BookID, b.Title\nORDER BY Revenue DESC;',
    explain:
      'Multiply quantity by price at row level, then sum per book. This demo assumes the current book price was also the sale price.',
  },
];

sqlExamples.push(...extraExamples);

sqlExamples.push(...additionalExamples);
