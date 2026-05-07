import { useState, useEffect } from "react";
import "./App.css";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "react-calendar/dist/Calendar.css";

import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ChartSection from "./components/ChartSection";
import CalendarSection from "./components/CalendarSection";

import { registerUser, loginUser } from "./api/authApi";

import {
  fetchTasksApi,
  addTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "./api/taskApi";

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

  const fetchTasks = async () => {
    const data = await fetchTasksApi();

    if (Array.isArray(data)) {
      setTasks(data);
    } else {
      setTasks([]);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      fetchTasks();
    }
  }, []);

  const register = async () => {
    const result = await registerUser({
      name,
      email,
      password,
    });

    if (!result.ok) {
      alert(result.data.message);
      return;
    }

    alert("Registration successful. Please login.");
    setAuthMode("login");
  };

  const login = async () => {
    const result = await loginUser({
      email,
      password,
    });

    if (!result.ok) {
      alert(result.data.message);
      return;
    }

    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data.user));

    setUser(result.data.user);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setTasks([]);
  };

  const addTask = async () => {
    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    await addTaskApi({
      title,
      deadline,
    });

    setTitle("");
    setDeadline("");
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    const currentStatus = String(task.status).toLowerCase().trim();
    const newStatus = currentStatus === "done" ? "todo" : "done";

    await updateTaskApi(task.id, newStatus);

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await deleteTaskApi(id);

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
        <AuthForm
          authMode={authMode}
          name={name}
          email={email}
          password={password}
          setName={setName}
          setEmail={setEmail}
          setPassword={setPassword}
          register={register}
          login={login}
          setAuthMode={setAuthMode}
        />
      </div>
    );
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="card">
        <Header
          user={user}
          tasks={tasks}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          logout={logout}
        />

        <TaskForm
          title={title}
          deadline={deadline}
          setTitle={setTitle}
          setDeadline={setDeadline}
          addTask={addTask}
        />

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

        <ChartSection chartData={chartData} />

        <CalendarSection
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedDateString={selectedDateString}
          tasksForSelectedDate={tasksForSelectedDate}
        />

        <TaskList
          filteredTasks={filteredTasks}
          toggleStatus={toggleStatus}
          deleteTask={deleteTask}
          isOverdue={isOverdue}
        />
      </div>
    </div>
  );
}

export default App;