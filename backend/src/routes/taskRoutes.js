const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
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
} = require("../controllers/taskController");

router.get("/", authMiddleware, getTasks);

router.post("/", authMiddleware, addTask);

router.put("/:id", authMiddleware, updateTask);

router.patch("/:id", authMiddleware, editTask);

router.delete("/:id", authMiddleware, removeTask);

router.get("/search", authMiddleware, searchTasksController);

router.get("/stats", authMiddleware, taskStats);

router.get("/status/:status", authMiddleware, tasksByStatus);

router.get("/deadline/:date", authMiddleware, tasksByDeadline);

router.get("/category/:category", authMiddleware, tasksByCategory);

module.exports = router;