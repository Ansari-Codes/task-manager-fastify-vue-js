import { BACKEND_BASE_URL } from './funEnv'

export async function callAPI(
    method,
    endpoint,
    payload = null,
    headers = {}
) {

    try {

        if (!endpoint || String(endpoint)[0] === '/') {
            throw new Error(
                "Endpoint must be given and should not contain '/' in start!"
            )
        }

        const options = {
            method: method.toUpperCase(),
            credentials: 'include',
            headers: {
                ...headers
            }
        }

        if (payload !== null && payload !== undefined) {

            options.headers['Content-Type'] =
                'application/json'

            options.body =
                JSON.stringify(payload)

        }

        const response = await fetch(
            BACKEND_BASE_URL + '/' + endpoint,
            options
        )

        // FIX: Read body ONCE as text, then parse JSON safely.
        // This prevents "body stream already read" when json() fails.
        const text = await response.text()
        let data = text
        try {
            data = JSON.parse(text)
        } catch {
            // Not valid JSON — keep raw text
        }

        if (!response.ok) {

            return {
                success: false,
                status: response.status,
                error:
                    data?.error ||
                    data ||
                    `Request failed with status ${response.status}`
            }

        }

        return {
            success: true,
            status: response.status,
            data
        }

    } catch (error) {

        return {
            success: false,
            status: 500,
            error: error.message
        }

    }

}