<script setup>
import Icon from './Icon.vue'

const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
})
</script>

<template>
  <div class="group feature-card relative p-6 border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:border-cyan-500/30">
    <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"/>
    <div class="relative z-10">
      <div class="w-10 h-10 flex items-center justify-center bg-cyan-500/10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon :name="icon" size="20" />
      </div>
      <h3 class="text-white font-semibold text-base mb-2">{{ title }}</h3>
      <p class="text-slate-400 text-sm leading-relaxed">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
</style>
