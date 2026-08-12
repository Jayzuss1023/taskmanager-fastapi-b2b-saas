import { STATUS, Task } from "../pages/DashboardPage";
import TaskCard from "./TaskCard";

const STATUS_LABELS = {
  pending: "To Do",
  started: "In Progress",
  completed: "Done",
};

export default function TaskColumn({
  status,
  tasks,
  onEdit,
  onDelete,
}: {
  status: STATUS;
  tasks: Task[];
  onEdit: ((task: Task) => void) | null;
  onDelete: (taskId: string) => void;
}) {
  return (
    <div className={"kanban-column"}>
      <div className={`kanban-column-header kanban-column-header-${status}`}>
        <h3 className={"kanban-column-title"}>{STATUS_LABELS[status]}</h3>
        <span className={"kanban-column-count"}>{tasks.length}</span>
      </div>
      <div className={"kanban-column-body"}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
