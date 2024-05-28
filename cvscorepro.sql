CREATE TABLE users (
	id  SERIAL PRIMARY KEY,
	created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	username VARCHAR(50) NOT NULL,
	password varchar(255) NOT NULL,
	UNIQUE(username)
);
