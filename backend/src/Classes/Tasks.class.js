const { ValidationError } = require('../core')

class Task {
    constructor(
        id,
        title,
        description,
        priority,
        status,
        deadline,
        created_at,
        updated_at,
        user_id
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.priority = priority
        this.status = status
        this.deadline = deadline
        this.created_at = created_at
        this.updated_at = updated_at
        this.user_id = user_id

        this.validate()
    }

    validate() {
        const validPriorities = ['optional', 'low', 'medium', 'high', 'critical']
        const validStatuses = ['pending', 'in_progress', 'done', 'cancelled', 'trashed']

        if (this.id !== undefined && this.id < 0) {
            throw new ValidationError("Invalid task id")
        }

        if (!this.title || this.title.trim().length < 3) {
            throw new ValidationError("Task title must be at least 3 characters")
        }

        if (
            this.priority !== undefined &&
            !validPriorities.includes(this.priority)
        ) {
            throw new ValidationError("Invalid priority value")
        }

        if (
            this.status !== undefined &&
            !validStatuses.includes(this.status)
        ) {
            throw new ValidationError("Invalid status value")
        }

        if (
            this.deadline &&
            isNaN(Date.parse(this.deadline))
        ) {
            throw new ValidationError("Invalid deadline format")
        }
        if (this.user_id !== undefined && this.user_id < 0) {
            throw new ValidationError("Invalid user_id")
        }

        return true
    }

    toObject() {
        return {
            id: this.id,
            title: this.title.toLowerCase(),
            description: this.description,
            priority: this.priority.toLowerCase(),
            status: this.status.toLowerCase(),
            deadline: this.deadline,
            created_at: this.created_at,
            updated_at: this.updated_at,
            user_id: this.user_id
        }
    }

    toJSON() {
        return this.toObject()
    }
}

module.exports = {
    Task
}