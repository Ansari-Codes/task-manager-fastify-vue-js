<script setup>
import Icon from '../../Widgets/Icon.vue'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative border-t border-white/10 bg-[#050d1a]">
    <div class="max-w-7xl mx-auto px-6 md:px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- Brand -->
        <div class="md:col-span-1 space-y-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20">
              <Icon name="logo" size="22" />
            </div>
            <span class="text-white font-bold text-lg">TaskManager</span>
          </div>
          <p class="text-slate-500 text-sm leading-relaxed">
            Serious task management for serious people. Built with focus, speed, and reliability in mind.
          </p>
        </div>

        <!-- Product -->
        <div class="space-y-4">
          <h4 class="text-white font-semibold text-sm uppercase tracking-wider">Product</h4>
          <div class="space-y-3">
            <a href="#features" class="block text-slate-400 hover:text-cyan-400 text-sm transition-colors">Features</a>
            <a href="#" class="block text-slate-400 hover:text-cyan-400 text-sm transition-colors">Pricing</a>
            <a href="#" class="block text-slate-400 hover:text-cyan-400 text-sm transition-colors">Changelog</a>
            <a href="#" class="block text-slate-400 hover:text-cyan-400 text-sm transition-colors">Roadmap</a>
          </div>
        </div>

        <!-- Resources -->
        <div class="space-y-4">
          <h4 class="text-white font-semibold text-sm uppercase tracking-wider">Resources</h4>
          <div class="space-y-3">
            <a href="#" class="block text-slate-400 hover:text-cyan-400 text-sm transition-colors">Documentation</a>
            <a href="#" class="block text-slate-400 hover:text-cyan-400 text-sm transition-colors">API Reference</a>
            <a href="#" class="block text-slate-400 hover:text-cyan-400 text-sm transition-colors">Community</a>
            <a href="#" class="block text-slate-400 hover:text-cyan-400 text-sm transition-colors">Blog</a>
          </div>
        </div>

        <!-- Support -->
        <div class="space-y-4">
          <h4 class="text-white font-semibold text-sm uppercase tracking-wider">Support</h4>
          <div class="space-y-3">
            <a href="#" class="block text-slate-400 hover:text-cyan-400 text-sm transition-colors">Help Center</a>
            <a href="#" class="block text-slate-400 hover:text-cyan-400 text-sm transition-colors">Contact</a>
            <a href="#" class="block text-slate-400 hover:text-cyan-400 text-sm transition-colors">Status</a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="text-slate-600 text-sm">
          © {{ year }} TaskManager. Open source under MIT.
        </div>

        <div class="flex items-center gap-4">
          <!-- Star on GitHub -->
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          >
            <Icon name="star" size="16" class="text-yellow-400"/>
            Star on GitHub
          </a>

          <!-- Buy Me a Coffee -->
          <a
            href="#"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 px-4 py-2 bg-[#FFDD00]/10 border border-[#FFDD00]/20 text-[#FFDD00] text-sm hover:bg-[#FFDD00]/15 transition-all duration-200"
          >
            <Icon name="coffee" size="16"/>
            Buy Me a Coffee
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
