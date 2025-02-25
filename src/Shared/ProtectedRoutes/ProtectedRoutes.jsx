import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({children,adminData}) {
    // if there is a token or adminData then it is athourized.else then navigate to login 
  if(localStorage.getItem('token')||adminData) return children
  else return <Navigate to={'/login'}/>
}
