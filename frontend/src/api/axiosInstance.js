import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  // Use the VITE_API_URL environment variable if available, otherwise default to empty string (relative path)
  baseURL: import.meta.env.VITE_API_URL || '',
});

// Add a request interceptor to attach the JWT token to every request automatically if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    // We can't import useAuthStore directly here to avoid circular dependencies if not careful,
    // so we get the token directly from localStorage since Zustand persists it there.
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        const token = parsed?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error("Error attaching token in interceptor", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
