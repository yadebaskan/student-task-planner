function TaskItem({
  task,
  toggleStatus,
  deleteTask,
  isOverdue,
}) {
  return (
    <div
      className={`taskItem ${
        String(task.status).toLowerCase().trim() === "done"
          ? "doneTask"
          : ""
      }`}
    >
      <div>
        <h3>{task.title}</h3>

        <p>Status: {task.status}</p>

        <p className={isOverdue(task) ? "overdueText" : ""}>
          Deadline: {task.deadline || "No deadline"}
        </p>
      </div>

      <div className="actions">
        <button
          className="doneBtn"
          onClick={() => toggleStatus(task)}
        >
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
  );
}

export default TaskItem;