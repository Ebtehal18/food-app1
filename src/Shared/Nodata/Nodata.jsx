import React from "react";
import NoImgData from '../../assets/images/no-data1.png'
export default function Nodata() {
  return <div >
    <img src={NoImgData} alt="no data img" />
    <h4 className="my-3">No Data !</h4>
    <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
  </div>;
}
