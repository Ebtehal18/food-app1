import React from "react";
import Header from "../Shared/Header/Header";
import DashImgHeader from '../../src/assets/images/dashimg-header.png'
import HeaderDetails from "../Shared/HeaderDetails/HeaderDetails";
export default function Dashboard() {
  return <div>
    <Header 
    title={'Welcome'} 
    img={<img src={DashImgHeader} alt="dashboard header img" className="w-75"/>}
    subtitle={'ebtehal!'}
    description={'This is a welcoming screen for the entry of the application , you can now see the options'} />

    <HeaderDetails title={'Fill the Recipes !'} 
  
    subtitle={'you can now fill the meals easily using the table and form , click here and sill it with the table !'}
    to={'/dashboard/recipes'}
    />

  </div>;
}
