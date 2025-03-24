import React, { useEffect, useState } from "react";
import { axiosPrivateInstance, imgURL } from "../services/api/apiInstance";
import { UserRecipes_URLS } from "../services/api/apiConfig";
import { toast } from "react-toastify";
import { UseAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import Header from "../Shared/Header/Header";
import categoryImgHeader from '../assets/images/categoryimg-header.svg';
import Nodata from "../Shared/Nodata/Nodata"
import Loading from "../Shared/Loading/Loading";
import noimg from '../assets/images/no-plate2.jpg';
import DeleteComfirmation from "../Shared/DeleteComfirmation/DeleteComfirmation";



export default function Favorits() {
  const [favList,setFavList]=useState([])
  const [loading,setLoading]=useState(true)
  const [selectedId,setSelectedId]=useState(null)
  const [isDeleting,setIsDeleting]=useState(false)
  
  const [show, setShow] = useState(false);
  const {adminData}=UseAuthContext()
const navigate=useNavigate()

    const handleShow = (id) => {
      // console.log(id)
      setShow(true)
      setSelectedId(id)
    }
    const handleClose = () => setShow(false);

  // get all favlist
  const getFavList=async(pageSize=1000,pageNumber=1)=>{
    setLoading(true)
    try {
      const {data}=await axiosPrivateInstance.get(UserRecipes_URLS.GET_USER_RECIPES,{
        params:{
          pageSize,
          pageNumber
        }
      })
      console.log(data.data)
      setFavList(data?.data)
      
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  // delet favrecipe
  const deleteFavRecipeItem=async()=>{
    setIsDeleting(true)
    try {
      const {data}=await  axiosPrivateInstance.delete(UserRecipes_URLS.DETELTE_USER_RECIPE(selectedId))
      console.log(data)
      handleClose()
      getFavList()
      toast.success('Recipe Removed From Favorites Successfully')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message||'Failed to remove recipe from list. Please try again.')
    }finally{
      setIsDeleting(false)
    }
  }

  useEffect(()=>{
    if (adminData?.userGroup==='SuperAdmin'){
      navigate("/login")
    }else{
      getFavList()
    }

  },[adminData])


  return <>    <Header 
          title={'Favorite'} 
          img={<img src={categoryImgHeader} alt="category header img"/>}
          subtitle={'Item'}
          description={'You can now add your items that any user can order it from the Application and you can edit'} />

          <div className="container">
            <div className="row g-4 mt-4 mx-1 ">
            {loading?<Loading/>
            :favList.length>0? 
            favList.map((fav)=>   <div className="col-md-4" key={fav.id}>
            <div className="card favorite position-relative ">
  <img src={fav.recipe.imagePath?`${imgURL}/${fav.recipe.imagePath}`:noimg} className="card-img-top" alt={fav.recipe.name} />
  <div className="card-body">
    <h5 className="card-title">{fav.recipe.name}</h5>
    <p className="card-text">{fav.recipe.description}</p>
    <span>{fav.recipe.price} EGP</span>


  </div>
  <span className="heart  position-absolute bg-white p-2" onClick={()=>handleShow(fav.id)}><i className="fa-solid fa-heart fs-5"></i></span>
</div>
               
                </div>)
                :<Nodata/>}
             
            </div>
          </div>
          <DeleteComfirmation show={show} deleteFunction={deleteFavRecipeItem} isDeleting={isDeleting} handleClose={handleClose} deleteItem={'From Favorite List'}/>
          </>;
}
