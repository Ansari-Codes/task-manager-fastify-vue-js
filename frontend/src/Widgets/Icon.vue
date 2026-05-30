<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: '' },
  label: { type: String, default: '' },
  size: { type: [String, Number], default: 24 }
})

const modules = import.meta.glob('/src/assets/svgs/**/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true
})

const svgContent = computed(() => {
  const path = `/src/assets/svgs/${props.name}.svg`
  return modules[path] || ''
})
</script>

<template>
  <span 
    class="icon" 
    :aria-label="label"
    :style="{ width: size + 'px', height: size + 'px' }"
    v-html="svgContent"
  />
</template>

<style scoped>
@reference "tailwindcss";

.icon {
  @apply inline-flex items-center justify-center shrink-0;
}

.icon :deep(svg) {
  @apply w-full h-full;
}
</style>
