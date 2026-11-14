-- SQL Server 2016 or later. Create/select an EMPTY StudyLabRevision database first.
-- This resets only the four named teaching tables. Do not run in a database with valuable data.
SET XACT_ABORT ON;
-- StudyLab practice data. Run only in a separate empty practice database.
DROP TABLE IF EXISTS Enrolments;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS Departments;
CREATE TABLE Departments(DepartmentID INT PRIMARY KEY, DepartmentName VARCHAR(60) NOT NULL UNIQUE);
CREATE TABLE Students(StudentID INT PRIMARY KEY, StudentName VARCHAR(80) NOT NULL, DepartmentID INT NULL, City VARCHAR(60) NOT NULL, FOREIGN KEY(DepartmentID) REFERENCES Departments(DepartmentID));
CREATE TABLE Courses(CourseID INT PRIMARY KEY, CourseName VARCHAR(80) NOT NULL UNIQUE, Credits INT NOT NULL CHECK(Credits>0), Fee DECIMAL(10,2) NOT NULL CHECK(Fee>=0));
CREATE TABLE Enrolments(StudentID INT NOT NULL, CourseID INT NOT NULL, EnrolledOn DATE NOT NULL, Mark INT NULL CHECK(Mark BETWEEN 0 AND 100), PRIMARY KEY(StudentID,CourseID), FOREIGN KEY(StudentID) REFERENCES Students(StudentID), FOREIGN KEY(CourseID) REFERENCES Courses(CourseID));
INSERT INTO Departments VALUES
(1, 'Computing'),
(2, 'Business'),
(3, 'Science');
INSERT INTO Students VALUES
(1, 'Lefa', 2, 'Polokwane'),
(2, 'Amina', 3, 'Pretoria'),
(3, 'Thabo', 1, 'Johannesburg'),
(4, 'Lerato', 2, 'Polokwane'),
(5, 'Neo', 3, 'Pretoria'),
(6, 'Zanele', 1, 'Durban'),
(7, 'Mpho', 2, 'Polokwane'),
(8, 'Amina', 3, 'Cape Town'),
(9, 'Sipho', 1, 'Durban'),
(10, 'Naledi', 2, 'Pretoria'),
(11, 'Kabelo', 3, 'Johannesburg'),
(12, 'Ayanda', 1, 'Cape Town'),
(13, 'Tebogo', 2, 'Polokwane'),
(14, 'Buhle', 3, 'Durban'),
(15, 'Karabo', 1, 'Pretoria'),
(16, 'Palesa', 2, 'Johannesburg'),
(17, 'Sizwe', 3, 'Durban'),
(18, 'Dineo', 1, 'Pretoria'),
(19, 'Tshepo', 2, 'Polokwane'),
(20, 'Nandi', 3, 'Cape Town');
INSERT INTO Courses VALUES
(101, 'Database Foundations', 12, 1200),
(102, 'Database Intermediate', 16, 1600),
(103, 'C# Development', 16, 1800),
(104, 'Programming Logic', 12, 1000),
(105, 'Web Development', 12, 1400),
(106, 'Distributed Data', 16, 2000);
INSERT INTO Enrolments VALUES
(1, 101, '2026-02-01', 65),
(2, 101, '2026-02-01', 75),
(3, 101, '2026-02-01', 40),
(4, 101, '2026-02-01', 88),
(5, 101, '2026-02-01', NULL),
(6, 101, '2026-02-01', 50),
(7, 101, '2026-02-01', 72),
(8, 101, '2026-02-01', 61),
(9, 101, '2026-02-01', 45),
(10, 101, '2026-02-01', 90),
(11, 101, '2026-02-01', 55),
(12, 101, '2026-02-01', 67),
(13, 101, '2026-02-01', 80),
(14, 101, '2026-02-01', 49),
(15, 101, '2026-02-01', 70),
(16, 101, '2026-02-01', 60),
(17, 101, '2026-02-01', 51),
(1, 102, '2026-02-05', 70),
(2, 102, '2026-02-05', 85),
(4, 103, '2026-02-06', 78),
(6, 104, '2026-02-06', NULL),
(8, 105, '2026-02-07', 62),
(10, 103, '2026-02-07', 92);
