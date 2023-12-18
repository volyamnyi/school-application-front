import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGradeById } from "../../utils/ApiFunctions";
import { updateGradeById } from "../../utils/ApiFunctions";
import { getAllStudents } from "../../utils/ApiFunctions";
import { getAllSubjects } from "../../utils/ApiFunctions";
import { getAllLessonsBySubjectId } from "../../utils/ApiFunctions";

import { Link } from "react-router-dom";

const UpdateGradeById = () => {
  const { id ,selectedSubjectId} = useParams();
  console.log("selected SUbject id: "+selectedSubjectId)

  const [grade, setGrade] = useState({
    id: "",
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
    id: selectedSubjectId,
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
    getGradeById(id).then((data)=>{
        setGrade(data)
    });
  },[]);

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

  useEffect(()=>{
    getAllLessonsBySubjectId(selectedSubjectId).then((data) => {
        setLessons(data);
      })
  },[])

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
    setGrade({ ...grade, [name]: value });
  };

  const handleAddGradeInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setGrade({ ...grade, [name]: value });
  };
  const handleSelectStudentChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setGrade({ ...grade, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateGradeById(id, grade);
   

    if (response.status === 200) {
      setSuccessMessage("The Grade updated successfully!");
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
              <h3 className="page-title">Update Grade</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/grade">Grade</Link>
                </li>
                <li className="breadcrumb-item active">Update Grade</li>
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
                          value={grade.studentId}
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
                          value={grade.lessonId}
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
                          value={grade.gradeValue}
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
                          value={grade.gradeType}
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
export default UpdateGradeById;
