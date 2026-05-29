function getCookies(request) {

    const cookieHeader = request.headers.cookie

    if (!cookieHeader) {
        return {}
    }

    return cookieHeader
        .split(';')
        .map(cookie => cookie.trim())
        .reduce((cookies, cookie) => {

            const [name, ...value] = cookie.split('=')

            cookies[name] = decodeURIComponent(value.join('='))

            return cookies

        }, {})

}

module.exports = {getCookies}