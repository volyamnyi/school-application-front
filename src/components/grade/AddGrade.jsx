import React, { useEffect, useState } from "react";
import { addGrade } from "../../utils/ApiFunctions";
import { getAllStudents } from "../../utils/ApiFunctions";
import { getAllSubjects } from "../../utils/ApiFunctions";
import { getAllLessonsBySubjectId } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

import SelectPaginator from "../pagination/SelectPaginator";

const AddGrade = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [newGrade, setNewGrade] = useState({
    studentId: "",
    lessonId: "",
    gradeValue: "",
    gradeType: "",
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
    setNewGrade({ ...newGrade, [name]: value });
  };

  const handleAddGradeInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewGrade({ ...newGrade, [name]: value });
  };
  const handleSelectStudentChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewGrade({ ...newGrade, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addGrade(newGrade);
    setNewGrade({
      studentId: "",
      lessonId: "",
      gradeValue: "",
      gradeType: "",
    });

    if (response.status === 200) {
      setSuccessMessage("The Grade added successfully!");
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
              <h3 className="page-title">Add Grade</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/grades">Grade</Link>
                </li>
                <li className="breadcrumb-item active">Add Grade</li>
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
                        <span>Grade Information</span>
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
                          value={newGrade.studentId}
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
                          value={newGrade.lessonId}
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
                          Grade Value <span className="login-danger">*</span>
                        </label>
                        <input
                          required
                          type="number"
                          min="1"
                          max="12"
                          className="form-control"
                          id="gradeValue"
                          name="gradeValue"
                          value={newGrade.gradeValue}
                          onChange={handleAddGradeInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group local-forms">
                        <label>
                          Choose the grade type
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="gradeType"
                          name="gradeType"
                          value={newGrade.gradeType}
                          onChange={handleAddGradeInputChange}
                        >
                          <option value="">Choose the grade type</option>
                          <option value="WORK">WORK</option>
                          <option value="HOMEWORK">HOMEWORK</option>
                          <option value="MINI_TEST">MINI_TEST</option>
                          <option value="TEST">TEST</option>
                          <option value="MODULE">MODULE</option>
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
export default AddGrade;
