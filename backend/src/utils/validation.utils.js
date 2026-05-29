function isValidEmail(email) {
    return typeof email === 'string' && email.includes('@')
}

module.exports = {
    isValidEmail
}