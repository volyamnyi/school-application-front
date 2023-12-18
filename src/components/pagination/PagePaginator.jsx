import { React, useState } from "react";

function PagePaginator({
  currentPage,
  totalPages,
  onPageChange,
  totalElements,
  startIndex,
  endIndex,
}) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="row">
      <div className="col-sm-12 col-md-5">
        <div
          className="dataTables_info"
          id="DataTables_Table_0_info"
          role="status"
          aria-live="polite"
        >
          Showing {startIndex} to {endIndex} of {totalElements} entries
        </div>
      </div>
      <div className="col-sm-12 col-md-7">
        <div
          className="dataTables_paginate paging_simple_numbers"
          id="DataTables_Table_0_paginate"
        >
          <ul className="pagination">
            <li
              className={`paginate_button page-item previous ${
                currentPage === 1 && "disabled"
              }`}
              id="DataTables_Table_0_previous"
            >
              <button
                aria-controls="DataTables_Table_0"
                data-dt-idx={0}
                tabIndex={0}
                className="page-link"
                onClick={() => onPageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((pageNumber) => (
              <li
                key={pageNumber}
                className={`paginate_button page-item ${
                  currentPage === pageNumber ? "active" : ""
                }`}
              >
                <button
                  aria-controls="DataTables_Table_0"
                  data-dt-idx={1}
                  tabIndex={0}
                  className="page-link"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            <li
              className={`paginate_button page-item next ${
                currentPage === totalPages && "disabled"
              }`}
              id="DataTables_Table_0_next"
            >
              <button
                aria-controls="DataTables_Table_0"
                data-dt-idx={2}
                tabIndex={0}
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PagePaginator;
