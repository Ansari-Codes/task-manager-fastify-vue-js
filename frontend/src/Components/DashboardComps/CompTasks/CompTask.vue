<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Card from '../../../Widgets/Card.vue'

defineProps({
    task: {
        type: Object,
        required: true
    }
})

defineEmits(['edit', 'trash', 'view'])

const menuOpen = ref(false)
const cardRef = ref(null)

function toggleMenu(event) {
    event.stopPropagation()
    menuOpen.value = !menuOpen.value
}

function closeMenu() {
    menuOpen.value = false
}

function handleContextMenu(event) {
    event.preventDefault()
    menuOpen.value = true
}

// Click outside handler
function handleClickOutside(event) {
    if (cardRef.value && !cardRef.value.contains(event.target)) {
        closeMenu()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})

// Truncate description to first 80 chars
function truncateDesc(desc) {
    if (!desc) return 'No description provided.'
    return desc.length > 80 ? desc.slice(0, 80) + '...' : desc
}

// Status badge config
function getStatusConfig(status) {
    const configs = {
        'pending': { label: '⌚ Pending', bg: 'bg-yellow-500/20', text: 'text-yellow-500', border: 'border-yellow-500/30' },
        'in_progress': { label: '🏃‍♀️ In Progress', bg: 'bg-blue-500/20', text: 'text-blue-500', border: 'border-blue-500/30' },
        'done': { label: '✔ Done', bg: 'bg-green-500/20', text: 'text-green-500', border: 'border-green-500/30' },
        'completed': { label: '✔ Done', bg: 'bg-green-500/20', text: 'text-green-500', border: 'border-green-500/30' },
        'cancelled': { label: '❌ Cancelled', bg: 'bg-red-500/20', text: 'text-red-500', border: 'border-red-500/30' },
        'trashed': { label: 'Trashed', bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500/20' }
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

// Format deadline
function formatDeadline(deadline) {
    if (!deadline) return null
    const date = new Date(deadline)
    const now = new Date()
    const isOverdue = date < now
    return {
        text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isOverdue
    }
}
</script>

<template>
    <div ref="cardRef" class="relative">
        <Card 
            class="border border-(--primary)! bg-transparent! hover:bg-(--primary)/5! transition-colors duration-150 rounded-none"
            @contextmenu="handleContextMenu"
            @mouseleave="closeMenu"
        >
            <!-- Three-dot menu toggle -->
            <div class="absolute top-2 right-2 z-10">
                <button 
                    class="text-(--secondary)/60 hover:text-(--primary) p-1 transition-colors"
                    @click.stop="toggleMenu"
                >
                    ⋮
                </button>

                <!-- Dropdown menu -->
                <div 
                    v-if="menuOpen" 
                    class="absolute right-0 mt-1 w-32 bg-black border border-(--primary)/40 shadow-lg overflow-hidden z-20"
                >
                    <button 
                        class="w-full px-3 py-2 text-left text-sm text-white hover:bg-(--primary)/20 hover:text-(--primary) transition-colors flex items-center gap-2"
                        @click="$emit('view', task); closeMenu()"
                    >
                        👁 View
                    </button>
                    <button 
                        class="w-full px-3 py-2 text-left text-sm text-white hover:bg-(--primary)/20 hover:text-(--primary) transition-colors flex items-center gap-2"
                        @click="$emit('edit', task); closeMenu()"
                    >
                        ✏ Edit
                    </button>
                    <div class="border-t border-(--primary)/20"></div>
                    <button 
                        class="w-full px-3 py-2 text-left text-sm text-white hover:bg-(--secondary)/20 hover:text-(--secondary) transition-colors flex items-center gap-2"
                        @click="$emit('trash', task.id); closeMenu()"
                    >
                        🗑 Trash
                    </button>
                </div>
            </div>

            <!-- Header: Title + Badges inline -->
            <template #header>
                <div class="pr-6">
                    <div class="flex items-center gap-2 flex-wrap mb-2">
                        <h3 class="text-sm font-bold text-(--primary) uppercase tracking-wide">{{ task.title }}</h3>
                        <span 
                            class="text-[10px] px-1.5 py-0.5 border font-semibold uppercase tracking-wider"
                            :class="[getStatusConfig(task.status).bg, getStatusConfig(task.status).text, getStatusConfig(task.status).border]"
                        >
                            {{ getStatusConfig(task.status).label }}
                        </span>
                        <span 
                            class="text-[10px] px-1.5 py-0.5 border font-semibold uppercase tracking-wider"
                            :class="[getPriorityConfig(task.priority).bg, getPriorityConfig(task.priority).text, getPriorityConfig(task.priority).border]"
                        >
                            {{ getPriorityConfig(task.priority).label }}
                        </span>
                    </div>
                </div>
            </template>

            <!-- Body: Description -->
            <div class="flex-1">
                <p class="text-white text-sm leading-relaxed">
                    {{ truncateDesc(task.description) }}
                </p>
            </div>

            <!-- Footer: Deadline -->
            <template #footer>
                <div class="mt-3 pt-2 border-t border-(--secondary) flex items-center gap-1.5 text-xs">
                    <template v-if="formatDeadline(task.deadline)">
                        <span :class="formatDeadline(task.deadline).isOverdue ? 'text-white' : 'text-white/50'">
                            📅 {{ formatDeadline(task.deadline).text }}
                        </span>
                        <span v-if="formatDeadline(task.deadline).isOverdue" class="text-white font-bold">
                            OVERDUE
                        </span>
                    </template>
                    <template v-else>
                        <span class="text-white">📅 No deadline</span>
                    </template>
                </div>
            </template>
        </Card>
    </div>
</template>