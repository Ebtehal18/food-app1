import React, { useEffect, useState } from "react";
import personalimg from '../../assets/images/personal-img.png'
import { UseAuthContext } from "../../context/authContext";
import { imgURL } from "../../services/api/apiInstance";

import {  Link  } from "react-router-dom";
export default function Navbar() {
      const {adminData,currentUser}=UseAuthContext()


// console.log(currentUser)
  return <nav className="navbar navbar-expand-lg navbar-light bg-light ms-3 me-4 my-4 px-4 py-3">

  <button 
  className="navbar-toggler ms-auto" type="button" 
  data-bs-toggle="collapse" 
  data-bs-target="#navbarSupportedContent"
   aria-controls="navbarSupportedContent" 
   aria-expanded="false" aria-label="Toggle navigation"
   
   >
      
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse " id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto d-flex flex-md-row flex-column  justify-content-between ">
      <li className="nav-item d-flex mt-2 mt-md-0  align-items-center">

    {/* Image in case of user (SystemUser) */}
   
      <Link to={'/dashboard'}>
        <img
     src={
      adminData?.userGroup === "SuperAdmin"
        ? personalimg // Default image for SuperAdmin
        : currentUser?.imagePath
        ? `${imgURL}/${currentUser.imagePath}` // User's image if available
        : personalimg // Default image for SystemUser if no image
    }
    alt="personal-img"
    className={` ${currentUser?.imagePath && adminData.userGroup==='SystemUser'?'personal-img':""} mx-2 mx-md-0`}
    /></Link>
    

  


        <a className="nav-link" >{currentUser?.userName}</a>
   
      </li>
  <li className="nav-item d-flex mt-2 mt-md-0 d-flex align-items-center mx-4">

<Link to='/dashboard/profile' className="text-decoration-none text-black"><i class="fa-solid fa-user me-2 text-success"></i>My Profile</Link>


</li>
    </ul>
  </div>
</nav>

  
}
