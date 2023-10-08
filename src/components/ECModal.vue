<script setup lang="ts">
import { computed } from 'vue'
export interface Props {
  title?: string
  maxWidth: string
  modelValue: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Дефолтный заголовок модалки',
  maxWidth: '80%'
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const closeModal = () => {
  value.value = false
}
</script>

<template>
  <Teleport v-if="value" to="body">
    <div class="modal-overlay" @mousedown="closeModal">
      <div class="modal" :style="{ maxWidth: maxWidth }" @mousedown.stop>
        <div class="modal__header">
          <slot name="header">{{ title }}</slot>
        </div>
        <div class="modal__body">
          <slot name="body"></slot>
        </div>
        <div class="modal__footer">
          <slot name="footer"><button>Дефолтная CTA</button></slot>
        </div>
        <div class="x-mark" @click="closeModal">x</div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal-overlay {
  width: 100%;
  height: 100%;

  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  place-items: center;

  background: rgba(0, 0, 0, 0.5);
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-10%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal {
  --padding: 1rem 1.5rem;
  --divider-border-style: 1px solid rgb(0, 0, 0, 0.1);

  position: relative;
  margin: auto;
  max-width: 80%;
  min-width: min(500px, 80%);

  background: white;
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;

  animation: fadeInDown 0.4s ease-out forwards;

  &__header,
  &__body,
  &__footer {
    padding: var(--padding);
  }

  &__header {
    font-weight: bold;
    font-size: var(--fs-large);

    border-bottom: var(--divider-border-style);
  }

  &__body {
    padding-block: 0.25rem;
  }

  &__footer {
    border-top: var(--divider-border-style);
  }

  .x-mark {
    position: absolute;
    right: 1rem;
    top: 1rem;

    color: var(--text-w-300);
    font-size: 1.5rem;
    line-height: 1;
    font-family: monospace;

    cursor: pointer;

    &:hover {
      color: rgba(0, 0, 0, 0.5);
      scale: 1.1;
    }
  }
}
</style>
