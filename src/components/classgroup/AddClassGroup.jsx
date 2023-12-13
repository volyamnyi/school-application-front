import React, { useEffect, useState } from "react";
import { addClassGroup } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

const AddClassGroup = () => {
  const [newClassGroup, setNewClassGroup] = useState({
    name: "",
  });
  console.log(newClassGroup.name);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddClassGroupInputChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setNewClassGroup({ ...newClassGroup, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addClassGroup(newClassGroup.name);
    setNewClassGroup({
      name: "",
    });

    if (response.status === 200) {
      setSuccessMessage("The Class added successfully!");
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
              <h3 className="page-title">Add ClassGroup</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/classes">Classes</Link>
                </li>
                <li className="breadcrumb-item active">Add Class Group</li>
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
                        <span>Class Group Information</span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Class Name <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={newClassGroup.name}
                          onChange={handleAddClassGroupInputChange}
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
export default AddClassGroup;
