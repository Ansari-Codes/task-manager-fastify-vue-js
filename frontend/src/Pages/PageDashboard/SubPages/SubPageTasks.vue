<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CompCreateEditDialog from '../../../Components/DashboardComps/CompTasks/CompCreateEditDialog.vue'
import CompQueryDialog from '../../../Components/DashboardComps/CompTasks/CompQueryDialog.vue'
import CompTask from '../../../Components/DashboardComps/CompTasks/CompTask.vue'
import CompViewTask from '../../../Components/DashboardComps/CompTasks/CompViewTask.vue'
import CompContent from '../../../Components/DashboardComps/CompContent.vue'
import Button from '../../../Widgets/Button.vue'
import { getTasks, trashTask, filterTasks } from '../../../Functions/funTasks.js'

const route = useRoute()
const router = useRouter()

const dialogVisible = ref(false)
const queryDialogVisible = ref(false)
const isEditMode = ref(false)
const currentTask = ref(null)
const viewDialogValue = ref(false)
const tasks = reactive([])
const viewingTask = ref(null)

onMounted(async () => {
    // Apply filters from URL query params on load
    const urlFilters = { ...route.query }
    if (Object.keys(urlFilters).length > 0) {
        await applyFilters(urlFilters)
    } else {
        await loadTasks()
    }
})

async function loadTasks() {
    const response = await getTasks()
    if (response.success && response.data?.tasks) {
        tasks.length = 0
        tasks.push(...response.data.tasks)
    }
}

const visibleTasks = computed(() => tasks.filter(t => t.status !== 'trashed'))
const trashedCount = computed(() => tasks.filter(t => t.status === 'trashed').length)
const hasActiveFilters = computed(() => Object.keys(route.query).length > 0)

function openCreateDialog() {
    isEditMode.value = false
    currentTask.value = null
    dialogVisible.value = true
}

function openEditDialog(task) {
    isEditMode.value = true
    currentTask.value = task
    dialogVisible.value = true
}

function openQueryDialog() {
    queryDialogVisible.value = true
}

function handleTaskSaved(taskData) {
    if (isEditMode.value) {
        const index = tasks.findIndex(t => t.id === taskData.id)
        if (index !== -1) {
            tasks[index] = taskData
        }
    } else {
        tasks.unshift(taskData)
    }
}

function handleEditTask(task) {
    openEditDialog(task)
}

async function handleTrashTask(taskId) {
    const response = await trashTask(taskId)
    if (response.success) {
        const index = tasks.findIndex(t => t.id === taskId)
        if (index !== -1) {
            tasks.splice(index, 1)
        }
    }
}

function handleViewTask(task) {
    viewingTask.value = task
    viewDialogValue.value = true
}

function handleEditFromView(task) {
    viewDialogValue.value = false
    openEditDialog(task)
}

async function handleFilter(filters) {
    // Update URL query params
    await router.replace({ query: filters })
    await applyFilters(filters)
}

async function applyFilters(filters) {
    const response = await filterTasks(filters)
    if (response.success && response.data?.tasks) {
        tasks.length = 0
        tasks.push(...response.data.tasks)
    }
}

async function clearFilters() {
    await router.replace({ query: {} })
    await loadTasks()
}
</script>

<template>
    <CompContent>
        <template #header>
            <div class="flex w-full justify-between items-center">
                <h1 class="text-2xl font-bold text-slate-100">My Tasks</h1>
                <div class="flex gap-3">
                    <Button v-if="hasActiveFilters" variant="ghost" @click="clearFilters">
                        Clear Filters
                    </Button>
                    <Button variant="secondary" @click="openQueryDialog">
                        Filter
                    </Button>
                    <Button variant="primary" @click="openCreateDialog">
                        + New
                    </Button>
                </div>
            </div>
        </template>

        <!-- Tasks Grid -->
        <div v-if="visibleTasks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CompTask v-for="task in visibleTasks" :key="task.id" :task="task" @edit="handleEditTask"
                @trash="handleTrashTask" @view="handleViewTask" />
        </div>

        <!-- Empty State: No tasks at all -->
        <div v-else-if="tasks.length === 0" class="flex flex-col items-center justify-center py-20 text-slate-400">
            <p class="text-lg mb-2">No tasks yet</p>
            <p class="text-sm">Click "New Task" to create your first task</p>
        </div>

        <!-- Empty State: All tasks are trashed -->
        <div v-else class="flex flex-col items-center justify-center py-20 text-slate-400">
            <p class="text-lg mb-2">No active tasks</p>
            <p class="text-sm mb-4">
                {{ trashedCount }} task{{ trashedCount > 1 ? 's' : '' }} in
                <router-link to="/dashboard/trash" class="text-primary hover:underline">
                    Trash
                </router-link>
            </p>
            <Button variant="secondary" @click="openCreateDialog">
                Create New Task
            </Button>
        </div>

        <!-- Single Create/Edit Dialog -->
        <CompCreateEditDialog v-model="dialogVisible" :is-edit-mode="isEditMode" :task="currentTask"
            @save="handleTaskSaved" />

        <!-- Query/Filter Dialog -->
        <CompQueryDialog v-model="queryDialogVisible" @filter="handleFilter" />

        <!-- View Dialog -->
        <CompViewTask v-model="viewDialogValue" :task="viewingTask" @edit="handleEditFromView" />
    </CompContent>
</template>