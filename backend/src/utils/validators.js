const validateRegisterInput = (name, email, password) => {
  if (
    !name ||
    !email ||
    !password ||
    !String(name).trim() ||
    !String(email).trim() ||
    !String(password).trim()
  ) {
    return "All fields are required";
  }

  if (!String(email).includes("@")) {
    return "Please enter a valid email";
  }

  if (String(password).trim().length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};

const validateLoginInput = (email, password) => {
  if (
    !email ||
    !password ||
    !String(email).trim() ||
    !String(password).trim()
  ) {
    return "Email and password are required";
  }

  return null;
};

const validateTaskInput = (title) => {
  if (!title || !String(title).trim()) {
    return "Task title is required";
  }

  return null;
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateTaskInput,
};