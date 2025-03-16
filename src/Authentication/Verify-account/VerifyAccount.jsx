import React from "react";

export default function VerifyAccount() {
  return <>
   <div className="title my-3">
                <h3 className="h5"> Verify Account  </h3>
                <p className="text-muted">Please Enter Your Otp  or Check Your Inbox</p>
              </div>


            <form >
            {/* email input */}
            <div className="input-group mb-3">
             <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
              <i className="fa-solid fa-mobile-screen"></i>
            </span>
           </div>
           <input 
      
            type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"/>
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
        
          type={'text'} className="form-control pass-input" placeholder="OTP" aria-label="OTP" aria-describedby="basic-addon1"/>
          <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
          // onClick={()=>setShowPassword(!showPassword)}
          >
           {/* <i className={`fa-solid ${showPassword?"fa-eye":"fa-eye-slash"}`}></i> */}
          </span>
            </div>
            {/* {errors.password && <div className="mb-3 alert-danger alert">{errors.password.message}</div>} */}


          


              <button className=" text-white w-100 btn-form">
               Send</button>
            </form>
    
  </>
}
