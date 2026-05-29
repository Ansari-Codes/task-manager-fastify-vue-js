<script setup>
import Link from '../../Widgets/Link.vue';
const year = new Date().getFullYear()
</script>

<template>
  <footer class="w-full h-fit p-8 border-t border-(--primary)">
    <div class="flex justify-between gap-3">
      <div class="text-slate-400">© {{ year }} TaskManager</div>
      <div class="flex gap-3">
        <Link to="#" :router="false">Github</Link>
        <Link to="/login">Login</Link>
        <Link to="/login">Signup</Link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "tailwindcss";
</style>