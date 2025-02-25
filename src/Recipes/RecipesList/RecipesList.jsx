import React, { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import receipeImgHeader from '../../assets/images/categoryimg-header.svg'
import HeaderDetails from "../../Shared/HeaderDetails/HeaderDetails";
import Nodata from "../../Shared/Nodata/Nodata";
import { axiosPrivateInstance, baseURL, Recipes_URLS } from "../../services/urls/urls";
import DeleteComfirmation from "../../Shared/DeleteComfirmation/DeleteComfirmation";


export default function RecipesList() {
  const [recipes,setRecipes]=useState([])
  const [selectedId,setSelectedId]=useState(null)
 
  const getAllRecipes=async()=>{
  try {
    const {data}= await axiosPrivateInstance.get(Recipes_URLS.GET_RECIPIES(10,1))
    setRecipes(data?.data)
  } catch (error) {
    console.log(error)
  }
  }

  const deleteRecipy=async(recipyId)=>{
     try {
      const {data}=await axiosPrivateInstance.delete(Recipes_URLS.DELETE_RECIPE(recipyId))
        console.log(data)
        getAllRecipes()
     } catch (error) {
      console.log(error)
  
     }
     }

     function handelDeleteId(id){
      setSelectedId(id)
    }
    function comfirmDeletion(){
      if(selectedId){
        deleteRecipy(selectedId)
        setSelectedId(null)
      }
    }

  useEffect(()=>{
    getAllRecipes()
  },[])
  return <>
  <Header
  title={'Recipes'}
  subtitle={' Items'}
  description={'You can now add your items that any user can order it from the Application and you can edit'}
  img={<img src={receipeImgHeader} alt="receipe img header"  />}
  />
  <HeaderDetails 
         title={'Recipe Table Details'}
         btnContent={'Add New Item'}
         subtitle={'You can check all details'}
         />
   
<div className="px-4 text-center  ">
  <table className="table table-striped mt-3 ">
  <thead>
    <tr>
      <th scope="col" >#</th>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {recipes.length>0? recipes.map((recipe,index)=><tr className={`table-row ${index%2==0?'odd-row':'even-row'}`} key={recipe.id}>
      <td scope="row">{recipe.id}</td>
      <td >{recipe.name}</td>
      <td>{recipe.imagePath?<img src={`${baseURL}/${recipe.imagePath}`} alt={recipe.name} className="w-25" />:null}</td>
      <td>{recipe.price}</td>
      <td>{recipe.description}</td>
      <td>
      <div className="dropdown">
  <button className="btn btn-dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i className="fa-solid fa-ellipsis"></i>
  </button>
  <ul className="dropdown-menu">
    <li><button className="dropdown-item" type="button"><i className="fa-solid fa-eye me-3"></i>View</button></li>
    <li><button className="dropdown-item" type="button"><i className="fa-solid fa-pen-to-square me-3"></i>Edit</button></li>
    <li><button onClick={()=>handelDeleteId(recipe.id)} className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" > <i className="fa-solid fa-trash me-3"></i>Delete</button></li>
  </ul>
</div>
    
      </td>
    </tr>):<td colSpan="6" className="text-center">
      <Nodata />
    </td>}
  
  </tbody>
</table>
  </div>
  <DeleteComfirmation selectedId={selectedId} comfirmDeletion={comfirmDeletion}/>
  </>
}
