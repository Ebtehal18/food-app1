import React from "react";
import Nodataimg from '../../assets/images/no-data1.png'

export default function DeleteComfirmation({selectedId,comfirmDeletion}) {

  return <>
<div className="modal  fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
   
    <div className="close-circle d-flex justify-content-center align-items-center ms-auto "     data-bs-dismiss="modal" 
    aria-label="Close"><i className="fa-solid fa-xmark btn-closemodal"></i></div>

      </div>
      <div className="modal-body text-center">
        <img src={Nodataimg} alt="no data img" />
        <div>
          <h4>Delete This Item ?</h4>
          <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" onClick={()=>comfirmDeletion(selectedId)} className="btn delete-btn "  data-bs-dismiss="modal" 
    aria-label="Close">Delete this item</button>
      </div>
    </div>
  </div>
</div>

  </>;
}
