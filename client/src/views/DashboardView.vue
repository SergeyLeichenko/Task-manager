<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useTasksStore } from "@/stores/tasks";
import { useAuthStore } from "@/stores/auth";

import Overview from "@/components/dashboard/Overview.vue";

const router = useRouter();
const tasksStore = useTasksStore();
const authStore = useAuthStore();
const { tasks } = storeToRefs(tasksStore);
const { isAuthenticated } = storeToRefs(authStore);

// Methods
async function getUser() {
  if (!isAuthenticated.value) {
    router.push({ name: "login" });
  } else {
    await authStore.fetchUser();
  }
}

// lifecicle hooks
onMounted(async () => {
  await getUser();

  if (!tasks.value.length) void tasksStore.fetchTasks();
});
</script>

<template>
  <section class="dashboard">
    <small>OVERVIEW</small>
    <h2>Good things happen <span>one task at a time.</span></h2>
    <p class="intro">Welcome back. Here’s a quick look at your progress.</p>

    <Overview />

    <div class="tip">
      <b>✦</b>
      <div>
        <strong>A small reminder</strong>
        <p>Focus on the next step, not the whole staircase. You’ve got this.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: auto;
  padding-top: 12px;
}

.dashboard > small {
  color: #7375d7;
  font-size: 10px;
  letter-spacing: 1.4px;
  font-weight: 800;
}

h2 {
  max-width: 650px;
  margin: 12px 0;
  color: #252c43;
  font-size: clamp(30px, 5vw, 44px);
  line-height: 1.15;
  letter-spacing: -1.4px;
}

h2 span {
  color: #5b5ce2;
}

.intro {
  font-size: 13px;
  color: #8990a3;
}

.tip {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding: 18px;
  background: #f0f0ff;
  border: 1px solid #e4e4fc;
  border-radius: 12px;
  color: #5b5ce2;
}

.tip strong {
  font-size: 12px;
  color: #373a83;
}

.tip p {
  font-size: 12px;
  color: #6e71a4;
  margin: 6px 0 0;
}

@media (max-width: 650px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .grid article {
    padding: 16px;
  }

  .grid p {
    margin-top: 12px;
  }
}
</style>
