-- StudyLab DATA6222: Entity integrity and named constraints
-- Environment: browser
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

CREATE TABLE PracticeScores (
 ScoreID INT CONSTRAINT PK_PracticeScores PRIMARY KEY,
 Email VARCHAR(120) NOT NULL CONSTRAINT UQ_PracticeScores_Email UNIQUE,
 Mark INT NOT NULL CONSTRAINT CK_PracticeScores_Mark CHECK(Mark BETWEEN 0 AND 100),
 Status VARCHAR(12) NOT NULL CONSTRAINT DF_PracticeScores_Status DEFAULT 'Pending'
);
INSERT INTO PracticeScores(ScoreID,Email,Mark) VALUES(1,'test@example.com',70);
SELECT * FROM PracticeScores;
