import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeacherById } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

const TeacherDetails = () => {
  /* let { tsc } = useParams();
  tsc = JSON.parse(tsc);*/
  const { id } = useParams();
  const [tsc, setTSC] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subjects: [{}],
    classes: [{}],
  });

  useEffect(() => {
    getTeacherById(id).then((teacher) => {
      setTSC(teacher);
    });
  }, []);

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-sub-header">
              <h3 className="page-title">Teacher Details</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/teachers">Teachers</Link>
                </li>
                <li className="breadcrumb-item active">Teacher Details</li>
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
                          {tsc.firstName} <br />
                          {tsc.lastName}
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
                          {tsc.firstName} <br />
                          {tsc.lastName}
                        </h5>
                      </div>
                    </div>
                    <div className="personal-activity">
                      <div className="personal-icons">
                        <i className="feather-mail" />
                      </div>
                      <div className="views-personal">
                        <h4>Email</h4>
                        <h5>{tsc.email}</h5>
                      </div>
                    </div>
                    <div className="personal-activity">
                      <div className="personal-icons">
                        <i className="feather-phone-call" />
                      </div>
                      <div className="views-personal">
                        <h4>Mobile</h4>
                        <h5>{tsc.phone}</h5>
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
                            Subjects:
                          </th>
                          <th
                            className="sorting"
                            tabIndex={0}
                            aria-controls="DataTables_Table_0"
                            rowSpan={1}
                            colSpan={1}
                            aria-label="Class: activate to sort column ascending"
                            style={{ width: "52.4219px" }}
                          >
                            In classes:
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        <td>
                          {tsc.subjects.map((s, index) => (
                            <div key={index}>{s.name}</div>
                          ))}
                        </td>
                        <td>
                          {tsc.classes.map((s, index) => (
                            <div key={index}>{s.name}</div>
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
  );
};

export default TeacherDetails;
