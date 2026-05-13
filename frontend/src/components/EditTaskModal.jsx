import { useState, useEffect } from "react";

function EditTaskModal({
  editingTask,
  setEditingTask,
  saveEditedTask,
}) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Study");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDeadline(editingTask.deadline || "");
      setPriority(editingTask.priority || "Medium");
      setCategory(editingTask.category || "Study");
    }
  }, [editingTask]);

  if (!editingTask) return null;

  return (
    <div className="modalOverlay">
      <div className="modalCard">
        <h2>Edit Task</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Health">Health</option>
        </select>

        <div className="modalButtons">
          <button
            onClick={() =>
              saveEditedTask({
                ...editingTask,
                title,
                deadline,
                priority,
                category,
              })
            }
          >
            Save
          </button>

          <button
            className="cancelBtn"
            onClick={() => setEditingTask(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;