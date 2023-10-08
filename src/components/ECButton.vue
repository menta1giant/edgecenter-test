<script setup lang="ts">
import ECLoader from './ECLoader.vue'

export interface Props {
  text?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: 'Дефолтная CTA',
  loading: false
})

const handleClick = (e: Event) => {
  if (props.loading) e.stopImmediatePropagation()
}
</script>

<template>
  <button class="ec-button" :class="{ 'ec-button--loading': loading }" @click="handleClick">
    <ECLoader v-if="loading" />
    <span
      ><slot>{{ text }}</slot></span
    >
  </button>
</template>

<style lang="scss" scoped>
.ec-button {
  display: flex;
  place-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;

  background: var(--c-accent);
  color: var(--c-white);
  font-size: var(--fs-medium);
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:not(:is(&--loading, &--disabled)) {
    &:focus,
    &:focus-visible {
      outline: 1px solid var(--c-accent);
      outline-offset: 2px;
    }

    &:hover {
      background: var(--c-accent-dark);
    }

    &:active {
      background: var(--c-accent-light);
    }
  }

  &--loading {
    color: var(--c-disabled);
    cursor: default;
  }
}
</style>
