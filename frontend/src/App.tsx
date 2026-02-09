import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, Bounce } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utilities/theme";

function App() {
  const initializeAuth = useAuthStore((state: any) => state.initializeAuth);
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnFocusLoss={false}
          pauseOnHover={true}
          theme="light"
          limit={1}
          transition={Bounce}
          style={{ zIndex: 9999 }}
        />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
