import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

function App() {
const routes=createBrowserRouter([
  // auth layout
  {
path:'',
element:<AuthLayout/>,
errorElement:<NotFound/>,
children:[
  {index:true,element:<Login/>},
  {path:"login",element:<Login/>},
  {path:"register",element:<Register/>},
  {path:"forget-pass",element:<ForgetPass/>},
  {path:"reset-pass",element:<ResetPass/>},
  {path:"verify-account",element:<VerifyAccount/>},
]
},
// master layout
{
path:'/dashboard',
element:<MasterLayout/>,
errorElement:<NotFound/>,
children:[
  // home
  {index:true,element:<Dashboard/>},
  {path:"recipes",element:<RecipesList/>},
  {path:"recipes-data",element:<RecipeData/>},
  {path:"category",element:<CategoriesList/>},
  {path:"categories-data",element:<CategoryData/>},
  {path:"users",element:<UsersList/>},
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
