<script setup>
import { ref } from 'vue'
import Button from '../../Widgets/Button.vue'

const open = ref(false)

const items = [
  { label: 'Github', href: '#' },
  { label: 'Signup', href: '/signup' },
  { label: 'Login', href: '/login', primary: true }
]

function toggleMenu() {
  open.value = !open.value
}
</script>

<template>
  <div class="w-fit flex flex-col items-center gap-2 md:flex-row md:justify-end md:gap-4">

    <div class="w-fit md:hidden"><Button
      class="w-full"
      @click="toggleMenu"
      :aria-expanded="open"
    >
      Menu
    </Button></div>

    <div
      :class="[
        'w-full flex flex-col gap-2',
        'md:w-auto md:flex md:flex-row md:items-center md:gap-4',
        open ? 'flex' : 'hidden md:flex'
      ]"
      @click="open = false"
    >
      <a
        v-for="item in items"
        :key="item.label"
        :href="item.href"
        :class="[
          'w-full text-center px-4 py-3 transition-colors duration-200 no-underline',
          'md:w-auto',
          item.primary
            ? 'bg-cyan-500 text-slate-950 font-medium'
            : 'bg-white/15 text-white hover:text-white border border-white/10 md:border-none'
        ]"
      >
        {{ item.label }}
      </a>
    </div>

  </div>
</template>

<style scoped>
@reference "tailwindcss";
</style>