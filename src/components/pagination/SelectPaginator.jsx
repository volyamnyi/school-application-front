import { React, useState } from "react";

function SelectPaginator({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="row">
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
                type="button"
                aria-controls="DataTables_Table_0"
                data-dt-idx={0}
                tabIndex={0}
                className="page-link"
                onClick={() => onPageChange(currentPage - 1)}
              >
                <i
                  className="fa fa-angle-double-left"
                  data-bs-toggle="tooltip"
                  title
                  data-bs-original-title="fa fa-angle-double-right"
                  aria-label="fa fa-angle-double-right"
                />
              </button>
            </li>
            <li
              className={`paginate_button page-item next ${
                (currentPage === totalPages || totalPages === undefined) && "disabled"
              }`}
              id="DataTables_Table_0_next"
            >
              <button
                type="button"
                aria-controls="DataTables_Table_0"
                data-dt-idx={2}
                tabIndex={0}
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
              >
                <i
                  className="fa fa-angle-double-right"
                  data-bs-toggle="tooltip"
                  title
                  data-bs-original-title="fa fa-angle-double-right"
                  aria-label="fa fa-angle-double-right"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SelectPaginator;
