-- CREATE THE TABLE: 
CREATE TABLE toDo (
	"id" SERIAL PRIMARY KEY,
	"toDo" VARCHAR(100),
	"completed" BOOL,
);

-- Insert multiple rows into the toDo table:
IINSERT INTO toDo
	("toDo", "completed")
	VALUES
	('clean dishes', false),
	('wash car', false),
	('make coffee', false),
	('do laundry', false),
	('go to work', false);
	
-- In postico, this command will show what is in your table currently:
SELECT * FROM toDo;