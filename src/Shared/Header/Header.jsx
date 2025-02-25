import React from "react";
import circle1 from '../../assets/images/circle1.png'
import circle2 from '../../assets/images/circle2.png'
import circle3 from '../../assets/images/circle3.png'

export default function Header({title,description,img,subtitle}) {
  return <div className="container-fluid header ">
    <div className="row header-bg m-2 justify-content-center align-items-center">
      {/* content header */}
    <div className="col-md-6 d-flex  ps-5">
    <div className="title text-white ps-3 position-relative ">
      <h3 className="fa-b">{title} <span>{subtitle}</span></h3>
      <p className="desc-header">{description}</p>
    <img src={circle1} alt="" className="position-absolute cicle1 " />
    {/* <img src={circle} alt="" className="position-absolute cicle2  end-0 top-0" /> */}
    </div>
    </div>

<div className="col-md-2">
<img src={circle2} alt="" className=" cicle3 " />

</div>
{/* img header */}
    <div className="col-md-4 ">
    <div className="header-img text-center position-relative">
      {img}
    <img src={circle3} alt="" className="position-absolute cicle3   top-50 " />
    </div>
    </div>
    </div>


  </div>;
}
