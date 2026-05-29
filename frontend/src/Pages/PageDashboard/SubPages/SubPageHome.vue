<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import CompContent from '../../../Components/DashboardComps/CompContent.vue'

import { getUser } from '../../../Functions/funAuth'
import { getTasks } from '../../../Functions/funTasks'

const user = ref(null)
const tasks = ref([])

const now = ref(new Date())

let timer = null

onMounted(async () => {

    timer = setInterval(() => {
        now.value = new Date()
    }, 1000)

    const userRes = await getUser()

    if (userRes.success) {
        user.value = userRes.data.user
    }

    const taskRes = await getTasks()

    if (taskRes.success) {
        tasks.value = taskRes.data.tasks || []
    }

})

onUnmounted(() => {
    clearInterval(timer)
})

const totalTasks = computed(() =>
    tasks.value.length
)

const completedTasks = computed(() =>
    tasks.value.filter(
        task => task.status === 'done'
    ).length
)

const pendingTasks = computed(() =>
    tasks.value.filter(
        task => task.status === 'pending'
    ).length
)

const criticalTasks = computed(() =>
    tasks.value.filter(
        task =>
            task.priority === 'critical' &&
            task.status !== 'done'
    ).length
)

const recentTasks = computed(() =>
    [...tasks.value]
        .sort(
            (a, b) =>
                new Date(b.created_at) -
                new Date(a.created_at)
        )
        .slice(0, 5)
)
</script>

<template>
    <CompContent header-title="Dashboard">

        <div class="space-y-6">

            <div class="p-6 border border-(--primary) bg-white/5">
                <h2 class="text-2xl font-bold">
                    Welcome Back 👋
                </h2>

                <div v-if="user" class="mt-2 text-slate-300">
                    <p>
                        {{ user.username }}
                    </p>

                    <p>
                        {{ user.email }}
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                <div class="p-5 border border-(--primary) bg-white/5">
                    <div class="text-slate-400">
                        Pending Tasks
                    </div>

                    <div class="text-3xl font-bold">
                        {{ pendingTasks }}
                    </div>
                </div>

                <div class="p-5 border border-(--primary) bg-white/5">
                    <div class="text-slate-400">
                        Completed Tasks
                    </div>

                    <div class="text-3xl font-bold">
                        {{ completedTasks }}
                    </div>
                </div>

                <div class="p-5 border border-(--primary) bg-white/5">
                    <div class="text-slate-400">
                        Critical Tasks
                    </div>

                    <div class="text-3xl font-bold">
                        {{ criticalTasks }}
                    </div>
                </div>

                <div class="p-5 border border-(--primary) bg-white/5">
                    <div class="text-slate-400">
                        Total Tasks
                    </div>

                    <div class="text-3xl font-bold">
                        {{ totalTasks }}
                    </div>
                </div>

            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">

                <div class="p-6 border border-(--primary) bg-white/5">
                    <h3 class="font-bold mb-4">
                        Current Time
                    </h3>

                    <div class="text-3xl font-mono">
                        {{ now.toLocaleTimeString() }}
                    </div>

                    <div class="mt-2 text-slate-400">
                        {{ now.toLocaleDateString() }}
                    </div>
                </div>

                <div class="p-6 border border-(--primary) bg-white/5">
                    <h3 class="font-bold mb-4">
                        Recent Tasks
                    </h3>

                    <div v-if="recentTasks.length === 0" class="text-slate-500">
                        No tasks available
                    </div>

                    <div v-for="task in recentTasks" :key="task.id" class="py-2 border-b border-white/10">
                        <div class="font-medium">
                            {{ task.title }}
                        </div>

                        <div class="text-sm text-slate-400">
                            {{ task.status }}
                            •
                            {{ task.priority }}
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </CompContent>
</template>