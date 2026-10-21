<script setup lang="ts">
import { ref } from "vue";

// Types
type SelectOption = {
  label: string;
  value: string;
};

// Props
defineProps<{
  options: SelectOption[];
  placeholder?: string;
}>();

// Model
const model = defineModel<string>({
  required: true,
});

// Methods
</script>

<template>
  <div class="select">
    <select v-model="model">
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select {
  width: 100%;
}

.select select {
  box-sizing: border-box;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e0e4ee;
  border-radius: 10px;
  background: #f8f9fc;
  color: #293149;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.select select:focus {
  outline: none;
  border-color: #7778e8;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(91, 92, 226, 0.12);
}
</style>
