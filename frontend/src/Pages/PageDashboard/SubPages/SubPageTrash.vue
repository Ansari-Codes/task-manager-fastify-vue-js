<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import CompViewTask from '../../../Components/DashboardComps/CompTasks/CompViewTask.vue'
import CompContent from '../../../Components/DashboardComps/CompContent.vue'
import Input from '../../../Widgets/Input.vue'
import Select from '../../../Widgets/Select.vue'
import Button from '../../../Widgets/Button.vue'
import DataTable from '../../../Widgets/DataTable.vue'
import { getTasks, updateTask, deleteTask } from '../../../Functions/funTasks.js'
import { TaskData } from '../../../DataClasses/dataTasks.js'

const viewDialogValue = ref(false)
const tasks = reactive([])
const viewingTask = ref(null)

const searchQuery = ref('')
const priorityFilter = ref('')

const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'optional', label: 'Optional' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
]

onMounted(async () => {
    await loadTasks()
})

async function loadTasks() {
    const response = await getTasks()
    if (response.success && response.data?.tasks) {
        tasks.length = 0
        tasks.push(...response.data.tasks)
    }
}

const trashedTasks = computed(() => tasks.filter(t => t.status === 'trashed'))

const visibleTasks = computed(() => {
    let result = trashedTasks.value
    if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase()
        result = result.filter(t => t.title?.toLowerCase().includes(q))
    }
    if (priorityFilter.value) {
        result = result.filter(t => t.priority === priorityFilter.value)
    }
    return result
})

function handleViewTask(task) {
    viewingTask.value = task
    viewDialogValue.value = true
}

async function handleRestore(taskId) {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    const taskData = new TaskData()
    taskData.id = task.id
    taskData.title = task.title
    taskData.description = task.description
    taskData.priority = task.priority
    taskData.status = 'pending'
    taskData.deadline = task.deadline || null
    taskData.user_id = task.user_id

    const validation = taskData.isValid()
    if (!validation.success) {
        console.error('Validation failed:', validation.errors)
        return
    }

    const payload = taskData.toObject()
    const { id, created_at, updated_at, user_id, ...updatePayload } = payload

    const response = await updateTask(taskId, updatePayload)
    if (response.success) {
        const index = tasks.findIndex(t => t.id === taskId)
        if (index !== -1) tasks.splice(index, 1)
    }
}

async function handleDelete(taskId) {
    const response = await deleteTask(taskId)
    if (response.success) {
        const index = tasks.findIndex(t => t.id === taskId)
        if (index !== -1) tasks.splice(index, 1)
    }
}

function clearSearch() {
    searchQuery.value = ''
    priorityFilter.value = ''
}

function getPriorityConfig(priority) {
    const configs = {
        'optional': { label: '🛌 Optional', bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500/20' },
        'low': { label: '🌿 Low', bg: 'bg-green-500/15', text: 'text-green-500', border: 'border-green-500/25' },
        'medium': { label: '⚠ Medium', bg: 'bg-blue-500/15', text: 'text-blue-500', border: 'border-blue-500/25' },
        'high': { label: '🔴 High', bg: 'bg-red-500/20', text: 'text-red-500', border: 'border-red-500/30' },
        'critical': { label: '💀 Critical', bg: 'bg-red-500', text: 'text-red-100', border: 'border-red-500/30' }
    }
    return configs[priority] || { label: priority, bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500/20' }
}

function formatDate(dateStr) {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

function titlize(str) {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<template>
    <CompContent>
        <template #header>
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold text-slate-100">Trash</h1>
                <div class="flex gap-3 items-center">
                    <Input id="trash-search" v-model="searchQuery" placeholder="Search titles..." class="w-64" />
                    <Select id="trash-priority" v-model="priorityFilter" :options="priorityOptions" class="w-40" />
                    <Button v-if="searchQuery || priorityFilter" variant="ghost" @click="clearSearch">
                        Clear
                    </Button>
                </div>
            </div>
        </template>

        <div v-if="visibleTasks.length > 0" class="mt-4">
            <DataTable :data="visibleTasks" :columns="['title', 'priority', 'updated_at', 'actions']"
                @rowClick="handleViewTask">
                <template #title="{ row }">
                    <span class="font-medium text-slate-100">{{ titlize(row.title) }}</span>
                </template>
                <template #priority="{ row }">
                    <span class="text-[10px] px-1.5 py-0.5 border font-semibold uppercase tracking-wider"
                        :class="[getPriorityConfig(row.priority).bg, getPriorityConfig(row.priority).text, getPriorityConfig(row.priority).border]">
                        {{ getPriorityConfig(row.priority).label }}
                    </span>
                </template>
                <template #updated_at="{ row }">
                    <span class="text-slate-300 text-sm">{{ formatDate(row.updated_at) }}</span>
                </template>
                <template #actions="{ row }">
                    <div class="flex gap-2">
                        <Button variant="ghost" size="sm" @click.stop="handleRestore(row.id)">Restore</Button>
                        <Button variant="danger" size="sm" @click.stop="handleDelete(row.id)">Delete</Button>
                    </div>
                </template>
            </DataTable>
        </div>

        <div v-else class="flex flex-col items-center justify-center py-20 text-slate-400">
            <p class="text-lg mb-2">No trashed tasks</p>
            <p class="text-sm">Trashed tasks will appear here</p>
        </div>

        <CompViewTask :is-editable="false" v-model="viewDialogValue" :task="viewingTask" />
    </CompContent>
</template>