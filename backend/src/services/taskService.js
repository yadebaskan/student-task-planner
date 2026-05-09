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
} = require("../models/taskModel");

const fetchTasks = (userId) => {
  return new Promise((resolve, reject) => {
    getTasksByUser(userId, (err, rows) => {
      if (err) {
        reject({ status: 500, message: "Failed to fetch tasks" });
        return;
      }

      resolve(rows);
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

      resolve(stats);
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
    updateTaskDetails(id, title, deadline, priority, category, userId, function (err) {
      if (err) {
        reject({ status: 500, message: "Failed to edit task" });
        return;
      }

      resolve({
        message: "Task edited successfully",
      });
    });
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