function Sidebar({ filter, setFilter, darkMode, setDarkMode, logout }) {
  return (
    <aside className="sidebar">
      <div>
        <h2>Student Planner</h2>
        <p className="sidebarSub">Study management</p>
      </div>

      <nav className="sidebarNav">
        <button
          className={filter === "all" ? "navItem activeNav" : "navItem"}
          onClick={() => setFilter("all")}
        >
          All Tasks
        </button>

        <button
          className={filter === "todo" ? "navItem activeNav" : "navItem"}
          onClick={() => setFilter("todo")}
        >
          Todo
        </button>

        <button
          className={filter === "done" ? "navItem activeNav" : "navItem"}
          onClick={() => setFilter("done")}
        >
          Done
        </button>
      </nav>

      <div className="sidebarBottom">
        <button className="navItem" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <button className="logoutBtn" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;