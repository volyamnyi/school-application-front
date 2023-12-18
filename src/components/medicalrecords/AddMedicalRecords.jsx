import React, { useEffect, useState } from "react";
import { addMedicalRecords } from "../../utils/ApiFunctions";
import { getAllStudents } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

import SelectPaginator from "../pagination/SelectPaginator";

const AddMedicalRecords = () => {
  const [newMedicalRecords, setNewMedicalRecords] = useState({
    healthGroup: "",
    allergies: "",
    info: "",
    studentId: "",
  });

  const [data, setData] = useState({
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

  const totalStudentSelectListPages = data.totalPages;
  const totalStudentSelectListElements = data.totalElements;
  const [currentStudentSelectListPage, setCurrentStudentSelectListPage] = useState(1);
  const [selectStudentListElementsPerPage, setStudentSelectElementsPerListPage] =
    useState(10);

  useEffect(() => {
    getAllStudents(currentStudentSelectListPage, selectStudentListElementsPerPage).then(
      (data) => {
        setData(data);
      }
    );
  }, [currentStudentSelectListPage, selectStudentListElementsPerPage]);

  const handleStudentSelectListPageChange = (pageNumber) => {
    setCurrentStudentSelectListPage(pageNumber);
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddMedicalRecordsInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewMedicalRecords({ ...newMedicalRecords, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addMedicalRecords({
      healthGroup: newMedicalRecords.healthGroup,
      allergies: newMedicalRecords.allergies,
      info: newMedicalRecords.info,
      studentId: newMedicalRecords.studentId,
    });
    setNewMedicalRecords({
      healthGroup: "",
      allergies: "",
      info: "",
      studentId: "",
    });
    if (response) {
      setSuccessMessage("Medical Records added successfully!");
    } else {
      setErrorMessage("Medical Records adding error!");
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
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
            <h3 className="page-title">Add Medical Records</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/medical-records">Medical Records</Link>
              </li>
              <li className="breadcrumb-item active">Add Medical Records</li>
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
                      <span>Basic Details</span>
                    </h5>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>
                        Choose the health group
                        <span className="login-danger">*</span>
                      </label>
                      <select
                        required
                        className="form-control"
                        id="healthGroup"
                        name="healthGroup"
                        value={newMedicalRecords.healthGroup}
                        onChange={handleAddMedicalRecordsInputChange}
                      >
                        <option value="">Choose the Health Group</option>

                        <option value="GROUP_A">GROUP_A</option>
                        <option value="GROUP_B">GROUP_B</option>
                        <option value="GROUP_C">GROUP_C</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>Allergies</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Allergies"
                        id="allergies"
                        name="allergies"
                        value={newMedicalRecords.allergies}
                        onChange={handleAddMedicalRecordsInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>Info</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter additional info"
                        id="info"
                        name="info"
                        value={newMedicalRecords.info}
                        onChange={handleAddMedicalRecordsInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <SelectPaginator
                      currentPage={currentStudentSelectListPage}
                      totalPages={totalStudentSelectListPages}
                      onPageChange={handleStudentSelectListPageChange}
                    />

                    {/*<div className="dropdown">
                      <a
                        className="dropdown-toggle show"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="true"
                      >
                        Dropdown
                      </a>
                      <div className="dropdown-menu show" style={{}}>
                        {data.content.map((st) => (
                          <option
                            className="dropdown-item"
                            href="#"
                            value={st.id}
                            onClick={(event) =>
                              handleAddMedicalRecordsSelectClick(
                                event,
                                "studentId"
                              )
                            }
                          >
                            {st.firstName} {st.lastName}
                          </option>
                        ))}
                      </div>
                    </div>*/}

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
                        value={newMedicalRecords.studentId}
                        onChange={handleAddMedicalRecordsInputChange}
                        style={{
                          height: "13rem"
                             
                        }}
                        size={2}
                      ><option></option>
                        {data.content.map((st) => (
                          <option value={st.id} key={st.id}>
                            {st.firstName} {st.lastName}
                          </option>
                        ))}
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
  );
};

export default AddMedicalRecords;
