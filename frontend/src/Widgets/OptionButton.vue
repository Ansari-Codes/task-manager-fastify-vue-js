<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  value: {
    type: [String, Number, Boolean],
    default: true
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

function toggle() {
  emit('update:modelValue', props.value)
}
</script>

<template>
  <button
    type="button"
    :class="['option-btn', { 'option-btn-active': modelValue === value }]"
    @click="toggle"
  >
    {{ label }}
  </button>
</template>

<style scoped>@reference "tailwindcss";

.option-btn {
  @apply inline-flex items-center justify-center px-4 py-2 border bg-white/5 text-slate-100 transition-all duration-200 cursor-pointer;
  border-radius: 0;
  border-color: rgba(255, 255, 255, 0.15);
}

.option-btn:hover {
  @apply bg-white/10;
}

.option-btn-active {
  @apply bg-indigo-500 text-white border-transparent;
}
</style>
