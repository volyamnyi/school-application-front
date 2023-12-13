import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubjectById } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

const SubjectDetails = () => {
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
  return (
    <>
      <>
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Subject Details</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/subjects">Subjects</Link>
                  </li>
                  <li className="breadcrumb-item active">Subject</li>
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
                                <th style={{ width: "186.203px" }}>Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr role="row" className="odd">
                                <td>
                                  <h2>
                                    <a>{subject.name}</a>
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

export default SubjectDetails;
