function DueToday({ tasks }) {
  const today = new Date().toISOString().split("T")[0];

  const todayTasks = tasks.filter(
    (task) =>
      task.deadline === today &&
      String(task.status).toLowerCase() !== "done"
  );

  return (
    <div className="todaySection">
      <h2>Due Today</h2>

      {todayTasks.length === 0 ? (
        <p className="emptyState">No tasks due today 🎉</p>
      ) : (
        <div className="todayList">
          {todayTasks.map((task) => (
            <div key={task.id} className="todayCard">
              <h4>{task.title}</h4>

              <p>
                {task.priority} • {task.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DueToday;