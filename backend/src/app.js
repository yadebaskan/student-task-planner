const express = require("express");
const cors = require("cors");

require("./config/database");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/", authRoutes);
app.use("/tasks", taskRoutes);

module.exports = app;