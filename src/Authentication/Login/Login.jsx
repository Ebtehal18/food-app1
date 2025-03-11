import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  toast } from 'react-toastify';
import { emailValidation, passwordValidation } from "../../services/validations";
import { UseAuthContext } from "../../context/authContext";
import { axiosPublicInstance } from "../../services/api/apiInstance";
import { Users_URLS } from "../../services/api/apiConfig";




export default function Login() {
 const {fillAdminData}= UseAuthContext()

  const [showPassword,setShowPassword]=useState(false)
  const {register,formState:{errors,isSubmitting},handleSubmit}=useForm()

  const navigate=useNavigate()
  async function onSubmit(values){
    console.log(values)
    // call api post send the data
    try {
   
     const {data}=await axiosPublicInstance.post(Users_URLS.LOGIN,values)
     console.log(data)
     localStorage.setItem('token',data?.token)
     
     fillAdminData()

     
     toast.success('Welcome Back!')
     //  navigate to dashboard
    navigate('/dashboard')
    } catch (error) {
      // console
     toast.error(error?.response?.data?.message)

    }
   }
  

  return <>
               <div className="title my-3">
                <h3 className="h5">Log In</h3>
                <p className="text-muted">Welcome Back! Please enter your details</p>
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
            type="email" className="form-control" placeholder="Enter your E-mail" aria-label="Email" aria-describedby="basic-addon1"/>
            </div>
            {errors.email && <div className=" mb-3 alert-danger alert">{errors.email.message}</div>}

            {/* password input */}
            <div className="input-group mb-3 ">
             <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
              <i className="fa fa-key"></i>
            </span>
           </div>
           <input 
           {...register('password',passwordValidation)}
          type={showPassword?'text':'password'} className="form-control pass-input" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
          <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
          onClick={()=>setShowPassword(!showPassword)}
          >
           <i className={`fa-solid ${showPassword?"fa-eye":"fa-eye-slash"}`}></i>
          </span>
            </div>
            {errors.password && <div className="mb-3 alert-danger alert">{errors.password.message}</div>}


              <div className="links d-flex justify-content-between my-3">
              <Link to={'/register'} className="text-black text-decoration-none">Register Now?</Link>
              <Link to={'/forget-password'} className="text-forget text-decoration-none">Forgot Password?</Link>
              </div>


              <button disabled={isSubmitting} className=" text-white w-100 btn-form">
                {isSubmitting?<>
                <i className="fa fa-spin fa-spinner"></i>
                <span> Loading...</span>
                </>:'Login'}</button>
            </form>
    
  
          </>
}
