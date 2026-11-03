function createTasksModel(db) {
  return {
    async findAll() {
      const { rows } = await db.query(
        "SELECT id, user_id, title, done FROM tasks ORDER BY id",
        [],
      );
      return rows;
    },

    async findById(id) {
      const { rows } = await db.query(
        "SELECT id, user_id, title, done FROM tasks WHERE id = $1",
        [id],
      );
      return rows[0] ?? null;
    },

    async create({ title, userId, done = false }) {
      const { rows } = await db.query(
        `INSERT INTO tasks (user_id, title, done)
         VALUES ($1, $2, $3)
         RETURNING id, user_id, title, done`,
        [userId, title, done],
      );
      return rows[0];
    },

    async update(id, fields) {
      const { rows } = await db.query(
        `UPDATE tasks
            SET title   = COALESCE($2, title),
                done    = COALESCE($3, done),
                user_id = COALESCE($4, user_id)
          WHERE id = $1
          RETURNING id, user_id, title, done`,
        [id, fields.title ?? null, fields.done ?? null, fields.userId ?? null],
      );
      return rows[0] ?? null;
    },

    async remove(id) {
      const result = await db.query(
        "DELETE FROM tasks WHERE id = $1 RETURNING id",
        [id],
      );
      return result.rowCount > 0;
    },

    async findByOwner(userId, { limit = 10, offset = 0 } = {}) {
      const { rows } = await db.query(
        `SELECT id, user_id, title, done FROM tasks
          WHERE user_id = $1
          ORDER BY id
          LIMIT $2 OFFSET $3`,
        [userId, limit, offset],
      );
      return rows;
    },
  };
}

module.exports = { createTasksModel };
