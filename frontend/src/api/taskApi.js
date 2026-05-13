const API_URL = "http://localhost:3000/tasks";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token"),
});

export const fetchTasksApi = async (page = 1) => {
  const res = await fetch(
    `${API_URL}?page=${page}&limit=5`,
    {
      headers: getHeaders(),
    }
  );

  return await res.json();
};

export const addTaskApi = async (taskData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(taskData),
  });

  return await res.json();
};

export const updateTaskApi = async (id, status) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });

  return await res.json();
};

export const deleteTaskApi = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return await res.json();
};

export const searchTasksApi = async (query) => {
  const res = await fetch(`${API_URL}/search?q=${query}`, {
    headers: getHeaders(),
  });

  return await res.json();
};

export const editTaskApi = async (id, taskData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(taskData),
  });

  return await res.json();
};