import { default as axios } from "axios"

const apiUrl = "http://127.0.0.1:8000/api"
const axiosClient = axios.create({
    baseURL: apiUrl,
    // headers: {
    //     Authorization: `Bearer ${apikey}`,
    // },
})

export default axiosClient
