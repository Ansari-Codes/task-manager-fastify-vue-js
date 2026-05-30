const Fastify = require('fastify')
const cors = require('@fastify/cors')

const authRoutes = require('./Routes/Auth.route')
const tasksRoutes = require('./Routes/Tasks.route')
const settingsRoutes = require('./Routes/UserSettings.route')

const fastify = Fastify({
    logger: true
})

async function start() {
    try {

        await fastify.register(cors, {
            origin: true,
            credentials: true,
            methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        })

        await fastify.register(authRoutes, {
            prefix: '/auth'
        })

        await fastify.register(tasksRoutes, {
            prefix: '/tasks'
        })

        await fastify.register(settingsRoutes, {
            prefix: '/settings'
        })
    
        fastify.get('/', async (request, reply) => {
            return {
                message: 'Hello World'
            }
        })

        await fastify.listen({
            port: 4000
        })

    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
