function TaskItem({
  task,
  toggleStatus,
  deleteTask,
  isOverdue,
  setEditingTask,
}) {
  const status = String(task.status || "todo").toLowerCase().trim();

  const priorityClass =
    task.priority === "High"
      ? "priorityBadge highBadge"
      : task.priority === "Medium"
      ? "priorityBadge mediumBadge"
      : "priorityBadge lowBadge";

  return (
  <div
  className={`taskItem ${status === "done" ? "doneTask" : ""} ${
    isOverdue(task) ? "overdueTask" : ""
  }`}
>
      <div className="taskMain">
        <div className="taskTitleRow">
          <h3>{task.title}</h3>

          <span className={status === "done" ? "statusBadge doneBadge" : "statusBadge todoBadge"}>
            {status}
          </span>
        </div>

        <div className="taskMeta">
          <span className={priorityClass}>{task.priority || "Medium"}</span>
          <span className="categoryBadge">{task.category || "Study"}</span>
          <span className={isOverdue(task) ? "deadlineBadge overdueBadge" : "deadlineBadge"}>
            {task.deadline || "No deadline"}
          </span>
        </div>
      </div>

      <div className="actions">
        <button className="doneBtn" onClick={() => toggleStatus(task)}>
          {status === "done" ? "Undo" : "Done"}
        </button>

        <button className="editBtn" onClick={() => setEditingTask(task)}>
          Edit
        </button>

        <button className="deleteBtn" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;