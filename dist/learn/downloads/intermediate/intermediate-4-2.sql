-- StudyLab DATA6222: ALTER, DROP and change planning
-- Environment: native
-- Use a disposable practice database. Load college-setup.sql for college tables.
-- CREATE examples normally run once; inspect existing objects before repeating.

CREATE TABLE PracticeRooms (RoomID INT PRIMARY KEY, RoomName NVARCHAR(60) NOT NULL);
ALTER TABLE PracticeRooms ADD Capacity INT NULL;
ALTER TABLE PracticeRooms ALTER COLUMN RoomName NVARCHAR(100) NOT NULL;
SELECT * FROM PracticeRooms;
DROP TABLE PracticeRooms;
