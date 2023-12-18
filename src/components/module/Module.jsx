import React, { useEffect, useState } from "react";
import { getAllModulesBySubjectId } from "../../utils/ApiFunctions";
import { getAllSubjects } from "../../utils/ApiFunctions";
import { deleteModuleById } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

import ShowEntries from "../pagination/ShowEntries";
import PagePaginator from "../pagination/PagePaginator";
import SelectPaginator from "../pagination/SelectPaginator";

const Module = () => {
  const ROLE = localStorage.getItem("role");

  const [showModules, setShowModules] = useState(false);
  const [moduleId, setModuleId] = useState();
  const [subjects, setSubjects] = useState({
    content: [
      {
        id: "",
        name: "",
      },
    ],
  });

  const [module, setModule] = useState({
    subjectId: "",
  });

  const [modules, setModules] = useState({
    content: [
      {
        id: "",
        subjectId: "",
        classRoomId: "",
        teacherId: "",
        name: "",
        startDate: "",
        endDate: "",
      },
    ],
  });

  const totalPages = modules.totalPages;
  const totalElements = modules.totalElements;
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * elementsPerPage + 1;
  const endIndex = Math.min(currentPage * elementsPerPage, totalElements);

  const totalSelectListPages = subjects.totalPages;
  const totalSelectListElements = subjects.totalElements;
  const [currentSelectListPage, setCurrentSelectListPage] = useState(1);
  const [selectListElementsPerPage, setSelectElementsPerListPage] =
    useState(10);

  useEffect(() => {
    getAllSubjects(currentSelectListPage, selectListElementsPerPage).then(
      (data) => {
        setSubjects(data);
      }
    );
  }, [currentSelectListPage, selectListElementsPerPage]);

  const handleSelectListPageChange = (pageNumber) => {
    setCurrentSelectListPage(pageNumber);
  };

  const handleGetModuleByIdSelectChange = (event) => {
    const name = event.target.name;

    const subjectId = event.target.value;

    subjectId === "" ? setShowModules(false) : setShowModules(true);

    setModule({ ...subjectId, [name]: subjectId });
  };

  useEffect(() => {
    module.subjectId !== "" &&
      getAllModulesBySubjectId(
        module.subjectId,
        currentPage,
        elementsPerPage
      ).then((data) => {
        setModules(data);
      });
  }, [moduleId, module.subjectId, currentPage, elementsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectElementsPerPageChange = (event) => {
    const value = event.target.value;
    setElementsPerPage(value);
  };

  const deleteModuleHandler = async (event, id) => {
    await deleteModuleById(id);
    setModuleId(id);
  };

  return (
    <>
      <div className="content container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Modules</h3>
                    </div>
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      <Link to="/add-module" className="btn btn-primary">
                        <i className="fas fa-plus" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <div
                    id="DataTables_Table_0_wrapper"
                    className="dataTables_wrapper dt-bootstrap4 no-footer"
                  >
                    <ShowEntries
                      elementsPerPage={elementsPerPage}
                      handleSelectElementsPerPageChange={
                        handleSelectElementsPerPageChange
                      }
                    />
                    <br />
                    <div className="col-12 col-sm-4">
                      <SelectPaginator
                        currentPage={currentSelectListPage}
                        totalPages={totalSelectListPages}
                        onPageChange={handleSelectListPageChange}
                      />
                      <br />
                      <div className="form-group local-forms">
                        <label>
                          Choose the subject
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="subjectId"
                          name="subjectId"
                          value={module.subjectId}
                          onChange={handleGetModuleByIdSelectChange}
                          style={{
                            height: "13rem",
                          }}
                          size={2}
                        > <option></option>
                          {subjects.content.map((sbj) => (
                            <option value={sbj.id} key={sbj.id}>
                              {sbj.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {showModules && modules.content.length > 0 && (
                      <div className="row">
                        <div className="col-sm-12">
                          <table
                            className="table border-0 star-student table-hover table-center mb-0 datatable table-striped dataTable no-footer"
                            id="DataTables_Table_0"
                            role="grid"
                            aria-describedby="DataTables_Table_0_info"
                          >
                            <thead className="student-thread">
                              <tr role="row">
                                <th
                                  className="sorting_asc"
                                  tabIndex={0}
                                  aria-controls="DataTables_Table_0"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-sort="ascending"
                                  aria-label=": activate to sort column descending"
                                  style={{ width: "109.141px" }}
                                >
                                  <div className="form-check check-tables">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      defaultValue="something"
                                    />
                                  </div>
                                </th>

                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="DataTables_Table_0"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Name: activate to sort column ascending"
                                  style={{ width: "186.203px" }}
                                >
                                  Name
                                </th>

                                <th
                                  className="text-end sorting"
                                  tabIndex={0}
                                  aria-controls="DataTables_Table_0"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Action: activate to sort column ascending"
                                  style={{ width: "194.359px" }}
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {modules.content.map((module, index) => (
                                <tr role="row" key={index} className="odd">
                                  <td className="sorting_1">
                                    <div className="form-check check-tables">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        defaultValue="something"
                                      />
                                    </div>
                                  </td>

                                  <td>
                                    <h2>
                                      <a>{module.name}</a>
                                    </h2>
                                  </td>

                                  <td className="text-end">
                                    <div className="actions">
                                      <Link
                                        to={`/module-details/${module.id}`}
                                        className="btn btn-sm bg-success-light me-2"
                                      >
                                        <i className="feather-eye" />
                                      </Link>

                                      {(ROLE === "SUPER_ADMIN" ||
                                        ROLE === "SCHOOL_ADMIN" ||
                                        ROLE === "TEACHER") && (
                                        <>
                                          <Link
                                            to={`/update-module-by-id/${module.id}`}
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="feather-edit" />
                                          </Link>
                                          <a className="btn btn-sm bg-danger-light">
                                            <i
                                              className="feather-delete"
                                              onClick={(event) =>
                                                deleteModuleHandler(
                                                  event,
                                                  module.id
                                                )
                                              }
                                            />
                                          </a>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {showModules && modules.content.length > 0 && (
                      <PagePaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        elementsPerPage={elementsPerPage}
                        totalElements={totalElements}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Module;
