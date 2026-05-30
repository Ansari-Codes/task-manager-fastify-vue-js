<script setup>
import Icon from '../../Widgets/Icon.vue'
import LinkButton from '../../Widgets/LinkButton.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header :class="[
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-(--primary)',
    scrolled ? 'bg-[#071427]/90 backdrop-blur-xl' : 'bg-transparent'
  ]">
    <div class="max-w-7xl mx-auto px-6 md:px-4 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20">
          <Icon name="logo" size="28" />
        </div>
        <span class="text-white font-bold text-xl tracking-tight">TaskManager</span>
      </div>

      <div class="flex items-center gap-3 w-fit">
        <LinkButton to="#features" class="hidden sm:inline-flex" :router_link="false">Features</LinkButton>
        <LinkButton to="https://github.com" external class="hidden sm:inline-flex">
          GitHub
        </LinkButton>
        <LinkButton to="/login" class="hidden sm:inline-flex">Login</LinkButton>
        <LinkButton to="/signup" variant="primary">SignUp</LinkButton>
      </div>
    </div>
  </header>
</template>
