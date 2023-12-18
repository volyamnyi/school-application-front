import React, { useEffect, useState } from "react";
import { getAllTeachers } from "../../utils/ApiFunctions";
import { deleteTeacherById } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

import ShowEntries from "../pagination/ShowEntries";
import PagePaginator from "../pagination/PagePaginator";

const Teacher = () => {
  const ROLE = localStorage.getItem("role")

  const [teacherId, setTeacherId] = useState();
  const [data, setData] = useState({
    content: [
      {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subjects: [{}],
        classes: [{}],
      },
    ],
  });

  const totalPages = data.totalPages;
  const totalElements = data.totalElements;
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * elementsPerPage + 1;
  const endIndex = Math.min(currentPage * elementsPerPage, totalElements);

  useEffect(() => {
    getAllTeachers(currentPage, elementsPerPage).then((data) => {
      setData(data);
    });
  }, [teacherId, currentPage, elementsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectElementsPerPageChange = (event) => {
    const value = event.target.value;
    setElementsPerPage(value);
  };

  const deleteTeacherHandler = async (event, id) => {
    await deleteTeacherById(id);
    setTeacherId(id);
  };

  return (
    <div className="content container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Teachers</h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <Link to="/add-teacher" className="btn btn-primary">
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
                  {data.content.length > 0 && data.content[0].id !== "" && (
                    <>
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
                                  aria-label="
  
  
  
                              : activate to sort column descending"
                                  style={{ width: "36.2969px" }}
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
                                  style={{ width: "190.547px" }}
                                >
                                  Name
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="DataTables_Table_0"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Name: activate to sort column ascending"
                                  style={{ width: "190.547px" }}
                                >
                                  Last Name
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="DataTables_Table_0"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Name: activate to sort column ascending"
                                  style={{ width: "190.547px" }}
                                >
                                  Email
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="DataTables_Table_0"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Mobile Number: activate to sort column ascending"
                                  style={{ width: "127.984px" }}
                                >
                                  Mobile Number
                                </th>

                                <th
                                  className="text-end sorting"
                                  tabIndex={0}
                                  aria-controls="DataTables_Table_0"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="Action: activate to sort column ascending"
                                  style={{ width: "91.5625px" }}
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.content.map((tsc, index) => (
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
                                    <h2 className="table-avatar">
                                      <a className="avatar avatar-sm me-2">
                                        <img
                                          className="avatar-img rounded-circle"
                                          src="assets/img/profiles/avatar-02.jpg"
                                          alt="User Image"
                                        />
                                      </a>
                                      <a>{tsc.firstName}</a>
                                    </h2>
                                  </td>
                                  <td>
                                    <a>{tsc.lastName}</a>
                                  </td>
                                  <td>{tsc.email}</td>
                                  <td>{tsc.phone}</td>

                                  <td className="text-end">
                                    <div className="actions">
                                      <Link
                                        to={`/teacher-details/${tsc.id}`}
                                        className="btn btn-sm bg-success-light me-2"
                                      >
                                        <i className="feather-eye" />
                                      </Link>

                                      {(ROLE === "SUPER_ADMIN" ||
                                        ROLE === "SCHOOL_ADMIN") && (
                                        <>
                                          <Link
                                            to={`/update-teacher-by-id/${tsc.id}`}
                                            className="btn btn-sm bg-danger-light"
                                          >
                                            <i className="feather-edit" />
                                          </Link>
                                          <a className="btn btn-sm bg-danger-light">
                                            <i
                                              className="feather-delete"
                                              onClick={(event) =>
                                                deleteTeacherHandler(
                                                  event,
                                                  tsc.id
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
                      <PagePaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        elementsPerPage={elementsPerPage}
                        totalElements={totalElements}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
