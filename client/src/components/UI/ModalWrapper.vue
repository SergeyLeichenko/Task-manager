<script setup lang="ts">
defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @click.self="emit('close')">
      <div class="modal-container" role="dialog" aria-modal="true">
        <div class="modal-header">
          <slot name="header" />
        </div>

        <div class="modal-body">
          <slot name="body" />
        </div>

        <div class="modal-footer">
          <slot name="footer" />

          <button
            type="button"
            class="modal-default-button"
            @click="emit('close')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  inset: 0;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(24, 29, 48, 0.55);
  backdrop-filter: blur(4px);
  transition: opacity 0.25s ease;
}

.modal-container {
  width: 100%;
  max-width: 480px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  margin: auto;
  padding: 28px;
  background: #fff;
  border: 1px solid #e8eaf1;
  border-radius: 18px;
  box-shadow: 0 24px 70px rgba(28, 33, 60, 0.2);
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #252c43;
  font-size: 20px;
  font-weight: 700;
}

.modal-header h3 {
  margin: 0;
  color: #252c43;
  font-size: 20px;
  font-weight: 700;
}

.modal-body {
  margin: 24px 0;
  color: #68718a;
  font-size: 14px;
  line-height: 1.6;
}

/* Якщо всередині модалки є форма */
.modal-body form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;
  border: 0;
  background: transparent;
}

.modal-body form div {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-body input,
.modal-body textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e0e4ee;
  border-radius: 10px;
  background: #f8f9fc;
  color: #293149;
  font: inherit;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.modal-body input::placeholder,
.modal-body textarea::placeholder {
  color: #9aa1b3;
}

.modal-body input:focus,
.modal-body textarea:focus {
  outline: none;
  border-color: #7778e8;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(91, 92, 226, 0.12);
}

.modal-body textarea {
  min-height: 100px;
  resize: vertical;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding-top: 18px;
  border-top: 1px solid #edf0f5;
}

.modal-default-button {
  float: none;
  min-height: 40px;
  padding: 10px 17px;
  border: 1px solid transparent;
  border-radius: 9px;
  background: #5556cf;
  color: #fff;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.modal-default-button:hover {
  background: #4445bb;
}

.modal-default-button:active {
  transform: scale(0.98);
}

/* Друга кнопка — Cancel */
.modal-default-button + .modal-default-button {
  border-color: #e0e4ee;
  background: #fff;
  color: #68718a;
}

.modal-default-button + .modal-default-button:hover {
  background: #f5f6fa;
}

/* Анімація */
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

@media (max-width: 560px) {
  .modal-mask {
    padding: 14px;
  }

  .modal-container {
    max-height: calc(100dvh - 28px);
    padding: 22px 18px;
    border-radius: 15px;
  }

  .modal-header h3 {
    font-size: 18px;
  }

  .modal-footer {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .modal-default-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal-mask,
  .modal-container,
  .modal-default-button {
    transition: none;
  }
}
</style>
