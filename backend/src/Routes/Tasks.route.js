const Task = require('../Functions/Task.fun')
const Cookies = require('../utils/cookies.utils')

async function routes(fastify, options) {

    // =========================
    // CREATE TASK
    // =========================
    fastify.post('/create', async (request, reply) => {

        try {

            const cookies = Cookies.getCookies(request)
            const user_id = cookies.user_id

            if (!user_id) {
                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })
            }

            const {
                title,
                description,
                priority,
                status,
                deadline
            } = request.body

            const task = await Task.createTask(
                title,
                description,
                priority,
                status,
                deadline,
                user_id
            )

            return reply.code(201).send({
                success: true,
                task
            })

        } catch (err) {

            return reply.code(400).send({
                success: false,
                error: err.message
            })
        }
    })


    // =========================
    // GET ALL TASKS OF USER
    // =========================
    fastify.get('/all', async (request, reply) => {

        try {

            const cookies = Cookies.getCookies(request)
            const user_id = cookies.user_id

            if (!user_id) {
                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })
            }

            const tasks = await Task.getTasksByUser(user_id)

            return {
                success: true,
                tasks
            }

        } catch (err) {

            return reply.code(500).send({
                success: false,
                error: err.message
            })
        }
    })


    // =========================
    // GET SINGLE TASK
    // =========================
    fastify.get('/get/:id', async (request, reply) => {

        try {

            const cookies = Cookies.getCookies(request)
            const user_id = cookies.user_id

            if (!user_id) {
                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })
            }

            const task = await Task.getTask(request.params.id)

            if (!task) {
                return reply.code(404).send({
                    success: false,
                    error: 'Task not found'
                })
            }

            if (task.user_id != user_id) {
                return reply.code(403).send({
                    success: false,
                    error: 'Forbidden'
                })
            }

            return {
                success: true,
                task
            }

        } catch (err) {

            return reply.code(500).send({
                success: false,
                error: err.message
            })
        }
    })


    // =========================
    // UPDATE TASK
    // =========================
    fastify.put('/edit/:id', async (request, reply) => {

        try {

            const cookies = Cookies.getCookies(request)
            const user_id = cookies.user_id

            if (!user_id) {
                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })
            }

            const existing = await Task.getTask(request.params.id)

            if (!existing) {
                return reply.code(404).send({
                    success: false,
                    error: 'Task not found'
                })
            }

            if (existing.user_id != user_id) {
                return reply.code(403).send({
                    success: false,
                    error: 'Forbidden'
                })
            }

            const { id, ...bodyData } = request.body

            const updatedTask = await Task.updateTask({
                ...bodyData,
                id: request.params.id,
                user_id
            })

            return { 
                success: true, 
                task: updatedTask 
            }

        } catch (err) {

            return reply.code(400).send({
                success: false,
                error: err.message
            })
        }
    })

    // =========================
    // DELETE TASK
    // =========================
    fastify.delete('/del/:id', async (request, reply) => {

        try {

            const cookies = Cookies.getCookies(request)
            const user_id = cookies.user_id

            if (!user_id) {
                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })
            }

            const task = await Task.getTask(request.params.id)

            if (!task) {
                return reply.code(404).send({
                    success: false,
                    error: 'Task not found'
                })
            }

            if (task.user_id != user_id) {
                return reply.code(403).send({
                    success: false,
                    error: 'Forbidden'
                })
            }

            await Task.deleteTask(request.params.id)

            return {
                success: true,
                message: 'Task deleted successfully'
            }

        } catch (err) {

            return reply.code(500).send({
                success: false,
                error: err.message
            })
        }
    })

    // =========================
    // TRASH TASK
    // =========================
    fastify.delete('/trash/:id', async (request, reply) => {

        try {

            const cookies = Cookies.getCookies(request)
            const user_id = cookies.user_id

            if (!user_id) {
                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })
            }

            const task = await Task.getTask(request.params.id)

            if (!task) {
                return reply.code(404).send({
                    success: false,
                    error: 'Task not found'
                })
            }

            if (task.user_id != user_id) {
                return reply.code(403).send({
                    success: false,
                    error: 'Forbidden'
                })
            }

            await Task.trashTask(request.params.id)

            return {
                success: true,
                message: 'Task moved to trash successfully'
            }

        } catch (err) {

            return reply.code(500).send({
                success: false,
                error: err.message
            })
        }
    })

    // =========================
    // FILTER TASKS
    // =========================
    fastify.get('/filter', async (request, reply) => {
        try {
            const cookies = Cookies.getCookies(request)
            const user_id = cookies.user_id

            if (!user_id) {
                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })
            }

            const result = await Task.filterOut(request.query, user_id)

            return {
                success: true,
                ...result
            }

        } catch (err) {
            const statusCode = err.message.includes('required') ? 400 : 400
            return reply.code(statusCode).send({
                success: false,
                error: err.message
            })
        }
    })
}


module.exports = routes