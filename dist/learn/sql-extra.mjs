export const extraExamples=[
  {
    "id": "between",
    "title": "Age range",
    "dataset": "college",
    "code": "SELECT StudentID,StudentName,Age FROM Students WHERE Age BETWEEN 20 AND 24 ORDER BY Age,StudentID;",
    "explain": "BETWEEN includes both endpoints."
  },
  {
    "id": "like",
    "title": "Names beginning with L",
    "dataset": "college",
    "code": "SELECT StudentID,StudentName FROM Students WHERE StudentName LIKE 'L%' ORDER BY StudentID;",
    "explain": "The percent wildcard matches zero or more characters. Case comparison follows the engine collation."
  },
  {
    "id": "distinct",
    "title": "Distinct cities",
    "dataset": "college",
    "code": "SELECT DISTINCT City FROM Students ORDER BY City;",
    "explain": "DISTINCT applies to the whole selected tuple; this query returns four city rows."
  },
  {
    "id": "in",
    "title": "Choose several cities",
    "dataset": "college",
    "code": "SELECT StudentID,StudentName,City FROM Students WHERE City IN ('Polokwane','Pretoria') ORDER BY StudentID;",
    "explain": "IN is a concise alternative to repeated equality conditions joined with OR."
  },
  {
    "id": "coalesce",
    "title": "Display missing marks",
    "dataset": "college",
    "code": "SELECT EnrolmentID,COALESCE(CAST(Mark AS VARCHAR(20)),'Pending') AS DisplayMark FROM Enrolments ORDER BY EnrolmentID;",
    "explain": "COALESCE chooses the first non-NULL expression. Cast to text before combining a number with a text label."
  },
  {
    "id": "case",
    "title": "Classify marks",
    "dataset": "college",
    "code": "SELECT EnrolmentID,Mark,CASE WHEN Mark IS NULL THEN 'Pending' WHEN Mark>=75 THEN 'Distinction' WHEN Mark>=50 THEN 'Pass' ELSE 'Fail' END AS Result FROM Enrolments ORDER BY EnrolmentID;",
    "explain": "CASE selects the first true condition. Test NULL explicitly and higher thresholds before lower ones."
  },
  {
    "id": "subquery",
    "title": "Above-average fees",
    "dataset": "college",
    "code": "SELECT CourseID,CourseName,Fee FROM Courses WHERE Fee>(SELECT AVG(Fee) FROM Courses) ORDER BY CourseID;",
    "explain": "The uncorrelated scalar subquery calculates the average once logically; compare every fee with it."
  },
  {
    "id": "exists",
    "title": "Students with high marks",
    "dataset": "college",
    "code": "SELECT s.StudentID,s.StudentName FROM Students s WHERE EXISTS(SELECT 1 FROM Enrolments e WHERE e.StudentID=s.StudentID AND e.Mark>=80) ORDER BY s.StudentID;",
    "explain": "EXISTS tests for at least one qualifying enrolment without duplicating the student."
  },
  {
    "id": "not-exists",
    "title": "Students without high marks",
    "dataset": "college",
    "code": "SELECT s.StudentID,s.StudentName FROM Students s WHERE NOT EXISTS(SELECT 1 FROM Enrolments e WHERE e.StudentID=s.StudentID AND e.Mark>=80) ORDER BY s.StudentID;",
    "explain": "NOT EXISTS includes students for whom no qualifying child row exists, including students with no children."
  },
  {
    "id": "cross",
    "title": "All student-course combinations",
    "dataset": "college",
    "code": "SELECT s.StudentID,c.CourseID FROM Students s CROSS JOIN Courses c ORDER BY s.StudentID,c.CourseID;",
    "explain": "20 students multiplied by 4 courses yields 80 candidate combinations, not 40 actual enrolments."
  },
  {
    "id": "self",
    "title": "Student pairs in the same city",
    "dataset": "college",
    "code": "SELECT a.StudentID AS FirstID,b.StudentID AS SecondID,a.City FROM Students a JOIN Students b ON a.City=b.City AND a.StudentID<b.StudentID ORDER BY a.StudentID,b.StudentID;",
    "explain": "The inequality removes self-pairs and mirrored duplicates. Each five-student city produces ten unordered pairs."
  },
  {
    "id": "union",
    "title": "Combine cities without duplicates",
    "dataset": "college",
    "code": "SELECT City FROM Students WHERE Age<22 UNION SELECT City FROM Students WHERE Age>=22 ORDER BY City;",
    "explain": "UNION removes duplicate whole result rows. Four cities remain."
  },
  {
    "id": "union-all",
    "title": "Combine cities retaining duplicates",
    "dataset": "college",
    "code": "SELECT City FROM Students WHERE Age<22 UNION ALL SELECT City FROM Students WHERE Age>=22 ORDER BY City;",
    "explain": "UNION ALL retains all 20 city occurrences from the two disjoint age groups."
  },
  {
    "id": "cte",
    "title": "Name an aggregate query",
    "dataset": "college",
    "code": "WITH CourseAverages AS (SELECT CourseID,AVG(CAST(Mark AS DECIMAL(10,2))) AS AverageMark FROM Enrolments GROUP BY CourseID) SELECT CourseID,AverageMark FROM CourseAverages WHERE AverageMark>=60 ORDER BY CourseID;",
    "explain": "A CTE names a query within one statement; it is not a permanently stored table."
  },
  {
    "id": "conditional",
    "title": "Count pass and pending rows",
    "dataset": "college",
    "code": "SELECT CourseID,SUM(CASE WHEN Mark>=50 THEN 1 ELSE 0 END) AS PassCount,SUM(CASE WHEN Mark IS NULL THEN 1 ELSE 0 END) AS PendingCount FROM Enrolments GROUP BY CourseID ORDER BY CourseID;",
    "explain": "Conditional aggregation counts categories separately. Pending marks are not silently treated as failing scores."
  },
  {
    "id": "having-count",
    "title": "Groups with enough enrolments",
    "dataset": "college",
    "code": "SELECT StudentID,COUNT(*) AS EnrolmentCount FROM Enrolments GROUP BY StudentID HAVING COUNT(*)>=2 ORDER BY StudentID;",
    "explain": "HAVING filters the aggregate. All 20 students currently have two enrolments."
  },
  {
    "id": "anti-left",
    "title": "Unmarked enrolment lookup",
    "dataset": "college",
    "code": "SELECT s.StudentID,s.StudentName,e.CourseID FROM Students s JOIN Enrolments e ON e.StudentID=s.StudentID WHERE e.Mark IS NULL ORDER BY s.StudentID,e.CourseID;",
    "explain": "IS NULL identifies the three unmarked enrolments; it does not test for a numeric zero."
  },
  {
    "id": "min-max",
    "title": "Mark range by course",
    "dataset": "college",
    "code": "SELECT CourseID,MIN(Mark) AS Lowest,MAX(Mark) AS Highest,MAX(Mark)-MIN(Mark) AS Spread FROM Enrolments GROUP BY CourseID ORDER BY CourseID;",
    "explain": "MIN and MAX ignore NULL. Spread is the highest known mark minus the lowest."
  },
  {
    "id": "default-demo",
    "title": "Omitted columns and DEFAULT",
    "dataset": "college",
    "code": "CREATE TABLE PracticeFlags(FlagID INTEGER PRIMARY KEY,Label VARCHAR(30) NOT NULL,Status VARCHAR(10) NOT NULL DEFAULT 'Open'); INSERT INTO PracticeFlags(FlagID,Label) VALUES(1,'Review SQL'); SELECT * FROM PracticeFlags;",
    "explain": "The omitted status receives Open. Reset before repeating CREATE TABLE."
  },
  {
    "id": "alter-demo",
    "title": "Add a nullable column",
    "dataset": "college",
    "code": "CREATE TABLE PracticeRooms(RoomID INTEGER PRIMARY KEY); ALTER TABLE PracticeRooms ADD Capacity INTEGER; INSERT INTO PracticeRooms(RoomID) VALUES(1); SELECT * FROM PracticeRooms;",
    "explain": "The new nullable column is NULL when omitted. SQL Server and SQLite both accept this simple ADD form. Reset before repeating."
  },
  {
    "id": "foreign-demo",
    "title": "Optional reference and SET NULL",
    "dataset": "college",
    "code": "CREATE TABLE PracticeParents(ParentID INTEGER PRIMARY KEY); CREATE TABLE PracticeChildren(ChildID INTEGER PRIMARY KEY,ParentID INTEGER REFERENCES PracticeParents(ParentID) ON DELETE SET NULL); INSERT INTO PracticeParents VALUES(1); INSERT INTO PracticeChildren VALUES(10,1); DELETE FROM PracticeParents WHERE ParentID=1; SELECT * FROM PracticeChildren;",
    "explain": "The child remains and ParentID becomes NULL; child column nullability permits this action. Reset before repeating."
  },
  {
    "id": "category-count",
    "title": "Books per category",
    "dataset": "shop",
    "code": "SELECT c.CategoryName,COUNT(b.BookID) AS BookCount FROM Categories c LEFT JOIN Books b ON b.CategoryID=c.CategoryID GROUP BY c.CategoryID,c.CategoryName ORDER BY c.CategoryID;",
    "explain": "Count a child key, not COUNT(*), to get zero for a category with no books. The original demo has three books in each category."
  },
  {
    "id": "unsold",
    "title": "Books with no sales",
    "dataset": "shop",
    "code": "SELECT b.BookID,b.Title FROM Books b WHERE NOT EXISTS(SELECT 1 FROM Sales s WHERE s.BookID=b.BookID) ORDER BY b.BookID;",
    "explain": "An empty result is correct: every original demo book has a sale. Add a new unsold book to test the other case."
  },
  {
    "id": "daily",
    "title": "Daily sales quantities",
    "dataset": "shop",
    "code": "SELECT SaleDate,SUM(Quantity) AS Copies FROM Sales GROUP BY SaleDate ORDER BY SaleDate;",
    "explain": "Group by the date for a daily quantity total; current prices are not needed."
  }
];
export const extraExercises=[
  {
    "id": "expanded-between",
    "title": "9. Age range",
    "dataset": "college",
    "prompt": "List students aged 20 to 24 inclusive, ordered by Age then StudentID.",
    "hint": "BETWEEN includes both endpoints.",
    "answer": "SELECT StudentID,StudentName,Age FROM Students WHERE Age BETWEEN 20 AND 24 ORDER BY Age,StudentID;",
    "expected": "BETWEEN includes both endpoints."
  },
  {
    "id": "expanded-like",
    "title": "10. Names beginning with L",
    "dataset": "college",
    "prompt": "Find student names beginning with L and sort by StudentID.",
    "hint": "The percent wildcard matches zero or more characters. Case comparison follows the engine collation.",
    "answer": "SELECT StudentID,StudentName FROM Students WHERE StudentName LIKE 'L%' ORDER BY StudentID;",
    "expected": "The percent wildcard matches zero or more characters. Case comparison follows the engine collation."
  },
  {
    "id": "expanded-distinct",
    "title": "11. Distinct cities",
    "dataset": "college",
    "prompt": "Return each city once, alphabetically.",
    "hint": "DISTINCT applies to the whole selected tuple; this query returns four city rows.",
    "answer": "SELECT DISTINCT City FROM Students ORDER BY City;",
    "expected": "DISTINCT applies to the whole selected tuple; this query returns four city rows."
  },
  {
    "id": "expanded-in",
    "title": "12. Choose several cities",
    "dataset": "college",
    "prompt": "List students from Polokwane or Pretoria, ordered by StudentID.",
    "hint": "IN is a concise alternative to repeated equality conditions joined with OR.",
    "answer": "SELECT StudentID,StudentName,City FROM Students WHERE City IN ('Polokwane','Pretoria') ORDER BY StudentID;",
    "expected": "IN is a concise alternative to repeated equality conditions joined with OR."
  },
  {
    "id": "expanded-coalesce",
    "title": "13. Display missing marks",
    "dataset": "college",
    "prompt": "Show every enrolment with a text DisplayMark, using Pending for NULL.",
    "hint": "COALESCE chooses the first non-NULL expression. Cast to text before combining a number with a text label.",
    "answer": "SELECT EnrolmentID,COALESCE(CAST(Mark AS VARCHAR(20)),'Pending') AS DisplayMark FROM Enrolments ORDER BY EnrolmentID;",
    "expected": "COALESCE chooses the first non-NULL expression. Cast to text before combining a number with a text label."
  },
  {
    "id": "expanded-case",
    "title": "14. Classify marks",
    "dataset": "college",
    "prompt": "Classify all enrolments as Pending, Distinction (>=75), Pass (>=50) or Fail.",
    "hint": "CASE selects the first true condition. Test NULL explicitly and higher thresholds before lower ones.",
    "answer": "SELECT EnrolmentID,Mark,CASE WHEN Mark IS NULL THEN 'Pending' WHEN Mark>=75 THEN 'Distinction' WHEN Mark>=50 THEN 'Pass' ELSE 'Fail' END AS Result FROM Enrolments ORDER BY EnrolmentID;",
    "expected": "CASE selects the first true condition. Test NULL explicitly and higher thresholds before lower ones."
  },
  {
    "id": "expanded-subquery",
    "title": "15. Above-average fees",
    "dataset": "college",
    "prompt": "Show courses costing more than the average course fee.",
    "hint": "The uncorrelated scalar subquery calculates the average once logically; compare every fee with it.",
    "answer": "SELECT CourseID,CourseName,Fee FROM Courses WHERE Fee>(SELECT AVG(Fee) FROM Courses) ORDER BY CourseID;",
    "expected": "The uncorrelated scalar subquery calculates the average once logically; compare every fee with it."
  },
  {
    "id": "expanded-exists",
    "title": "16. Students with high marks",
    "dataset": "college",
    "prompt": "List each student with at least one mark >=80 once.",
    "hint": "EXISTS tests for at least one qualifying enrolment without duplicating the student.",
    "answer": "SELECT s.StudentID,s.StudentName FROM Students s WHERE EXISTS(SELECT 1 FROM Enrolments e WHERE e.StudentID=s.StudentID AND e.Mark>=80) ORDER BY s.StudentID;",
    "expected": "EXISTS tests for at least one qualifying enrolment without duplicating the student."
  },
  {
    "id": "expanded-not-exists",
    "title": "17. Students without high marks",
    "dataset": "college",
    "prompt": "List students without any mark >=80.",
    "hint": "NOT EXISTS includes students for whom no qualifying child row exists, including students with no children.",
    "answer": "SELECT s.StudentID,s.StudentName FROM Students s WHERE NOT EXISTS(SELECT 1 FROM Enrolments e WHERE e.StudentID=s.StudentID AND e.Mark>=80) ORDER BY s.StudentID;",
    "expected": "NOT EXISTS includes students for whom no qualifying child row exists, including students with no children."
  },
  {
    "id": "expanded-cross",
    "title": "18. All student-course combinations",
    "dataset": "college",
    "prompt": "Produce all possible student-course pairs, sorted by both IDs.",
    "hint": "20 students multiplied by 4 courses yields 80 candidate combinations, not 40 actual enrolments.",
    "answer": "SELECT s.StudentID,c.CourseID FROM Students s CROSS JOIN Courses c ORDER BY s.StudentID,c.CourseID;",
    "expected": "20 students multiplied by 4 courses yields 80 candidate combinations, not 40 actual enrolments."
  },
  {
    "id": "expanded-self",
    "title": "19. Student pairs in the same city",
    "dataset": "college",
    "prompt": "List same-city student pairs once each, with the smaller ID first.",
    "hint": "The inequality removes self-pairs and mirrored duplicates. Each five-student city produces ten unordered pairs.",
    "answer": "SELECT a.StudentID AS FirstID,b.StudentID AS SecondID,a.City FROM Students a JOIN Students b ON a.City=b.City AND a.StudentID<b.StudentID ORDER BY a.StudentID,b.StudentID;",
    "expected": "The inequality removes self-pairs and mirrored duplicates. Each five-student city produces ten unordered pairs."
  },
  {
    "id": "expanded-union",
    "title": "20. Combine cities without duplicates",
    "dataset": "college",
    "prompt": "Combine cities from under-22 and older students without duplicates.",
    "hint": "UNION removes duplicate whole result rows. Four cities remain.",
    "answer": "SELECT City FROM Students WHERE Age<22 UNION SELECT City FROM Students WHERE Age>=22 ORDER BY City;",
    "expected": "UNION removes duplicate whole result rows. Four cities remain."
  },
  {
    "id": "expanded-union-all",
    "title": "21. Combine cities retaining duplicates",
    "dataset": "college",
    "prompt": "Combine the two age groups' cities while retaining duplicates.",
    "hint": "UNION ALL retains all 20 city occurrences from the two disjoint age groups.",
    "answer": "SELECT City FROM Students WHERE Age<22 UNION ALL SELECT City FROM Students WHERE Age>=22 ORDER BY City;",
    "expected": "UNION ALL retains all 20 city occurrences from the two disjoint age groups."
  },
  {
    "id": "expanded-cte",
    "title": "22. Name an aggregate query",
    "dataset": "college",
    "prompt": "Use a CTE to show courses with average marks >=60.",
    "hint": "A CTE names a query within one statement; it is not a permanently stored table.",
    "answer": "WITH CourseAverages AS (SELECT CourseID,AVG(CAST(Mark AS DECIMAL(10,2))) AS AverageMark FROM Enrolments GROUP BY CourseID) SELECT CourseID,AverageMark FROM CourseAverages WHERE AverageMark>=60 ORDER BY CourseID;",
    "expected": "A CTE names a query within one statement; it is not a permanently stored table."
  },
  {
    "id": "expanded-conditional",
    "title": "23. Count pass and pending rows",
    "dataset": "college",
    "prompt": "Show pass and pending counts per course.",
    "hint": "Conditional aggregation counts categories separately. Pending marks are not silently treated as failing scores.",
    "answer": "SELECT CourseID,SUM(CASE WHEN Mark>=50 THEN 1 ELSE 0 END) AS PassCount,SUM(CASE WHEN Mark IS NULL THEN 1 ELSE 0 END) AS PendingCount FROM Enrolments GROUP BY CourseID ORDER BY CourseID;",
    "expected": "Conditional aggregation counts categories separately. Pending marks are not silently treated as failing scores."
  },
  {
    "id": "expanded-having-count",
    "title": "24. Groups with enough enrolments",
    "dataset": "college",
    "prompt": "Find students enrolled in at least two courses.",
    "hint": "HAVING filters the aggregate. All 20 students currently have two enrolments.",
    "answer": "SELECT StudentID,COUNT(*) AS EnrolmentCount FROM Enrolments GROUP BY StudentID HAVING COUNT(*)>=2 ORDER BY StudentID;",
    "expected": "HAVING filters the aggregate. All 20 students currently have two enrolments."
  },
  {
    "id": "expanded-anti-left",
    "title": "25. Unmarked enrolment lookup",
    "dataset": "college",
    "prompt": "List students and course IDs for unmarked enrolments.",
    "hint": "IS NULL identifies the three unmarked enrolments; it does not test for a numeric zero.",
    "answer": "SELECT s.StudentID,s.StudentName,e.CourseID FROM Students s JOIN Enrolments e ON e.StudentID=s.StudentID WHERE e.Mark IS NULL ORDER BY s.StudentID,e.CourseID;",
    "expected": "IS NULL identifies the three unmarked enrolments; it does not test for a numeric zero."
  },
  {
    "id": "expanded-min-max",
    "title": "26. Mark range by course",
    "dataset": "college",
    "prompt": "Show the lowest, highest and spread of marks per course.",
    "hint": "MIN and MAX ignore NULL. Spread is the highest known mark minus the lowest.",
    "answer": "SELECT CourseID,MIN(Mark) AS Lowest,MAX(Mark) AS Highest,MAX(Mark)-MIN(Mark) AS Spread FROM Enrolments GROUP BY CourseID ORDER BY CourseID;",
    "expected": "MIN and MAX ignore NULL. Spread is the highest known mark minus the lowest."
  },
  {
    "id": "expanded-default-demo",
    "title": "27. Omitted columns and DEFAULT",
    "dataset": "college",
    "prompt": "Create PracticeFlags with a default Open status and demonstrate it.",
    "hint": "The omitted status receives Open. Reset before repeating CREATE TABLE.",
    "answer": "CREATE TABLE PracticeFlags(FlagID INTEGER PRIMARY KEY,Label VARCHAR(30) NOT NULL,Status VARCHAR(10) NOT NULL DEFAULT 'Open'); INSERT INTO PracticeFlags(FlagID,Label) VALUES(1,'Review SQL'); SELECT * FROM PracticeFlags;",
    "expected": "The omitted status receives Open. Reset before repeating CREATE TABLE."
  },
  {
    "id": "expanded-alter-demo",
    "title": "28. Add a nullable column",
    "dataset": "college",
    "prompt": "Create PracticeRooms, add Capacity and insert only RoomID=1.",
    "hint": "The new nullable column is NULL when omitted. SQL Server and SQLite both accept this simple ADD form. Reset before repeating.",
    "answer": "CREATE TABLE PracticeRooms(RoomID INTEGER PRIMARY KEY); ALTER TABLE PracticeRooms ADD Capacity INTEGER; INSERT INTO PracticeRooms(RoomID) VALUES(1); SELECT * FROM PracticeRooms;",
    "expected": "The new nullable column is NULL when omitted. SQL Server and SQLite both accept this simple ADD form. Reset before repeating."
  },
  {
    "id": "expanded-foreign-demo",
    "title": "29. Optional reference and SET NULL",
    "dataset": "college",
    "prompt": "Demonstrate ON DELETE SET NULL with a parent and one child.",
    "hint": "The child remains and ParentID becomes NULL; child column nullability permits this action. Reset before repeating.",
    "answer": "CREATE TABLE PracticeParents(ParentID INTEGER PRIMARY KEY); CREATE TABLE PracticeChildren(ChildID INTEGER PRIMARY KEY,ParentID INTEGER REFERENCES PracticeParents(ParentID) ON DELETE SET NULL); INSERT INTO PracticeParents VALUES(1); INSERT INTO PracticeChildren VALUES(10,1); DELETE FROM PracticeParents WHERE ParentID=1; SELECT * FROM PracticeChildren;",
    "expected": "The child remains and ParentID becomes NULL; child column nullability permits this action. Reset before repeating."
  },
  {
    "id": "expanded-category-count",
    "title": "30. Books per category",
    "dataset": "shop",
    "prompt": "Count books per category, preserving empty categories.",
    "hint": "Count a child key, not COUNT(*), to get zero for a category with no books. The original demo has three books in each category.",
    "answer": "SELECT c.CategoryName,COUNT(b.BookID) AS BookCount FROM Categories c LEFT JOIN Books b ON b.CategoryID=c.CategoryID GROUP BY c.CategoryID,c.CategoryName ORDER BY c.CategoryID;",
    "expected": "Count a child key, not COUNT(*), to get zero for a category with no books. The original demo has three books in each category."
  },
  {
    "id": "expanded-unsold",
    "title": "31. Books with no sales",
    "dataset": "shop",
    "prompt": "Find books with no matching sales.",
    "hint": "An empty result is correct: every original demo book has a sale. Add a new unsold book to test the other case.",
    "answer": "SELECT b.BookID,b.Title FROM Books b WHERE NOT EXISTS(SELECT 1 FROM Sales s WHERE s.BookID=b.BookID) ORDER BY b.BookID;",
    "expected": "An empty result is correct: every original demo book has a sale. Add a new unsold book to test the other case."
  },
  {
    "id": "expanded-daily",
    "title": "32. Daily sales quantities",
    "dataset": "shop",
    "prompt": "Show total copies sold on each date.",
    "hint": "Group by the date for a daily quantity total; current prices are not needed.",
    "answer": "SELECT SaleDate,SUM(Quantity) AS Copies FROM Sales GROUP BY SaleDate ORDER BY SaleDate;",
    "expected": "Group by the date for a daily quantity total; current prices are not needed."
  }
];
