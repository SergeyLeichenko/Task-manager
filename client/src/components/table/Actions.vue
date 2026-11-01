<script setup lang="ts">
//Icons
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

// Emits
const emit = defineEmits(["remove", "edit"]);

// Props
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  { disabled: false },
);

// Methods
const remove = () => {
  emit("remove");
};

const edit = () => {
  emit("edit");
};
</script>

<template>
  <div class="actions" :class="{ 'button-disabled': props.disabled }">
    <button class="remove" aria-label="Delete task" @click="remove">
      <font-awesome-icon :icon="faTrash" :disabled="props.disabled" />
    </button>

    <button class="edit" aria-label="Edit task" @click="edit">
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
