-- STUDY PART: Create the practice database
-- Run this setup once in SSMS, before starting the ADO.NET API.
IF DB_ID('StudyLabAdo') IS NULL CREATE DATABASE StudyLabAdo;
GO
-- STUDY PART: Select the database
USE StudyLabAdo;
GO
-- STUDY PART: Create the Students table
-- The database generates the ID and enforces the age range.
CREATE TABLE dbo.Students(Id int IDENTITY PRIMARY KEY, Name nvarchar(80) NOT NULL, Age int NOT NULL CHECK(Age BETWEEN 16 AND 100));
