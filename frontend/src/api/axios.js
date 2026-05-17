import axios from 'axios';

// Enterprise-grade Axios Instance
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Target backend via env variable
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Automatically inject JWT token into headers
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('crms_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Global Error Handling
apiClient.interceptors.response.use(
    (response) => {
        // Return unwrapped data for cleaner controller logic
        return response.data;
    },
    (error) => {
        // Handle global errors like 401 Unauthorized (e.g., token expired)
        if (error.response && error.response.status === 401) {
            console.error('Session expired or unauthorized');
            localStorage.removeItem('crms_token');
            localStorage.removeItem('crms_user');
            // Can trigger a hard redirect to /login here if needed
        }
        return Promise.reject(error.response?.data || error.message);
    }
);

export default apiClient;
