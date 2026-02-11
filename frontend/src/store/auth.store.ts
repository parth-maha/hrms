import { create } from "zustand";
import api from "../services/axios";

interface AuthState {
  empId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  email: string | null;
  isLoading: boolean;
  name: string | null;
  roles: string | null;
  login: (
    email: string,
    empId: string,
    roles: string,
    token: string,
    name: string,
  ) => void;
  logout: () => void;
  initializeAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  empId: null,
  token: null,
  name: null,
  isAuthenticated: false,
  email: null,
  isLoading: true,
  roles:  null,

  login: (
    email: string,
    empId: string,
    roles: string,
    token: string,
    name: string,
  ) => {
    localStorage.setItem("token", token);
    set({
      empId,
      token,
      name,
      isLoading: false,
      roles,
      email,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    try {
      window.location.href='/login'
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails");
      await api.post("/Auth/revoke-token");
    } catch (error) {
      console.error("Logout failed on server:", error);
    } finally {
      set({
        empId: null,
        name: null,
        token: null,
        isLoading: false,
        roles: null,
        email: null,
        isAuthenticated: false,
      });
    }
  },

  initializeAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({
        empId: null,
        name: null,
        token: null,
        isLoading: false,
        roles: null,
        email: null,
        isAuthenticated: false,
      });
      return;
    }

    try {
      const response = await api.get("/Auth/verify");
      const userData = response.data;

      const token = localStorage.getItem("token");
      const { jwtToken, email, employeeId, role, firstName, lastName } =
        userData;
      set({
        empId: employeeId,
        token: jwtToken || token,
        isLoading: false,
        name: firstName + " " + lastName,
        roles: role,
        email: email,
        isAuthenticated: true,
      });
    } catch (err: any) {
      console.error("Authentication failed:", err?.response?.message || err);
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails")
      set({
        empId: null,
        token: null,
        name: null,
        isLoading: false,
        roles: null,
        email: null,
        isAuthenticated: false,
      });
    }
  },
}));

export default useAuthStore;
