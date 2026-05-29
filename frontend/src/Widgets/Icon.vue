<script setup>
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <span class="icon" :aria-label="label">
    {{ name }}
  </span>
</template>

<style scoped>@reference "tailwindcss";

.icon {
  @apply inline-flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 text-indigo-300;
  border-radius: 0;
}
</style>
