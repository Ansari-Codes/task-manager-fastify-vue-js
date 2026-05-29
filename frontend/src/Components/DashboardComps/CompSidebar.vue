<script setup>
import { ref } from 'vue'
import { funLogout } from '../../Functions/funAuth.js'
import Button from '../../Widgets/Button.vue'
import LinkButton from '../../Widgets/LinkButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const sidebarOpen = ref(true)
const sidebarCompact = ref(false)

const navItems = [
  {
    label: 'Dashboard',
    to: '/dashboard/home'
  },
  {
    label: 'Tasks',
    to: '/dashboard/tasks'
  },
  {
    label: 'Analytics',
    to: '/dashboard/analytics'
  },
  {
    label: 'Trash',
    to: '/dashboard/trash'
  },
  {
    label: 'Settings',
    to: '/dashboard/settings'
  }
]

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function toggleCompact() {
  sidebarCompact.value = !sidebarCompact.value
}

async function handleLogout() {
  const res = await funLogout()

  if (res.success) {
    router.push('/login')
  }
}

defineExpose({
  toggleSidebar,
  sidebarOpen
})
</script>

<template>
  <aside :class="[
    'fixed md:relative top-0 left-0 z-50 h-screen bg-black border-r border-(--primary) flex flex-col overflow-y-auto transition-all duration-300',
    sidebarCompact ? 'w-17' : 'w-60',
    sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
  ]">
    <div class="w-full flex items-center justify-between px-4 py-5 border-b border-(--primary)">
      <div v-if="!sidebarCompact" class="text-white font-bold text-xl">
        TaskManager
      </div>

      <Button variant="secondary" @click="toggleCompact">
        ☰
      </Button>
    </div>

    <nav class="flex-1 flex flex-col gap-2 p-2">
      <LinkButton v-for="item in navItems" :key="item.to" :to="item.to" class="w-full" variant="primary"
        active_class="border border-(--primary) bg-secondary text-(--primary)">
        <span v-if="!sidebarCompact">
          {{ item.label }}
        </span>

        <span v-else>
          {{ item.label.slice(0, 2) }}
        </span>
      </LinkButton>
    </nav>
    <div v-if="!sidebarCompact" class="p-3 border-t border-(--primary)">
      <Button variant="danger" class="w-full" @click="handleLogout">
        Logout
      </Button>
    </div>
  </aside>
</template>
