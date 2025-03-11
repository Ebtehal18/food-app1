import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBare from "../Sidebar/SideBare";





export default function MasterLayout() {

  
  return <div className="d-flex ">
 
 <SideBare/>
 
<div className="w-100  d-flex flex-column  vh-100 overflow-y-auto">
<Navbar />
 <div className="">
 <Outlet/>
 </div>
</div>
  </div>;
}
