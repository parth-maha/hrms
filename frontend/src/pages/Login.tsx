import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/image.png";
import Button from "../components/ui/Button";
import { isValidEmail } from "../utilities/FormValidator";
import TextField from "../components/ui/TextField";
import { useLoginMutation } from "../services/auth.service";
import CircularLoader from "../components/ui/CircularLoader";

const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending } = useLoginMutation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Enter valid email address");
      return;
    }

    if (!password || password.trim() === "") {
      toast.error("Please enter your password");
      return;
    }
    mutate({ email, password });
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
            variant="contained"
            onClick={handleLogin}
            disabled={isPending}
            fullWidth
          >
            {isPending ? (
              <CircularLoader/>
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
