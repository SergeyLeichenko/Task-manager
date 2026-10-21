import * as repo from "../repositories/task.repository";
import type { CreateTaskInput, UpdateTaskInput } from "../types/task";
import { AppError } from "../utils/app-error";

export const getTasks = () => repo.findAll();

export async function getTask(id: number) {
  const task = await repo.findById(id);
  if (!task) throw new AppError(404, "Task not found");
  return task;
}

export const createTask = (input: CreateTaskInput) => {
  return repo.create(input);
}

export async function updateTask(id: number, input: UpdateTaskInput) {
  const task = await repo.update(id, input);
  if (!task) throw new AppError(404, "Task not found");
  return task;
}

export async function deleteTask(id: number) {
  if (!(await repo.remove(id))) throw new AppError(404, "Task not found");
}
