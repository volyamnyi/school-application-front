import React, { useEffect, useState } from "react";
import { addStudent } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

const AddStudent = () => {
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddStudentInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addStudent(
      newStudent.firstName,
      newStudent.lastName,
      newStudent.email,
      newStudent.phone
    );
    setNewStudent({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    if (response.status===201) {
      setSuccessMessage("The Student added successfully!");
    } else {
      setErrorMessage(response);
    }
    setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
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
            <h3 className="page-title">Add Student</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/students">Students</Link>
              </li>
              <li className="breadcrumb-item active">Add Student</li>
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
                        First Name <span className="login-danger">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Enter First Name"
                        id="firstName"
                        name="firstName"
                        value={newStudent.firstName}
                        onChange={handleAddStudentInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>
                        Last Name <span className="login-danger">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Enter Last Name"
                        id="lastName"
                        name="lastName"
                        value={newStudent.lastName}
                        onChange={handleAddStudentInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        id="email"
                        name="email"
                        value={newStudent.email}
                        onChange={handleAddStudentInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>
                        Mobile <span className="login-danger">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Enter Phone Number"
                        id="phone"
                        name="phone"
                        value={newStudent.phone}
                        onChange={handleAddStudentInputChange}
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
  );
};

export default AddStudent;
