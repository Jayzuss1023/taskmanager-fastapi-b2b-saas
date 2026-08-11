import { useState } from "react";
import { useOrganization } from "@clerk/react";
import { STATUSES } from "../pages/DashboardPage";
import TaskForm from "./TaskForm";

export default function KanbanBoard() {
  const { membership } = useOrganization();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const role = membership?.role;
  const canManage = role === "org:admin" || role === "org:editor";

  function handleAddTask() {
    setShowForm(true);
    setEditingTask(null);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingTask(null);
  }

  return (
    <div>
      <div>
        <h2>Tasks</h2>
        {canManage && (
          <button onClick={handleAddTask} className={"btn btn-primary"}>
            + Add Task
          </button>
        )}
      </div>

      {showForm && <TaskForm onCancel={handleCancel} />}
    </div>
  );
}
