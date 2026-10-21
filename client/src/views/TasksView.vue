```ts
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useTasksStore } from "@/stores/tasks";
import type { Task, TaskStatus, CreateTaskPayload } from "@/types/task";

import TaskForm from "@/components/tasks/TaskForm.vue";
import TaskItem from "@/components/tasks/TaskItem.vue";
import ModalWrapper from "@/components/UI/ModalWrapper.vue";
import AppButton from "@/components/UI/AppButton.vue";

const store = useTasksStore();

const { loading, error, tasks, completedCount } = storeToRefs(store);

const showModal = ref(false);

type TaskFilter = "all" | TaskStatus;

const filter = ref<TaskFilter>("all");

const filteredTasks = computed(() => {
  if (filter.value === "all") {
    return tasks.value;
  }

  return tasks.value.filter((task) => task.status === filter.value);
});

// Lifecicle hooks
onMounted(async () => {
  await store.fetchTasks();
});

async function submit(payload: CreateTaskPayload) {
  try {
    await store.createTask(payload);
    showModal.value = false;

    await store.fetchTasks();
  } catch (e) {
    window.alert(e instanceof Error ? e.message : "Could not add task");
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

async function remove(id: number) {
  try {
    await store.deleteTask(id);
  } catch (e) {
    window.alert(e instanceof Error ? e.message : "Could not delete task");
  }
}
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
        @click="showModal = true"
      />

      <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <ModalWrapper :show="showModal" @close="showModal = false">
          <template #header>
            <h3>Add new task</h3>
          </template>

          <template #body>
            <TaskForm @submit="submit" />
          </template>

          <template #footer>
            <AppButton :button="'Add task'" type="submit" form="task-form" />
          </template>
        </ModalWrapper>
      </Teleport>
    </div>

    <div class="stats">
      <article>
        <i>▤</i>
        <div>
          <p>Total tasks</p>
          <strong>{{ tasks.length }}</strong>
        </div>
      </article>
      <article>
        <i class="green">✓</i>
        <div>
          <p>Completed</p>
          <strong>{{ completedCount }}</strong>
        </div>
      </article>
      <article>
        <i class="orange">◷</i>
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

    <p v-if="error" class="error">
      {{ error }} <button @click="store.fetchTasks()">Try again</button>
    </p>

    <div v-else-if="loading" class="empty">Loading your tasks…</div>
    <div v-else-if="filteredTasks.length" class="list">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="toggle"
        @remove="remove"
      />
    </div>
    <div v-else class="empty">
      <b>Nothing on your list yet</b>
      <p>Add a task above and make today count.</p>
    </div>
    <p class="foot">
      Showing {{ filteredTasks.length }} of {{ tasks.length }} tasks
    </p>
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
.list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.empty {
  padding: 38px;
  text-align: center;
  border: 1px dashed #d8dce8;
  border-radius: 12px;
  color: #777f94;
  font-size: 13px;
}
.empty p {
  font-size: 12px;
}
.foot {
  text-align: right;
  color: #9aa0b0;
  font-size: 10px;
}
.error {
  color: #b33a3a;
  font-size: 12px;
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
