function TaskForm({
  title,
  deadline,
  setTitle,
  setDeadline,
  addTask,
}) {
  return (
    <div className="form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Example: Study Software Architecture"
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default TaskForm;