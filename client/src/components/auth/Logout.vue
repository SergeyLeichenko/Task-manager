<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

function handleLogout() {
  authStore.logout();
  router.push({ name: "login" });
}
</script>

<template>
  <button class="logout" @click="handleLogout">
    Logout
  </button>
</template>

<style lang="css" scoped>
.logout {
  background-color: transparent;
  color: var(--grey);
  font-size: 14px;
  border: none;
  padding: 0;
  cursor: pointer;
}

.logout:hover {
  color: var(--black);
}
</style>