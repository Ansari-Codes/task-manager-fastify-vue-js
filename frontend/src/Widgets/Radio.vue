<script setup>
const props = defineProps({
  modelValue: [String, Number, Boolean],
  label: String,
  name: String,
  options: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

function updateValue(value) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="labelled-input">
    <span class="form-label">{{ label }}</span>
    <div class="radio-group">
      <label
        v-for="option in options"
        :key="option.value"
        class="radio-option"
      >
        <input
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="() => updateValue(option.value)"
        />
        <span>{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>@reference "tailwindcss";

.labelled-input {
  @apply w-full flex flex-col gap-2;
}

.form-label {
  @apply text-slate-300 text-sm font-semibold;
}

.radio-group {
  @apply grid gap-3 mt-3;
}

.radio-option {
  @apply flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 cursor-pointer transition-all duration-200;
  border-radius: 0;
}

.radio-option:hover {
  @apply bg-white/10;
}

.radio-option input {
  @apply accent-indigo-500;
}
</style>
