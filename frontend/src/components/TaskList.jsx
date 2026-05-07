import TaskItem from "./TaskItem";

function TaskList({
  filteredTasks,
  toggleStatus,
  deleteTask,
  isOverdue,
}) {
  return (
    <div className="taskList">
      {filteredTasks.length === 0 ? (
        <p className="empty">
          No tasks found for this filter.
        </p>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleStatus={toggleStatus}
            deleteTask={deleteTask}
            isOverdue={isOverdue}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;