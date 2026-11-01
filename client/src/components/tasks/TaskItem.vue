<script setup lang="ts">
import { ref, computed } from "vue";
import ModalWrapper from "@/components/UI/ModalWrapper.vue";
import AppButton from "@/components/UI/AppButton.vue";
import TaskForm from "@/components/tasks/TaskForm.vue";

// Types
import type { Task } from "@/types/task";

//Icons
import {
  faTrash,
  faPen,
  faCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

//Props
defineProps<{ task: Task }>();

//Emits
const emit = defineEmits<{
  toggle: [task: Task];
  remove: [id: number];
  edit: [task: Task];
}>();

// Data
const labels = { todo: "To do", in_progress: "In progress", done: "Completed" };
const showModal = ref<boolean>(false);
const modalName = ref<string>("");

//Computed
const modalHeader = computed(() => {
  return modalName.value === "edit" ? "Edit" : "Remove";
});

// Methods
const openModalRemoveTask = () => {
  showModal.value = true;
};

const deleteTask = (task: Task) => {
  emit("remove", task.id);
};

const submit = () => {};
</script>

<template>
  <article :class="{ completed: task.status === 'done' }">
    <div class="priority-block">
      <button class="check" @click="$emit('toggle', task)">
        <font-awesome-icon
          v-if="task.status === 'done'"
          :icon="faCheck"
          style="color: var(--white)"
        />
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
        @click="openModalRemoveTask"
      >
        <font-awesome-icon :icon="faTrash" />
      </button>

      <button class="edit" aria-label="Edit task" @click="$emit('edit', task)">
        <font-awesome-icon :icon="faPen" />
      </button>
    </div>

    <Teleport to="body">
      <ModalWrapper :show="showModal" @close="showModal = false">
        <template #header>
          <h3>
            {{ modalHeader }} <span class="modal-title">{{ task.title }}</span>
          </h3>
        </template>

        <template #body>
          <div v-if="modalHeader === 'Edit'" class="text">
            <font-awesome-icon :icon="faInfoCircle" class="text-warm" />
            <p class="text-warm">Do you really want to delete the task?</p>
          </div>

          <TaskForm v-else @submit="submit" />
        </template>

        <template #footer>
          <AppButton
            v-if="modalHeader === 'Edit'"
            :button="'Remove'"
            type="submit"
            form="task-form"
            @click="deleteTask(task)"
          />

          <AppButton
            v-else
            :button="'Add task'"
            type="submit"
            form="task-form"
          />
        </template>
      </ModalWrapper>
    </Teleport>
  </article>
</template>

<style scoped>
article {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 11px;
}
.check {
  width: 22px;
  height: 22px;
  flex: 0 0 22px;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--white);
  color: var(--white);
  cursor: pointer;
}
.completed .check {
  background: var(--blue);
  border-color: var(--blue);
  display: flex;
  align-items: center;
}

.copy {
  flex: 1;
  min-width: 0;
}
.copy strong {
  font-size: 13px;
  color: var(--bg-sidebar);
  overflow-wrap: anywhere;
}
.completed .copy strong {
  text-decoration: line-through;
  color: var(--gray);
}
.copy p {
  font-size: 12px;
  color: var(--gray);
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
  background: var(--default-bg);
  color: var(--gray);
}
.in_progress {
  background: var(--default-bg);
  color: var(--orange);
}
.done {
  background: var(--default-bg);
  color: var(--green);
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
  background-color: var(--orange);
}
.medium {
  background-color: var(--green);
}
.high {
  background-color: var(--red);
}

.buttons {
  display: flex;
  align-items: center;
  gap: 5px;
}

.svg-inline--fa {
  color: var(--text-light-gray);
}

.buttons > button {
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

.text {
  display: flex;
  align-items: center;
}

.text-warm {
  font-size: 18px;
  font-weight: 500;
}

.fa-circle-info {
  font-size: 20px;
  color: var(--red);
  margin-right: 15px;
}

.modal-title {
  font-size: 16px;
  text-decoration: underline;
}
</style>
