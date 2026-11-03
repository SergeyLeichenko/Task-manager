<script setup lang="ts" generic="T extends Record<string, any>">
//Icons
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

// Emits
const emit = defineEmits(["remove", "edit"]);

// Props
const props = withDefaults(
  defineProps<{
    item: T;
    disabled?: boolean;
  }>(),
  { disabled: false },
);

// Methods
const remove = () => {
  emit("remove", props.item);
};

const edit = () => {
  emit("edit", props.item);
};
</script>

<template>
  <div class="actions" :class="{ 'button-disabled': props.disabled }">
    <button
      class="remove"
      title="Delete task"
      :disabled="disabled"
      @click="remove"
    >
      <font-awesome-icon :icon="faTrash" />
    </button>

    <button
      class="edit"
      title="Edit task"
      :disabled="disabled"
      @click="edit"
    >
      <font-awesome-icon :icon="faPen" />
    </button>
  </div>
</template>

<style lang="css" scoped>
.actions {
  display: flex;
  align-items: center;
  gap: 5px;
}

.svg-inline--fa {
  color: var(--text-light-gray);
}

.actions > button {
  border: none;
  background: transparent;
  cursor: pointer;
}

.remove .svg-inline--fa:hover {
  color: var(--red);
}

.edit .svg-inline--fa:hover {
  color: var(--black);
}

/* button disabled */
.button-disabled {
  opacity: 0.5;
  pointer-events: none;
  background: var(--default-bg);
  cursor: not-allowed;
}
</style>
