export const emailValidation={
    required:'Email is Required',
    pattern:{
      value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message:'Please Enter a valid Email'
     }
   }



export const passwordValidation={
    required:'Password is Required',
    pattern:{
      value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
     message:"The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
   }
 }


 export const passwordComfirmValidation={
    required:'confirmPassword is Required'
   }

 export const otpValidation={
    required:'otp is Required',
    minLength:{
      value:4,
      message:"Enter min 4 characters"
     }
   }
export const addCategoryValidation={
  required:"The name field is required.",

  }
export const recipeNameValidation={
  required:"Recipe name is required"
}
export const recipeDesciption={
  required:'Recipe description is required'
}
export const recipePrice={
  required:'Recipe price is required',
  pattern:{
    value: /^\d{1,6}(\.\d{1,2})?$/, 
    message: 'Enter a valid price',
  }
}
export const recipeTagId={
  required:'Tag name is required'
}
export const recipeImage={
  required:'Recipe Image is required'
}
export const recipeCategories={
  required:'Recipe Category is required'
}