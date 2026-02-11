import { useEffect } from "react";
import useAuthStore from "./store/auth.store";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, Bounce } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utilities/theme";
import Loader from "./components/ui/RequestLoaders";

const queryClient = new QueryClient();

function App() {
  const initializeAuth = useAuthStore((state: any) => state.initializeAuth);
  const isLoading = useAuthStore((state:any) => state.isLoading)
  
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if(isLoading){
    return <Loader/>
  }

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
