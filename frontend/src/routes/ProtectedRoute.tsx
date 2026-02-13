import { useEffect } from "react"
import useAuthStore from "../store/auth.store"
import Loader from "../components/ui/RequestLoaders"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRotue = () =>{
    const {isAuthenticated, isLoading, initializeAuth} = useAuthStore()

    useEffect(() => {
      initializeAuth()
    }, [initializeAuth])
    
    if(isLoading) return <Loader/>

    if(!isAuthenticated) return <Navigate to="/login" />

    return <Outlet/>
}

export default ProtectedRotue;