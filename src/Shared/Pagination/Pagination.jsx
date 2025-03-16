import React from "react";

export default function Pagination({totalNumberOfPages,getFun,activePage,setActivePage,isUsers}) {

 
  return <div className="container">
  <nav aria-label="...">
    <ul className="pagination justify-content-end flex-wrap gap-y-2">
      <li  className={`page-item ${activePage === 1 ? "disabled" : ""}`} 
      onClick={()=>{
        if (activePage>1){
          setActivePage(activePage-1)
          getFun(isUsers?15:5,activePage-1);
        }
      }
      }>
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
  
     <li  className={`page-item ${activePage === totalNumberOfPages.length ? "disabled" : ""}`}  onClick={()=>{
      if(activePage<totalNumberOfPages.length){
        setActivePage(activePage+1)
        getFun(isUsers?15:5,activePage+1);
      }
      }}>
         <a className="page-link" href="#">Next</a>
       </li>
     
    </ul>
  </nav>
  </div>
}
