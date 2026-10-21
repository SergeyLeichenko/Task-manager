<script setup lang="ts">
import type { Task } from "@/types/task";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

defineProps<{ task: Task }>();
defineEmits<{
  toggle: [task: Task];
  remove: [id: number];
  edit: [task: Task];
}>();

const labels = { todo: "To do", in_progress: "In progress", done: "Completed" };
</script>

<template>
  <article :class="{ completed: task.status === 'done' }">
    <div class="priority-block">
      <button class="check" @click="$emit('toggle', task)">
        {{ task.status === "done" ? "✓" : "" }}
      </button>

      <span :class="[task.priority, 'priority']"></span>
    </div>

    <div class="copy">
      <strong>{{ task.title }}</strong>
      <p v-if="task.description">{{ task.description }}</p>
      <small :class="task.status">{{ labels[task.status] }}</small>
    </div>

    <div class="buttons">
      <button
        class="remove"
        aria-label="Delete task"
        @click="$emit('remove', task.id)"
      >
        <font-awesome-icon :icon="faTrash" />
      </button>

      <button class="edit" aria-label="Edit task" @click="$emit('edit', task)">
        <font-awesome-icon :icon="faPen" />
      </button>
    </div>
  </article>
</template>

<style scoped>
article {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: white;
  border: 1px solid #e7e9f0;
  border-radius: 11px;
}
.check {
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  border: 1px solid #c8ccda;
  border-radius: 7px;
  background: white;
  color: white;
  cursor: pointer;
}
.completed .check {
  background: #5b5ce2;
  border-color: #5b5ce2;
}
.copy {
  flex: 1;
  min-width: 0;
}
.copy strong {
  font-size: 13px;
  color: #2a3149;
  overflow-wrap: anywhere;
}
.completed .copy strong {
  text-decoration: line-through;
  color: #8b91a4;
}
.copy p {
  font-size: 12px;
  color: #82899d;
  overflow-wrap: anywhere;
}
.copy small {
  display: inline-block;
  padding: 4px 7px;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 700;
}
.todo {
  background: #eff1f6;
  color: #68718b;
}
.in_progress {
  background: #fff0d7;
  color: #9b5b0b;
}
.done {
  background: #ddf7ed;
  color: #16805d;
}

.priority-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.priority {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 10px;
}

.low {
  background-color: #9b5b0b;
}
.medium {
  background-color: #16805d;
}
.high {
  background-color: #c44;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 5px;
}

.svg-inline--fa {
  color: #8b91a4;
}

.buttons > button {
  border: none;
  background: transparent;
  cursor: pointer;
}

.remove .svg-inline--fa:hover {
  color: #c44;
}

.edit .svg-inline--fa:hover {
  color: #000;
}
</style>
