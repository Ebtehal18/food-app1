import React from "react";

export default function Navbar({adminData}) {
  console.log(adminData)
  return <nav className="navbar navbar-expand-lg navbar-light bg-light ms-3 me-4 my-4">

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <a className="nav-link" >{adminData?.userName}</a>
      </li>
      
    </ul>
  </div>
</nav>

  
}
