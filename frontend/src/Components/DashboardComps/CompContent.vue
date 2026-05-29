<script setup>
defineProps({
  headerTitle: {
    type: String,
    default: 'Content'
  }
})
</script>

<template>
  <div class="flex flex-col flex-1 overflow-hidden">

    <div
      class="shrink-0 px-6 py-4 border-b border-(--primary) bg-white/5 w-full justify-between items-center"
    >
      <slot name="header">
        <h1 class="text-white font-semibold text-lg">
          {{ headerTitle }}
        </h1>
      </slot>
    </div>

    <div class="flex-1 overflow-y-auto overflow-x-hidden p-6 text-slate-200">
      <slot />
    </div>

  </div>
</template>