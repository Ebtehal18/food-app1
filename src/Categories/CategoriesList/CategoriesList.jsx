import React, { useEffect, useState } from "react";

import { formatDate } from "../../helpers/helpers";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { addCategoryValidation } from "../../services/validations";
import { Categories_URLS } from "../../services/api/apiConfig";
import { axiosPrivateInstance } from "../../services/api/apiInstance";

import Nodata from "../../Shared/Nodata/Nodata";
import categoryImgHeader from '../../assets/images/categoryimg-header.svg'
import Header from "../../Shared/Header/Header";
import DeleteComfirmation from "../../Shared/DeleteComfirmation/DeleteComfirmation";
import Loading from "../../Shared/Loading/Loading";
import CategoryData from "../CategoryData/CategoryData";
import Pagination from "../../Shared/Pagination/Pagination";


export default function CategoriesList() {


   const [categories,setCategories]=useState([])
   const [selectedId,setSelectedId]=useState(null)
   const [loading, setLoading] = useState(true);
   const [isDeleting,setIsDeleting]=useState(false)

   const [showDeleteModal, setShowDeleteModal] = useState(false);

   const [showAddEditCategoryModal, setshowAddEditCategoryModal] = useState(false);
   const [selectedCategory,setSelectedCategory]=useState(null)

   const [totalNumberOfPages,setTotalNumberOfPages]=useState([])
    const [activePage,setActivePage]=useState(1)

    //  get all category fun api
    const getAllCategories=async(pageSize,pageNumber,name)=>{
      setLoading(true)
      try {
       const {data}=await axiosPrivateInstance.get(Categories_URLS.GET_CATEGORIES,{
        params:{
          name,
          pageSize,
          pageNumber
        }
       })
       console.log(data)
       setTotalNumberOfPages(Array.from({length:data?.totalNumberOfPages},(_,index)=>index+1))
       setCategories(data?.data)
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
     }
  
    // delete category by id api
     const deleteCategory=async()=>{
      setIsDeleting(true)
     try {
      const {data}=await axiosPrivateInstance.delete(Categories_URLS.DELETE_CATEGORY(selectedId))
        console.log(data)
        handleCloseDeleteModal()
        getAllCategories()
        toast.success('Category deleted successfully!')
     } catch (error) {
        console.log(error)
        toast.error('Failed to delete category. Please try again.')
     }finally{
      setIsDeleting(false)
     }
     }
  
  
  useEffect(()=>{
    getAllCategories(5,1)
  },[])

  // delete modalll
   const handleShowDeleteModal = (id) =>{
    setSelectedId(id)
    setShowDeleteModal(true)
   }
   const handleCloseDeleteModal = () => setShowDeleteModal(false);
   

  //  add & edit modalll============================
   const handlShowCategoryModal = (category=null) =>{
    setshowAddEditCategoryModal(true)
    setSelectedCategory(category) 
   }

   const handleCloseCategoryModal = () => setshowAddEditCategoryModal(false)
   

   const getSearch=(e)=>{
    getAllCategories(5,1,e.target.value)
    }



  return <>
        <Header 
        title={'Categories'} 
        img={<img src={categoryImgHeader} alt="category header img"/>}
        subtitle={'Item'}
        description={'You can now add your items that any user can order it from the Application and you can edit'} />
  
        
   <div className="d-flex details container-fluid  px-md-4 px-2 ">
    <div className="w-100  d-flex flex-md-row flex-column justify-content-between py-2 py-md-5  px-3 rounded-3 align-items-center ">
    <div className="caption mb-2 mb-md-0">
      <h4 className="mb-0">Categories Table Details! </h4>
      <p className="mb-0">You can check all details</p>
    </div>
  
     <button className=" btn-add px-3 py-2 px-md-5 py-md-3 text-white fw-bold mt-2 mt-md-0" onClick={()=>handlShowCategoryModal()}>Add New Category</button>
    
    </div>
  
  </div>


 <div className="px-md-4 px-2">
 <div className="input-group mb-3 ">
  <span className="input-group-text search-icon" id="basic-addon1">  <i className="fa-solid fa-magnifying-glass"></i></span>
  <input onChange={getSearch}  type="text" className="form-control border-start-0" placeholder="Search here ..." aria-label="Search" aria-describedby="basic-addon1"/>
</div>

 </div>
  <div className="px-md-4 text-center px-2 ">
    {loading?<Loading/>:<>
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
      <td scope="row" className="align-middle">{category.id}</td>
      <td className="align-middle">{category.name}</td>
      <td className="align-middle">{formatDate(category?.creationDate)}</td>
      <td className="align-middle">
      <div className="dropdown">
  <button className="btn btn-dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i className="fa-solid fa-ellipsis"></i>
  </button>
  <ul className="dropdown-menu">
    <li><button className="dropdown-item" type="button"><i className="fa-solid fa-eye me-3"></i>View</button></li>
    <li><button  className="dropdown-item" type="button" onClick={()=>handlShowCategoryModal(category)}><i className="fa-solid fa-pen-to-square me-3"></i>Edit</button></li>
    <li><button onClick={()=>handleShowDeleteModal(category?.id)} className="dropdown-item" type="button" > <i className="fa-solid fa-trash me-3"></i>Delete</button></li>
  </ul>
</div>
  
      </td>
    </tr>):<td colSpan="4" className="text-center">
      <Nodata />
    </td>}
  
  </tbody>
</table>
  <Pagination  totalNumberOfPages={totalNumberOfPages} getFun={getAllCategories} activePage={activePage} setActivePage={setActivePage} /> 
    </>
  }
  </div>
 {/* delete comfirmation */}
<DeleteComfirmation deleteItem={'Category'} deleteFunction={deleteCategory} show={showDeleteModal} handleClose={handleCloseDeleteModal} isDeleting={isDeleting}/>

{/* add + update category */}
<CategoryData show={showAddEditCategoryModal} selectedCategory={selectedCategory}  handelClose={handleCloseCategoryModal} getAllCategories={getAllCategories} />


  </>
}
