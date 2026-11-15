# Databases . DATA6211 - worked answers

Compare your reasoning, not only the final result. Code fragments assume the schema and environment in each question. Test SQL Server, WPF and Docker examples in their native tools.

## Answer 1

StudentID is the Student primary key. CourseID is the Course primary key and a foreign key in Student. This design assumes each student has one course.

## Answer 2

SELECT Name FROM Student ORDER BY Name ASC;
ORDER BY controls display order; storage order is not guaranteed.

## Answer 3

Student(StudentID PK, Name); Course(CourseID PK, Title); Enrolment(StudentID PK/FK, CourseID PK/FK). The two foreign keys form a composite primary key.

## Answer 4

StudentID determines StudentName; CourseID determines CourseTitle; the complete key determines Mark. Remove partial dependencies into Student and Course. Enrolment(StudentID, CourseID, Mark) keeps the mark. With only these dependencies, all three tables are in 3NF.

## Answer 5

The cell holds several course values, making individual courses hard to validate or join. Store one enrolment per row. 1NF requires one value per attribute in the intended domain, without repeating groups.

