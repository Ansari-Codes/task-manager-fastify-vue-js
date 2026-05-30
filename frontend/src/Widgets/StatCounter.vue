<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  suffix: { type: String, default: '' },
  label: { type: String, required: true }
})

const displayValue = ref(0)
let rafId = null

onMounted(() => {
  const duration = 2000
  const start = performance.now()

  const animate = (now) => {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayValue.value = Math.floor(eased * props.value)

    if (progress < 1) {
      rafId = requestAnimationFrame(animate)
    }
  }

  rafId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="text-center">
    <div class="text-3xl md:text-4xl font-bold text-white mb-1">
      {{ displayValue.toLocaleString() }}{{ suffix }}
    </div>
    <div class="text-slate-500 text-sm uppercase tracking-wider">{{ label }}</div>
  </div>
</template>
