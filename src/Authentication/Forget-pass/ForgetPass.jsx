import React from "react";
import {  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  toast } from 'react-toastify';
import { emailValidation } from "../../services/validations";
import { axiosPublicInstance } from "../../services/api/apiInstance";
import { Users_URLS } from "../../services/api/apiConfig";


export default function ForgetPass() {
  const {register,formState:{errors,isSubmitting},handleSubmit}=useForm()
  const navigate=useNavigate()




  async function onSubmit(values){
    console.log(values)
    // call api post send the data
    try {
     const {data}=await axiosPublicInstance.post(Users_URLS.FORGET_PASSWORD,values)
     console.log(data)
    //  navihate to dashboard
    toast.success(data?.message)
    navigate('/reset-password',{state:{email:values.email}})
    } catch (error) {
      console.log(error)
     toast.error(error?.response?.data?.message)

    }
   }
  

  return <> 
             <div className="title my-3">
                <h3 className="h5">Forgot Your Password?</h3>
                <p className="text-muted">No worries! Please enter your email and we will send a password reset link </p>
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
            type="email" className="form-control" placeholder="Enter your email" aria-label="Email" aria-describedby="basic-addon1"/>
            </div>
            {errors.email && <div className="mb-3 alert-danger alert">{errors.email.message}</div>}

       
              <button className=" btn-form text-white w-100" disabled={isSubmitting}> 
                {isSubmitting?<>
                <i className="fa fa-spin fa-spinner"></i>
                <span> Loading...</span>
                </>:'Submit'}</button>
            </form>
          </>
     
      }
