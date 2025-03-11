import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  toast } from 'react-toastify';
import { emailValidation, otpValidation, passwordComfirmValidation, passwordValidation } from "../../services/validations";
import { axiosPublicInstance } from "../../services/api/apiInstance";
import { Users_URLS } from "../../services/api/apiConfig";

export default function ResetPass() {
    const [showPassword,setShowPassword]=useState(false)
    const [showComfirmPassword,setShowComfirmPassword]=useState(false)

    const {state}=useLocation()
    // console.log(state)
  // to change the show error message in writing 
  const {register,formState:{errors,isSubmitting},handleSubmit,watch,trigger}=useForm({defaultValues:{email:state?.email}},{
    mode:"onChange"
  })

  const navigate=useNavigate()
  const password = watch("password");
  const comfirmPassword=watch('confirmPassword')

  useEffect(()=>{
  
    if(comfirmPassword)
    trigger('confirmPassword') // Re-validate confirmPassword whenever it changes or the password changes
  },[password,comfirmPassword,trigger])


  async function onSubmit(values){
    console.log(values)
    // call api post send the data
    try {
     const {data}=await axiosPublicInstance.post(Users_URLS.RESET_PASSWORD,values)
     console.log(data)
    //  navihate to dashboard
    toast.success(data?.message)
    navigate('/login')
    } catch (error) {
      console.log(error)
     toast.error(error?.response?.data?.message)

    }
   }
  

  return <>
            <div className="title my-3">
                <h3 className="h5"> Reset  Password</h3>
                <p className="text-muted">Please Enter Your Otp  or Check Your Inbox</p>
              </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            {/* email input */}
            <div className="input-group mb-3">
             <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
              <i class="fa-solid fa-mobile-screen"></i>
            </span>
           </div>
           <input 
           {...register('email',emailValidation)}
           disabled
            type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"/>
            </div>
            {errors.email && <div className="mb-3 alert-danger alert">{errors.email.message}</div>}
            {/* otp input */}
             <div className="input-group mb-3">
             <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
              <i className="fa fa-key"></i>
            </span>
           </div>
           <input 
           {...register('seed',otpValidation)}
            type="text" className="form-control" placeholder="OTP" aria-label="otp" aria-describedby="basic-addon1"/>
            </div>
            {errors.seed && <div className="mb-3 alert-danger alert">{errors.seed.message}</div>}
               {/* password input */}

               <div className="input-group mb-3">
             <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
              <i className="fa fa-key"></i>
            </span>
           </div>
           <input 
           {...register('password',passwordValidation)}
            type={showPassword?'text':'password'} className="form-control" placeholder="New Password" aria-label="New Password" aria-describedby="basic-addon1"/>
            <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
          onClick={()=>setShowPassword(!showPassword)}
          >
           <i className={`fa-solid ${showPassword?"fa-eye":"fa-eye-slash"}`}></i>
          </span>
            </div>
            {errors.password && <div className="mb-3 alert-danger alert">{errors.password.message}</div>}
               {/*comfirm password input */}
               <div className="input-group mb-3">
             <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
              <i className="fa fa-key"></i>
            </span>
           </div>
           <input 
           {...register('confirmPassword',{
            ...passwordComfirmValidation,
            validate:(value)=> value === watch('password') || "Passwords do not match"
            
           })}
            type={showComfirmPassword?"text":"password"} className="form-control" placeholder="Confirm New Password" aria-label="Confirm New Password" aria-describedby="basic-addon1"/>
            <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
          onClick={()=>setShowComfirmPassword(!showComfirmPassword)}
          >
           <i className={`fa-solid ${showComfirmPassword?"fa-eye":"fa-eye-slash"}`}></i>
          </span>
            </div>
            {errors.confirmPassword && <div className="mb-3 alert-danger alert">{errors.confirmPassword.message}</div>}
       
              <button className=" btn-form text-white  w-100" disabled={isSubmitting}>
              {isSubmitting?<>
                <i className="fa fa-spin fa-spinner"></i>
                <span> Loading...</span>
                </>:'Reset Password'}</button>
            </form>
            </>
  
      }
      