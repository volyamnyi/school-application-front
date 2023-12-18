import React, { useEffect, useState } from "react";
import { getAllAttendance } from "../../utils/ApiFunctions";
import { getLessonById } from "../../utils/ApiFunctions";
import { getStudentById } from "../../utils/ApiFunctions";
import { deleteAttendanceById } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

import ShowEntries from "../pagination/ShowEntries";
import PagePaginator from "../pagination/PagePaginator";

const Attendance = () => {
  const ROLE = localStorage.getItem("role");

  const [attendanceId, setAttendanceId] = useState();
  const [data, setData] = useState({
    content: [
      {
        id: "",
        lessonId: "",
        studentId: "",
        attendanceType: "",
      },
    ],
  });
  const [lessons, setLessons] = useState([]);
  const [students, setStudents] = useState([]);

  const totalPages = data.totalPages;
  const totalElements = data.totalElements;
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * elementsPerPage + 1;
  const endIndex = Math.min(currentPage * elementsPerPage, totalElements);

  useEffect(() => {
    getAllAttendance(currentPage, elementsPerPage).then((data) => {
      setData(data);
    });
  }, [attendanceId, currentPage, elementsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectElementsPerPageChange = (event) => {
    const value = event.target.value;
    setElementsPerPage(value);
  };

  useEffect(() => {
    data.content.forEach((att) => {
      att.lessonId !== "" &&
        getLessonById(att.lessonId).then((lesson) => {
          setLessons((prevLesson) => ({
            ...prevLesson,
            [att.lessonId]: lesson,
          }));
        });
      att.studentId !== "" &&
        getStudentById(att.studentId).then((student) => {
          setStudents((prevStudent) => ({
            ...prevStudent,
            [att.studentId]: student,
          }));
        });
    });
  }, [data.content[0]]);

  const deleteAttendanceHandler = async (event, id) => {
    await deleteAttendanceById(id);
    setAttendanceId(id);
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
                      <h3 className="page-title">Attendance</h3>
                    </div>
                    {(ROLE === "SUPER_ADMIN" ||
                      ROLE === "SCHOOL_ADMIN" ||
                      ROLE === "TEACHER") && (
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        <Link to="/add-attendance" className="btn btn-primary">
                          <i className="fas fa-plus" />
                        </Link>
                      </div>
                    )}
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
                                    Lesson
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
                                    Student
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
                                    Attendence Type
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
                                {data.content.map((att, index) => (
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
                                        <a>{lessons[att.lessonId]?.name}</a>
                                      </h2>
                                    </td>
                                    <td>
                                      <h2>
                                        <a>
                                          {students[att.studentId]?.firstName}{" "}
                                          {students[att.studentId]?.lastName}
                                        </a>
                                      </h2>
                                    </td>
                                    <td>
                                      <h2>
                                        <a>{att.attendanceType}</a>
                                      </h2>
                                    </td>

                                    {(ROLE === "SUPER_ADMIN" ||
                                      ROLE === "SCHOOL_ADMIN" ||
                                      ROLE === "TEACHER" ||
                                      ROLE === "PARENT" ||
                                      ROLE === "STUDENT") && (
                                      <td className="text-end">
                                        <div className="actions">
                                          <Link
                                            to={`/attendance-details/${att.id}`}
                                            className="btn btn-sm bg-success-light me-2"
                                          >
                                            <i className="feather-eye" />
                                          </Link>

                                          {(ROLE === "SUPER_ADMIN" ||
                                            ROLE === "SCHOOL_ADMIN" ||
                                            ROLE === "TEACHER") && (
                                            <>
                                              <Link
                                                to={`/update-attendance-by-id/${att.id}`}
                                                className="btn btn-sm bg-danger-light"
                                              >
                                                <i className="feather-edit" />
                                              </Link>
                                              <a className="btn btn-sm bg-danger-light">
                                                <i
                                                  className="feather-delete"
                                                  onClick={(event) =>
                                                    deleteAttendanceHandler(
                                                      event,
                                                      att.id
                                                    )
                                                  }
                                                />
                                              </a>
                                            </>
                                          )}
                                        </div>
                                      </td>
                                    )}
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
    </>
  );
};

export default Attendance;
