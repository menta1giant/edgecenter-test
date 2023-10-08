<script lang="ts" setup>
import { computed } from 'vue'
import type { IFormField } from '@/interfaces/formField'

const props = withDefaults(defineProps<IFormField<string | null>>(), {
  required: false,
  error: ''
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

const hasError = computed(() => !!props.error)

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="form-field">
    <label :for="$attrs.name as string">
      <div class="form-field__label">
        <span>{{ label }}</span>
        <span v-if="!required" class="text-w-500 text-small text-fw-400"> (необязательное)</span>
      </div>
      <slot>
        <input
          v-model="value"
          v-bind="{ ...$attrs, required }"
          :aria-invalid="hasError"
          :aria-errormessage="error"
        />
      </slot>
    </label>
    <div v-if="hasError" class="form-field__error">
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-field {
  display: block;
  margin-block: 0.5rem;

  &__error {
    color: var(--c-error);
  }

  label {
    display: block;

    font-size: var(--fs-medium);
    font-weight: 500;
  }

  input {
    width: 100%;
  }
}
</style>
