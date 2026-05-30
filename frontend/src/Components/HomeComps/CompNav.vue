<script setup>
import { ref } from 'vue'
import Icon from '../../Widgets/Icon.vue'

const open = ref(false)
</script>

<template>
  <div class="md:hidden">
    <button
      @click="open = !open"
      class="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-white"
      :aria-expanded="open"
    >
      <Icon :name="open ? 'x' : 'menu'" size="20"/>
    </button>

    <div
      v-if="open"
      class="absolute top-full left-0 right-0 bg-[#071427]/95 backdrop-blur-xl border-b border-white/10 p-4 space-y-2"
    >
      <a href="#features" class="block px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-colors">Features</a>
      <a href="#dashboard" class="block px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-colors">Dashboard</a>
      <a href="#analytics" class="block px-4 py-3 text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-colors">Analytics</a>
    </div>
  </div>
</template>
