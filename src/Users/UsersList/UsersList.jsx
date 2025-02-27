import React from "react";
import usersHeaderImg from '../../assets/images/categoryimg-header.svg'
import Header from "../../Shared/Header/Header";
import HeaderDetails from "../../Shared/HeaderDetails/HeaderDetails";
export default function UsersList() {
  return <>
  <Header 
    title={'Users'} 
    img={<img src={usersHeaderImg} alt="users header img"/>}
    subtitle={'List'}
    description={'You can now add your items that any user can order it from the Application and you can edit'} />

  <HeaderDetails 
    title={'Users Table Details'}
    subtitle={'You can check all details'}
     />
             
  </>;
}
