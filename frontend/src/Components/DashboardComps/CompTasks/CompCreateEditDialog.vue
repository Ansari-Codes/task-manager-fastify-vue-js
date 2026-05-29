<script setup>
import { ref, watch } from 'vue'
import { TaskData } from '../../../DataClasses/dataTasks.js'
import { createTask, updateTask } from '../../../Functions/funTasks.js'
import DialogBox from '../../../Widgets/DialogBox.vue'
import Input from '../../../Widgets/Input.vue'
import Select from '../../../Widgets/Select.vue'
import Button from '../../../Widgets/Button.vue'

const props = defineProps({
    modelValue: Boolean,
    isEditMode: {
        type: Boolean,
        default: false
    },
    task: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['update:modelValue', 'save'])

// Initialize formData from TaskData defaults
const formData = ref(new TaskData())

const isSubmitting = ref(false)
const apiError = ref(null)
const apiSuccess = ref(null)

const priorityOptions = [
    { value: 'optional', label: 'Optional' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
]

const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled'}
]

// Frontend -> Backend
const statusMap = {
    'pending': 'pending',
    'in-progress': 'in_progress',
    'completed': 'done',
    'cancelled': 'cancelled'
}

// Backend -> Frontend
const reverseStatusMap = {
    'pending': 'pending',
    'in_progress': 'in-progress',
    'done': 'completed',
    'cancelled': 'completed'
}
function resetForm() {
    formData.value = new TaskData()
}

function populateFromTask(task) {
    formData.value.id = task.id
    formData.value.title = task.title || ''
    formData.value.description = task.description || ''
    formData.value.priority = task.priority || 'medium'
    formData.value.status = reverseStatusMap[task.status] || task.status || 'pending'
    formData.value.deadline = task.deadline || null
    formData.value.created_at = task.created_at || null
    formData.value.updated_at = task.updated_at || null
    formData.value.user_id = task.user_id || null
}

watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
        apiError.value = null
        apiSuccess.value = null
        isSubmitting.value = false

        if (props.isEditMode && props.task) {
            populateFromTask(props.task)
        } else {
            resetForm()
        }
    }
})

async function handleSubmit() {
    apiError.value = null
    apiSuccess.value = null

    // Map frontend status to backend before validation
    const taskData = new TaskData()
    taskData.id = formData.value.id
    taskData.title = formData.value.title
    taskData.description = formData.value.description
    taskData.priority = formData.value.priority
    taskData.status = statusMap[formData.value.status] || formData.value.status
    taskData.deadline = formData.value.deadline || null
    taskData.user_id = formData.value.user_id

    const validation = taskData.isValid()

    if (!validation.success) {
        const errorMessages = []
        for (const [field, messages] of Object.entries(validation.errors)) {
            if (messages.length > 0) {
                errorMessages.push(...messages)
            }
        }
        apiError.value = errorMessages.join('\n')
        return
    }

    isSubmitting.value = true

    try {
        const payload = taskData.toObject()
        let response

        if (props.isEditMode) {
            // Strip null/unnecessary fields for update
            const { id, created_at, updated_at, user_id, ...updatePayload } = payload
            response = await updateTask(formData.value.id, updatePayload)
        } else {
            // Strip null fields for create
            const { id, created_at, updated_at, user_id, ...createPayload } = payload
            response = await createTask(createPayload)
        }

        console.log(response)

        if (!response.success) {
            apiError.value = response.error || `Failed to ${props.isEditMode ? 'update' : 'create'} task`
            return
        }

        apiSuccess.value = props.isEditMode
            ? 'Task updated successfully!'
            : 'Task created successfully!'

        // Return the full task data including the ID from response
        const savedTask = response.data?.task || {
            ...payload,
            id: response.data?.id || formData.value.id
        }
        emit('save', savedTask)

        setTimeout(() => {
            emit('update:modelValue', false)
        }, 1500)

    } catch (error) {
        apiError.value = error.message || 'An unexpected error occurred'
    } finally {
        isSubmitting.value = false
    }
}
</script>

<<template>
    <DialogBox :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" position="right"
        :minSize="300" :maxSize="600">
        <div class="flex flex-col h-full">
            <h2 class="text-xl font-bold mb-6 text-slate-100">
                {{ isEditMode ? 'Edit Task' : 'Create New Task' }}
            </h2>

            <div v-if="apiError" class="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm whitespace-pre-line">
                {{ apiError }}
            </div>

            <div v-if="apiSuccess" class="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded text-green-200 text-sm">
                {{ apiSuccess }}
            </div>

            <form @submit.prevent="handleSubmit" class="flex flex-col gap-5 flex-1">
                <Input id="task-title" label="Title *" v-model="formData.title" placeholder="e.g., Update Landing Page"
                    required :disabled="isSubmitting" />

                <div class="flex flex-col gap-1">
                    <label class="text-slate-300 text-sm font-semibold">Description</label>
                    <textarea v-model="formData.description" rows="4"
                        class="w-full px-3 py-2 bg-transparent text-slate-100 transition-all duration-150 border border-white/40 focus:border-primary outline-none"
                        placeholder="Add details here..." :disabled="isSubmitting"></textarea>
                </div>

                <div class="flex gap-4">
                    <Select id="task-priority" label="Priority" v-model="formData.priority" :options="priorityOptions"
                        :disabled="isSubmitting" />
                    <Select id="task-status" label="Status" v-model="formData.status" :options="statusOptions"
                        :disabled="isSubmitting" />
                </div>

                <Input id="task-deadline" type="date" label="Deadline" v-model="formData.deadline" :disabled="isSubmitting" />

                <div class="mt-auto pt-6 flex gap-4">
                    <Button variant="secondary" class="flex-1"
                        @click="$emit('update:modelValue', false)" :disabled="isSubmitting">Cancel</Button>
                    <Button variant="primary" type="submit" class="flex-1" :disabled="!formData.title || isSubmitting">
                        {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Create Task') }}
                    </Button>
                </div>
            </form>
        </div>
    </DialogBox>
</template>