const Stats = require('../Functions/Stats.fun')

async function routes(fastify, options) {

    // =========================
    // GET SOFTWARE STATS (Public)
    // =========================
    fastify.get('/stats', async (request, reply) => {
        try {
            const stats = await Stats.getSoftwareStats()

            return {
                success: true,
                stats
            }

        } catch (err) {
            return reply.code(500).send({
                success: false,
                error: err.message
            })
        }
    })
}

module.exports = routes
