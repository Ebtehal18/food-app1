import React from "react";
import logo from '../../assets/images/logo1.png'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {  toast } from 'react-toastify';

export default function Login() {
  const {register,formState:{errors},handleSubmit}=useForm()
  const navigate=useNavigate()
  async function onSubmit(values){
    console.log(values)
    // call api post send the data
    try {
      // nadia.mohamed.taha166@gmail.com
      // @Password321!
     const {data}=await axios.post(`https://upskilling-egypt.com:3006/api/v1/Users/Login`,values)
     console.log(data)
    //  navihate to dashboard
    navigate('/dashboard')
    toast.success('Welcome Back!')
    } catch (error) {
     toast.error(error.response.data.message)

    }
   }
  

  return <div className="auth-container">
    <div className="container-fluid bg-overlay">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-5 bg-white rounded-3 px-5 py-3 ">
          <div>
            <div className="auth-logo text-center">
              <img src={logo} alt="logo"  className="w-50"/>
            </div>
            <div className="title my-3">
              <h3 className="h5">Log In</h3>
              <p className="text-muted">Welcome Back! Please enter your details</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            {/* email input */}
            <div className="input-group mb-3">
             <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
              <i className="fa fa-envelope"></i>
            </span>
           </div>
           <input 
           {...register('email',{
            required:'Email is Required',
            pattern:{
              value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message:'Please Enter a valid Email'
            }
           })}
           type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"/>
            </div>
            {errors.email && <span className="text-danger mb-1">{errors.email.message}</span>}

            {/* password input */}
            <div className="input-group mb-3">
             <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
              <i className="fa fa-key"></i>
            </span>
           </div>
           <input 
           {...register('password',{
            required:'Password is Required',
            pattern:{
              value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
              message:"The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
            }
           })}
           type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/>
            </div>
            {errors.password && <span className="text-danger">{errors.password.message}</span>}
              <div className="links d-flex justify-content-between my-3">
              <Link to={'/register'} className="text-black text-decoration-none">Register Now?</Link>
              <Link to={'/forget-pass'} className="text-success text-decoration-none">Forgot Password?</Link>
              </div>
              <button className="btn btn-success w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
}
