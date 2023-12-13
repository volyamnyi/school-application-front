import React, { useEffect, useState } from "react";
import { getAllModulesBySubjectId } from "../../utils/ApiFunctions";
import { getAllSubjects } from "../../utils/ApiFunctions";
import { deleteModuleById } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

const Module = () => {
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
  const [showModules, setShowModules] = useState(false);

  const handleGetModuleByIdSelectChange = (event) => {
    const name = event.target.name;

    const subjectId = event.target.value;
   
    subjectId === "" ? setShowModules(false) : setShowModules(true);
    
    setModule({ ...subjectId, [name]: subjectId });
    
    subjectId !== "" && getAllModulesBySubjectId(subjectId).then((data) => {
      setModules(data);
    });
  };

  const [subject, setSubject] = useState({
    content: [
      {
        id: "",
        name: "",
      },
    ],
  });

  useEffect(() => {
    getAllSubjects().then((data) => {
      setSubject(data);
    });
  }, []);

  const deleteModuleHandler = async (event, id) => {
    await deleteModuleById(id);
    getAllModulesBySubjectId(module.subjectId).then((data) => {
      setModules(data);
    });
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
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <div
                          className="dataTables_length"
                          id="DataTables_Table_0_length"
                        >
                          <label>
                            Show
                            <select
                              name="DataTables_Table_0_length"
                              aria-controls="DataTables_Table_0"
                              className="custom-select custom-select-sm form-control form-control-sm"
                            >
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                              <option value={100}>100</option>
                            </select>
                            entries
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6" />
                    </div>
                    <div className="col-12 col-sm-4">
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
                        >
                          <option value="">
                            Choose the subject
                          </option>
                          {subject.content.map((sbj) => (
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

                                      {localStorage.getItem("role") ===
                                        "SUPER_ADMIN" && (
                                        <>
                                          <Link
                                            to={`/update-module-by-id/${module.id}`}
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="feather-edit" />
                                          </Link>
                                          <a
                                            href="#"
                                            className="btn btn-sm bg-danger-light"
                                          >
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
                    {showModules && modules.content.length > 0 &&<div className="row">
                      <div className="col-sm-12 col-md-5">
                        <div
                          className="dataTables_info"
                          id="DataTables_Table_0_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing 1 to 6 of 6 entries
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-7">
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="DataTables_Table_0_paginate"
                        >
                          <ul className="pagination">
                            <li
                              className="paginate_button page-item previous disabled"
                              id="DataTables_Table_0_previous"
                            >
                              <a
                                href="#"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx={0}
                                tabIndex={0}
                                className="page-link"
                              >
                                Previous
                              </a>
                            </li>
                            <li className="paginate_button page-item active">
                              <a
                                href="#"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx={1}
                                tabIndex={0}
                                className="page-link"
                              >
                                1
                              </a>
                            </li>
                            <li
                              className="paginate_button page-item next disabled"
                              id="DataTables_Table_0_next"
                            >
                              <a
                                href="#"
                                aria-controls="DataTables_Table_0"
                                data-dt-idx={2}
                                tabIndex={0}
                                className="page-link"
                              >
                                Next
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>}
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
