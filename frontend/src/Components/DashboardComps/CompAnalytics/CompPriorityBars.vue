<script setup>
import { computed } from 'vue'

const props = defineProps({
    tasks: {
        type: Array,
        required: true
    }
})

const priorityLabels = {
  optional: 'Optional',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical'
}

const priorityColors = {
  optional: '#6b7280',
  low: '#22c55e',
  medium: '#3b82f6',
  high: '#f97316',
  critical: '#ef4444'
}

const priorityCounts = computed(() => {
  const counts = {}
  props.tasks.forEach(task => {
    const priority = task.priority || 'medium'
    counts[priority] = (counts[priority] || 0) + 1
  })
  return counts
})

const maxCount = computed(() => Math.max(...Object.values(priorityCounts.value), 1))
</script>

<template>
    <div class="w-full space-y-3">
        <div v-for="priority in Object.keys(priorityLabels)" :key="priority" class="flex items-center gap-3">
            <div class="w-20 text-xs text-slate-400 text-right flex-shrink-0">{{ priorityLabels[priority] }}</div>
            <div class="flex-1 h-6 bg-white/5 rounded-sm overflow-hidden relative">
                <div class="h-full rounded-sm transition-all duration-700 ease-out flex items-center justify-end px-2"
                    :style="{ 
                        width: `${((priorityCounts[priority] || 0) / maxCount) * 100}%`,
                        backgroundColor: priorityColors[priority] + '40',
                        borderLeft: `3px solid ${priorityColors[priority]}`
                    }">
                    <span class="text-xs font-bold" :style="{ color: priorityColors[priority] }">{{ priorityCounts[priority] || 0 }}</span>
                </div>
            </div>
        </div>
    </div>
</template>