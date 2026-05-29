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
    <span class="form-label">{{ label }}</span>
    <select
      :id="id"
      @change="onChange"
      :value="modelValue"
      class="select"
    >
      <option value="" disabled>Select {{ label.toLowerCase() }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped>@reference "tailwindcss";

.labelled-input {
  @apply w-full flex flex-col gap-2;
}

.form-label {
  @apply text-slate-300 text-sm font-semibold;
}

.select {
  @apply w-full px-4 py-3 bg-white/5 border border-white/10 text-white transition-all duration-200;
  border-radius: 0;
  outline: none;
}

.select:focus {
  @apply outline-none border-indigo-500 ring-4 ring-indigo-500/20;
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
