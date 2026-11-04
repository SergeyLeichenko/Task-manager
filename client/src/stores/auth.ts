import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { LoginPayload, User } from "@/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem("user") || "null"),
  );

  const isAuthenticated = computed(() => !!user.value);

  async function login(payload: LoginPayload) {
    // Тимчасова тестова авторизація
    if (payload.email === "admin@gmail.com" && payload.password === "123456") {
      user.value = {
        id: 1,
        email: payload.email,
      };

      localStorage.setItem("user", JSON.stringify(user.value));

      return true;
    }

    throw new Error("Invalid email or password");
  }

  function logout() {
    user.value = null;
    localStorage.removeItem("user");
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
});
