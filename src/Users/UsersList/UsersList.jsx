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
import { Modal } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import { formatDate } from "../../helpers/helpers";
import Pagination from "../../Shared/Pagination/Pagination";
import { UseAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const [loading,setLoading]=useState(true)
  const [users,setUsers]=useState([])
  const [selectedUser,setSelectedUser]=useState(null)
  const [isDeleting,setIsDeleting]=useState(false)
  const [isMobile,setIsMobile]=useState(false)
  const [loadingUser, setLoadingUser] = useState(false);
  const [user,setUser]=useState(null)

  const [userName,setUserName]=useState('')
  const [userEmail,setUserEmail]=useState('')
  const [userCountry,setUserCountry]=useState('')
  const [userRole,setUserRole]=useState('')

  const [totalNumberOfPages,setTotalNumberOfPages]=useState([])
  const [activePage,setActivePage]=useState(1)
  const {adminData}=UseAuthContext()
  const navigate=useNavigate()


  const[show,setShow]=useState(false)
  const handleCloseeModal = () => setShow(false);
  const handleShowModal = (id) =>  {
    setSelectedUser(id)
    setShow(true)
  }
  
   

   const [showUser, setShowUder] = useState(false);
  
    const handleCloseUser = () => setShowUder(false);
    const handleShowUser = (id) => {
    setShowUder(true)
    getUser(id)
    }
  // get all users
  const getAllUsers=async(pageSize,pageNumber,userName,email,country,groups,)=>{
    setLoading(true)
    try {
      const {data}=await axiosPrivateInstance(Users_URLS.GET_USERS,{
        params:{
          userName,
          email,
          country,
          groups,
         pageSize,
         pageNumber
        }
      })
      // console.log(data.data)
      setUsers(data?.data)
      setTotalNumberOfPages(Array.from({length:data?.totalNumberOfPages},(_,index)=>index+1))

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
        toast.success(data?.message)
     } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message||'Failed to delete user. Please try again.')
     }finally{
      setIsDeleting(false)
     }
     }
  
// get user detail
  const getUser=async(id)=>{
     setLoadingUser(true)
    try {
      const {data}=await axiosPrivateInstance.get(Users_URLS.GET_USER(id))
      console.log(data)
      setUser(data)
    } catch (error) {
      console.log(error)
    }finally{
      setLoadingUser(false)
    }
   }
// filteration==================================
const getUserVal=(e)=>{
  setUserName(e.target.value)
getAllUsers(15,1,e.target.value,userEmail,userCountry,userRole)
}
const getUserEmail=(e)=>{
  setUserEmail(e.target.value)
getAllUsers(15,1,userName,e.target.value,userCountry,userRole)
}
const getUserCountry=(e)=>{
  setUserCountry(e.target.value)
getAllUsers(15,1,userName,userEmail,e.target.value,userRole)
}
const getUserRole=(e)=>{
  setUserRole(e.target.value)
getAllUsers(15,1,userName,userEmail,userCountry,e.target.value)
}


  useEffect(()=>{
    if (adminData?.userGroup==='SuperAdmin'){
      getAllUsers(15,1)

    }else{
      navigate("/login")
    }
  },[adminData])

  useEffect(() => {
    const handleIsMobile = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    handleIsMobile(); 
    window.addEventListener('resize', handleIsMobile);

    return () => {
        window.removeEventListener('resize', handleIsMobile);
    };
}, []); 
  
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


  <div className="container px-md-4 px-2  receipe-inputs">
  <div className="row">
    <div className="col-md-3">
<div className="input-group mb-3">
  <span className="input-group-text search-icon" id="basic-addon1">  <i className="fa-solid fa-magnifying-glass"></i></span>
  <input onChange={getUserVal}  type="text" className="form-control border-start-0" placeholder="Search By Name ..." aria-label="Search" aria-describedby="basic-addon1"/>
</div>
    </div>

<div className="col-md-3">
<div className="input-group mb-3">
  <span className="input-group-text search-icon" id="basic-addon1">  <i className="fa-regular fa-envelope"></i></span>
  <input onChange={getUserEmail}  type="text" className="form-control border-start-0" placeholder="Search By Email ..." aria-label="Search" aria-describedby="basic-addon1"/>
</div>
</div>

<div className="col-md-3">
<div className="input-group mb-3">
  <span className="input-group-text search-icon" id="basic-addon1">  <i className="fa-solid fa-globe"></i></span>
  <input onChange={getUserCountry} type="text" className="form-control border-start-0" placeholder="Search By Country ..." aria-label="Search" aria-describedby="basic-addon1"/>
</div>
</div>

<div className="col-md-3">
<select onChange={getUserRole} className="form-select mb-3" aria-label="Default select example">
  <option value={''} selected>Role</option>
  <option value={1}>Admin</option>
  <option value={2}>User</option>
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
    <li><button onClick={()=>handleShowUser(user?.id)} className="dropdown-item" type="button"><i className="fa-solid fa-eye me-3"></i>View</button></li>
    {/* <li><button className="dropdown-item" type="button"><i className="fa-solid fa-pen-to-square me-3"></i>Edit</button></li> */}
    <li><button onClick={()=>handleShowModal(user?.id)} className="dropdown-item" type="button" > <i className="fa-solid fa-trash me-3"></i>Delete</button></li>

  </ul>
</div>
    
      </td>
    </tr>):<td colSpan={!isMobile?"5":"4"} className="text-center">
      <Nodata />
    </td>}
  
  </tbody>
</table>
<Pagination totalNumberOfPages={totalNumberOfPages}  getFun={getAllUsers} activePage={activePage} setActivePage={setActivePage} isUsers={true} />
</>}
  </div> 

  <DeleteComfirmation show={show} handleClose={handleCloseeModal} deleteFunction={deleteUser} isDeleting={isDeleting} deleteItem={'User'}/>
  {/* show user detail */}
  <Modal centered show={showUser} onHide={handleCloseUser}>

       {loadingUser?  <div className="load-detail">  <BeatLoader color="rgba(0, 146, 71, 1)" size={20} /></div>:<>
        <Modal.Header closeButton={false}>
          <Modal.Title><p className="name-detail"><span><i className="fa-solid fa-circle-user me-1"></i>Name:</span> {user?.userName}</p></Modal.Title>
          <div className="close-modal d-flex justify-content-center align-items-center" onClick={handleCloseUser}>
        <i className="fa-solid fa-xmark btn-closemodal" ></i>
        </div>
        </Modal.Header>
        <Modal.Body>
           <img loading="lazy" src={user?.imagePath?`${imgURL}/${user.imagePath}`:noimg} alt={user?.name} className="w-50"  />
      
           <div className="text-start mt-3 modal-detail px-3">
  <h6><i className="fa-solid fa-envelope me-1"></i> Email: <span>{user?.email}</span></h6>
  <h6><i className="fa-solid fa-phone me-1"></i> Phone Number: <span>{user?.phoneNumber}</span></h6>
  <h6><i className="fa-solid fa-globe me-1"></i> Country: <span>{user?.country}</span></h6>
  <h6><i className="fa-solid fa-user-tag me-1"></i> User Type: <span>{user?.group?.name}</span></h6>
  <h6><i className="fa-solid fa-calendar-alt me-1"></i> Creation Date: <span>{formatDate(user?.creationDate)}</span></h6>
</div>
        </Modal.Body>
       
       </>}
       <Modal.Footer>
        <button type="button" 
        onClick={handleCloseUser} className="btn delete-btn "  >Close</button>
        </Modal.Footer>
      </Modal>
  </>;
}
