import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { uploadStudentsFromFile } from "../../utils/ApiFunctions";

const UploadStudentsFromFile = () => {
  const [file, setFile] = useState(null)

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUploadStudentsFromFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleUploadStudentsFromFileSubmit = async (event) => {
    
    event.preventDefault();
    
    const response = await uploadStudentsFromFile(file);

    if (response) {
      setSuccessMessage("Students uploaded successfully!");
    } else {
      setErrorMessage("Students uploading error!");
    }
    setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
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
          <div className="row">
            <div className="col">
              <h3 className="page-title">Upload Students From File</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/students">Students</Link>
                </li>
                <li className="breadcrumb-item active">
                  Upload Students From File
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleUploadStudentsFromFileSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      File Input
                    </label>
                    <div className="col-md-10">
                      <input className="form-control" type="file" onChange={handleUploadStudentsFromFileChange}/>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="student-submit">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
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

export default UploadStudentsFromFile;
