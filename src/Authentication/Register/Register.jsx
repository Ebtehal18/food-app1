import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Register() {
  const {register,handleSubmit,formState:{errors},}=useForm();

  const onSubmit=async(values)=>{


  }
  return   <>
                 <div className="title my-3">
                  <h3 className="h5">Register</h3>
                  <p className="text-muted">Welcome Back! Please enter your details</p>
                </div>
  
  
              <form >
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
            {...register('userName')}
              type="text" className="form-control" placeholder="UserName" aria-label="usrname" aria-describedby="basic-addon1"/>
              </div>
              {/* {errors.email && <div className=" mb-3 alert-danger alert">{errors.email.message}</div>} */}
  
              {/* country input */}
                <div className="input-group mb-3">
               <div className="input-group-prepend">
                <span className="input-group-text h-100" id="basic-addon1">
                <i className="fa-solid fa-earth-africa"></i>
              </span>
             </div>
             <input 
            {...register('')}
              type="text" className="form-control" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1"/>
              </div>
              {/* {errors.email && <div className=" mb-3 alert-danger alert">{errors.email.message}</div>} */}

              
              {/* password input */}
              <div className="input-group mb-3 ">
               <div className="input-group-prepend">
                <span className="input-group-text h-100" id="basic-addon1">
                <i className="fa fa-key"></i>
              </span>
             </div>
             <input 
           {...register('')}
            className="form-control pass-input" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
            <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
            // onClick={()=>setShowPassword(!showPassword)}
            >
             <i className={`fa-solid fa-eye`}></i>
            </span>
              </div>
              {/* {errors.password && <div className="mb-3 alert-danger alert">{errors.password.message}</div>} */}
  
  
          
  
           
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
            {...register('email')}
              type="email" className="form-control" placeholder="Enter your E-mail" aria-label="Email" aria-describedby="basic-addon1"/>
              </div>
              {/* {errors.email && <div className=" mb-3 alert-danger alert">{errors.email.message}</div>} */}
  
             {/* PhoneNumber input */}
             <div className="input-group mb-3">
               <div className="input-group-prepend">
                <span className="input-group-text h-100" id="basic-addon1">
                <i className="fa-solid fa-phone"></i>
              </span>
             </div>
             <input 
            {...register('')}
              type="number" className="form-control" placeholder="PhoneNumber" aria-label="PhoneNumber" aria-describedby="basic-addon1"/>
              </div>
              {/* {errors.email && <div className=" mb-3 alert-danger alert">{errors.email.message}</div>} */}
             
             {/* comfirmpassword input */}
             <div className="input-group mb-3 ">
               <div className="input-group-prepend">
                <span className="input-group-text h-100" id="basic-addon1">
                <i className="fa fa-key"></i>
              </span>
             </div>
             <input 
           {...register('')}
            className="form-control pass-input" placeholder="confirm-password" aria-label="confirm-password" aria-describedby="basic-addon1"/>
            <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
            // onClick={()=>setShowPassword(!showPassword)}
            >
             <i className={`fa-solid fa-eye`}></i>
            </span>
              </div>
              {/* {errors.password && <div className="mb-3 alert-danger alert">{errors.password.message}</div>} */}
  
              
            </div>
            <div className="links my-3 ms-auto login">
                <Link to={'/login'} className="text-forget text-decoration-none">Login Now?</Link>
                </div>
                <button  className=" text-white w-100 btn-form">
                  Register
                 </button>
  
          </div>
              </form>
      
    
            </>
}
