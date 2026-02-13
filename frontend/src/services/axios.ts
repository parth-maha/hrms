import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5225/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
  withCredentials : true,
  timeout : 1000 * 60
});

// Request interceptor: Attach token
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor: Logout on 401 or 403
api.interceptors.response.use(
	(response) => response,
	async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/Auth/refresh-token");
        
        const { jwtToken } = response.data;
        
        localStorage.setItem("token",jwtToken);
        
        originalRequest.headers["Authorization"] = `Bearer ${jwtToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Session expired", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails")
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;