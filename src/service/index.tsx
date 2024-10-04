import axios from "axios";

const api = axios.create({
    baseURL: "http://18.226.98.189:8080"
    // baseURL: "http://78.46.76.71:8080/"
})

export default api