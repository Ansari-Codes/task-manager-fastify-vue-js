import { callAPI } from './funApi'

export async function getSoftwareStats() {
    return await callAPI(
        'GET',
        'stats'
    )
}