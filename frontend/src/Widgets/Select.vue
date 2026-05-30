<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  id: String,
  options: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

function onChange(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <label :for="id" class="labelled-input">
    <span v-if="label" class="form-label">{{ label }}</span>
    <div class="select-wrapper">
      <select
        :id="id"
        @change="onChange"
        :value="modelValue"
        class="select"
      >
        <option value="" v-if="label" disabled>Select {{ label.toLowerCase() }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <svg class="select-chevron" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </label>
</template>

<style scoped>@reference "tailwindcss";

.labelled-input {
  @apply w-full flex flex-col gap-1.5;
}

.form-label {
  @apply text-slate-300 text-xs font-medium uppercase tracking-wider;
}

.select-wrapper {
  @apply relative;
}

.select {
  @apply w-full px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm transition-all duration-200 appearance-none cursor-pointer;
  border-radius: 0;
  outline: none;
}

.select:hover:not(:disabled) {
  @apply bg-white/10 border-white/20;
}

.select:focus {
  @apply bg-white/10 border-indigo-500 ring-2 ring-indigo-500/20;
}

.select:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.select option {
  @apply bg-slate-900 text-white;
}

.select-chevron {
  @apply absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none;
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