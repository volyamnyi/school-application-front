import React, { useEffect, useState } from "react";
import { addTeacher } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

const AddTeacher = () => {
  const [newTeacher, setNewTeacher] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddTeacherInputChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setNewTeacher({ ...newTeacher, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addTeacher(
      newTeacher.firstName,
      newTeacher.lastName,
      newTeacher.email,
      newTeacher.phone
    );
    setNewTeacher({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    if (response.status===201) {
      setSuccessMessage("The Teacher added successfully!");
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
            <h3 className="page-title">Add Teacher</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/teachers">Teachers</Link>
              </li>
              <li className="breadcrumb-item active">Add Teacher</li>
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
                        value={newTeacher.firstName}
                        onChange={handleAddTeacherInputChange}
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
                        value={newTeacher.lastName}
                        onChange={handleAddTeacherInputChange}
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
                        value={newTeacher.email}
                        onChange={handleAddTeacherInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>
                        Mobile 
                      </label>
                      <input
                        type="tel"
                        required
                        className="form-control"
                        placeholder="Enter Phone Number"
                        id="phone"
                        name="phone"
                        value={newTeacher.phone}
                        onChange={handleAddTeacherInputChange}
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

export default AddTeacher;
