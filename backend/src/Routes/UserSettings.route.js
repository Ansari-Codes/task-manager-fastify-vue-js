const UserSettings = require('../Functions/UserSetting.fun')
const Cookies = require('../utils/cookies.utils')

async function routes(fastify, options) {

    // GET /settings/me — Get current user settings
    fastify.get('/me', async (request, reply) => {
        try {
            const cookies = Cookies.getCookies(request)
            const user_id = cookies.user_id

            if (!user_id) {
                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })
            }

            const user = await UserSettings.getUserSettings(user_id)

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

    // PUT /settings/username — Update username
    fastify.put('/username', async (request, reply) => {
        try {
            const cookies = Cookies.getCookies(request)
            const user_id = cookies.user_id

            if (!user_id) {
                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })
            }

            const { username } = request.body

            const updatedUser = await UserSettings.updateUsername(user_id, username)

            return {
                success: true,
                user: updatedUser
            }

        } catch (err) {
            return reply.code(400).send({
                success: false,
                error: err.message
            })
        }
    })

    // PUT /settings/email — Update email
    fastify.put('/email', async (request, reply) => {
        try {
            const cookies = Cookies.getCookies(request)
            const user_id = cookies.user_id

            if (!user_id) {
                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })
            }

            const { email } = request.body

            const updatedUser = await UserSettings.updateEmail(user_id, email)

            return {
                success: true,
                user: updatedUser
            }

        } catch (err) {
            return reply.code(400).send({
                success: false,
                error: err.message
            })
        }
    })

    // PUT /settings/password — Update password
    fastify.put('/password', async (request, reply) => {
        try {
            const cookies = Cookies.getCookies(request)
            const user_id = cookies.user_id

            if (!user_id) {
                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })
            }

            const { currentPassword, newPassword } = request.body

            await UserSettings.updatePassword(user_id, currentPassword, newPassword)

            return {
                success: true,
                message: 'Password updated successfully'
            }

        } catch (err) {
            return reply.code(400).send({
                success: false,
                error: err.message
            })
        }
    })

    // DELETE /settings/account — Delete account permanently
    fastify.delete('/account', async (request, reply) => {
        try {
            const cookies = Cookies.getCookies(request)
            const user_id = cookies.user_id

            if (!user_id) {
                return reply.code(401).send({
                    success: false,
                    error: 'Not authenticated'
                })
            }

            const { username, email, password } = request.body

            await UserSettings.deleteAccount(user_id, username, email, password)

            // Clear cookie
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
                message: 'Account deleted permanently'
            }

        } catch (err) {
            return reply.code(400).send({
                success: false,
                error: err.message
            })
        }
    })
}

module.exports = routes