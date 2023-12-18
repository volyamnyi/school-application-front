import React from 'react'

function ShowEntries({elementsPerPage, handleSelectElementsPerPageChange}) {
  return (
    <div className="row">
    <div className="col-sm-12 col-md-6">
      <div
        className="dataTables_length"
        id="DataTables_Table_0_length"
      >
        <label>
          Show entries
          <select
            name="DataTables_Table_0_length"
            id="id"
            value={elementsPerPage}
            onChange={handleSelectElementsPerPageChange}
            aria-controls="DataTables_Table_0"
            className="custom-select custom-select-sm form-control form-control-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
      </div>
    </div>
    <div className="col-sm-12 col-md-6" />
  </div>
  )
}

export default ShowEntries