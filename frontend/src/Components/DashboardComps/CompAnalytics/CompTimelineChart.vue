<script setup>
import { computed } from 'vue'

const props = defineProps({
    tasks: {
        type: Array,
        required: true
    }
})

function formatDate(value) {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const timelineData = computed(() => {
    const grouped = {}
    props.tasks.forEach(task => {
        if (!task.created_at) return
        const day = new Date(task.created_at).toISOString().split('T')[0]
        if (!grouped[day]) {
            grouped[day] = { date: day, count: 0, tasks: [] }
        }
        grouped[day].count++
        grouped[day].tasks.push(task)
    })
    return Object.values(grouped)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(-14)
})

const chartWidth = 600
const chartHeight = 200
const padding = { top: 20, right: 20, bottom: 40, left: 40 }

const maxCount = computed(() => {
    if (timelineData.value.length === 0) return 1
    return Math.max(...timelineData.value.map(d => d.count))
})

function getBarX(index) {
    const availableWidth = chartWidth - padding.left - padding.right
    const barWidth = availableWidth / timelineData.value.length
    return padding.left + index * barWidth + barWidth * 0.1
}

function getBarWidth() {
    const availableWidth = chartWidth - padding.left - padding.right
    return (availableWidth / timelineData.value.length) * 0.8
}

function getBarHeight(count) {
    const availableHeight = chartHeight - padding.top - padding.bottom
    return (count / maxCount.value) * availableHeight
}

function getBarY(count) {
    return chartHeight - padding.bottom - getBarHeight(count)
}
</script>

<template>
    <div class="w-full">
        <div v-if="timelineData.length === 0" class="text-slate-500 text-center py-8">
            No timeline data available.
        </div>

        <div v-else class="overflow-x-auto">
            <svg :viewBox="`0 0 ${chartWidth} ${chartHeight}`" class="w-full min-w-[500px]" preserveAspectRatio="xMidYMid meet">
                <line v-for="i in 5" :key="i"
                    :x1="padding.left" :y1="padding.top + (chartHeight - padding.top - padding.bottom) * (i - 1) / 4"
                    :x2="chartWidth - padding.right" :y2="padding.top + (chartHeight - padding.top - padding.bottom) * (i - 1) / 4"
                    stroke="rgba(255,255,255,0.1)" stroke-width="1" />

                <text v-for="i in 5" :key="`y-${i}`"
                    :x="padding.left - 10"
                    :y="padding.top + (chartHeight - padding.top - padding.bottom) * (i - 1) / 4 + 4"
                    text-anchor="end" fill="#94a3b8" font-size="10">
                    {{ Math.round(maxCount * (5 - i) / 4) }}
                </text>

                <rect v-for="(day, index) in timelineData" :key="day.date"
                    :x="getBarX(index)" :y="getBarY(day.count)"
                    :width="getBarWidth()" :height="getBarHeight(day.count)"
                    fill="var(--primary)" opacity="0.7" rx="3"
                    class="hover:opacity-100 transition-opacity" />

                <text v-for="(day, index) in timelineData" :key="`x-${day.date}`"
                    :x="getBarX(index) + getBarWidth() / 2"
                    :y="chartHeight - padding.bottom + 20"
                    text-anchor="middle" fill="#94a3b8" font-size="9"
                    :transform="`rotate(-45, ${getBarX(index) + getBarWidth() / 2}, ${chartHeight - padding.bottom + 20})`">
                    {{ formatDate(day.date) }}
                </text>

                <line :x1="padding.left" :y1="chartHeight - padding.bottom"
                    :x2="chartWidth - padding.right" :y2="chartHeight - padding.bottom"
                    stroke="rgba(255,255,255,0.3)" stroke-width="1" />
                <line :x1="padding.left" :y1="padding.top"
                    :x2="padding.left" :y2="chartHeight - padding.bottom"
                    stroke="rgba(255,255,255,0.3)" stroke-width="1" />
            </svg>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
            <div v-for="day in timelineData.slice(-7)" :key="day.date" 
                class="px-2 py-1 text-xs border border-(--primary)/30 bg-white/5 rounded">
                <span class="text-slate-400">{{ formatDate(day.date) }}:</span>
                <span class="text-(--primary) font-bold ml-1">{{ day.count }}</span>
            </div>
        </div>
    </div>
</template>