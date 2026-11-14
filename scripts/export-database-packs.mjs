import fs from 'node:fs';
import {
  dbLessons,
  dbUnits,
} from '../dist/learn/js/database/content/introduction-lessons.mjs';
import {
  intermediateLessons,
  intermediateUnits,
} from '../dist/learn/js/database/content/intermediate-lessons.mjs';
const out = {
  database: {
    code: 'DATA6211',
    title: 'Database Introduction',
    units: dbUnits.map((u) => ({
      ...u,
      number: u.id,
      lessons: dbLessons.filter((l) => l.unit === u.id),
      questions: dbLessons.find((l) => l.unit === u.id).tasks.slice(1),
    })),
  },
  intermediate: {
    code: 'DATA6222',
    title: 'Database Intermediate',
    units: intermediateUnits.map((u) => ({
      ...u,
      lessons: intermediateLessons.filter((l) => l.unit === u.id),
      questions: intermediateLessons
        .filter((l) => l.unit === u.id)
        .map((l) => ({ ...l.task, title: l.title })),
    })),
  },
};
const units = out.intermediate.units;
units[5].questions[1].prompt =
  'Normalise Enrolment(StudentID,CourseID,StudentName,CourseName,LecturerID,LecturerName,Mark) to 3NF. The candidate key is (StudentID,CourseID). StudentID determines StudentName; CourseID determines CourseName and LecturerID; LecturerID determines LecturerName; the full key determines Mark. Assume one lecturer per course.';
units[7].questions[0].prompt =
  'In SSMS, run DECLARE @n INT=2; then GO on its own line, then SELECT @n; on the next line. Explain the error, correct the script and describe how an application should handle GO.';
units[8].questions[0].prompt =
  'The procedure dbo.usp_StudyLabStudentsByCity accepts @City VARCHAR(60) and selects StudentID and StudentName from dbo.Students for that city. Explain how to change it and remove it. Give two advantages of stored procedures and one maintenance cost.';
units[8].questions[1].prompt =
  "dbo.usp_StudyLabCountStudents has parameters @City VARCHAR(60)='Polokwane' and @Total INT OUTPUT. It assigns the city student count to @Total and returns status 0. Call it for Pretoria, capture the count and status, and explain what breaks if the caller omits OUTPUT.";
units[8].questions[2].prompt =
  'dbo.usp_StudyLabChangeAge accepts @StudentID INT and @Age INT. It rejects NULL or ages below 18 and unknown students, owns its transaction, and rejects calls inside another transaction. Design three tests and explain why parameter validation alone is insufficient for referential integrity.';
fs.writeFileSync(
  process.argv[2] || '/tmp/studylab-pack-content.json',
  JSON.stringify(out),
);
