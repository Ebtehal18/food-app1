import { useEffect, useState } from 'react'

// import './App.css'
import { ToastContainer } from 'react-toastify'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './Authentication/Login/Login'
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
import ProtectedRoutes from './Shared/ProtectedRoutes/ProtectedRoutes'
import AuthContextProvider from './context/authContext'
import Favorits from './Favorites/Favorits'
import Profile from './Profile/Profile'


function App() {
 

 
  

const routes=createBrowserRouter([
  // auth layout
  {
path:'',
element:<AuthLayout/>,
errorElement:<NotFound/>,
children:[
  {index:true,element:<Login/>},
  {path:"login",element:<Login />},
  {path:"register",element:<Register/>},
  {path:"forget-password",element:<ForgetPass/>},
  {path:"reset-password",element:<ResetPass/>},
  {path:"verify-account",element:<VerifyAccount/>},
]
},
// master layout
{
path:'/dashboard',
element:<ProtectedRoutes ><MasterLayout/></ProtectedRoutes>,
errorElement:<NotFound/>,
children:[
  // home
  {index:true,element:<Dashboard />},
  {path:"recipes",element:<RecipesList/>},
  {path:"recipes/new-recipe",element:<RecipeData/>},
  {path:"recipes/:recipeId",element:<RecipeData/>},
  {path:"category",element:<CategoriesList/>},
  {path:"categories-data",element:<CategoryData/>},
  {path:"users",element:<UsersList/>},
  {path:"favorites-recipes",element:<Favorits />},
  {path:"profile",element:<Profile />},
]
}


])

  return (
    <>
    <AuthContextProvider>
    

    <RouterProvider router={routes}>

</RouterProvider>
<ToastContainer />
   
    </AuthContextProvider>
    </>
  )
}

export default App
