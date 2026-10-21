<script setup lang="ts">
const props = withDefaults(defineProps<{
  button?: string
}>(), {
  button: 'Save'
})
</script>

<template>
  <button class="modal-default-button" @click="$emit('submit')">
    {{ props.button }}
  </button>
</template>

<style lang="css" scoped>
.modal-default-button {
  float: none;
  padding: 8px 17px;
  border-color: #e2e3fb; 
  border-radius: 9px;
  background: #ededff;
  color: #5556cf;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.modal-default-button:hover {
  background: #5556cf;
  color: #fff;
}

.modal-default-button:active {
  transform: scale(0.98);
}
</style>
