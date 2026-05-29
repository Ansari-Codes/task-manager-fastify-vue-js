<script setup>
import LinkButton from '../../Widgets/LinkButton.vue';
import CompGlitchTitle from '../CompGlitchTitle.vue';

const title = 'TaskManager — sharp, reliable'
const subtitle = 'A flat, modern task system built for focus and velocity.'
</script>

<template>
  <section class="hero-section relative overflow-hidden py-18 px-8 lg:py-11 lg:px-5 md:py-7 md:px-4 border-b border-(--primary)">
    <div class="grid grid-cols-1 gap-8 max-w-7xl mx-auto items-start lg:grid-cols-[1.3fr_1fr] lg:gap-6.5">
      <div class="flex flex-col gap-3">
        <div class="uppercase tracking-widest text-sky-300 text-xs">fast system</div>
        <CompGlitchTitle class="text-[clamp(2.8rem,4vw,4.4rem)] leading-tight m-0 font-bold" text="TaskManager" />
        <p class="text-slate-300 max-w-130 leading-loose lg:text-sm">A clean task manager for sharp teams and solo
          workflows. Minimal interface, strong signals, and flat system styling.</p>

        <div class="grid grid-cols-2 gap-2 w-full lg:w-64">
          <LinkButton to="/login" variant="primary" class="w-full">Login</LinkButton>
          <LinkButton to="/signup" class="w-full">Signup</LinkButton>
        </div>
      </div>

      <div class="flex flex-col gap-4.5 border border-(--primary)">
        <div class="bg-white/3 border border-white/8 p-6">
          <div class="text-white font-bold mb-4.5">System panel</div>
          <div class="flex justify-between py-3.5 border-b border-(--primary) text-slate-400 last:border-0">
            Tasks processed<span class="text-white font-bold">24</span>
          </div>
          <div class="flex justify-between py-3.5 border-b border-(--primary) text-slate-400 last:border-0">
            Active sessions<span class="text-white font-bold">8</span>
          </div>
          <div class="flex justify-between py-3.5 border-b border-(--primary) text-slate-400 last:border-0">
            Sync status<span class="text-white font-bold">Online</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";

.hero-section {
  background: radial-gradient(circle at top left, rgba(20, 255, 255, 0.14), transparent 22%),
    radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.16), transparent 24%),
    linear-gradient(180deg, #071427 0%, #081b33 42%, #081f3f 100%);
}

.hero-section::before,
.hero-section::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-section::before {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.35;
  transform: translateZ(0);
}

.hero-section::after {
  background: radial-gradient(circle at 25% 15%, rgba(56, 189, 248, 0.24), transparent 14%),
    radial-gradient(circle at 72% 22%, rgba(168, 85, 247, 0.18), transparent 12%),
    radial-gradient(circle at 50% 85%, rgba(34, 211, 238, 0.12), transparent 16%);
  opacity: 0.95;
}
</style>