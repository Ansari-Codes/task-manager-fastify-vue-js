<script setup>
import Icon from '../../Widgets/Icon.vue'

const stack = [
  { name: 'Vue 3', role: 'Frontend Framework', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { name: 'Fastify', role: 'Backend Server', color: 'text-slate-300', bg: 'bg-slate-500/10', border: 'border-slate-500/20' },
  { name: 'SQLite', role: 'Database', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { name: 'Tailwind CSS', role: 'Styling', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { name: 'Vite', role: 'Build Tool', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
]
</script>

<template>
  <section class="relative py-24 md:py-32 border-y border-white/5 bg-white/1">
    <div class="max-w-7xl mx-auto px-6 md:px-4">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium uppercase tracking-widest mb-6">
          Tech Stack
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Built With Modern Tools
        </h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto">
          We chose technologies that prioritize performance, developer experience, and long-term maintainability.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          v-for="item in stack"
          :key="item.name"
          class="group p-6 border text-center hover:scale-[1.02] transition-all duration-300"
          :class="[item.bg, item.border]"
        >
          <div class="text-lg font-bold mb-1" :class="item.color">{{ item.name }}</div>
          <div class="text-slate-500 text-xs">{{ item.role }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
