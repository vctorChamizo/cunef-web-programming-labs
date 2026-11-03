-- Reference solution — queries.sql

-- (a) Number of tasks for every user, including users with zero tasks.
SELECT u.email, COUNT(t.id) AS task_count
FROM users u
LEFT JOIN tasks t ON t.user_id = u.id
GROUP BY u.id, u.email
ORDER BY task_count DESC, u.email;

-- (b) User with the most open tasks.
SELECT u.email, COUNT(*) AS open_tasks
FROM tasks t
JOIN users u ON u.id = t.user_id
WHERE t.done = FALSE
GROUP BY u.id, u.email
ORDER BY open_tasks DESC, u.email
LIMIT 1;

-- (c) Five most recently inserted tasks and their owner's email.
SELECT t.id, t.title, t.done, u.email
FROM tasks t
JOIN users u ON u.id = t.user_id
ORDER BY t.id DESC
LIMIT 5;

-- (d) Two stable pagination windows with different offsets.
SELECT id, user_id, title, done
FROM tasks
ORDER BY id
LIMIT 10 OFFSET 0;

SELECT id, user_id, title, done
FROM tasks
ORDER BY id
LIMIT 10 OFFSET 2;
