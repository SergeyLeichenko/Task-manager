<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

import Logout from "../auth/Logout.vue";

// Types
import type { DropdownAccountList } from "@/types/app";

// Props
defineProps<{ title?: string }>();

// Data
const list = reactive<DropdownAccountList[]>([
  { id: 1, name: "My account" },
  { id: 2, name: "Admin panel" },
  { id: 3, name: "Theme" },
]);

const showDropdown = ref<boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);

// Methods
function openList() {
  showDropdown.value = !showDropdown.value;
}

function closeDropdown(event: MouseEvent) {
  const target = event.target as Node;

  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <header class="header">
    <RouterLink to="/dashboard" class="brand"><b>T</b> TaskFlow</RouterLink>
    <h1>{{ title || "Task Manager" }}</h1>

    <div ref="dropdownRef" class="account">
      <span class="user">
        <i>S</i>
        <span @click="openList">My account</span></span
      >
      <div v-show="showDropdown" class="dropdown">
        <ul class="list">
          <li
            v-for="item in list"
            :key="item.id"
            class="list-item"
            @click="showDropdown = false"
          >
            <span class="user">{{ item.name }}</span>
          </li>
          <li class="list-item">
            <Logout />
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
.account {
  position: relative;
}

.dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 18px);
  z-index: 10;
  width: 200px;
  box-shadow: 1px 0 8px 2px gray;
  border-radius: 5px;
  background-color: var(--white);
}

.dropdown .list {
  padding: 5px 25px;
}

.dropdown .list-item {
  padding-bottom: 10px;
  list-style: none;
  cursor: pointer;
}

.dropdown .user {
  font-size: 14px;
}

.dropdown .user:hover {
  color: var(--black);
}

.header {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 28px;
  background: var(--white);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 2;
  position: relative;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-dark-gray);
  font-weight: 800;
}
.brand b {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--blue);
  color: white;
}
.header h1 {
  font-size: 15px;
  color: var(--grey);
}
.user {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--grey);
  font-size: 12px;
  cursor: pointer;
}
.user i {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--default-bg);
  color: var(--blue);
  font-style: normal;
  font-weight: bold;
}
@media (max-width: 600px) {
  .header {
    padding: 0 14px;
  }
  .header h1,
  .user span {
    display: none;
  }
}
</style>
