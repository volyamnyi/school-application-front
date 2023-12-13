import React, { useEffect, useState } from "react";
import { updateMedicalRecordsById } from "../../utils/ApiFunctions";
import { getMedicalRecordsById } from "../../utils/ApiFunctions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UpdateMedicalRecordsById = () => {
  const { id } = useParams();

  const [medicalRecords, setMedicalRecords] = useState({
    healthGroup: "",
    allergies: "",
    info: "",
    student: {
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    getMedicalRecordsById(id).then((medicalRecords) => {
      setMedicalRecords(medicalRecords);
    });
  }, []);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateMedicalRecordsInputChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setMedicalRecords({ ...medicalRecords, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateMedicalRecordsById(id, {
      healthGroup: medicalRecords.healthGroup,
      allergies: medicalRecords.allergies,
      info: medicalRecords.info,
    });

    if (response) {
      setSuccessMessage("Medical Records updated successfully!");
    } else {
      setErrorMessage("Medical Records updating error!");
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
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Update Medical Records</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/medical-records">Medical Records</Link>
                </li>
                <li className="breadcrumb-item active">Update Medical Records</li>
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
                          Choose the health group{" "}
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="healthGroup"
                          name="healthGroup"
                          value={medicalRecords.healthGroup}
                          onChange={handleUpdateMedicalRecordsInputChange}
                        >
                          <option value="">Choose the student</option>

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
                          value={medicalRecords.allergies}
                          onChange={handleUpdateMedicalRecordsInputChange}
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
                          value={medicalRecords.info}
                          onChange={handleUpdateMedicalRecordsInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>Student</label>
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          id="student"
                          name="student"
                          value={
                            medicalRecords.student.firstName +
                            " " +
                            medicalRecords.student.lastName
                          }
                          onChange={handleUpdateMedicalRecordsInputChange}
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

export default UpdateMedicalRecordsById;
