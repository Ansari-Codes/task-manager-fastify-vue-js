<script setup>
import DialogBox from '../../../Widgets/DialogBox.vue'
import Button from '../../../Widgets/Button.vue'

const props = defineProps({
    modelValue: Boolean,
    task: {
        type: Object,
        default: null
    },
    isEditable: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['update:modelValue', 'edit'])

function formatStatus(status) {
    const map = {
        'pending': 'Pending',
        'in_progress': 'In Progress',
        'done': 'Done',
        'cancelled': 'Cancelled',
        'completed': 'Completed',
        'trashed': 'In Trash'
    }
    return map[status] || status
}

function formatPriority(priority) {
    return priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : ''
}

// Status badge config — matches CompTask
// Status badge config
function getStatusConfig(status) {
    const configs = {
        'pending': { label: '⌛ Pending', bg: 'bg-yellow-500/20', text: 'text-yellow-500', border: 'border-yellow-500/30' },
        'in_progress': { label: '📈 In Progress', bg: 'bg-blue-500/20', text: 'text-blue-500', border: 'border-blue-500/30' },
        'done': { label: '✔ Done', bg: 'bg-green-500/20', text: 'text-green-500', border: 'border-green-500/30' },
        'completed': { label: '✔ Done', bg: 'bg-green-500/20', text: 'text-green-500', border: 'border-green-500/30' },
        'cancelled': { label: '❌ Cancelled', bg: 'bg-red-500/20', text: 'text-red-500', border: 'border-red-500/30' },
        'trashed': { label: '🗑️ In Trash', bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500/20' }
    }
    return configs[status] || { label: status, bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500/20' }
}

// Priority badge config — same color scheme as status
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

function formatDate(dateString) {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

function formatDeadline(dateString) {
    if (!dateString) return null
    const date = new Date(dateString)
    const now = new Date()
    const isOverdue = date < now
    return {
        text: date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }),
        isOverdue
    }
}
</script>

<template>
    <DialogBox :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" position="right"
        :minSize="400" :maxSize="500">
        <div v-if="task" class="flex flex-col gap-6">
            <!-- Header: Title + Badges -->
            <div class="flex justify-between items-start gap-3">
                <h2 class="text-base font-bold text-(--primary) uppercase tracking-wide leading-tight">{{ task.title }}</h2>
                <div class="flex gap-1.5 shrink-0">
                    <span class="text-[10px] px-1.5 py-0.5 border font-semibold uppercase tracking-wider"
                        :class="[getStatusConfig(task.status).bg, getStatusConfig(task.status).text, getStatusConfig(task.status).border]">
                        {{ getStatusConfig(task.status).label }}
                    </span>
                    <span class="text-[10px] px-1.5 py-0.5 border font-semibold uppercase tracking-wider"
                        :class="[getPriorityConfig(task.priority).bg, getPriorityConfig(task.priority).text, getPriorityConfig(task.priority).border]">
                        {{ getPriorityConfig(task.priority).label }}
                    </span>
                </div>
            </div>

            <!-- Description -->
            <div>
                <label class="text-(--primary) text-xs font-semibold uppercase tracking-wider">Description</label>
                <p class="text-white text-sm mt-1 leading-relaxed">
                    {{ task.description || 'No description provided.' }}
                </p>
            </div>

            <!-- Details Grid -->
            <div class="space-y-3">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="text-(--primary) text-xs font-semibold uppercase tracking-wider">Priority</label>
                        <p class="text-white text-sm mt-1 capitalize">{{ formatPriority(task.priority) }}</p>
                    </div>

                    <div>
                        <label class="text-(--primary) text-xs font-semibold uppercase tracking-wider">Deadline</label>
                        <p class="text-sm mt-1" :class="formatDeadline(task.deadline)?.isOverdue ? 'text-white' : 'text-white/70'">
                            <template v-if="formatDeadline(task.deadline)">
                                📅 {{ formatDeadline(task.deadline).text }}
                                <span v-if="formatDeadline(task.deadline).isOverdue" class="text-white font-bold ml-1">OVERDUE</span>
                            </template>
                            <template v-else>
                                📅 No deadline
                            </template>
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="text-(--primary) text-xs font-semibold uppercase tracking-wider">Created</label>
                        <p class="text-white text-sm mt-1">📅 {{ formatDate(task.created_at) }}</p>
                    </div>

                    <div>
                        <label class="text-(--primary) text-xs font-semibold uppercase tracking-wider">Last Updated</label>
                        <p class="text-white text-sm mt-1">📅 {{ formatDate(task.updated_at) }}</p>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 mt-2 pt-4 border-t border-(--primary)">
                <Button variant="secondary" class="flex-1" @click="$emit('update:modelValue', false)">
                    Close
                </Button>
                <Button v-if="isEditable" variant="primary" class="flex-1" @click="$emit('edit', task); $emit('update:modelValue', false)">
                    ✏ Edit
                </Button>
            </div>
        </div>
    </DialogBox>
</template>