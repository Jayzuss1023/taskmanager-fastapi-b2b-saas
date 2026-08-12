import type { Task } from "../pages/DashboardPage";

export default function Task({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: ((task: Task) => void) | null;
  onDelete: (taskId: string) => void;
}) {
  const canEdit = !!onEdit;
  const canDelete = !!onDelete;
  return (
    <div
      className={`task-card ${canEdit ? "task-card-clickable" : ""}`}
      onClick={canEdit ? () => onEdit(task) : undefined}
    >
      <div className={"task-card-header"}>
        <h4 className={"task-card-title"}>{task.title}</h4>
        {canDelete && (
          <button
            className={"task-card-btn task-card-btn-delete"}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            title={"Delete Task"}
          >
            x
          </button>
        )}
      </div>
      {task.description && (
        <p className={"task-card-description"}>{task.description}</p>
      )}
    </div>
  );
}
