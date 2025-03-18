import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { emailValidation, otpValidation } from "../../services/validations";
import { axiosPublicInstance } from "../../services/api/apiInstance";
import { Users_URLS } from "../../services/api/apiConfig";
import { toast } from "react-toastify";

export default function VerifyAccount() {

  const {state}= useLocation()
   console.log(state)

const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm({
  defaultValues:{email:state?.email},
  mode:"onChange"
})
const navigate=useNavigate()


 const onSubmit=async(values)=>{
try {
  const {data}=await axiosPublicInstance.put(Users_URLS.VERIFY_USER,values)
  console.log(data)
  toast.success(data?.message)
  navigate('/login')
} catch (error) {
  console.log(error)
  toast.error(error?.response?.data?.message||'Somthing Went Wrong')
}
 }


 
  return <>
   <div className="title my-3">
                <h3 className="h5"> Verify Account  </h3>
                <p className="text-muted">Please Enter Your Otp  or Check Your Inbox</p>
              </div>


            <form onSubmit={handleSubmit(onSubmit)} >
            {/* email input */}
            <div className="input-group mb-3">
             <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
              <i className="fa-solid fa-mobile-screen"></i>
            </span>
           </div>
           <input 
      {...register('email',emailValidation)}
            type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"/>
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
        {...register('code',otpValidation)}
          type={'text'} className="form-control pass-input" placeholder="OTP" aria-label="OTP" aria-describedby="basic-addon1"/>
          <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
        >
          </span>
            </div>
            {errors.code && <div className="mb-3 alert-danger alert">{errors.code.message}</div>}


          


              <button className=" text-white w-100 btn-form">
              {isSubmitting?  <>
                <i className="fa fa-spin fa-spinner"></i>
                <span> Sending...</span>
                </>:'Send'}
               </button>
            </form>
    
  </>
}
