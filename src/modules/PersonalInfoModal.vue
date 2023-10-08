<script setup lang="ts">
import { ref } from 'vue'
import PersonForm from './PersonForm/PersonForm.vue'
import ECModal from '@/components/ECModal.vue'
import ECButton from '@/components/ECButton.vue'

const isModalShown = ref(false)
const isLoading = ref(false)
const personForm = ref<typeof PersonForm>()

const openModal = () => {
  isModalShown.value = true
}

const closeModal = () => {
  isModalShown.value = false
}

const delegateFormSubmission = (e: Event) => {
  personForm.value!.submitForm(e)
}

const handleSubmitForm = (e: Event) => {
  delegateFormSubmission(e)
}

const handleFormSent = () => {
  isLoading.value = false
  closeModal()
}

const handleFormSubmitted = () => {
  isLoading.value = true
  setTimeout(handleFormSent, 1000)
}
</script>

<template>
  <ECButton @click="openModal">Открыть модалку</ECButton>
  <ECModal v-model="isModalShown" title="Форма" max-width="500px">
    <template #body>
      <PersonForm ref="personForm" @form-submitted="handleFormSubmitted" />
    </template>
    <template #footer>
      <ECButton @click="(e: Event) => handleSubmitForm(e)" :loading="isLoading">
        Отправить форму
      </ECButton>
    </template>
  </ECModal>
</template>