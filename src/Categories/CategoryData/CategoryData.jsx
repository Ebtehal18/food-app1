import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addCategoryValidation } from "../../services/validations";

export default function CategoryData({show,handelClose,handleCategorySubmit,selectedCategory}) {
  
  const {register,handleSubmit,formState:{errors,isSubmitting},setValue}=useForm()
  
  const handelCloseModal=()=>  handelClose()
  useEffect(()=>{
    
    console.log(selectedCategory)
    // case of editing
  if(selectedCategory){
    setValue('name',selectedCategory?.name)
  }
  // case of adding
  else{
    setValue('name','')
  }
},[selectedCategory])


 const isEditing=selectedCategory?'Edit':"Save"
  return <>
  {/* add category modal */}
<Modal
        show={show}
        onHide={handelCloseModal}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton={false}>
          
          <Modal.Title>{selectedCategory?'Edit':'Add'} Category</Modal.Title>


          <div className="close-modal d-flex justify-content-center align-items-center" onClick={handelCloseModal}>
        <i className="fa-solid fa-xmark btn-closemodal" ></i>
        </div>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleCategorySubmit)}>
        <Modal.Body>
        <div className="input-group mb-3">
           <input   {...register('name',addCategoryValidation)}
            type="text" className="form-control" placeholder="Category Name " aria-label="Category Name" aria-describedby="basic-addon1"/>
</div>


{errors.name && <div className="alert alert-danger mt-2">{errors.name.message}</div>}


        </Modal.Body>
        <Modal.Footer>
  <button type="submit" className="btn-add px-3 py-2 " disabled={isSubmitting}>
    {isSubmitting?<>
                <i className="fa fa-spin fa-spinner"></i>
                <span> {selectedCategory?'Editing...':'Saving...'}</span>
                </>:isEditing}</button>
        </Modal.Footer>
</form>
      </Modal>
  </>
}
