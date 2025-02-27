import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBare from "../Sidebar/SideBare";





export default function MasterLayout({adminData}) {
  console.log(adminData)
  return <div className="d-flex ">
 
 <SideBare/>
 
<div className="w-100  d-flex flex-column  vh-100 overflow-y-auto">
<Navbar adminData={adminData}/>
 <div className="">
 <Outlet/>
 </div>
</div>
  </div>;
}
