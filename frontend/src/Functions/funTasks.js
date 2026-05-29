import { callAPI } from './funApi'

export async function getTasks() {
    return await callAPI(
        'GET',
        'tasks/all'
    )
}

// Accept optional params object to build query string for server-side filtering/sorting
export async function getTasksWithParams(params = {}) {
    const qs = Object.entries(params)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => {
            if (Array.isArray(v)) return `${encodeURIComponent(k)}=${encodeURIComponent(v.join(','))}`
            return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
        })
        .join('&')

    const endpoint = qs ? `tasks?${qs}` : 'tasks'
    return await callAPI('GET', endpoint)
}

export async function getTask(id) {

    if (!id) {
        return {
            success: false,
            status: 400,
            error: 'Task ID is required'
        }
    }

    return await callAPI(
        'GET',
        `tasks/get/${id}`
    )
}

export async function createTask(data) {

    const {
        title,
        description,
        priority,
        status,
        deadline
    } = data

    if (!title) {
        return {
            success: false,
            status: 400,
            error: 'Title is required'
        }
    }

    return await callAPI(
        'POST',
        'tasks/create',
        {
            title,
            description,
            priority,
            status,
            deadline
        }
    )
}

export async function updateTask(id, data) {

    if (!id) {
        return {
            success: false,
            status: 400,
            error: 'Task ID is required'
        }
    }

    return await callAPI(
        'PUT',
        `tasks/edit/${id}`,
        data
    )
}

export async function filterTasks(filters = {}) {
    const qs = Object.entries(filters)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&')

    return await callAPI('GET', `tasks/filter?${qs}`)
}

export async function trashTask(id) {

    if (!id) {
        return {
            success: false,
            status: 400,
            error: 'Task ID is required'
        }
    }

    return await callAPI(
        'DELETE',
        `tasks/trash/${id}`
    )
}

export async function deleteTask(id) {

    if (!id) {
        return {
            success: false,
            status: 400,
            error: 'Task ID is required'
        }
    }

    return await callAPI(
        'DELETE',
        `tasks/del/${id}`
    )
}