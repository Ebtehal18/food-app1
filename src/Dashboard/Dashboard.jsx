import React from "react";
import Header from "../Shared/Header/Header";
import DashImgHeader from '../../src/assets/images/dashimg-header.png'
import HeaderDetails from "../Shared/HeaderDetails/HeaderDetails";
import { UseAuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
      const {adminData}=UseAuthContext()
  

  return <>
    <Header 
    title={'Welcome'} 
    img={<img src={DashImgHeader} alt="dashboard header img" className="w-75"/>}
    subtitle={`${adminData?adminData?.userName:""}!`}
    description={'This is a welcoming screen for the entry of the application , you can now see the options'} />


<div className="d-flex details container-fluid  px-md-4 px-2 ">
    <div className='w-100  d-flex flex-md-row flex-column justify-content-between py-2 py-md-5  px-3 rounded-3 align-items-center dashboard-header'>
    <div className="caption mb-2 mb-md-0">
      <h4 className="mb-0">Fill the<span>Recipes</span>! </h4>
      <p className="mb-0">you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
    </div>   
    <Link to={'/dashboard/recipes'} className={" btn-add px-3 py-2 text-decoration-none  px-md-5 py-md-3  text-white fw-bold"}>
      Fill Recipes <i className="fa-solid fa-arrow-right ms-2"></i>
      </Link>
    </div>
  
  </div>

  </>
}
