function Header({
  user,
  tasks,
  darkMode,
  setDarkMode,
  logout,
}) {
  return (
    <div className="header">
      <div>
        <h1>Student Task Planner</h1>
        <p>Welcome, {user.name}. Plan your study tasks.</p>
      </div>

      <div className="headerRight">
        <span className="badge">{tasks.length} tasks</span>

        <button
          className="darkBtn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <button className="logoutBtn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;