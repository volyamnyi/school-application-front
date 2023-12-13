import React, { useEffect, useState } from "react";
import { addLesson } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

const AddLesson = () => {
  const [newLesson, setNewLesson] = useState({
    name: "",
    date: "",
    period: "",
    homework: "",
    moduleId: "",
  });
  const today = new Date().toISOString().split("T")[0];

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /*@NotBlank
    String name;

    @NotNull
    LocalDate date;

    @Min(0) @Max(8)
    @NotNull
    Integer period;

    String homework;

    @NotNull
    Long moduleId;*/
  const handleAddLessonInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewLesson({ ...newLesson, [name]: value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addLesson(newLesson);
    setNewLesson({
      name: newLesson.name,
      date: newLesson.date,
      period: newLesson.period,
      homework: newLesson.homework,
      moduleId: newLesson.moduleId,
    });
  
    if (response) {
      setSuccessMessage("Lesson added successfully!");
    } else {
      setErrorMessage("Lesson adding error!");
    }
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
              <h3 className="page-title">Add Lesson</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/lessons">Lessons</Link>
                </li>
                <li className="breadcrumb-item active">Add Lesson</li>
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
                          value={newLesson.name}
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
                          value={newLesson.date}
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
                          type="period"
                          className="form-control"
                          id="period"
                          name="period"
                          value={newLesson.period}
                          onChange={handleAddLessonInputChange}
                        />
                      </div>
                    </div>
                    {/*<div className="col-12 col-sm-4">
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
                          value={newMedicalRecords.studentId}
                          onChange={handleAddMedicalRecordsInputChange}
                        >
                          <option value="">Choose the module</option>
                          {data.content.map((st) => (
                            <option value={st.id} key={st.id}>
                              {st.firstName} {st.lastName}
                            </option>
                          ))}
                        </select>
                      </div>
                          </div>*/}

                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>Homerwork</label>
                        <input
                          type="text"
                          className="form-control"
                          id="homework"
                          name="homework"
                          value={newLesson.homework}
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
export default AddLesson;
