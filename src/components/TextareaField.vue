<script setup lang="ts">
import { computed } from 'vue'
import FormField from './FormField.vue'
import type { IFormField } from '@/interfaces/formField'

const props = withDefaults(defineProps<IFormField<string>>(), {
  required: false,
  error: ''
})

const emit = defineEmits(['update:modelValue'])

const value = computed<string>({
  get() {
    return props.modelValue as string
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
  <FormField v-bind="$props">
    <textarea
      v-model="value"
      v-bind="$attrs"
      :aria-invalid="hasError"
      :aria-errormessage="error"
    ></textarea>
  </FormField>
</template>

<style lang="scss" scoped>
textarea {
  width: 100%;
  resize: vertical;
  min-height: 2rem;
}
</style>
