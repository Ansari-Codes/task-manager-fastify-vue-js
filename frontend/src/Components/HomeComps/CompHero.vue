<script setup>
import LinkButton from '../../Widgets/LinkButton.vue'
import Icon from '../../Widgets/Icon.vue'
import AnimatedGrid from '../../Widgets/AnimatedGrid.vue'
</script>

<template>
  <section class="relative min-h-screen flex items-center overflow-hidden pt-20 border-(--primary) border-b">
    <AnimatedGrid />

    <!-- Floating orbs -->
    <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"/>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 1s"/>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-cyan-400/5 rounded-full blur-[150px]"/>

    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-4 py-1 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="space-y-8">

          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
            Task Management<br/>
            <span class="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-400">Reimagined</span>
          </h1>

          <p class="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
            A serious task system for students and fast workers. Categories, statuses, 
            analytics, and a dedicated trash folder — everything you need, nothing you don't.
          </p>

          <div class="flex flex-wrap gap-4">
            <LinkButton to="/signup" variant="primary" class="text-base px-8 py-3.5">
              Start Free
              <Icon name="arrow-right" size="16" class="ml-2"/>
            </LinkButton>
            <LinkButton to="#features" class="text-base" :router_link="false">
              See Features
            </LinkButton>
          </div>

          <div class="flex items-center gap-6 pt-4">
            <div class="flex items-center gap-2 text-slate-500 text-sm">
              <Icon name="check" size="16" class="text-cyan-400"/>
              Free forever
            </div>
            <div class="flex items-center gap-2 text-slate-500 text-sm">
              <Icon name="check" size="16" class="text-cyan-400"/>
              No credit card
            </div>
            <div class="flex items-center gap-2 text-slate-500 text-sm">
              <Icon name="check" size="16" class="text-cyan-400"/>
              Open source
            </div>
          </div>
        </div>

        <!-- Right: Dashboard Preview -->
        <div class="relative">
          <div class="absolute -inset-4 bg-linear-to-r from-cyan-500/20 to-indigo-500/20 blur-2xl opacity-50"/>
          <div class="relative bg-[#0f172a] border border-white/10 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/10">
            <div class="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
              <div class="w-3 h-3 rounded-full bg-red-500/60"/>
              <div class="w-3 h-3 rounded-full bg-yellow-500/60"/>
              <div class="w-3 h-3 rounded-full bg-green-500/60"/>
              <div class="ml-4 text-xs text-slate-600 font-mono">/dashboard</div>
            </div>
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between">
                <div class="text-white font-semibold">Today's Tasks</div>
                <div class="text-cyan-400 text-sm font-mono">24 active</div>
              </div>
              <div class="space-y-2">
                <div v-for="i in 4" :key="i" class="flex items-center gap-3 p-3 bg-white/3 border border-white/5 rounded hover:border-cyan-500/30 transition-colors">
                  <div class="w-4 h-4 border border-cyan-500/40 rounded-sm" :class="i === 1 ? 'bg-cyan-500/20' : ''"/>
                  <div class="flex-1">
                    <div class="text-slate-300 text-sm" :class="i === 1 ? 'line-through text-slate-600' : ''">
                      {{ ['Review physics notes', 'Submit CS assignment', 'Team sync at 3PM', 'Grocery run'][i-1] }}
                    </div>
                  </div>
                  <div class="text-xs px-2 py-0.5 rounded" :class="[
                    i === 1 ? 'bg-green-500/10 text-green-400' : 
                    i === 2 ? 'bg-yellow-500/10 text-yellow-400' : 
                    'bg-cyan-500/10 text-cyan-400'
                  ]">
                    {{ ['Done', 'In Progress', 'Pending', 'Optional'][i-1] }}
                  </div>
                </div>
              </div>
              <div class="flex gap-2 pt-2">
                <div class="h-1.5 flex-1 bg-cyan-500/20 rounded-full overflow-hidden">
                  <div class="h-full bg-cyan-500 rounded-full" style="width: 65%"/>
                </div>
                <span class="text-xs text-slate-500">65%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
