<script setup>
import Icon from '../../Widgets/Icon.vue'
</script>

<template>
  <section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24">
    <!-- Background glow -->
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/8 rounded-full blur-[120px]"/>
    <div class="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-500/8 rounded-full blur-[100px]"/>

    <div class="relative z-10 max-w-4xl mx-auto px-6 md:px-4 text-center">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium uppercase tracking-widest mb-8">
        <span class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"/>
        About Us
      </div>

      <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
        Built for People Who<br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Get Things Done</span>
      </h1>

      <p class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
        QTM is not another todo app. It is a task system designed for velocity, clarity, and serious productivity.
      </p>
    </div>
  </section>
</template>
