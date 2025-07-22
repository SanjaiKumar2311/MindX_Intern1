import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
    headers:{
        // "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        const tenantId = localStorage.getItem("tenantId");
    
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
    
        if (tenantId) {
          config.headers["X-Tenant-ID"] = tenantId;
        }
    
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;