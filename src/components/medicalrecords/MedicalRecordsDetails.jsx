import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMedicalRecordsById } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

const MedicalRecordsDetails = () => {
  const { id } = useParams();
  const [medicalRecords, setMedicalRecords] = useState({
    id: "",
    healthGroup: "",
    allergies: "",
    info: "",
    student: {},
  });

  useEffect(() => {
    getMedicalRecordsById(id).then((medicalRecords) => {
      setMedicalRecords(medicalRecords);
    });
  }, []);
  return (
    <>
      <>
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Medical Records Details</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/medical-records">Medical Records</Link>
                  </li>
                  <li className="breadcrumb-item active">Medical Records</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="DataTables_Table_0_wrapper"
                      className="dataTables_wrapper dt-bootstrap4 no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-12">
                          <table
                            className="table border-0 star-student table-hover table-center mb-0 datatable table-striped dataTable no-footer"
                            id="DataTables_Table_0"
                            role="grid"
                            aria-describedby="DataTables_Table_0_info"
                          >
                            <thead className="student-thread">
                              <tr role="row">
                                <th style={{ width: "186.203px" }}>
                                  Health Group
                                </th>
                                <th style={{ width: "186.203px" }}>
                                  Allergies
                                </th>
                                <th style={{ width: "186.203px" }}>
                                  Info
                                </th>
                                <th style={{ width: "186.203px" }}>
                                  Student
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr role="row" className="odd">
                                <td>
                                  <h2>
                                    <a>{medicalRecords.healthGroup}</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{medicalRecords.allergies}</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{medicalRecords.info}</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{medicalRecords.student.firstName} {medicalRecords.student.lastName}</a>
                                  </h2>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default MedicalRecordsDetails;
