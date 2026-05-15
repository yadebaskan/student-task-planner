const {
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
} = require("../services/taskService");

const taskSchema = require("../validation/taskValidation");

const allowedStatuses = ["todo", "done"];
const allowedCategories = ["Study", "Work", "Personal", "Health"];

const getTasks = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 5);

    const result = await fetchTasks(req.user.id, page, limit);

    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const addTask = async (req, res) => {
  try {
    const { error } = taskSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { title, deadline, priority, category } = req.body;

    const task = await addNewTask(
      title.trim(),
      deadline,
      priority,
      category,
      req.user.id
    );

    res.status(201).json(task);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const { status } = req.body;

    if (!taskId) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid task status",
      });
    }

    const result = await changeTaskStatus(taskId, status, req.user.id);

    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const removeTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    if (!taskId) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const result = await removeExistingTask(taskId, req.user.id);

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

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid task status",
      });
    }

    const tasks = await fetchTasksByStatus(status, req.user.id);

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

    const tasks = await fetchTasksByDeadline(date, req.user.id);

    res.json(tasks);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const tasksByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid task category",
      });
    }

    const tasks = await fetchTasksByCategory(category, req.user.id);

    res.json(tasks);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const searchTasksController = async (req, res) => {
  try {
    const query = String(req.query.q || "").trim();

    const tasks = await searchUserTasks(query, req.user.id);

    res.json(tasks);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const editTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    if (!taskId) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    const { error } = taskSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { title, deadline, priority, category } = req.body;

    const result = await editExistingTask(
      taskId,
      title.trim(),
      deadline,
      priority,
      category,
      req.user.id
    );

    res.json(result);
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
  tasksByCategory,
  searchTasksController,
  editTask,
};