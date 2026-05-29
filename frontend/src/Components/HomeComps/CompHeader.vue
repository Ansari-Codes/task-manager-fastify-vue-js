<script setup>
import CompNav from './CompNav.vue'
</script>

<template>
  <header
    class="
      w-full
      px-4 py-4
      flex gap-4
      border-b border-(--primary)

      md:flex-row
      md:items-center
      justify-between
    "
  >
    <div class="flex gap-3">
      <div
        class="
          w-10 h-10
          flex items-center justify-center
          bg-cyan-500
          text-slate-950
          font-bold
          shrink-0
        "
      >
        TM
      </div>

      <div class="text-white font-semibold mt-2">
        TaskManager
      </div>
    </div>

    <CompNav />
  </header>
</template>

<style scoped>
@reference "tailwindcss";
</style>