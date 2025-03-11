import React from "react";
import personalimg from '../../assets/images/personal-img.png'
import { UseAuthContext } from "../../context/authContext";
export default function Navbar() {
      const {adminData}=UseAuthContext()
  

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
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto">
      <li className="nav-item d-flex mt-2 mt-md-0">
        <img src={personalimg} alt="personal-img" className=" mx-2 mx-md-0" />
        <a className="nav-link" >{adminData?.userName}</a>
   
      </li>
      <li className="nav-item d-flex mt-2 mt-md-0 d-flex align-items-center mx-4">
     <i class="fa-solid fa-bell" ></i>
   
      </li>
    </ul>
  </div>
</nav>

  
}
