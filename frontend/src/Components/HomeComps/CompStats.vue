<script setup>
import { ref, onMounted } from 'vue'
import StatCounter from '../../Widgets/StatCounter.vue'
import { getSoftwareStats } from '../../Functions/funStats'

const stats = ref({
    totalTasks: 0,
    totalUsers: 0,
    tasksToday: 0,
    tasksThisWeek: 0,
    avgTasksPerUser: 0,
    loading: true,
    error: null
})

onMounted(async () => {
    try {
        const response = await getSoftwareStats()
        const res = response.data
        if (response.success) {
            stats.value = {
                totalTasks: res.stats.totalTasks || 0,
                totalUsers: res.stats.totalUsers || 0,
                tasksToday: res.stats.tasksToday || 0,
                tasksThisWeek: res.stats.tasksThisWeek || 0,
                avgTasksPerUser: res.stats.avgTasksPerUser || 0,
                loading: false,
                error: null
            }
        } else {
            stats.value.error = response.error || 'Failed to load stats'
            stats.value.loading = false
        }
    } catch (err) {
        stats.value.error = err.message
        stats.value.loading = false
    }
})
</script>

<template>
  <section class="relative py-16 border-y border-white/5 bg-white/1">
    <div class="max-w-7xl mx-auto px-6 md:px-4">
      <div v-if="stats.loading" class="flex justify-center py-8">
        <div class="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"/>
      </div>
      <div v-else-if="stats.error" class="text-center text-red-400 text-sm py-8">
        {{ stats.error }}
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <StatCounter :value="stats.totalTasks" suffix="+" label="Tasks Created"/>
        <StatCounter :value="stats.totalUsers" suffix="+" label="Active Users"/>
        <StatCounter :value="stats.tasksToday" suffix="" label="Tasks Today"/>
        <StatCounter :value="stats.tasksThisWeek" suffix="" label="This Week"/>
      </div>
    </div>
  </section>
</template>