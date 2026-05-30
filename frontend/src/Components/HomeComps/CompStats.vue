<script setup>
import StatCounter from '../../Widgets/StatCounter.vue'
</script>

<template>
  <section class="relative py-16 border-y border-white/5 bg-white/1">
    <div class="max-w-7xl mx-auto px-6 md:px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <StatCounter :value="50000" suffix="+" label="Tasks Created"/>
        <StatCounter :value="12000" suffix="+" label="Active Users"/>
        <StatCounter :value="99" suffix=".9%" label="Uptime"/>
        <StatCounter :value="92" suffix="ms" label="Avg Response"/>
      </div>
    </div>
  </section>
</template>
