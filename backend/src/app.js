require("./config/database");

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./config/database");

const app = express();
const JWT_SECRET = "student_secret_key";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BACKEND ÇALIŞIYOR");
});

// REGISTER
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    function (err) {
      if (err) return res.status(400).json({ message: "Email already exists" });

      res.json({
        message: "User registered successfully",
        userId: this.lastID,
      });
    }
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
});

// TASK EKLE
app.post("/tasks", (req, res) => {
  const { title, deadline } = req.body;

  db.run(
    "INSERT INTO tasks (title, status, deadline) VALUES (?, ?, ?)",
    [title, "todo", deadline],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        id: this.lastID,
        title,
        status: "todo",
        deadline,
      });
    }
  );
});

// TASK LİSTELE
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json(err);

    res.json(rows);
  });
});

// TASK STATUS GÜNCELLE
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Task status updated",
        id,
        status,
        changes: this.changes,
      });
    }
  );
});

// TASK SİL
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json(err);

    res.json({ message: "Task deleted", id });
  });
});

module.exports = app;