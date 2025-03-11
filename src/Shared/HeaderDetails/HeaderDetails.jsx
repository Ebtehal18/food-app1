import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function HeaderDetails({title,btnContent,subtitle,to,titleRecip,handleShow}) {
 const {pathname}= useLocation()
 console.log(pathname)
  return  <div className="d-flex details container-fluid  px-md-4 px-2 ">
    <div className={`w-100  d-flex flex-md-row flex-column justify-content-between py-2 py-md-5  px-3 rounded-3 align-items-center ${pathname==='/dashboard'||pathname==='/dashboard/change-password' ||pathname=='/dashboard/recipes-data'?'dashboard-header':""}`}>
    <div className="caption mb-2 mb-md-0">
      <h4 className="mb-0">{title} {titleRecip?<span>{titleRecip}</span>:null}! </h4>
      <p className="mb-0">{subtitle}</p>
    </div>
    {btnContent ? 
     <button className=" btn-add px-3 py-2 px-md-5 py-md-3 text-white fw-bold mt-2 mt-md-0" onClick={handleShow}>{btnContent}</button>:null}
    {to?
    <Link to={to} className={" btn-add px-3 py-2 text-decoration-none  px-md-5 py-md-3  text-white fw-bold"}>
      {pathname==='/dashboard/recipes'?'Add New Item':pathname==='/dashboard'?'Fill Recipes': 'All Recipes'} 
      {pathname !== "/dashboard/recipes" && <i className="fa-solid fa-arrow-right ms-2"></i>}</Link>:null}
    </div>
  
  </div>

}
