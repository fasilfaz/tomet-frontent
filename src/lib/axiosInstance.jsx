import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://tomet-backent-1.onrender.com"
    // baseURL: "http://localhost:4000"
})