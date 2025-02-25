import React, { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import categoryImgHeader from '../../assets/images/categoryimg-header.svg'
import Nodata from "../../Shared/Nodata/Nodata";
import HeaderDetails from "../../Shared/HeaderDetails/HeaderDetails";
import { axiosPrivateInstance, Categories_URLS } from "../../services/urls/urls";
import DeleteComfirmation from "../../Shared/DeleteComfirmation/DeleteComfirmation";


export default function CategoriesList() {
   
   const [categories,setCategories]=useState([])
   const [selectedId,setSelectedId]=useState(null)
 
  //  get all category fun api
   const getAllCategories=async()=>{
    try {
     const {data}=await axiosPrivateInstance.get(Categories_URLS.GET_CATEGORIES(10,1))
     console.log(data.data)
     setCategories(data?.data)
    } catch (error) {
      console.log(error)
    }
   }
  // delete category by id api
   const deleteCategory=async(categoryId)=>{
   try {
    const {data}=await axiosPrivateInstance.delete(Categories_URLS.DELETE_CATEGORY(categoryId))
      console.log(data)
      getAllCategories()
   } catch (error) {
    console.log(error)

   }
   }

   function handelDeleteId(id){
    setSelectedId(id)
   }

   function comfirmDeletion(){
    if(selectedId) {
      deleteCategory(selectedId)
      setSelectedId(null)
    }
   }
   
useEffect(()=>{
  getAllCategories()
},[])



  return <>
        <Header 
        title={'Categories'} 
        img={<img src={categoryImgHeader} alt="category header img"/>}
        subtitle={'Item'}
        description={'You can now add your items that any user can order it from the Application and you can edit'} />
  
         <HeaderDetails 
         title={'Categories Table Details'}
         btnContent={'Add New Category'}
         subtitle={'You can check all details'}
         />
   


  <div className="px-4 text-center  ">
  <table className="table table-striped mt-3 ">
  <thead>
    <tr>
      <th scope="col" >#</th>
      <th scope="col">Name</th>
      <th scope="col">CreationDate</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories.length>0? categories.map((category,index)=><tr className={`table-row ${index%2==0?'odd-row':'even-row'}`} key={category.id}>
      <td scope="row">{category.id}</td>
      <td >{category.name}</td>
      <td>{category.creationDate}</td>
      <td>
      <div class="dropdown">
  <button class="btn btn-dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i class="fa-solid fa-ellipsis"></i>
  </button>
  <ul class="dropdown-menu">
    <li><button class="dropdown-item" type="button"><i class="fa-solid fa-eye me-3"></i>View</button></li>
    <li><button  class="dropdown-item" type="button"><i class="fa-solid fa-pen-to-square me-3"></i>Edit</button></li>
    <li><button onClick={()=>handelDeleteId(category.id)} class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" > <i class="fa-solid fa-trash me-3"></i>Delete</button></li>
  </ul>
</div>
  
      </td>
    </tr>):<td colSpan="4" className="text-center">
      <Nodata />
    </td>}
  
  </tbody>
</table>
  </div>
  <DeleteComfirmation selectedId={selectedId} comfirmDeletion={comfirmDeletion}/>

  </>;
}
