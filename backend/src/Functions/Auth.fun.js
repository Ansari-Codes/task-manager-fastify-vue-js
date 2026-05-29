const bcrypt = require('bcrypt')

const UserDB = require('../DataBase/User.db')
const { User } = require('../Classes/Users.class')
const { ValidationError } = require('../core')

async function signup(username, email, password) {
    username = username.toLowerCase()
    email = email.toLowerCase()
    const existingUsername = UserDB.getUser(
        username,
        'username'
    )

    if (existingUsername) {
        throw new ValidationError('Username already exists')
    }

    const existingEmail = UserDB.getUser(
        email,
        'email'
    )

    if (existingEmail) {
        throw new ValidationError('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User(null, username, email)

    const createdUser = UserDB.createUser(user, hashedPassword)

    return createdUser
}

async function login(username, password) {
    username = username.toLowerCase()

    const user = UserDB.getUser(username, 'username')

    if (!user) {
        throw new ValidationError('Invalid username')
    }

    const dbRow = UserDB.getRawUser(username, 'username')

    if (!dbRow) {
        throw new ValidationError('Invalid username')
    }

    const valid = await bcrypt.compare(password, dbRow.password)

    if (!valid) {
        throw new ValidationError('Invalid password')
    }

    return user
}

function getUser(idf, by = 'id') {
    return UserDB.getUser(idf, by)
}

module.exports = {
    signup,
    login,
    getUser
}