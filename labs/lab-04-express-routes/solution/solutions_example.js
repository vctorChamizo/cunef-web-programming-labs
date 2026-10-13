/*
  Reference solution — Session 15 Lab: Your First Express Routes
  Web Application Programming (G247) · CUNEF Escuela Politécnica Superior
  Week 5 · Session 15 · Practice (AF2) · Pair work

  REFERENCE ONLY — do not copy for your own submission.
  Same role as example_football_club.html in the Session 3 lab: it shows
  the expected shape and depth of a passing submission. Your pair must
  write your own code — and be able to explain every line of it.

  This SINGLE file assembles the whole Tasks API skeleton so you can run it
  with one command. In your own repo the same code is split across three
  files — each section below is labelled with the src/ file it maps to:

    logger()                 -> src/middleware/logger.js
    routes + seed array      -> src/app.js
    app.listen(...)          -> src/server.js

  Run it:
    node solutions_example.js
  then, from another terminal:
    curl http://localhost:3000/health
    curl http://localhost:3000/echo/hello
    curl http://localhost:3000/tasks
    curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Buy milk\"}"

  Or run the built-in smoke test (starts, checks every route, then exits):
    SELFTEST=1 node solutions_example.js
*/

const express = require("express");

// =====================================================================
// src/middleware/logger.js
//   Application-level middleware: prints one line per request, then hands
//   control on with next(). Forgetting next() would hang every request.
// =====================================================================
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

// =====================================================================
// src/app.js — temporary data used by the routes below
//   Hard-coded placeholder data. Sessions 16 and 17 move this behind
//   controllers and add centralised error handling before Session 18 turns
//   the array into full CRUD. The shape matches the later tasks schema.
// =====================================================================
const tasks = [
  { id: 1, title: "Write the API skeleton", done: true, userId: 1 },
  { id: 2, title: "Add a request logger", done: false, userId: 1 },
  { id: 3, title: "Create the first routes", done: false, userId: 2 },
];

// =====================================================================
// src/app.js
//   Builds the app, registers middleware + routes, and EXPORTS the app (it
//   does not call listen). Order matters: parsing and logging come first.
// =====================================================================
const app = express();

app.use(express.json()); // parse JSON bodies into req.body
app.use(logger);         // one log line per request

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/echo/:msg", (req, res) => {
  res.json({ echo: req.params.msg });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  res.status(201).json({ received: req.body });
});

// =====================================================================
// src/server.js
//   Imports the app and starts listening. Keeping listen() out of app.js
//   is what lets later labs import the app for testing without a port.
// =====================================================================
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
  console.log(`Tasks API listening on http://localhost:${PORT}`);
  if (process.env.SELFTEST) {
    await runSelfTest(PORT);
    server.close(() => console.log("Self-test finished; server closed."));
  }
});

// ---------------------------------------------------------------------
// Built-in smoke test (not part of the student deliverable) — proves the
// four routes behave. Uses the global fetch available in Node 18+.
// ---------------------------------------------------------------------
async function runSelfTest(port) {
  const base = `http://localhost:${port}`;

  const health = await fetch(`${base}/health`);
  const healthBody = await health.json();
  console.assert(health.status === 200, "GET /health -> 200");
  console.assert(healthBody.status === "ok", 'GET /health -> { status: "ok" }');

  const echo = await fetch(`${base}/echo/hello`);
  const echoBody = await echo.json();
  console.assert(echoBody.echo === "hello", "GET /echo/:msg reflects the param");

  const list = await fetch(`${base}/tasks`);
  const listBody = await list.json();
  console.assert(Array.isArray(listBody), "GET /tasks -> array");
  console.assert(listBody.length === 3, "GET /tasks -> 3 seeded tasks");

  const created = await fetch(`${base}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Buy milk", done: false, userId: 1 }),
  });
  const createdBody = await created.json();
  console.assert(created.status === 201, "POST /tasks -> 201");
  console.assert(createdBody.received.title === "Buy milk", "POST /tasks echoes req.body");

  console.log("All self-test assertions passed (silent === pass).");
}
