<script setup lang="ts">
import ECForm from '@/components/ECForm.vue'
import FormField from '@/components/FormField.vue'
import TextareaField from '@/components/TextareaField.vue'
import { reactive, watch, computed } from 'vue'
import type { IFormFields } from './personForm'

const REQUIRED_FIELDS = ['name', 'phone', 'email', 'message']
const PHONE_REGEX = new RegExp(/^\+7\d{10}$/)
const EMAIL_REGEX = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)

const emit = defineEmits<{
  'form-submitted': [IFormFields]
}>()

const personForm: IFormFields = reactive({
  name: null,
  surname: null,
  phone: null,
  email: null,
  message: ''
})

const errors: { [key: string]: string } = reactive({})

for (const key in personForm) {
  watch(
    () => personForm[key as keyof IFormFields],
    () => {
      errors[key] = ''
    }
  )
}

const resetErrors = () => {
  for (const key in errors) {
    errors[key] = ''
  }
}

const hasError = computed(() => {
  let hasError = false

  for (const value of Object.values(errors)) {
    if (value) {
      hasError = true
      break
    }
  }

  return hasError
})

const sendValidatedForm = (validatedForm: IFormFields) => {
  emit('form-submitted', validatedForm)
}

const validateForm = (e: Event) => {
  e.preventDefault()
  resetErrors()

  if (!PHONE_REGEX.test(String(personForm.phone))) {
    errors['phone'] = 'Введите российский номер телефона в формате +7XXXXXXXXXX'
  }

  if (!EMAIL_REGEX.test(String(personForm.email))) {
    errors['email'] = 'Введите корректный email'
  }

  if (personForm.name && personForm.name.length > 100) {
    errors['name'] = 'Ваше имя должно содержать не более 100 символов'
  }

  if (personForm.surname && personForm.surname.length > 100) {
    errors['surname'] = 'Ваша фамилия должна содержать не более 100 символов'
  }

  if (personForm.message && personForm.message.length > 500) {
    errors['message'] = 'Сообщение должно содержать не более 500 символов'
  }

  REQUIRED_FIELDS.forEach((field) => {
    if (!personForm[field as keyof IFormFields]) {
      errors[field] = 'Заполните это поле'
    }
  })

  if (!hasError.value) {
    sendValidatedForm(personForm)
  }
}

const submitForm = (e: Event) => {
  validateForm(e)
}

defineExpose({
  submitForm
})
</script>

<template>
  <ECForm ref="form" @submit="validateForm">
    <form-field
      v-model="personForm.name"
      label="Имя"
      name="name"
      :error="errors['name']"
      required
    ></form-field>
    <form-field
      v-model="personForm.surname"
      label="Фамилия"
      name="surname"
      :error="errors['surname']"
    ></form-field>
    <form-field
      v-model="personForm.phone"
      label="Телефон"
      type="phone"
      name="phone"
      placeholder="+7XXXXXXXXXX"
      :error="errors['phone']"
      required
    ></form-field>
    <form-field
      v-model="personForm.email"
      label="Почта"
      type="email"
      name="email"
      placeholder="example@mail.com"
      :error="errors['email']"
      required
    ></form-field>
    <TextareaField
      v-model="personForm.message"
      name="message"
      label="Cообщение"
      placeholder="Не более 500 символов"
      :error="errors['message']"
      required
    ></TextareaField>
  </ECForm>
</template>
