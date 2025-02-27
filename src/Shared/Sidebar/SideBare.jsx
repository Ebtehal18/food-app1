import React, { useEffect, useState } from "react";
import sideBarLogo from '../../assets/images/sidebar-logo.png'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {  NavLink, useNavigate } from "react-router-dom";
// import icons
import userIcons  from '../../assets/images/people-icon.png'
import homeIcon  from '../../assets/images/home-icon.png'
import categoryIcon  from '../../assets/images/categories-icon.png'
import changeIcon  from '../../assets/images/change-icon.png'
import receipeIcon  from '../../assets/images/receipes-icon.png'
import logoutIcon  from '../../assets/images/logout-icon.png'


export default function SideBare() {
  const navigate=useNavigate()
   const [isCollapsed,setIsCollapsed]=useState(false)
  const toggleCollapse=()=>{
    
   setIsCollapsed(isCollapsed=>!isCollapsed)
  }
  const logOut=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }


  // useEffect
  return <div className="sidebar-container vh-100">
    <Sidebar collapsed={isCollapsed} breakPoint="lg">
  <Menu  menuItemStyles={{
      button: {
        [`&.active`]: {
          backgroundColor: ' rgba(0, 146, 77, 0.1) ',
          borderLeft:' 4px solid rgba(0, 146, 71, 1)'
        },
      },
    }}>
    <MenuItem className="mt-4 mx-1 pb-4 sidelogoli" icon={<img onClick={toggleCollapse} src={sideBarLogo} alt="sideBarLogo" className="sideBarLogo"  />}> </MenuItem>
    <MenuItem  component={<NavLink to="/dashboard" end/>} icon	={<img src={homeIcon} alt="homeicon"/>}> Home </MenuItem>
    <MenuItem component={<NavLink to="/dashboard/users"  />} icon	={<img src={userIcons} alt="usersicon"/>}> Users </MenuItem>
    <MenuItem component={<NavLink to="/dashboard/recipes" />} icon	={<img src={receipeIcon} alt="receipeicon"/>}> Recipes </MenuItem>
    <MenuItem component={<NavLink to="/dashboard/category" />} icon	={<img src={categoryIcon} alt="categoryicon"/>}> Categories </MenuItem>
    <MenuItem component={<NavLink to="/dashboard/change-password" />} icon	={<img src={changeIcon} alt="changeicon"/>}> Change Password </MenuItem>
    <MenuItem  onClick={logOut} icon={<img src={logoutIcon} alt="logouticon"/>}> Logout </MenuItem>
  
  </Menu>
</Sidebar>
  </div>;
}
