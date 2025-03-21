import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Categories_URLS, Recipes_URLS, Tag_URl, UserRecipes_URLS } from "../../services/api/apiConfig";
import { axiosPrivateInstance, imgURL } from "../../services/api/apiInstance";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../../context/authContext";
import { Modal } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

import Header from "../../Shared/Header/Header";
import receipeImgHeader from '../../assets/images/categoryimg-header.svg'
import Nodata from "../../Shared/Nodata/Nodata";
import DeleteComfirmation from "../../Shared/DeleteComfirmation/DeleteComfirmation";
import Loading from "../../Shared/Loading/Loading";
import noimg from '../../assets/images/no-plate2.jpg';
import Pagination from "../../Shared/Pagination/Pagination";


export default function RecipesList() {
  const [recipes,setRecipes]=useState([])
  const [selectedId,setSelectedId]=useState(null)
  const [loading, setLoading] = useState(true);
  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [isDeleting,setIsDeleting]=useState(false)
  const [recipe,setRecipe]=useState(null)

  const [favList,setFavList]=useState([])

  const [totalNumberOfPages,setTotalNumberOfPages]=useState([])
  const [activePage,setActivePage]=useState(1)
  
  const [tags,setTags]=useState([])
  const [categories,setCategories]=useState([])

  const [searchName,setSearchName]=useState('')
  const [selectTag,setSelectTag]=useState('')
  const [selectCategory,setSelectCategory]=useState('')
  const {adminData}=UseAuthContext()
  const [selctedFavId,setselctedFavId]=useState(null)



  const [show, setShow] = useState(false);
  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true)
  }
  const handleClose = () => setShow(false);

  const [showRecipe, setShowRecipe] = useState(false);
  const handleCloseRecipe = () => setShowRecipe(false);
  const handleShowRecipe = (id) => {
    setShowRecipe(true)
   if (adminData?.userGroup==='SystemUser'){
    setselctedFavId(id)
   }
getRecipe(id)
  }
 
  const [isMobile,setIsMobile]=useState(false)

const [isAddingFavLoading,setisAddingFavLoading]=useState(false)

  const [showFavRecipe, setShowFavRecipe] = useState(false);
  const handleCloseFavRecipe = () => setShowFavRecipe(false);
  const handleShowFavRecipe = (id) => {
    setShowFavRecipe(true)
    setselctedFavId(id)
  }
// add to fav list
const addToFav=async()=>{
  if (adminData?.userGroup !== 'SystemUser') return

  setisAddingFavLoading(true)


  try {
    // get all fav recipes
    const response = await axiosPrivateInstance.get(UserRecipes_URLS.GET_USER_RECIPES, {
      params: { pageSize: 1000, pageNumber: 1 }
    });

    const latestFavList = response?.data?.data || [];
    console.log(latestFavList)
    
    // Check if the selected recipe is already in favorites
    if (latestFavList.some((fav) => fav.recipe.id === selctedFavId)) {
      toast.warning("This recipe is already in your favorites!");
      setisAddingFavLoading(false);
      return;
    }

    const {data}=await axiosPrivateInstance.post(UserRecipes_URLS.POST_USER_RECIPES,{'recipeId':selctedFavId})
    console.log(data)
   
   
    console.log(favList)
    if (showFavRecipe){
      handleCloseFavRecipe()
    }else{
      handleCloseRecipe() 
    }
    setFavList(latestFavList)
    toast.success('Recipe Added To Favorite List Successfully')
  } catch (error) {
    console.log(error)
  toast.error(error?.response?.data?.message||'Failed to add recipe to list. Please try again.')
    
  }finally{
    setisAddingFavLoading(false)
  }
}




// get all recipe
  const getAllRecipes=async(pageSize,pageNumber,name,tagId,categoryId)=>{
    setLoading(true)

  try {
    const {data}= await axiosPrivateInstance.get(Recipes_URLS.GET_RECIPIES,{
      params:{
        name,
        tagId,
        categoryId,
        pageSize,
        pageNumber
      }
    })
    setRecipes(data?.data)
    setTotalNumberOfPages(Array.from({length:data?.totalNumberOfPages},(_,index)=>index+1))

  } catch (error) {
    console.log(error)
  }finally {
    setLoading(false);
  }
  }
// delete recipe
  const deleteRecipy=async()=>{
   setIsDeleting(true)
     try {
      const {data}=await axiosPrivateInstance.delete(Recipes_URLS.DELETE_RECIPE(selectedId))
        console.log(data)
        handleClose()
        getAllRecipes()
        toast.success('Recipe deleted successfully!')
     } catch (error) {
      console.log(error)
      toast.error('Failed to delete recipe. Please try again.')
  
     }finally{
      setIsDeleting(false)
     }
     }
// get single recipe detail
   const getRecipe=async(id)=>{
     setLoadingRecipe(true)
    try {
      const {data}=await axiosPrivateInstance.get(Recipes_URLS.GET_RECIPE(id))
      // console.log(data)
      setRecipe(data)
    } catch (error) {
      console.log(error)
    }finally{
      setLoadingRecipe(false)
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
      setLoading(true)
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
  
 
// search input========================================================
const getSearch=(e)=>{
setSearchName(e.target.value)
getAllRecipes(5,1,e.target.value,selectTag,selectCategory)
}
const getSelectTag=(e)=>{
setSelectTag(e.target.value)
getAllRecipes(5,1,searchName,e.target.value,selectCategory)
}
const getSelectCategory=(e)=>{
  setSelectCategory(e.target.value)
getAllRecipes(5,1,searchName,selectTag,e.target.value)
}


   useEffect(()=>{
      getAllRecipes(5,1)
      getTags()
      getAllCategories(100000,1)



  // getFavList()
      
      const handleIsMobile=()=>{
        setIsMobile(window.innerWidth<=768)
      }
      handleIsMobile()
      window.addEventListener('resize',handleIsMobile)
      return ()=>{
        window.removeEventListener('resize',handleIsMobile)
      }


      
    },[])

    return <>
  <Header
  title={'Recipes'}
  subtitle={' Items'}
  description={'You can now add your items that any user can order it from the Application and you can edit'}
  img={<img src={receipeImgHeader} alt="receipe img header"  />}
  />

   
<div className="d-flex details container-fluid  px-md-4 px-2 ">
    <div className={`w-100  d-flex flex-md-row flex-column justify-content-between py-2 py-md-4  px-3 rounded-3 align-items-center `}>
    <div className="caption mb-2 mb-md-0">
      <h4 className="mb-0">Recipe Table Details </h4>
      <p className="mb-0">You can check all details</p>
    </div>


{adminData?.userGroup==='SuperAdmin'? 
    <Link to={'/dashboard/recipes/new-recipe'} className={" btn-add px-3 py-2 text-decoration-none  px-md-5 py-md-3  text-white fw-bold"}>
      Add New Item
  </Link>
    :''}
    </div>
  
  </div>


<div className="container px-md-4 px-2  receipe-inputs">
  <div className="row">
    <div className="col-md-6">
<div className="input-group mb-3">
  <span className="input-group-text search-icon" id="basic-addon1">  <i className="fa-solid fa-magnifying-glass"></i></span>
  <input onChange={getSearch} type="text" className="form-control border-start-0" placeholder="Search here ..." aria-label="Search" aria-describedby="basic-addon1"/>
</div>
  

    </div>
<div className="col-md-3">
<select className="form-select mb-3" aria-label="Default select example"onChange={getSelectTag}>
  <option selected>Tag</option>
{tags.map(tag=>  <option value={tag.id} key={tag.id}>{tag.name}</option>)}
</select>
</div>
<div className="col-md-3">
<select className="form-select mb-3" aria-label="Default select example"onChange={getSelectCategory}>
  <option selected>Category</option>
  <option value="1">One</option>
 {categories.map(category=>  <option value={category.id} key={category.id}>{category.name}</option>)}
</select>
</div>
  </div>
</div>






<div className="px-md-4 px-2 text-center  ">
{loading?<Loading/>:  <>
  <table className="table table-striped mt-3 ">
  <thead>
    <tr>
   
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Price</th>
      {!isMobile?<th scope="col">Description</th>:null}
      {!isMobile? <th scope="col">tag</th>:null}
      <th scope="col">Category</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {recipes.length>0? recipes.map((recipe,index)=>{
  

    return  <tr className={`table-row ${index%2==0?'odd-row':'even-row'}`} key={recipe.id}>

      <td className="align-middle">{recipe.name}</td>
      <td className="align-middle">{<img loading="lazy" src={recipe.imagePath?`${imgURL}/${recipe.imagePath}`:noimg} alt={recipe.name} className="recipe-img rounded-2" />}</td>
      <td className="align-middle">{recipe.price} EGP</td>
      {!isMobile?<td className="align-middle">{recipe.description}</td>:null}
      {!isMobile?<td className="align-middle">{recipe.tag.name}</td>:null}
      <td className="align-middle">{recipe?.category[0]?.name}</td>
      <td className="align-middle">
      <div className="dropdown">
  <button className="btn btn-dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i className="fa-solid fa-ellipsis"></i>
  </button>
  <ul className="dropdown-menu">
    <li><button onClick={()=>handleShowRecipe(recipe?.id)} className="dropdown-item" type="button"><i className="fa-solid fa-eye me-3"></i>View</button></li>
    

  {adminData?.userGroup==='SuperAdmin'?<> 
   <li><Link to={`/dashboard/recipes/${recipe.id}`} className="dropdown-item" type="button"><i className="fa-solid fa-pen-to-square me-3"></i>Edit</Link></li>
  <li><button onClick={()=>handleShow(recipe.id)} className="dropdown-item" type="button"  > <i className="fa-solid fa-trash me-3"></i>Delete</button></li>
  </>
   : <li>
        <button
          className="dropdown-item"
          type="button"
         
          onClick={() => handleShowFavRecipe(recipe.id)}
        >
          <i className="fa-solid fa-heart me-3"></i>Add to Favorite
        </button>
     </li>}
  </ul>
</div>
      </td>
    </tr>}
  ):<td colSpan={!isMobile?'7':'5'} className="text-center">
      <Nodata />
    </td>}
  
  </tbody>
</table>
  <Pagination totalNumberOfPages={totalNumberOfPages} getFun={getAllRecipes} activePage={activePage} setActivePage={setActivePage} /> 
</>

}
  </div>
{/* delete recipe comfirmation */}
  <DeleteComfirmation deleteFunction={deleteRecipy} show={show} handleClose={handleClose} isDeleting={isDeleting} deleteItem={'Recipe'}  />
{/* add to fav list comfirmation */}
  <DeleteComfirmation deleteFunction={addToFav} show={showFavRecipe} handleClose={handleCloseFavRecipe} isDeleting={isAddingFavLoading} AddToFav={true}  />




{/* show recipe detail ===================================================*/}
  <Modal centered show={showRecipe} onHide={handleCloseRecipe}>

       {loadingRecipe? <div className="load-detail">  <BeatLoader color="rgba(0, 146, 71, 1)" size={20} /></div>:<>
        <Modal.Header closeButton={false}>
          <Modal.Title>{recipe?.name}</Modal.Title>
          <div className="close-modal d-flex justify-content-center align-items-center" onClick={handleCloseRecipe}>
        <i className="fa-solid fa-xmark btn-closemodal" ></i>
        </div>
        </Modal.Header>
        <Modal.Body>
           <img loading="lazy" src={recipe?.imagePath?`${imgURL}/${recipe.imagePath}`:noimg} alt={recipe?.name} className="w-75"  />
      
        <div className="text-start mt-3 modal-detail px-3">
          <h6 ><i className="fa-solid fa-file-lines me-1"></i> Description: <span>{recipe?.description}</span></h6>
         {recipe?.category? <h6><i className="fa-regular fa-calendar-days me-1"></i>Category: <span>{recipe?.category[0].name}</span></h6>:<span className="text-danger">none</span>}
          <h6> <i className="fa-solid fa-tag me-1"></i>Tag: <span>{recipe?.tag['name']}</span></h6>
          <h6> <i className="fa-solid fa-money-bills me-1"></i>Price: <span>{recipe?.price} EGP</span></h6>
        </div>
        </Modal.Body>
       
       </>}
       <Modal.Footer>
       {adminData?.userGroup !== 'SystemUser' ? (
    <button type="button" onClick={handleCloseRecipe} className="btn delete-btn">Close</button>
  ) : (
    <button type="button" onClick={addToFav} className="btn delete-btn"  >
      {isAddingFavLoading ? "Adding..." : "Add To Favorite"}
    </button>
  )}
    
        </Modal.Footer>
      </Modal>
  </>
}
