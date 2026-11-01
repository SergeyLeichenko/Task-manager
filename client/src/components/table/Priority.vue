<script setup lang="ts">
//Types
import type { TaskPriority } from "@/types/task";
// Props
const props = defineProps<{
  priority: TaskPriority
}>()
</script>

<template>
  <div class="priority-block">
    <span :class="[props.priority, 'priority']"></span>
  </div>
</template>

<style lang="css" scoped>
.priority-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.priority {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 10px;
}

.low {
  background-color: var(--yellow);
}
.medium {
  background-color: var(--green-light);
}
.high {
  background-color: var(--red-light);
}
</style>
