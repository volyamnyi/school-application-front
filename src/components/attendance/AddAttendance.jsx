import React, { useEffect, useState } from "react";
import { addAttendance } from "../../utils/ApiFunctions";
import { getAllSubjects } from "../../utils/ApiFunctions";
import { getAllStudents } from "../../utils/ApiFunctions";
import { getAllLessonsBySubjectId } from "../../utils/ApiFunctions";

import { Link } from "react-router-dom";

const AddAttendance = () => {
  const [newAttendance, setNewAttendance] = useState({
    lessonId: "",
    studentId: "",
    attendanceType: "",
  });
  const [lessons, setLessons] = useState({
    content: [
      {
        id: "",
        name: "",
        date: "",
        period: "",
        homework: "",
        moduleId: "",
      },
    ],
  });
  const [subject, setSubject] = useState({
    id: "",
    name: "",
  });

  const [subjects, setSubjects] = useState({
    content: [
      {
        id: "",
        name: "",
      },
    ],
  });

  const [students, setStudents] = useState({
    content: [
      {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
    ],
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllSubjects().then((data) => {
      setSubjects(data);
    });
  }, []);
  useEffect(() => {
    getAllStudents().then((data) => {
      setStudents(data);
    });
  }, []);

  const handleSelectSubjectChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSubject({ ...subject, [name]: value });

    value !== ""
      ? getAllLessonsBySubjectId(value).then((data) => {
          setLessons(data);
        })
      : setLessons({
          content: [
            {
              id: "",
              name: "",
              date: "",
              period: "",
              homework: "",
              moduleId: "",
            },
          ],
        });
  };

  const handleSelectLessonChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewAttendance({ ...newAttendance, [name]: value });
  };

  const handleAddLessonInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewAttendance({ ...newAttendance, [name]: value });
  };
  const handleSelectStudentChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewAttendance({ ...newAttendance, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addAttendance(newAttendance);
    setNewAttendance({
      lessonId: "",
      studentId: "",
      attendanceType: "",
    });

    if (response.status === 201) {
      setSuccessMessage("The Attendance added successfully!");
    } else {
      setErrorMessage(response);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };
  return (
    <>
      <div className="content container-fluid">
        {successMessage && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Holy guacamole!</strong> {successMessage}
          </div>
        )}
        {errorMessage && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Holy guacamole!</strong> {errorMessage}
          </div>
        )}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Add Attendance</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/attendance">Attendance</Link>
                </li>
                <li className="breadcrumb-item active">Add Attendance</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <h5 className="form-title">
                        <span>Attendance Information</span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Choose the subject
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="id"
                          name="id"
                          value={subject.id}
                          onChange={handleSelectSubjectChange}
                        >
                          <option value="">Choose the subject</option>
                          {subjects.content.map((sb) => (
                            <option value={sb.id} key={sb.id}>
                              {sb.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Choose the lessons
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="lessonId"
                          name="lessonId"
                          value={newAttendance.lessonId}
                          onChange={handleSelectLessonChange}
                        >
                          <option value="">Choose the lesson</option>
                          {lessons.content.map((less) => (
                            <option value={less.id} key={less.id}>
                              {less.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Choose the student
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="studentId"
                          name="studentId"
                          value={newAttendance.studentId}
                          onChange={handleSelectStudentChange}
                        >
                          <option value="">Choose the student</option>
                          {students.content.map((st) => (
                            <option value={st.id} key={st.id}>
                              {st.firstName} {st.lastName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Choose the student
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="attendanceType"
                          name="attendanceType"
                          value={newAttendance.attendanceType}
                          onChange={handleAddLessonInputChange}
                        >
                          <option value="">Choose the attendance type</option>
                          <option value="ABSENT">ABSENT</option>
                          <option value="LATE">LATE</option>
                          <option value="EXCUSED">EXCUSED</option>
                          <option value="PRESENT">PRESENT</option>
                          <option value="UNDEFINED">UNDEFINED</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="student-submit">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddAttendance;
