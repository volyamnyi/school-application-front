import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { uploadSubjectsFromFile } from "../../utils/ApiFunctions";

const UploadSubjectsFromFile = () => {
  const [file, setFile] = useState(null)

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUploadSubjectsFromFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleUploadSubjectsFromFileSubmit = async (event) => {
    
    event.preventDefault();
    
    const response = await uploadSubjectsFromFile(file);

    if (response) {
      setSuccessMessage("Subjects uploaded successfully!");
    } else {
      setErrorMessage("Subjects uploading error!");
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
              <h3 className="page-title">Upload Subjects From File</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/subjects">Subjects</Link>
                </li>
                <li className="breadcrumb-item active">
                  Upload Subjects From File
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleUploadSubjectsFromFileSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      File Input
                    </label>
                    <div className="col-md-10">
                      <input className="form-control" type="file" onChange={handleUploadSubjectsFromFileChange}/>
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

export default UploadSubjectsFromFile;
