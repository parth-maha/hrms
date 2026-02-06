import React, { useEffect } from "react";
import useAuthStore from "./store/authStore";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";

function App() {
  const initializeAuth = useAuthStore((state: any) => state.initializeAuth);
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return(
    <>
        <RouterProvider router={router} />
    </>
  ) 
}

export default App;
