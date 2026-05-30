<script setup>
import { useSidebarState } from '../../Functions/sidebarState.js'

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

    <div
      class="relative shrink-0 px-6 py-4 border-b border-(--primary) bg-white/5 w-full"
    >
      <button
        type="button"
        class="absolute left-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 md:hidden"
        @click="handleToggleSidebar"
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <div class="pl-14">
        <slot name="header">
          <h1 class="text-white font-semibold text-lg">
            {{ headerTitle }}
          </h1>
        </slot>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto overflow-x-hidden p-6 text-slate-200">
      <div class="flex flex-col gap-6">
        <slot />
      </div>
    </div>

  </div>
</template>