<script setup>
import { computed } from 'vue'

const props = defineProps({
    tasks: {
        type: Array,
        required: true
    }
})

const statusLabels = {
  pending: 'Pending',
  in_progress: 'In Progress',
  done: 'Completed',
  cancelled: 'Cancelled',
  trashed: 'Trashed'
}

const statusColors = {
  pending: '#eab308',
  in_progress: '#3b82f6',
  done: '#22c55e',
  cancelled: '#ef4444',
  trashed: '#6b7280'
}

const statusCounts = computed(() => {
  const counts = {}
  props.tasks.forEach(task => {
    const status = task.status || 'pending'
    counts[status] = (counts[status] || 0) + 1
  })
  return counts
})

const pieData = computed(() => {
  const total = props.tasks.length
  if (total === 0) return []
  let currentAngle = 0
  return Object.entries(statusCounts.value).map(([status, count]) => {
    const percentage = count / total
    const angle = percentage * 360
    const startAngle = currentAngle
    currentAngle += angle
    return {
      status, count,
      percentage: (percentage * 100).toFixed(1),
      startAngle, endAngle: currentAngle,
      color: statusColors[status] || '#6b7280'
    }
  })
})

function getPieSlicePath(startAngle, endAngle, radius = 80, cx = 100, cy = 100) {
  const startRad = (startAngle - 90) * Math.PI / 180
  const endRad = (endAngle - 90) * Math.PI / 180
  const x1 = cx + radius * Math.cos(startRad)
  const y1 = cy + radius * Math.sin(startRad)
  const x2 = cx + radius * Math.cos(endRad)
  const y2 = cy + radius * Math.sin(endRad)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
}
</script>

<template>
    <div class="w-full">
        <div v-if="props.tasks.length === 0" class="text-slate-500 text-center py-8">No task data available.</div>
        <div v-else class="flex flex-col sm:flex-row items-center gap-6">
            <svg width="200" height="200" viewBox="0 0 200 200" class="flex-shrink-0">
                <g v-for="slice in pieData" :key="slice.status">
                    <path :d="getPieSlicePath(slice.startAngle, slice.endAngle)" 
                        :fill="slice.color" opacity="0.8" stroke="black" stroke-width="2" />
                </g>
                <circle cx="100" cy="100" r="45" fill="black" />
                <text x="100" y="95" text-anchor="middle" fill="white" font-size="20" font-weight="bold">{{ props.tasks.length }}</text>
                <text x="100" y="112" text-anchor="middle" fill="#94a3b8" font-size="10">total</text>
            </svg>

            <div class="flex-1 grid grid-cols-2 gap-2">
                <div v-for="slice in pieData" :key="slice.status" class="flex items-center gap-2 p-2 rounded bg-white/5">
                    <div class="w-3 h-3 rounded-full flex-shrink-0" :style="{ backgroundColor: slice.color }"></div>
                    <div class="min-w-0">
                        <div class="text-xs text-slate-300 truncate">{{ statusLabels[slice.status] || slice.status }}</div>
                        <div class="text-sm font-bold">{{ slice.count }} <span class="text-slate-500 text-xs">({{ slice.percentage }}%)</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>