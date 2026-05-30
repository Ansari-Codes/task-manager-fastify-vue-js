<script setup>
import { computed } from 'vue'

const props = defineProps({
    tasks: {
        type: Array,
        required: true
    }
})

const busyness = computed(() => {
    if (props.tasks.length === 0) return { avg: 0, trend: 'neutral', days: 0, label: 'No data', color: 'text-slate-500' }

    const dates = props.tasks.filter(t => t.created_at).map(t => new Date(t.created_at))
    if (dates.length === 0) return { avg: 0, trend: 'neutral', days: 0, label: 'No data', color: 'text-slate-500' }

    const oldest = new Date(Math.min(...dates))
    const newest = new Date(Math.max(...dates))
    const dayDiff = Math.max(1, Math.ceil((newest - oldest) / (1000 * 60 * 60 * 24)))
    const avg = (props.tasks.length / dayDiff).toFixed(2)

    let trend = 'neutral', label = 'Moderate', color = 'text-yellow-500'
    if (avg >= 3) { trend = 'up'; label = 'Very Busy'; color = 'text-red-500' }
    else if (avg >= 1.5) { trend = 'up'; label = 'Busy'; color = 'text-orange-500' }
    else if (avg >= 0.5) { trend = 'neutral'; label = 'Moderate'; color = 'text-yellow-500' }
    else { trend = 'down'; label = 'Relaxed'; color = 'text-green-500' }

    return { avg, trend, days: dayDiff, label, color }
})

const weeklyData = computed(() => {
    const weeks = {}
    props.tasks.forEach(task => {
        if (!task.created_at) return
        const date = new Date(task.created_at)
        const weekStart = new Date(date)
        weekStart.setDate(date.getDate() - date.getDay())
        const weekKey = weekStart.toISOString().split('T')[0]
        if (!weeks[weekKey]) weeks[weekKey] = { week: weekKey, count: 0 }
        weeks[weekKey].count++
    })
    return Object.values(weeks).sort((a, b) => new Date(a.week) - new Date(b.week)).slice(-6)
})

const gaugeRadius = 80
const gaugeStroke = 12
const gaugeCircumference = 2 * Math.PI * (gaugeRadius - gaugeStroke / 2)
const gaugeProgress = computed(() => Math.min(parseFloat(busyness.value.avg) / 5, 1))
const gaugeOffset = computed(() => gaugeCircumference * (1 - gaugeProgress.value))

const gaugeColor = computed(() => {
    const avg = parseFloat(busyness.value.avg)
    if (avg >= 3) return '#ef4444'
    if (avg >= 1.5) return '#f97316'
    if (avg >= 0.5) return '#eab308'
    return '#22c55e'
})
</script>

<template>
    <div class="w-full">
        <div class="flex flex-col sm:flex-row items-center gap-6">
            <div class="relative flex-shrink-0">
                <svg :width="gaugeRadius * 2 + 40" :height="gaugeRadius + 40" viewBox="0 0 200 120">
                    <path d="M 20 100 A 80 80 0 0 1 180 100" 
                        fill="none" stroke="rgba(255,255,255,0.1)" :stroke-width="gaugeStroke" stroke-linecap="round" />
                    <path d="M 20 100 A 80 80 0 0 1 180 100" 
                        fill="none" :stroke="gaugeColor" :stroke-width="gaugeStroke" 
                        stroke-linecap="round" 
                        :stroke-dasharray="gaugeCircumference" 
                        :stroke-dashoffset="gaugeOffset"
                        class="transition-all duration-1000" />
                    <text x="100" y="85" text-anchor="middle" fill="white" font-size="28" font-weight="bold">
                        {{ busyness.avg }}
                    </text>
                    <text x="100" y="105" text-anchor="middle" fill="#94a3b8" font-size="10">
                        tasks/day
                    </text>
                </svg>
            </div>

            <div class="flex-1 text-center sm:text-left">
                <div :class="['text-2xl font-bold', busyness.color]">{{ busyness.label }}</div>
                <div class="text-slate-400 text-sm mt-1">{{ props.tasks.length }} tasks over {{ busyness.days }} days</div>
                <div class="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                    <span class="text-xs px-2 py-1 rounded border" 
                        :class="busyness.trend === 'up' ? 'border-red-500/30 text-red-400' : busyness.trend === 'down' ? 'border-green-500/30 text-green-400' : 'border-yellow-500/30 text-yellow-400'">
                        {{ busyness.trend === 'up' ? '▲ High activity' : busyness.trend === 'down' ? '▼ Low activity' : '● Steady' }}
                    </span>
                </div>
            </div>
        </div>

        <div class="mt-6">
            <div class="text-xs text-slate-400 mb-2 uppercase tracking-wider">Weekly Breakdown</div>
            <div class="flex items-end gap-2 h-24">
                <div v-for="week in weeklyData" :key="week.week" class="flex-1 flex flex-col items-center gap-1">
                    <div class="text-xs text-(--primary) font-bold">{{ week.count }}</div>
                    <div class="w-full bg-(--primary)/20 rounded-t-sm relative overflow-hidden" 
                        :style="{ height: `${(week.count / Math.max(...weeklyData.map(w => w.count), 1)) * 80}px` }">
                        <div class="absolute bottom-0 left-0 right-0 bg-(--primary)/60" style="height: 100%"></div>
                    </div>
                    <div class="text-[10px] text-slate-500 truncate w-full text-center">
                        {{ new Date(week.week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>