<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CompContent from '../../../Components/DashboardComps/CompContent.vue'
import Input from '../../../Widgets/Input.vue'
import Button from '../../../Widgets/Button.vue'
import DialogBox from '../../../Widgets/DialogBox.vue'
import {
    getUserSettings,
    updateUsername,
    updateEmail,
    updatePassword,
    deleteAccount
} from '../../../Functions/funUserSettings'
import { funLogout } from '../../../Functions/funAuth'

const router = useRouter()

const user = ref(null)
const loading = ref(true)
const message = ref('')
const error = ref('')

// Form states
const usernameForm = reactive({ value: '', submitting: false })
const emailForm = reactive({ value: '', submitting: false })
const passwordForm = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    submitting: false
})

// Delete account dialog
const deleteDialogVisible = ref(false)
const deleteForm = reactive({
    username: '',
    email: '',
    password: '',
    submitting: false
})

onMounted(async () => {
    await loadUser()
})

async function loadUser() {
    loading.value = true
    const resp = await getUserSettings()
    const res = resp.data
    if (res.success) {
        user.value = res.user
        usernameForm.value = res.user.username
        emailForm.value = res.user.email
    }
    loading.value = false
}

function showMessage(msg, isError = false) {
    message.value = msg
    error.value = isError ? msg : ''
    setTimeout(() => {
        message.value = ''
        error.value = ''
    }, 3000)
}

async function handleUpdateUsername() {
    if (!usernameForm.value.trim()) return
    usernameForm.submitting = true
    const res = await updateUsername(usernameForm.value)
    usernameForm.submitting = false
    if (res.success) {
        user.value = res.user
        showMessage('Username updated successfully')
    } else {
        showMessage(res.error || 'Failed to update username', true)
    }
}

async function handleUpdateEmail() {
    if (!emailForm.value.trim()) return
    emailForm.submitting = true
    const res = await updateEmail(emailForm.value)
    emailForm.submitting = false
    if (res.success) {
        user.value = res.user
        showMessage('Email updated successfully')
    } else {
        showMessage(res.error || 'Failed to update email', true)
    }
}

async function handleUpdatePassword() {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        showMessage('New passwords do not match', true)
        return
    }
    if (passwordForm.newPassword.length < 6) {
        showMessage('Password must be at least 6 characters', true)
        return
    }

    passwordForm.submitting = true
    const res = await updatePassword(passwordForm.currentPassword, passwordForm.newPassword)
    passwordForm.submitting = false

    if (res.success) {
        passwordForm.currentPassword = ''
        passwordForm.newPassword = ''
        passwordForm.confirmPassword = ''
        showMessage('Password updated successfully')
    } else {
        showMessage(res.error || 'Failed to update password', true)
    }
}

async function handleDeleteAccount() {
    deleteForm.submitting = true
    const res = await deleteAccount(deleteForm.username, deleteForm.email, deleteForm.password)
    deleteForm.submitting = false

    if (res.success) {
        await funLogout()
        router.push('/login')
    } else {
        showMessage(res.error || 'Failed to delete account', true)
        deleteDialogVisible.value = false
    }
}
</script>

<template>
    <CompContent>
        <template #header>
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-bold text-slate-100">Settings</h1>
            </div>
        </template>

        <div v-if="loading" class="text-center text-slate-400 py-20">Loading...</div>

        <div v-else class="max-w-2xl space-y-8">
            <!-- Alert message -->
            <div v-if="message" :class="[
                'p-4 border rounded',
                error ? 'border-red-500/50 bg-red-500/10 text-red-200' : 'border-green-500/50 bg-green-500/10 text-green-200'
            ]">
                {{ message }}
            </div>

            <!-- Profile Section -->
            <div class="p-6 border border-(--primary) bg-white/5">
                <h2 class="text-lg font-bold text-(--primary) mb-4 uppercase tracking-wider">Profile</h2>
                
                <div class="space-y-4">
                    <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                        <Input id="settings-username" label="Username" v-model="usernameForm.value" 
                            class="flex-1" />
                        <Button variant="primary" :disabled="usernameForm.submitting || !usernameForm.value"
                            @click="handleUpdateUsername">
                            {{ usernameForm.submitting ? 'Saving...' : 'Update' }}
                        </Button>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                        <Input id="settings-email" label="Email" v-model="emailForm.value" type="email"
                            class="flex-1" />
                        <Button variant="primary" :disabled="emailForm.submitting || !emailForm.value"
                            @click="handleUpdateEmail">
                            {{ emailForm.submitting ? 'Saving...' : 'Update' }}
                        </Button>
                    </div>
                </div>
            </div>

            <!-- Password Section -->
            <div class="p-6 border border-(--primary) bg-white/5">
                <h2 class="text-lg font-bold text-(--primary) mb-4 uppercase tracking-wider">Change Password</h2>
                
                <div class="space-y-4">
                    <Input id="current-password" label="Current Password" type="password"
                        v-model="passwordForm.currentPassword" />
                    <Input id="new-password" label="New Password" type="password"
                        v-model="passwordForm.newPassword" />
                    <Input id="confirm-password" label="Confirm New Password" type="password"
                        v-model="passwordForm.confirmPassword" />
                    
                    <Button variant="secondary" class="w-full sm:w-auto"
                        :disabled="passwordForm.submitting || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword"
                        @click="handleUpdatePassword">
                        {{ passwordForm.submitting ? 'Updating...' : 'Change Password' }}
                    </Button>
                </div>
            </div>

            <!-- Danger Zone -->
            <div class="p-6 border border-red-500/30 bg-red-500/5">
                <h2 class="text-lg font-bold text-red-500 mb-4 uppercase tracking-wider">Danger Zone</h2>
                <p class="text-slate-400 text-sm mb-4">
                    Once you delete your account, there is no going back. All your tasks and data will be permanently removed.
                </p>
                <Button variant="danger" @click="deleteDialogVisible = true">
                    Delete Account Permanently
                </Button>
            </div>
        </div>

        <!-- Delete Account Confirmation Dialog -->
        <DialogBox v-model="deleteDialogVisible" position="center" :minSize="400" :maxSize="500">
            <div class="flex flex-col h-full">
                <h2 class="text-xl font-bold mb-2 text-red-500">Delete Account</h2>
                <p class="text-slate-400 text-sm mb-6">
                    This action cannot be undone. Please enter your credentials to confirm.
                </p>

                <div class="flex flex-col gap-4 flex-1">
                    <Input id="delete-username" label="Username" v-model="deleteForm.username" />
                    <Input id="delete-email" label="Email" type="email" v-model="deleteForm.email" />
                    <Input id="delete-password" label="Password" type="password" v-model="deleteForm.password" />
                </div>

                <div class="mt-auto pt-6 flex gap-3">
                    <Button variant="ghost" class="flex-1" @click="deleteDialogVisible = false">
                        Cancel
                    </Button>
                    <Button variant="danger" class="flex-1"
                        :disabled="deleteForm.submitting || !deleteForm.username || !deleteForm.email || !deleteForm.password"
                        @click="handleDeleteAccount">
                        {{ deleteForm.submitting ? 'Deleting...' : 'Delete Forever' }}
                    </Button>
                </div>
            </div>
        </DialogBox>
    </CompContent>
</template>