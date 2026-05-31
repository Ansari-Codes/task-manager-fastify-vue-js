<script setup>
import Icon from '../../Widgets/Icon.vue'

const team = [
  {
    name: 'Muhammad Abu Bakar Siddique Ansari',
    role: 'Creator & Lead Developer',
    bio: 'Built QTM from scratch. Full-stack developer obsessed with performance and clean code.',
    icon: 'cpu'
  }
]
</script>

<template>
  <section class="relative py-24 md:py-32 border-y border-white/5 bg-white/1">
    <div class="max-w-7xl mx-auto px-6 md:px-4">
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium uppercase tracking-widest mb-6">
          Team
        </div>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Behind QTM
        </h2>
        <p class="text-slate-400 text-lg max-w-xl mx-auto">
          A solo project with community love. Open source means anyone can contribute.
        </p>
      </div>

      <div class="max-w-md mx-auto">
        <div
          class="p-8 border border-white/10 bg-white/2 text-center group hover:border-cyan-500/30 transition-all duration-300">
          <div
            class="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
            <Icon name="cpu" size="36" />
          </div>
          <h3 class="text-white font-bold text-xl mb-1">{{ team[0].name }}</h3>
          <div class="text-cyan-400 text-sm mb-4">{{ team[0].role }}</div>
          <p class="text-slate-400 text-sm leading-relaxed">{{ team[0].bio }}</p>

          <div class="flex justify-center gap-3 mt-6">
            <a href="https://github.com/Ansari-Codes" target="_blank" rel="noopener"
              class="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
              <Icon name="github" size="18" />
            </a>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <p class="text-slate-500 text-sm">
          Want to contribute? Check out our
          <a href="https://github.com/Ansari-Codes/task-manager-fastify-vue-js" target="_blank" rel="noopener"
            class="text-cyan-400 hover:text-cyan-300 transition-colors">GitHub repository</a>.
        </p>
      </div>
    </div>
  </section>
</template>
