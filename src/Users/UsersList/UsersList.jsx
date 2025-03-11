import React, { useEffect, useState } from "react";
import { Users_URLS } from "../../services/api/apiConfig";
import { axiosPrivateInstance, imgURL } from "../../services/api/apiInstance";

import usersHeaderImg from '../../assets/images/categoryimg-header.svg'
import Header from "../../Shared/Header/Header";
import Nodata from "../../Shared/Nodata/Nodata";
import Loading from "../../Shared/Loading/Loading";
import noimg from '../../assets/images/no-user.jpg'
import DeleteComfirmation from "../../Shared/DeleteComfirmation/DeleteComfirmation";
import { toast } from "react-toastify";

export default function UsersList() {
  const [loading,setLoading]=useState(true)
  const [users,setUsers]=useState([])
  const [selectedUser,setSelectedUser]=useState(null)
  const [isDeleting,setIsDeleting]=useState(false)
  const [isMobile,setIsMobile]=useState(false)

  const[show,setShow]=useState(false)
  const handleCloseeModal = () => setShow(false);
  const handleShowModal = (id) =>  {
    setSelectedUser(id)
    setShow(true)
  }
  
   
  const getAllUsers=async()=>{
    setLoading(true)
    try {
      const {data}=await axiosPrivateInstance(Users_URLS.GET_USERS(10,1))
      // console.log(data.data)
      setUsers(data?.data)
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false);
    }
  }

// delete user by id
    const deleteUser=async()=>{
      setIsDeleting(true)
     try {
      const {data}=await axiosPrivateInstance.delete(Users_URLS.DELETE_USER(selectedUser))
        console.log(data)
        handleCloseeModal()
        getAllUsers()
        toast.success('User deleted successfully!')
     } catch (error) {
        console.log(error)
        toast.error('Failed to delete user. Please try again.')
     }finally{
      setIsDeleting(false)
     }
     }
  
  useEffect(()=>{
getAllUsers()

const handelIsMobile=()=>{
  setIsMobile(window.innerWidth<=768)
}
window.addEventListener('resize',handelIsMobile)
return ()=>{
  window.removeEventListener('resize',handelIsMobile)
}
  },[])
  return <>
  <Header 
    title={'Users'} 
    img={<img src={usersHeaderImg} alt="users header img"/>}
    subtitle={'List'}
    description={'You can now add your items that any user can order it from the Application and you can edit'} />


      <div className="d-flex details container-fluid  px-md-4 px-2 ">
    <div className="w-100  d-flex flex-md-row flex-column justify-content-between py-2 py-md-5  px-3 rounded-3 align-items-center ">
    <div className="caption mb-2 mb-md-0">
      <h4 className="mb-0">Users Table Details! </h4>
      <p className="mb-0">You can check all details</p>
    </div>
    
    </div>
  
  </div>



 <div className="px-md-4 px-2 text-center  ">
{loading?<Loading/>:  <table className="table table-striped mt-3 ">
  <thead>
    <tr>
   
      <th scope="col">Name</th>
      <th scope="col">Image</th>
   {!isMobile?   <th scope="col">Email</th>:null}
      <th scope="col">Phone	</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.length>0? users.map((user,index)=><tr className={`table-row ${index%2==0?'odd-row':'even-row'}`} key={user.id}>

      <td className="align-middle">{user.userName}</td>
      <td className="align-middle">{<img src={user.imagePath?`${imgURL}/${user.imagePath}`:noimg} alt={user.userName} className="recipe-img rounded-2" />}</td>

      {!isMobile?<td className="align-middle">{user.email}</td>:null}
      <td className="align-middle">{user.phoneNumber}</td>
      <td className="align-middle">
      <div className="dropdown">
  <button className="btn btn-dropdown " type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i className="fa-solid fa-ellipsis"></i>
  </button>
  <ul className="dropdown-menu">
    <li><button className="dropdown-item" type="button"><i className="fa-solid fa-eye me-3"></i>View</button></li>
    <li><button className="dropdown-item" type="button"><i className="fa-solid fa-pen-to-square me-3"></i>Edit</button></li>
    <li><button onClick={()=>handleShowModal(user?.id)} className="dropdown-item" type="button" > <i className="fa-solid fa-trash me-3"></i>Delete</button></li>

  </ul>
</div>
    
      </td>
    </tr>):<td colSpan="5" className="text-center">
      <Nodata />
    </td>}
  
  </tbody>
</table>}
  </div> 
  <DeleteComfirmation show={show} handleClose={handleCloseeModal} deleteFunction={deleteUser} isDeleting={isDeleting} deleteItem={'User'}/>
  
  </>;
}
