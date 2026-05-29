const { db, tables } = require('./init.db')
const { Task } = require('../Classes/Tasks.class')

function createTask(task) {

    const result = db.prepare(
        `INSERT INTO ${tables.Tasks}
        (title, description, priority, status, deadline, user_id)
        VALUES (?, ?, ?, ?, ?, ?)`
    ).run(
        task.title,
        task.description,
        task.priority,
        task.status,
        task.deadline,
        task.user_id
    )

    return getTask(result.lastInsertRowid)
}

function getTask(idf, by = 'id') {

    const allowedFields = [
        'id',
        'title',
        'status',
        'user_id'
    ]

    const field = allowedFields.includes(by)
        ? by
        : 'id'

    const row = db.prepare(
        `SELECT * FROM ${tables.Tasks}
        WHERE ${field} = ?`
    ).get(idf)

    if (!row) {
        return null
    }

    return rowToTask(row)
}

function getTasksByUser(user_id) {

    const rows = db.prepare(
        `SELECT * FROM ${tables.Tasks}
        WHERE user_id = ?`
    ).all(user_id)

    return rows.map(rowToTask)
}

function updateTask(task) {

    db.prepare(
        `UPDATE ${tables.Tasks}
        SET
            title = ?,
            description = ?,
            priority = ?,
            status = ?,
            deadline = ?,
            user_id = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`
    ).run(
        task.title,
        task.description,
        task.priority,
        task.status,
        task.deadline,
        task.user_id,
        task.id
    )

    return getTask(task.id)
}

function deleteTask(task_id) {
    return db.prepare(
        `DELETE FROM ${tables.Tasks}
        WHERE id = ?`
    ).run(task_id)
}

function trashTask(task_id) {
    return db.prepare(
        `UPDATE ${tables.Tasks}
        SET status = 'trashed'
        WHERE id = ?`
    ).run(task_id)
}

function getRawTask(idf, by = 'id') {

    const allowedFields = [
        'id',
        'title',
        'status',
        'user_id'
    ]

    const field = allowedFields.includes(by) ? by : 'id'

    return db.prepare(
        `SELECT * FROM ${tables.Tasks}
        WHERE ${field} = ?`
    ).get(idf)
}

function rowToTask(row) {

    if (!row) {
        return null
    }

    return new Task(
        row.id,
        row.title,
        row.description,
        row.priority,
        row.status,
        row.deadline,
        row.created_at,
        row.updated_at,
        row.user_id
    )
}

module.exports = {
    createTask,
    getTask,
    getTasksByUser,
    updateTask,
    deleteTask,
    getRawTask,
    trashTask,
    rowToTask
}