<script setup>
</script>

<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="grid-bg absolute inset-0 opacity-20"/>
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#071427]"/>
  </div>
</template>

<style scoped>
.grid-bg {
  background-image:
    linear-gradient(rgba(34, 211, 238, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 211, 238, 0.08) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}
</style>
