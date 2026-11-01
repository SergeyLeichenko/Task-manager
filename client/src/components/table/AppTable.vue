<script setup lang="ts" generic="T extends Record<string, any>">
import Actions from "./Actions.vue";
import Priority from "./Priority.vue";
import Statuses from "./Statuses.vue";

// Types
import type { TableHeader } from "@/types/table";

//Icons
import { faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

// Props
defineProps<{
  headers: TableHeader[];
  data: T[];
  rowKey?: keyof T;
  loading?: boolean;
  error?: string | null;
}>();

// Emits
const emit = defineEmits<{
  toggle: [item: T];
  remove: [id: number];
  edit: [item: T];
}>();

// Methods
const toggle = (item: T) => {
  emit("toggle", item);
};

const remove = (id: number) => {
  emit("remove", id);
};

const edit = (item: T) => {
  emit("edit", item);
};

const disabledButtons = (item: T) => {
  return item.status === "done" ? true : false;
};
</script>

<template>
  <div class="table-wrapper">
    <p v-if="error" class="error">
      {{ error }}
    </p>

    <div v-else-if="loading" class="empty">Loading…</div>

    <table v-else-if="data.length" class="custom-table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.id">
            <slot :name="`header-${header.id}`" :header="header">
              {{ header.title }}
            </slot>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="rowKey ? item[rowKey] : index"
          :class="{ 'row-disabled': item.status === 'done' }"
        >
          <td v-for="header in headers" :key="header.id">
            <!-- Checkbox only for the check column -->
            <button
              v-if="header.key === 'check'"
              class="check"
              :class="{ completed: item.status === 'done' }"
              @click="toggle(item)"
            >
              <font-awesome-icon
                v-if="item.status === 'done'"
                :icon="faCheck"
                style="color: var(--white)"
              />
            </button>

            <!-- Actions buttons -->
            <Actions
              v-else-if="header.key === 'actions'"
              :disabled="disabledButtons(item)"
              @remove="remove(item.id)"
              @edit="edit(item)"
            />

            <!-- Priorities -->
            <Priority
              v-else-if="header.key === 'priority'"
              :priority="item.priority"
            />

            <!-- Statuses -->
            <Statuses
              v-else-if="header.key === 'status'"
              :status="item.status"
            />

            <!-- Regular cell content -->
            <div v-else class="cell-content">
              <slot
                :name="`cell-${header.id}`"
                :item="item"
                :value="item[header.key as keyof T]"
                :index="index"
                :disabled="item.status === 'done'"
              >
                {{ item[header.key as keyof T] }}
              </slot>
            </div>
          </td>
        </tr>

        <tr v-if="data.length === 0">
          <td :colspan="headers.length" class="empty-state">
            No data available
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="empty">
      <b>Nothing on your list yet</b>
      <p>Add a task above and make today count.</p>
    </div>
  </div>
  <p class="foot">Showing {{ data.length }} of {{ data.length }}</p>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--white);
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

/* Вертикальні лінії між колонками */
.custom-table th,
.custom-table td {
  border-right: 1px solid var(--border);
}

/* Прибираємо лінію після останньої колонки */
.custom-table th:last-child,
.custom-table td:last-child {
  border-right: none;
}

/* Горизонтальні лінії */
.custom-table th {
  border-bottom: 1px solid var(--border);
}

.custom-table td {
  border-bottom: 1px solid var(--border);
}

/* Прибираємо нижню лінію останнього рядка */
.custom-table tbody tr:last-child td {
  border-bottom: none;
}

thead {
  background: var(--default-bg);
}

th {
  padding: 16px;
  color: var(--black);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  border-bottom: 1px solid var(--border);
}

td {
  padding: 16px;
  color: var(--gray);
  border-bottom: 1px solid var(--border);
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: var(--default-bg);
}

.empty-state {
  padding: 32px;
  color: var(--text-light-gray);
  text-align: center;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.empty {
  padding: 38px;
  text-align: center;
  border: 1px dashed var(--default-bg);
  border-radius: 12px;
  color: var(--gray);
  font-size: 13px;
}
.empty p {
  font-size: 12px;
}
.foot {
  text-align: right;
  color: var(--gray);
  font-size: 10px;
}
.error {
  color: var(--red);
  font-size: 12px;
}

/* checkbox */
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
.completed {
  background: var(--blue);
  border-color: var(--blue);
  display: flex;
  align-items: center;
}

.svg-inline--fa {
  color: var(--text-light-gray);
  margin-left: -2px;
}

/* row disabled */
.row-disabled .cell-content {
  opacity: 0.5;
  pointer-events: none;
  background: var(--default-bg);
  cursor: not-allowed;
}
</style>
