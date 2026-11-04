import { defineStore } from "pinia";
import { ref, computed } from "vue";

import type { LoginPayload, User } from "@/types/auth";

import { authApi } from "@/api/auth.api";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value);

  async function login(payload: LoginPayload) {
    error.value = null;

    try {
      user.value = await authApi.login(payload);
    } catch(err) {
      error.value =
        err instanceof Error ? err.message : "Login failed";
    }
  }

  async function fetchUser() {
    error.value = null;

    try {
      user.value = await authApi.getMe();
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Not found";
    }
  }

  async function logout(id: number) {
    error.value = null;

    try {
      user.value = await authApi.logout(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Error logout";
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    fetchUser,
    logout,
  };
});
