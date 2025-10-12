import axios from "axios"
import toast from "react-hot-toast"
import { token } from "./Config"

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

instance.interceptors.request.use((config) => {
    const tokenString = token()

    // Only attach token if it exists
    if (tokenString) {
        config.headers.Authorization = `Bearer ${tokenString}`
    }
    
    return config
})

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            toast.error("Session expired. Please log in again.")
            localStorage.removeItem("user-blog")
            window.location.href = "/account/login"
        }
        return Promise.reject(error)
    }
)

export default instance
