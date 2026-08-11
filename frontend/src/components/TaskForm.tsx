import { useState, useEffect } from "react";
import { STATUS } from "../pages/DashboardPage";

export default function TaskForm({ onCancel }: { onCancel: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<STATUS>("pending");

  //   const isEditing = !!task;

  return (
    <div className={"modal-overlay"} onClick={onCancel}>
      <div className={"modal"} onClick={(e) => e.stopPropagation()}>
        <div className={"modal-header"}>
          <h2 className={"modal-title"}>New Task</h2>
          <button className={"modal-close"} onClick={onCancel}>
            X
          </button>
        </div>
        <form action="">
          <div className={"form-group"}>
            <label htmlFor={"form-label"}>Title</label>
            <input
              id={"title"}
              type={"text"}
              className={"form-input"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Enter task title"}
              autoFocus
            />
          </div>

          <div className={"form-group"}>
            <label className={"form-label"} htmlFor={"description"}>
              Description
            </label>
            <textarea
              id={description}
              className={"form-textarea"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Enter description (optional)"}
              autoFocus
            />
          </div>

          <div className={"form-group"}>
            <label className={"form-label"} htmlFor={"status"}>
              Status
            </label>
            <select
              id={"status"}
              className={"form-select"}
              value={status}
              onChange={(e) => setStatus(e.target.value as STATUS)}
            >
              <option value={"pending"}>To Do</option>
              <option value={"started"}>In Progress</option>
              <option value={"completed"}>Done</option>
            </select>
          </div>
          <div className={"form-actions"}>
            <button
              className={"btn btn-outline"}
              type={"button"}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button className={"btn btn-primary"} type={"submit"}>
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
