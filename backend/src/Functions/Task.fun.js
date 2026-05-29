const TaskDB = require('../Database/Tasks.db')
const { ValidationError } = require('../core')
const { Task } = require('../Classes/Tasks.class')
const { db, tables } = require('../DataBase/init.db')

const VALID_PRIORITIES = ['optional', 'low', 'medium', 'high', 'critical']
const VALID_STATUSES = ['pending', 'in_progress', 'done', 'cancelled']

function validateTitle(title) {
    if (!title || typeof title !== 'string') {
        throw new ValidationError("Title is required")
    }
    const trimmed = title.trim()
    if (trimmed.length < 3) {
        throw new ValidationError("Title must be at least 3 characters")
    }
    if (trimmed.length > 255) {
        throw new ValidationError("Title must not exceed 255 characters")
    }
    return trimmed
}

function validatePriority(priority) {
    if (priority === undefined || priority === null || priority === '') {
        return 'medium'
    }
    if (!VALID_PRIORITIES.includes(priority)) {
        throw new ValidationError(`Invalid priority. Must be one of: ${VALID_PRIORITIES.join(', ')}`)
    }
    return priority
}

function validateStatus(status) {
    if (status === undefined || status === null || status === '') {
        return 'pending'
    }
    if (!VALID_STATUSES.includes(status)) {
        throw new ValidationError(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`)
    }
    return status
}

function validateDeadline(deadline) {
    if (deadline === undefined || deadline === null || deadline === '') {
        return null
    }
    const parsed = Date.parse(deadline)
    if (Number.isNaN(parsed)) {
        throw new ValidationError("Invalid deadline format")
    }
    return deadline
}

function validateUserId(user_id) {
    if (!user_id || user_id < 0) {
        throw new ValidationError("Valid user_id is required")
    }
    return user_id
}

function createTask(title, description, priority, status, deadline, user_id) {
    const validatedTitle = validateTitle(title)
    const validatedPriority = validatePriority(priority)
    const validatedStatus = validateStatus(status)
    const validatedDeadline = validateDeadline(deadline)
    const validatedUserId = validateUserId(user_id)

    return TaskDB.createTask({
        title: validatedTitle,
        description: description || null,
        priority: validatedPriority,
        status: validatedStatus,
        deadline: validatedDeadline,
        user_id: validatedUserId
    })
}

function getTask(id) {
    if (!id || id < 0) {
        throw new ValidationError("Invalid task id")
    }
    return TaskDB.getTask(id)
}

function getTasksByUser(user_id) {
    const validatedUserId = validateUserId(user_id)
    return TaskDB.getTasksByUser(validatedUserId)
}

function updateTask(taskData) {
    if (!taskData.id) {
        throw new ValidationError("Task id is required")
    }

    const existing = TaskDB.getTask(taskData.id)
    if (!existing) {
        throw new ValidationError("Task not found")
    }

    const updateData = { id: taskData.id }

    if (taskData.title !== undefined) {
        updateData.title = validateTitle(taskData.title)
    }
    if (taskData.description !== undefined) {
        updateData.description = taskData.description || null
    }
    if (taskData.priority !== undefined) {
        updateData.priority = validatePriority(taskData.priority)
    }
    if (taskData.status !== undefined) {
        updateData.status = validateStatus(taskData.status)
    }
    if (taskData.deadline !== undefined) {
        updateData.deadline = validateDeadline(taskData.deadline)
    }
    if (taskData.user_id !== undefined) {
        updateData.user_id = validateUserId(taskData.user_id)
    }

    return TaskDB.updateTask(updateData)
}

function deleteTask(id) {
    if (!id || id < 0) {
        throw new ValidationError("Invalid task id")
    }

    const task = TaskDB.getTask(id)
    if (!task) {
        throw new ValidationError("Task not found")
    }

    return TaskDB.deleteTask(id)
}

// SIMPLIFIED: Only titleq, descq, status, priority, desc (order)
function filterOut(filters, user_id) {
    if (!user_id) {
        throw new ValidationError("user_id is required for filtering tasks")
    }
    const validatedUserId = validateUserId(user_id)

    const {
        titleq = '',
        descq = '',
        status = '',
        priority = '',
        desc = 'false'
    } = filters

    const conditions = ['user_id = ?']
    const params = [validatedUserId]

    // Title search
    if (titleq && typeof titleq === 'string' && titleq.trim() !== '') {
        if (titleq.trim().length > 255) {
            throw new ValidationError("Title search query must not exceed 255 characters")
        }
        conditions.push('title LIKE ?')
        params.push(`%${titleq.trim()}%`)
    }

    // Description search
    if (descq && typeof descq === 'string' && descq.trim() !== '') {
        conditions.push('description LIKE ?')
        params.push(`%${descq.trim()}%`)
    }

    // Status filter
    if (status !== '' && status !== undefined && status !== null) {
        if (!VALID_STATUSES.includes(status)) {
            throw new ValidationError(`Invalid status filter. Must be one of: ${VALID_STATUSES.join(', ')}`)
        }
        conditions.push('status = ?')
        params.push(status)
    }

    // Priority filter
    if (priority !== '' && priority !== undefined && priority !== null) {
        if (!VALID_PRIORITIES.includes(priority)) {
            throw new ValidationError(`Invalid priority filter. Must be one of: ${VALID_PRIORITIES.join(', ')}`)
        }
        conditions.push('priority = ?')
        params.push(priority)
    }

    // Sort: always by created_at, toggle ASC/DESC
    const orderDirection = (desc === 'true' || desc === '1' || desc === true) ? 'DESC' : 'ASC'

    const sql = `SELECT * FROM ${tables.Tasks} WHERE ${conditions.join(' AND ')} ORDER BY created_at ${orderDirection}`

    const rows = db.prepare(sql).all(...params)

    return {
        tasks: rows.map(row => new Task(
            row.id,
            row.title,
            row.description,
            row.priority,
            row.status,
            row.deadline,
            row.created_at,
            row.updated_at,
            row.user_id
        )),
        count: rows.length
    }
}

function trashTask(id) {
    if (!id || id < 0) {
        throw new ValidationError("Invalid task id")
    }

    const task = TaskDB.getTask(id)
    if (!task) {
        throw new ValidationError("Task not found")
    }

    return TaskDB.trashTask(id)
}

module.exports = {
    createTask,
    getTask,
    getTasksByUser,
    updateTask,
    deleteTask,
    trashTask,
    filterOut
}