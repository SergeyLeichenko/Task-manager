<script setup lang="ts">
import { ref } from "vue";
import AppSelect from "../UI/AppSelect.vue";

//Types
import type { TaskStatus, TaskPriority } from "@/types/task";

// Data
const title = ref<string>("");
const description = ref<string>("");
const status = ref<TaskStatus>("todo");
const priority = ref<TaskPriority>("medium");

// Options
const statusOptions = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const emit = defineEmits<{
  submit: [
    payload: {
      title: string;
      description?: string;
      status: TaskStatus;
      priority: TaskPriority;
    },
  ];
}>();

// Methods
function submit() {
  const trimmedTitle = title.value.trim();

  if (!trimmedTitle) return;

  emit("submit", {
    title: trimmedTitle,
    description: description.value.trim() || undefined,
    status: status.value,
    priority: priority.value,
  });
}
</script>

<template>
  <form id="task-form" @submit.prevent="submit">
    <div class="form-fields">
      <input
        v-model="title"
        placeholder="What needs to be done?"
        maxlength="180"
        required
      />

      <textarea
        v-model="description"
        placeholder="Add a short description (optional)"
        maxlength="2000"
        rows="4"
      />

      <AppSelect v-model="status" :options="statusOptions" />

      <AppSelect v-model="priority" :options="priorityOptions" />
    </div>
  </form>
</template>

<style>
.modal-mask {
  position: fixed;
  inset: 0;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(24, 29, 48, 0.55);
  backdrop-filter: blur(4px);
  transition: opacity 0.25s ease;
}

.modal-container {
  width: 100%;
  max-width: 480px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  margin: auto;
  padding: 28px;
  background: #fff;
  border: 1px solid #e8eaf1;
  border-radius: 18px;
  box-shadow: 0 24px 70px rgba(28, 33, 60, 0.2);
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #252c43;
  font-size: 20px;
  font-weight: 700;
}

.modal-header h3 {
  margin: 0;
  color: #252c43;
  font-size: 20px;
  font-weight: 700;
}

.modal-body {
  margin: 24px 0;
  color: #68718a;
  font-size: 14px;
  line-height: 1.6;
}

/* Якщо всередині модалки є форма */
.modal-body form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;
  border: 0;
  background: transparent;
}

.modal-body form div {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-body input,
.modal-body textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e0e4ee;
  border-radius: 10px;
  background: #f8f9fc;
  color: #293149;
  font: inherit;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.modal-body input::placeholder,
.modal-body textarea::placeholder {
  color: #9aa1b3;
}

.modal-body input:focus,
.modal-body textarea:focus {
  outline: none;
  border-color: #7778e8;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(91, 92, 226, 0.12);
}

.modal-body textarea {
  min-height: 100px;
  resize: vertical;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding-top: 18px;
  border-top: 1px solid #edf0f5;
}

.modal-default-button {
  float: none;
  min-height: 40px;
  padding: 10px 17px;
  border: 1px solid transparent;
  border-radius: 9px;
  background: #5556cf;
  color: #fff;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.modal-default-button:hover {
  background: #4445bb;
}

.modal-default-button:active {
  transform: scale(0.98);
}

/* Друга кнопка — Cancel */
.modal-default-button + .modal-default-button {
  border-color: #e0e4ee;
  background: #fff;
  color: #68718a;
}

.modal-default-button + .modal-default-button:hover {
  background: #f5f6fa;
}

/* Анімація */
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

@media (max-width: 560px) {
  .modal-mask {
    padding: 14px;
  }

  .modal-container {
    max-height: calc(100dvh - 28px);
    padding: 22px 18px;
    border-radius: 15px;
  }

  .modal-header h3 {
    font-size: 18px;
  }

  .modal-footer {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .modal-default-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal-mask,
  .modal-container,
  .modal-default-button {
    transition: none;
  }
}
</style>
