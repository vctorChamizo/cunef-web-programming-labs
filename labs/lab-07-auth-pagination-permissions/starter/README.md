# Lab 7 starter assembly

Create a new project directory. Copy `package.json` and `schema.sql` into its
root, then copy each `starter_<path>.js` file into `src/<path>.js`. For example,
`starter_controllers_authController.js` becomes
`src/controllers/authController.js`. Copy your current
`src/models/tasksModel.js` from Lab 6 into this project; it can still be in
progress while you implement registration, login and authentication. Complete
that model before testing the task operations. The seven remaining
starter files contain the work to implement; `starter_app.js` and
`starter_server.js` provide the Express and database wiring.
Copy `tests/api.test.js` into the project's `tests/` directory. The health
check passes at the start; the protected-route test is skipped until `auth` is
implemented. Enable it then add tests for registration, login, validation, ownership and
pagination as the work progresses.

Use a **new local PostgreSQL database** for `schema.sql`: Lab 6's seeded users
have no password hashes, so adding a `NOT NULL` column directly to that table
would fail. The fresh schema preserves the Lab 6 `tasks` columns and adds
`password_hash` and `role` to `users`.

```text
src/
  app.js
  server.js
  controllers/authController.js
  controllers/tasksController.js
  middleware/auth.js
  models/tasksModel.js       # completed Lab 6 model
  models/usersModel.js
  routes/auth.js
  routes/tasks.js
  validators/taskSchema.js
tests/
  api.test.js
```

Install with `npm install`. Set `DATABASE_URL` and a locally generated
`JWT_SECRET` in the environment, run `psql "$DATABASE_URL" -f schema.sql`, then
start the API with `npm start`. `GET /health` confirms that the wiring boots;
`npm test` runs the first two checks. The new routes work after their TODOs are
completed. Never commit a real
database URL or JWT secret.
