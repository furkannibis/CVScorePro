import { Navigate, Outlet } from "react-router-dom"


export const PrivateLogin = () => {
    const token = localStorage.getItem("token")
    if (token !== null) {
        return <Navigate to="/home" />
    }
    return <Outlet />
}

export const PrivateRoutes = () => {
    const token = localStorage.getItem("token")
    if (token == null) {
        return <Navigate to="/login" /> 
    }
    return <Outlet />
}