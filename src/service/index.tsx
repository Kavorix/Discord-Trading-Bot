import axios from "axios";

const api = axios.create({
    // baseURL: "http://18.226.98.189:8080"
    // baseURL: "http://localhost:8080/"
    baseURL: "http://78.46.76.71:8080/"
})

// api.interceptors.request.use(
//     (config) => {
//         // Add any request modifications here
//         const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// api.interceptors.response.use(
//     (response) => {
//         // Handle successful responses
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 // Attempt to refresh the token
//                 const refreshToken = localStorage.getItem('refreshToken');
//                 const response = await axios.post('https://api.example.com/refresh-token', { refreshToken });
//                 const newToken = response.data.token;

//                 localStorage.setItem('token', newToken);
//                 api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

//                 return api(originalRequest);
//             } catch (refreshError) {
//                 // Handle refresh token failure (e.g., redirect to login)
//                 if (typeof window !== 'undefined') {
//                     window.location.href = '/login';
//                 }
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

export default api;
