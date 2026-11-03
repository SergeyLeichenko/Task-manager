<script setup lang="ts">
import { computed, onMounted, ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useTasksStore } from "@/stores/tasks";

// Types
import type { Task, TaskStatus, CreateTaskPayload } from "@/types/task";
import type { TableHeader } from "@/types/table";

import TaskForm from "@/components/tasks/TaskForm.vue";
import ModalWrapper from "@/components/UI/ModalWrapper.vue";
import AppButton from "@/components/UI/AppButton.vue";
import AppTable from "@/components/table/AppTable.vue";

import {
  faCheck,
  faList,
  faClock,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const store = useTasksStore();

const { loading, error, tasks, completedCount } = storeToRefs(store);

// Data
type TaskFilter = "all" | TaskStatus;

const showModal = ref<boolean>(false);
const filter = ref<TaskFilter>("all");
const tableHeader = reactive<TableHeader[]>([
  { id: 1, title: "", key: "check", width: "50px" },
  { id: 2, title: "Id", key: "id", width: "50px" },
  { id: 3, title: "Priority", key: "priority", width: "90px" },
  { id: 4, title: "Name", key: "title", width: "140px" },
  { id: 5, title: "Description", key: "description", width: "200px" },
  { id: 6, title: "Status", key: "status", width: "120px" },
  { id: 7, title: "Created", key: "created_at", width: "120px" },
  { id: 8, title: "Actions", key: "actions", width: "100px" },
]);
const selectedTask = ref<Task | null>(null);
const modalName = ref<string>("create");

// Computed
const filteredTasks = computed(() => {
  if (filter.value === "all") {
    return tasks.value;
  }

  return tasks.value.filter((task) => task.status === filter.value);
});

const modalButtons = computed(() => {
  switch (modalName.value) {
    case "create":
      return "Add task";
    case "edit":
      return "Edit task";
    default:
      return "";
  }
});

const modalHeader = computed(() => {
  switch (modalName.value) {
    case "create":
      return "Add new task";
    case "edit":
      return "Edit task";
    case "remove":
      return "Remove task";
    default:
      return "";
  }
});

// Methods
function openModal(name: string, task: Task) {
  switch (name) {
    case "create":
      selectedTask.value = task;
      modalName.value = name;
    case "edit":
      selectedTask.value = null;
      modalName.value = name;
    case "remove":
      selectedTask.value = task;
      modalName.value = name;
  }
  showModal.value = true;
}

async function submit(payload: CreateTaskPayload) {
  try {
    if (modalName.value === "edit" && selectedTask.value) {
      await store.updateTask(selectedTask.value.id, {
        ...payload,
        description: payload.description ?? undefined,
      });
    } else {
      await store.createTask(payload);
    }

    showModal.value = false;
    selectedTask.value = null;

    await store.fetchTasks();
  } catch (e) {
    window.alert(e instanceof Error ? e.message : "Could not save task");
  }
}

async function toggle(task: Task) {
  const nextStatus: TaskStatus = task.status === "done" ? "todo" : "done";

  try {
    await store.updateTaskStatus(task.id, nextStatus);
  } catch (e) {
    window.alert(e instanceof Error ? e.message : "Could not update task");
  }
}

async function remove() {
  if (!selectedTask.value) return;

  try {
    await store.deleteTask(selectedTask.value.id);

    showModal.value = false;
    selectedTask.value = null;

    await store.fetchTasks();
  } catch (e) {
    window.alert(e instanceof Error ? e.message : "Could not delete task");
  }
}

// Lifecicle hooks
onMounted(async () => {
  await store.fetchTasks();
});
</script>

<template>
  <section class="page">
    <div class="heading">
      <div>
        <small>YOUR WORKSPACE</small>
        <h2>My tasks<span>.</span></h2>
        <p>A little progress each day adds up to big results.</p>
      </div>

      <AppButton
        id="show-modal"
        :button="'+ Add task'"
        @click="openModal('create', $event)"
      />

      <Teleport to="body">
        <ModalWrapper :show="showModal" @close="showModal = false">
          <template #header>
            <h3>
              {{ modalHeader }}
              <span class="modal-title">{{ selectedTask?.title }}</span>
            </h3>
          </template>

          <template #body>
            <div v-if="modalName === 'remove'" class="text">
              <font-awesome-icon :icon="faInfoCircle" class="text-warm" />
              <p class="text-warm">Do you really want to delete the task?</p>
            </div>

            <TaskForm v-else :entity="selectedTask" @submit="submit" />
          </template>

          <template #footer>
            <AppButton
              v-if="modalName === 'remove'"
              :button="'Remove'"
              type="submit"
              form="task-form"
              @click="remove"
            />
            <AppButton
              v-else
              :button="modalButtons"
              type="submit"
              form="task-form"
            />
          </template>
        </ModalWrapper>
      </Teleport>
    </div>

    <div class="stats">
      <article>
        <i class="blue"><font-awesome-icon :icon="faList" class="blue" /></i>
        <div>
          <p>Total tasks</p>
          <strong>{{ tasks.length }}</strong>
        </div>
      </article>
      <article>
        <i class="green"
          ><i class="green"
            ><font-awesome-icon :icon="faCheck" class="green" /></i
        ></i>
        <div>
          <p>Completed</p>
          <strong>{{ completedCount }}</strong>
        </div>
      </article>
      <article>
        <i class="orange"
          ><i class="orange"
            ><font-awesome-icon :icon="faClock" class="orange" /></i
        ></i>
        <div>
          <p>Remaining</p>
          <strong>{{ tasks.length - completedCount }}</strong>
        </div>
      </article>
    </div>

    <h3>Task list</h3>
    <p class="hint">Keep your priorities moving forward.</p>

    <div class="filters">
      <button
        v-for="f in [
          { label: 'All tasks', value: 'all' },
          { label: 'To do', value: 'todo' },
          { label: 'In progress', value: 'in_progress' },
          { label: 'Completed', value: 'done' },
        ]"
        :key="f.value"
        :class="{ active: filter === f.value }"
        @click="filter = f.value as typeof filter"
      >
        {{ f.label }}
      </button>
    </div>

    <AppTable
      :headers="tableHeader"
      :data="filteredTasks"
      :error="error"
      :loading="loading"
      @toggle="toggle"
      @remove="openModal('remove', $event)"
      @edit="openModal('edit', $event)"
    />
  </section>
</template>

<style scoped>
.page {
  max-width: 1000px;
  margin: auto;
}
.heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 26px;
}
.heading small {
  font-size: 10px;
  letter-spacing: 1.4px;
  color: #7375d7;
  font-weight: 800;
}
.heading h2 {
  font-size: clamp(28px, 4vw, 35px);
  letter-spacing: -1px;
  color: #252c43;
  margin: 8px 0;
}
.heading h2 span {
  color: #5b5ce2;
}
.heading p,
.hint {
  font-size: 12px;
  color: #8990a3;
  margin: 0;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 30px;
}
.stats article {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  background: white;
  border: 1px solid #e7e9f0;
  border-radius: 12px;
}
.stats i {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: #ededff;
  color: #5b5ce2;
  font-style: normal;
  font-size: 18px;
}
.stats i.blue {
  background: #e0f8ed;
  color: #373a83;
}
.stats i.green {
  background: #e0f8ed;
  color: #19966b;
}
.stats i.orange {
  background: #fff0df;
  color: #d7832d;
}
.stats p {
  font-size: 11px;
  color: #858ca0;
  margin: 0 0 5px;
}
.stats strong {
  font-size: 23px;
  color: #293149;
}
h3 {
  font-size: 16px;
  margin: 0 0 5px;
  color: #2d344c;
}
.hint {
  margin-bottom: 14px;
}
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
  font-size: 14px;
  text-decoration: underline;
}

@media (max-width: 700px) {
  .stats {
    gap: 7px;
  }
  .stats article {
    flex-direction: column;
    align-items: flex-start;
    padding: 11px;
  }
  .stats i {
    width: 32px;
    height: 32px;
  }
  .pill {
    display: none;
  }
}
@media (max-width: 420px) {
  .stats {
    grid-template-columns: 1fr;
  }
  .stats article {
    flex-direction: row;
    align-items: center;
  }
}
</style>
