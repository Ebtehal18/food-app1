import React, { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import DashImgHeader from '../../assets/images/dashimg-header.png'
import HeaderDetails from "../../Shared/HeaderDetails/HeaderDetails";
import logo from '../../assets/images/logo-change.png'
import { useForm } from "react-hook-form";
import { passwordComfirmValidation, passwordValidation } from "../../services/validations";
import { axiosPrivateInstance, Users_URLS } from "../../services/urls/urls";
import { toast } from "react-toastify";

export default function ChangePass() {
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

  return <div div className="position-relative">
  <Header 
    title={'Welcome'} 
    img={<img src={DashImgHeader} alt="dashboard header img" className="w-75"/>}
    subtitle={'ebtehal!'}
    description={'This is a welcoming screen for the entry of the application , you can now see the options'} />

     <HeaderDetails title={'Fill the Recipes !'} 
      
        subtitle={'you can now fill the meals easily using the table and form , click here and sill it with the table !'}
        to={'/dashboard/recipes'}
        />

        
         <div className="row w-100 z-2 position-absolute translate-middle top-50 start-50 justify-content-center align-items-center ">
                  <div className="col-md-5 bg-white rounded-3 px-5 py-3 ">
                    <div>
                      <div className="auth-logo text-center">
                        <img src={logo} alt="logo"  className='logo'/>
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
  <div/>
  </div>
}
