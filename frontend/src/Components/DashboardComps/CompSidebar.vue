<!-- CompSidebar.vue -->
<script setup>
import { funLogout } from '../../Functions/funAuth.js'
import { useSidebarState } from '../../Functions/sidebarState.js'
import Button from '../../Widgets/Button.vue'
import LinkButton from '../../Widgets/LinkButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { sidebarOpen, closeSidebar } = useSidebarState()

const navItems = [
  { label: 'Dashboard', to: '/dashboard/home' },
  { label: 'Tasks', to: '/dashboard/tasks' },
  { label: 'Analytics', to: '/dashboard/analytics' },
  { label: 'Trash', to: '/dashboard/trash' },
  { label: 'Settings', to: '/dashboard/settings' }
]

async function handleLogout() {
  const res = await funLogout()
  if (res.success) {
    router.push('/login')
  }
}
</script>

<template>
  <aside :class="[
    'top-0 left-0 z-50 h-screen w-60 bg-black border-r border-(--primary) flex flex-col overflow-y-auto transition-all duration-300',
    sidebarOpen ? 'fixed md:relative translate-x-0' : 'fixed -translate-x-full'
  ]">
    <div class="w-full flex items-center justify-between px-4 py-5 border-b border-(--primary)">
      <div class="text-white font-bold text-xl">TaskManager</div>
      <!-- Close button for mobile -->
      <button class="text-white p-2 hover:bg-white/10 md:hidden" @click="closeSidebar">✕</button>
    </div>

    <nav class="flex-1 flex flex-col gap-2 p-2">
      <LinkButton v-for="item in navItems" :key="item.to" :to="item.to" class="w-full" variant="primary"
        active_class="border border-(--primary) bg-secondary text-(--primary)">
        {{ item.label }}
      </LinkButton>
    </nav>
    <div class="p-3 border-t border-(--primary)">
      <Button variant="danger" class="w-full" @click="handleLogout">Logout</Button>
    </div>
  </aside>
</template>