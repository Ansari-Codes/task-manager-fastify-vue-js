<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  id: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

function onInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <label :for="id" class="labelled-input">
    <span class="form-label">{{ label }}</span>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="input"
    />
  </label>
</template>

<style scoped>@reference "tailwindcss";

.labelled-input {
  animation: fadeIn 0.35s ease;
  @apply w-full flex flex-col gap-1;
}

.form-label {
  @apply text-slate-300 text-sm font-semibold;
}

.input {
  @apply w-full px-3 py-2 bg-transparent text-slate-100 placeholder:text-slate-500 transition-all duration-150;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 0;
  outline: none;
}

.input:focus {
  box-shadow: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(0, 163, 255, 0.06) inset;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
