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
  border-color: var(--border); 
  border-radius: 9px;
  background: var(--default-bg);
  color: var(--blue);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.modal-default-button:hover {
  background: var(--blue);
  color: var(--white);
}

.modal-default-button:active {
  transform: scale(0.98);
}
</style>
