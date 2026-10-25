<script setup lang="ts">
defineProps<{ title?: string }>();
</script>

<template>
  <header class="header">
    <RouterLink to="/dashboard" class="brand"><b>T</b> TaskFlow</RouterLink>
    <h1>{{ title || "Task Manager" }}</h1>
    <span class="user"><i>S</i><span>My account</span></span>
  </header>
</template>

<style scoped>
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
