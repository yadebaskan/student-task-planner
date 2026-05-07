const {
  fetchTasks,
  addNewTask,
  changeTaskStatus,
  removeExistingTask,
  fetchTaskStats,
  fetchTasksByStatus,
  fetchTasksByDeadline,
} = require("../services/taskService");

const {
  validateTaskInput,
} = require("../utils/validators");

const getTasks = async (req, res) => {
  try {
    const tasks = await fetchTasks(req.user.id);

    res.json(tasks);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, deadline } = req.body;

    const validationError =
      validateTaskInput(title);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const task = await addNewTask(
      title,
      deadline,
      req.user.id
    );

    res.json(task);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await changeTaskStatus(
      id,
      status,
      req.user.id
    );

    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const removeTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await removeExistingTask(
      id,
      req.user.id
    );

    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const taskStats = async (req, res) => {
  try {
    const stats = await fetchTaskStats(req.user.id);

    res.json(stats);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const tasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const tasks = await fetchTasksByStatus(
      status,
      req.user.id
    );

    res.json(tasks);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const tasksByDeadline = async (req, res) => {
  try {
    const { date } = req.params;

    const tasks = await fetchTasksByDeadline(
      date,
      req.user.id
    );

    res.json(tasks);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  removeTask,
  taskStats,
  tasksByStatus,
  tasksByDeadline,
};