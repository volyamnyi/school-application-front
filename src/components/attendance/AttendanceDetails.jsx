import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttendanceById } from "../../utils/ApiFunctions";
import { getLessonById } from "../../utils/ApiFunctions";
import { getStudentById } from "../../utils/ApiFunctions";

import { Link } from "react-router-dom";

const AttendanceDetails = () => {
  const { id } = useParams();

  const [attendance, setAttendance] = useState({
    id: "",
    lessonId: "",
    studentId: "",
    attendanceType: "",
  });
  const [lesson, setLesson] = useState({});
  const [student, setStudent] = useState({});

  useEffect(() => {
    getAttendanceById(id).then((data) => {
      setAttendance(data);
    });
  }, []);
  
  useEffect(() => {
    getLessonById(attendance.lessonId).then((data) => {
      setLesson(data);
    });
  }, [attendance.id]);
  
  useEffect(() => {
    getStudentById(attendance.studentId).then((data) => {
      setStudent(data);
    });
  }, [attendance.id]);

  return (
    <>
      <>
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Attendance Details</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/attendance">Attendance</Link>
                  </li>
                  <li className="breadcrumb-item active">Attendance Details</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="DataTables_Table_0_wrapper"
                      className="dataTables_wrapper dt-bootstrap4 no-footer"
                    >
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
                                <th style={{ width: "186.203px" }}>Lesson</th>
                                <th style={{ width: "186.203px" }}>Student</th>
                                <th style={{ width: "186.203px" }}>
                                  Attendance type
                                </th>
                                <th style={{ width: "186.203px" }}>
                                 Date
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr role="row" className="odd">
                                <td>
                                  <h2>
                                    <a>{lesson.name}</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{student.firstName} {student.lastName}</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{attendance.attendanceType}</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{lesson.date}</a>
                                  </h2>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default AttendanceDetails;
