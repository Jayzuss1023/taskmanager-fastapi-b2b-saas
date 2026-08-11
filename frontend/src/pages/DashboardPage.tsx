import { useState, useEffect, useCallback } from "react";
import { useAuth, useOrganization, CreateOrganization } from "@clerk/react";
import KanbanBoard from "../components/KanbanBoard";

export const STATUSES = ["pending", "started", "completed"] as const;
export type STATUS = (typeof STATUSES)[number];

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: typeof STATUSES;
  org_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export default function DashboardPage() {
  const { getToken } = useAuth();
  const { organization, memberships } = useOrganization({
    memberships: { infinite: true },
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const memberCount = memberships?.count ?? 0;
  const orgId = organization?.id;

  if (!organization) {
    return (
      <div className={"dashboard-container"}>
        <div className={"no-org-container"}>
          <h1 className={"no-org-title"}>Welcome to TaskBoard</h1>
          <p className={"no-org-text"}>
            Create or join an organization to start managing tasks with your
            team.
          </p>
          <CreateOrganization afterCreateOrganizationUrl={"/dashboard"} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <div>
          <h1>{organization.name}</h1>
          <p>
            {memberCount} member{memberCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {loading ? (
        <p>Loading Tasks...</p>
      ) : error ? (
        <div>
          <p>Error loading tasks</p>
          <p>{error}</p>
        </div>
      ) : (
        <KanbanBoard />
      )}
    </div>
  );
}
