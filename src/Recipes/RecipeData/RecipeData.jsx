import React from "react";
import { Link } from "react-router-dom";

export default function RecipeData() {
  return <>
  <div className="d-flex details container-fluid  px-md-4 px-2 ">
    <div className={`w-100  d-flex flex-md-row flex-column justify-content-between py-2 py-md-5  px-3 rounded-3 align-items-center dashboard-header`}>
    <div className="caption mb-2 mb-md-0">
      <h4 className="mb-0">Fill the <span>Recipes</span>! </h4>
      <p className="mb-0">you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
    </div>
   
    <Link to={'/dashboard/recipes'} className={" btn-add px-3 py-2 text-decoration-none  px-md-5 py-md-3  text-white fw-bold"}>
  All Recipes<i className="fa-solid fa-arrow-right ms-2"></i></Link>
    </div>
  
  </div>



   <div className="container pt-4 recipes-data">
 <div className="row justify-content-center align-items-center ">
  <div className="col-md-8">
  <form >
 
  <div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="Recipe Name" aria-label="Recipe Name" aria-describedby="basic-addon1"/>
</div>

<select className="form-select mb-3" aria-label="Default select example">
  <option selected>Tag</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>

<div className="input-group mb-3">
  <input type="number" className="form-control border-end-0" placeholder="Recipe Price" aria-label="Recipe Price" aria-describedby="basic-addon1"/>
  <div className="input-group-append">
    <label className="input-group-text" for="inputGroupSelect02">EGP</label>
  </div>
</div>

<select className="form-select mb-3" aria-label="Default select example">
  <option selected>Categories</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>

 
 
<div className="mb-3">
  <textarea className="form-control "  rows="5" placeholder="Description"></textarea>
</div>
<div className="ms-auto btns-recipes mt-3">
  <button className="btn me-4 btn-cancel px-3 py-2">Cancel</button>
<button className="btn-add px-3 py-2" type="submit">Save</button>
</div>
  </form>
  </div>
  </div></div>
  </>
}
