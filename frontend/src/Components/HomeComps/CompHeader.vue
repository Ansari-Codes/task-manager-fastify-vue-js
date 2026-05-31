<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Icon from '../../Widgets/Icon.vue'
import LinkButton from '../../Widgets/LinkButton.vue'

const scrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
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
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20">
          <Icon name="logo" size="28" />
        </div>
        <span class="text-white font-bold text-xl tracking-tight">TaskManager</span>
      </div>

      <!-- Desktop nav buttons -->
      <div class="hidden md:flex items-center gap-3">
        <LinkButton to="#features" :router_link="false">Features</LinkButton>
        <LinkButton to="https://github.com/Ansari-Codes/task-manager-fastify-vue-js" :router_link="false" target="_blank">
          GitHub
        </LinkButton>
        <LinkButton to="/login">Login</LinkButton>
        <LinkButton to="/signup" variant="primary">SignUp</LinkButton>
      </div>

      <!-- Mobile hamburger button -->
      <button
        @click="toggleMenu"
        class="md:hidden w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
      >
        <Icon :name="menuOpen ? 'x' : 'menu'" size="20" />
      </button>
    </div>

    <!-- Mobile dropdown menu -->
    <div
      v-if="menuOpen"
      class="md:hidden absolute top-full left-0 right-0 bg-[#071427]/95 backdrop-blur-xl border-b-2 border-(--primary) shadow-xl shadow-black/20"
    >
      <div class="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
        <LinkButton
          to="#features"
          :router_link="false"
          class="w-full justify-center"
          @click="closeMenu"
        >
          Features
        </LinkButton>
        <LinkButton
          to="https://github.com/Ansari-Codes/task-manager-fastify-vue-js"
          :router_link="false"
          class="w-full justify-center"
          @click="closeMenu"
        >
          GitHub
        </LinkButton>
        <LinkButton
          to="/login"
          class="w-full justify-center"
          @click="closeMenu"
        >
          Login
        </LinkButton>
        <LinkButton
          to="/signup"
          variant="primary"
          class="w-full justify-center"
          @click="closeMenu"
        >
          SignUp
        </LinkButton>
      </div>
    </div>
  </header>
</template>
