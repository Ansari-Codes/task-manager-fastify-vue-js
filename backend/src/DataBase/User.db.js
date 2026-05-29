const { db, tables } = require('./init.db')
const { User } = require('../Classes/Users.class')

function createUser(user, password) {

    const result = db.prepare(
        `INSERT INTO ${tables.Users}
        (username, email, password)
        VALUES (?, ?, ?)`
    ).run(user.username, user.email, password)

    return getUser(result.lastInsertRowid)
}

function getUser(idf, by = 'id') {

    const allowedFields = [
        'id',
        'username',
        'email'
    ]

    const field = allowedFields.includes(by)
        ? by
        : 'id'

    const row = db.prepare(
        `SELECT * FROM ${tables.Users}
        WHERE ${field} = ?`
    ).get(idf)

    if (!row) {
        return null
    }

    return rowToUser(row)
}

function updateUser(user) {
    db.prepare(
        `UPDATE ${tables.Users}
        SET
            username = ?,
            email = ?,
            password = ?
        WHERE id = ?`
    ).run(
        user.username,
        user.email,
        user.password,
        user.id
    )

    return getUser(user.id)
}

function getRawUser(idf, by = 'id') {
    const allowedFields = ['id', 'username', 'email']
    const field = allowedFields.includes(by) ? by : 'id'
    return db.prepare(
        `SELECT * FROM ${tables.Users} WHERE ${field} = ?`
    ).get(idf)
}

function deleteUser(user_id) {
    return db.prepare(
        `DELETE FROM ${tables.Users} WHERE id = ?`
    ).run(user_id)
}

function rowToUser(row) {
    if (!row) {
        return null
    }

    return new User(row.id, row.username, row.email)
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    getRawUser,
    deleteUser
}