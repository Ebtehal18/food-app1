import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

import { axiosPrivateInstance } from "../services/api/apiInstance";
import { Users_URLS } from "../services/api/apiConfig";

export const AuthContext= createContext()
export default function AuthContextProvider({children}) {
    const [adminData,setAdminData]=useState(null)
    const [currentUser,setCurrentUser]=useState(null)
 


 const fillAdminData=()=>{
  const token=localStorage.getItem('token');
  const decoded = jwtDecode(token);
// console.log(decoded)
  setAdminData(decoded)
 }

// to get image path 
const getCurrentUser=async()=>{
  try {
    const {data}=await axiosPrivateInstance.get(Users_URLS.GET_CURRENT_USER)
    setCurrentUser(data)
  } catch (error) {
    console.log(data)
  }
}





useEffect(() => {
  // to handel referesh the page in case we logedin 

  if(localStorage.getItem('token')) {
    // console.log(localStorage.getItem('token'))
   
  // await getCurrentUser()/
    fillAdminData()
  
  
  } 

}, []);
  return <AuthContext.Provider value={{adminData,fillAdminData,currentUser,getCurrentUser}}>{children}</AuthContext.Provider>
}

export function UseAuthContext(){
    const context =useContext(AuthContext)
    if(!context){
        throw new Error('no auth context found')
    }
    return context 
}