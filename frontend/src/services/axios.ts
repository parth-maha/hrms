import axios from "axios";
import { decryptString } from "../utilities/encrypt";

const axiosInstance = axios.create({
	baseURL: "http://localhost:5155/",
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor: Attach token
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			const decryptToken = decryptString(token);
			config.headers["Authorization"] = `Bearer ${decryptToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor: Logout on 401 or 403
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && [401, 403].includes(error.response.status)) {
			localStorage.clear(); // Clear all localStorage
			window.location.href = "/login"; // Redirect to login/root page
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;