<script setup>
import Icon from '../../Widgets/Icon.vue'

const features = [
  {
    icon: 'layout',
    title: 'Smart Dashboard',
    description: 'Your command center. See everything at a glance — active tasks, upcoming deadlines, and recent tasks that actually mean something. No clutter, just signal.',
    preview: 'dashboard',
    align: 'left'
  },
  {
    icon: 'layers',
    title: 'Organized Categories',
    description: 'Group tasks by status or priority. Search even in descriptions of tasks. Get instant results and filtered content with zero overhead or high latency.',
    preview: 'categories',
    align: 'right'
  },
  {
    icon: 'pulse',
    title: 'Live Status Tracking',
    description: 'Every task has a pulse. Track Todo, In Progress, Done, and Blocked states in real-time. Visual indicators keep you aligned without endless check-ins.',
    preview: 'status',
    align: 'left'
  },
  {
    icon: 'trash-icon',
    title: 'Smart Trash & Recovery',
    description: 'Deleted something by mistake? No panic. Everything sits in trash with full restore capability. Accidents happen — we have your back.',
    preview: 'trash',
    align: 'right'
  },
  {
    icon: 'bar-chart',
    title: 'Deep Analytics',
    description: 'Understand your productivity patterns. Completion rates, time-per-task, category breakdowns, and trend lines. Data that helps you work smarter, not harder.',
    preview: 'analytics',
    align: 'left'
  }
]
</script>

<template>
  <section id="features" class="relative py-24 md:py-32 border-(--primary) border-b">
    <div class="max-w-7xl mx-auto px-6 md:px-4">
      <div class="text-center mb-20">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium uppercase tracking-widest mb-6">
          Features
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Everything You Need
        </h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto">
          Five core features designed for serious productivity. No bloat, no fluff — just tools that work.
        </p>
      </div>

      <div class="space-y-32 md:space-y-40">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          :class="[
            'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center',
            feature.align === 'right' ? 'lg:direction-rtl' : ''
          ]"
        >
          <!-- Text Content -->
          <div :class="feature.align === 'right' ? 'lg:order-2 lg:direction-ltr' : ''" class="space-y-6">
            <div class="w-12 h-12 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Icon :name="feature.icon" size="24" />
            </div>
            <h3 class="text-3xl md:text-4xl font-bold text-white">
              {{ feature.title }}
            </h3>
            <p class="text-slate-400 text-lg leading-relaxed max-w-md">
              {{ feature.description }}
            </p>
          </div>

          <!-- Preview -->
          <div :class="feature.align === 'right' ? 'lg:order-1 lg:direction-ltr' : ''" class="relative group">
            <div class="absolute -inset-4 bg-linear-to-r from-cyan-500 to-indigo-500 blur-xl opacity-10 items-center justify-center group-hover:opacity-100 transition-opacity duration-500"/>
            <div class="relative flex items-center justify-center bg-[#0f172a] border border-white/10 overflow-hidden shadow-xl hover:shadow-cyan-500/5 transition-shadow duration-500">
              <Icon :name="feature.preview" size="400" class="w-full h-auto"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
