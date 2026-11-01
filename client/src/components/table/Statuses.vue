<script setup lang="ts">
// Types
import type { TaskStatus } from "@/types/task";

// Props
const props = defineProps<{
  status: TaskStatus
}>();

// Data
const labels: Record<TaskStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Completed",
};
</script>

<template>
  <div class="statuses">
    <p class="status">{{ labels[props.status] }}</p>
  </div>
</template>
