<script setup lang="ts">
import { computed } from "vue";
import { getIcon } from "@/utils/icons";

interface Props {
  name?: string;
  color?: string;
}

const props = defineProps<Props>();

const icon = computed(() => {
  return props.name ? getIcon(props.name) : undefined;
});
</script>

<template>
  <font-awesome-icon
    v-if="icon"
    :icon="icon"
    :style="{
      color: props.color || 'inherit',
      fill: props.color || 'inherit',
    }"
  />
</template>
