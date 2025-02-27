import React from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";

export default function MasterLayout({adminData}) {
  console.log(adminData)
  return <div className="d-flex vh-100">
 
 <SideBar/>
 
<div className="w-100  d-flex flex-column ">
<Navbar adminData={adminData}/>
 <div className=" overflow-y-auto">
 <Outlet/>
 </div>
</div>
  </div>;
}
