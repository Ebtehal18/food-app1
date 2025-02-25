import React from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";

export default function MasterLayout({adminData}) {
  console.log(adminData)
  return <div className="d-flex">
 <div className="">
 <SideBar/>
 </div>
<div className="w-100 ">
<Navbar adminData={adminData}/>
{/* <Header/> */}
 {/* <div className="over-flow-auto"> */}
 <Outlet/>
 {/* </div> */}
</div>
  </div>;
}
