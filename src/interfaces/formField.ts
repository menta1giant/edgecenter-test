export interface IFormField<T> {
  modelValue: T | null
  label: string
  required?: boolean
  error: string
}
