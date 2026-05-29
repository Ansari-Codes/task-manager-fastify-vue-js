<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'info'
  },
  message: {
    type: String,
    default: ''
  },
  closable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div :class="['notifier', `notifier-${type}`]" v-if="message">
    <div class="flex items-start justify-between gap-4">
      <span>{{ message }}</span>
      <button
        v-if="closable"
        type="button"
        class="btn btn-secondary"
        @click="$emit('close')"
      >
        Close
      </button>
    </div>
  </div>
</template>

<style scoped>@reference "tailwindcss";

.notifier {
  @apply w-full p-4 border text-sm;
  border-radius: 0;
}

.notifier-success {
  @apply bg-green-500/10 text-green-200 border-green-500/20;
}

.notifier-warning {
  @apply bg-yellow-500/10 text-yellow-200 border-yellow-500/20;
}

.notifier-error {
  @apply bg-red-500/10 text-red-200 border-red-500/20;
}

.notifier-info {
  @apply bg-blue-500/10 text-blue-200 border-blue-500/20;
}
</style>
