import React from "react";
import logo from '../../assets/images/logo1.png'
import notfound2 from '../../assets/images/notfound2.png'
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate=useNavigate()

  return <div className="not-found">
    <div className="container-fluid position-relative">
 <div>
 <img src={logo} alt="logo" height={104} className="mb-4 mb-md-0" />
 </div>
<div className=" d-md-flex justify-content-between align-items-center">
<div className="px-md-4 mx-md-4 px-2">
<h3 >Oops.... </h3>
  <span>Page  not found </span>
  <p className="w-100 w-sm-50">This Page doesn’t exist or was removed!
  We suggest you  back to home.</p>
  <Link className="btn-add text-white px-4 py-3 text-decoration-none d-inline-block mt-4" onClick={()=>navigate('/')} > <i className="fa-solid fa-arrow-left mx-3"></i> Back To Home</Link>
</div>

<div className="text-center">
<img src={notfound2} alt="not found" className=" w-75 w-md-100 text-center" />

  </div></div>

  </div>
  </div>;
}
