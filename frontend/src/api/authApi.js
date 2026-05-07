const API_URL = "http://localhost:3000";

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  return {
    ok: res.ok,
    data,
  };
};

export const loginUser = async (userData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  return {
    ok: res.ok,
    data,
  };
};