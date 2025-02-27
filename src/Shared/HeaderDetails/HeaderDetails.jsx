import React from "react";
import { Link } from "react-router-dom";

export default function HeaderDetails({title,btnContent,subtitle,to}) {
  return  <div className="d-flex details container-fluid  px-4 ">
    <div className={`w-100  d-flex flex-md-row flex-column justify-content-between py-5 px-3 rounded-3 align-items-center ${to?'dashboard-header':""}`}>
    <div className="caption mb-2 mb-md-0">
      <h4 className="mb-0">{title}</h4>
      <p className="mb-0">{subtitle}</p>
    </div>
    {btnContent ?  <button className="btn btn-add px-3 py-2 px-md-5 py-md-3 text-white fw-bold mt-2 mt-md-0">{btnContent}</button>:null}
    {to?<Link to={to} className={"btn btn-add px-3 py-2  px-md-5 py-md-3  text-white fw-bold"}> Fill Recipes <i className="fa-solid fa-arrow-right ms-2"></i></Link>:null}
    </div>
  
  </div>

}
