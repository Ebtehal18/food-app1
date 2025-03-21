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
