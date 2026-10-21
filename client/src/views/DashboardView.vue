<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTasksStore } from "@/stores/tasks";

const store = useTasksStore();
const { tasks, completedCount, loading } = storeToRefs(store);

// lifecicle hooks
onMounted(() => {
  if (!tasks.value.length) void store.fetchTasks();
});
</script>

<template>
  <section class="dashboard">
    <small>OVERVIEW</small>
    <h2>Good things happen <span>one task at a time.</span></h2>
    <p class="intro">Welcome back. Here’s a quick look at your progress.</p>
    <div class="grid">
      <article>
        <i>▤</i>
        <p>Total tasks</p>
        <strong>{{ loading ? "—" : tasks.length }}</strong>
        <RouterLink to="/tasks">View task list →</RouterLink>
      </article>
      <article>
        <i class="green">✓</i>
        <p>Tasks completed</p>
        <strong>{{ loading ? "—" : completedCount }}</strong
        ><span>Keep up the momentum</span>
      </article>
      <article>
        <i class="orange">◷</i>
        <p>Still to do</p>
        <strong>{{ loading ? "—" : tasks.length - completedCount }}</strong>
        <RouterLink to="/tasks">Make a plan →</RouterLink>
      </article>
    </div>
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

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 32px;
}

.grid article {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 22px;
  background: white;
  border: 1px solid #e7e9f0;
  border-radius: 13px;
}

.grid i {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: #ededff;
  color: #5b5ce2;
  font-size: 18px;
  font-style: normal;
}

.grid i.green {
  background: #e0f8ed;
  color: #19966b;
}

.grid i.orange {
  background: #fff0df;
  color: #d7832d;
}

.grid p {
  font-size: 12px;
  color: #858ca0;
  margin: 18px 0 4px;
}

.grid strong {
  font-size: 30px;
  color: #293149;
}

.grid a,
.grid article > span {
  margin-top: 12px;
  font-size: 11px;
  color: #5b5ce2;
  text-decoration: none;
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
