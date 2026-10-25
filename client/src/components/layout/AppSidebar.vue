<script setup lang="ts">
import { faCheck, faList } from "@fortawesome/free-solid-svg-icons";
import type { Sidebar } from "../../types/sidebar";

//Data
const list = <Sidebar[]>[
  { title: "Dashboard", icon: faList, path: "/dashboard" },
  { title: "My tasks", icon: faCheck, path: "/tasks" },
];
</script>

<template>
  <aside class="sidebar">
    <small>WORKSPACE</small>
    <nav v-for="item in list" :key="item.path">
      <RouterLink :to="item.path"
        ><span><font-awesome-icon :icon="item.icon" /></span> {{item.title}}</RouterLink
      >
    </nav>

    <div class="tip">
      <b>✦</b>
      <div>
        <strong>Stay on track</strong>
        <p>Small steps make big progress.</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 225px;
  flex: 0 0 225px;
  display: flex;
  flex-direction: column;
  padding: 26px 14px 18px;
  background: var(--bg-sidebar);
  min-height: calc(100vh - 68px);
  color: var(--text-light-gray);
}
.sidebar small {
  margin: 0 12px 12px;
  color: var(--gray);
  font-size: 10px;
  letter-spacing: 1.3px;
  font-weight: 800;
}
nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
nav a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 9px;
  color: var(--text-light-gray);
  text-decoration: none;
  font-size: 13px;
}
nav a span {
  width: 18px;
  font-size: 18px;
  text-align: center;
}
nav a:hover {
  background: var(--hover-sidebar);
  color: var(--white);
}
nav a.router-link-active {
  background: var(--blue);
  color: var(--white);
}
.tip {
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding: 14px 8px 0;
  border-top: 1px solid var(--hover-sidebar);;
}
.tip b {
  color: var(--white);
}
.tip strong {
  font-size: 12px;
  color: var(--var(--white));
}
.tip p {
  font-size: 10px;
  color: var(--text-light-gray);
  line-height: 1.5;
  margin: 5px 0 0;
}
@media (max-width: 600px) {
  .sidebar {
    width: 62px;
    flex-basis: 62px;
    padding: 20px 6px;
  }
  .sidebar small,
  .tip,
  nav a {
    font-size: 0;
  }
  nav a {
    justify-content: center;
    padding: 12px 4px;
  }
  nav a span {
    font-size: 20px;
  }
}
</style>
