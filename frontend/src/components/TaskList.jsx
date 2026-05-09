import TaskItem from "./TaskItem";

function TaskList({
  filteredTasks,
  toggleStatus,
  deleteTask,
  isOverdue,
  setEditingTask,
}) {
  if (filteredTasks.length === 0) {
    return (
      <div className="emptyState">
        <h3>No tasks found</h3>
        <p>Try changing filters or add a new task.</p>
      </div>
    );
  }

  return (
    <div className="taskList">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleStatus={toggleStatus}
          deleteTask={deleteTask}
          isOverdue={isOverdue}
          setEditingTask={setEditingTask}
        />
      ))}
    </div>
  );
}

export default TaskList;