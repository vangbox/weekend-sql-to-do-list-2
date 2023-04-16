-- CREATE THE TABLE:
CREATE TABLE TODO (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR(100),
	"completed" BOOL,
);

-- Insert multiple rows into the todo table:
INSERT INTO TODO (
	"todo",
	"completed"
) VALUES (
	"clean dishes",
	FALSE
),
(
	'wash car',
	FALSE
),
(
	'make coffee',
	FALSE
),
(
	'do laundry',
	FALSE
),
(
	'go to work',
	FALSE
);

-- In postico, this command will show what is in your table currently:
SELECT
	*
FROM
	TODO;