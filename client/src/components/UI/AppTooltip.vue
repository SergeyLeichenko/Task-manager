<!-- 
<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <span class="tooltip-container">
    <span class="tooltip-content">
      <slot />
    </span>

    <span class="tooltip-message" role="tooltip">
      {{ text }}
    </span>
  </span>
</template>

<style scoped>
.tooltip-container {
  position: relative;
  display: block;
  width: 100%;
  min-width: 0;
}

.tooltip-content {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tooltip-message {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  z-index: 100;  
  width: max-content;
  max-width: 300px;
  padding: 9px 12px;
  background: var(--white);
  box-shadow: 1px 1px 5px gray;
  color: var(--black);
  border-radius: 7px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  white-space: normal;
  overflow-wrap: anywhere;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
}

.tooltip-container:hover .tooltip-message,
.tooltip-container:focus-within .tooltip-message {
  opacity: 1;
  visibility: visible;
}
</style> -->


<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  text: string;
}>();

const visible = ref(false);

const position = ref({
  top: 0,
  left: 0,
});

function showTooltip(event: MouseEvent | FocusEvent) {
  const element = event.currentTarget as HTMLElement;
  const rect = element.getBoundingClientRect();

  const tooltipMaxWidth = 300;
  const margin = 12;

  position.value = {
    top: rect.top,
    left: Math.max(
      margin,
      Math.min(rect.left, window.innerWidth - tooltipMaxWidth - margin)
    ),
  };

  visible.value = true;
}

function hideTooltip() {
  visible.value = false;
}
</script>

<template>
  <span
    class="tooltip-container"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focusin="showTooltip"
    @focusout="hideTooltip"
  >
    <span class="tooltip-content">
      <slot />
    </span>

    <Teleport to="body">
      <span
        v-if="visible && text"
        class="tooltip-message"
        :style="{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }"
        @mouseenter="visible = true"
        @mouseleave="hideTooltip"
      >
        {{ text }}
      </span>
    </Teleport>
  </span>
</template>

<style scoped>
.tooltip-container {
  display: block;
  width: 100%;
  min-width: 0;
  cursor: pointer;
}

.tooltip-content {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tooltip-message {
  position: fixed;
  transform: translateY(-100%);
  z-index: 99999;
  width: max-content;
  max-width: 300px;
  max-height: 150px;
  padding: 9px 12px;
  background: var(--white);
  box-shadow: 1px 1px 5px gray;
  color: var(--black);
  border-radius: 7px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
  white-space: normal;
  overflow-wrap: anywhere;
  overflow-y: auto;
  overflow-x: hidden;
  pointer-events: auto;
  overscroll-behavior: contain;
}
</style>
