const express = require("express");
const cors = require("cors");

require("./config/database");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const errorMiddleware = require("./middleware/errorMiddleware");
const loggerMiddleware = require("./middleware/loggerMiddleware");

app.use(loggerMiddleware);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/", authRoutes);
app.use("/tasks", taskRoutes);

app.use(errorMiddleware);

module.exports = app;