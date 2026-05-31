<script setup>
import Icon from '../../Widgets/Icon.vue'

const values = [
  {
    icon: 'zap',
    title: 'Speed First',
    description: 'Every interaction under 100ms. No spinners, no loading bars. Just instant feedback.'
  },
  {
    icon: 'focus',
    title: 'Deep Focus',
    description: 'Eliminate noise. One clean pane. Everything visible, nothing distracting.'
  },
  {
    icon: 'shield',
    title: 'Reliable',
    description: 'Your data stays safe. Local-first with encrypted cloud sync. 99.9% uptime guaranteed.'
  },
  {
    icon: 'users',
    title: 'For Everyone',
    description: 'Students, freelancers, teams. Built for solo workflows that scale to squads.'
  }
]
</script>

<template>
  <section class="relative py-24 md:py-32">
    <div class="max-w-7xl mx-auto px-6 md:px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <!-- Left: Story -->
        <div class="space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium uppercase tracking-widest">
            Our Mission
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-white">
            Why We Built QTM
          </h2>
          <div class="space-y-4 text-slate-400 leading-relaxed">
            <p>
              We were tired of bloated project management tools that felt like operating a spaceship just to write a grocery list. And we were equally frustrated by simple todo apps that fell apart the moment you needed categories, statuses, or analytics.
            </p>
            <p>
              So we built QTM — a system that sits right in the sweet spot. Powerful enough for complex workflows, simple enough to use without a manual. Fast enough that you never wait. Reliable enough that you never worry.
            </p>
            <p>
              Whether you are a student juggling assignments, a freelancer managing client work, or a team shipping products — QTM respects your time and gets out of your way.
            </p>
          </div>
        </div>

        <!-- Right: Values grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="value in values"
            :key="value.title"
            class="group p-6 border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"/>
            <div class="relative z-10">
              <div class="w-10 h-10 flex items-center justify-center bg-cyan-500/10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon :name="value.icon" size="20" />
              </div>
              <h3 class="text-white font-semibold text-base mb-2">{{ value.title }}</h3>
              <p class="text-slate-400 text-sm leading-relaxed">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
