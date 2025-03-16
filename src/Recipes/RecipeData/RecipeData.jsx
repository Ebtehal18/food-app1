import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { data, Link, useNavigate, useParams } from "react-router-dom";
import { axiosPrivateInstance, imgURL } from "../../services/api/apiInstance";
import { Categories_URLS, Recipes_URLS, Tag_URl } from "../../services/api/apiConfig";
import { recipeCategories, recipeDesciption, recipeNameValidation, recipePrice, recipeTagId } from "../../services/validations";
import { toast } from "react-toastify";
import Loading from "../../Shared/Loading/Loading";
import { DropzoneArea } from "mui-file-dropzone";



export default function RecipeData() {
  const {recipeId}=useParams()
  const navigate=useNavigate()
  const [tags,setTags]=useState([])
  const [categories,setCategories]=useState([])
  const {register,handleSubmit,formState:{errors,isSubmitting},setValue,setError,clearErrors,getValues}=useForm({
    mode:"onChange"
  })
  const [loading,setIsLoading]=useState(recipeId?true:false)
const [fileObjects, setFileObjects] = useState([]);

const isFirstRender = useRef(true);




const  onSubmit=async(values)=>{

  // formData.append('name',values.name)
  // formData.append('description',values.description)
  // formData.append('price',values.price)
  // formData.append('categoriesIds',values.categoriesIds)
  // formData.append('tagId',values.tagId)
  // formData.append('recipeImage',values.recipeImage[0])

if(!values.recipeImage){
  setError("recipeImage", { type: "manual", message: "Image is required" });
  return
}

  const formData=new FormData()

  for (let key in values) {
  if (key==='recipeImage'&& values[key]?.length > 0) formData.append(key,values[key][0])
  else formData.append(key,values[key])
}

console.log(values)
try {
  const {data}= recipeId?
   await axiosPrivateInstance.put(Recipes_URLS.UPDATE_RECIPE(recipeId),formData)
  :await axiosPrivateInstance.post(Recipes_URLS.CREATE_RECIPE,formData)

  console.log(data)
  toast.success(recipeId?'The Recipe updated successfully':'The Recipe created successfully')
  navigate("/dashboard/recipes")
} catch (error) {
  console.log(error)
  toast.error(error?.message)
}
  }
  // get all tags
  const getTags=async()=>{
    try {
      const {data}=await axiosPrivateInstance.get(Tag_URl.GET_TAGS)
      // console.log(data)
      setTags(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  // get all categories
  const getAllCategories=async(pageSize,pageNumber)=>{
    try {
         const {data}=await axiosPrivateInstance.get(Categories_URLS.GET_CATEGORIES,{
          params:{
            pageSize,
            pageNumber
          }
         })
        //  console.log(data)
         setCategories(data?.data)
        } catch (error) {
          console.log(error)
        }
}

  useEffect(()=>{
    (async()=>{
    await getAllCategories(100000,1)
    await getTags()
      // edit recipe
      // get first the recipe
      if(recipeId){
      const getRecipe=async()=>{
        setIsLoading(true)
        try {
             const {data}=await axiosPrivateInstance.get(Recipes_URLS.GET_RECIPE(recipeId))
             console.log(data)
             setValue('name',data?.name)
             setValue('price',data?.price)
             setValue('tagId',data?.tag?.id)
             setValue('categoriesIds',data?.category?.[0].id)
             setValue("description",data?.description)
      // if(data?.imagePath){
      //   const fileUrl = `${imgURL}/${data.imagePath}`;

      //   const fakeFile = {
      //     data: fileUrl, 
      //     file: new File([], "preview.jpg"), 
      //   };
      
      //   console.log(fakeFile);
        
      //   setFileObjects([fakeFile]);
      //   setValue("recipeImage", fileUrl); 
      //   }
      if (data?.imagePath) {
        const fileUrl = `${imgURL}/${data.imagePath}`;

        // Fetch image as a File object
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const file = new File([blob], "recipeImage.jpg", { type: blob.type });

        setFileObjects([file]);
        setValue("recipeImage", file);
      }
            
            } catch (error) {
              console.log(error)
            }finally{
              setIsLoading(false)
            }
          }
          getRecipe()
          console.log(fileObjects)
        }

    })()
  

  },[recipeId,setValue])

  const handelImage=(files)=>{
    // console.log(isFirstRender)
    if (isFirstRender.current) {
      isFirstRender.current = false; // Prevent first trigger
      return;
    }
  
    console.log(files);

    if (files.length > 0) {
      clearErrors("recipeImage");
      setValue("recipeImage", files[0]);

    } else {
      setError("recipeImage", { type: "manual", message: "Image is required" });
    }
  }

  return <>
  <div className="d-flex details container-fluid  px-md-4 px-2 ">
    <div className={`w-100  d-flex flex-md-row flex-column justify-content-between py-2 py-md-5  px-3 rounded-3 align-items-center dashboard-header`}>
    <div className="caption mb-2 mb-md-0">
      <h4 className="mb-0">Fill the <span>Recipes</span>! </h4>
      <p className="mb-0">you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
    </div>
   
    <Link to={'/dashboard/recipes'} className={" btn-add px-3 py-2 text-decoration-none  px-md-5 py-md-3  text-white fw-bold"}>
  All Recipes<i className="fa-solid fa-arrow-right ms-2"></i></Link>
    </div>
  
  </div>



   <div className="container pt-4 recipes-data">
 <div className="row justify-content-center align-items-center ">
  <div className="col-md-8">
  {loading?<Loading/>:
  <form onSubmit={handleSubmit(onSubmit)}>
 {/* recipe name */}
  <div className="input-group mb-3">
  <input {...register('name',recipeNameValidation)}
  type="text" className="form-control" placeholder="Recipe Name" aria-label="Recipe Name" aria-describedby="basic-addon1"/>
</div>
{errors.name && <div className=" mb-3 alert-danger alert">{errors.name.message}</div>}
{/* tag  */}
<select className="form-select mb-3" aria-label="Default select example"{...register('tagId',recipeTagId)}   >
  <option value={''} selected>Tag</option>
  {tags.map(tag=>  <option value={tag.id} key={tag.id}>{tag.name}</option>)}

</select>
{errors.tagId&& <div className=" mb-3 alert-danger alert">{errors.tagId.message}</div>}
{/* recipe price */}
<div className="input-group mb-3">
  <input {...register('price',recipePrice)}
  type="number" className="form-control border-end-0" placeholder="Recipe Price" aria-label="Recipe Price" aria-describedby="basic-addon1"/>
  <div className="input-group-append">
    <label className="input-group-text" htmlFor="inputGroupSelect02">EGP</label>
  </div>
</div>

{errors.price&& <div className=" mb-3 alert-danger alert">{errors.price.message}</div>}
{/* categories */}
<select className="form-select mb-3" aria-label="Default select example" {...register('categoriesIds',recipeCategories)}>
  <option value={''}  selected>Categories</option>
  {categories.map(category=>  <option value={category.id} key={category.id}>{category.name}</option>)}

</select>
{errors.categoriesIds&& <div className=" mb-3 alert-danger alert">{errors.categoriesIds.message}</div>}

 
 {/* decription */}
<div className="mb-3">
  <textarea {...register('description',recipeDesciption)} className="form-control "  rows="5" placeholder="Description"></textarea>
</div>
{errors.description&& <div className=" mb-3 alert-danger alert">{errors.description.message}</div>}

{/* recipe img */}
<div className="input-group mb-3">

<DropzoneArea
  acceptedFiles={["image/*"]}
  dropzoneText="Drag & Drop or Choose an Item Image to Upload"
  onChange={handelImage}
  filesLimit={1}
  initialFiles={fileObjects.map((file) => URL.createObjectURL(file))}
      />
   
</div>
{errors.recipeImage && <div className="mb-3 alert alert-danger w-100">{errors.recipeImage.message}</div>}




<div className="ms-auto btns-recipes mt-3">
  <Link className="btn me-4 btn-cancel px-3 py-2" to={'/dashboard/recipes'}>Cancel</Link>
<button disabled={isSubmitting} className="btn-add px-3 py-2" type="submit">{isSubmitting?<>
          <i className="fa fa-spin fa-spinner"></i>
          <span> {recipeId?'Updating...':'Creating...'}</span>
        </>:recipeId?'Update':"Save"}</button>
</div>
  </form>}
  </div>
  </div>
  </div>
  </>
}
