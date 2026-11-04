<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const { isAuthenticated } = storeToRefs(useAuthStore());

// Computed
const pageTitle = computed(() =>
  typeof route.meta.title === "string" ? route.meta.title : "Task Manager",
);
</script>

<template>
  <div class="layout">
    <AppHeader v-if="isAuthenticated" :title="pageTitle" />

    <div class="body">
      <AppSidebar v-if="isAuthenticated" />
      <main>
        <RouterView />

        <AppFooter v-if="isAuthenticated" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}
.body {
  display: flex;
  min-height: calc(100vh - 68px);
}
main {
  flex: 1;
  min-width: 0;
  padding: 32px clamp(16px, 4vw, 48px);
}
@media (max-width: 600px) {
  main {
    padding: 22px 14px;
  }
}
</style>
