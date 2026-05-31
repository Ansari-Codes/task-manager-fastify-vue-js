const StatsDB = require('../Database/Stats.db')

function getSoftwareStats() {
    const totalTasks = StatsDB.getTotalTasks()
    const totalUsers = StatsDB.getTotalUsers()
    const recentTaskDate = StatsDB.getRecentTaskDate()
    const tasksByStatus = StatsDB.getTasksByStatus()
    const tasksByPriority = StatsDB.getTasksByPriority()
    const tasksToday = StatsDB.getTasksCreatedToday()
    const tasksThisWeek = StatsDB.getTasksCreatedThisWeek()
    const tasksThisMonth = StatsDB.getTasksCreatedThisMonth()
    const trashedCount = StatsDB.getTrashedTasksCount()
    const avgTasksPerUser = StatsDB.getAverageTasksPerUser()
    const overdueCount = StatsDB.getOverdueTasksCount()
    const avgTasksPerDay = StatsDB.getAverageTasksPerDay()

    // Build status breakdown object
    const statusBreakdown = {}
    tasksByStatus.forEach(item => {
        statusBreakdown[item.status] = item.count
    })

    // Build priority breakdown object
    const priorityBreakdown = {}
    tasksByPriority.forEach(item => {
        priorityBreakdown[item.priority] = item.count
    })

    return {
        totalTasks,
        totalUsers,
        recentTaskDate: recentTaskDate || null,
        tasksToday,
        tasksThisWeek,
        tasksThisMonth,
        trashedCount,
        avgTasksPerUser,
        overdueCount,
        statusBreakdown,
        priorityBreakdown,
        avgTasksPerDay
    }
}

module.exports = {
    getSoftwareStats
}
