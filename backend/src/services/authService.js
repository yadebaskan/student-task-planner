const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createUser, findUserByEmail } = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    createUser(name, email, hashedPassword, function (err) {
      if (err) {
        reject({ status: 400, message: "Email already exists" });
        return;
      }

      resolve({
        message: "User registered successfully",
        userId: this.lastID,
      });
    });
  });
};

const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    findUserByEmail(email, async (err, user) => {
      if (err) {
        reject({ status: 500, message: "Database error" });
        return;
      }

      if (!user) {
        reject({ status: 400, message: "User not found" });
        return;
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        reject({ status: 400, message: "Wrong password" });
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      resolve({
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
};

module.exports = {
  registerUser,
  loginUser,
};