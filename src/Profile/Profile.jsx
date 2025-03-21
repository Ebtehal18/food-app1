import React, { useEffect, useState } from "react";
import categoryImgHeader from '../assets/images/categoryimg-header.svg';
import Header from "../Shared/Header/Header";
import uploadIcon from "../assets/images/upload.png";

import { DropzoneArea } from "mui-file-dropzone";
import { UseAuthContext } from "../context/authContext";
import { useForm } from "react-hook-form";
import { axiosPrivateInstance, imgURL } from "../services/api/apiInstance";
import { Users_URLS } from "../services/api/apiConfig";
import { toast } from "react-toastify";
import { CountryValidation, emailValidation, PassComfirmValidation, PhoneValidation, UserNameValidation } from "../services/validations";

export default function Profile() {
    const [files,setFiles]=useState([])
    const {currentUser,getCurrentUser}=UseAuthContext()
     const [showPassword,setShowPassword]=useState(false)
    const {handleSubmit,register,formState:{errors,isSubmitting},setValue}=useForm({
      mode:'onChange'
    })
    

    const onSubmit=async(values)=>{
     const formData=new FormData()
     console.log(values)
     for(let key in values){
        formData.append(key,values[key])
     }
     try {
        const {data}=await axiosPrivateInstance.put(Users_URLS.UPDATE_CURRENT_PROFILE,formData)
        console.log(data)
        toast.success('Profile Updated Successfully')
        // to update the user 
        await getCurrentUser()
     } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message||'Somthing Went Wrong')
     }

    }
    const handelImage=(files)=>{
    console.log(files[0])
    if (files){
        setValue('profileImage',files[0])
    }
    }



    useEffect(() => {
        (async () => {
          await getCurrentUser(); 
        })();
      }, []);
      
      useEffect(() => {
        (async ()=>{
            if (currentUser) {
                console.log(currentUser)
                setValue("userName", currentUser?.userName);
                setValue("email", currentUser?.email);
                setValue("country", currentUser?.country);
                setValue("phoneNumber", currentUser?.phoneNumber);
                if(currentUser?.imagePath){
                    const fileUrl=`${imgURL}/${currentUser?.imagePath}`
                
                    const response=await fetch(fileUrl)
                    const blob =await response.blob()
                    const file = new File([blob], "recipeImage.jpg", { type: blob.type })
                    setFiles(file)
                    setValue("profileImage", file);
                }
              }
        })()
       
      }, [currentUser]);

   
    

return <>
   <Header 
            title={'My Profile'} 
            img={<img src={categoryImgHeader} alt="category header img"/>}
       
        />

        <div className="container profile">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="register-img mb-3">
                          
                        <DropzoneArea
                          acceptedFiles={["image/*"]}
                          key={files.length}
                          dropzoneText="Drag & Drop or Choose an Item Image to Upload"
                          onChange={handelImage}
                          initialFiles={[files]}
                          filesLimit={1}
                          Icon={() => <img src={uploadIcon} alt="Upload" width="30"className="mb-2" />}
                        
                              /> 
                        </div>
                             <div className="input-group mb-3">
                                         <div className="input-group-prepend">
                                          <span className="input-group-text h-100" id="basic-addon1">
                                          <i className="fa-solid fa-user"></i>
                                        </span>
                                       </div>
                                       <input 
                                       {...register('userName',UserNameValidation)}
                                        type="text" className="form-control" placeholder="Enter your Name" aria-label="Email" aria-describedby="basic-addon1"/>
                                        </div>
                                        {errors.userName && <div className=" mb-3 alert-danger alert">{errors.userName.message}</div>}
                            <div className="input-group mb-3">
                                         <div className="input-group-prepend">
                                          <span className="input-group-text h-100" id="basic-addon1">
                                          <i className="fa-solid fa-mobile-screen"></i>
                                        </span>
                                       </div>
                                       <input 
                                       {...register('email',emailValidation)}
                                        type="text" className="form-control" placeholder="Enter your Email" aria-label="Email" aria-describedby="basic-addon1"/>

                                        </div>
                                        {errors.email && <div className=" mb-3 alert-danger alert">{errors.email.message}</div>}

                            <div className="input-group mb-3">
                                         <div className="input-group-prepend">
                                          <span className="input-group-text h-100" id="basic-addon1">
                                          <i className="fa-solid fa-earth-africa"></i>
                                        </span>
                                       </div>
                                       <input 
                                       {...register('country',CountryValidation)}
                                        type="text" className="form-control" placeholder="Enter your country" aria-label="Email" aria-describedby="basic-addon1"/>
                             </div>
                             {errors.country && <div className=" mb-3 alert-danger alert">{errors.country.message}</div>}

                             <div className="input-group mb-3">
                                         <div className="input-group-prepend">
                                          <span className="input-group-text h-100" id="basic-addon1">
                                          <i className="fa-solid fa-mobile-screen"></i>
                                        </span>
                                       </div>
                                       <input 
                                       {...register('phoneNumber',PhoneValidation)}
                                        type="text" className="form-control" placeholder="Enter your phoneNumber" aria-label="Email" aria-describedby="basic-addon1"/>
                             </div>
                          
                             {errors.phoneNumber && <div className=" mb-3 alert-danger alert">{errors.phoneNumber.message}</div>}

                             <div className="input-group mb-3">
                                         <div className="input-group-prepend">
                                          <span className="input-group-text h-100" id="basic-addon1">
                                          <i className="fa-solid fa-lock"></i>
                                        </span>
                                       </div>
                                       <input 
                                       {...register('confirmPassword',PassComfirmValidation)}
                                        type={showPassword?'text':'password'} className="form-control" placeholder="Enter your confirmPassword" aria-label="Email" aria-describedby="basic-addon1"/>
                                          <span className="btn btn-outline-secondary  border-start-0 border-secoundry-subtle" type='button'
          onClick={()=>setShowPassword(!showPassword)}
          >
           <i className={`fa-solid ${showPassword?"fa-eye":"fa-eye-slash"}`}></i>
          </span>
                             </div>
                             {errors.confirmPassword && <div className=" mb-3 alert-danger alert">{errors.confirmPassword.message}</div>}
                             <button className="btn-add w-100 px-2 py-2 mb-3" disabled={isSubmitting}>{isSubmitting?<>
                <i className="fa fa-spin fa-spinner"></i>
                <span> Updating...</span>
                </>:'Update Profile'}</button>
                    </form>
                </div>
            </div>
        </div>
  </>;
}
// files/users/images/873notfound2.png