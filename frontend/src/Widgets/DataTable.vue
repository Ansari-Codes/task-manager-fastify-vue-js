<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Array,
        default: null
    },
    emptyText: {
        type: String,
        default: 'No data available'
    }
})

const emit = defineEmits(['rowClick'])
const slots = useSlots()

// Auto-detect columns from all objects (union of all keys)
const detectedColumns = computed(() => {
    if (props.columns) return props.columns
    
    const allKeys = new Set()
    props.data.forEach(row => {
        if (row && typeof row === 'object') {
            Object.keys(row).forEach(key => allKeys.add(key))
        }
    })
    return Array.from(allKeys)
})
</script>

<template>
    <div class="w-full overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="border-b border-white/10">
                    <th v-for="col in detectedColumns" :key="col" 
                        class="px-4 py-3 text-sm font-semibold text-slate-300 uppercase tracking-wider">
                        {{ col }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in data" :key="index" 
                    @click="emit('rowClick', row)"
                    class="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                    <td v-for="col in detectedColumns" :key="col" class="px-4 py-3 text-sm text-slate-200">
                        <slot :name="col" :row="row" :value="row[col]" :index="index">
                            {{ row[col] !== undefined && row[col] !== null ? row[col] : '—' }}
                        </slot>
                    </td>
                </tr>
                <tr v-if="data.length === 0">
                    <td :colspan="detectedColumns.length" class="px-4 py-12 text-center text-slate-400">
                        {{ emptyText }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>