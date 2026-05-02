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

// AUTH MIDDLEWARE
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

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
      if (err) {
        return res.status(400).json({ message: "Email already exists" });
      }

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

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

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
app.post("/tasks", authMiddleware, (req, res) => {
  const { title, deadline } = req.body;

  db.run(
    "INSERT INTO tasks (title, status, deadline, user_id) VALUES (?, ?, ?, ?)",
    [title, "todo", deadline, req.user.id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        id: this.lastID,
        title,
        status: "todo",
        deadline,
        user_id: req.user.id,
      });
    }
  );
});

// TASK LİSTELE
app.get("/tasks", authMiddleware, (req, res) => {
  db.all(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC",
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);

      res.json(rows);
    }
  );
});

// TASK STATUS GÜNCELLE
app.put("/tasks/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run(
    "UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?",
    [status, id, req.user.id],
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
app.delete("/tasks/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, req.user.id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Task deleted",
        id,
        changes: this.changes,
      });
    }
  );
});

module.exports = app;