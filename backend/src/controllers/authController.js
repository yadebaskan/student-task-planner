const { registerUser, loginUser } = require("../services/authService");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validators");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const validationError = validateRegisterInput(name, email, password);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const result = await registerUser(
      name.trim(),
      email.trim(),
      password.trim()
    );

    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validationError = validateLoginInput(email, password);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const result = await loginUser(email.trim(), password.trim());

    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Server error",
    });
  }
};

module.exports = {
  register,
  login,
};