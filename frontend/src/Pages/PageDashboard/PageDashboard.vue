<script setup>
import { ref } from 'vue'
import CompSidebar from '../../Components/DashboardComps/CompSidebar.vue'
import { RouterView } from 'vue-router'

const sidebar = ref(null)

function toggleSidebar() {
  sidebar.value?.toggleSidebar()
}

</script>

<template>
  <div class="flex h-screen w-full overflow-hidden bg-black/95">

    <CompSidebar ref="sidebar" />

    <div class="flex flex-col flex-1 overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>