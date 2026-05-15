function OverdueTasks({ tasks, isOverdue }) {
  const overdueTasks = tasks.filter(
    (task) =>
      isOverdue(task) &&
      String(task.status).toLowerCase() !== "done"
  );

  return (
    <div className="overdueSection">
      <h2>Overdue Tasks</h2>

      {overdueTasks.length === 0 ? (
        <p className="emptyState">No overdue tasks 🎉</p>
      ) : (
        <div className="overdueList">
          {overdueTasks.map((task) => (
            <div key={task.id} className="overdueCard">
              <h4>{task.title}</h4>

              <p>
                {task.deadline} • {task.priority}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OverdueTasks;