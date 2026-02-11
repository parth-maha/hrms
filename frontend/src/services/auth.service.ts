import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthStore from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import api from "./axios";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string[];
  jwtToken: string;
  refreshToken: string;
}
export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => loginUser(credentials),
    onSuccess: (data: LoginResponse) => {
      login(data.email, data.employeeId, data.role, data.jwtToken,data.firstName+ " " + data.lastName);

      const userDetails = {
        name: data?.firstName + data.lastName || "",
        email: data?.email || "",
        employeeId: data?.employeeId || "",
        role: data?.role || "",
      };

      localStorage.setItem("token", data.jwtToken);
      localStorage.setItem("userDetails", JSON.stringify(userDetails))
      navigate("/");
    },
    onError: (error: any) => {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message,
      );
    },
  });
};


const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/Auth/login", credentials);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  const response =await api.post("/Auth/revoke-token");
  return response.data;
};
