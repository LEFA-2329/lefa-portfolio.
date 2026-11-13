import { extraExercises } from './sql-extra.mjs?v=27';
export const exercises = [
  {
    id: 'city',
    dataset: 'college',
    title: '1. Filter students',
    prompt:
      'Display StudentName and Age for students from Polokwane, sorted by StudentName.',
    hint: 'Filter City with a single-quoted string, then sort the selected rows.',
    answer:
      "SELECT StudentName, Age FROM Students\nWHERE City = 'Polokwane' ORDER BY StudentName;",
    expected: 'Five rows: David (21), Grace (25), John (26), Lebo (18) and Maria (22).',
  },
  {
    id: 'marks',
    dataset: 'college',
    title: '2. Count missing marks',
    prompt: 'Count enrolments with no mark yet. Use alias Unmarked.',
    hint: 'Use IS NULL, not = NULL.',
    answer: 'SELECT COUNT(*) AS Unmarked FROM Enrolments WHERE Mark IS NULL;',
    expected: 'Unmarked = 3.',
  },
  {
    id: 'fees',
    dataset: 'college',
    title: '3. Summarise fees',
    prompt: 'Return the number of courses, total fees and average fee.',
    hint: 'Use COUNT(*), SUM(Fee) and AVG(Fee).',
    answer:
      'SELECT COUNT(*) AS CourseCount, SUM(Fee) AS TotalFees, AVG(Fee) AS AverageFee FROM Courses;',
    expected: 'CourseCount = 4, TotalFees = 5650, AverageFee = 1412.5.',
  },
  {
    id: 'join',
    dataset: 'college',
    title: '4. Join students to marks',
    prompt:
      'Display StudentName, CourseID and Mark for all enrolments. Sort by StudentID then CourseID.',
    hint: 'Join Students to Enrolments on StudentID. Qualify ambiguous column names with aliases.',
    answer:
      'SELECT s.StudentName, e.CourseID, e.Mark\nFROM Students AS s JOIN Enrolments AS e ON e.StudentID = s.StudentID\nORDER BY s.StudentID, e.CourseID;',
    expected:
      '40 rows. Lebo has course 1 mark 40 and course 2 mark NULL at the beginning.',
  },
  {
    id: 'groups',
    dataset: 'college',
    title: '5. Group by city',
    prompt: 'Return each City and the number of Students in it, sorted by City.',
    hint: 'Select City and COUNT(*); GROUP BY City.',
    answer:
      'SELECT City, COUNT(*) AS StudentCount FROM Students GROUP BY City ORDER BY City;',
    expected: 'Four cities, each with StudentCount = 5.',
  },
  {
    id: 'create',
    dataset: 'college',
    title: '6. Add a constrained table',
    prompt:
      'Create PracticeNotes with integer NoteID primary key and non-NULL NoteText VARCHAR(120). Insert note 1 with text SQL practice, then query it.',
    hint: 'Use CREATE TABLE, INSERT with named columns, and SELECT. Reset before creating the same table again.',
    answer:
      "CREATE TABLE PracticeNotes (NoteID INTEGER PRIMARY KEY, NoteText VARCHAR(120) NOT NULL);\nINSERT INTO PracticeNotes (NoteID, NoteText) VALUES (1, 'SQL practice');\nSELECT * FROM PracticeNotes;",
    expected:
      'One row: NoteID = 1, NoteText = SQL practice. It is a custom table in this open workspace.',
  },
  {
    id: 'stock',
    dataset: 'shop',
    title: '7. Filter book prices',
    prompt:
      'Show Title and Price for books priced at least 200, ordered by Price descending then BookID.',
    hint: 'Filter Price with >= 200. List both sort expressions.',
    answer:
      'SELECT Title, Price FROM Books WHERE Price >= 200 ORDER BY Price DESC, BookID;',
    expected:
      'Four rows: City Lights (240), Local Histories (240), The Journey (205), Numbers Around Us (205).',
  },
  {
    id: 'sales',
    dataset: 'shop',
    title: '8. Count sales per book',
    prompt:
      'Display every book title and the number of sale records, including books with no sales. Use LEFT JOIN and count SaleID.',
    hint: 'COUNT(s.SaleID) counts matches. COUNT(*) would count a preserved unmatched book row too.',
    answer:
      'SELECT b.Title, COUNT(s.SaleID) AS SaleCount\nFROM Books AS b LEFT JOIN Sales AS s ON s.BookID = b.BookID\nGROUP BY b.BookID, b.Title ORDER BY b.BookID;',
    expected:
      '12 rows. The first four books have 2 sale records each and the other eight have 1 each in the original dataset.',
  },
];

exercises.push(...extraExercises);
