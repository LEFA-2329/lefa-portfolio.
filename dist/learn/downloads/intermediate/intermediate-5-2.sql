-- StudyLab DATA6222: Foreign keys and referential actions
-- Environment: browser
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

CREATE TABLE PracticeParents(ParentID INT PRIMARY KEY);
CREATE TABLE PracticeChildren(ChildID INT PRIMARY KEY,ParentID INT NULL,
 CONSTRAINT FK_PracticeChildren_Parents FOREIGN KEY(ParentID)
 REFERENCES PracticeParents(ParentID) ON DELETE SET NULL);
INSERT INTO PracticeParents VALUES(1);
INSERT INTO PracticeChildren VALUES(10,1);
DELETE FROM PracticeParents WHERE ParentID=1;
SELECT * FROM PracticeChildren;
