-- Reference solution — schema.sql

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO users (email) VALUES
  ('ana@example.com'),
  ('ben@example.com'),
  ('cleo@example.com');

INSERT INTO tasks (user_id, title, done) VALUES
  (1, 'Buy milk',              FALSE),
  (1, 'Write the SQL schema',  TRUE),
  (1, 'Read the pg docs',      FALSE),
  (1, 'Add pagination',        FALSE),
  (2, 'Set up CI',             FALSE),
  (2, 'Review pull request',   TRUE),
  (3, 'Draft Practice 1 plan', FALSE);
