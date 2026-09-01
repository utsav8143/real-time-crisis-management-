import axios from "axios";

const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials:true,
})

// @ Request Interceptor
// Attach token to every outgoing request
api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token")
    if(token){
        config.headers.Authorization= `Bearer ${token}`
    }
    return config;
});

// @Response interceptor
// Auto-logout if token expires 
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthEndpoint=error.config?.url?.includes("/api/auth/login") || error.config?.url?.includes("/auth/register")
        
        if(error.response?.status===401 && !isAuthEndpoint){
            console.log("Unauthorized user")
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href="/login";
        }

        return Promise.reject(error);
    }
)

export default api;