import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Travel from "../pages/Travel";
import Login from "../pages/Login";
import Jobs from "../pages/Jobs";
import Games from "../pages/Games/Games";
import Policies from "../pages/Policies";
import OrgChart from "../pages/OrgChart/OrgChart";
import AdminRoute from "./AdminRoute";
import Config from "../pages/Config/Config";

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
        path:"/games",
        element : <Games/>
      },
      {
        path:"/jobs",
        element : <Jobs/>
      },
      {
        path:"/chart",
        element : <OrgChart/>
      },
      {
        path:"/policies",
        element : <Policies/>
      },
      {
        element : <AdminRoute/>,
        children : [
          {
            path : '/config',
            element : <Config/>
          }
        ]
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path : "/login",
    element : <Login/>
  }
]);

export default router;