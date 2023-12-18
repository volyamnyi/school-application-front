import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLessonById, updateLessonById } from "../../utils/ApiFunctions";
import { getAllSubjects } from "../../utils/ApiFunctions";
import { getAllModulesBySubjectId } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

import SelectPaginator from "../pagination/SelectPaginator";
const UpdateLessonById = () => {
  const { id, selectedSubjectId } = useParams();

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

  const totalSubjectSelectListPages = subjects.totalPages;
  const totalSubjectSelectListElements = subjects.totalElements;
  const [currentSubjectSelectListPage, setCurrentSubjectSelectListPage] =
    useState(1);
  const [
    selectSubjectListElementsPerPage,
    setSelectSubjectElementsPerListPage,
  ] = useState(10);

  const totalModuleSelectListPages = modules.totalPages;
  const totalModuleSelectListElements = modules.totalElements;
  const [currentModuleSelectListPage, setCurrentModuleSelectListPage] =
    useState(1);
  const [selectModuleListElementsPerPage, setSelectModuleElementsPerListPage] =
    useState(10);

  useEffect(() => {
    getAllSubjects(
      currentSubjectSelectListPage,
      selectSubjectListElementsPerPage
    ).then((data) => {
      setSubjects(data);
    });
  }, [currentSubjectSelectListPage, selectSubjectListElementsPerPage]);

  useEffect(() => {
    subject.id !== "" &&
      getAllModulesBySubjectId(
        subject.id,
        currentModuleSelectListPage,
        selectModuleListElementsPerPage
      ).then((data) => {
        setModules(data);
      });
  }, [
    subject.id,
    currentModuleSelectListPage,
    selectModuleListElementsPerPage,
  ]);

  const handleSubjectSelectListPageChange = (pageNumber) => {
    setCurrentSubjectSelectListPage(pageNumber);
  };

  const handleModuleSelectListPageChange = (pageNumber) => {
    setCurrentModuleSelectListPage(pageNumber);
  };

  const handleSelectSubjectChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSubject({ ...subject, [name]: value });
    setCurrentModuleSelectListPage(1);
  };

  const handleSelectModuleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
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
  /** try to get modules in the loop */
  /*useEffect(() => {
    if (
      lesson.moduleId &&
      !modules.content.some((mod) => mod.id === lesson.moduleId)
    ) {
      
      setCurrentModuleSelectListPage((prevPage) => prevPage + 1);
    } else {

    }
  }, [lesson.id]);*/
  
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
                        currentPage={currentModuleSelectListPage}
                        totalPages={totalModuleSelectListPages}
                        onPageChange={handleModuleSelectListPageChange}
                      />
                      <br />
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
                          style={{
                            height: "13rem",
                          }}
                          size={2}
                        >
                          <option></option>
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
                        <textarea
                          style={{ width: "100%", height: "285px" }}
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
