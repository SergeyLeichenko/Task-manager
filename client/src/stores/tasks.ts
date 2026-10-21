import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Task, TaskStatus, CreateTaskPayload } from "@/types/task";
import { tasksApi } from "@/api/tasks.api";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchTasks() {
    loading.value = true;
    error.value = null;

    try {
      tasks.value = await tasksApi.getAll();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Не вдалося завантажити задачі";
    } finally {
      loading.value = false;
    }
  }

  async function createTask(payload: CreateTaskPayload) {
    const task = await tasksApi.create(payload);
    tasks.value.push(task);
    return task;
  }

  async function updateTaskStatus(id: number, status: TaskStatus) {
    const updatedTask = await tasksApi.updateStatus(id, status);

    tasks.value = tasks.value.map((task) =>
      task.id === id ? updatedTask : task,
    );

    return updatedTask;
  }

  async function deleteTask(id: number) {
    await tasksApi.remove(id);
    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  const completedCount = computed(
    () => tasks.value.filter((task) => task.status === "done").length,
  );

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
    completedCount,
  };
});
