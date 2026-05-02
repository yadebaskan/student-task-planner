const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.error("Database error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    status TEXT
  )
`);

db.run(`ALTER TABLE tasks ADD COLUMN deadline TEXT`, (err) => {
  if (err) {
    console.log("deadline column already exists");
  } else {
    console.log("deadline column added");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

module.exports = db;