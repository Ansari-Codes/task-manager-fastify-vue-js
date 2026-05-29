<script setup>
import { ref, watch } from 'vue'
import DialogBox from '../../../Widgets/DialogBox.vue'
import Input from '../../../Widgets/Input.vue'
import Select from '../../../Widgets/Select.vue'
import Button from '../../../Widgets/Button.vue'

const props = defineProps({
    modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'filter'])

const filters = ref({
    titleq: '',
    descq: '',
    status: '',
    priority: '',
    desc: 'false'
})

const statusOptions = [
    { value: '', label: 'Any' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
    { value: 'cancelled', label: 'Cancelled' }
]

const priorityOptions = [
    { value: '', label: 'Any' },
    { value: 'optional', label: 'Optional' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
]

const orderOptions = [
    { value: 'false', label: 'Newest First' },
    { value: 'true', label: 'Oldest First' }
]

function resetFilters() {
    filters.value = {
        titleq: '',
        descq: '',
        status: '',
        priority: '',
        desc: 'false'
    }
}

function applyFilters() {
    const cleanFilters = {}
    for (const [key, value] of Object.entries(filters.value)) {
        if (value !== '' && value !== null && value !== undefined) {
            cleanFilters[key] = value
        }
    }
    emit('filter', cleanFilters)
    emit('update:modelValue', false)
}

watch(() => props.modelValue, (isOpen) => {
    if (!isOpen) {
        // Optional: keep values or reset on close
    }
})
</script>

<template>
    <DialogBox :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" position="right">
        <div class="flex flex-col h-full">
            <h2 class="text-xl font-bold mb-6 text-slate-100">Filter Tasks</h2>

            <div class="flex flex-col gap-4 flex-1">
                <!-- Search -->
                <Input id="filter-title" label="Title Contains" v-model="filters.titleq"
                    placeholder="Search by title..." />
                <Input id="filter-desc" label="Description Contains" v-model="filters.descq"
                    placeholder="Search in description..." />

                <!-- Filters -->
                <div class="flex gap-3">
                    <Select id="filter-status" label="Status" v-model="filters.status" :options="statusOptions" />
                    <Select id="filter-priority" label="Priority" v-model="filters.priority"
                        :options="priorityOptions" />
                </div>

                <!-- Order -->
                <Select id="filter-desc" label="Order" v-model="filters.desc" :options="orderOptions" />
            </div>

            <!-- Actions -->
            <div class="mt-auto pt-6 flex gap-3 border-t border-white/10">
                <Button variant="ghost" class="flex-1" @click="resetFilters">
                    Reset
                </Button>
                <Button variant="secondary" class="flex-1" @click="$emit('update:modelValue', false)">
                    Cancel
                </Button>
                <Button variant="primary" class="flex-1" @click="applyFilters">
                    Apply
                </Button>
            </div>
        </div>
    </DialogBox>
</template>