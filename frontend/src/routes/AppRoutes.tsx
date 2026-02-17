import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Jobs from "../pages/Jobs";
import Games from "../pages/Games/Games";
import Policies from "../pages/Policies";
import OrgChart from "../pages/OrgChart/OrgChart";
import AdminRoute from "./AdminRoute";
import Config from "../pages/Config/Config";
import ProtectedRotue from "./ProtectedRoute";
import Travel from "../pages/Travel/Travel";

const router = createBrowserRouter([
  {
    path : "",
    errorElement : <ErrorPage/>,
    children : [
      {
        element : <ProtectedRotue/>,
        children: [
          {
            element : <DashboardLayout/>,
            children :[
              {
                index : true,
                element : <Home/>
              },
              {
                path : "travel",
                element : <Travel/>
              },
              {
                path : "games",
                element : <Games/>
              },
              {
                path : "jobs",
                element : <Jobs/>
              },
              {
                path : "chart",
                element : <OrgChart/>
              },
              {
                path : "policies",
                element : <Policies/>

              },{
                element : <AdminRoute/>,
                children : [
                  {
                    path : "config",
                    element : <Config/>
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path : "/login",
        element : <Login/>
      },
      {
        path : "*",
        element : <NotFound/>
      }
    ]
  }
]);

export default router;