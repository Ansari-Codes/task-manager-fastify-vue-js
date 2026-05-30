<script setup>
import CompHeader from '../Components/HomeComps/CompHeader.vue'
import CompHero from '../Components/HomeComps/CompHero.vue'
import CompStats from '../Components/HomeComps/CompStats.vue'
import CompFeatureShowcase from '../Components/HomeComps/CompFeatureShowcase.vue'
import CompCTA from '../Components/HomeComps/CompCTA.vue'
import CompFooter from '../Components/HomeComps/CompFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-[#071427] text-white overflow-x-hidden">
    <CompHeader />
    <CompHero />
    <CompStats />
    <CompFeatureShowcase />
    <CompCTA />
    <CompFooter />
  </div>
</template>

<style scoped>
/* Global smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #071427;
}
::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #334155;
}

/* Selection color */
::selection {
  background: rgba(34, 211, 238, 0.2);
  color: white;
}
</style>
