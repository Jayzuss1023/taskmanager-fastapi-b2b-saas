const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// API Requests to backend

export async function fetchWithAuth(endpoint, getToken, options = {}) {
  const token = await getToken();
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response) {
    const error = await response.json().catch(() => {});
    throw new Error(error.detail || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// All tasks
export async function getTasks(getToken) {
  return fetchWithAuth("/api/tasks", getToken);
}

// Create task
export async function createTask(getToken, task) {
  return fetchWithAuth("/api/tasks", getToken, {
    method: "POST",
    body: JSON.stringify(task),
  });
}

// Update task
export async function updateTask(getToken, taskId, task) {
  return fetchWithAuth(`api/tasks/${taskId}`, getToken, {
    method: "PUT",
    body: JSON.stringify(task),
  });
}

// Delete task
export async function deleteTask(taskId, getToken) {
  return fetchWithAuth(`/api/tasks/${taskId}`, getToken, {
    method: "DELETE",
  });
}
