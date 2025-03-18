import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addCategoryValidation } from "../../services/validations";
import { toast } from "react-toastify";
import { Categories_URLS } from "../../services/api/apiConfig";
import { axiosPrivateInstance } from "../../services/api/apiInstance";

export default function CategoryData({show,handelClose,getAllCategories,selectedCategory}) {
  
  const {register,handleSubmit,formState:{errors,isSubmitting},setValue}=useForm()

  const handelCloseModal=()=>  handelClose()
// if it was only for editing 
// const { register } = useForm({
//   defaultValues: {
//     name: selectedCategory?.name, // No need for useEffect
//   }
// });


  
  // edit+Add category=============================
     const handleCategorySubmit=async(value)=>{
      console.log(value)
      try {
        const {data}=selectedCategory?
        await axiosPrivateInstance.put(Categories_URLS.UPDATE_CATEGORY(selectedCategory?.id),value)
        :await axiosPrivateInstance.post(Categories_URLS.CREATE_CATEGORY,value)
        console.log(data)
        handelCloseModal()
        getAllCategories()
        toast.success(selectedCategory?'Category Edited successfully':'Category Created successfully')
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message||'Somthing Went Wrong')
      }
     }
   
  

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
  {/* add category modal+ edit  */}
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
