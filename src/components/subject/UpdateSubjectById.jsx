import React, { useEffect, useState } from "react";
import { updateSubjectById } from "../../utils/ApiFunctions";
import { getSubjectById } from "../../utils/ApiFunctions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UpdateSubjectById = () => {
  const { id } = useParams();

  const [subject, setSubject] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    getSubjectById(id).then((subject) => {
      setSubject(subject);
    });
  }, []);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateSubjectInputChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setSubject({ ...subject, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await updateSubjectById(id, {
      name: subject.name,
    });

    if (response.status === 200) {
      setSuccessMessage("The Subject updated successfully!");
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
              <h3 className="page-title">Update Subject</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/subjects">Subjects</Link>
                </li>
                <li className="breadcrumb-item active">Update Subject</li>
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
                        <span>Subject Information</span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Subject Name <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={subject.name}
                          onChange={handleUpdateSubjectInputChange}
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

export default UpdateSubjectById;
