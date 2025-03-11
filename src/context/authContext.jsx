import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext= createContext()
export default function AuthContextProvider({children}) {
    const [adminData,setAdminData]=useState(null)
// const navigate=useNavigate()
 const fillAdminData=()=>{
  const token=localStorage.getItem('token');
  const decoded = jwtDecode(token);

  setAdminData(decoded)
 }



useEffect(() => {
  // to handel referesh the page in case we logedin 
 if(localStorage.getItem('token')) {
  // console.log(localStorage.getItem('token'))
  fillAdminData()

}



}, []);
  return <AuthContext.Provider value={{adminData,fillAdminData}}>{children}</AuthContext.Provider>
}

export function UseAuthContext(){
    const context =useContext(AuthContext)
    if(!context){
        throw new Error('no auth context found')
    }
    return context 
}