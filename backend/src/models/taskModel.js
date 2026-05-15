const db = require("../config/database");

const getTasksByUser = (userId, page = 1, limit = 5, callback) => {
  const offset = (page - 1) * limit;

  db.all(
    `
    SELECT * FROM tasks
    WHERE user_id = ?
    ORDER BY id DESC
    LIMIT ? OFFSET ?
    `,
    [userId, limit, offset],
    callback
  );
};

const createTask = (title, deadline, priority, category, userId, callback) => {
  db.run(
    `
    INSERT INTO tasks 
    (title, deadline, priority, category, status, user_id) 
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      title,
      deadline,
      priority || "Medium",
      category || "Study",
      "todo",
      userId,
    ],
    callback
  );
};

const updateTaskStatus = (id, status, userId, callback) => {
  db.run(
    "UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?",
    [status, id, userId],
    callback
  );
};

const deleteTask = (id, userId, callback) => {
  db.run(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, userId],
    callback
  );
};

const getTaskStats = (userId, callback) => {
  db.get(
    `
    SELECT 
      SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) AS done,
      SUM(CASE WHEN status = 'todo' THEN 1 ELSE 0 END) AS todo,
      COUNT(*) AS total
    FROM tasks
    WHERE user_id = ?
    `,
    [userId],
    callback
  );
};

const getTasksByStatus = (status, userId, callback) => {
  db.all(
    "SELECT * FROM tasks WHERE status = ? AND user_id = ? ORDER BY id DESC",
    [status, userId],
    callback
  );
};

const getTasksByDeadline = (deadline, userId, callback) => {
  db.all(
    "SELECT * FROM tasks WHERE deadline = ? AND user_id = ? ORDER BY id DESC",
    [deadline, userId],
    callback
  );
};

const getTasksByCategory = (category, userId, callback) => {
  db.all(
    "SELECT * FROM tasks WHERE category = ? AND user_id = ? ORDER BY id DESC",
    [category, userId],
    callback
  );
};

const searchTasks = (query, userId, callback) => {
  db.all(
    `
    SELECT * FROM tasks
    WHERE user_id = ?
    AND title LIKE ?
    ORDER BY id DESC
    `,
    [userId, `%${query}%`],
    callback
  );
};

const updateTaskDetails = (
  id,
  title,
  deadline,
  priority,
  category,
  userId,
  callback
) => {
  db.run(
    `
    UPDATE tasks
    SET title = ?, deadline = ?, priority = ?, category = ?
    WHERE id = ? AND user_id = ?
    `,
    [title, deadline, priority, category, id, userId],
    callback
  );
};

const countTasksByUser = (userId, callback) => {
  db.get(
    "SELECT COUNT(*) AS total FROM tasks WHERE user_id = ?",
    [userId],
    callback
  );
};

module.exports = {
  getTasksByUser,
  createTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats,
  getTasksByStatus,
  getTasksByDeadline,
  getTasksByCategory,
  searchTasks,
  updateTaskDetails,
  countTasksByUser,
};