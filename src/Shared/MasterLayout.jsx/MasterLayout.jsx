import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";



export default function MasterLayout({adminData}) {
  console.log(adminData)
  return <div className="d-flex ">
 
 <SideBar/>
 
<div className="w-100  d-flex flex-column  vh-100 overflow-y-auto">
<Navbar adminData={adminData}/>
 <div className=" ">
 <Outlet/>
 </div>
</div>
  </div>;
}
