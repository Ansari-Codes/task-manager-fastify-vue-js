<script setup>
import { useSidebarState } from '../../Functions/sidebarState.js'
import Button from '../../Widgets/Button.vue'

defineProps({
  headerTitle: {
    type: String,
    default: 'Content'
  }
})

const { toggleSidebar } = useSidebarState()

function handleToggleSidebar() {
  toggleSidebar()
}
</script>

<template>
  <div class="flex flex-col flex-1 overflow-hidden">

    <div class="relative shrink-0 px-6 py-4 border-b border-(--primary) bg-white/5 w-full flex items-center gap-2">
      <Button @click="handleToggleSidebar">
        ☰
      </Button>

      <slot name="header">
        <h1 class="text-white font-semibold text-lg">
          {{ headerTitle }}
        </h1>
      </slot>
    </div>

    <div class="flex-1 overflow-y-auto overflow-x-hidden p-6 text-slate-200">
      <div class="flex flex-col gap-6">
        <slot />
      </div>
    </div>

  </div>
</template>