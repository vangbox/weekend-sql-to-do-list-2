-- CREATE THE TABLE:
CREATE TABLE toDo (
	"id" SERIAL PRIMARY KEY,
	"toDo" VARCHAR(100),
	"completed" BOOL
);

-- Insert multiple rows into the todo table:
INSERT INTO toDo
	("toDo", "completed")
	VALUES
	('do laundry', false),
	('go to work', true);

-- In postico, this command will show what is in your table currently:
	SELECT * FROM toDo;