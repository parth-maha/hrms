    import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Travel from "../pages/Travel";

const router = createBrowserRouter([
  {
    path: "",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index : true,
        element: <Home />,
      }, 
      {
        path:"/",
        element: <Home />,
      },
      {
        path:"/travel",
        element: <Travel />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;