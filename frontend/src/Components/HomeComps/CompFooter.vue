<script setup>
import Icon from '../../Widgets/Icon.vue'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative border-t border-(--primary) bg-[#050d1a]">
    <div class="p-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="text-slate-600 text-sm">
        © {{ year }} QuickTaskManager. Open source under MIT.
      </div>

      <div class="flex items-center gap-4">
        <!-- Star on GitHub -->
        <a href="https://github.com/Ansari-Codes/task-manager-fastify-vue-js" target="_blank" rel="noopener"
          class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200">
          <Icon name="star" size="16" class="text-yellow-400" />
          Star on GitHub
        </a>
      </div>
    </div>
  </footer>
</template>
