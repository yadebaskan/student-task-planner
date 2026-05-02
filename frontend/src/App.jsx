import { useState, useEffect } from "react";
import "./App.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("yade@test.com");
  const [password, setPassword] = useState("123456");

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("all");

  const getAuthHeaders = () => ({
    Authorization: localStorage.getItem("token"),
  });

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3000/tasks", {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      setTasks([]);
      return;
    }

    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      fetchTasks();
    }
  }, []);

  const register = async () => {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Registration successful. Please login.");
    setAuthMode("login");
  };

  const login = async () => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setTasks([]);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ title, deadline }),
    });

    setTitle("");
    setDeadline("");
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    const currentStatus = String(task.status).toLowerCase().trim();
    const newStatus = currentStatus === "done" ? "todo" : "done";

    const res = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();
    console.log("Updated task:", data);

    await fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    fetchTasks();
  };

  const isOverdue = (task) => {
    if (!task.deadline || task.status === "done") return false;

    const today = new Date();
    const deadlineDate = new Date(task.deadline);

    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    return deadlineDate < today;
  };

  const doneCount = tasks.filter(
    (task) => String(task.status).toLowerCase().trim() === "done"
  ).length;

  const todoCount = tasks.filter(
    (task) => String(task.status).toLowerCase().trim() === "todo"
  ).length;

  const chartData = {
    labels: ["Done", "Todo"],
    datasets: [
      {
        data: [doneCount, todoCount],
        backgroundColor: ["#4caf50", "#ff9800"],
        borderWidth: 1,
      },
    ],
  };

  const selectedDateString = selectedDate.toISOString().split("T")[0];

  const tasksForSelectedDate = tasks.filter(
    (task) => task.deadline === selectedDateString
  );

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;

    const taskStatus = String(task.status).toLowerCase().trim();
    return taskStatus === filter;
  });

  if (!user) {
    return (
      <div className={darkMode ? "app dark" : "app"}>
        <div className="authCard">
          <h1>{authMode === "login" ? "Login" : "Register"}</h1>
          <p>Welcome to Student Task Planner</p>

          {authMode === "register" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />

          <button onClick={authMode === "login" ? login : register}>
            {authMode === "login" ? "Login" : "Register"}
          </button>

          <button
            className="linkBtn"
            onClick={() =>
              setAuthMode(authMode === "login" ? "register" : "login")
            }
          >
            {authMode === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="card">
        <div className="header">
          <div>
            <h1>Student Task Planner</h1>
            <p>Welcome, {user.name}. Plan your study tasks.</p>
          </div>

          <div className="headerRight">
            <span className="badge">{tasks.length} tasks</span>

            <button className="darkBtn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button className="logoutBtn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <div className="form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Example: Study Software Architecture"
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="filterButtons">
          <button
            type="button"
            className={filter === "all" ? "activeFilter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            type="button"
            className={filter === "todo" ? "activeFilter" : ""}
            onClick={() => setFilter("todo")}
          >
            Todo
          </button>

          <button
            type="button"
            className={filter === "done" ? "activeFilter" : ""}
            onClick={() => setFilter("done")}
          >
            Done
          </button>
        </div>

        <div style={{ width: "250px", margin: "20px auto" }}>
          <Pie data={chartData} />
        </div>

        <div className="calendarSection">
          <h2>Calendar</h2>

          <Calendar onChange={setSelectedDate} value={selectedDate} />

          <div className="calendarTasks">
            <h3>Tasks on {selectedDateString}</h3>

            {tasksForSelectedDate.length === 0 ? (
              <p>No tasks for this date.</p>
            ) : (
              tasksForSelectedDate.map((task) => (
                <div className="calendarTask" key={task.id}>
                  {task.title} - {task.status}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="taskList">
          {filteredTasks.length === 0 ? (
            <p className="empty">No tasks found for this filter.</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                className={`taskItem ${
                  String(task.status).toLowerCase().trim() === "done"
                    ? "doneTask"
                    : ""
                }`}
                key={task.id}
              >
                <div>
                  <h3>{task.title}</h3>
                  <p>Status: {task.status}</p>

                  <p className={isOverdue(task) ? "overdueText" : ""}>
                    Deadline: {task.deadline || "No deadline"}
                  </p>
                </div>

                <div className="actions">
                  <button className="doneBtn" onClick={() => toggleStatus(task)}>
                    {String(task.status).toLowerCase().trim() === "done"
                      ? "Undo"
                      : "Done"}
                  </button>

                  <button
                    className="deleteBtn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;