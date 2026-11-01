<script setup lang="ts">
// Props
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class="hint">
    <div class="hint-block">
      <div class="icons">

      </div>
      <p class="text">
        {{ props.text }}
      </p>
    </div>
  </div>
</template>