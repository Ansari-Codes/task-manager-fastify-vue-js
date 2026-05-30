<script setup>
import { ref, computed, onMounted } from 'vue'
import CompContent from '../../../Components/DashboardComps/CompContent.vue'
import Card from '../../../Widgets/Card.vue'
import CompStatusPie from '../../../Components/DashboardComps/CompAnalytics/CompStatusPie.vue'
import CompPriorityBars from '../../../Components/DashboardComps/CompAnalytics/CompPriorityBars.vue'
import CompTimelineChart from '../../../Components/DashboardComps/CompAnalytics/CompTimelineChart.vue'
import CompBusynessGauge from '../../../Components/DashboardComps/CompAnalytics/CompBusynessGauge.vue'
import { getTasks } from '../../../Functions/funTasks'

const tasks = ref([])
const loading = ref(true)

onMounted(async () => {
    loading.value = true
    const res = await getTasks()
    if (res.success) tasks.value = res.data.tasks || []
    loading.value = false
})

const deadlineTasks = computed(() => tasks.value.filter(t => t.deadline && String(t.deadline).trim() !== '').length)
const overdueTasks = computed(() => tasks.value.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'done').length)
const completedTasks = computed(() => tasks.value.filter(t => t.status === 'done').length)
</script>

<template>
    <CompContent>
        <template #header>
            <h1 class="text-2xl font-bold text-slate-100">Analytics</h1>
        </template>
        <div v-if="loading" class="text-center text-slate-400 py-20">Loading analytics…</div>

        <div v-else class="space-y-6">

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Card>
                    <header class="mb-4">
                        <h2 class="text-lg font-semibold text-white">Tasks by Status</h2>
                        <p class="text-sm text-slate-400">Distribution across all statuses.</p>
                    </header>
                    <CompStatusPie :tasks="tasks" />
                </Card>

                <Card>
                    <header class="mb-4">
                        <h2 class="text-lg font-semibold text-white">Tasks by Priority</h2>
                        <p class="text-sm text-slate-400">Breakdown of priority levels.</p>
                    </header>
                    <CompPriorityBars :tasks="tasks" />
                </Card>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Card>
                    <header class="mb-4">
                        <h2 class="text-lg font-semibold text-white">Creation Timeline</h2>
                        <p class="text-sm text-slate-400">Tasks created per day over the last 14 days.</p>
                    </header>
                    <CompTimelineChart :tasks="tasks" />
                </Card>

                <Card>
                    <header class="mb-4">
                        <h2 class="text-lg font-semibold text-white">Busyness Meter</h2>
                        <p class="text-sm text-slate-400">Average tasks created per day — how busy you've been.</p>
                    </header>
                    <CompBusynessGauge :tasks="tasks" />
                </Card>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="p-5 border border-(--primary) bg-white/5">
                    <div class="text-(--primary) text-xs uppercase tracking-wider">Total Tasks</div>
                    <div class="text-3xl font-bold mt-1">{{ tasks.length }}</div>
                </div>
                <div class="p-5 border border-(--primary) bg-white/5">
                    <div class="text-(--primary) text-xs uppercase tracking-wider">With Deadline</div>
                    <div class="text-3xl font-bold mt-1">{{ deadlineTasks }}</div>
                </div>
                <div class="p-5 border border-(--primary) bg-white/5">
                    <div class="text-(--primary) text-xs uppercase tracking-wider">Overdue</div>
                    <div class="text-3xl font-bold mt-1 text-red-500">{{ overdueTasks }}</div>
                </div>
                <div class="p-5 border border-(--primary) bg-white/5">
                    <div class="text-(--primary) text-xs uppercase tracking-wider">Completed</div>
                    <div class="text-3xl font-bold mt-1 text-green-500">{{ completedTasks }}</div>
                </div>
            </div>

        </div>
    </CompContent>
</template>