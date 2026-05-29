export class TaskData {

    id = null

    title = ""
    description = ""

    priority = "medium"
    status = "pending"

    deadline = null

    created_at = null
    updated_at = null

    user_id = null

    isValid() {

        const errors = {
            title: [],
            description: [],
            priority: [],
            status: [],
            deadline: []
        }

        const validPriorities = [
            'optional',
            'low',
            'medium',
            'high',
            'critical'
        ]

        const validStatuses = [
            'pending',
            'in_progress',
            'done',
            'cancelled',
            'trashed'
        ]

        // Title validation
        if ([null, undefined, ""].includes(this.title)) {

            errors.title.push(
                "Title is required!"
            )

        } else if (this.title.trim().length < 3) {

            errors.title.push(
                "Title must be at least 3 characters!"
            )

        }

        // Priority validation
        if (
            this.priority &&
            !validPriorities.includes(this.priority)
        ) {

            errors.priority.push(
                "Invalid priority!"
            )

        }

        // Status validation
        if (
            this.status &&
            !validStatuses.includes(this.status)
        ) {

            errors.status.push(
                "Invalid status!"
            )

        }

        // Deadline validation
        if (
            this.deadline &&
            Number.isNaN(Date.parse(this.deadline))
        ) {

            errors.deadline.push(
                "Invalid deadline!"
            )

        }

        return {

            success:
                errors.title.length === 0 &&
                errors.description.length === 0 &&
                errors.priority.length === 0 &&
                errors.status.length === 0 &&
                errors.deadline.length === 0,

            errors

        }

    }

    toObject() {

        return {

            id: this.id,

            title: this.title.trim(),

            description: this.description,

            priority: this.priority,

            status: this.status,

            deadline: this.deadline,

            created_at: null,
            updated_at: null,

            user_id: this.user_id

        }

    }

}