import React from "react";

export default function Pagination({ totalNumberOfPages, getFun, setActivePage, activePage, isUsers }) {
  const pagesToShow = 3; // Number of pages to show at a time
  // acyive 4
  const startPage = Math.max(1, activePage - Math.floor(pagesToShow / 2));//(acive-1)//3
  const endPage = Math.min(totalNumberOfPages.length, startPage + pagesToShow - 1);//58,3 (active+1)//5
// console.log(Math.max(1, activePage - Math.floor(pagesToShow / 2)), Math.min(totalNumberOfPages.length, startPage + pagesToShow - 1))//1,3
  // Determine the start and end pages

  const handlePrevious = () => {
    if (activePage > 1) {
      setActivePage((prev) => {
        const newPage = prev - 1;
        getFun(isUsers ? 15 : 5, newPage);
        return newPage;
      });
    }
  };

  const handleNext = () => {
    if (activePage < totalNumberOfPages.length) {
      setActivePage((prev) => {
        //2
        const newPage = prev + 1;
        getFun(isUsers ? 15 : 5, newPage);
        return newPage;
      });
    }
  };

  return (
    <div className="container">
      <nav aria-label="Pagination">
        <ul className="pagination justify-content-end flex-wrap gap-y-2">
          {/* Previous Button */}
          <li className={`page-item ${activePage === 1 ? "disabled" : ""}`} onClick={handlePrevious}>
            <a className="page-link">Previous</a>
          </li>

          {/* Display pages dynamically */}
          {startPage > 1 && (
            <li className="page-item">
              <a className="page-link">...</a>
            </li>
          )}
          
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const page = startPage + index;
            return (
              <li key={page} className={`page-item ${activePage === page ? "active" : ""}`}
                  onClick={() => {
                    setActivePage(page);
                    getFun(isUsers ? 15 : 5, page);
                  }}>
                <a className="page-link">{page}</a>
              </li>
            );
          })}

          {endPage < totalNumberOfPages.length && (
            <li className="page-item">
              <a className="page-link">...</a>
            </li>
          )}

          {/* Next Button */}
          <li className={`page-item ${activePage === totalNumberOfPages.length ? "disabled" : ""}`} onClick={handleNext}>
            <a className="page-link">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
