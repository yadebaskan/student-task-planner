const db = require("../config/database");

const createUser = (name, email, hashedPassword, callback) => {
  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    callback
  );
};

const findUserByEmail = (email, callback) => {
  db.get("SELECT * FROM users WHERE email = ?", [email], callback);
};

module.exports = {
  createUser,
  findUserByEmail,
};