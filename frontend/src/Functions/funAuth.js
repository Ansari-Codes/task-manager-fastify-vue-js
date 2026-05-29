import { callAPI } from './funApi'

export async function getUser() {
    const res = await callAPI('GET', 'auth/me')
    return res
}

export async function checkAuth() {
    return (await getUser()).success
}

export async function funLogout() {
    const res = await callAPI('POST', 'auth/logout')
    console.log(res)
    return res
}

export async function funLogin(data) {

    const { username, password } = data

    if (!username || !password) {

        return {
            success: false,
            status: 400,
            error: 'Username and password are required'
        }

    }

    return await callAPI(
        'POST',
        'auth/login',
        {
            username,
            password
        }
    )

}

export async function funSignup(data) {

    const {
        username,
        email,
        password,
    } = data

    if (
        !username ||
        !email ||
        !password
    ) {

        return {
            success: false,
            status: 400,
            error: 'All fields are required'
        }

    }

    return await callAPI(
        'POST',
        'auth/signup',
        {
            username,
            email,
            password
        }
    )

}