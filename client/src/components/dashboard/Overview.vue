<script setup lang="ts">
import { ref, onMounted } from "vue";
import { dashboardApi } from "@/api";
import AppIcon from "@/components/UI/AppIcon.vue";

// Types
import type { Overview } from "@/types/dashboard/overview";

// Props
const props = withDefaults(
  defineProps<{
    link?: boolean;
  }>(),
  {
    link: true,
  },
);

// Data
const overviewList = ref<Overview[]>();

// Methods
async function getOverviewList() {
  return await dashboardApi.getOverviews();
}

// Lifecicle hooks
onMounted(async () => {
  const data = await getOverviewList();
  overviewList.value = data;
});
</script>

<template>
  <div class="grid">
    <article v-for="item in overviewList" :key="item.id">
      <i
        :style="{
          backgroundColor: item.backgroundColor,
        }"
      >
        <AppIcon :name="item.icon" :color="item.colorIcon" />
      </i>

      <div class="title-count">
        <p>{{ item.title }}</p>

        <strong>{{ item.countTasks ? item.countTasks : "-" }}</strong>
      </div>

      <RouterLink v-if="props.link" :to="item?.link || ''">{{
        item.linkName
      }}</RouterLink>
    </article>
  </div>
</template>

<style lang="css" scoped>
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
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 13px;
}

.grid i {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  font-size: 18px;
  font-style: normal;
}

.title-count p {
  font-size: 12px;
  color: var(--grey);
  margin: 18px 0 4px;
}

.title-count strong {
  font-size: 30px;
  color: var(--text-dark-gray);
}

.grid a,
.grid article > span {
  margin-top: 12px;
  font-size: 11px;
  color: var(--blue);
  text-decoration: none;
}
</style>
