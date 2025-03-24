import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CountryValidation, emailValidation, passwordComfirmValidation, passwordValidation, PhoneValidation, UserNameValidation } from "../../services/validations";
import { toast } from "react-toastify";
import { axiosPublicInstance } from "../../services/api/apiInstance";
import { Users_URLS } from "../../services/api/apiConfig";
import { DropzoneArea } from "mui-file-dropzone";
import uploadIcon from "../../assets/images/upload.png"; 



export default function Register() {
  const [showPassword,setShowPassword]=useState(false)
  const [showComfirmPassword,setShowComfirmPassword]=useState(false)
  const {register,handleSubmit,formState:{errors,isSubmitting},watch,trigger,setValue}=useForm({
    mode:"onChange"
    
  });
  const navigate=useNavigate()



  const onSubmit=async(values)=>{


    const formData=new FormData()
    for(let key in values){
      if(values.profileImage){
        formData.append(key,values[key])
      }
      else{
        formData.append(key,values[key])
      }
    }
    // to see formatedata
const entries = Object.fromEntries(formData.entries());
console.log(entries)
try {
  const {data}=await axiosPublicInstance.post(Users_URLS.REGISTER,formData)
console.log(data)
toast.success(data?.message)
navigate('/verify-account',{state:{email:values.email}})
} catch (error) {
  console.log(error)
  toast.error(error?.response?.data?.message||'Something Went Wrong')
}

  }

  const password = watch("password");
  const comfirmPassword=watch('confirmPassword')
    useEffect(()=>{  
      if(comfirmPassword)
      trigger('confirmPassword') // Re-validate confirmPassword whenever it changes or the password changes
    },[password,comfirmPassword,trigger])



    const handelImage=(files)=>{
if(files[0]){
  setValue('profileImage',files[0])
}
    }
  return   <>
                 <div className="title my-3">
                  <h3 className="h5">Register</h3>
                  <p className="text-muted">Welcome Back! Please enter your details</p>
                </div>
  
  
              <form  onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
                  {/* username input */}
                  <div className="input-group mb-3">
               <div className="input-group-prepend">
                <span className="input-group-text h-100" id="basic-addon1">
                <i className="fa-solid fa-circle-user" ></i>
              </span>
             </div>
             <input 
            {...register('userName',UserNameValidation)}
              type="text" className="form-control" placeholder="UserName" aria-label="usrname" aria-describedby="basic-addon1"/>
              </div>
              {errors.userName  ? <div className=" mb-3 alert-danger alert">{errors.userName.message}</div>:null}
  
              {/* country input */}
                <div className="input-group mb-3">
               <div className="input-group-prepend">
                <span className="input-group-text h-100" id="basic-addon1">
                <i className="fa-solid fa-earth-africa"></i>
              </span>
             </div>
             <input 
            {...register('country',CountryValidation)}
              type="text" className="form-control" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1"/>
              </div>
              {errors.country ? <div className=" mb-3 alert-danger alert">{errors.country.message}</div>:null}

              
              {/* password input */}
              <div className="input-group mb-3 ">
               <div className="input-group-prepend">
                <span className="input-group-text h-100" id="basic-addon1">
                <i className="fa fa-key"></i>
              </span>
             </div>
             <input 
           {...register('password',passwordValidation)}
           type={showPassword?'text':'password'}
            className="form-control pass-input" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
            <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
            onClick={()=>setShowPassword(!showPassword)}
            >
               <i className={`fa-solid ${showPassword?"fa-eye":"fa-eye-slash"}`}></i>
               <span className="sr-only">
      {showPassword ? "Hide password" : "Show password"}
    </span>
            </span>
              </div>
              {errors.password ? <div className="mb-3 alert-danger alert">{errors.password.message}</div>:null}
  
  
          
  
           
            </div>
            <div className="col-md-6">
                  {/* email input */}
                  <div className="input-group mb-3">
               <div className="input-group-prepend">
                <span className="input-group-text h-100" id="basic-addon1">
                <i className="fa-solid fa-mobile-screen"></i>
              </span>
             </div>
             <input 
            {...register('email',emailValidation)}
              type="email" className="form-control" placeholder="Enter your E-mail" aria-label="Email" aria-describedby="basic-addon1"/>
              </div>
              {errors.email ? <div className=" mb-3 alert-danger alert">{errors.email.message}</div>:null }
  
             {/* PhoneNumber input */}
             <div className="input-group mb-3">
               <div className="input-group-prepend">
                <span className="input-group-text h-100" id="basic-addon1">
                <i className="fa-solid fa-phone"></i>
              </span>
             </div>
             <input 
            {...register('phoneNumber',PhoneValidation)}
              type="number" className="form-control" placeholder="PhoneNumber" aria-label="PhoneNumber" aria-describedby="basic-addon1"/>
              </div>
              {errors.phoneNumber ? <div className=" mb-3 alert-danger alert">{errors.phoneNumber.message}</div>:null}
             
             {/* comfirmpassword input */}
             <div className="input-group mb-3 ">
               <div className="input-group-prepend">
                <span className="input-group-text h-100" id="basic-addon1">
                <i className="fa fa-key"></i>
              </span>
             </div>
             <input 
           {...register('confirmPassword',{
            ...passwordComfirmValidation,
            validate:(value)=>value===watch('password')||'Passwords do not match'
           })}
           type={showComfirmPassword?'text':"password"}
            className="form-control pass-input" placeholder="confirm-password" aria-label="confirm-password" aria-describedby="basic-addon1"/>
            <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
            onClick={()=>setShowComfirmPassword(!showComfirmPassword)}
            >
              <i className={`fa-solid ${showComfirmPassword?"fa-eye":"fa-eye-slash"}`}></i>
              <span className="sr-only">
      {showComfirmPassword ? "Hide password" : "Show password"}
    </span>
            </span>
              </div>
              {errors.confirmPassword ? <div className="mb-3 alert-danger alert">{errors.confirmPassword.message}</div>:null}
  
              
            </div>
<div className="register-img">
  
<DropzoneArea
  acceptedFiles={["image/*"]}
  dropzoneText="Drag & Drop or Choose an Item Image to Upload"
  onChange={handelImage}
  filesLimit={1}
  Icon={() => <img src={uploadIcon} alt="Upload" width="30"className="mb-2" />}

      /> 
</div>
            <div className="links my-3 d-flex justify-content-end">
                <Link to={'/login'} className="text-forget text-decoration-none">Login Now?</Link>
                </div>
             
  
          </div>
          <button  className=" text-white w-100 btn-form" disabled={isSubmitting}>
        {isSubmitting?  <>
                <i className="fa fa-spin fa-spinner"></i>
                <span> Loading...</span>
                </>:'Register'}  
                 </button>
              </form>
      
    
            </>
}
