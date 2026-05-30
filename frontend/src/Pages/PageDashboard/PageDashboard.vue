<script setup>
import CompSidebar from '../../Components/DashboardComps/CompSidebar.vue'
import { RouterView } from 'vue-router'

</script>

<template>
  <div class="flex h-screen w-full overflow-hidden bg-black/95">

    <CompSidebar />

    <div class="flex flex-col flex-1 overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>