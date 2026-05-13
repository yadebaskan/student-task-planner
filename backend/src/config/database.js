const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.error("Database error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      deadline TEXT,
      priority TEXT,
      category TEXT,
      status TEXT DEFAULT 'todo',
      user_id INTEGER
    )
  `);

  const columns = [
    "deadline TEXT",
    "priority TEXT",
    "category TEXT",
    "status TEXT DEFAULT 'todo'",
    "user_id INTEGER",
  ];

  columns.forEach((column) => {
    const columnName = column.split(" ")[0];

    db.run(`ALTER TABLE tasks ADD COLUMN ${column}`, (err) => {
      if (err) {
        console.log(`${columnName} column already exists`);
      } else {
        console.log(`${columnName} column added`);
      }
    });
  });
});

module.exports = db;