
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("admin@gmail.com");
const password = ref("123456");
const error = ref("");
const loading = ref(false);

async function handleLogin() {
  error.value = "";
  loading.value = true;

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    });

    await router.push({ name: "dashboard" });
  } catch {
    error.value = "Invalid email or password";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="login-page">
    <form class="login-form" @submit.prevent="handleLogin">
      <h1>Welcome back</h1>
      <p>Sign in to your account</p>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <p v-if="error" class="error">
        {{ error }}
      </p>

      <button type="submit" :disabled="loading">
        {{ loading ? "Signing in..." : "Login" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: var(--default-bg);
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
}

h1 {
  margin-bottom: 8px;
  color: var(--black);
}

.login-form > p {
  margin-bottom: 24px;
  color: var(--gray);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
}

label {
  font-size: 13px;
  color: var(--black);
}

input {
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 7px;
  outline: none;
}

input:focus {
  border-color: var(--blue);
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 7px;
  background: var(--blue);
  color: white;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  margin-bottom: 12px;
  color: var(--red);
  font-size: 13px;
}
</style>
