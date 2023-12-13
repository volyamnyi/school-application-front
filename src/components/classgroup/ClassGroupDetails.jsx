import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClassGroupById } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

const ClassGroupDetails = () => {
  const { id } = useParams();
  const [classGroup, setClassGroup] = useState({
    id: "",
    name: "",
    students:[{}],
  });

  useEffect(() => {
    getClassGroupById(id).then((classGroup) => {
      setClassGroup(classGroup);
    });
  }, []);
  return (
    <>
      <>
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Class Group Details</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/classes">Classes</Link>
                  </li>
                  <li className="breadcrumb-item active">Class Group Details</li>
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
                                <th style={{ width: "186.203px" }}>Class Name</th>
                                <th style={{ width: "186.203px" }}>Students</th>
                              </tr>
                              
                            </thead>
                            <tbody>
                              <tr role="row" className="odd">
                                <td>
                                  <h2>
                                    <a>{classGroup.name}</a>
                                  </h2>
                                </td>
                                <td>
                                {classGroup.students.map((st, index) => (
                                  <div key={index}>{st.firstName} {st.lastName}</div>
                                ))}
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

export default ClassGroupDetails;
