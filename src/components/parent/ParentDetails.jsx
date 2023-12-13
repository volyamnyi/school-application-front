import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getParentById } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { getStudentById } from "../../utils/ApiFunctions";

const ParentDetails = () => {
  const { id } = useParams();
  const [parent, setParent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    childrenId: [],
  });

  const [children, setChildren] = useState([]);

  useEffect(() => {
    getParentById(id).then((parent) => {
      setParent(parent);
    });
  }, []);

  useEffect(() => {
    parent.childrenId.map((childIndex) => {
      getStudentById(childIndex).then((student) =>
        setChildren((prevChildren) => {
          return [...prevChildren, student];
        })
      );
    });
  }, [parent.id]);

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-sub-header">
              <h3 className="page-title">Parent Details</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/parents">Parents</Link>
                </li>
                <li className="breadcrumb-item active">Parent Details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="about-info">
                <h4>
                  Profile{" "}
                  <span>
                    <a href="#">
                      <i className="feather-more-vertical" />
                    </a>
                  </span>
                </h4>
              </div>
              <div className="student-profile-head">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <div className="profile-user-box">
                      <div className="profile-user-img">
                        <img
                          src="/assets/img/profiles/avatar-18.jpg"
                          alt="Profile"
                        />
                        <div className="form-group students-up-files profile-edit-icon mb-0">
                          <div className="uplod d-flex">
                            <label className="file-upload profile-upbtn mb-0">
                              <i className="feather-edit-3" />
                              <input type="file" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="names-profiles">
                        <h4>
                          {parent.firstName} <br />
                          {parent.lastName}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 d-flex align-items-center"></div>
                  <div className="col-lg-4 col-md-4 d-flex align-items-center">
                    <div className="follow-btn-group">
                      <button
                        type="submit"
                        className="btn btn-info message-btns"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="student-personals-grp">
                <div className="card">
                  <div className="card-body">
                    <div className="heading-detail">
                      <h4>Personal Details :</h4>
                    </div>
                    <div className="personal-activity">
                      <div className="personal-icons">
                        <i className="feather-user" />
                      </div>
                      <div className="views-personal">
                        <h4>Name</h4>
                        <h5>
                          {parent.firstName} <br />
                          {parent.lastName}
                        </h5>
                      </div>
                    </div>
                    <div className="personal-activity">
                      <div className="personal-icons">
                        <i className="feather-mail" />
                      </div>
                      <div className="views-personal">
                        <h4>Email</h4>
                        <h5>{parent.email}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="student-personals-grp">
                <div className="card mb-0">
                  <div className="card-body">
                    <table
                      style={{
                        borderCollapse: "collapse",
                        width: "100%",
                      }}
                    >
                      <thead className="student-thread">
                        <tr>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="DataTables_Table_0"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Subject: activate to sort column ascending"
                            style={{ width: "90.2031px" }}
                          >
                            Children:
                          </th>
                        </tr>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="DataTables_Table_0"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Name: activate to sort column ascending"
                          style={{ width: "190.547px" }}
                        >
                          Name
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="DataTables_Table_0"
                          rowSpan={1}
                          colSpan={1}
                          aria-label="Name: activate to sort column ascending"
                          style={{ width: "190.547px" }}
                        >
                          Last Name
                        </th>
                      </thead>
                      <tbody>
                      {children.map((ch, index) => (
                        <tr>
                         
                            <td>
                              <div key={index}>
                                {ch.firstName} 
                              </div>
                            </td>
                            <td>
                              <div key={index}>
                                {ch.lastName}
                              </div>
                            </td>
                        </tr>
                         ))}
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
  );
};

export default ParentDetails;
