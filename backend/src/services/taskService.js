const {
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
} = require("../models/taskModel");

const fetchTasks = (userId, page = 1, limit = 5) => {
  const currentPage = Number(page) || 1;
  const pageLimit = Number(limit) || 5;

  return new Promise((resolve, reject) => {
    getTasksByUser(userId, currentPage, pageLimit, (err, rows) => {
      if (err) {
        reject({
          status: 500,
          message: "Failed to fetch tasks",
        });
        return;
      }

      countTasksByUser(userId, (countErr, result) => {
        if (countErr) {
          reject({
            status: 500,
            message: "Failed to count tasks",
          });
          return;
        }

        const totalTasks = result?.total || 0;
        const totalPages = Math.max(
          1,
          Math.ceil(totalTasks / pageLimit)
        );

        resolve({
          tasks: rows,
          totalTasks,
          totalPages,
          currentPage,
          limit: pageLimit,
        });
      });
    });
  });
};

const addNewTask = (title, deadline, priority, category, userId) => {
  return new Promise((resolve, reject) => {
    createTask(title, deadline, priority, category, userId, function (err) {
      if (err) {
        reject({
          status: 500,
          message: "Failed to create task",
        });
        return;
      }

      resolve({
        id: this.lastID,
        title,
        deadline,
        priority: priority || "Medium",
        category: category || "Study",
        status: "todo",
        user_id: userId,
      });
    });
  });
};

const changeTaskStatus = (id, status, userId) => {
  return new Promise((resolve, reject) => {
    updateTaskStatus(id, status, userId, function (err) {
      if (err) {
        reject({ status: 500, message: "Failed to update task" });
        return;
      }

      resolve({
        message: "Task updated",
        changes: this.changes,
      });
    });
  });
};

const removeExistingTask = (id, userId) => {
  return new Promise((resolve, reject) => {
    deleteTask(id, userId, function (err) {
      if (err) {
        reject({ status: 500, message: "Failed to delete task" });
        return;
      }

      resolve({
        message: "Task deleted",
        changes: this.changes,
      });
    });
  });
};

const fetchTaskStats = (userId) => {
  return new Promise((resolve, reject) => {
    getTaskStats(userId, (err, stats) => {
      if (err) {
        reject({ status: 500, message: "Failed to fetch stats" });
        return;
      }

      resolve({
        done: stats?.done || 0,
        todo: stats?.todo || 0,
        total: stats?.total || 0,
      });
    });
  });
};

const fetchTasksByStatus = (status, userId) => {
  return new Promise((resolve, reject) => {
    getTasksByStatus(status, userId, (err, rows) => {
      if (err) {
        reject({
          status: 500,
          message: "Failed to fetch tasks by status",
        });
        return;
      }

      resolve(rows);
    });
  });
};

const fetchTasksByDeadline = (date, userId) => {
  return new Promise((resolve, reject) => {
    getTasksByDeadline(date, userId, (err, rows) => {
      if (err) {
        reject({
          status: 500,
          message: "Failed to fetch tasks by deadline",
        });
        return;
      }

      resolve(rows);
    });
  });
};

const fetchTasksByCategory = (category, userId) => {
  return new Promise((resolve, reject) => {
    getTasksByCategory(category, userId, (err, rows) => {
      if (err) {
        reject({
          status: 500,
          message: "Failed to fetch tasks by category",
        });
        return;
      }

      resolve(rows);
    });
  });
};

const searchUserTasks = (query, userId) => {
  return new Promise((resolve, reject) => {
    searchTasks(query, userId, (err, rows) => {
      if (err) {
        reject({
          status: 500,
          message: "Failed to search tasks",
        });
        return;
      }

      resolve(rows);
    });
  });
};

const editExistingTask = (id, title, deadline, priority, category, userId) => {
  return new Promise((resolve, reject) => {
    updateTaskDetails(
      id,
      title,
      deadline,
      priority,
      category,
      userId,
      function (err) {
        if (err) {
          reject({ status: 500, message: "Failed to edit task" });
          return;
        }

        resolve({
          message: "Task edited successfully",
          changes: this.changes,
        });
      }
    );
  });
};

module.exports = {
  fetchTasks,
  addNewTask,
  changeTaskStatus,
  removeExistingTask,
  fetchTaskStats,
  fetchTasksByStatus,
  fetchTasksByDeadline,
  fetchTasksByCategory,
  searchUserTasks,
  editExistingTask,
};