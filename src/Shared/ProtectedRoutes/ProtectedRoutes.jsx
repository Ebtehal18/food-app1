import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UseAuthContext } from "../../context/authContext";

export default function ProtectedRoutes({children}) {
    // if there is a token or adminData then it is athourized.else then navigate to login 
    const {adminData}=UseAuthContext()


  if(localStorage.getItem('token')||adminData){
    return children
  }else{
    return <Navigate to={'/login'}/>
  }

}

// handling deep linking in protected route 
// const { adminData } = UseAuthContext();
// const location = useLocation();

// // Check authentication
// const isAuthenticated = localStorage.getItem("token") || adminData;

// // Get user role
// const userGroup = adminData?.userGroup; // "Admin" or "User"

// if (!isAuthenticated) {
//   return <Navigate to="/login" state={{ from: location }} replace />;
// }

// // Get the path name from the location
// const currentPath = location.pathname;

// // Define access restrictions
// const userRestrictedRoutes = ["/categories", "/users"];
// const adminRestrictedRoutes = ["/favlist"];

// // Prevent "User" from accessing admin pages
// if (userGroup === "User" && userRestrictedRoutes.includes(currentPath)) {
//   return <Navigate to="/unauthorized" replace />;
// }

// // Prevent "Admin" from accessing user-specific pages
// if (userGroup === "Admin" && adminRestrictedRoutes.includes(currentPath)) {
//   return <Navigate to="/unauthorized" replace />;
// }

// return children; 