const { ValidationError } = require('../core')
const { isValidEmail } = require('../utils/validation.utils')

class User {
    constructor (id, username, email) {
        this.id = id
        this.username = username
        this.email = email
        this.validate()
    }

    validate() {
        if (
            this.id !== undefined && this.id >= 0 &&
            this.username !== undefined && this.username.length >= 5 &&
            this.email !== undefined && isValidEmail(this.email)
        ) {
            return true
        }
        else {
            throw new ValidationError("This User object is not valid!")
        }
    }
}

module.exports = {
    User
}