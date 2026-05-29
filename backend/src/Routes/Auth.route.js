const Auth = require('../Functions/Auth.fun')
const Cookies = require('../utils/cookies.utils')

async function routes(fastify, options) {

    fastify.post('/signup', async (request, reply) => {

        try {

            const {
                username,
                email,
                password
            } = request.body

            const user = await Auth.signup(
                username,
                email,
                password
            )

            reply.header(
                'Set-Cookie',
                [
                    `user_id=${user.id}`,
                    'HttpOnly',
                    'Path=/',
                    'SameSite=Lax',
                    `Max-Age=${60 * 60 * 24}`
                ].join('; ')
            )

            return reply.code(201).send({
                success: true,
                user
            })

        } catch (err) {

            return reply.code(400).send({
                success: false,
                error: err.message
            })

        }

    })

    fastify.post('/login', async (request, reply) => {

        try {

            const {
                username,
                password
            } = request.body

            const user = await Auth.login(
                username,
                password
            )

            reply.header(
                'Set-Cookie',
                [
                    `user_id=${user.id}`,
                    'HttpOnly',
                    'Path=/',
                    'SameSite=Lax',
                    `Max-Age=${60 * 60 * 24}`
                ].join('; ')
            )

            return {
                success: true,
                user
            }

        } catch (err) {

            return reply.code(401).send({
                success: false,
                error: err.message
            })

        }

    })

    fastify.get('/me', async (request, reply) => {

        try {

            // Log raw Cookie header for debugging
            fastify.log.info({cookieHeader: request.headers.cookie}, 'Incoming Cookie header')

            const cookies = Cookies.getCookies(request)

            // Log parsed cookies
            fastify.log.info({cookies}, 'Parsed cookies')

            const userId = cookies.user_id

            if (!userId) {

                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })

            }

            const user = await Auth.getUser(userId)

            if (!user) {

                return reply.code(404).send({
                    success: false,
                    error: 'User not found'
                })

            }

            return {
                success: true,
                user
            }

        } catch (err) {

            return reply.code(500).send({
                success: false,
                error: err.message
            })

        }

    })

    fastify.post('/logout', async (request, reply) => {

        reply.header(
            'Set-Cookie',
            [
                'user_id=',
                'HttpOnly',
                'Path=/',
                'SameSite=Lax',
                'Max-Age=0'
            ].join('; ')
        )

        return {
            success: true,
            message: 'Logged out successfully'
        }

    })

}

module.exports = routes