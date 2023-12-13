import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLessonById, updateLessonById } from "../../utils/ApiFunctions";
import { getAllSubjects } from "../../utils/ApiFunctions";
import { getAllModulesBySubjectId } from "../../utils/ApiFunctions";

import { Link } from "react-router-dom";

const UpdateLessonById = () => {
  
  const { id } = useParams();

  const [lesson, setLesson] = useState({
    id: "",
    name: "",
    date: "",
    period: "",
    homework: "",
    moduleId: "",
  });
  const today = new Date().toISOString().split("T")[0];
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getLessonById(id).then((lesson) => {
      setLesson(lesson);
    });
  }, []);

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

  useEffect(() => {
    getAllSubjects().then((data) => {
      setSubjects(data);
    });
  }, []);

  const handleSelectSubjectChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSubject({ ...subject, [name]: value });

    value !== ""
      ? getAllModulesBySubjectId(value).then((data) => {
          setModules(data);
        })
      : setModules({
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
  };

  const handleSelectModuleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("name: " + name + " " + "value " + value);
    setLesson({ ...lesson, [name]: value });
  };

  const handleAddLessonInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLesson({ ...lesson, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateLessonById(lesson);
    setLesson({
      id: id,
      name: lesson.name,
      date: lesson.date,
      period: lesson.period,
      homework: lesson.homework,
      moduleId: lesson.moduleId,
    });

    if (response.status === 200) {
      setSuccessMessage("The Lesson updated successfully!");
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
              <h3 className="page-title">Update Lesson</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/lessons">Lessons</Link>
                </li>
                <li className="breadcrumb-item active">Update Lesson</li>
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
                        <span>Lesson Information</span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Lesson Name <span className="login-danger">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={lesson.name}
                          onChange={handleAddLessonInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Lesson Date <span className="login-danger">*</span>
                        </label>
                        <input
                          required
                          type="date"
                          className="form-control"
                          id="date"
                          name="date"
                          value={lesson.date}
                          onChange={handleAddLessonInputChange}
                          min={today}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Lesson Period <span className="login-danger">*</span>
                        </label>
                        <input
                          required
                          type="number"
                          min="0"
                          max="8"
                          className="form-control"
                          id="period"
                          name="period"
                          value={lesson.period}
                          onChange={handleAddLessonInputChange}
                        />
                      </div>
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
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Choose the module
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="moduleId"
                          name="moduleId"
                          value={lesson.moduleId}
                          onChange={handleSelectModuleChange}
                        >
                          <option value="">Choose the module</option>
                          {modules.content.map((mod) => (
                            <option value={mod.id} key={mod.id}>
                              {mod.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>Homerwork</label>
                        <input
                          type="text"
                          className="form-control"
                          id="homework"
                          name="homework"
                          value={lesson.homework}
                          onChange={handleAddLessonInputChange}
                        />
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
export default UpdateLessonById;
