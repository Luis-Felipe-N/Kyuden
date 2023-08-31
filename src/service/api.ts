import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
})


api.interceptors.request.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    return response
})