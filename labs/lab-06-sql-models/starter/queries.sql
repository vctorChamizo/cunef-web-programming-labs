-- queries.sql — Session 22 Lab: SQL & the models/ seam
-- Web Application Programming (G247) · CUNEF EPS · Block II · Week 8
--
-- Run these after schema.sql, e.g. in psql:  \i queries.sql
-- Each query is commented with the question it answers.

-- (a) How many tasks does each user have?
-- TODO: use LEFT JOIN, GROUP BY and COUNT so a user with zero tasks appears.

-- (b) Who has the most OPEN (not done) tasks?
-- TODO: join users and tasks, filter, group, sort and keep the top row.

-- (c) The five most recently inserted tasks, with the owner's email.
-- TODO: join users and tasks, then use t.id as the insertion-order proxy.

-- (d) Paginated list of tasks — 10 per page.
-- TODO: write the same stable, ordered query twice: OFFSET 0 and OFFSET 2.
