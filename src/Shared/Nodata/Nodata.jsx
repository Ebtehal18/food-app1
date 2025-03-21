import React from "react";
import NoImgData from '../../assets/images/no-data1.png'
export default function Nodata() {
  return <div className="text-center">
    <img src={NoImgData} alt="no data img" />
    <h4 className="my-3">No Data !</h4>
  </div>
}
