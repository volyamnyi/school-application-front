import React, { useEffect, useState } from "react";
import { addAttendance } from "../../utils/ApiFunctions";
import { getAllSubjects } from "../../utils/ApiFunctions";
import { getAllStudents } from "../../utils/ApiFunctions";
import { getAllLessonsBySubjectId } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

import SelectPaginator from "../pagination/SelectPaginator";

const AddAttendance = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const totalStudentSelectListPages = students.totalPages;
  const totalStudentSelectListElements = students.totalElements;
  const [currentStudentSelectListPage, setCurrentStudentSelectListPage] =
    useState(1);
  const [
    selectStudentListElementsPerPage,
    setStudentSelectElementsPerListPage,
  ] = useState(10);

  const totalSubjectSelectListPages = subjects.totalPages;
  const totalSubjectSelectListElements = subjects.totalElements;
  const [currentSubjectSelectListPage, setCurrentSubjectSelectListPage] =
    useState(1);
  const [
    selectSubjectListElementsPerPage,
    setSelectSubjectElementsPerListPage,
  ] = useState(10);

  const totalLessonSelectListPages = lessons.totalPages;
  const totalLessonSelectListElements = lessons.totalElements;
  const [currentLessonSelectListPage, setCurrentLessonSelectListPage] =
    useState(1);
  const [selectLessonListElementsPerPage, setSelectLessonElementsPerListPage] =
    useState(10);

  useEffect(() => {
    getAllStudents(
      currentStudentSelectListPage,
      selectStudentListElementsPerPage
    ).then((data) => {
      setStudents(data);
    });
  }, [currentStudentSelectListPage, selectStudentListElementsPerPage]);

  useEffect(() => {
    getAllSubjects(
      currentSubjectSelectListPage,
      selectSubjectListElementsPerPage
    ).then((data) => {
      setSubjects(data);
    });
  }, [currentSubjectSelectListPage, selectSubjectListElementsPerPage]);

  useEffect(() => {
    if (subject.id !== "") {
      getAllLessonsBySubjectId(
        subject.id,
        currentLessonSelectListPage,
        selectLessonListElementsPerPage
      ).then((data) => {
        setLessons(data);
      });
    }
  }, [
    subject.id,
    currentLessonSelectListPage,
    selectLessonListElementsPerPage,
  ]);

  const handleStudentSelectListPageChange = (pageNumber) => {
    setCurrentStudentSelectListPage(pageNumber);
  };

  const handleSubjectSelectListPageChange = (pageNumber) => {
    setCurrentSubjectSelectListPage(pageNumber);
  };

  const handleLessonSelectListPageChange = (pageNumber) => {
    setCurrentLessonSelectListPage(pageNumber);
  };

  const handleSelectSubjectChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSubject({ ...subject, [name]: value });

    /*value !== ""
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
        });*/
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
                    <div className="col-12 col-sm-4">
                      <SelectPaginator
                        currentPage={currentStudentSelectListPage}
                        totalPages={totalStudentSelectListPages}
                        onPageChange={handleStudentSelectListPageChange}
                      />
                      <br />
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
                          style={{
                            height: "13rem",
                          }}
                          size={2}
                        >
                          <option></option>
                          {students.content.map((st) => (
                            <option value={st.id} key={st.id}>
                              {st.firstName} {st.lastName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <SelectPaginator
                        currentPage={currentSubjectSelectListPage}
                        totalPages={totalSubjectSelectListPages}
                        onPageChange={handleSubjectSelectListPageChange}
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
                          id="id"
                          name="id"
                          value={subject.id}
                          onChange={handleSelectSubjectChange}
                          style={{
                            height: "13rem",
                          }}
                          size={2}
                        >
                          <option></option>
                          {subjects.content.map((sb) => (
                            <option value={sb.id} key={sb.id}>
                              {sb.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <SelectPaginator
                        currentPage={currentLessonSelectListPage}
                        totalPages={totalLessonSelectListPages}
                        onPageChange={handleLessonSelectListPageChange}
                      />
                      <br />
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
                          style={{
                            height: "13rem",
                          }}
                          size={2}
                        >
                          <option></option>
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
                          Choose the attendance type
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
