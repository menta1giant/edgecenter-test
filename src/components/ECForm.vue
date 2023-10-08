<script setup lang="ts">
import { ref } from 'vue'
import ECButton from './ECButton.vue'

export interface Props {
  submitButtonText?: string
}

const formSubmit = ref<HTMLInputElement>()

const submitForm = () => {
  formSubmit.value!.click()
}

defineExpose({
  submitForm
})

defineProps<Props>()
</script>

<template>
  <form class="form" @submit.prevent>
    <div v-if="$slots.header" class="form__header">
      <slot name="header"></slot>
    </div>
    <div class="form__body">
      <slot> </slot>
    </div>
    <div class="form__footer">
      <slot name="footer">
        <ECButton v-if="submitButtonText">{{ submitButtonText }}</ECButton>
      </slot>
    </div>
    <input type="submit" ref="formSubmit" class="visually-hidden" />
  </form>
</template>
