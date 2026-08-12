import type { Task } from "../pages/DashboardPage";

export default function Task({
  task,
  onEdit,
}: {
  task: Task;
  onEdit: ((task: Task) => void) | null;
}) {
  const canEdit = !!onEdit;
  return (
    <div>
      <div className={"task-card-header"}>
        <h4 className={"task-card-title"}>{task.title}</h4>

        <button
          className={"btn btn-primary"}
          title={"Delete Task"}
          onClick={canEdit ? () => onEdit(task) : undefined}
        >
          X
        </button>
      </div>
      {task.description && (
        <p className={"task-card-description"}>{task.description}</p>
      )}
    </div>
  );
}
