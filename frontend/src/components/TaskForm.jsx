function TaskForm({
  title,
  deadline,
  priority,
  category,
  setTitle,
  setDeadline,
  setPriority,
  setCategory,
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

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Study">Study</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Health">Health</option>
      </select>

      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default TaskForm;