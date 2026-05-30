import { callAPI } from './funApi'

export async function getUserSettings() {
    return await callAPI('GET', 'settings/me')
}

export async function updateUsername(username) {
    return await callAPI('PUT', 'settings/username', { username })
}

export async function updateEmail(email) {
    return await callAPI('PUT', 'settings/email', { email })
}

export async function updatePassword(currentPassword, newPassword) {
    return await callAPI('PUT', 'settings/password', { currentPassword, newPassword })
}

export async function deleteAccount(username, email, password) {
    return await callAPI('DELETE', 'settings/account', { username, email, password })
}