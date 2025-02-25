import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderDetails({title,btnContent,subtitle,to}) {
  return  <div className="d-flex details container-fluid  px-4 ">
    <div className={`w-100 d-flex justify-content-between py-5 px-3 rounded-3 align-items-center ${to?'dashboard-header':""}`}>
    <div className="caption">
      <h4 className="mb-0">{title}</h4>
      <p className="mb-0">{subtitle}</p>
    </div>
    {btnContent ?  <button className="btn btn-add text-white fw-bold">{btnContent}</button>:null}
    {to?<NavLink to={to} className={"btn btn-add text-white fw-bold"}> Fill Recipes <i class="fa-solid fa-arrow-right ms-2"></i></NavLink>:null}
    </div>
  
  </div>

}
