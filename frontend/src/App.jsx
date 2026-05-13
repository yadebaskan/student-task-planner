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
import Sidebar from "./components/Sidebar";
import DashboardCards from "./components/DashboardCards";
import EditTaskModal from "./components/EditTaskModal";

import { registerUser, loginUser } from "./api/authApi";

import {
  fetchTasksApi,
  addTaskApi,
  updateTaskApi,
  deleteTaskApi,
  searchTasksApi,
  editTaskApi,
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
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Study");

  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async (currentPage = page) => {
  const data = await fetchTasksApi(currentPage);

  if (data.tasks) {
    setTasks(data.tasks);
    setTotalPages(data.totalPages || 1);
  } else {
    setTasks([]);
  }
};

  useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
    fetchTasks(page);
  }
}, [page]);

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

    const result = await addTaskApi({
      title,
      deadline,
      priority,
      category,
    });

    if (result.message && !result.id) {
      alert(result.message);
      return;
    }

    setTasks((prevTasks) => [result, ...prevTasks]);

    setTitle("");
    setDeadline("");
    setPriority("Medium");
    setCategory("Study");
  };

  const toggleStatus = async (task) => {
    const currentStatus = String(task.status).toLowerCase().trim();
    const newStatus = currentStatus === "done" ? "todo" : "done";

    await updateTaskApi(task.id, newStatus);

    setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id === task.id ? { ...item, status: newStatus } : item
      )
    );
  };

  const deleteTask = async (id) => {
    await deleteTaskApi(id);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const saveEditedTask = async (updatedTask) => {
    await editTaskApi(updatedTask.id, {
      title: updatedTask.title,
      deadline: updatedTask.deadline,
      priority: updatedTask.priority,
      category: updatedTask.category,
    });

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );

    setEditingTask(null);
  };

  const searchTasks = async () => {
    if (!searchQuery.trim()) {
      fetchTasks();
      return;
    }

    const data = await searchTasksApi(searchQuery);

    if (Array.isArray(data)) {
      setTasks(data);
    }
  };

  const isOverdue = (task) => {
    if (
      !task.deadline ||
      String(task.status).toLowerCase().trim() === "done"
    ) {
      return false;
    }

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
    const taskStatus = String(task.status).toLowerCase().trim();

    const statusMatch = filter === "all" || taskStatus === filter;

    const priorityMatch =
      priorityFilter === "all" ||
      String(task.priority || "Medium").toLowerCase() ===
        priorityFilter.toLowerCase();

    const categoryMatch =
      categoryFilter === "all" ||
      String(task.category || "Study").toLowerCase() ===
        categoryFilter.toLowerCase();

    return statusMatch && priorityMatch && categoryMatch;
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
      <div className="dashboardLayout">
        <Sidebar
          filter={filter}
          setFilter={setFilter}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          logout={logout}
        />

        <main className="mainContent">
          <Header
            user={user}
            tasks={tasks}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            logout={logout}
          />

          <DashboardCards tasks={tasks} />

          <div className="searchBar">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
            />

            <button onClick={searchTasks}>Search</button>

            <button
              className="clearSearchBtn"
              onClick={() => {
                setSearchQuery("");
                fetchTasks();
              }}
            >
              Clear
            </button>
          </div>

          <div className="advancedFilters">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Study">Study</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
            </select>
          </div>

          <section className="contentGrid">
            <div className="leftPanel">
              <TaskForm
                title={title}
                deadline={deadline}
                priority={priority}
                category={category}
                setTitle={setTitle}
                setDeadline={setDeadline}
                setPriority={setPriority}
                setCategory={setCategory}
                addTask={addTask}
              />

              <TaskList
                filteredTasks={filteredTasks}
                toggleStatus={toggleStatus}
                deleteTask={deleteTask}
                isOverdue={isOverdue}
                setEditingTask={setEditingTask}
              />
            </div>

            <div className="rightPanel">
              <ChartSection chartData={chartData} />

              <CalendarSection
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedDateString={selectedDateString}
                tasksForSelectedDate={tasksForSelectedDate}
              />
            </div>
          </section>
          <div className="pagination">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </button>

  <span>
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>
</div>

          <EditTaskModal
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            saveEditedTask={saveEditedTask}
          />
        </main>
      </div>
    </div>
  );
}

export default App;