import React from "react";

export default function Header({title,description,img,subtitle}) {
  return <div className="container-fluid header px-0 px-md-2 ">
    <div className="row header-bg m-2 justify-content-center align-items-center">
      {/* content header */}

    <div className="col-md-7 d-flex  ps-md-5">
    <div className="title text-white ps-3 position-relative ">
      <h3 className="fa-b pt-3 pt-md-0">{title} <span>{subtitle}</span></h3>
      <p className="desc-header">{description}</p> 
    </div>
    </div>

{/* img header */}
    <div className="col-md-5 ">
    <div className="header-img text-center position-relative">
      {img}
    </div>
    </div>
    </div>


  </div>;
}
