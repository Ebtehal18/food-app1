import React from "react";

export default function Pagination({totalNumberOfPages,getFun,setActivePage,activePage,isUsers}) {
  

 const handelPrevios=()=>{
  if (activePage>1){
    setActivePage(prev => {
      const newPage = prev - 1;
      getFun(isUsers ? 15 : 5, newPage);
      return newPage;
    });
  }
 }
const handelNext=()=>{
  if(activePage<totalNumberOfPages.length){
    setActivePage(prev => {
      const newPage = prev + 1;
      getFun(isUsers ? 15 : 5, newPage);
      console.log(newPage)
      return newPage;
    });
  }
}


  return <div className="container">
  <nav aria-label="...">
    <ul className="pagination justify-content-end flex-wrap gap-y-2">
      <li  className={`page-item ${activePage === 1 ? "disabled" : ""}`} 
      onClick={handelPrevios}
      >
        <a className="page-link">Previous</a>
  
      </li>
      {totalNumberOfPages.map((page)=>{
        return <>
        <li key={page} className={`page-item ${activePage===page?'active':''}`} onClick={()=>{
          setActivePage(page);
          getFun(isUsers?15:5,page)
          }}>
        <a className="page-link" href="#">{page}</a></li>
      
        </>
      }
      )}
  
     <li  className={`page-item ${activePage === totalNumberOfPages.length ? "disabled" : ""}`}  onClick={handelNext}>
         <a className="page-link" href="#">Next</a>
       </li>
     
    </ul>
  </nav>
  </div>
}
