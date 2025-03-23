import React from "react";
import { Outlet } from "react-router-dom";

import logo from '../../assets/images/logo1.png';

export default function AuthLayout() {

  return <>
  <div className="auth-container auth">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white rounded-3 px-5 py-4 ">
            <div>
              <div className="auth-logo text-center">
                <img src={logo} alt="logo"  className="logo"/>
              </div>
             
    <Outlet/>
    </div>
        </div>
      </div>
    </div>
  </div>
  </>;
}
