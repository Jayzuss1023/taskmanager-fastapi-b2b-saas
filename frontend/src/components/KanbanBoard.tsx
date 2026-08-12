"use client";
import { useState } from "react";
import { useOrganization } from "@clerk/react";
import { STATUS, STATUSES, Task } from "../pages/DashboardPage";
import TaskForm from "./TaskForm";
import type { GetToken } from "@clerk/types"; // or your specific clerk package
import { createTask, deleteTask, updateTask } from "../services/api";
import TaskColumn from "./TaskColumn";

export type TaskData = {
  title: string;
  description: string | null;
  status: STATUS;
};

export default function KanbanBoard({
  getToken,
  tasks,
  setTasks,
}: {
  getToken: GetToken;
  tasks: Task[];
  // AI had to help me here. IDK bro
  setTasks: (value: Task[] | ((prev: Task[]) => Task[])) => void;
}) {
  const { membership } = useOrganization();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const role = membership?.role;
  const canManage = role === "org:admin" || role === "org:editor";

  // FILTER TASKS BY STATUS
  const filterTasksByStatus = (status: string) =>
    tasks.filter((t) => t.status === status);

  // DELETE TASK
  async function handleDelete(taskId: string) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    const taskToDelete = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    try {
      await deleteTask(taskId, getToken);
    } catch (err) {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === taskId) {
            return { ...task };
          }
          return task; //  Crucial: Returns the unchanged task instead of undefined
        }),
      );
    }
  }

  // CREATE OR EDIT TASK
  async function handleSubmit(taskData: TaskData) {
    if (editingTask) {
      const updatedTask = { ...editingTask, ...taskData };
      //   Update the UI with the new task
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? updatedTask : t)),
      );
      try {
        await updateTask(getToken, editingTask.id, editingTask);
        setShowForm(false);
        setEditingTask(null);
      } catch (err) {}
    } else {
      try {
        const newTask = await createTask(getToken, taskData);
        setTasks((prev) => [...prev, newTask]);
        setShowForm(false);
      } catch (error) {}
    }
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    setShowForm(true);
  }

  function handleAddTask() {
    setEditingTask(null);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingTask(null);
  }

  return (
    <div className={"kanban-wrapper"}>
      <div className={"kanban-header"}>
        <h2 className={"kanban-title"}>Tasks</h2>
        {canManage && (
          <button className={"btn btn-primary"} onClick={handleAddTask}>
            + Add Task
          </button>
        )}
      </div>

      <div className={"kanban-board"}>
        {STATUSES.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={filterTasksByStatus(status)}
            onEdit={canManage ? handleEdit : null}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showForm && (
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          task={editingTask}
        />
      )}
    </div>
  );
}
