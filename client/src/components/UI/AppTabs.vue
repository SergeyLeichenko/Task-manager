<script setup lang="ts">
// Types
import type { Tab } from "@/types/app";

// Props
defineProps<{
  tabs: Tab[];
  modelValue: string;
  size?: string;
}>();

// Emits
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// Methods
function filterTabs(tab: Tab) {
  if (!tab.value) return;

  emit("update:modelValue", tab.value);
}
</script>

<template>
  <div class="filters">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="{ active: modelValue === tab.value }"
      :style="{ fontSize: size }"
      @click="filterTabs(tab)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style lang="css" scoped>
.filters {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin: 20px 0 13px;
}
.filters button {
  border: 1px solid transparent;
  border-radius: 7px;
  padding: 8px 11px;
  background: transparent;
  color: #777f94;
  font-size: 11px;
  cursor: pointer;
}
.filters button.active {
  background: #ededff;
  color: #5657c9;
  border-color: #e2e3fb;
  font-weight: bold;
}
</style>
