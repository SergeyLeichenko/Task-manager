import type {
  Task,
  CreateTaskPayload,
  TaskStatus,
  UpdateTaskPayload,
} from "@/types/task";

import { http } from "./http";

const TASKS_ENDPOINT = "/tasks";

export const tasksApi = {
  getAll: () => http.get<Task[]>(TASKS_ENDPOINT),

  getById: (id: number) => http.get<Task>(`${TASKS_ENDPOINT}/${id}`),

  create: (payload: CreateTaskPayload) =>
    http.post<Task>(TASKS_ENDPOINT, payload),

  update: (id: number, payload: UpdateTaskPayload) =>
    http.put<Task>(`${TASKS_ENDPOINT}/${id}`, payload),

  updateStatus: (id: number, status: TaskStatus) =>
    http.patch<Task>(`${TASKS_ENDPOINT}/${id}`, { status }),

  remove: (id: number) => http.delete<void>(`${TASKS_ENDPOINT}/${id}`),
};
