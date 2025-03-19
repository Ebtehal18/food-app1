import React from "react";
import Nodataimg from '../../assets/images/no-data1.png'
import Modal from 'react-bootstrap/Modal';
import { useLocation } from "react-router-dom";

export default function DeleteComfirmation({show,handleClose,deleteFunction,isDeleting,deleteItem}) {



  return <>
   <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered   
      >
        <Modal.Header closeButton={false}>


        <div className="close-modal d-flex justify-content-center align-items-center ms-auto" onClick={handleClose}>
        <i className="fa-solid fa-xmark btn-closemodal" ></i>
        </div>
        </Modal.Header>
        <Modal.Body>
        <img src={Nodataimg} alt="no data img" />
        <div>
          {deleteItem?<><h4>Delete This {deleteItem} ?</h4>
          <p>are you sure you want to delete this {deleteItem} ? if you are sure just click on delete it</p></>
          :<>
          <h4>Are you sure you want to log out?</h4>
          <p>If you log out, you will need to sign in again to access your account.</p>
          </>}
        </div>
        </Modal.Body>
        <Modal.Footer>
          {deleteItem? 
            <button type="button" 
            onClick={deleteFunction} className="btn delete-btn " disabled={isDeleting} >{isDeleting?<>
              <i className="fa fa-spin fa-spinner"></i>
              <span> Deleting...</span>
            </>:`Delete this ${deleteItem}` }</button>:<button type="button" 
        onClick={deleteFunction} className="btn delete-btn "  >
          LogOut
          </button>
        }
      
        </Modal.Footer>
      </Modal>

  </>;
}
