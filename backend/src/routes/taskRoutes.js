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
} = require("../controllers/taskController");

router.get("/", authMiddleware, getTasks);

router.post("/", authMiddleware, addTask);

router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, removeTask);

router.get("/stats", authMiddleware, taskStats);

router.get("/status/:status", authMiddleware, tasksByStatus);

router.get("/deadline/:date", authMiddleware, tasksByDeadline);

module.exports = router;