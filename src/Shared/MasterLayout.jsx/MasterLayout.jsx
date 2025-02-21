import React from "react";
import { Sidebar } from "react-pro-sidebar";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return <div className="d-flex">
 <div className="bg-info w-25">
 <Sidebar/>
 </div>
<div className="w-75 bg-danger">
<Navbar/>
<Header/>
  <Outlet/>
</div>
  </div>;
}
