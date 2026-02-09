import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import api from "./axios";
import { toast } from "react-toastify";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  EmployeeId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Roles: string[];
  jwtToken: string;
  refreshToken: string;
}
export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  console.log();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => loginUser(credentials),
    onSuccess: (data: LoginResponse) => {
      login(data.Email, data.EmployeeId, data.Roles, data.jwtToken,data.FirstName+ " " + data.LastName);

      const userDetails = {
        name: data?.FirstName + data.LastName || "",
        email: data?.Email || "",
        employeeId: data?.EmployeeId || "",
        role: data?.Roles || "",
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
  const { data } = await api.post<LoginResponse>("/Auth/login", credentials);
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/Auth/revoke-token");
};
