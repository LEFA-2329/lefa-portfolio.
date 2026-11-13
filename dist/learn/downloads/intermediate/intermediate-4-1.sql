-- StudyLab DATA6222: Schemas, databases and data types
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

USE master;
GO
CREATE DATABASE StudyLabPractice;
GO
USE StudyLabPractice;
GO
CREATE SCHEMA teaching;
GO
CREATE TABLE teaching.Assessments (
 AssessmentID INT PRIMARY KEY,
 Title NVARCHAR(100) NOT NULL,
 DueDate DATE NULL, Weight DECIMAL(5,2) NOT NULL
);
