import React from "react";
import Nodataimg from '../../assets/images/no-data1.png'
import Modal from 'react-bootstrap/Modal';

export default function DeleteComfirmation({show,handleClose,deleteFunction,isDeleting,deleteItem,AddToFav,logOut}) {



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
          {/* for deleting */}
          {deleteItem?<><h4>Delete This {deleteItem} ?</h4>
          <p>are you sure you want to delete this {deleteItem} ? if you are sure just click on delete it</p></>
          :null}
          {/* for logging out  */}
{logOut?<><h4>Are you sure you want to log out?</h4>
  <p>If you log out, you will need to sign in again to access your account.</p></>:null}
  {/* for adding  */}
{AddToFav?<>
<h4>Add This Recipe To Your Favorites? </h4>
<p>are you sure you want to add this Recipe ? if you are sure just click on add it</p>
</>:null
}

        </div>
        </Modal.Body>
        <Modal.Footer>
          {deleteItem? 
            <button type="button" 
            onClick={deleteFunction} className="btn delete-btn " disabled={isDeleting} >{isDeleting?<>
              <i className="fa fa-spin fa-spinner"></i>
              <span> Deleting...</span>
            </>:`Delete this ${deleteItem}` }</button>
            :null
        }

{logOut?<button type="button" 
        onClick={deleteFunction} className="btn delete-btn "  >
          LogOut
          </button>:null}

          
        {AddToFav?  <button type="button" 
            onClick={deleteFunction} className="btn delete-btn " disabled={isDeleting} >{isDeleting?<>
              <i className="fa fa-spin fa-spinner"></i>
              <span> Adding...</span>
            </>:`Add To Favorite List` }</button>:null}
      
        </Modal.Footer>
      </Modal>

  </>;
}
