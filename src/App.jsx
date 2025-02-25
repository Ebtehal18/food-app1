import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Login from './Authentication/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Shared/AuthLayout/AuthLayout'
import Register from './Authentication/Register/Register'
import ForgetPass from './Authentication/Forget-pass/ForgetPass'
import ResetPass from './Authentication/Reset-pass/ResetPass'
import VerifyAccount from './Authentication/Verify-account/VerifyAccount'
import NotFound from './Shared/Notfound/NotFound'
import MasterLayout from './Shared/MasterLayout.jsx/MasterLayout'
import Dashboard from './Dashboard/Dashboard'
import RecipesList from './Recipes/RecipesList/RecipesList'
import RecipeData from './Recipes/RecipeData/RecipeData'
import CategoriesList from './Categories/CategoriesList/CategoriesList'
import CategoryData from './Categories/CategoryData/CategoryData'
import UsersList from './Users/UsersList/UsersList'
import { ToastContainer } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoutes from './Shared/ProtectedRoutes/ProtectedRoutes'
import ChangePass from './Authentication/Change-pass/ChangePass'

function App() {
 const [adminData,setAdminData]=useState(null)

 const fillAdminData=()=>{
  const token=localStorage.getItem('token');
  const decoded = jwtDecode(token);

  setAdminData(decoded)
 }



useEffect(() => {
  // to handel referesh the page in case we logedin 
 if(localStorage.getItem('token')) {
  // console.log(localStorage.getItem('token'))
  fillAdminData()

}

  
}, []);




const routes=createBrowserRouter([
  // auth layout
  {
path:'',
element:<AuthLayout/>,
errorElement:<NotFound/>,
children:[
  {index:true,element:<Login fillAdminData={fillAdminData}/>},
  {path:"login",element:<Login fillAdminData={fillAdminData}/>},
  {path:"register",element:<Register/>},
  {path:"forget-password",element:<ForgetPass/>},
  {path:"reset-password",element:<ResetPass/>},
  {path:"verify-account",element:<VerifyAccount/>},
]
},
// master layout
{
path:'/dashboard',
element:<ProtectedRoutes adminData={adminData} ><MasterLayout adminData={adminData} /></ProtectedRoutes>,
errorElement:<NotFound/>,
children:[
  // home
  {index:true,element:<Dashboard/>},
  {path:"recipes",element:<RecipesList/>},
  {path:"recipes-data",element:<RecipeData/>},
  {path:"category",element:<CategoriesList/>},
  {path:"categories-data",element:<CategoryData/>},
  {path:"users",element:<UsersList/>},
  {path:"change-password",element:<ChangePass />},
]
}


])

  return (
    <>
    <RouterProvider router={routes}>

    </RouterProvider>
    <ToastContainer />
    </>
  )
}

export default App
