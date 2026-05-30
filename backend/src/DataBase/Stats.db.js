const { db, tables } = require('./init.db')

function getTotalTasks() {
    const row = db.prepare(
        `SELECT COUNT(*) as count FROM ${tables.Tasks}`
    ).get()
    return row.count
}

function getTotalUsers() {
    const row = db.prepare(
        `SELECT COUNT(*) as count FROM ${tables.Users}`
    ).get()
    return row.count
}

function getRecentTaskDate() {
    const row = db.prepare(
        `SELECT MAX(created_at) as recent FROM ${tables.Tasks}`
    ).get()
    return row.recent
}

function getTasksByStatus() {
    const rows = db.prepare(
        `SELECT status, COUNT(*) as count FROM ${tables.Tasks} GROUP BY status`
    ).all()
    return rows
}

function getTasksByPriority() {
    const rows = db.prepare(
        `SELECT priority, COUNT(*) as count FROM ${tables.Tasks} GROUP BY priority`
    ).all()
    return rows
}

function getTasksCreatedToday() {
    const row = db.prepare(
        `SELECT COUNT(*) as count FROM ${tables.Tasks} WHERE DATE(created_at) = DATE('now')`
    ).get()
    return row.count
}

function getTasksCreatedThisWeek() {
    const row = db.prepare(
        `SELECT COUNT(*) as count FROM ${tables.Tasks} WHERE created_at >= DATE('now', '-7 days')`
    ).get()
    return row.count
}

function getTasksCreatedThisMonth() {
    const row = db.prepare(
        `SELECT COUNT(*) as count FROM ${tables.Tasks} WHERE created_at >= DATE('now', '-30 days')`
    ).get()
    return row.count
}

function getTrashedTasksCount() {
    const row = db.prepare(
        `SELECT COUNT(*) as count FROM ${tables.Tasks} WHERE status = 'trashed'`
    ).get()
    return row.count
}

function getAverageTasksPerUser() {
    const row = db.prepare(
        `SELECT 
            CASE 
                WHEN COUNT(DISTINCT user_id) = 0 THEN 0 
                ELSE CAST(COUNT(*) AS FLOAT) / COUNT(DISTINCT user_id) 
            END as avg 
        FROM ${tables.Tasks}`
    ).get()
    return parseFloat(row.avg.toFixed(2))
}

function getOverdueTasksCount() {
    const row = db.prepare(
        `SELECT COUNT(*) as count FROM ${tables.Tasks} 
        WHERE deadline IS NOT NULL 
        AND deadline < DATE('now') 
        AND status != 'done' 
        AND status != 'trashed'`
    ).get()
    return row.count
}

module.exports = {
    getTotalTasks,
    getTotalUsers,
    getRecentTaskDate,
    getTasksByStatus,
    getTasksByPriority,
    getTasksCreatedToday,
    getTasksCreatedThisWeek,
    getTasksCreatedThisMonth,
    getTrashedTasksCount,
    getAverageTasksPerUser,
    getOverdueTasksCount
}
