let tasks = [
  { id: 1, title: "Write the API skeleton", done: true, userId: 1 },
  { id: 2, title: "Add full CRUD", done: false, userId: 1 },
  { id: 3, title: "Return the right status codes", done: false, userId: 2 },
];
let nextId = 4;

function listTasks(req, res) {
  res.json(tasks);
}

function getTask(req, res) {
  const task = tasks.find((item) => item.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
}

function createTask(req, res) {
  const { title, done, userId } = req.body;
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }

  const task = {
    id: nextId++,
    title,
    done: done ?? false,
    userId: userId ?? null,
  };
  tasks.push(task);
  res.status(201).location(`/tasks/${task.id}`).json(task);
}

function updateTask(req, res) {
  const id = Number(req.params.id);
  const index = tasks.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, done, userId } = req.body;
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }

  const task = {
    id,
    title,
    done: done ?? false,
    userId: userId ?? null,
  };
  tasks[index] = task;
  res.json(task);
}

function deleteTask(req, res) {
  const id = Number(req.params.id);
  const index = tasks.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.status(204).end();
}

module.exports = { listTasks, getTask, createTask, updateTask, deleteTask };
