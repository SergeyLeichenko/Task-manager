<script setup lang="ts">
import { ref, reactive } from "vue";

import Login from "@/components/auth/Login.vue";
import AppTabs from "@/components/UI/AppTabs.vue";

// Types
import type { Tab } from "@/types/app";

// Data
const tabs = reactive<Tab[]>([
  { label: "Registration", value: "registration" },
  { label: "Login", value: "login" },
]);
const filter = ref<string>("login");
</script>

<template>
  <div class="login-page">
    <div class="tabs">
      <AppTabs :tabs="tabs" v-model="filter" :size="'14px'"/>
    </div>
    <div class="form">
      <Login :tab="filter" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.tabs {
  display: flex;
  justify-content: center;
}

:deep(.filters) {
  margin: 0;
}
</style>
