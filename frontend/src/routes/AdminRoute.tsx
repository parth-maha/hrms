import { useEffect } from "react"
import useAuthStore from "../store/auth.store"
import Loader from "../components/ui/RequestLoaders"
import { Navigate, Outlet } from "react-router-dom"

const AdminRoute = () =>{
    const {roles,isAuthenticated, isLoading, initializeAuth} = useAuthStore()

    useEffect(() => {
      initializeAuth()
    }, [initializeAuth])
    
    if(isLoading) return <Loader/>

    if(!isAuthenticated) return <Navigate to="/login" />
    if(roles === "EMPLOYEE") return <Navigate to="/"/>
    return <Outlet/>
}

export default AdminRoute;