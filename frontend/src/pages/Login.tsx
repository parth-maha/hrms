import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/image.png";
import Button from "../components/ui/Button";
import { isValidEmail } from "../utilities/FormValidator";
import TextField from "../components/ui/TextField";
import { useLoginMutation } from "../services/authService";
import Loader from "../components/ui/RequestLoaders";
import api from "../services/axios";
import useAuthStore from "../store/authStore";

const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  //   const { mutate, isPending } = useLoginMutation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!isValidEmail(email)) {
      toast.error("Enter valid email address");
      setLoading(false);
      return;
    }

    if (!password || password.trim() === "") {
      toast.error("Please enter your password");
      setLoading(false);
      return;
    }
    try {
      const response = await api.post("/auth/login", {
        Email: email,
        Password: password,
      });

      if (response.data) {
        const { Email, EmployeeId, Roles, jwtToken, FirstName, LastName } =
          response.data;
        const name = FirstName + " " + LastName;
        login(Email, EmployeeId.toString(), Roles, jwtToken, name);

        const userDetails = {
          name: FirstName + LastName || "",
          email: Email || "",
          employeeId: EmployeeId || "",
          role: Roles || "",
        };

        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        navigate("/");
      } else {
        throw new Error("Login failed.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
    // mutate({email,password})
  };

  return (
    <>
      <div className="flex gap-5 items-center justify-center min-h-scree">
        <form
          onSubmit={handleLogin}
          className="w-[40%] p-12 rounded-md h-[95vh] my-4 mr-5 flex flex-col justify-center"
        >
          <div className="flex justify-center">
            <img
              src={logo}
              className="w-48 flex items-center object-contain mb-4"
              alt="AutoBi Logo"
            />
          </div>

          <div className="py-2">
            <TextField
              id="email"
              label="Email"
              name="username"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </div>
          <div className="py-2">
            <TextField
              id="password"
              label="Password"
              name="password"
              type="password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </div>
          <Button
            id="login"
            type="submit"
            onClick={handleLogin}
            disabled={loading}
            fullWidth
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
