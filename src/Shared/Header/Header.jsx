import React from "react";
import circle1 from '../../assets/images/circle1.png'
import circle2 from '../../assets/images/circle2.png'
import circle3 from '../../assets/images/circle3.png'

export default function Header({title,description,img,subtitle}) {
  return <div className="container-fluid header ">
    <div className="row header-bg m-2 justify-content-center align-items-center">
      {/* content header */}
      {/* <svg width="146" height="147" viewBox="0 0 146 147" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M133.5 73.5C133.5 107.27 106.333 134.5 73 134.5C39.6671 134.5 12.5 107.27 12.5 73.5C12.5 39.73 39.6671 12.5 73 12.5C106.333 12.5 133.5 39.73 133.5 73.5Z" stroke="white" stroke-opacity="0.05" stroke-width="25"/>
</svg> */}

    <div className="col-md-6 d-flex  ps-md-5">
    <div className="title text-white ps-3 position-relative ">
      <h3 className="fa-b pt-3 pt-md-0">{title} <span>{subtitle}</span></h3>
      <p className="desc-header">{description}</p>
 
    {/* <img src={circle1} alt="" className="position-absolute cicle1 " /> */}
    {/* <img src={circle} alt="" className="position-absolute cicle2  end-0 top-0" /> */}
    </div>
    </div>

{/* <div className="col-md-2 d-none d-md-block">
<img src={circle2} alt="" className=" cicle3 " />

</div> */}
{/* img header */}
    <div className="col-md-4 ">
    <div className="header-img text-center position-relative">
      {img}
    {/* <img src={circle3} alt="" className="position-absolute cicle3   top-50 " /> */}
    </div>
    </div>
    </div>


  </div>;
}
