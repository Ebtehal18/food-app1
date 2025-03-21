import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { passwordComfirmValidation, passwordValidation } from "../../services/validations";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { axiosPrivateInstance } from "../../services/api/apiInstance";
import { Users_URLS } from "../../services/api/apiConfig";

import logo from '../../assets/images/logo-change.png'
import { UseAuthContext } from "../../context/authContext";


export default function ChangePass({show,handleClose,logOut}) {
const [showOldPass,setShowPass]=useState(false)
const [showNewPass,setShowNewPass]=useState(false)
const [showComfirmNewPass,setshowComfirmNewPass]=useState(false)

const {register,formState:{errors,isSubmitting},handleSubmit,watch,trigger}=useForm({
    mode:"onChange"
  })

async function onSubmit(values){
  console.log(values)
try {
  const {data}=await axiosPrivateInstance.put(Users_URLS.CHANGE_PASSWORD,values)
  console.log(data)
  logOut()
   toast.success(data?.message)
} catch (error) {
  console.log(error)
    toast.error(error?.response?.data?.message)
}

}
 const newpassword = watch("newPassword");
  const comfirmPassword=watch('confirmNewPassword')

  useEffect(()=>{
    if(comfirmPassword)
    trigger('confirmNewPassword')
  },[newpassword,comfirmPassword,trigger])

  return <>
 
         <Modal show={show} onHide={handleClose}>
      
      <Modal.Body>
      <div className="row  z-2 auth w-100">
                  <div className="col-md-5 bg-white rounded-3 px-5 py-3 w-100 ">
                    <div>
                      <div className="auth-logo text-center">
                        <img src={logo} alt="logo"  className='logo w-50'/>
                      </div>
                      </div>
                      <div className="title my-3">
                <h3 className="h5"> Change Your Password</h3>
                <p className="text-muted">Enter your details below</p>
              </div>
                   <form onSubmit={handleSubmit(onSubmit)}>
                    {/* old password */}
               <div className="input-group mb-3">
             <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
              <i className="fa fa-key"></i>
            </span>
           </div>
           <input 
           {...register('oldPassword',passwordValidation)}
            type={showOldPass?'text':'password'} className="form-control" placeholder="Old Password" aria-label="Old Password" aria-describedby="basic-addon1"/>
            <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
          onClick={()=>setShowPass(!showOldPass)}
          >
           <i className={`fa-solid ${showOldPass?"fa-eye":"fa-eye-slash"}`}></i>
           <span className="sr-only">
      {showOldPass ? "Hide password" : "Show password"}
    </span>
          </span>
    
            </div>
            {errors.oldPassword && <div className="mb-3 alert-danger alert">{errors.oldPassword.message}</div>}
{/* new password */}
            <div className="input-group mb-3">
             <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
              <i className="fa fa-key"></i>
            </span>
           </div>
           <input 
           {...register('newPassword',passwordValidation)}
            type={showNewPass?'text':'password'} className="form-control" placeholder="New Password" aria-label="New Password" aria-describedby="basic-addon1"/>
            <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
          onClick={()=>setShowNewPass(!showNewPass)}
          >
           <i className={`fa-solid ${showNewPass?"fa-eye":"fa-eye-slash"}`}></i>
           <span className="sr-only">
      {showNewPass ? "Hide password" : "Show password"}
    </span>
          </span>
            </div>

            {errors.newPassword && <div className="mb-3 alert-danger alert">{errors.newPassword.message}</div>}
 {/*Confirm New Password  */}
 <div className="input-group mb-3">
             <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
              <i className="fa fa-key"></i>
            </span>
           </div>
           <input 
           {...register('confirmNewPassword',{
                       ...passwordComfirmValidation,
                       validate:(value)=> value === watch('newPassword') || "Passwords do not match"
                       
                      })}
            type={showComfirmNewPass?'text':'password'} className="form-control" placeholder="Confirm New Password" aria-label="Confirm New Password" aria-describedby="basic-addon1"/>
            <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
          onClick={()=>setshowComfirmNewPass(!showComfirmNewPass)}
          >
           <i className={`fa-solid ${showComfirmNewPass?"fa-eye":"fa-eye-slash"}`}></i>
           <span className="sr-only">
      {showComfirmNewPass ? "Hide password" : "Show password"}
    </span>
          </span>
            </div>

            {errors.confirmNewPassword && <div className="mb-3 alert-danger alert">{errors.confirmNewPassword.message}</div>}
            
            <button className="py-2 px-3 rounded-2 btn-form text-white  w-100" disabled={isSubmitting}>
              {isSubmitting?<>
                <i className="fa fa-spin fa-spinner"></i>
                <span> Loading...</span>
                </>:'Change Password'}</button>
                   </form>

        </div>
      </div>
      </Modal.Body>
     
    </Modal>
      
  </>

}
