function DashboardCards({ tasks }) {
  const total = tasks.length;

  const done = tasks.filter(
    (task) =>
      String(task.status || "")
        .toLowerCase()
        .trim() === "done"
  ).length;

  const todo = tasks.filter((task) => {
    const status = String(task.status || "todo")
      .toLowerCase()
      .trim();

    return status === "todo" || status === "";
  }).length;

  const overdue = tasks.filter((task) => {
    const status = String(task.status || "")
      .toLowerCase()
      .trim();

    if (!task.deadline || status === "done") {
      return false;
    }

    const today = new Date();
    const deadlineDate = new Date(task.deadline);

    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    return deadlineDate < today;
  }).length;

  return (
    <div className="dashboardCards">
      <div className="dashboardCard">
        <p>Total Tasks</p>
        <h2>{total}</h2>
      </div>

      <div className="dashboardCard">
        <p>Todo</p>
        <h2>{todo}</h2>
      </div>

      <div className="dashboardCard">
        <p>Completed</p>
        <h2>{done}</h2>
      </div>

      <div className="dashboardCard warningCard">
        <p>Overdue</p>
        <h2>{overdue}</h2>
      </div>
    </div>
  );
}

export default DashboardCards;