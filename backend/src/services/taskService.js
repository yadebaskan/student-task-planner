const {
  getTasksByUser,
  createTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats,
  getTasksByStatus,
  getTasksByDeadline,
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

const addNewTask = (title, deadline, userId) => {
  return new Promise((resolve, reject) => {
    createTask(
      title,
      deadline,
      userId,
      function (err) {
        if (err) {
          reject({ status: 500, message: "Failed to create task" });
          return;
        }

        resolve({
          id: this.lastID,
          title,
          deadline,
          status: "todo",
        });
      }
    );
  });
};

const changeTaskStatus = (id, status, userId) => {
  return new Promise((resolve, reject) => {
    updateTaskStatus(
      id,
      status,
      userId,
      function (err) {
        if (err) {
          reject({ status: 500, message: "Failed to update task" });
          return;
        }

        resolve({
          message: "Task updated",
        });
      }
    );
  });
};

const removeExistingTask = (id, userId) => {
  return new Promise((resolve, reject) => {
    deleteTask(
      id,
      userId,
      function (err) {
        if (err) {
          reject({ status: 500, message: "Failed to delete task" });
          return;
        }

        resolve({
          message: "Task deleted",
        });
      }
    );
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
    getTasksByStatus(
      status,
      userId,
      (err, rows) => {
        if (err) {
          reject({
            status: 500,
            message: "Failed to fetch tasks by status",
          });
          return;
        }

        resolve(rows);
      }
    );
  });
};

const fetchTasksByDeadline = (date, userId) => {
  return new Promise((resolve, reject) => {
    getTasksByDeadline(
      date,
      userId,
      (err, rows) => {
        if (err) {
          reject({
            status: 500,
            message: "Failed to fetch tasks by deadline",
          });
          return;
        }

        resolve(rows);
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
};