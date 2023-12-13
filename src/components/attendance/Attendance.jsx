import React, { useEffect, useState } from "react";
import { getAllAttendance } from "../../utils/ApiFunctions";
import { getLessonById } from "../../utils/ApiFunctions";
import { getStudentById } from "../../utils/ApiFunctions";
import { deleteAttendanceById } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

const Attendance = () => {
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

  useEffect(() => {
    getAllAttendance().then((data) => {
      setData(data);
    });
  }, []);

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

  /*useEffect(() => { 
      getStudentById(studentId).then((student) => {
      setStudent(student);
    });
     }, []);
  
  };*/

  const deleteAttendanceHandler = async (event, id) => {
    await deleteAttendanceById(id);
    getAllAttendance().then((data) => {
      setData(data);
    });
  };
  console.log(data.content[0]);
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
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      <Link to="/add-attendance" className="btn btn-primary">
                        <i className="fas fa-plus" />
                      </Link>
                    </div>
                  </div>
                </div>
                {data.content.length > 0 && data.content[0].id !== "" && (
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

                                  <td className="text-end">
                                    <div className="actions">
                                      <Link
                                        to={`/attendance-details/${att.id}`}
                                        className="btn btn-sm bg-success-light me-2"
                                      >
                                        <i className="feather-eye" />
                                      </Link>

                                      {localStorage.getItem("role") ===
                                        "SUPER_ADMIN" && (
                                        <>
                                          <Link
                                            to={`/update-attendance-by-id/${att.id}`}
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
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row">
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
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
