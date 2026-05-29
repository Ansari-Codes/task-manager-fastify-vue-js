const bcrypt = require('bcrypt')
const { createUser, deleteUser } = require('./DataBase/User.db')

async function run() {
    deleteUser(3)

    const hashed = await bcrypt.hash('testPass', 10)

    createUser({
        username: 'testuser',
        email: 'test@email.com'
    }, hashed)
}

run().catch(console.error)
