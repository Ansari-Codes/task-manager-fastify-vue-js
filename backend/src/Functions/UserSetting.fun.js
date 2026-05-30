const bcrypt = require('bcrypt')
const UserDB = require('../DataBase/User.db')
const TaskDB = require('../DataBase/Tasks.db')
const { ValidationError } = require('../core')

function validateUsername(username) {
    if (!username || typeof username !== 'string') {
        throw new ValidationError("Username is required")
    }
    const trimmed = username.trim().toLowerCase()
    if (trimmed.length < 3) {
        throw new ValidationError("Username must be at least 3 characters")
    }
    if (trimmed.length > 50) {
        throw new ValidationError("Username must not exceed 50 characters")
    }
    if (!/^[a-z0-9_]+$/.test(trimmed)) {
        throw new ValidationError("Username can only contain lowercase letters, numbers, and underscores")
    }
    return trimmed
}

function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        throw new ValidationError("Email is required")
    }
    const trimmed = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmed)) {
        throw new ValidationError("Invalid email format")
    }
    if (trimmed.length > 255) {
        throw new ValidationError("Email must not exceed 255 characters")
    }
    return trimmed
}

function validatePassword(password) {
    if (!password || typeof password !== 'string') {
        throw new ValidationError("Password is required")
    }
    if (password.length < 6) {
        throw new ValidationError("Password must be at least 6 characters")
    }
    if (password.length > 255) {
        throw new ValidationError("Password must not exceed 255 characters")
    }
    return password
}

// Helper: ensure user_id is integer
function toInt(value) {
    const num = parseInt(value, 10)
    if (isNaN(num) || num < 1) {
        throw new ValidationError("Invalid user ID")
    }
    return num
}

async function getUserSettings(user_id) {
    const id = toInt(user_id)
    const user = UserDB.getUser(id)
    if (!user) {
        throw new ValidationError("User not found")
    }
    return user
}

async function updateUsername(user_id, newUsername) {
    const id = toInt(user_id)
    const validatedUsername = validateUsername(newUsername)

    const existing = UserDB.getRawUser(validatedUsername, 'username')
    if (existing && existing.id != id) {
        throw new ValidationError("Username already taken")
    }

    const user = UserDB.getRawUser(id)
    if (!user) {
        throw new ValidationError("User not found")
    }

    user.username = validatedUsername
    return UserDB.updateUser(user)
}

async function updateEmail(user_id, newEmail) {
    const id = toInt(user_id)
    const validatedEmail = validateEmail(newEmail)

    const existing = UserDB.getUser(validatedEmail, 'email')
    if (existing && existing.id != id) {
        throw new ValidationError("Email already in use")
    }

    const user = UserDB.getRawUser(id)
    if (!user) {
        throw new ValidationError("User not found")
    }

    user.email = validatedEmail
    return UserDB.updateUser(user)
}

async function updatePassword(user_id, currentPassword, newPassword) {
    const id = toInt(user_id)
    const validatedNewPassword = validatePassword(newPassword)

    const dbRow = UserDB.getRawUser(id)
    if (!dbRow) {
        throw new ValidationError("User not found")
    }
    console.log(currentPassword, dbRow)
    const valid = await bcrypt.compare(currentPassword, dbRow.password)
    if (!valid) {
        throw new ValidationError("Current password is incorrect")
    }

    const hashedPassword = await bcrypt.hash(validatedNewPassword, 10)

    const user = UserDB.getRawUser(id)
    user.password = hashedPassword
    return UserDB.updateUser(user)
}

async function deleteAccount(user_id, username, email, password) {
    const id = toInt(user_id)
    const dbRow = UserDB.getRawUser(id)
    if (!dbRow) {
        throw new ValidationError("User not found")
    }

    // Verify credentials
    if (dbRow.username !== username.trim().toLowerCase()) {
        throw new ValidationError("Username does not match")
    }

    if (dbRow.email !== email.trim().toLowerCase()) {
        throw new ValidationError("Email does not match")
    }

    const valid = await bcrypt.compare(password, dbRow.password)
    if (!valid) {
        throw new ValidationError("Password is incorrect")
    }

    // Delete all user tasks first
    const tasks = TaskDB.getTasksByUser(id)
    for (const task of tasks) {
        TaskDB.deleteTask(task.id)
    }

    // Delete user
    return UserDB.deleteUser(id)
}

module.exports = {
    getUserSettings,
    updateUsername,
    updateEmail,
    updatePassword,
    deleteAccount
}