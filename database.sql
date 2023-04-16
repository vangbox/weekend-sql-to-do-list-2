-- CREATE THE TABLE: 
CREATE TABLE koalas (
	"id" SERIAL PRIMARY KEY,
	"toDo" VARCHAR(100),
	"completed" BOOL,
);

-- Insert multiple rows into the koalas table:
INSERT INTO toDo
	("toDo", "completed")
	VALUES
	

-- In postico, this command will show what is in your table currently:
SELECT * FROM toDo;