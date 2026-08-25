import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children,allowedRoles}) => {

    const {user,loading}=useAuth()
    console.log("protectedRoute check - loading:",loading, "user:", user);

    if(loading) return <div className="page-loader">Loading...</div>

    if(!user) return <Navigate to="/login" replace/>

    if(allowedRoles && !allowedRoles.includes(user.role)){
        return <Navigate to="/dashboard" replace/>
    }
  return children;
}

export default ProtectedRoute;