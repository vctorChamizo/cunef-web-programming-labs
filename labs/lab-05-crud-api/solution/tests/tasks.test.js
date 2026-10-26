const request = require("supertest");
const app = require("../src/app");

describe("Tasks CRUD API", () => {
  test("GET /tasks lists the tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /tasks/:id returns one task or 404", async () => {
    const found = await request(app).get("/tasks/1");
    expect(found.status).toBe(200);
    expect(found.body.id).toBe(1);

    const missing = await request(app).get("/tasks/999");
    expect(missing.status).toBe(404);
  });

  test("POST /tasks creates a task with Location", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Test the CRUD API", userId: 1 });

    expect(response.status).toBe(201);
    expect(response.headers.location).toBe(`/tasks/${response.body.id}`);
    expect(response.body).toMatchObject({
      title: "Test the CRUD API",
      done: false,
      userId: 1,
    });
  });

  test("POST /tasks rejects a missing title", async () => {
    const response = await request(app).post("/tasks").send({ userId: 1 });
    expect(response.status).toBe(400);
  });

  test("PUT /tasks/:id fully replaces a task", async () => {
    const response = await request(app)
      .put("/tasks/1")
      .send({ title: "Replaced", done: true });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      title: "Replaced",
      done: true,
      userId: null,
    });
  });

  test("PUT /tasks/:id validates existence and title", async () => {
    const missing = await request(app)
      .put("/tasks/999")
      .send({ title: "Missing" });
    expect(missing.status).toBe(404);

    const invalid = await request(app).put("/tasks/2").send({ done: true });
    expect(invalid.status).toBe(400);
  });

  test("DELETE /tasks/:id removes a task with no response body", async () => {
    const created = await request(app)
      .post("/tasks")
      .send({ title: "Delete me" });

    const response = await request(app).delete(`/tasks/${created.body.id}`);
    expect(response.status).toBe(204);
    expect(response.text).toBe("");

    const gone = await request(app).get(`/tasks/${created.body.id}`);
    expect(gone.status).toBe(404);
  });

  test("DELETE /tasks/:id returns 404 for an unknown task", async () => {
    const response = await request(app).delete("/tasks/999");
    expect(response.status).toBe(404);
  });
});
